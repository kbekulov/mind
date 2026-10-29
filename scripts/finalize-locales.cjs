/* Apply reviewed terminology, build complete transcript downloads and record source fingerprints. */
const fs=require('node:fs');
const crypto=require('node:crypto');
require('node:child_process').execFileSync(process.execPath,['scripts/cv-locales.cjs'],{stdio:'inherit',windowsHide:true});
require('node:child_process').execFileSync(process.execPath,['scripts/gender-locales.cjs'],{stdio:'inherit',windowsHide:true});
const languages=['en','fr','ja','ru'];
const source=JSON.parse(fs.readFileSync('locales/source.json','utf8'));
const overrides=JSON.parse(fs.readFileSync('locales/overrides.json','utf8'));
const editorial=JSON.parse(fs.readFileSync('locales/editorial.json','utf8'));
const transcriptBlocks=fs.readFileSync('data/dating-speech-ru.txt','utf8').replace(/^\uFEFF/,'').trim().split(/\r?\n\s*\r?\n/).map(b=>b.replace(/^#{1,2} /,'').replace(/\s+/g,' ').trim());
const channel=s=>s.toLowerCase().replace(/[()]/g,'').replace(/\s+/g,'-');
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const titles=['My political profile','Russia vs Ukraine war','Wars by duration','Wars by outcome','NATO & historical invasions','Gender war','Eastern Orthodoxy','Catholicism','Orthodoxy vs Catholicism','Islam','Buddhism','Shinto','Realism (international relations)','Idealism (international relations)','RPA jobs'];
const glossary=['Job observatory','Strong technical fit','Potential fit','Lower priority','Continuation War','Paternalistic Conservatism','National Conservatism','Cultural Nationalism','Pragmatic Conservatism'];
fs.mkdirSync('data/transcripts',{recursive:true});
for(const [i,language] of languages.entries()){
 const file='locales/'+language+'.json',dict=JSON.parse(fs.readFileSync(file,'utf8'));
 if(source.some(k=>typeof dict[k]!=='string'||!dict[k]))throw Error(language+': incomplete translation corpus');
 if(language!=='en')for(const term of glossary){
  const previous=dict[term],replacement=overrides[term]?.[i];
  if(previous&&replacement&&previous!==replacement){const re=new RegExp('(?<![\\p{L}])'+escape(previous)+'(?![\\p{L}])','gu');for(const key of Object.keys(dict))dict[key]=dict[key].replace(re,replacement)}
 }
 for(const [key,values] of Object.entries(overrides))dict[key]=values[i];
 for(const [key,value] of Object.entries(editorial.strings?.[language]||{}))dict[key]=value;
 for(const [index,value] of Object.entries(editorial.transcript?.[language]||{}))dict[transcriptBlocks[Number(index)]]=value;
 for(const name of titles){
  dict[channel(name)]=channel(overrides[name][i]);
  dict[name+' — Mind castle']=overrides[name][i]+' — Mind castle';
 }
 dict['Речь о знакомствах (RU) — Mind castle']=overrides['Речь о знакомствах (RU)'][i]+' — Mind castle';
 fs.writeFileSync(file,JSON.stringify(Object.fromEntries(Object.entries(dict).sort(([a],[b])=>a.localeCompare(b))),null,2)+'\n');
 const original=fs.readFileSync('data/dating-speech-ru.txt','utf8').replace(/^\uFEFF/,'').trim();
 const text=original.split(/\r?\n\s*\r?\n/).map(block=>{
  const prefix=block.match(/^#{1,2} /)?.[0]||'';const body=block.slice(prefix.length).replace(/\s+/g,' ').trim();
  if(!dict[body])throw Error('Untranslated transcript block: '+language+' '+body.slice(0,50));
  return prefix+dict[body];
 }).join('\n\n')+'\n';
 fs.writeFileSync('data/transcripts/dating-speech-'+language+'.txt',text);
}
const files=[...fs.readdirSync('.').filter(f=>f.endsWith('.js')||f==='index.html'),...fs.readdirSync('data').filter(f=>f.endsWith('.js')).map(f=>'data/'+f),'data/rpa-vacancies.json','data/dating-speech-ru.txt'];
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p,'utf8').replace(/\r\n/g,'\n')).digest('hex');
fs.writeFileSync('locales/manifest.json',JSON.stringify({languages,sourceCount:source.length,sources:Object.fromEntries(files.map(f=>[f,hash(f)])),method:'Static automated drafts with editorial terminology corrections; no claim of independent native-speaker review.',reviewedTerminology:Object.keys(overrides).length},null,2)+'\n');
console.log('Finalized '+source.length+' source strings in four languages and four complete transcript downloads.');
