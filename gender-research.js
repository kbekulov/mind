/* Author's qualitative argument. Plotly coordinates are layout only, never measurements. */
(() => {
  'use strict';
  const D=window.MindGenderArgument;
  const lang=()=>window.MindI18n?.language||'en';
  const t=v=>v[lang()];
  const w=k=>t(D.words[k]);
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let scenario='original',plotlyPromise;
  const scenarios=['original','equal','reversed'];
  function paths(kind='flow'){
    if(kind==='analogy')return [['consumption','drinking','restraint'],['opportunity','enterprise','achievement']];
    if(scenario==='equal')return [['sameAccess','sameEffort','sameJudgment'],['sameAccess','sameEffort','sameJudgment']];
    const rows=[['easy','restraint','stigma'],['hard','achievement','credit']];
    return scenario==='reversed'?rows.reverse():rows;
  }
  function textPaths(kind){return `<ul class="ga-text-paths">${paths(kind).map((row,i)=>`<li>${kind==='flow'?`<strong>${w(i?'men':'women')}</strong>: `:''}${row.map(k=>esc(w(k))).join(' → ')}</li>`).join('')}</ul>`;}
  function figure(kind,title){return `<figure class="ga-figure"><figcaption><span class="ga-kicker">${w('conceptual')}</span><h2>${w(title)}</h2></figcaption>${kind==='flow'?`<p>${w('flowIntro')}</p><div class="ga-scenarios" role="group" aria-label="${w('scenarioLabel')}">${scenarios.map(id=>`<button type="button" data-ga-scenario="${id}" aria-pressed="${scenario===id}">${w(id)}</button>`).join('')}</div><p class="ga-scenario-note" aria-live="polite">${w(scenario+'Note')}</p>`:`<p>${w('analogyIntro')}</p>`}<mind-gender-diagram kind="${kind}" role="img" aria-label="${w(title)}"></mind-gender-diagram><p class="ga-figure-note">${w('graphNote')}</p><details class="ga-text-version" data-ga-detail="${kind}"><summary>${w('accessible')}</summary><div data-ga-text-paths="${kind}">${textPaths(kind)}</div></details></figure>`;}
  function render(){return `<article id="gender-argument" class="topic-page research-page ga-page" data-no-translate lang="${lang()}"><header class="ga-hero"><span class="ga-kicker">${w('eyebrow')}</span><h1>${w('title')}</h1><p class="ga-subtitle">${w('subtitle')}</p><span class="ga-status">${w('status')}</span></header><section class="ga-thesis"><h2>${w('thesis')}</h2><p>${w('thesisText')}</p></section><section class="ga-premise"><h2>${w('premiseTitle')}</h2><p>${w('premiseText')}</p></section>${figure('flow','flowTitle')}<section class="ga-comparison"><h2>${w('tableTitle')}</h2><div class="ga-table-wrap" tabindex="0" role="region" aria-label="${w('tableTitle')}"><table><caption>${w('status')}</caption><thead><tr><th scope="col">${w('dimension')}</th><th scope="col">${w('women')}</th><th scope="col">${w('men')}</th></tr></thead><tbody>${D.rows.map(row=>`<tr><th scope="row">${esc(t(row[0]))}</th>${row.slice(1).map(cell=>`<td>${esc(t(cell))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>${figure('analogy','analogyTitle')}<p class="ga-analogy-limit">${w('analogyLimit')}</p><details class="ga-evidence" data-ga-detail="evidence"><summary>${w('evidenceTitle')}</summary><p>${w('evidenceText')}</p><p>${w('limits')}</p><p>${w('test')}</p></details><a class="transcript-entry" href="#view=politics&topic=dating-speech-ru"><strong>${w('speech')}</strong><span>${w('speechLink')}</span></a></article>`;}
  function loadPlotly(){
    if(window.Plotly)return Promise.resolve(window.Plotly);
    if(!plotlyPromise)plotlyPromise=new Promise((resolve,reject)=>{
      const s=document.createElement('script');s.src='vendor/plotly-basic-4.1.2.min.js';s.onload=()=>resolve(window.Plotly);s.onerror=()=>{s.remove();plotlyPromise=null;reject(Error('Plotly unavailable'));};document.head.append(s);
    });
    return plotlyPromise;
  }
  function wrap(text,width){
    const chars=[...text],lines=[];
    if(lang()==='ja'){for(let i=0;i<chars.length;i+=width)lines.push(chars.slice(i,i+width).join(''));}
    else{let line='';for(const word of text.split(' ')){if(line.length&&line.length+word.length+1>width){lines.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)lines.push(line);}
    return lines.map(esc).join('<br>');
  }
  class GenderDiagram extends HTMLElement{
    connectedCallback(){
      this.drawSerial=0;this.width=0;this.observer=new ResizeObserver(entries=>{const width=Math.round(entries[0].contentRect.width);if(width&&width!==this.width){this.width=width;clearTimeout(this.timer);this.timer=setTimeout(()=>this.draw(),60);}});this.observer.observe(this);
      this.draw();
    }
    disconnectedCallback(){this.drawSerial++;this.observer?.disconnect();clearTimeout(this.timer);if(window.Plotly&&this.plot)window.Plotly.purge(this.plot);}
    async draw(){
      const ticket=++this.drawSerial;
      try{
        const P=await loadPlotly();if(!this.isConnected||ticket!==this.drawSerial)return;
        const kind=this.getAttribute('kind'),mobile=this.clientWidth<650,rows=paths(kind),colors=['#a5acff','#75d6b0'];
        const height=mobile?690:330,annotations=[],shapes=[],x=[],y=[],labels=[];
        rows.forEach((row,r)=>{
          if(kind==='flow')annotations.push({xref:'paper',yref:'paper',x:mobile?.5:0,y:mobile?(r?0.47:1):r?.47:1,text:'<b>'+esc(w(r?'men':'women'))+'</b>',showarrow:false,xanchor:mobile?'center':'left',yanchor:'top',font:{size:14,color:colors[r]}});
          row.forEach((key,c)=>{
            const nx=mobile?.5:[.16,.5,.84][c],ny=mobile?(.88-r*.51-c*.145):(r?.24:.77),halfW=mobile?.47:.145,halfH=mobile?.053:.14;
            x.push(nx);y.push(ny);labels.push(w(key));
            shapes.push({type:'rect',xref:'paper',yref:'paper',x0:nx-halfW,x1:nx+halfW,y0:ny-halfH,y1:ny+halfH,fillcolor:'#232428',line:{color:colors[r],width:1.4}});
            annotations.push({xref:'paper',yref:'paper',x:nx,y:ny,text:wrap(w(key),lang()==='ja'?(mobile?17:12):(mobile?27:23)),showarrow:false,xanchor:'center',yanchor:'middle',align:'center',font:{size:mobile?14:15,color:'#f2f3f5'}});
            if(c<2)annotations.push({xref:'x',yref:'y',axref:'x',ayref:'y',x:mobile?nx:nx+.34-halfW-.012,y:mobile?ny-.145+halfH+.012:ny,ax:mobile?nx:nx+halfW+.012,ay:mobile?ny-halfH-.012:ny,text:'',showarrow:true,arrowhead:2,arrowsize:1,arrowwidth:2,arrowcolor:colors[r]});
          });
        });
        if(!this.plot){this.plot=document.createElement('div');this.append(this.plot);}
        const data=[{type:'scatter',mode:'markers',x,y,customdata:labels,marker:{size:10,color:'#939bff',opacity:0},hoverinfo:'skip'}];
        const layout={height,autosize:true,paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',margin:{l:8,r:8,t:14,b:12},font:{family:'Arial, sans-serif',color:'#dbdee1'},xaxis:{range:[0,1],visible:false,fixedrange:true},yaxis:{range:[0,1],visible:false,fixedrange:true},annotations,shapes,showlegend:false,hovermode:false,dragmode:false};
        await P.react(this.plot,data,layout,{displayModeBar:false,scrollZoom:false,responsive:false,displaylogo:false});
        if(!this.isConnected||ticket!==this.drawSerial)return;
        this.dataset.ready='true';this.dataset.scenario=scenario;this.dataset.plotLocale=lang();
      }catch{
        if(!this.isConnected||ticket!==this.drawSerial)return;
        this.textContent=w('fallback');this.classList.add('ga-load-error');this.closest('figure').querySelector('details').open=true;
      }
    }
  }
  customElements.define('mind-gender-diagram',GenderDiagram);
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-ga-scenario]');if(!b||!scenarios.includes(b.dataset.gaScenario))return;
    scenario=b.dataset.gaScenario;
    document.querySelectorAll('[data-ga-scenario]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.gaScenario===scenario)));
    document.querySelector('.ga-scenario-note').textContent=w(scenario+'Note');
    document.querySelector('[data-ga-text-paths="flow"]').innerHTML=textPaths('flow');
    document.querySelector('mind-gender-diagram[kind="flow"]').draw();
  });
  document.addEventListener('mind-language-change',()=>{
    const root=document.getElementById('gender-argument');if(!root)return;
    const open=[...root.querySelectorAll('details[open]')].map(el=>el.dataset.gaDetail),scroll=document.querySelector('.content-scroll'),top=scroll.scrollTop;
    root.outerHTML=render();for(const id of open)document.querySelector(`[data-ga-detail="${id}"]`).open=true;scroll.scrollTop=top;
  });
  window.MindGenderResearch={render,paths,get scenario(){return scenario}};
})();
