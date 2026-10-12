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
    assert.equal(await root.locator('.wc-profile').count(),7);
    assert.equal(await root.locator('.wc-death').count(),4);
    assert.equal(await root.locator('.wc-legal-record').count(),7);
    assert.ok((await root.innerText()).includes('17,257'));
    assert.ok((await root.innerText()).includes('200,065–226,628'));
    assert.ok((await root.innerText()).includes('unsourced editorial scores'));
    assert.equal((await root.locator('.wc-rank').first().locator('strong').innerText()).replace(/\s+/g,' '),'73.3 out of 100; model output');
    await page.selectOption('#wc-case','libya');
    assert.ok((await root.locator('.wc-focus').innerText()).includes('Libya / NATO'));
    assert.equal(await root.locator('[data-wc-case="libya"]').getAttribute('aria-pressed'),'true');
    await root.locator('[data-wc-case="ukraine"]').click();
    assert.equal(await page.locator('#wc-case').inputValue(),'ukraine');
    assert.equal(await root.locator('.wc-profile[aria-pressed="true"]').count(),1);
    // Keyboard-only weighting changes must update the displayed score and handle all-zero weights.
    for(let i=0;i<3;i++){await page.locator('#wc-weight-'+i).focus();await page.keyboard.press('Home');}
    assert.equal(await root.locator('.wc-rank').count(),0);
    assert.ok((await root.locator('.wc-empty').innerText()).includes('non-zero'));
    await page.locator('#wc-weight-1').focus();await page.keyboard.press('End');
    assert.equal(await root.locator('.wc-rank').count(),7);
    assert.ok((await root.locator('.wc-rank').first().innerText()).includes('Vietnam / US'));
    assert.ok((await root.locator('.wc-rank').first().locator('strong').innerText()).startsWith('100.0'));
    await root.locator('.wc-reset').click();
    assert.deepEqual(await root.locator('.wc-weight').evaluateAll(xs=>xs.map(x=>x.value)),['1','1','1']);
    await root.locator('.wc-death summary').nth(2).focus();await page.keyboard.press('Enter');
    assert.ok(await root.locator('.wc-death').nth(2).evaluate(el=>el.open));
    assert.ok((await root.locator('.wc-death').nth(2).innerText()).includes('31 Aug 2026'));
    await root.locator('.wc-death summary').nth(2).click();
    for(const width of [1536,1024,390,320]){
      await page.setViewportSize({width,height:1100});
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'page width '+width);
      assert.ok(await root.evaluate(el=>el.scrollWidth<=el.clientWidth+1),'comparison width '+width);
      for(const selector of ['.wc-triptych','.wc-model-layout','.wc-profiles','.wc-legal-records','.wc-timeline']){
        assert.ok(await root.locator(selector).evaluate(el=>el.scrollWidth<=el.clientWidth+1),selector+' width '+width);
      }
      await root.locator('.wc-masthead').scrollIntoViewIfNeeded();
      await page.screenshot({path:`test-results/war-comparison-${width}.png`});
      await root.locator('.wc-model-layout').scrollIntoViewIfNeeded();
      await page.screenshot({path:`test-results/war-model-${width}.png`});
      await root.locator('.wc-profiles').screenshot({path:`test-results/war-profiles-${width}.png`});
      const scroller=page.locator('.content-scroll');await scroller.evaluate(el=>el.scrollTop=el.scrollHeight);
      assert.ok(await scroller.evaluate(el=>Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop)<2));
    }
    // Hash navigation and browser back must retain working controls without duplicate listeners.
    await page.goto('http://127.0.0.1:4182/#view=politics&topic=gender-war');
    assert.equal(await page.locator('.war-comparison').count(),0);
    await page.goBack();await root.waitFor();
    await page.selectOption('#wc-case','iraq');
    assert.ok((await root.locator('.wc-focus').innerText()).includes('Iraq / US-led'));
    assert.deepEqual(errors,[]);
    console.log('PASS: war comparison inputs, reference arithmetic, keyboard weights, zero-weight state, profile selection, provenance, navigation, responsive layouts and scrolling.');
  }finally{await browser.close();server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
