/* Read-only topic navigation; content is published from the repository. */
(() => {
  'use strict';
  const sections=[
    {id:'market',name:'Jobs',description:'RPA jobs'},
    {id:'politics',name:'Politics',description:'Political research',topics:[{id:'russia-ukraine-war',name:'Russia vs Ukraine war'},{id:'gender-war',name:'Gender war'}]},
    {id:'philosophy',name:'Philosophy',description:'Philosophical research',topics:[{id:'realism-ir',name:'Realism (international relations)'},{id:'idealism-ir',name:'Idealism (international relations)'}]},
    {id:'religion',name:'Religion',description:'Religious research',topics:[{id:'eastern-orthodoxy',name:'Eastern Orthodoxy'},{id:'catholicism',name:'Catholicism'},{id:'islam',name:'Islam'},{id:'buddhism',name:'Buddhism'},{id:'shinto',name:'Shinto'}]}
  ];
  const href=(section,topic)=>`#view=${section.id}${topic?'&topic='+topic.id:''}`;
  const collapsed=new Set();
  const channelName=name=>name.toLowerCase().replace(/[()]/g,'').replace(/\s+/g,'-');
  let menuOpen=false;
  function render(){
    const params=new URLSearchParams(location.hash.slice(1));
    const section=sections.find(s=>s.id===params.get('view'))||sections[0];
    const topic=section.topics?.find(t=>t.id===params.get('topic'));
    document.title=`${topic?.name||section.description} — Mind castle`;
    const navigation=sections.map(s=>{
      const topics=s.topics||[{name:'RPA jobs'}];
      return `<div class="section-nav"><div class="category-heading"><button class="category-toggle" data-category="${s.id}" aria-label="Toggle ${s.name} category" aria-expanded="${!collapsed.has(s.id)}" aria-controls="channels-${s.id}"><span aria-hidden="true">⌄</span></button><a href="${href(s)}" ${s.id===section.id&&!topic&&s.topics?'aria-current="page"':''}>${s.name}</a></div><div class="topic-nav" id="channels-${s.id}" ${collapsed.has(s.id)?'hidden':''}>${topics.map(t=>`<a href="${href(s,t.id?t:undefined)}" aria-label="${t.name}" title="${t.name}" ${s.id===section.id&&(t.id?topic?.id===t.id:!topic)?'aria-current="page"':''}><span class="channel-hash" aria-hidden="true">#</span><span class="channel-name">${channelName(t.name)}</span></a>`).join('')}</div></div>`;
    }).join('');
    const content=section.id==='market'?MindMarket.render():section.id==='religion'?MindReligion.render(topic?.id):MindResearch.render(section,topic?.id);
    document.querySelector('#app').innerHTML=`<div class="app-shell ${menuOpen?'menu-open':''}"><aside class="sidebar" aria-label="Research sections"><a class="site-brand" href="#view=market">Mind castle</a><nav>${navigation}</nav></aside><button class="menu-scrim" aria-label="Close navigation"></button><main class="main"><header class="topbar"><button class="menu-toggle" aria-label="Open navigation" aria-expanded="${menuOpen}">☰</button><span class="channel-hash" aria-hidden="true">#</span><span class="topic-breadcrumb">${channelName(topic?.name||(section.id==='market'?'RPA jobs':section.name))}</span></header><div class="workspace-content market-view"><div class="content-scroll" tabindex="-1"><div class="page-wrap">${content}</div></div></div></main></div>`;
    document.querySelectorAll('[data-category]').forEach(button=>button.onclick=()=>{
      const id=button.dataset.category;
      if(collapsed.has(id))collapsed.delete(id);else collapsed.add(id);
      button.setAttribute('aria-expanded',String(!collapsed.has(id)));
      document.querySelector('#channels-'+id).hidden=collapsed.has(id);
    });
    document.querySelector('.menu-toggle').onclick=()=>{menuOpen=!menuOpen;render();};
    document.querySelector('.menu-scrim').onclick=()=>{menuOpen=false;render();};
  }
  window.addEventListener('hashchange',()=>{menuOpen=false;render();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen){menuOpen=false;render();document.querySelector('.menu-toggle').focus();}});
  render();
})();
