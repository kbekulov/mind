const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {spawn}=require('node:child_process');
(async()=>{
const server=spawn(process.execPath,['scripts/serve.cjs'],{env:{...process.env,PORT:'4178'},windowsHide:true});
await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject)});
const browser=await chromium.launch();
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4178/#view=politics&topic=gender-war');
 await page.locator('.transcript-entry').click();
 await page.locator('.transcript-page').waitFor();
 assert.equal(await page.locator('.transcript-page').getAttribute('lang'),'ru');
 const child=page.locator('.topic-children[aria-label="Gender war — subchannels"] a');
 assert.equal(await child.getAttribute('aria-current'),'page');
 await page.reload();await page.locator('.transcript-page').waitFor();
 const text=fs.readFileSync('data/dating-speech-ru.txt','utf8').replace(/^\uFEFF/,'').trim();
 assert.equal(await page.evaluate(()=>window.MindDatingSpeechRu),text);
 const paragraphs=text.split(/\r?\n\s*\r?\n/).filter(p=>!p.startsWith('#'));
 assert.deepEqual(await page.locator('.transcript-body>p').allTextContents(),paragraphs,'Every translated paragraph is published in order');
 assert.equal(await page.locator('.transcript-body h2').count(),8);
 assert.ok(paragraphs.some(p=>p.includes('illegal')),'Uncertain transcription is preserved and marked');
 assert.equal(await page.locator('.transcript-page a[download]').getAttribute('href'),'data/dating-speech-ru.txt');
 for(const width of [1440,390]){
 await page.setViewportSize({width,height:1000});
 await page.locator('.content-scroll').evaluate(e=>e.scrollTop=0);
 assert.ok(await page.locator('.content-scroll').evaluate(e=>e.scrollWidth<=e.clientWidth+1));
 await page.screenshot({path:`test-results/transcript-${width}.png`});
 await page.getByRole('button',{name:'08 Что, по мнению автора, может сделать мужчина',exact:true}).click();
 assert.equal(await page.evaluate(()=>document.activeElement.id),'speech-7');
 await page.locator('.content-scroll').evaluate(e=>e.scrollTop=e.scrollHeight);
 assert.ok(await page.locator('.transcript-end').isVisible());
 assert.ok(await page.locator('.content-scroll').evaluate(e=>Math.abs(e.scrollHeight-e.clientHeight-e.scrollTop)<2));
 }
 await page.getByRole('link',{name:'← Вернуться к гендерному разделу',exact:true}).click();
 await page.locator('.reproduction-study').waitFor();
 assert.deepEqual(errors,[]);
 console.log(`PASS: Russian transcript, ${paragraphs.length} complete paragraphs, nested channel, direct links, download parity, mobile and desktop scrolling.`);
}finally{await browser.close();server.kill()}
})().catch(e=>{console.error(e);process.exitCode=1});
