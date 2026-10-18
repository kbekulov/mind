const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const path=require('node:path');
const fs=require('node:fs');
(async()=>{
  fs.mkdirSync('test-results/political-profile',{recursive:true});
  const server=spawn(process.execPath,[path.join(__dirname,'../scripts/serve.cjs')],{env:{...process.env,PORT:'4186'},windowsHide:true});
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
  const browser=await chromium.launch();
  try{
    const page=await browser.newPage({viewport:{width:1536,height:1080}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4186/#view=politics');
    await page.locator('.topic-card').getByRole('heading',{name:'My political profile',exact:true}).click();
    await page.getByRole('heading',{name:'My political profile',level:1}).waitFor();
    assert.equal(await page.locator('.sidebar a[aria-current=page]').getAttribute('aria-label'),'My political profile');
    await page.reload();
    assert.equal(await page.locator('.pp-axis').count(),12);
    assert.equal(await page.locator('.pp-balanced-zone').count(),7);
    assert.deepEqual(await page.locator('.pp-axis-dot').evaluateAll(nodes=>nodes.map(n=>n.style.left)),['40%','37%','71%','80%','59%']);
    assert.deepEqual(await page.locator('.pp-ranking .pp-rank-title strong').allTextContents(),['93%','93%','92%','90%','90%','90%','90%','89%']);
    assert.equal(await page.locator('.pp-section').count(),10);
    assert.equal(await page.locator('.pp-timeline>li').count(),6);
    assert.equal(await page.locator('.pp-dimensions>div').count(),9);
    assert.equal(await page.locator('.pp-furthest li').count(),9);
    assert.equal(await page.locator('.pp-description').count(),5);
    assert.equal(await page.locator('.pp-description[open]').count(),0);
    await page.locator('.pp-description').first().locator('summary').click();
    assert.ok((await page.locator('.pp-description[open]').innerText()).includes('Prosperity Party'));
    for(const id of ['axes','distinctive','countries','figures','ranking','reading','parties','timeline','ideologies','compass']){
      await page.locator(`[data-pp-jump="${id}"]`).click();
      assert.equal(await page.evaluate(()=>document.activeElement.id),'pp-'+id);
      assert.match(page.url(),/topic=my-political-profile$/);
    }
    const pdf=await page.request.get('http://127.0.0.1:4186/data/12axes-report-2026-10-18.pdf');
    assert.equal(pdf.status(),200);
    assert.match(pdf.headers()['content-type'],/application\/pdf/);
    assert.ok((await pdf.body()).equals(fs.readFileSync('data/12axes-report-2026-10-18.pdf')));
    for(const width of [1536,768,390,320]){
      await page.setViewportSize({width,height:1080});
      const scroll=page.locator('.content-scroll');
      await scroll.evaluate(e=>e.scrollTop=0);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'document overflow at '+width);
      assert.ok(await scroll.evaluate(e=>e.scrollWidth<=e.clientWidth+1),'content overflow at '+width);
      await page.screenshot({path:`test-results/political-profile/top-${width}.png`});
      await page.locator('[data-pp-jump="axes"]').click();
      await page.screenshot({path:`test-results/political-profile/axes-${width}.png`});
      await page.locator('[data-pp-jump="parties"]').click();
      await page.screenshot({path:`test-results/political-profile/parties-${width}.png`});
      await scroll.evaluate(e=>e.scrollTop=e.scrollHeight);
      assert.ok(await scroll.evaluate(e=>e.scrollTop>0&&Math.abs(e.scrollHeight-e.clientHeight-e.scrollTop)<2));
    }
    await page.getByRole('button',{name:'Open navigation',exact:true}).click();
    await page.locator('.sidebar').getByRole('link',{name:'My political profile',exact:true}).click();
    assert.equal(await page.locator('.menu-open').count(),0);
    assert.deepEqual(errors,[]);
    console.log('PASS: political profile scores, all ten sections, routing, jump navigation, disclosures, PDF and desktop/mobile scrolling.');
  }finally{await browser.close();server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
