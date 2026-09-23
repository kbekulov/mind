const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');

(async () => {
  const server = spawn(process.execPath, [path.join(__dirname, '../scripts/serve.cjs')], { env: { ...process.env, PORT: '4174' }, windowsHide: true });
  await new Promise((resolve, reject) => { server.stdout.once('data', resolve); server.once('error', reject); });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1536, height: 1080 }, acceptDownloads: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  try {
    await page.goto('http://127.0.0.1:4174');
    await page.getByRole('heading', { name: 'Make yourself at home.' }).waitFor();
    fs.mkdirSync(path.join(__dirname, '../test-results'), { recursive: true });
    await page.screenshot({ path: path.join(__dirname, '../test-results/desktop.png'), fullPage: true });
    assert.equal(await page.locator('.space-card').count(), 4);

    // Persisted editing, rich content, graph edges, and XSS safety.
    await page.getByRole('button', { name: 'New document', exact: true }).click();
    await page.getByLabel('Document title').fill('Evidence lab');
    await page.getByLabel('Document content in Markdown').fill('## Evidence\n\nA **bold** claim. [[Questions worth sitting with]]\n\n| Claim | Confidence |\n| --- | --- |\n| Example | Unknown |\n\n```chart\nPrimary | 8\nSecondary | 3\n```\n\n```diagram\nQuestion -> Evidence -> Insight\n```\n\n<script>window.pwned=true</script>\n\n[unsafe](javascript:alert(1))');
    await page.getByLabel('Tags · comma separated').fill('test, evidence');
    await page.getByRole('button', { name: 'Preview', exact: true }).click();
    assert.equal(await page.locator('#editor-preview table').count(), 1);
    assert.equal(await page.locator('#editor-preview .flow-node').count(), 3);
    await page.getByRole('button', { name: 'Save document', exact: true }).click();
    await page.getByRole('heading', { name: 'Evidence lab', exact: true }).waitFor();
    assert.equal(await page.locator('.rich-document .bar-row').count(), 2);
    assert.equal(await page.locator('.rich-document script').count(), 0);
    assert.equal(await page.locator('.rich-document a[href^="javascript"]').count(), 0);
    assert.equal(await page.evaluate(() => window.pwned), undefined);
    await page.reload();
    await page.getByRole('heading', { name: 'Evidence lab', exact: true }).waitFor();

    // Rename, move, change stage, and retain content.
    await page.getByRole('button', { name: 'Edit', exact: true }).click();
    await page.getByLabel('Space', { exact: true }).selectOption('politics');
    await page.getByLabel('Channel', { exact: true }).selectOption('sources');
    await page.getByLabel('Stage', { exact: true }).selectOption('draft');
    await page.getByRole('button', { name: 'Save document', exact: true }).click();
    await page.getByRole('heading', { name: 'Evidence lab', exact: true }).waitFor();
    assert.match(await page.locator('.reader-back').innerText(), /Politics/);
    await page.locator('.rich-document .wiki-link').click();
    await page.getByRole('heading', { name: 'Questions worth sitting with', exact: true }).waitFor();
    assert.equal(await page.locator('.inspector .quick-link').filter({ hasText: 'Evidence lab' }).count(), 1);

    // Search matches content/tags and navigates correctly.
    await page.keyboard.press('Control+k');
    await page.getByLabel('Search titles, content, and tags').fill('evidence lab');
    await page.getByRole('button', { name: /Evidence lab Politics/ }).click();
    await page.getByRole('heading', { name: 'Evidence lab', exact: true }).waitFor();

    // Create scalable navigation and verify its empty and populated states.
    await page.getByRole('button', { name: 'Create a space', exact: true }).click();
    await page.getByLabel('Space name').fill('Science');
    await page.getByLabel('A short description').fill('Careful questions about the world.');
    await page.getByRole('button', { name: 'Create space', exact: true }).click();
    await page.getByRole('heading', { name: 'Science', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Add channel', exact: true }).first().click();
    await page.getByLabel('Channel name').fill('Evidence sources');
    await page.getByRole('button', { name: 'Create channel', exact: true }).click();
    await page.getByRole('heading', { name: '# evidence-sources', exact: true }).waitFor();
    await page.getByRole('button', { name: 'New document', exact: true }).click();
    await page.getByLabel('Document title').fill('A science note');
    await page.getByLabel('Document content in Markdown').fill('A new observation.');
    await page.getByRole('button', { name: 'Save document', exact: true }).click();
    await page.getByRole('heading', { name: 'A science note', exact: true }).waitFor();

    // Backup round trip and rejection of malformed records.
    await page.getByRole('button', { name: 'Workspace settings', exact: true }).click();
    const downloaded = page.waitForEvent('download');
    await page.locator('.modal').getByRole('button', { name: 'Export', exact: true }).click();
    const backup = await downloaded;
    const backupPath = path.join(__dirname, '../test-results/backup.json');
    await backup.saveAs(backupPath);
    const saved = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
    assert.equal(saved.spaces.length, 5);
    assert.equal(saved.documents.length, 8);
    const checks = await page.evaluate(() => {
      const c = window.MindCore;
      const invalid = c.initialState(); invalid.documents[0].space = 'missing';
      let rejected = false; try { c.validateState(invalid); } catch { rejected = true; }
      const injection = c.markdown('<img src=x onerror=alert(1)>\n\n[bad](javascript:alert(1))');
      return { rejected, safe: !injection.includes('<img') && !injection.includes('href="javascript'), graph: c.graphEdges().length };
    });
    assert.ok(checks.rejected && checks.safe && checks.graph > 0);
    await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
    await page.getByRole('button', { name: 'Delete document', exact: true }).click();
    await page.locator('.modal').getByRole('button', { name: 'Delete document', exact: true }).click();
    await page.getByRole('heading', { name: 'Make yourself at home.' }).waitFor();
    await page.locator('#import-file').setInputFiles(backupPath);
    await page.getByRole('button', { name: 'Replace & restore', exact: true }).click();
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('mind.workspace.v1')).documents.length), 8);

    // List filtering and alternate views.
    await page.locator('[data-view="all"]').click();
    await page.getByLabel('Filter documents').fill('A science note');
    assert.equal(await page.locator('.document-table tbody tr').count(), 1);
    await page.getByRole('button', { name: 'Card view', exact: true }).click();
    assert.equal(await page.locator('.doc-card').count(), 1);
    await page.locator('[data-view="board"]').click();
    await page.getByRole('heading', { name: 'Let your thinking take shape.' }).waitFor();
    assert.equal(await page.locator('.board-column').count(), 3);
    await page.locator('.side-scroll [data-view="graph"]').click();
    await page.getByRole('heading', { name: 'Nothing exists in isolation.' }).waitFor();
    assert.equal(await page.locator('.network-panel .network-node').count(), 8);

    // Mobile navigation, usable dimensions, and editor.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://127.0.0.1:4174/#view=home');
    await page.getByRole('heading', { name: 'Make yourself at home.' }).waitFor();
    await page.screenshot({ path: path.join(__dirname, '../test-results/mobile.png'), fullPage: true });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
    await page.locator('.side-scroll [data-view="inbox"]').click();
    await page.getByRole('heading', { name: 'A landing place for your thoughts.' }).waitFor();
    assert.equal(await page.locator('.nav-open').count(), 0);
    await page.getByRole('button', { name: 'New document', exact: true }).click();
    await page.getByLabel('Document title').fill('Mobile note');
    await page.getByRole('button', { name: 'Save document', exact: true }).click();
    await page.getByRole('heading', { name: 'Mobile note', exact: true }).waitFor();

    // Renaming a linked title preserves connections across the workspace.
    await page.goto('http://127.0.0.1:4174/#view=doc&doc=questions');
    await page.getByRole('heading', { name: 'Questions worth sitting with', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Edit', exact: true }).click();
    await page.getByLabel('Document title').fill('Better questions');
    await page.getByRole('button', { name: 'Save document', exact: true }).click();
    await page.getByRole('heading', { name: 'Better questions', exact: true }).waitFor();
    assert.ok(await page.evaluate(() => JSON.parse(localStorage.getItem('mind.workspace.v1')).documents.find(d => d.title === 'Evidence lab').body.includes('[[Better questions]]')));

    // A stale editor must not overwrite a change made in another tab.
    await page.getByRole('button', { name: 'Edit', exact: true }).click();
    await page.getByLabel('Document title').fill('Unsaved local draft');
    await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('mind.workspace.v1')); s.documents[0].tags.push('external-change'); localStorage.setItem('mind.workspace.v1', JSON.stringify(s)); });
    await page.getByRole('button', { name: 'Save document', exact: true }).click();
    assert.equal(await page.locator('#document-form').count(), 1);
    assert.ok(await page.evaluate(() => JSON.parse(localStorage.getItem('mind.workspace.v1')).documents[0].tags.includes('external-change')));
    assert.match(await page.locator('#toast').textContent(), /Another tab/);
    page.on('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
    assert.deepEqual(errors, []);
    console.log('PASS: document editing/persistence, safe rich rendering, links/backlinks and renaming, search, spaces/channels, export/import, delete, list/card/board/graph views, mobile navigation/editing, and stale-write protection.');
  } finally { await browser.close(); server.kill(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
