const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const path=require('node:path');
(async()=>{
  const server=spawn(process.execPath,[path.join(__dirname,'../scripts/serve.cjs')],{env:{...process.env,PORT:'4174'},windowsHide:true});
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
  const browser=await chromium.launch();
  try{
    const page=await browser.newPage({viewport:{width:1536,height:1080}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.addInitScript(()=>{localStorage.setItem('mind.workspace.v1','legacy-user-data');Storage.prototype.setItem=()=>{throw Error('Read-only site must not write browser content')};Storage.prototype.removeItem=()=>{throw Error('Must not delete old browser content')};});
    for(const route of ['', '#view=inbox','#view=doc&doc=welcome','#view=home']){
      await page.goto('http://127.0.0.1:4174/'+route);
      await page.locator('.market-kpis').waitFor();
      assert.equal(await page.getByRole('heading',{name:'Job observatory',exact:true}).count(),1);
      assert.equal(await page.locator('.sidebar,.inspector,.spaces-grid,textarea,[contenteditable],input[type=file]').count(),0);
      assert.equal(await page.getByRole('button',{name:/New document|Add a space|Add channel|Inbox|Workspace settings|Import/i}).count(),0);
      assert.equal(await page.evaluate(()=>localStorage.getItem('mind.workspace.v1')),'legacy-user-data');
    }
    await page.screenshot({path:'test-results/published-desktop.png'});
    await page.setViewportSize({width:390,height:844});
    await page.getByRole('tab',{name:/Vacancies/}).click();
    await page.screenshot({path:'test-results/published-mobile.png'});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    const scroller=page.locator('.content-scroll');await scroller.evaluate(el=>el.scrollTop=el.scrollHeight);
    assert.ok(await scroller.evaluate(el=>el.scrollTop>0&&Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop)<2));
    assert.deepEqual(errors,[]);
    console.log('PASS: published landing page, old bookmarks, no authoring controls or browser writes, desktop/mobile layout and scrolling.');
  }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
