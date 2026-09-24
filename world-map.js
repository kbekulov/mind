/* Shared, self-hosted world map. Geometry is data; the site's CSS owns its theme. */
(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let geometryPromise;
  let savedView={center:[500,250],zoom:1};
  function geometry(){return geometryPromise ||= fetch('data/world-map.json').then(r=>{if(!r.ok)throw Error('Map unavailable');return r.json();}).catch(e=>{geometryPromise=null;throw e;});}
  class MindWorldMap extends HTMLElement {
    connectedCallback(){
      this.abort=new AbortController();
      this.counts=JSON.parse(this.dataset.counts||'{}');
      this.jobs=JSON.parse(this.dataset.jobs||'[]');
      this.maximum=Math.max(1,Number(this.dataset.maximum)||1);
      this.view={center:[...savedView.center],zoom:savedView.zoom};
      this.load();
    }
    disconnectedCallback(){this.abort?.abort();this.resize?.disconnect();if(this.frame)cancelAnimationFrame(this.frame);}
    async load(){
      this.innerHTML='<div class="world-map-loading" role="status">Loading the world map…</div>';
      try{this.geo=await geometry();if(this.isConnected)this.render();}
      catch{if(this.isConnected){this.innerHTML='<div class="world-map-loading" role="status">The map could not load. Country totals are still available in the charts. <button type="button">Retry map</button></div>';this.querySelector('button').addEventListener('click',()=>this.load(),{once:true});}}
    }
    render(){
      const total=Object.values(this.counts).reduce((a,b)=>a+b,0);
      this.entries=this.geo.countries.filter(c=>this.counts[c.name]>0);
      const levels=[...new Set([1,Math.ceil(this.maximum/2),this.maximum])];
      this.innerHTML=`<div class="world-map-toolbar"><div class="world-map-views" role="group" aria-label="Map view">${['World','Europe','Asia'].map(name=>`<button type="button" data-map-view="${name}">${name}</button>`).join('')}</div><div class="world-map-zoom" role="group" aria-label="Map zoom"><button type="button" data-map-zoom="out" aria-label="Zoom map out">−</button><span class="world-map-scale">1×</span><button type="button" data-map-zoom="in" aria-label="Zoom map in">+</button><button type="button" data-map-view="World" aria-label="Reset world map">↺</button></div></div><div class="world-map-canvas"><svg class="world-map-svg" role="group" aria-label="Interactive world vacancy map. Scroll the mouse wheel or use plus and minus to zoom, arrow keys to pan, or select a country count." tabindex="0"><g class="world-map-geography"><path class="world-map-grid" d="${this.geo.graticule}"/>${this.geo.countries.map(c=>{const n=this.counts[c.name]||0;return `<path class="world-map-country ${n?'has-vacancies':''}" data-map-country="${esc(c.name)}" data-count="${n}" d="${c.path}" ${n?`style="fill:${this.color(n)}"`:''}><title>${esc(c.name)} · ${n?n+' collected '+(n===1?'vacancy':'vacancies'):'No collected vacancies in this selection'}</title></path>`;}).join('')}</g><g class="world-map-leaders" aria-hidden="true"></g><g class="world-map-counts"></g></svg></div><div class="world-map-inspection" role="status" aria-live="polite"><strong>Explore ${this.entries.length} countries · ${total} vacancies</strong><span>Hover for details. Select a country or count to preview its vacancies.</span></div><div class="world-map-legend" aria-label="Map color scale"><span><i class="map-no-data"></i>No collected ads</span>${levels.map(n=>`<span><i style="background:${this.color(n)}"></i>${n} ${n===1?'ad':'ads'}</span>`).join('')}<small>Deeper color = more collected vacancies</small></div><p class="world-map-help">Scroll over the map to zoom · drag to pan · scroll outside the map to move the page. Small-country labels are connected to their location.</p><details class="world-map-accessible"><summary>Country totals (${this.entries.length})</summary><div>${this.entries.sort((a,b)=>a.name.localeCompare(b.name)).map(c=>`<button type="button" data-map-country="${esc(c.name)}">${esc(c.name)} <strong>${this.counts[c.name]}</strong></button>`).join('')}</div></details><div class="world-map-credit">Collected sample, not total market demand. <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Map: Natural Earth</a></div>`;
      this.svg=this.querySelector('svg');
      this.canvas=this.querySelector('.world-map-canvas');
      this.resize=new ResizeObserver(()=>this.schedule());this.resize.observe(this.canvas);
      const options={signal:this.abort.signal};
      document.addEventListener('pointerdown',e=>{
        if(this.popup&&!this.popup.contains(e.target)&&!e.target.closest('[data-map-country]'))this.closeJobs();
      },options);
      document.addEventListener('keydown',e=>{if(e.key==='Escape'&&this.popup){e.preventDefault();this.closeJobs(true);}},options);
      this.svg.addEventListener('wheel',e=>{
        if(!e.deltaY)return;
        e.preventDefault();
        const rect=this.svg.getBoundingClientRect();
        const offset=[e.clientX-rect.left-rect.width/2,e.clientY-rect.top-rect.height/2];
        const before=this.scale;
        const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?rect.height:1);
        const next=Math.max(1,Math.min(10,this.view.zoom*Math.exp(-Math.max(-500,Math.min(500,delta))*.002)));
        const after=before*next/this.view.zoom;
        this.view.center=this.view.center.map((c,i)=>c+offset[i]*(1/before-1/after));
        this.view.zoom=next;
        this.update();
      },{...options,passive:false});
      this.addEventListener('click',e=>{
        if(this.ignoreClick){this.ignoreClick=false;return;}
        if(e.target.closest("[data-map-close]")){this.closeJobs(true);return;}
        const preset=e.target.closest('[data-map-view]');
        if(preset){const v=this.geo.views[preset.dataset.mapView];this.view={center:[...v.center],zoom:v.zoom};this.update();return;}
        const zoom=e.target.closest('[data-map-zoom]');if(zoom){this.zoom(zoom.dataset.mapZoom==='in'?1.5:1/1.5);return;}
        const country=e.target.closest('[data-map-country]');if(country)this.select(country.dataset.mapCountry,country);
      },options);
      this.addEventListener('pointerover',e=>{const el=e.target.closest('[data-map-country]');if(el&&!this.drag)this.inspect(el.dataset.mapCountry);},options);
      this.addEventListener('focusin',e=>{const el=e.target.closest('[data-map-country]');if(el)this.inspect(el.dataset.mapCountry);},options);
      this.addEventListener('keydown',e=>{
        const country=e.target.closest('.world-map-count[data-map-country]');
        if(country&&['Enter',' '].includes(e.key)){e.preventDefault();this.select(country.dataset.mapCountry,country);return;}
        if(e.target!==this.svg)return;
        if(['+','=','-','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))e.preventDefault();
        if(e.key==='+'||e.key==='=')this.zoom(1.5);
        else if(e.key==='-')this.zoom(1/1.5);
        else if(e.key==='Home'){this.view={center:[500,250],zoom:1};this.update();}
        else if(e.key.startsWith('Arrow')){const step=45/this.scale;this.view.center[0]+=e.key==='ArrowRight'?step:e.key==='ArrowLeft'?-step:0;this.view.center[1]+=e.key==='ArrowDown'?step:e.key==='ArrowUp'?-step:0;this.update();}
      },options);
      this.svg.addEventListener('pointerdown',e=>{
        if(e.button!==0||(e.pointerType==='touch'&&this.view.zoom===1))return;
        this.ignoreClick=false;this.drag={id:e.pointerId,x:e.clientX,y:e.clientY,center:[...this.view.center],moved:false};
      },options);
      this.svg.addEventListener('pointermove',e=>{
        if(!this.drag||e.pointerId!==this.drag.id)return;
        const dx=e.clientX-this.drag.x,dy=e.clientY-this.drag.y;
        if(Math.hypot(dx,dy)>4){this.drag.moved=true;this.svg.setPointerCapture(e.pointerId);this.svg.classList.add('is-dragging');}
        if(this.drag.moved){this.view.center=[this.drag.center[0]-dx/this.scale,this.drag.center[1]-dy/this.scale];this.schedule();}
      },options);
      const end=e=>{if(!this.drag||e.pointerId!==this.drag.id)return;this.ignoreClick=this.drag.moved;this.drag=null;this.svg.classList.remove('is-dragging');if(this.svg.hasPointerCapture(e.pointerId))this.svg.releasePointerCapture(e.pointerId);};
      this.svg.addEventListener('pointerup',end,options);this.svg.addEventListener('pointercancel',end,options);
      this.svg.addEventListener('pointerleave',e=>{if(this.drag&&!this.drag.moved)this.drag=null;},options);
      this.update();
    }
    color(n){const weight=this.maximum===1?100:Math.max(0,Math.min(100,(n-1)/(this.maximum-1)*100));return `color-mix(in srgb, var(--map-density-3) ${weight}%, var(--map-density-1))`;}
    select(name,trigger){
      this.closeJobs();this.inspect(name);
      const jobs=this.jobs.filter(job=>job.country===name);
      if(!jobs.length)return;
      this.selectedCountry=name;this.returnTarget=trigger;
      const panel=document.createElement('section');
      panel.className='world-map-jobs';panel.setAttribute('role','dialog');panel.setAttribute('aria-label',name+' vacancies');
      panel.innerHTML='<header><div><strong>'+esc(name)+'</strong><span>'+jobs.length+' '+(jobs.length===1?'vacancy':'vacancies')+' · current filters</span></div><button type="button" data-map-close aria-label="Close country vacancies">×</button></header><p>Select a job to open the employer or vacancy page.</p><ul>'+jobs.map(job=>{
        let url;try{url=new URL(job.sourceUrl);if(!['https:','http:'].includes(url.protocol))return '';}catch{return '';}
        return '<li><a href="'+esc(url.href)+'" target="_blank" rel="noopener noreferrer"><strong>'+esc(job.title)+' <span aria-hidden="true">↗</span></strong><span>'+esc(job.company)+'</span><small>'+esc([job.location,job.mode].filter(Boolean).join(' · '))+'</small></a></li>';
      }).join('')+'</ul>';
      this.canvas.append(panel);this.popup=panel;
      panel.querySelector('button').focus({preventScroll:true});
    }
    closeJobs(restore=false){
      if(!this.popup)return;
      this.popup.remove();this.popup=null;
      if(restore){const target=this.returnTarget?.isConnected?this.returnTarget:[...this.querySelectorAll('.world-map-count')].find(el=>el.dataset.mapCountry===this.selectedCountry);(target?.matches('[tabindex],button')?target:this.svg).focus({preventScroll:true});}
    }
    inspect(name){const n=this.counts[name]||0;const box=this.querySelector('.world-map-inspection');box.innerHTML=`<strong>${esc(name)} · ${n?`${n} collected ${n===1?'vacancy':'vacancies'}`:'no collected vacancies'}</strong><span>${n?'Select to preview these vacancies here. Other filters stay applied.':'No ads in this selection does not mean no jobs exist here.'}</span>`;for(const el of this.querySelectorAll('.world-map-country'))el.classList.toggle('is-highlighted',el.dataset.mapCountry===name);}
    zoom(factor){this.view.zoom=Math.max(1,Math.min(10,this.view.zoom*factor));this.update();}
    schedule(){if(this.frame)cancelAnimationFrame(this.frame);this.frame=requestAnimationFrame(()=>{this.frame=null;if(this.isConnected)this.update();});}
    update(){
      const width=this.canvas.clientWidth,height=this.canvas.clientHeight;if(!width||!height)return;
      this.view.center[0]=Math.max(0,Math.min(1000,this.view.center[0]));this.view.center[1]=Math.max(0,Math.min(500,this.view.center[1]));
      savedView={center:[...this.view.center],zoom:this.view.zoom};
      this.scale=Math.min(width/1000,height/500)*this.view.zoom;
      const tx=width/2-this.view.center[0]*this.scale,ty=height/2-this.view.center[1]*this.scale;
      this.svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
      this.svg.style.touchAction=this.view.zoom>1?'none':'pan-y';
      this.querySelector('.world-map-geography').setAttribute('transform',`translate(${tx},${ty}) scale(${this.scale})`);
      this.querySelector('.world-map-scale').textContent=`${+this.view.zoom.toFixed(1)}×`;
      this.querySelector('[data-map-zoom="out"]').disabled=this.view.zoom<=1;
      this.querySelector('[data-map-zoom="in"]').disabled=this.view.zoom>=10;
      for(const b of this.querySelectorAll('[data-map-view]')){const v=this.geo.views[b.dataset.mapView];b.setAttribute('aria-pressed',String(Math.abs(this.view.zoom-v.zoom)<.01&&Math.hypot(this.view.center[0]-v.center[0],this.view.center[1]-v.center[1])<1));}
      const nodes=this.entries.map(c=>({name:c.name,n:this.counts[c.name],ax:c.anchor[0]*this.scale+tx,ay:c.anchor[1]*this.scale+ty})).filter(c=>c.ax>=10&&c.ax<=width-10&&c.ay>=10&&c.ay<=height-10).map(c=>({...c,x:c.ax,y:c.ay}));
      // Keep physical-size count badges legible at every zoom, displacing only collisions.
      for(let iteration=0;iteration<100;iteration++){
        for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
          const a=nodes[i],b=nodes[j];let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d<28){if(d<.01){dx=1;dy=1;d=Math.SQRT2;}const push=(28-d)/2;a.x-=dx/d*push;a.y-=dy/d*push;b.x+=dx/d*push;b.y+=dy/d*push;}
        }
        for(const n of nodes){n.x=Math.max(15,Math.min(width-15,n.x));n.y=Math.max(15,Math.min(height-15,n.y));}
      }
      this.querySelector('.world-map-leaders').innerHTML=nodes.filter(n=>Math.hypot(n.x-n.ax,n.y-n.ay)>5).map(n=>`<path d="M${n.ax},${n.ay}L${n.x},${n.y}"/><circle cx="${n.ax}" cy="${n.ay}" r="2"/>`).join('');
      this.querySelector('.world-map-counts').innerHTML=nodes.map(n=>`<g class="world-map-count" role="button" tabindex="0" data-map-country="${esc(n.name)}" data-count="${n.n}" aria-label="${esc(n.name)}: ${n.n} collected ${n.n===1?'vacancy':'vacancies'}. Preview listings." transform="translate(${n.x},${n.y})"><circle r="12"/><text text-anchor="middle" dominant-baseline="central">${n.n}</text><title>${esc(n.name)} · ${n.n}</title></g>`).join('');
    }
  }
  customElements.define('mind-world-map',MindWorldMap);
})();
