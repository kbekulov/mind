/* Versioned starter research; dates refer to evidence, not an automatic feed. */
(() => {
  'use strict';
  const sources={
    civilians:['OHCHR · August 2026 civilian protection report','https://ukraine.ohchr.org/en/Protection-of-Civilians-in-Armed-Conflict-August-2026'],
    casualtyPdf:['OHCHR · August report and methodology (PDF)','https://ukraine.ohchr.org/sites/default/files/2026-09/Ukraine%20-%20protection%20of%20civilians%20in%20armed%20conflict%20(August)_ENG.pdf'],
    resolution:['UN · Resolution ES-11/1, 2 March 2022','https://digitallibrary.un.org/record/3965290?ln=en'],
    charter:['UN Charter · Articles 1–2, 27, 33 and 39–51 (PDF)','https://treaties.un.org/doc/publication/ctc/uncharter.pdf'],
    gender:['UN Women / UN DESA · Gender Snapshot 2026','https://unstats.un.org/sdgs/gender-snapshot/2026/'],
    ipu:['IPU · Women in parliament, 6 March 2026','https://www.ipu.org/news/press-releases/2026-03/womens-representation-in-parliament-sees-sluggish-gains'],
    health:['UN SDG Report 2026 · Health, suicide estimates for 2021','https://unstats.un.org/sdgs/report/2026/goal-03/'],
    realism:['Stanford Encyclopedia of Philosophy · Political realism','https://plato.stanford.edu/entries/realism-intl-relations/'],
    nato:['NATO · Strategic concepts','https://www.nato.int/en/about-us/official-texts-and-resources/strategic-concepts'],
    wilson:['US Office of the Historian · Fourteen Points','https://history.state.gov/milestones/1914-1920/fourteen-points']
  };
  const pages={
    'russia-ukraine-war':{
      section:'politics',name:'Russia vs Ukraine war',subtitle:'Civilian impact, international responses and questions of security',
      intro:'A starting dossier on Russia’s war against Ukraine. The current statistical snapshot is the UN’s August 2026 civilian report, published 16 September. This is not a live battlefield map.',
      cards:[
        ['The basic context','Russia launched its full-scale invasion on 24 February 2022. The UN General Assembly’s ES-11/1 resolution deplored the aggression and demanded withdrawal. Its adoption is a record of states’ positions, not a measurement of public opinion.',['resolution']],
        ['The latest reporting period','OHCHR verified 372 civilians killed and 2,349 injured in Ukraine during August 2026. Its August release revised July to 448 killed and 2,675 injured; the chart uses those revised figures.',['civilians']],
        ['What these figures cover','Verified civilian casualties in Ukraine, including documented cases in occupied territory. They exclude military losses and are not a combined Russia–Ukraine death toll. Restricted access and incomplete verification mean recorded counts are not a complete measure of harm.',['casualtyPdf']],
        ['Three separate questions','Track documented events, legal assessments and explanations of state behavior separately. Explaining a security calculation does not establish that an action is lawful or justified. Use the two philosophy channels to compare analytical approaches.',['charter']]
      ],
      charts:[{title:'Verified civilian casualties in Ukraine',period:'July–August 2026 · August report revision',unit:'People killed or injured; each series uses a zero baseline',max:3000,rows:[['July · killed',448],['August · killed',372],['July · injured',2675],['August · injured',2349]],note:'Killed and injured are distinct outcomes. Do not interpret two months as a long-term trend.',refs:['civilians']},
        {title:'The first UN General Assembly response',period:'2 March 2022 · ES-11/1 · historical context',unit:'Member states; 193 members in total',max:193,rows:[['In favor',141],['Against',5],['Abstained',35],['Did not vote',12]],note:'The 12 non-voting members are calculated as 193 − 141 − 5 − 35. This is a historical vote, not current alignment.',refs:['resolution']}],
      diagram:{title:'Organize the evidence',nodes:['Documented event','Source, date and verification','Interpretation and competing explanations','Policy choices and consequences'],note:'Editorial research workflow. Keep claims and their evidential status attached.'},
      questions:['How do civilian risks differ near the front and in cities farther away?','Which proposed security guarantees would be credible to the parties?','How do sanctions, military support and diplomacy affect incentives?']
    },
    'gender-war':{
      section:'politics',name:'Gender war',subtitle:'Gender relations, unequal outcomes and contested expectations',
      intro:'A research space for debates about men, women and social roles. “Gender war” is the channel title, not an assumption that either sex forms a single opposing camp. Start with defined outcomes, then examine explanations.',
      cards:[
        ['Power and representation','IPU reports that women held 27.5% of national parliamentary seats on 1 January 2026. The September 2026 Gender Snapshot also reports 31 women among 175 chief justices. These describe institutions, not the power or circumstances of every individual.',['ipu','gender']],
        ['Health and vulnerability','The UN’s 2026 SDG report uses 2021 global suicide estimates: 12.4 deaths per 100,000 males and 5.9 per 100,000 females. These are crude population rates, not age-standardized rates or evidence of one single cause.',['health']],
        ['What to separate','Distinguish measured differences from explanations and value judgments. A gap may vary by age, income, country and measurement method. A global average cannot settle a claim about a particular person, relationship or community.',[]],
        ['A useful starting agenda','Study work and unpaid care; dating and family expectations; health and violence; education; and political representation. Compare sources that actually measure the same population and outcome before drawing conclusions.',[]]
      ],
      charts:[{title:'Women in national parliaments',period:'1 January snapshots · worldwide',unit:'Share of seats (%) · scale 0–100',max:100,rows:[['2025',27.2],['2026',27.5]],note:'An increase of 0.3 percentage points. These are dated annual snapshots, not September seat counts.',refs:['ipu']},
        {title:'Suicide mortality by sex',period:'2021 estimates · reported in UN SDG Report 2026',unit:'Deaths per 100,000 population · crude rates',max:15,rows:[['Male',12.4],['Female',5.9]],note:'Estimates, not a census. Different observation years and units mean these charts cannot be combined into an overall “advantage score”.',refs:['health']}],
      diagram:{title:'From a claim to a useful comparison',nodes:['Define the claim','Choose population and measure','Check data and alternative explanations','Assess a specific policy'],note:'Editorial framework. Distribution, causation and fairness are different questions.'},
      questions:['Which gaps persist when age, location and income are considered?','How do online narratives differ from representative survey results?','Which interventions improve outcomes, and for whom?']
    },
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
  function chart(c){return `<figure class="research-chart"><figcaption><div class="eyebrow">DATA · ${esc(c.period)}</div><h2>${esc(c.title)}</h2><p>${esc(c.unit)}</p></figcaption><div class="research-bars">${c.rows.map(([label,value],i)=>`<div class="research-bar-row"><div><span>${esc(label)}</span><strong>${value.toLocaleString('en-US')}</strong></div><div class="research-track" aria-hidden="true"><span style="width:${value/c.max*100}%;--bar:${['#8993ff','#78d6b0','#e8b187','#d59bea'][i%4]}"></span></div></div>`).join('')}</div><div class="research-axis" aria-hidden="true"><span>0</span><span>${c.max.toLocaleString('en-US')}</span></div><p class="research-note">${esc(c.note)}</p>${refs(c.refs)}</figure>`;}
  function comparison(){return `<section class="research-panel"><h2>Two lenses, one case</h2><p>Use both sets of questions when reading the Politics channels. This is an editorial comparison, not a ranking.</p><div class="research-contrast"><div><h3>Realism</h3><p>Who has the capacity and incentive to act? Which commitments remain credible under pressure?</p><a href="#view=philosophy&topic=realism-ir">Explore realism →</a></div><div><h3>Idealism & institutions</h3><p>Which rules and shared interests could support cooperation? How would commitments be implemented?</p><a href="#view=philosophy&topic=idealism-ir">Explore idealism →</a></div></div></section>`;}
  function render(section,id){
    const p=pages[id];
    if(!p||p.section!==section.id)return `<section class="topic-page research-page"><div class="eyebrow">RESEARCH LIBRARY</div><h1>${section.name}</h1><p class="subtitle">${section.id==='politics'?'Evidence, contested explanations and public choices.':'Tools for thinking about conflict and cooperation.'}</p><div class="topic-grid">${Object.values(pages).filter(p=>p.section===section.id).map(p=>`<a class="topic-card" href="${href(p)}"><h2>${esc(p.name)}</h2><span>${esc(p.subtitle)} →</span></a>`).join('')}</div>${section.id==='philosophy'?comparison():`<section class="research-panel"><h2>Start with a question, keep the evidence</h2><p>Each dossier separates a sourced baseline, dated statistics and questions for further research. Charts show their observation period; a newly published report may describe earlier years.</p><p>Reviewed 23 September 2026 · Published snapshots, updated through the repository.</p></section>`}</section>`;
    const sourceKeys=[...new Set([...p.cards.flatMap(c=>c[2]),...p.charts.flatMap(c=>c.refs),...(p.diagram.refs||[])])];
    return `<article class="topic-page research-page"><div class="eyebrow">${section.name.toUpperCase()} · STARTER DOSSIER</div><h1>${esc(p.name)}</h1><p class="subtitle">${esc(p.subtitle)}</p><div class="research-context"><span>Reviewed 23 September 2026</span><p>${esc(p.intro)}</p></div>${p.charts.length?`<div class="research-chart-grid">${p.charts.map(chart).join('')}</div>`:''}<div class="research-card-grid">${p.cards.map(([title,text,keys])=>`<section class="research-panel"><h2>${esc(title)}</h2><p>${esc(text)}</p>${keys.length?refs(keys):'<span class="research-note">Editorial research guidance</span>'}</section>`).join('')}</div><figure class="research-panel research-diagram"><figcaption><div class="eyebrow">CONCEPT DIAGRAM</div><h2>${esc(p.diagram.title)}</h2></figcaption><ol>${p.diagram.nodes.map(n=>`<li>${esc(n)}</li>`).join('')}</ol><p class="research-note">${esc(p.diagram.note)}</p>${refs(p.diagram.refs||[])}</figure>${section.id==='philosophy'?comparison():''}<section class="research-panel"><h2>Questions to investigate next</h2><ul>${p.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ul></section><section class="research-sources"><h2>Sources & further reading</h2>${refs(sourceKeys)}</section></article>`;
  }
  window.MindResearch={render};
})();
