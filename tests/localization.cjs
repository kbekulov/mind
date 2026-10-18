const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const langs=['en','fr','ja','ru'];
const source=JSON.parse(fs.readFileSync('locales/source.json'));
const manifest=JSON.parse(fs.readFileSync('locales/manifest.json'));
for(const [file,hash]of Object.entries(manifest.sources))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n')).digest('hex'),hash,'Content changed without localization review: '+file);
for(const lang of langs){
 const dict=JSON.parse(fs.readFileSync('locales/'+lang+'.json'));
 for(const key of source){assert.ok(dict[key],lang+' missing '+key);assert.ok(!/⟪\s*\d+\s*⟫/.test(dict[key]),'Unresolved token '+key)}
 const transcript=fs.readFileSync('data/transcripts/dating-speech-'+lang+'.txt','utf8');
 assert.equal(transcript.trim().split(/\n\s*\n/).length,91);
 assert.equal((transcript.match(/^## /gm)||[]).length,8);
}
const routes=['market','politics','philosophy','religion',...['my-political-profile','russia-ukraine-war','wars-by-duration','wars-by-outcome','nato-and-invasions','gender-war','dating-speech-ru'].map(t=>'politics&topic='+t),...['realism-ir','idealism-ir'].map(t=>'philosophy&topic='+t),...['eastern-orthodoxy','catholicism','orthodoxy-vs-catholicism','islam','buddhism','shinto'].map(t=>'religion&topic='+t)];
(async()=>{
 fs.mkdirSync('test-results/localization',{recursive:true});
 const server=spawn(process.execPath,['scripts/serve.cjs'],{env:{...process.env,PORT:'4191'},windowsHide:true});
 await new Promise((r,j)=>{server.stdout.once('data',r);server.once('error',j)});
 const browser=await chromium.launch();
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],missing={};
  page.on('pageerror',e=>errors.push(e.message));
  for(const lang of langs){
   missing[lang]=new Set();
   for(const route of routes){
    await page.goto('http://127.0.0.1:4191/?lang='+lang+'#view='+route);
    await page.waitForFunction(l=>document.documentElement.dataset.languageReady===l,lang);
    await page.locator('.page-wrap').waitFor();
    if(route==='market')await page.locator('mind-world-map svg').waitFor();
    assert.equal(await page.locator('html').getAttribute('lang'),lang);
    assert.equal(await page.locator('[role=radio][aria-checked=true]').getAttribute('data-language'),lang);
    assert.ok(await page.locator('.content-scroll').evaluate(e=>e.scrollWidth<=e.clientWidth+1),'Overflow '+lang+' '+route);
    for(const width of [390,320]){
     await page.setViewportSize({width,height:1000});
     assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Viewport overflow '+lang+' '+route+' '+width);
     assert.ok(await page.locator('.content-scroll').evaluate(e=>e.scrollWidth<=e.clientWidth+1),'Content overflow '+lang+' '+route+' '+width);
    }
    await page.setViewportSize({width:1440,height:1000});
    for(const s of await page.evaluate(()=>MindI18n.missing))missing[lang].add(s);
    if(route.includes('dating-speech')){
     const expected=fs.readFileSync('data/transcripts/dating-speech-'+lang+'.txt','utf8').trim().split(/\n\s*\n/).filter(b=>!b.startsWith('#'));
     assert.deepEqual(await page.locator('.transcript-body>p').allTextContents(),expected);
     assert.equal(await page.locator('.transcript-page a[download]').getAttribute('href'),'data/transcripts/dating-speech-'+lang+'.txt');
    }
   }
   await page.goto('http://127.0.0.1:4191/?lang='+lang+'#view=politics&topic=my-political-profile');
   await page.waitForFunction(l=>document.documentElement.dataset.languageReady===l,lang);
   for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:1000});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Viewport overflow '+lang+width);
    assert.ok(await page.locator('.content-scroll').evaluate(e=>e.scrollWidth<=e.clientWidth+1),'Mobile content overflow '+lang+width);
    assert.ok(await page.locator('.language-switch').evaluate(e=>e.getBoundingClientRect().right<=innerWidth));
    await page.screenshot({path:'test-results/localization/'+lang+'-'+width+'.png'});
   }
   await page.setViewportSize({width:1440,height:1000});
  }
  await page.goto('http://127.0.0.1:4191/?lang=en#view=market');
  await page.waitForFunction(()=>document.documentElement.dataset.languageReady==='en');
  await page.locator('.market-kpis').waitFor();
  await page.locator('#market-tab-vacancies').click();
  await page.locator('[data-market-filter=country]').selectOption('Poland');
  const prior=await page.locator('[data-market-filter=country]').inputValue();
  await page.locator('[data-language=fr]').click();
  await page.waitForFunction(()=>document.documentElement.dataset.languageReady==='fr');
  assert.equal(await page.locator('[data-market-filter=country]').inputValue(),prior,'Switch preserves active filter');
  await page.locator('[data-market-filter=country]').selectOption('');
  await page.getByRole('searchbox').fill('Pologne');
  assert.ok(await page.locator('.vacancy-card').count()>0,'French country search finds listings');
  await page.getByRole('searchbox').fill('');
  await page.locator('[data-market-filter=country]').selectOption(prior);
  assert.match(page.url(),/lang=fr/);
  await page.locator('[data-language=fr]').press('ArrowRight');
  await page.waitForFunction(()=>document.documentElement.dataset.languageReady==='ja');
  assert.equal(await page.locator('[data-market-filter=country]').inputValue(),prior);
  await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.languageReady==='ja');
  await page.locator('mind-world-map svg').waitFor();
  await page.locator('.world-map-count[data-map-country="Lithuania"]').focus();
  await page.keyboard.press('Enter');
  const popup=page.locator('mind-world-map [role=dialog]');await popup.waitFor();
  const links=await popup.locator('a').evaluateAll(es=>es.map(e=>e.href));
  const transform=await page.locator('.world-map-geography').getAttribute('transform');
  await page.locator('[data-language=ru]').click();
  await page.waitForFunction(()=>document.documentElement.dataset.languageReady==='ru');
  assert.deepEqual(await popup.locator('a').evaluateAll(es=>es.map(e=>e.href)),links,'Switch preserves map vacancy links');
  assert.equal(await page.locator('.world-map-geography').getAttribute('transform'),transform);
  await page.goto('http://127.0.0.1:4191/?lang=fr#view=politics&topic=wars-by-duration');
  await page.waitForFunction(()=>document.documentElement.dataset.languageReady==='fr');
  await page.getByRole('searchbox').fill('hiver');
  assert.equal(await page.locator('.wa-duration-row').count(),1,'Translated conflict search');
  await page.locator('.wa-duration-detail summary').click();await page.locator('.wa-duration-row').click();
  assert.ok(await page.locator('dialog').isVisible());
  // Native modal dialogs make the header inert: switch programmatically to verify preservation.
  await page.evaluate(()=>MindI18n.switchLanguage('ja'));
  assert.ok(await page.locator('dialog').isVisible());
  assert.ok((await page.locator('dialog').innerText()).includes('冬戦争'));
  // Loading failure leaves the successful language intact and offers a retry.
  const fresh=await browser.newPage();
  await fresh.route('**/locales/fr.json',route=>route.abort());
  await fresh.goto('http://127.0.0.1:4191/?lang=en#view=politics');
  await fresh.waitForFunction(()=>document.documentElement.dataset.languageReady==='en');
  await fresh.locator('[data-language=fr]').click();await fresh.locator('.language-error').waitFor();
  assert.equal(await fresh.locator('html').getAttribute('lang'),'en');
  await fresh.unroute('**/locales/fr.json');await fresh.locator('[data-language=fr]').click();
  await fresh.waitForFunction(()=>document.documentElement.dataset.languageReady==='fr');
  assert.equal(await fresh.locator('.language-error').count(),0);await fresh.close();
  fs.writeFileSync('test-results/localization/missing.json',JSON.stringify(Object.fromEntries(Object.entries(missing).map(([l,s])=>[l,[...s]])),null,2));
  assert.deepEqual(errors,[]);
  assert.deepEqual(Object.fromEntries(Object.entries(missing).map(([l,s])=>[l,[...s]])),{en:[],fr:[],ja:[],ru:[]},'Every route has translated prose and labels');
  console.log('PASS: four-language corpus, 76 route views, full transcripts, desktop/mobile layout, URL persistence, keyboard switching, preserved filters and failed-load recovery.');
 }finally{await browser.close();server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
