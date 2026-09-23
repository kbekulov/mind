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
      assert.equal(await page.locator('.inspector,.spaces-grid,textarea,[contenteditable],input[type=file]').count(),0);
      assert.equal(await page.getByRole('button',{name:/New document|Add a space|Add channel|Inbox|Workspace settings|Import/i}).count(),0);
      assert.equal(await page.evaluate(()=>localStorage.getItem('mind.workspace.v1')),'legacy-user-data');
    }
    for(const name of ['Politics','Philosophy','Religion']){
      await page.locator('.sidebar').getByRole('link',{name,exact:true}).click();
      await page.getByRole('heading',{name,exact:true,level:1}).waitFor();
      assert.equal(await page.locator('.sidebar').getByRole('link',{name,exact:true}).getAttribute('aria-current'),'page');
    }
    for(const [parent,names] of Object.entries({Politics:['Russia vs Ukraine war','Gender war'],Religion:['Eastern Orthodoxy','Catholicism','Islam','Buddhism','Shinto'],Philosophy:['Realism (international relations)','Idealism (international relations)']})){
      await page.locator('.sidebar').getByRole('link',{name:parent,exact:true}).click();
      await page.getByRole('heading',{name:parent,exact:true}).waitFor();
      assert.equal(await page.locator('.topic-card').count(),names.length);
      for(const name of names){
        await page.locator('.topic-nav').getByRole('link',{name,exact:true}).click();
        await page.getByRole('heading',{name,exact:true,level:1}).waitFor();
        await page.reload();
        await page.getByRole('heading',{name,exact:true,level:1}).waitFor();
        assert.equal(await page.locator('.topic-nav').getByRole('link',{name,exact:true}).getAttribute('aria-current'),'page');
      }
    }
    await page.screenshot({path:'test-results/subsections.png'});
    await page.goto('http://127.0.0.1:4174/#view=religion');
    await page.locator('#religion-question').selectOption('2');
    assert.equal(await page.locator('.religion-compare-row').count(),5);
    assert.ok((await page.locator('#religion-comparison-results').innerText()).includes('Soma'));
    await page.screenshot({path:'test-results/religion-comparison.png'});
    for(const id of ['eastern-orthodoxy','catholicism','islam','buddhism','shinto']){
      await page.goto('http://127.0.0.1:4174/#view=religion&topic='+id);
      assert.equal(await page.locator('.religion-answer').count(),6);
      assert.equal(await page.locator('.religion-diagram').count(),2);
      assert.equal(await page.locator('.religion-answer').filter({has:page.locator('a[href^="https://"]')}).count(),6);
      await page.getByRole('button',{name:/06 What is the ultimate horizon/}).click();
      assert.equal(await page.evaluate(()=>document.activeElement.id),'religion-q-5');
      assert.ok(await page.locator('.content-scroll').evaluate(el=>el.scrollTop>0));
      await page.locator('.content-scroll').evaluate(el=>el.scrollTop=0);
      await page.screenshot({path:'test-results/religion-'+id+'.png'});
      await page.setViewportSize({width:390,height:844});
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      assert.ok(await page.locator('.content-scroll').evaluate(el=>el.scrollWidth<=el.clientWidth));
      await page.screenshot({path:'test-results/religion-'+id+'-mobile.png'});
      await page.setViewportSize({width:1536,height:1080});
    }
    await page.locator('.sidebar').getByRole('link',{name:'Jobs',exact:true}).click();
    await page.locator('.market-kpis').waitFor();
    await page.screenshot({path:'test-results/published-desktop.png'});
    const category=page.getByRole('button',{name:'Toggle Politics category'});
    await category.click();
    assert.equal(await category.getAttribute('aria-expanded'),'false');
    assert.equal(await page.locator('#channels-politics').isVisible(),false);
    await category.press('Enter');
    assert.equal(await page.locator('#channels-politics').isVisible(),true);
    await page.setViewportSize({width:390,height:844});
    await page.getByRole('button',{name:'Open navigation',exact:true}).click();
    await page.locator('.sidebar').getByRole('link',{name:'Politics',exact:true}).click();
    await page.getByRole('heading',{name:'Politics',exact:true}).waitFor();
    assert.equal(await page.locator('.menu-open').count(),0);
    await page.getByRole('button',{name:'Open navigation',exact:true}).click();
    await page.locator('.sidebar').getByRole('link',{name:'Jobs',exact:true}).click();
    await page.locator('.market-kpis').waitFor();
    await page.getByRole('tab',{name:/Vacancies/}).click();
    await page.screenshot({path:'test-results/published-mobile.png'});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    const scroller=page.locator('.content-scroll');await scroller.evaluate(el=>el.scrollTop=el.scrollHeight);
    assert.ok(await scroller.evaluate(el=>el.scrollTop>0&&Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop)<2));
    assert.deepEqual(errors,[]);
    console.log('PASS: published landing page, old bookmarks, no authoring controls or browser writes, desktop/mobile layout and scrolling.');
  }finally{await browser.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1});
