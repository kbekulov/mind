const fs=require('node:fs'),assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {chromium}=require('playwright');
const {map,data}=require('../scripts/gender-locales.cjs').collectGender();
for(const lang of ['en','fr','ja','ru']){const dict=JSON.parse(fs.readFileSync('locales/'+lang+'.json'));for(const [key,v] of map)assert.equal(dict[key],v[lang],'Argument translation parity '+lang+' '+key);}
(async()=>{
 fs.mkdirSync('test-results/gender',{recursive:true});
 const server=spawn(process.execPath,['scripts/serve.cjs'],{env:{...process.env,PORT:'4193'},windowsHide:true});
 await new Promise((r,j)=>{server.stdout.once('data',r);server.once('error',j);});
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1100}}),errors=[],external=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{const u=new URL(r.url());if(u.origin!=='http://127.0.0.1:4193'&&!['fonts.googleapis.com','fonts.gstatic.com'].includes(u.hostname))external.push(r.url());});
  await page.goto('http://127.0.0.1:4193/?lang=en#view=politics&topic=gender-war');
  const ready=async lang=>page.waitForFunction(l=>document.querySelectorAll(`mind-gender-diagram[data-ready=true][data-plot-locale="${l}"]`).length===2,lang);
  await ready('en');
  assert.equal(await page.evaluate(()=>Plotly.version),'4.1.2');
  assert.equal(await page.locator('.fertility,.reproduction-study,.mechanism-entry,.research-chart').count(),0);
  assert.equal(await page.locator('.ga-comparison tbody tr').count(),6);
  assert.equal(await page.locator('.topic-children a[href="#view=politics&topic=dating-speech-ru"]').count(),1);
  assert.equal(await page.locator('a[href^="backlog/"]').count(),0);
  assert.ok((await page.locator('.ga-thesis').innerText()).includes('perceived effort'));
  await page.locator('[data-ga-scenario=equal]').focus();await page.keyboard.press('Enter');
  await page.waitForFunction(()=>document.querySelector('mind-gender-diagram[kind=flow]').dataset.scenario==='equal');
  assert.equal(await page.locator('[data-ga-scenario=equal]').getAttribute('aria-pressed'),'true');
  const same=await page.evaluate(()=>MindGenderResearch.paths());assert.deepEqual(same[0],same[1]);
  await page.locator('[data-ga-scenario=reversed]').click();
  const reversed=await page.evaluate(()=>MindGenderResearch.paths());assert.equal(reversed[0][0],'hard');assert.equal(reversed[1][0],'easy');
  await page.locator('[data-ga-detail=flow] summary').focus();await page.keyboard.press('Enter');
  for(const lang of ['fr','ja','ru','en']){
   await page.locator('[data-language='+lang+']').click();await ready(lang);
   assert.equal(await page.locator('[data-ga-scenario=reversed]').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('[data-ga-detail=flow]').evaluate(e=>e.open),true);
   assert.equal(await page.locator('.ga-thesis p').innerText(),data.words.thesisText[lang]);
   assert.equal(await page.locator('.ga-scenario-note').innerText(),data.words.reversedNote[lang]);
   assert.equal(await page.locator('[data-language='+lang+']').evaluate(e=>e===document.activeElement),true);
   const labels=await page.locator('mind-gender-diagram[kind=flow] .annotation-text').allTextContents();assert.ok(labels.includes(data.words.women[lang]));
   for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:1100});
    await page.waitForFunction(()=>[...document.querySelectorAll('mind-gender-diagram')].every(e=>e.plot?._fullLayout?.height===(e.clientWidth<650?690:330)&&Math.abs(e.plot._fullLayout.width-e.clientWidth)<2));
    assert.ok(await page.locator('.content-scroll').evaluate(e=>e.scrollWidth<=e.clientWidth+1),'Overflow '+lang+' '+width);
    const scroll=page.locator('.content-scroll');await scroll.evaluate(e=>e.scrollTop=0);
    if(width!==320)await page.screenshot({path:`test-results/gender/${lang}-intro-${width}.png`});
    for(const kind of ['flow','analogy']){
     const diagram=page.locator(`mind-gender-diagram[kind=${kind}]`);await diagram.scrollIntoViewIfNeeded();
     assert.equal(await diagram.locator('.annotation-text').count(),kind==='flow'?12:10);
     if(width!==320)await diagram.screenshot({path:`test-results/gender/${lang}-${kind}-${width}.png`});
    }
    await scroll.evaluate(e=>e.scrollTop=e.scrollHeight);assert.ok(await page.locator('.transcript-entry').isVisible());
   }
   await page.setViewportSize({width:1440,height:1100});
  }
  await page.locator('[data-ga-scenario=original]').click();
  const diagram=page.locator('mind-gender-diagram[kind=flow]');await diagram.scrollIntoViewIfNeeded();
  const before=await page.locator('.content-scroll').evaluate(e=>e.scrollTop);await diagram.hover();await page.mouse.wheel(0,240);
  await page.waitForFunction(top=>document.querySelector('.content-scroll').scrollTop>top,before);
  await page.locator('.transcript-entry').click();await page.locator('.transcript-page').waitFor();
  assert.equal(await page.locator('#gender-argument').count(),0);
  await page.goBack();await ready('en');
  assert.equal(await page.locator('[data-ga-scenario=original]').getAttribute('aria-pressed'),'true');
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  // A library download failure must leave the complete argument and text diagrams usable.
  const fallback=await browser.newPage();await fallback.route('**/vendor/plotly-basic-4.1.2.min.js',r=>r.abort());
  await fallback.goto('http://127.0.0.1:4193/?lang=fr#view=politics&topic=gender-war');
  await fallback.waitForFunction(()=>document.querySelectorAll('.ga-load-error').length===2);
  assert.equal(await fallback.locator('.ga-text-version[open]').count(),2);
  assert.equal(await fallback.locator('.ga-load-error').first().innerText(),data.words.fallback.fr);
  console.log('PASS: author argument, 4 languages, Plotly scenarios, speech navigation, keyboard, mobile/desktop, wheel scrolling and failure fallback.');
 }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
