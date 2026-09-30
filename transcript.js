/* Read-only Russian translation of the supplied automatic transcript. */
(() => {
  'use strict';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(){
    const blocks=window.MindDatingSpeechRu.split(/\r?\n\s*\r?\n/);
    const title=blocks.shift().replace(/^# /,'');
    const headings=blocks.filter(b=>b.startsWith('## ')).map(b=>b.slice(3));
    let section=-1;
    return `<article class="topic-page transcript-page" lang="ru"><a class="transcript-back" href="#view=politics&topic=gender-war">← Гендерные отношения</a><div class="eyebrow">ВЫСТУПЛЕНИЕ · РУССКИЙ ПЕРЕВОД</div><h1>${esc(title)}</h1><p class="subtitle">Полный перевод предоставленной расшифровки · 30 сентября 2026</p><p><a href="data/dating-speech-ru.txt" download>Скачать русский текст ↓</a></p><nav class="transcript-toc" aria-label="Содержание выступления">${headings.map((h,i)=>`<button data-transcript-jump="speech-${i}"><span>${String(i+1).padStart(2,'0')}</span>${esc(h)}</button>`).join('')}</nav><div class="transcript-body">${blocks.map(b=>b.startsWith('## ')?`<h2 id="speech-${++section}" tabindex="-1">${esc(b.slice(3))}</h2>`:`<p>${esc(b)}</p>`).join('')}</div><footer class="transcript-end"><p>Конец предоставленной расшифровки.</p><a href="#view=politics&topic=gender-war">← Вернуться к гендерному разделу</a><button data-transcript-jump="speech-0">К началу выступления ↑</button></footer></article>`;
  }
  document.addEventListener('click',event=>{const button=event.target.closest('[data-transcript-jump]');if(!button)return;const target=document.getElementById(button.dataset.transcriptJump);target?.focus({preventScroll:true});target?.scrollIntoView({block:'start'});});
  window.MindTranscript={render};
})();
