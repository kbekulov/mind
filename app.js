/* Published content comes from the repository. There is no browser workspace. */
(() => {
  'use strict';
  document.title = 'Job observatory — Mind castle';
  document.querySelector('#app').innerHTML = `<div class="app-shell"><main class="main"><header class="topbar"><a class="site-brand" href="./">Mind castle</a><span class="site-description">Research library</span></header><div class="workspace-content market-view"><div class="content-scroll" tabindex="-1"><div class="page-wrap">${MindMarket.render()}</div></div></div></main></div>`;
})();
