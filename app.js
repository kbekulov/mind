/* Read-only topic navigation; content is published from the repository. */
(() => {
  'use strict';
  const sections=[
    {id:'market',name:'Jobs',description:'Job observatory'},
    {id:'politics',name:'Politics',description:'Political research',topics:[{id:'russia-ukraine-war',name:'Russia vs Ukraine war'},{id:'gender-war',name:'Gender war'}]},
    {id:'philosophy',name:'Philosophy',description:'Philosophical research',topics:[{id:'realism-ir',name:'Realism (international relations)'},{id:'idealism-ir',name:'Idealism (international relations)'}]},
    {id:'religion',name:'Religion',description:'Religious research',topics:[{id:'eastern-orthodoxy',name:'Eastern Orthodoxy'},{id:'catholicism',name:'Catholicism'},{id:'islam',name:'Islam'},{id:'buddhism',name:'Buddhism'},{id:'shinto',name:'Shinto'}]}
  ];
  const href=(section,topic)=>`#view=${section.id}${topic?'&topic='+topic.id:''}`;
  let menuOpen=false;
  function render(){
    const params=new URLSearchParams(location.hash.slice(1));
    const section=sections.find(s=>s.id===params.get('view'))||sections[0];
    const topic=section.topics?.find(t=>t.id===params.get('topic'));
    document.title=`${topic?.name||section.description} — Mind castle`;
    const navigation=sections.map(s=>`<div class="section-nav"><a href="${href(s)}" ${s.id===section.id&&!topic?'aria-current="page"':''} class="${s.id===section.id?'active-section':''}">${s.name}</a>${s.id===section.id&&s.topics?`<div class="topic-nav">${s.topics.map(t=>`<a href="${href(s,t)}" ${topic?.id===t.id?'aria-current="page"':''}>${t.name}</a>`).join('')}</div>`:''}</div>`).join('');
    const content=section.id==='market'?MindMarket.render():`<section class="topic-page"><div class="eyebrow">${topic?section.name.toUpperCase():'RESEARCH LIBRARY'}</div><h1>${topic?.name||section.name}</h1>${topic?'<div class="topic-empty">No research published in this section yet.</div>':`<p class="subtitle">${section.description}</p><div class="topic-grid">${section.topics.map(t=>`<a class="topic-card" href="${href(section,t)}"><h2>${t.name}</h2><span>View section →</span></a>`).join('')}</div>`}</section>`;
    document.querySelector('#app').innerHTML=`<div class="app-shell ${menuOpen?'menu-open':''}"><aside class="sidebar" aria-label="Research sections"><a class="site-brand" href="#view=market">Mind castle</a><span class="sidebar-label">RESEARCH LIBRARY</span><nav>${navigation}</nav></aside><button class="menu-scrim" aria-label="Close navigation"></button><main class="main"><header class="topbar"><button class="menu-toggle" aria-label="Open navigation" aria-expanded="${menuOpen}">☰</button><a href="${href(section)}">${section.name}</a>${topic?`<span aria-hidden="true">/</span><span class="topic-breadcrumb">${topic.name}</span>`:''}</header><div class="workspace-content market-view"><div class="content-scroll" tabindex="-1"><div class="page-wrap">${content}</div></div></div></main></div>`;
    document.querySelector('.menu-toggle').onclick=()=>{menuOpen=!menuOpen;render();};
    document.querySelector('.menu-scrim').onclick=()=>{menuOpen=false;render();};
  }
  window.addEventListener('hashchange',()=>{menuOpen=false;render();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen){menuOpen=false;render();document.querySelector('.menu-toggle').focus();}});
  render();
})();
