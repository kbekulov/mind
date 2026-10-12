const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const path=require('node:path');
(async()=>{
  const server=spawn(process.execPath,[path.join(__dirname,'../scripts/serve.cjs')],{env:{...process.env,PORT:'4183'},windowsHide:true});
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
  const browser=await chromium.launch();
  try{
    const page=await browser.newPage({viewport:{width:1536,height:1100}}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.addInitScript(()=>{Storage.prototype.setItem=()=>{throw Error('No content writes')};});
    const go=async type=>{await page.goto('http://127.0.0.1:4183/#view=politics&topic=wars-by-'+type);await page.locator('.war-atlas').waitFor()};
    await go('duration');
    const data=await page.evaluate(()=>window.MindWarAtlasData);
    assert.equal(data.durations.length,127);assert.equal(data.outcomes.length,55);
    assert.equal(new Set([...data.durations,...data.outcomes].map(w=>w.id)).size,182);
    for(const w of data.durations){assert.ok(w.years>0&&Number.isFinite(w.years));assert.ok(w.referenceDuration);}
    for(const w of data.outcomes){assert.ok(Date.parse(w.end)>=Date.parse(w.start));assert.ok(w.original);assert.ok(w.perspective);}
    for(const w of [...data.durations,...data.outcomes])for(const s of w.sources)assert.ok(data.sources[s]?.url.startsWith('https://'));
    const ukraine=data.durations.find(w=>w.highlight);
    assert.equal((Date.parse(data.snapshot)-Date.parse(ukraine.start))/86400000,1691);
    assert.ok(Math.abs(ukraine.years-1691/data.yearDays)<.001);
    assert.equal(await page.locator('.wa-duration-row').count(),127);
    assert.equal(await page.locator('.wa-marker').count(),127);
    assert.equal(await page.locator('.wa-duration-group').count(),6);
    assert.equal((await page.locator('.wa-duration-group h2>span').allTextContents()).reduce((a,b)=>a+Number(b),0),127);
    await page.getByRole('searchbox').fill('Winter');
    assert.equal(await page.locator('.wa-duration-row').count(),1);
    const marker=page.locator('.wa-marker');await marker.focus();await page.keyboard.press('Enter');
    assert.ok(await page.locator('dialog').isVisible());
    assert.ok((await page.locator('dialog').innerText()).includes('105'));
    assert.equal(await page.locator('dialog .wa-links a').count(),1);
    await page.keyboard.press('Escape');assert.ok(!(await page.locator('dialog').isVisible()));
    assert.ok(await marker.evaluate(el=>document.activeElement===el));
    await page.locator('.wa-reset').click();
    await page.locator('.wa-participation').selectOption('russian');
    assert.equal(await page.locator('.wa-duration-row').count(),data.durations.filter(w=>w.russian).length);
    await page.locator('.wa-reset').click();await page.locator('.wa-review').selectOption('checked');
    assert.equal(await page.locator('.wa-duration-row').count(),3);
    await page.getByRole('searchbox').fill('not-a-conflict-123');
    assert.equal(await page.locator('.wa-duration-row').count(),0);assert.equal(await page.locator('.wa-marker').count(),0);
    await page.locator('.wa-reset').click();
    for(const type of ['duration','outcome']){
      await go(type);await page.reload();
      assert.equal(await page.getByRole('heading',{name:'Wars by '+type,exact:true,level:1}).count(),1);
      assert.ok((await page.locator('.wa-provenance').innerText()).includes(type==='duration'?'supplied estimates':'reference author'));
      for(const width of [1536,1024,390,320]){
        await page.setViewportSize({width,height:1100});
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'document '+width);
        assert.ok(await page.locator('.war-atlas').evaluate(el=>el.scrollWidth<=el.clientWidth+1),'atlas '+width);
        assert.ok(await page.locator('.content-scroll').evaluate(el=>el.scrollWidth<=el.clientWidth+1),'content '+width);
        await page.locator('.wa-header').scrollIntoViewIfNeeded();
        await page.screenshot({path:`test-results/war-${type}-${width}.png`});
        await page.locator(type==='duration'?'.wa-chart-panel':'.wa-timeline-scroll').scrollIntoViewIfNeeded();
        await page.screenshot({path:`test-results/war-${type}-chart-${width}.png`});
        const scroller=page.locator('.content-scroll');await scroller.evaluate(el=>el.scrollTop=el.scrollHeight);
        assert.ok(await scroller.evaluate(el=>el.scrollTop>0&&Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop)<2));
      }
      await page.setViewportSize({width:1536,height:1100});
    }
    await go('outcome');
    assert.equal(await page.locator('.wa-time-row').count(),55);
    assert.equal((await page.locator('.wa-outcome-stats strong').allTextContents()).reduce((a,b)=>a+Number(b),0),55);
    await page.locator('.wa-result').selectOption('defeat');
    assert.equal(await page.locator('.wa-time-row').count(),data.outcomes.filter(w=>w.result==='defeat').length);
    await page.locator('.wa-reset').click();await page.locator('[data-wa-era="federation"]').click();
    assert.equal(await page.locator('.wa-time-row').count(),data.outcomes.filter(w=>w.end>='1991-01-01').length);
    const before=await page.locator('.wa-summary').innerText();
    await page.getByRole('button',{name:'Zoom in timeline',exact:true}).click();
    assert.notEqual(await page.locator('.wa-summary').innerText(),before);
    await page.getByRole('button',{name:'Later years',exact:true}).click();
    await page.locator('.wa-reset').click();await page.locator('.wa-crises').check();
    assert.ok(await page.locator('.wa-crisis-band').count()>0);
    assert.ok((await page.locator('.wa-crisis-key').innerText()).includes('does not establish'));
    await page.locator('.wa-reset').click();
    const plot=page.locator('.wa-timeline-scroll');await plot.scrollIntoViewIfNeeded();
    await plot.evaluate(el=>el.scrollTop=el.scrollHeight);assert.ok(await plot.evaluate(el=>el.scrollTop>0));
    const box=await plot.boundingBox();await page.mouse.move(box.x+box.width*.8,box.y+130);
    const wheelBefore=await page.locator('.wa-summary').innerText();await page.mouse.wheel(0,-160);
    await page.waitForFunction(old=>document.querySelector('.wa-summary').innerText!==old,wheelBefore);
    await page.locator('.wa-reset').click();await page.locator('.wa-result').selectOption('ongoing');
    assert.equal(await page.locator('.wa-time-row').count(),1);
    await page.locator('.wa-time-name').click();
    assert.ok((await page.locator('dialog').innerText()).includes('12 Oct 2026'));
    assert.ok(await page.locator('dialog .wa-links a').count()>=1);
    await page.locator('.wa-close').click();
    await page.locator('.wa-reset').click();await page.getByRole('searchbox').fill('no-match-123');
    assert.equal(await page.locator('.wa-time-row').count(),0);
    assert.ok((await page.locator('.wa-results').innerText()).includes('No conflicts match'));
    await page.locator('.wa-related').click();await page.locator('[data-wa-type="duration"]').waitFor();
    await page.goBack();await page.locator('[data-wa-type="outcome"]').waitFor();
    assert.equal(await page.locator('.wa-time-row').count(),55);
    assert.deepEqual(errors,[]);
    console.log('PASS: war catalogue data, filters, attribution, details, keyboard, responsive layout, scroll, era overlap, wheel zoom, pan, reset and navigation.');
  }finally{await browser.close();server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
