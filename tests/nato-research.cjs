const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const path=require('node:path');
(async()=>{
  const server=spawn(process.execPath,[path.join(__dirname,'../scripts/serve.cjs')],{env:{...process.env,PORT:'4184'},windowsHide:true});
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
  const browser=await chromium.launch();
  try{
    const page=await browser.newPage({viewport:{width:1536,height:1100}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4184/#view=politics&topic=nato-and-invasions');
    const root=page.locator('.nato-research');await root.waitFor();
    const data=await page.evaluate(()=>window.MindNatoData);
    assert.equal(data.entries.length,62);
    assert.equal(data.entries.filter(e=>e.year<1949).length,61);
    assert.equal(data.entries.filter(e=>e.year===1812).length,14);
    assert.deepEqual(await root.locator('[data-na-century] strong').allTextContents(),['3','11','5','2','18','22','1']);
    assert.equal(await root.locator('tbody tr').count(),62);
    await root.locator('[data-na-century="1800"]').click();
    assert.equal(await root.locator('tbody tr').count(),18);
    assert.equal(await root.locator('.na-century').inputValue(),'1800');
    await root.locator('.na-search').fill('1812');
    assert.equal(await root.locator('tbody tr').count(),14);
    await root.locator('.na-search').fill('no matching actor');
    assert.ok(await root.locator('.na-empty').isVisible());
    await root.locator('.na-reset').click();
    assert.equal(await root.locator('tbody tr').count(),62);
    await root.locator('.na-century').selectOption('2000');
    assert.equal(await root.locator('tbody tr').count(),1);
    assert.match(await root.locator('tbody').innerText(),/UNSUPPORTED AS FRAMED/);
    await root.locator('.na-reset').click();
    assert.equal(await root.locator('.na-operation-row').count(),6);
    for(const op of data.operations){
      const b=root.locator(`[data-na-operation="${op.id}"]`).first();
      await b.focus();await page.keyboard.press('Enter');
      assert.ok(await root.locator('dialog').isVisible());
      assert.equal(await root.locator('#na-detail-title').innerText(),op.name);
      assert.ok(await root.locator('dialog a').count()>0);
      await page.keyboard.press('Escape');
      assert.ok(!(await root.locator('dialog').isVisible()));
      assert.ok(await b.evaluate(el=>el===document.activeElement));
    }
    for(const width of [1536,1024,390,320]){
      await page.setViewportSize({width,height:1100});
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'page '+width);
      assert.ok(await root.evaluate(el=>el.scrollWidth<=el.clientWidth+1),'content '+width);
      await root.locator('header').first().scrollIntoViewIfNeeded();
      await page.screenshot({path:`test-results/nato-${width}.png`});
      await root.locator('.na-operation-chart').scrollIntoViewIfNeeded();
      await page.screenshot({path:`test-results/nato-operations-${width}.png`});
      const table=root.locator('.na-table-wrap');await table.evaluate(el=>el.scrollTop=el.scrollHeight);
      assert.ok(await table.evaluate(el=>Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop)<2));
      const scroll=page.locator('.content-scroll');await scroll.evaluate(el=>el.scrollTop=el.scrollHeight);
      assert.ok(await scroll.evaluate(el=>Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop)<2));
    }
    await page.reload();await root.waitFor();
    assert.equal(await root.locator('tbody tr').count(),62);
    assert.deepEqual(errors,[]);
    console.log('PASS: NATO claim counts, filters, sourced operation dialogs, keyboard focus, navigation, responsive layout and scrolling.');
  }finally{await browser.close();server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
