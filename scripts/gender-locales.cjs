/* Register every directly authored argument and diagram label in the shared corpus. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
function collectGender(){
 const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync('data/gender-argument.js','utf8'),context);
 const map=new Map();
 function walk(value){if(!value||typeof value!=='object')return;if(Object.hasOwn(value,'en')){for(const l of ['en','fr','ja','ru'])assert.ok(typeof value[l]==='string'&&value[l].trim(),'Missing argument translation '+l);map.set(value.en,value);return;}Object.values(value).forEach(walk);}
 const data=context.window.MindGenderArgument;
 walk(data);
 // The category overview appends an arrow within the same translatable text node.
 const overview=Object.fromEntries(Object.entries(data.words.subtitle).map(([lang,text])=>[lang,text+' →']));
 map.set(overview.en,overview);
 return {map,data};
}
if(require.main===module){
 const {map}=collectGender(),source=new Set(JSON.parse(fs.readFileSync('locales/source.json')));
 for(const key of map.keys())source.add(key);
 for(const lang of ['en','fr','ja','ru']){const file='locales/'+lang+'.json',dict=JSON.parse(fs.readFileSync(file));for(const [key,v] of map)dict[key]=v[lang];fs.writeFileSync(file,JSON.stringify(dict,null,2)+'\n');}
 fs.writeFileSync('locales/source.json',JSON.stringify([...source].sort(),null,2)+'\n');console.log('Registered '+map.size+' author-argument translation units.');
}
module.exports={collectGender};
