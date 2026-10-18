/* Offline draft helper. Review wording before publication; never called by the website. */
const fs=require('node:fs');
const source=JSON.parse(fs.readFileSync('locales/source.json','utf8'));
const jobs=JSON.parse(fs.readFileSync('data/rpa-vacancies.json','utf8'));
const brands=[...new Set(['Mind castle','12 Axes','C#','C++','.NET','ASP.NET','SQL','API','APIs','LLM','LLMs','RPA','UiPath','Blue Prism','Power Automate','Power Platform','JavaScript','Python','SAFe','GitHub','LinkedIn','Microsoft','Azure','AWS','OnlyFans',...jobs.jobs.flatMap(j=>[j.company,...j.tools])])].sort((a,b)=>b.length-a.length);
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const protectedPattern=new RegExp('(?<![\\p{L}\\p{N}])(?:'+brands.map(escape).join('|')+')(?![\\p{L}\\p{N}])|\\d+(?:[.,]\\d+)*','gu');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function prepare(s){const tokens=[];return {text:s.replace(protectedPattern,t=>{tokens.push(t);return '⟪'+(tokens.length-1)+'⟫'}),tokens}}
async function request(q,tl,sl){
 for(let attempt=0;attempt<5;attempt++)try{
  const response=await fetch('https://translate.googleapis.com/translate_a/single?'+new URLSearchParams({client:'gtx',sl,tl,dt:'t',q}),{signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error('HTTP '+response.status);
  const data=await response.json();return data[0].map(s=>s[0]||'').join('');
 }catch(e){if(attempt===4)throw e;await sleep(1500*(attempt+1))}
}
async function language(tl){
 const file='locales/'+tl+'.json',dict=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{};
 let done=0;
 for(const sl of ['en','ru']){
  const pending=source.filter(s=>!Object.hasOwn(dict,s)&&(/[А-Яа-яЁё]/.test(s)?'ru':'en')===sl);
  if(tl===sl){for(const s of pending)dict[s]=s;continue}
  const batches=[];let batch=[],length=0;
  for(const s of pending){if(batch.length&&(length+s.length>3000||batch.length>=45)){batches.push(batch);batch=[];length=0}batch.push(s);length+=s.length+1}if(batch.length)batches.push(batch);
  for(const entries of batches){
   const prepared=entries.map(prepare);
   let translated=(await request(prepared.map(x=>x.text).join('\n'),tl,sl)).trim().split(/\r?\n/);
   if(translated.length!==entries.length)translated=await Promise.all(prepared.map(p=>request(p.text,tl,sl)));
   for(let i=0;i<entries.length;i++){
    const {tokens}=prepared[i];let result=translated[i].trim();
    // Reject missing or duplicated protected numbers/product names instead of silently corrupting them.
    for(let n=0;n<tokens.length;n++)if((result.match(new RegExp('⟪\\s*'+n+'\\s*⟫','g'))||[]).length!==1){result=await request(prepared[i].text,tl,sl);break}
    if(tokens.some((_,n)=>(result.match(new RegExp('⟪\\s*'+n+'\\s*⟫','g'))||[]).length!==1)){
     result=await request(entries[i],tl,sl);
     fs.appendFileSync('test-results/translation-review.jsonl',JSON.stringify({language:tl,source:entries[i],translation:result})+'\n');
     dict[entries[i]]=result;continue;
    }
    for(let n=0;n<tokens.length;n++){
     const re=new RegExp('⟪\\s*'+n+'\\s*⟫','g');
     if((result.match(re)||[]).length!==1)throw Error('Protected token lost: '+tl+' '+entries[i]);
     result=result.replace(re,()=>tokens[n]);
    }
    dict[entries[i]]=result;
   }
   fs.writeFileSync(file,JSON.stringify(dict,null,2)+'\n');
   done+=entries.length;
   if(done%200<45)console.log(tl+': '+Object.keys(dict).length+'/'+source.length);
   await sleep(150);
  }
 }
 fs.writeFileSync(file,JSON.stringify(dict,null,2)+'\n');console.log(tl+' complete: '+Object.keys(dict).length);
}
Promise.all(['en','fr','ja','ru'].map(language)).catch(e=>{console.error(e);process.exitCode=1});
