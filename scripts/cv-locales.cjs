/* Collect directly authored four-language CV content, including export-only strings. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
function loadCV(){
 const context={window:{},document:{addEventListener(){}},Intl,Date,setInterval(){},structuredClone};
 vm.createContext(context);
 vm.runInContext(fs.readFileSync('data/cv.js','utf8'),context);context.MindCVData=context.window.MindCVData;
 vm.runInContext(fs.readFileSync('data/cv-market.js','utf8'),context);
 vm.runInContext(fs.readFileSync('cv.js','utf8'),context);
 return context.window;
}
function collectCV(){
 const cv=loadCV(),map=new Map(),langs=['en','fr','ja','ru'];
 function walk(v){if(!v||typeof v!=='object')return;if(Object.hasOwn(v,'en')){for(const l of langs)assert.ok(typeof v[l]==='string'&&v[l].trim(),'Missing CV locale '+l);map.set(v.en,v);return}for(const value of Object.values(v))walk(value)}
 walk(cv.MindCVData);walk(cv.MindCVMarket);walk(cv.MindCV.words);
 return {map,cv};
}
if(require.main===module){
 const {map}=collectCV(),source=new Set(JSON.parse(fs.readFileSync('locales/source.json')));
 const nav={CV:{en:'CV',fr:'CV',ja:'履歴書',ru:'Резюме'},cv:{en:'cv',fr:'cv',ja:'履歴書',ru:'резюме'},'CV — Mind castle':{en:'CV — Mind castle',fr:'CV — Mind castle',ja:'履歴書 — Mind castle',ru:'Резюме — Mind castle'}};
 for(const [key,values]of Object.entries(nav))map.set(key,values);
 for(const key of map.keys())source.add(key);
 for(const lang of ['en','fr','ja','ru']){const path='locales/'+lang+'.json',dict=JSON.parse(fs.readFileSync(path));for(const [key,values]of map)dict[key]=values[lang];fs.writeFileSync(path,JSON.stringify(dict,null,2)+'\n')}
 fs.writeFileSync('locales/source.json',JSON.stringify([...source].sort(),null,2)+'\n');
 console.log('Registered '+map.size+' directly authored CV translation units.');
}
module.exports={collectCV,loadCV};
