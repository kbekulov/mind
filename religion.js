/* Published comparative notes. Sources describe traditions, not proven metaphysical facts. */
(() => {
  'use strict';
  const questions = ['What is God, or what are gods?', 'What is a human being?', 'What are a man and a woman?', 'What is humanity’s purpose?', 'How should a person live?', 'What is the ultimate horizon?'];
  const oca = 'https://www.oca.org/orthodoxy/the-orthodox-faith/doctrine-scripture/';
  const cat = 'https://www.vatican.va/content/catechism/en/part_one/section_two/';
  const ati = 'https://accesstoinsight.org/';
  const jinja = 'https://www.jinjahoncho.or.jp/en/';
  const traditions = [
    {
      id:'eastern-orthodoxy', name:'Eastern Orthodoxy', color:'#aeb5ff', subtitle:'Creation, communion and life in God',
      scope:'An introductory account using the Orthodox Church in America’s catechetical material. It is not an exhaustive account of every Orthodox jurisdiction or theologian.',
      answers:[
        ['One God: Father, Son and Holy Spirit. The three persons share one divine being; they are not three gods. God is known through revelation, while the divine essence remains beyond human comprehension.',[0]],
        ['A creature made in God’s image and likeness, called to reflect God in creation. Human life is understood through Christ, the fullness of humanity, rather than through biological existence alone.',[1]],
        ['Male and female are both created in God’s image. Sexual embodiment belongs to good creation, not to an inherently sinful condition. This shared vocation does not by itself settle every question about marriage, ministry or social roles.',[1]],
        ['To grow into communion with God and reflect divine life in the world. The goal is participation in God’s life through Christ in the Spirit; the creature is not a second, independent God.',[1,2]],
        ['The religious life is oriented toward knowing the Father through Christ in the Holy Spirit. Life in the Church anticipates the communion hoped for in the kingdom of God.',[2]],
        ['Eternal life is communion with the Trinity. The kingdom brings the fullness of a life already encountered in faith, rather than merely extending ordinary earthly life indefinitely.',[2]]
      ],
      map:['One God','Father · Son · Holy Spirit','Creation is distinct from God'],
      mapCaption:'The persons are co-eternal; this diagram does not divide God into parts.', mapRefs:[0,2],
      path:['Made in God’s image','Life in Christ, through the Spirit','Communion with God'], pathCaption:'A map of vocation and fulfillment, not a timetable or a guarantee of salvation.', pathRefs:[1,2],
      nuance:'Read “man” in older English catechetical texts carefully: it can mean all humanity. A teaching about the human person is not automatically a teaching about male social authority.',
      sources:[['OCA · The Trinity','https://www.oca.org/questions/teaching/the-trinity'],['OCA · Man',oca+'the-symbol-of-faith/man'],['OCA · The Trinity in eternal life',oca+'the-holy-trinity/the-holy-trinity-in-eternal-life']]
    },
    {
      id:'catholicism', name:'Catholicism', color:'#f0c982', subtitle:'Human dignity, love and communion with God',
      scope:'A summary of the Catholic Catechism’s teaching. These are doctrinal claims; they should not be read as a survey of every Catholic’s beliefs or practice.',
      answers:[
        ['One God in three persons: Father, Son and Holy Spirit. The persons are distinct without dividing the divine nature. “Father” is theological language, not a claim that God has a male body.',[0,1]],
        ['A person bears God’s image and is a unity of body and spiritual soul. The person is capable of knowing and loving God and of entering relationships with other people.',[1]],
        ['The Catechism presents male and female as equally personal and equally dignified, with sexual difference and mutual relationship part of creation. Neither is a deficient version of the other. God transcends human sexual differentiation.',[1]],
        ['To know, love and serve God, and to offer creation back to God. This vocation reaches fulfillment in communion with the Trinity.',[1,2]],
        ['Human beings are called to relationship, responsibility and love rather than treating other people as objects. The Catechism connects care for creation with responsibility toward other creatures.',[1]],
        ['Heaven is complete communion with God and the blessed, made possible through Christ. The “beatific vision” names the direct vision of God, beyond ordinary human capacities.',[2]]
      ],
      map:['One divine nature','Father · Son · Holy Spirit','Three distinct persons'], mapCaption:'One being, not three beings or three successive disguises.', mapRefs:[0],
      path:['Created in God’s image','Knowing, loving and serving God','Communion with the Trinity'], pathCaption:'A conceptual summary of vocation; Christian fulfillment depends on God’s initiative.', pathRefs:[1,2],
      nuance:'Shared dignity and differentiated roles are separate questions. This introduction covers theological anthropology; detailed teaching on marriage and ordination needs its own source-based treatment.',
      sources:[['Catechism · The Father and Trinity (§§232–267)',cat+'chapter_one/article_1/paragraph_2_the_father.html'],['Catechism · The human person (§§355–384)',cat+'chapter_one/article_1/paragraph_6_man.html'],['Catechism · Heaven (§§1023–1029)',cat+'chapter_three/article_12/ii_heaven.html']]
    },
    {
      id:'islam', name:'Islam', color:'#81d7b3', subtitle:'Divine unity, worship and moral responsibility',
      scope:'A Qur’an-based starting point. Sunni, Shi‘a and other interpretive traditions cannot be represented by a few verses alone; this page does not issue legal rulings.',
      answers:[
        ['Allah is one, incomparable and depended upon by all. Surah 112 rejects divine parentage and offspring. This is divine unity (tawhid), not a Trinity or a family of gods.',[0]],
        ['Humanity has a shared origin. Qur’an 4:1 connects this origin with accountability to God and duties toward family; 67:2 frames life as a test of conduct.',[1,4]],
        ['Qur’an 4:1 presents men and women as sharing an origin. Verse 33:35 addresses both as believers, moral agents and recipients of forgiveness and reward. These passages alone do not establish identical rules for every family or public role.',[1,2]],
        ['Qur’an 51:56 identifies worship of God as the purpose of human and jinn creation. Moral conduct matters: life and death are described as a test of deeds.',[3,4]],
        ['The virtues listed for both men and women include truthfulness, patience, humility, charity, fasting, chastity and remembrance of God. Religious life includes conduct as well as profession of belief.',[2]],
        ['Accountability is joined to divine forgiveness and promised reward. The selected verses introduce that horizon; they are not a complete account of resurrection, judgment or the afterlife.',[2,4]]
      ],
      map:['Allah: one and incomparable','Creator and sustainer','Humanity: created and accountable'], mapCaption:'Creator and creatures remain distinct; the labels describe relationships, not parts of God.', mapRefs:[0,1,3],
      path:['A shared human origin','Worship and responsible action','Accountability, forgiveness and reward'], pathCaption:'A thematic connection between the cited verses, not a formula for earning salvation.', pathRefs:[1,2,3,4],
      nuance:'Keep scriptural wording, interpretation and local custom distinct. Detailed questions about gender roles require named legal schools and historical contexts, rather than a single claim about all Muslims.',
      sources:[['Qur’an · Divine unity (112)', 'https://quran.com/112'],['Qur’an · Shared origin (4:1)','https://quran.com/4/1'],['Qur’an · Men and women (33:35)','https://quran.com/33/35'],['Qur’an · Purpose (51:56)','https://quran.com/51/56'],['Qur’an · Life and deeds (67:2)','https://quran.com/67/2']]
    },
    {
      id:'buddhism', name:'Buddhism', color:'#e8b187', subtitle:'Suffering, insight and liberation',
      scope:'This initial treatment draws primarily on Pali texts and Theravada teachers. It does not yet give a full account of Mahayana or Vajrayana teachings.',
      answers:[
        ['An eternal, omnipotent creator is not the foundation of the Buddhist account described here. Buddhist discussion of gods should not be confused with a creator who grants liberation; nirvana is not such a deity.',[0]],
        ['Human experience is examined through changing processes rather than a permanent possession called “self.” In Thanissaro Bhikkhu’s explanation, not-self is a practical teaching for relinquishing clinging, not a claim that human experience is meaningless.',[1]],
        ['In the Soma Sutta, the nun Soma rejects the suggestion that being a woman prevents liberating insight. The text challenges a spiritual limitation based on sex; it does not by itself describe the rules of every Buddhist institution.',[2]],
        ['The central question is how suffering can cease, rather than why a creator made humanity. The Four Noble Truths concern suffering, its origin, its cessation and the path to cessation.',[3]],
        ['The Noble Eightfold Path develops right view, intention, speech, action, livelihood, effort, mindfulness and concentration. Its factors work together; they are not eight grades completed once in order.',[3]],
        ['Nirvana (Pali: nibbana) is the cessation of craving and the release from suffering described by the teaching. It should not be treated as a synonym for Christian heaven or union with a creator.',[0,3]]
      ],
      map:['Suffering (dukkha)','Craving: an origin of suffering','Cessation is possible'], mapCaption:'These are themes from the Four Noble Truths; the fourth truth is the path shown below.', mapRefs:[3],
      path:['Understand suffering and its origin','Develop the Eightfold Path','Realize cessation'], pathCaption:'The truths have different tasks: understand, abandon, develop and realize. This is not a cosmic creation story.', pathRefs:[3],
      nuance:'Read this as an explicitly scoped starting point. Teachings on buddhas, bodhisattvas and practice across Buddhist schools need additional sources before a fuller comparison is possible.',
      sources:[['Nyanaponika Thera · Buddhism and the God-idea',ati+'lib/authors/nyanaponika/godidea.html'],['Thanissaro Bhikkhu · Selves & Not-self',ati+'lib/authors/thanissaro/selvesnotself.html'],['Soma Sutta · SN 5.2 (Bhikkhu Bodhi)',ati+'tipitaka/sn/sn05/sn05.002.bodh.html'],['First discourse · SN 56.11 (Thanissaro Bhikkhu)',ati+'tipitaka/sn/sn56/sn56.011.than.html']]
    },
    {
      id:'shinto', name:'Shinto', color:'#ed9eb8', subtitle:'Kami, gratitude and the renewal of everyday life',
      scope:'An introduction through Jinja Honcho’s account of shrine practice. This institutional perspective is not a universal creed for every Shinto tradition.',
      answers:[
        ['Kami are revered sacred presences associated with nature, ancestors and myth. The term does not map neatly onto the idea of one all-powerful creator. Different kami are honored at different shrines.',[0,1]],
        ['The sources emphasize people’s relationships with ancestors, community and the natural world. They do not present one compulsory definition of a human essence comparable to a Christian catechism.',[0]],
        ['A single doctrinal definition of male and female is not supplied by these sources. Jinja Honcho describes miko as female shrine assistants who help with ceremonies and sacred dance. That particular role should not be taken as the whole meaning of womanhood or of women’s religious participation.',[2]],
        ['The emphasis is on gratitude, reverence and maintaining harmonious relationships in the present. This is better understood as an orientation for life than as one universally stated purpose assigned to all humanity.',[0]],
        ['Purification, offerings, prayer and festivals (matsuri) renew relations with kami. Purity and honesty are valued, alongside gratitude for nature’s gifts and respect for its power.',[0,2]],
        ['The account used here emphasizes present life and reverence for ancestors rather than prescribing a single universal destination after death. It should not be forced into the same salvation diagram as Christianity or Buddhism.',[0]]
      ],
      map:['Kami and ancestors','People and communities','The natural world'], mapCaption:'Overlapping relationships in shrine life, not three separate classes of substance.', mapRefs:[0,1],
      path:['Purification','Prayer, offerings and matsuri','Gratitude and renewed relationships'], pathCaption:'A recurring rhythm of practice, not a one-way ladder to salvation.', pathRefs:[0,2],
      nuance:'Jinja Honcho describes Shinto as having no founder or fixed dogma. Its account also allows practice alongside another religion; participating in a shrine rite does not necessarily imply an exclusive religious identity.',
      sources:[['Jinja Honcho · The heart of Shinto',jinja+'shinto/about/'],['Jinja Honcho · Kami',jinja+'shinto/kami/'],['Jinja Honcho · Shrine practice and Q&A',jinja]]
    }
  ];
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const route = id => '#view=religion&topic='+id;
  const refs = (t, ids) => `<div class="religion-refs">${ids.map(i=>`<a href="${esc(t.sources[i][1])}" target="_blank" rel="noopener noreferrer">${esc(t.sources[i][0])} ↗</a>`).join('')}</div>`;
  function diagram(t, path) {
    const nodes = path?t.path:t.map;
    return `<figure class="religion-diagram"><figcaption><span class="eyebrow">${path?'PRACTICE & PURPOSE':'CONCEPT MAP'}</span><h2>${path?'The shape of religious life':'The sacred and the human'}</h2></figcaption><ol class="religion-nodes ${path?'religion-flow':''}">${nodes.map((n,i)=>`<li><span class="node-index">${path?String(i+1).padStart(2,'0'):'◇'}</span><strong>${esc(n)}</strong></li>`).join('')}</ol><p>${esc(path?t.pathCaption:t.mapCaption)}</p>${refs(t,path?t.pathRefs:t.mapRefs)}</figure>`;
  }
  function overview() {
    return `<section class="topic-page religion-page"><div class="eyebrow">RELIGION · COMPARATIVE RESEARCH</div><h1>Religion</h1><p class="subtitle">Five traditions. Shared questions. Different answers.</p><div class="topic-grid">${traditions.map(t=>`<a class="topic-card" style="--tradition:${t.color}" href="${route(t.id)}"><h2>${t.name}</h2><span>${esc(t.subtitle)} →</span></a>`).join('')}</div><section class="religion-comparison"><h2>Compare a question</h2><label for="religion-question">Explore across all five traditions</label><select id="religion-question">${questions.map((q,i)=>`<option value="${i}">${esc(q)}</option>`).join('')}</select><p class="religion-note">These are descriptive summaries, not rankings. The same question may not occupy the same place in every tradition.</p><div id="religion-comparison-results" aria-live="polite">${comparison(0)}</div></section></section>`;
  }
  function comparison(index) {
    return traditions.map(t=>`<article class="religion-compare-row" style="--tradition:${t.color}"><h3><a href="${route(t.id)}">${t.name}</a></h3><div><p>${esc(t.answers[index][0])}</p>${refs(t,t.answers[index][1])}</div></article>`).join('');
  }
  function render(id) {
    const t=traditions.find(t=>t.id===id);
    if(!t)return overview();
    return `<article class="topic-page religion-page" style="--tradition:${t.color}"><div class="eyebrow">RELIGION · FOUNDATIONS</div><h1>${t.name}</h1><p class="subtitle">${esc(t.subtitle)}</p><div class="religion-context"><span>Research notes · 23 September 2026</span><p>${esc(t.scope)}</p><a href="#view=religion">Compare all traditions →</a></div><nav class="religion-jump" aria-label="Questions in this religion">${questions.map((q,i)=>`<button data-religion-jump="religion-q-${i}">${String(i+1).padStart(2,'0')} ${esc(q)}</button>`).join('')}</nav><div class="religion-visuals">${diagram(t,false)}${diagram(t,true)}</div><div class="religion-questions">${questions.map((q,i)=>`<section class="religion-answer" id="religion-q-${i}" tabindex="-1"><div class="eyebrow">QUESTION ${String(i+1).padStart(2,'0')}</div><h2>${esc(q)}</h2><p>${esc(t.answers[i][0])}</p>${refs(t,t.answers[i][1])}</section>`).join('')}</div><aside class="religion-context"><h2>Reading with context</h2><p>${esc(t.nuance)}</p></aside><section class="religion-sources"><h2>Sources & further reading</h2><p class="religion-note">Paraphrased research notes. Diagrams are editorial summaries of the linked teachings, not statistical graphs.</p>${refs(t,t.sources.map((_,i)=>i))}</section></article>`;
  }
  document.addEventListener('click', event=>{
    const button=event.target.closest('[data-religion-jump]');
    if(!button)return;
    const target=document.getElementById(button.dataset.religionJump);
    target?.scrollIntoView({block:'start'});target?.focus({preventScroll:true});
  });
  document.addEventListener('change', event=>{
    if(event.target.id!=='religion-question')return;
    document.getElementById('religion-comparison-results').innerHTML=comparison(Number(event.target.value));
  });
  window.MindReligion={render};
})();
