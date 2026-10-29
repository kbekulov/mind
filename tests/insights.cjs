const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const path=require('node:path');
(async()=>{
  const server=spawn(process.execPath,[path.join(__dirname,'../scripts/serve.cjs')],{env:{...process.env,PORT:'4177'},windowsHide:true});
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
  const browser=await chromium.launch();
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    for(const width of [1440,390]){
      await page.setViewportSize({width,height:1000});
      for(const topic of ['russia-ukraine-war']){
        await page.goto('http://127.0.0.1:4177/#view=politics&topic='+topic);
        await page.locator('.insights').waitFor();
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
        assert.ok(await page.locator('.insights').evaluate(el=>el.scrollWidth<=el.clientWidth+1));
        const scroller=page.locator('.content-scroll');await scroller.evaluate(el=>el.scrollTop=el.scrollHeight);
        assert.ok(await scroller.evaluate(el=>Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop)<2));
        await scroller.evaluate(el=>el.scrollTop=0);
        if(topic==='russia-ukraine-war'){
          assert.equal(await page.locator('.war-insights .insight-card').count(),6);
          assert.equal(await page.locator('.exchange-event').count(),6);
          assert.ok(await page.locator('.war-insights').innerText().then(t=>t.includes('525,000–625,000')&&t.includes('€16.9bn')));
          await page.locator('.exchange-chart').first().scrollIntoViewIfNeeded();
          await page.screenshot({path:`test-results/war-${width}.png`});
        }
      }
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: war ranges, responsive charts and scrolling.');
  }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
