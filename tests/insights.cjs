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
    await page.goto('http://127.0.0.1:4177/#view=politics&topic=gender-war');
    await page.locator('.fertility-card').first().waitFor();
    assert.equal(await page.locator('.fertility-card').count(),8);
    const series=await page.evaluate(()=>window.MindFertilityData.countries);
    for(const c of series){assert.equal(c.values.length,65);assert.equal(c.values[0][0],1960);assert.equal(c.values.at(-1)[0],2024);c.values.forEach(([year,value],i)=>{assert.equal(year,1960+i);assert.ok(Number.isFinite(value)&&value>0&&value<8)});}
    assert.ok(series.find(c=>c.id==='KOR').values.at(-1)[1]>series.find(c=>c.id==='KOR').values.at(-2)[1],'Preserve recent rebounds');
    await page.selectOption('#fertility-period','2000');
    assert.equal(await page.locator('.fertility-card').first().locator('tbody tr').count(),25);
    assert.equal(await page.locator('.fertility-card svg').first().getAttribute('aria-label'),'European Union: annual total fertility rate, 2000–2024, zero to eight births per woman');
    await page.locator('.fertility-card summary').first().focus();await page.keyboard.press('Enter');
    assert.ok(await page.locator('.fertility-card details').first().evaluate(el=>el.open));
    await page.locator('.fertility-card summary').first().click();
    await page.selectOption('#fertility-period','1960');
    await page.locator('.fertility').screenshot({path:'test-results/fertility-desktop.png'});
    for(const width of [1440,390]){
      await page.setViewportSize({width,height:1000});
      for(const topic of ['gender-war','russia-ukraine-war']){
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
          assert.ok(await page.locator('.war-insights').innerText().then(t=>t.includes('525,000–625,000')&&t.includes('14.9 €bn')));
          await page.locator('.exchange-chart').first().scrollIntoViewIfNeeded();
          await page.screenshot({path:`test-results/war-${width}.png`});
        }
      }
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: fertility data continuity, period selection, keyboard tables, war ranges, responsive charts and scrolling.');
  }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
