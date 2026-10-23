/* Harvest published UI, complete documents and every catalogue drill-down. No private inputs. */
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const routes=['market','market&topic=cv','politics','philosophy','religion',...['my-political-profile','russia-ukraine-war','wars-by-duration','wars-by-outcome','nato-and-invasions','gender-war','dating-speech-ru'].map(t=>'politics&topic='+t),...['realism-ir','idealism-ir'].map(t=>'philosophy&topic='+t),...['eastern-orthodoxy','catholicism','orthodoxy-vs-catholicism','islam','buddhism','shinto'].map(t=>'religion&topic='+t)];
(async()=>{
 const server=spawn(process.execPath,[path.join(__dirname,'serve.cjs')],{env:{...process.env,PORT:'4190'},windowsHide:true});
 await new Promise((r,j)=>{server.stdout.once('data',r);server.once('error',j)});
 const browser=await chromium.launch();
 const corpus=new Set();
 try{
  const page=await browser.newPage();
  await page.addInitScript(()=>{
   window.__corpus=new Set();
   window.__capture=()=>{
    const add=s=>{s=s?.replace(/\s+/g,' ').trim();if(s&&/[\p{L}]/u.test(s)&&!/^https?:|^[\d.,%\s–—+−-]+$/u.test(s))window.__corpus.add(s)};
    if(!document.body)return;
    const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(walk.nextNode())if(!walk.currentNode.parentElement.closest('script,style,[data-no-translate]'))add(window.MindI18n?.original(walk.currentNode)||walk.currentNode.nodeValue);
    for(const el of document.querySelectorAll('[aria-label],[title],[placeholder],[alt]'))if(!el.closest('[data-no-translate]'))for(const a of ['aria-label','title','placeholder','alt'])add(window.MindI18n?.originalAttribute(el,a)||el.getAttribute(a));
    add(document.title);
   };
   document.addEventListener('DOMContentLoaded',()=>new MutationObserver(()=>window.__capture()).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']}));
  });
  const save=async()=>{await page.evaluate(()=>window.__capture());for(const s of await page.evaluate(()=>[...window.__corpus]))corpus.add(s)};
  for(const route of routes){
   await page.goto('http://127.0.0.1:4190/?lang=en&collect=1#view='+route);
   await page.locator('.page-wrap').waitFor();
   if(route==='market'){
    await page.locator('.market-kpis').waitFor();
    // Capture map labels/popovers and all vacancy/profile/source tabs.
    await page.locator('mind-world-map svg').waitFor();
    const countries=await page.locator('[data-map-country]').evaluateAll(es=>[...new Set(es.map(e=>e.dataset.mapCountry))]);
    for(const country of countries){await page.evaluate(c=>document.querySelector(`[data-map-country="${CSS.escape(c)}"]`)?.dispatchEvent(new MouseEvent('click',{bubbles:true})),country);await save();}
    for(const tab of ['vacancies','profile','sources','overview']){
     await page.evaluate(t=>document.querySelector(`[data-market-tab="${t}"]`)?.click(),tab);
     if(tab==='vacancies')await page.evaluate(()=>{const s=document.querySelector('[data-market-filter="fit"]');if(s){s.value='';s.dispatchEvent(new Event('change',{bubbles:true}))}});
     await save();
    }
   }
   if(route.includes('wars-by-')){
    const ids=await page.locator('[data-wa-detail]').evaluateAll(es=>[...new Set(es.map(e=>e.dataset.waDetail))]);
    for(const id of ids){await page.evaluate(id=>document.querySelector(`[data-wa-detail="${id}"]`).dispatchEvent(new MouseEvent('click',{bubbles:true})),id);await save();await page.keyboard.press('Escape');}
   }
   if(route.includes('nato-and-')){
    const ids=await page.locator('[data-na-operation]').evaluateAll(es=>[...new Set(es.map(e=>e.dataset.naOperation))]);
    for(const id of ids){await page.evaluate(id=>document.querySelector(`[data-na-operation="${id}"]`).click(),id);await save();await page.keyboard.press('Escape');}
   }
   if(route==='religion')for(let i=0;i<6;i++){await page.locator('#religion-question').selectOption(String(i));await save()}
   await save();
   console.log(route+': '+corpus.size+' strings');
  }
  // Empty and failure states are published text too, even though normal browsing does not reach them.
  for(const route of ['market','politics&topic=wars-by-duration','politics&topic=wars-by-outcome','politics&topic=nato-and-invasions']){
   await page.goto('http://127.0.0.1:4190/?collect=1#view='+route);
   const search=page.locator('input[type=search]');await search.waitFor({state:'attached'});await search.evaluate(el=>{el.value='no-such-record-xyz';el.dispatchEvent(new Event('input',{bubbles:true}))});await save();
  }
  await page.route('**/data/rpa-vacancies.json',r=>r.abort());
  await page.goto('http://127.0.0.1:4190/?collect=1#view=market');
  await page.reload();
  await page.locator('[data-market-action=retry]').waitFor();await save();await page.unroute('**/data/rpa-vacancies.json');
  await page.route('**/data/world-map.json',r=>r.abort());
  await page.goto('http://127.0.0.1:4190/?collect=1#view=market');
  await page.reload();
  await page.locator('.world-map-loading button').waitFor();await save();
  fs.mkdirSync('locales',{recursive:true});
  fs.writeFileSync('locales/source.json',JSON.stringify([...corpus].sort(),null,2)+'\n');
  require('node:child_process').execFileSync(process.execPath,['scripts/cv-locales.cjs'],{stdio:'inherit',windowsHide:true});
  console.log('Collected '+corpus.size+' strings / '+[...corpus].join('').length+' characters');
 }finally{await browser.close();server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
