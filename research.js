/* Versioned starter research; dates refer to evidence, not an automatic feed. */
(() => {
  'use strict';
  const V=window.MindVisuals;
  const sources={
    civilianInterim:['OHCHR · preliminary 1–24 September 2026 update','https://ukraine.ohchr.org/en/node/582'],
    civilians:['OHCHR · August 2026 civilian protection report','https://ukraine.ohchr.org/en/Protection-of-Civilians-in-Armed-Conflict-August-2026'],
    casualtyPdf:['OHCHR · August report and methodology (PDF)','https://ukraine.ohchr.org/sites/default/files/2026-09/Ukraine%20-%20protection%20of%20civilians%20in%20armed%20conflict%20(August)_ENG.pdf'],
    resolution:['UN · Resolution ES-11/1, 2 March 2022','https://digitallibrary.un.org/record/3965290?ln=en'],
    charter:['UN Charter · Articles 1–2, 27, 33 and 39–51 (PDF)','https://treaties.un.org/doc/publication/ctc/uncharter.pdf'],
    realism:['Stanford Encyclopedia of Philosophy · Political realism','https://plato.stanford.edu/entries/realism-intl-relations/'],
    nato:['NATO · Strategic concepts','https://nato.int/en/about-us/official-texts-and-resources/strategic-concepts'],
    wilson:['US Office of the Historian · Fourteen Points','https://history.state.gov/milestones/1914-1920/fourteen-points']
  };
  const pages={
    'my-political-profile':{section:'politics',name:'My political profile',subtitle:'My 12 Axes results: values, ideology matches and historical comparisons'},
    'nato-and-invasions':{section:'politics',name:'NATO & historical invasions',subtitle:'62 image claims, historical context and documented NATO operations'},
    'wars-by-duration':{section:'politics',name:'Wars by duration',subtitle:'127 reference conflicts, duration bands and a logarithmic chart'},
    'wars-by-outcome':{section:'politics',name:'Wars by outcome',subtitle:'55 selected conflicts, outcome classifications and an interactive timeline'},
    'russia-ukraine-war':{
      section:'politics',name:'Russia vs Ukraine war',subtitle:'Human costs, legal arguments and strategic motives across conflicts',
      intro:'A comparative dossier on Russia’s war against Ukraine and other interventions. Source records, state claims and editorial models are identified separately. Each chart retains its own observation period and review date.',
      cards:[
        ['The basic context','Russia launched its full-scale invasion on 24 February 2022. The UN General Assembly’s ES-11/1 resolution deplored the aggression and demanded withdrawal. Its adoption is a record of states’ positions, not a measurement of public opinion.',['resolution']],
        ['Reporting periods','August remains the latest full-month report found in the OHCHR index checked on 12 October. A separate 24 September update reports at least 200 civilians killed and 1,234 injured during 1–24 September. That partial, preliminary period is not plotted as a comparable full month or added to the cumulative total.',['civilians','civilianInterim']],
        ['What these figures cover','Verified civilian casualties in Ukraine, including documented cases in occupied territory. They exclude military losses and are not a combined Russia–Ukraine death toll. Restricted access and incomplete verification mean recorded counts are not a complete measure of harm.',['casualtyPdf']],
        ['Three separate questions','Track documented events, legal assessments and explanations of state behavior separately. Explaining a security calculation does not establish that an action is lawful or justified. Use the two philosophy channels to compare analytical approaches.',['charter']]
      ],
      charts:[{title:'Verified civilian casualties in Ukraine',period:'July–August 2026 · August report revision',unit:'People killed or injured; the overview combines the two distinct outcomes',max:3000,rows:[['July · killed',448],['August · killed',372],['July · injured',2675],['August · injured',2349]],note:'Killed and injured are distinct outcomes. Do not interpret two months as a long-term trend.',refs:['civilians']},
        {title:'The first UN General Assembly response',period:'2 March 2022 · ES-11/1 · historical context',unit:'Member states; 193 members in total',max:193,rows:[['In favor',141],['Against',5],['Abstained',35],['Did not vote',12]],note:'The 12 non-voting members are calculated as 193 − 141 − 5 − 35. This is a historical vote, not current alignment.',refs:['resolution']}],
      diagram:{title:'Organize the evidence',nodes:['Documented event','Source, date and verification','Interpretation and competing explanations','Policy choices and consequences'],note:'Editorial research workflow. Keep claims and their evidential status attached.'},
      questions:['How do civilian risks differ near the front and in cities farther away?','Which proposed security guarantees would be credible to the parties?','How do sanctions, military support and diplomacy affect incentives?']
    },
    'gender-war':{section:'politics',name:'Gender war',subtitle:'Sexual reputation, perceived access and the meaning of effort'},
    'realism-ir':{
      section:'philosophy',name:'Realism (international relations)',subtitle:'Power, security and the constraints on state action',
      intro:'A family of approaches to international politics, not a synonym for being practical or pessimistic. Use it as an analytical lens rather than a moral endorsement of any government.',
      cards:[
        ['Core idea','Realists emphasize states, security and power in a system without a central authority capable of reliably protecting every state. “Anarchy” here means the absence of world government, not permanent chaos.',['realism']],
        ['Two influential strands','Classical realism, associated with Hans Morgenthau, stresses political judgment and human motives. Kenneth Waltz’s structural realism emphasizes the international system and distribution of capabilities. These approaches need not produce identical advice.',['realism']],
        ['Ethics and limits','Classical realism does not simply say that anything is permissible. Prudence and consequences matter. Critics question whether state-centered explanations give enough weight to institutions, domestic politics and ideas.',['realism']],
        ['A contemporary point of application','NATO’s published 2022 Strategic Concept identifies deterrence and defence, crisis prevention and management, and cooperative security as core tasks. Its coexistence of military and cooperative tools makes it a useful case for comparing theories; NATO’s own account is an actor’s policy statement.',['nato']]
      ],
      charts:[],diagram:{title:'A possible security dilemma',nodes:['A increases its defences','B perceives a threat','B expands its capabilities','A feels less secure'],note:'Conceptual mechanism, not an inevitable sequence or a verdict on a particular war.',refs:['realism']},
      questions:['Which capabilities and interests matter in this case?','What evidence distinguishes defensive fear from expansionist intent?','What would disconfirm the explanation rather than merely fit it after the event?']
    },
    'idealism-ir':{
      section:'philosophy',name:'Idealism (international relations)',subtitle:'Peace through institutions, rules and political reform',
      intro:'A starting treatment of Wilsonian idealism and the related ambition to organize peace through international rules. This historical label does not cover every modern liberal theory.',
      cards:[
        ['A historical starting point','Wilson’s Fourteen Points of January 1918 proposed open diplomacy, freer trade, reduced armaments and an association of nations. This was a program for reorganizing peace, alongside practical wartime objectives.',['wilson']],
        ['An institutional expression','The UN Charter joins peaceful dispute settlement, sovereign equality and collective measures against threats to peace. It illustrates an institutional approach; it is not simply the implementation of one philosopher’s theory.',['charter']],
        ['Where the difficulty lies','Rules need political support and implementation. The Charter gives permanent Security Council members a special voting position, while the Council can authorize measures to address threats to peace. Institutional design therefore includes unequal power as well as common commitments.',['charter']],
        ['Keep nearby ideas distinct','For this library, use “idealism” for the historical peace-reform program and “institutional cooperation” for specific mechanisms. Do not assume that supporting negotiation means rejecting defence, or that an organization’s existence proves it is effective.',[]]
      ],
      charts:[],diagram:{title:'An institutional route to cooperation',nodes:['A shared problem','Negotiation and agreed rules','Institutions and implementation','Review compliance and adjust'],note:'Editorial model of the approach, not proof that cooperation will succeed.',refs:['wilson','charter']},
      questions:['Which interests could make compliance durable?','Who monitors commitments, and what happens when they are broken?','Can smaller states influence the rules and their enforcement?']
    }
  };
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const refs=keys=>`<div class="research-refs">${keys.map(k=>`<a href="${esc(sources[k][1])}" target="_blank" rel="noopener noreferrer">${esc(sources[k][0])} ↗</a>`).join('')}</div>`;
  const href=p=>`#view=${p.section}&topic=${Object.keys(pages).find(id=>pages[id]===p)}`;
  function chart(c){let visual,headline;if(c.refs.includes('resolution')){headline='A large majority supported the resolution';visual=V.stack(c.rows,c.max,'member states');}else{headline='Civilian harm remains substantial in both reported months';visual=V.bars([['July · all casualties',c.rows[0][1]+c.rows[2][1]],['August · all casualties',c.rows[1][1]+c.rows[3][1]]],3500,'killed or injured')+V.detail('Separate fatal and nonfatal counts',V.bars(c.rows,c.max,'people'));}return `<figure class="research-chart"><figcaption><div class="eyebrow">${esc(c.period)}</div><h2>${esc(c.title)}</h2></figcaption>${V.headline(headline)}${visual}<p class="research-note">${esc(c.note)}</p>${refs(c.refs)}</figure>`;}
  function comparison(){return `<section class="research-panel"><h2>Two lenses, one case</h2><p>Use both sets of questions when reading the Politics channels. This is an editorial comparison, not a ranking.</p><div class="research-contrast"><div><h3>Realism</h3><p>Who has the capacity and incentive to act? Which commitments remain credible under pressure?</p><a href="#view=philosophy&topic=realism-ir">Explore realism →</a></div><div><h3>Idealism & institutions</h3><p>Which rules and shared interests could support cooperation? How would commitments be implemented?</p><a href="#view=philosophy&topic=idealism-ir">Explore idealism →</a></div></div></section>`;}
  function render(section,id){
    if(section.id==='politics'&&id==='gender-war')return window.MindGenderResearch.render();
    if(section.id==='politics'&&id==='my-political-profile')return window.MindPoliticalProfile.render();
    if(section.id==='politics'&&id==='nato-and-invasions')return window.MindNatoResearch.render();
    if(section.id==='politics'&&['wars-by-duration','wars-by-outcome'].includes(id))return window.MindWarAtlas.render(id);
    const p=pages[id];
    if(!p||p.section!==section.id)return `<section class="topic-page research-page"><div class="eyebrow">RESEARCH LIBRARY</div><h1>${section.name}</h1><p class="subtitle">${section.id==='politics'?'Evidence, contested explanations and public choices.':'Tools for thinking about conflict and cooperation.'}</p><div class="topic-grid">${Object.values(pages).filter(p=>p.section===section.id).map(p=>`<a class="topic-card" href="${href(p)}"><h2>${esc(p.name)}</h2><span>${esc(p.subtitle)} →</span></a>`).join('')}</div>${section.id==='philosophy'?comparison():`<p class="research-note">Library audit: 12 October 2026 · Charts retain their own observation periods and source limitations.</p>`}</section>`;
    const sourceKeys=[...new Set([...p.cards.flatMap(c=>c[2]),...p.charts.flatMap(c=>c.refs),...(p.diagram.refs||[])])];
    return `<article class="topic-page research-page"><div class="eyebrow">${section.name.toUpperCase()} · STARTER DOSSIER</div><h1>${esc(p.name)}</h1><p class="subtitle">${esc(p.subtitle)}</p><div class="research-context"><span>Library audit · 12 October 2026</span><p>${esc(p.intro)}</p></div>${id==='russia-ukraine-war'?window.MindWarComparison.render():''}${window.MindInsights.render(id)}${p.charts.length?`<div class="research-chart-grid">${p.charts.map(chart).join('')}</div>`:''}<div class="research-card-grid">${p.cards.map(([title,text,keys])=>`<section class="research-panel"><h2>${esc(title)}</h2><p>${esc(text)}</p>${keys.length?refs(keys):'<span class="research-note">Editorial research guidance</span>'}</section>`).join('')}</div><figure class="research-panel research-diagram"><figcaption><div class="eyebrow">CONCEPT DIAGRAM</div><h2>${esc(p.diagram.title)}</h2></figcaption>${V.flow(p.diagram.nodes)}<p class="research-note">${esc(p.diagram.note)}</p>${refs(p.diagram.refs||[])}</figure><section class="research-panel"><h2>Questions to investigate next</h2><ul>${p.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ul></section><section class="research-sources"><h2>Sources & further reading</h2>${refs(sourceKeys)}</section></article>`;
  }
  window.MindResearch={render};
})();
