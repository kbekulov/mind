/* Shared overview visuals. Inputs retain their original units and evidence scope. */
window.MindVisuals=(()=>{
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const colors=['#939bff','#75d6b0','#eeae83','#d29be8','#72c8e8','#dfcd79'];
  const fmt=n=>Number(n).toLocaleString('en-US',{maximumFractionDigits:1});
  const headline=(title,note='')=>`<div class="visual-takeaway"><strong>${esc(title)}</strong>${note?`<p>${esc(note)}</p>`:''}</div>`;
  const detail=(title,html,cls='')=>`<details class="visual-detail ${cls}"><summary>${esc(title)}</summary><div class="visual-detail-body">${html}</div></details>`;
  function stack(rows,total,unit='records'){
    if(!total)return '<p class="visual-empty">No records in this selection.</p>';
    return `<div class="visual-stack" role="img" aria-label="${esc(rows.map(([label,n])=>label+': '+fmt(n)+' '+unit).join('; '))}">${rows.map(([label,n,color],i)=>n>0?`<span style="width:${n/total*100}%;--visual-color:${color||colors[i%colors.length]}" title="${esc(label)}: ${fmt(n)}">${n/total>=.13?Math.round(n/total*100)+'%':''}</span>`:'').join('')}</div><div class="visual-legend">${rows.map(([label,n,color],i)=>`<span><i style="background:${color||colors[i%colors.length]}"></i>${esc(label)} <b>${fmt(n)}${unit==='%'?'%':''}</b></span>`).join('')}</div>`;
  }
  function bars(rows,max,unit='records'){
    return `<div class="visual-bars" role="img" aria-label="${esc(rows.map(([label,n])=>label+': '+fmt(n)+' '+unit).join('; '))}">${rows.map(([label,n,color],i)=>`<div class="visual-bar"><span>${esc(label)}</span><i><b style="width:${max?n/max*100:0}%;background:${color||colors[i%colors.length]}"></b></i><strong>${fmt(n)}</strong></div>`).join('')}<div class="visual-axis"><span>0</span><span>${fmt(max)} ${esc(unit)}</span></div></div>`;
  }
  function ranges(rows,max,unit){return `<div class="visual-ranges">${rows.map(([label,lo,hi,color],i)=>`<div class="visual-range"><div><span>${esc(label)}</span><strong>${fmt(lo)}${hi!==lo?'–'+fmt(hi):''} ${esc(unit)}</strong></div><div class="visual-range-track" role="img" aria-label="${esc(label)}: ${fmt(lo)}${hi!==lo?' to '+fmt(hi):''} ${esc(unit)}"><i style="left:${lo/max*100}%;width:${(hi-lo)/max*100}%;--visual-color:${color||colors[i%colors.length]}"></i></div></div>`).join('')}<div class="visual-axis"><span>0</span><span>${fmt(max)} ${esc(unit)}</span></div></div>`;}
  const flow=(nodes,labels=[])=>`<ol class="visual-flow">${nodes.map((n,i)=>`<li>${labels[i]?`<small>${esc(labels[i])}</small>`:''}<strong>${esc(n)}</strong></li>`).join('')}</ol>`;
  return {esc,colors,fmt,headline,detail,stack,bars,ranges,flow};
})();
