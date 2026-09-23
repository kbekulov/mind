const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const path=require('node:path');
const fs=require('node:fs');
const data=require('../data/rpa-vacancies.json');

(async()=>{
  assert.equal(data.schemaVersion,1);
  assert.equal(new Set(data.jobs.map(j=>j.id)).size,data.jobs.length);
  assert.equal(new Set(data.jobs.map(j=>[j.company,j.title,j.country].join('|'))).size,data.jobs.length);
  for(const job of data.jobs){
    for(const field of ['title','company','country','region','mode','level','sourceType','verification'])assert.ok(job[field],`${job.id}: ${field}`);
    assert.ok(['Europe','Asia'].includes(job.region));
    assert.ok(job.tools.length&&new Set(job.tools).size===job.tools.length);
    for(const url of [job.sourceUrl,job.evidenceUrl])assert.equal(new URL(url).protocol,'https:');
    assert.ok(job.checkedAt===data.researchedAt);
    if(job.postedAt)assert.ok(Date.parse(job.postedAt)<=Date.parse(job.checkedAt));
    if(job.salary)assert.ok(job.salary.min>0&&(!job.salary.max||job.salary.max>=job.salary.min));
  }
  const server=spawn(process.execPath,[path.join(__dirname,'../scripts/serve.cjs')],{env:{...process.env,PORT:'4175'},windowsHide:true});
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
  const browser=await chromium.launch({headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1536,height:1080}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4175');
    await page.locator('.research-entry').waitFor();
    const notes=await page.evaluate(()=>localStorage.getItem('mind.workspace.v1'));
    await page.getByRole('button',{name:'Job observatory',exact:true}).click();
    await page.locator('.market-kpis').waitFor();
    assert.equal(await page.locator('.rail').count(),0);
    assert.equal(await page.locator('.inspector').count(),0);
    assert.equal(await page.locator('.market-kpis strong').first().textContent(),String(data.jobs.length));
    await page.screenshot({path:'test-results/market-desktop.png',fullPage:false});
    await page.getByLabel('Regions',{exact:true}).selectOption('Asia');
    const asian=data.jobs.filter(j=>j.region==='Asia');
    assert.equal(await page.locator('.market-kpis strong').first().textContent(),String(asian.length));
    await page.getByLabel('Countries',{exact:true}).selectOption('Malaysia');
    await page.getByRole('tab',{name:/Vacancies/}).click();
    assert.equal(await page.locator('.vacancy-card').count(),data.jobs.filter(j=>j.country==='Malaysia').length);
    await page.getByRole('button',{name:'Reset filters',exact:true}).click();
    await page.getByLabel('Search vacancies',{exact:true}).fill('a-nonexistent-employer');
    await page.getByRole('heading',{name:'No matching vacancies'}).waitFor();
    await page.getByRole('button',{name:'Show all vacancies'}).click();
    assert.equal(await page.locator('.vacancy-card').count(),data.jobs.length);
    await page.locator('.more-filters summary').click();
    await page.getByLabel('Disclosed salary only').check();
    assert.equal(await page.locator('.vacancy-card').count(),data.jobs.filter(j=>j.salary).length);
    const download=page.waitForEvent('download');
    await page.getByRole('button',{name:'Export results'}).click();
    const file=await download;const exported=JSON.parse(fs.readFileSync(await file.path()));
    assert.equal(exported.jobs.length,data.jobs.filter(j=>j.salary).length);
    assert.ok(exported.methodology.length);
    await page.getByRole('button',{name:'Reset filters',exact:true}).click();
    await page.getByRole('tab',{name:'Overview',exact:true}).click();
    const cell=page.locator('[data-market-country]').first(),country=await cell.getAttribute('data-market-country'),tool=await cell.getAttribute('data-market-tool');
    await cell.click();
    assert.equal(await page.locator('.vacancy-card').count(),data.jobs.filter(j=>j.country===country&&j.tools.includes(tool)).length);
    await page.getByRole('tab',{name:'Sources & method'}).click();
    assert.equal(await page.locator('.source-register a').count(),data.jobs.length);
    assert.equal(await page.locator('.excluded-source').count(),data.excluded.length);
    await page.getByRole('tab',{name:'Sources & method'}).press('Home');
    assert.equal(await page.getByRole('tab',{name:'Overview',exact:true}).getAttribute('aria-selected'),'true');
    assert.equal(await page.evaluate(()=>localStorage.getItem('mind.workspace.v1')),notes,'Research must not overwrite personal notes');
    await page.getByRole('button',{name:'Reset filters',exact:true}).click();
    await page.setViewportSize({width:390,height:844});
    await page.screenshot({path:'test-results/market-mobile.png',fullPage:false});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No page overflow');
    await page.getByRole('button',{name:'Open navigation'}).click();
    await page.waitForFunction(()=>Math.round(document.querySelector('.sidebar').getBoundingClientRect().left)===0);
    assert.ok(await page.locator('.sidebar').evaluate(el=>Math.abs(el.getBoundingClientRect().left)<1));
    await page.getByRole('button',{name:'Home',exact:true}).click();
    await page.getByRole('heading',{name:'Make yourself at home.'}).waitFor();
    assert.equal(errors.length,0,errors.join('\n'));
    const offline=await browser.newPage();
    await offline.route('**/data/rpa-vacancies.json',r=>r.abort());
    await offline.goto('http://127.0.0.1:4175/#view=market');
    await offline.getByRole('button',{name:'Retry loading research'}).waitFor();
    await offline.unroute('**/data/rpa-vacancies.json');
    await offline.getByRole('button',{name:'Retry loading research'}).click();
    await offline.locator('.market-kpis').waitFor();
    // Desktop regression: long content must scroll inside the fixed shell.
    await page.setViewportSize({width:1440,height:720});
    await page.evaluate(()=>{
      const state=JSON.parse(localStorage.getItem('mind.workspace.v1'));
      const seed=state.documents[0];
      for(let i=0;i<45;i++)state.documents.push({...seed,id:'scroll-test-'+i,title:'Scroll record '+i,body:('## Long document\n\nParagraph for testing the reader.\n\n').repeat(80)});
      localStorage.setItem('mind.workspace.v1',JSON.stringify(state));
    });
    for(const hash of ['home','all','board','doc&doc=scroll-test-0','market']){
      await page.goto('http://127.0.0.1:4175/#view='+hash);
      await page.locator('.page-wrap').waitFor();
      if(hash==='market')await page.locator('.market-kpis').waitFor();
      const scroll=page.locator('.content-scroll');
      assert.ok(await scroll.evaluate(el=>el.clientHeight<el.scrollHeight),hash+' has scrollable content');
      await scroll.hover();
      await page.mouse.wheel(0,600);
      await page.waitForFunction(()=>document.querySelector('.content-scroll').scrollTop>0);
      await scroll.evaluate(el=>el.scrollTop=el.scrollHeight);
      assert.ok(await scroll.evaluate(el=>Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop)<2),hash+' reaches bottom');
      assert.ok(await page.locator('.topbar').evaluate(el=>el.getBoundingClientRect().top===0),'Header stays fixed');
    }
    console.log(`PASS: ${data.jobs.length} source records, filters, counts, matrix drill-down, export, notes preservation, mobile navigation, load recovery.`);
  }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
