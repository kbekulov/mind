const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const path=require('node:path');

(async()=>{
  const server=spawn(process.execPath,[path.join(__dirname,'../scripts/serve.cjs')],{env:{...process.env,PORT:'4182'},windowsHide:true});
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
  const browser=await chromium.launch({headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1536,height:1100}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4182/#view=politics&topic=russia-ukraine-war');
    const root=page.locator('.war-comparison');await root.waitFor();
    assert.equal(await root.locator('.wc-profile,.wc-rank,.wc-weight').count(),0);
    assert.equal(await root.locator('.wc-death').count(),4);
    assert.equal(await root.locator('.wc-legal-record').count(),7);
    assert.ok((await root.innerText()).includes('17,257'));
    assert.ok((await root.innerText()).includes('200,065–226,628'));
    assert.ok((await root.textContent()).includes('unsupported numerical ratings'));
    assert.equal(await root.locator('.wc-lenses article').count(),3);
    await root.locator('.wc-death summary').nth(2).focus();await page.keyboard.press('Enter');
    assert.ok(await root.locator('.wc-death').nth(2).evaluate(el=>el.open));
    assert.ok((await root.locator('.wc-death').nth(2).innerText()).includes('31 Aug 2026'));
    await root.locator('.wc-death summary').nth(2).click();
    for(const width of [1536,1024,390,320]){
      await page.setViewportSize({width,height:1100});
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'page width '+width);
      assert.ok(await root.evaluate(el=>el.scrollWidth<=el.clientWidth+1),'comparison width '+width);
      for(const selector of ['.wc-civilian-context','.wc-legal-records','.wc-timeline']){
        assert.ok(await root.locator(selector).evaluate(el=>el.scrollWidth<=el.clientWidth+1),selector+' width '+width);
      }
      await root.locator('.wc-masthead').scrollIntoViewIfNeeded();
      await page.screenshot({path:`test-results/war-comparison-${width}.png`});
      const scroller=page.locator('.content-scroll');await scroller.evaluate(el=>el.scrollTop=el.scrollHeight);
      assert.ok(await scroller.evaluate(el=>Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop)<2));
    }
    // Hash navigation and browser back must retain working controls without duplicate listeners.
    await page.goto('http://127.0.0.1:4182/#view=politics&topic=gender-war');
    assert.equal(await page.locator('.war-comparison').count(),0);
    await page.goBack();await root.waitFor();
    assert.equal(await root.locator('.wc-legal-record').count(),7);
    assert.deepEqual(errors,[]);
    console.log('PASS: sourced war records, removed unsupported scores, keyboard disclosures, provenance, navigation, responsive layouts and scrolling.');
  }finally{await browser.close();server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
