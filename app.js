/* Read-only topic navigation; content is published from the repository. */
(() => {
  'use strict';
  const sections=[{id:'market',name:'Jobs',description:'Job observatory'},{id:'politics',name:'Politics',description:'Political research'},{id:'philosophy',name:'Philosophy',description:'Philosophical research'},{id:'religion',name:'Religion',description:'Religious research'}];
  let menuOpen=false;
  function render(){
    const id=new URLSearchParams(location.hash.slice(1)).get('view');
    const section=sections.find(s=>s.id===id)||sections[0];
    document.title=`${section.description} — Mind castle`;
    document.querySelector('#app').innerHTML=`<div class="app-shell ${menuOpen?'menu-open':''}"><aside class="sidebar" aria-label="Research sections"><a class="site-brand" href="#view=market">Mind castle</a><span class="sidebar-label">RESEARCH LIBRARY</span><nav>${sections.map(s=>`<a href="#view=${s.id}" ${s.id===section.id?'aria-current="page"':''}>${s.name}</a>`).join('')}</nav></aside><button class="menu-scrim" aria-label="Close navigation"></button><main class="main"><header class="topbar"><button class="menu-toggle" aria-label="Open navigation" aria-expanded="${menuOpen}">☰</button><span>${section.name}</span></header><div class="workspace-content market-view"><div class="content-scroll" tabindex="-1"><div class="page-wrap">${section.id==='market'?MindMarket.render():`<section class="topic-page"><div class="eyebrow">RESEARCH LIBRARY</div><h1>${section.name}</h1><p class="subtitle">${section.description}</p><div class="topic-empty">No research published in this section yet.</div></section>`}</div></div></div></main></div>`;
    document.querySelector('.menu-toggle').onclick=()=>{menuOpen=!menuOpen;render();};
    document.querySelector('.menu-scrim').onclick=()=>{menuOpen=false;render();};
  }
  window.addEventListener('hashchange',()=>{menuOpen=false;render();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuOpen){menuOpen=false;render();document.querySelector('.menu-toggle').focus();}});
  render();
})();
