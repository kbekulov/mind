const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const path=require('node:path');
(async()=>{
  const server=spawn(process.execPath,[path.join(__dirname,'../scripts/serve.cjs')],{env:{...process.env,PORT:'4185'},windowsHide:true});
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
  const browser=await chromium.launch();
  try{
    const page=await browser.newPage({viewport:{width:1536,height:1080}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const go=async hash=>{await page.goto('http://127.0.0.1:4185/#'+hash);await page.locator('.visual-takeaway,.visual-flow,.ga-page').first().waitFor()};
    await go('view=politics&topic=wars-by-duration');
    const data=await page.evaluate(()=>window.MindWarAtlasData);
    assert.equal((await page.locator('.wa-overview-bars .visual-bar>strong').allTextContents()).reduce((n,v)=>n+Number(v),0),data.durations.length);
    assert.equal(await page.locator('.wa-duration-detail').evaluate(e=>e.open),false);
    const sorted=data.durations.map(d=>d.years).sort((a,b)=>a-b);
    assert.ok((await page.locator('.wa-overview-bars').innerText()).includes('Median reported duration: '+sorted[(sorted.length-1)/2].toLocaleString('en-US',{maximumFractionDigits:1})));
    await go('view=politics&topic=wars-by-outcome');
    assert.equal((await page.locator('.wa-era-overview .visual-legend b').allTextContents()).reduce((n,v)=>n+Number(v),0),data.outcomes.length,'Every conflict is assigned to exactly one start era');
    assert.equal(await page.locator('.wa-outcome-detail').evaluate(e=>e.open),false);
    await page.locator('.wa-result').selectOption('defeat');
    assert.equal((await page.locator('.wa-era-overview .visual-legend b').allTextContents()).reduce((n,v)=>n+Number(v),0),data.outcomes.filter(d=>d.result==='defeat').length);
    await go('view=politics&topic=gender-war');
    await page.locator('mind-gender-diagram[data-ready=true]').first().waitFor();
    assert.equal(await page.locator('.fertility,.reproduction-study').count(),0);
    await go('view=politics&topic=russia-ukraine-war');
    assert.deepEqual(await page.locator('.exchange-chart').first().locator('.visual-bar>strong').allTextContents(),['445','445']);
    assert.deepEqual(await page.locator('.exchange-chart').nth(1).locator('.visual-bar>strong').allTextContents(),['1,014','78']);
    assert.equal(await page.locator('.exchange-chart .visual-detail[open]').count(),0);
    assert.match(await page.locator('.war-insights .visual-stack').getAttribute('aria-label'),/Disbursed: 16.9 €bn; Ceiling not yet disbursed: 73.1 €bn/);
    await go('view=politics&topic=nato-and-invasions');
    assert.equal(await page.locator('.na-dot-chart').count(),0);
    assert.equal(await page.locator('.na-register').evaluate(e=>e.open),false);
    await page.locator('[data-na-century="1900"]').click();
    assert.equal(await page.locator('.na-register').evaluate(e=>e.open),true);
    assert.equal(await page.locator('.na-table-wrap tbody tr').count(),22);
    // Zero-count segments keep the same color in the bar and its legend.
    const colors=await page.evaluate(()=>{const d=document.createElement('div');d.innerHTML=MindVisuals.stack([['Zero',0],['Present',1]],1);return [d.querySelector('.visual-stack span').style.getPropertyValue('--visual-color'),d.querySelectorAll('.visual-legend i')[1].style.background]});
    assert.deepEqual(colors,['#75d6b0','rgb(117, 214, 176)']);
    const routes=[['jobs','view=jobs','.world-map-section'],['gender','view=politics&topic=gender-war','.ga-figure'],['war','view=politics&topic=russia-ukraine-war','.war-insights'],['durations','view=politics&topic=wars-by-duration','.wa-aggregate'],['outcomes','view=politics&topic=wars-by-outcome','.wa-era-overview'],['nato','view=politics&topic=nato-and-invasions','.na-panel'],['orthodoxy','view=religion&topic=eastern-orthodoxy','.religion-visuals'],['catholicism','view=religion&topic=catholicism','.religion-visuals'],['islam','view=religion&topic=islam','.religion-visuals'],['buddhism','view=religion&topic=buddhism','.religion-visuals'],['shinto','view=religion&topic=shinto','.religion-visuals'],['christian','view=religion&topic=orthodoxy-vs-catholicism','.christian-diagram'],['realism','view=philosophy&topic=realism-ir','.research-diagram'],['idealism','view=philosophy&topic=idealism-ir','.research-diagram']];
    for(const [name,hash,selector] of routes){
      await go(hash);
      for(const width of [1536,320]){
        await page.setViewportSize({width,height:1080});
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),name+' document '+width);
        assert.ok(await page.locator('.content-scroll').evaluate(e=>e.scrollWidth<=e.clientWidth+1),name+' content '+width);
        await page.locator(selector).first().scrollIntoViewIfNeeded();
        await page.screenshot({path:`test-results/overview-${name}-${width}.png`});
      }
      await page.setViewportSize({width:1536,height:1080});
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: overview arithmetic, non-overlapping era groups, trend endpoints, disclosure defaults, source units and all research visual layouts.');
  }finally{await browser.close();server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
