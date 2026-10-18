/* Repository-owned translations. No visitor text is sent to a translation service. */
(() => {
 'use strict';
 const codes=['en','fr','ja','ru'],labels=['EN','FR','JP','RU'];
 const names=['English','Français','日本語','Русский'];
 const params=new URLSearchParams(location.search),collect=params.has('collect');
 let language=codes.includes(params.get('lang'))?params.get('lang'):'en';
 let dictionary={},templates=new Map(),fragmentPattern=null,serial=0,observer;
 const cache=new Map(),nodes=new WeakMap(),attributes=new WeakMap(),missing=new Set();
 const normalize=s=>String(s).replace(/\s+/g,' ').trim();
 const numberPattern=/\d+(?:[.,]\d+)*/g;
 const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const shape=s=>{const numbers=[];return {key:s.replace(numberPattern,n=>{numbers.push(n);return '⟪'+(numbers.length-1)+'⟫'}),numbers}};
 function compile(){
  templates=new Map();
  for(const [key,value] of Object.entries(dictionary)){
   const pattern=shape(key);if(!pattern.numbers.length||key.length>180)continue;
   const used=new Set();
   const translated=value.replace(numberPattern,n=>{const i=pattern.numbers.findIndex((v,i)=>v===n&&!used.has(i));if(i<0)return n;used.add(i);return '⟪'+i+'⟫'});
   if(used.size===pattern.numbers.length&&!templates.has(pattern.key))templates.set(pattern.key,translated);
  }
  const parts=Object.keys(dictionary).filter(k=>k.length>=3&&k.length<180).sort((a,b)=>b.length-a.length);
  fragmentPattern=parts.length?new RegExp('(?<![\\p{L}\\p{N}])(?:'+parts.map(escape).join('|')+')(?![\\p{L}\\p{N}])','gu'):null;
 }
 function t(raw){
  const key=normalize(raw);if(!key||collect)return raw;
  let result=dictionary[key];
  if(result===undefined){const p=shape(key),template=templates.get(p.key);if(template)result=template.replace(/⟪(\d+)⟫/g,(_,i)=>p.numbers[Number(i)]);}
  if(result===undefined){
   if(language==='en'&&!/[А-Яа-яЁё]/.test(key))return raw;
   result=fragmentPattern?key.replace(fragmentPattern,k=>dictionary[k]):key;
   if(result===key&&/[\p{L}]/u.test(key))missing.add(key);
  }
  return raw.slice(0,raw.length-raw.trimStart().length)+result+raw.slice(raw.trimEnd().length);
 }
 const excluded=el=>!el||el.closest('script,style,code,pre,[data-no-translate],.language-switch');
 function textNode(node){
  if(excluded(node.parentElement))return;
  let record=nodes.get(node);
  if(!record||node.nodeValue!==record.output)record={source:node.nodeValue,output:null};
  const output=t(record.source);record.output=output;nodes.set(node,record);
  if(node.nodeValue!==output)node.nodeValue=output;
 }
 const translatedAttributes=['aria-label','title','placeholder','alt'];
 function element(el){
  if(excluded(el))return;
  let records=attributes.get(el);if(!records){records={};attributes.set(el,records)}
  for(const a of translatedAttributes){
   if(!el.hasAttribute(a))continue;
   const value=el.getAttribute(a);let record=records[a];
   if(!record||value!==record.output)record={source:value,output:null};
   const output=t(record.source);record.output=output;records[a]=record;
   if(value!==output)el.setAttribute(a,output);
  }
 }
 function walk(root){
  if(root.nodeType===Node.TEXT_NODE){textNode(root);return}
  if(root.nodeType!==Node.ELEMENT_NODE||excluded(root))return;
  element(root);
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){const n=walker.currentNode;if(n.nodeType===Node.TEXT_NODE)textNode(n);else element(n)}
 }
 function controls(){
  const bar=document.querySelector('.topbar');if(!bar)return;
  if(!bar.querySelector('.language-switch')){
   const nav=document.createElement('div');nav.className='language-switch';nav.setAttribute('role','radiogroup');nav.setAttribute('aria-label','Language / Langue / 言語 / Язык');nav.dataset.noTranslate='';
   nav.innerHTML='<span class="language-thumb" aria-hidden="true"></span>'+codes.map((code,i)=>`<button type="button" role="radio" data-language="${code}" lang="${code}" title="${names[i]}" aria-label="${names[i]}">${labels[i]}</button>`).join('');bar.append(nav);
  }
  const group=bar.querySelector('.language-switch');group.style.setProperty('--language-index',codes.indexOf(language));
  for(const b of group.querySelectorAll('[data-language]')){const active=b.dataset.language===language;b.setAttribute('aria-checked',String(active));b.tabIndex=active?0:-1}
 }
 function extras(){
  document.documentElement.lang=language;
  const speech=document.querySelector('.transcript-page');
  if(speech){speech.lang=language;const download=speech.querySelector('a[download]');if(download)download.href='data/transcripts/dating-speech-'+language+'.txt'}
  for(const a of document.querySelectorAll('a[href*="12axes-report-"]')){a.hreflang='en';}
 }
 const config={subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:translatedAttributes};
 function apply(){
  observer?.disconnect();
  controls();walk(document.querySelector('#app'));walk(document.querySelector('title'));extras();
  if(observer)observer.observe(document.documentElement,config);
 }
 async function load(code){
  if(!cache.has(code))cache.set(code,fetch('locales/'+code+'.json').then(r=>{if(!r.ok)throw Error('Translation unavailable');return r.json()}).catch(e=>{cache.delete(code);throw e}));
  return cache.get(code);
 }
 async function switchLanguage(code,updateURL=true){
  if(!codes.includes(code))return;
  const ticket=++serial;
  document.documentElement.dataset.languageLoading=code;
  try{
   const next=await load(code);if(ticket!==serial)return;
   language=code;dictionary=next;compile();missing.clear();
   document.querySelectorAll('.language-error').forEach(el=>el.remove());
   if(updateURL){const url=new URL(location.href);url.searchParams.set('lang',code);history.replaceState(null,'',url)}
   apply();document.documentElement.dataset.languageReady=code;
   document.dispatchEvent(new CustomEvent('mind-language-change',{detail:{language:code}}));
  }catch(e){
   // Keep the last successfully loaded language instead of mixing a failed translation into the page.
   console.error(e);document.querySelectorAll('.language-error').forEach(el=>el.remove());const status=document.createElement('p');status.className='language-error';status.role='alert';status.dataset.noTranslate='';status.textContent={en:'Language could not be loaded. Please try again.',fr:'Impossible de charger cette langue. Veuillez réessayer.',ja:'言語データを読み込めませんでした。もう一度お試しください。',ru:'Не удалось загрузить перевод. Попробуйте ещё раз.'}[language];document.querySelector('.topbar')?.append(status);
  }finally{if(ticket===serial)delete document.documentElement.dataset.languageLoading}
 }
 document.addEventListener('click',e=>{const b=e.target.closest('[data-language]');if(b)switchLanguage(b.dataset.language)});
 document.addEventListener('keydown',e=>{
  const b=e.target.closest('[data-language]');if(!b||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
  e.preventDefault();const i=codes.indexOf(b.dataset.language),next=e.key==='Home'?0:e.key==='End'?3:(i+(e.key==='ArrowRight'?1:3))%4;
  document.querySelector(`[data-language="${codes[next]}"]`).focus();switchLanguage(codes[next]);
 });
 window.addEventListener('popstate',()=>{const code=new URLSearchParams(location.search).get('lang')||'en';if(code!==language)switchLanguage(code,false)});
 window.MindI18n={t,apply,switchLanguage,get language(){return language},get missing(){return [...missing]},original:n=>nodes.get(n)?.source,originalAttribute:(el,a)=>attributes.get(el)?.[a]?.source,search:s=>String(s)+' '+t(String(s))};
 document.addEventListener('DOMContentLoaded',()=>{
  observer=new MutationObserver(records=>{
   observer.disconnect();
   controls();
   for(const r of records){if(r.type==='childList')r.addedNodes.forEach(walk);else if(r.type==='characterData')textNode(r.target);else element(r.target)}
   extras();observer.observe(document.documentElement,config);
  });
  observer.observe(document.documentElement,config);controls();
  if(collect){document.documentElement.dataset.languageReady='en';return}
  switchLanguage(language,false);
 });
})();
