/* Sourced, qualitative diagrams: no numerical measure of doctrinal distance. */
(() => {
  'use strict';
  const sources = [
    ['Catholic Compendium · questions 96, 182–185', 'https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_en.html'],
    ['OCA · Orthodox objections to Catholic dogmas', 'https://www.oca.org/questions/romancatholicism/anti-catholic'],
    ['Joint dialogue · Chieti document (2016)', 'https://www.christianunity.va/content/unitacristiani/en/dialoghi/sezione-orientale/chiese-ortodosse-di-tradizione-bizantina/commissione-mista-internazionale-per-il-dialogo-teologico-tra-la/documenti-di-dialogo/testo-in-inglese1.html'],
    ['Catholic Catechism · Trinity, §§245–248', 'https://www.vatican.va/content/catechism/en/part_one/section_two/chapter_one/article_1/paragraph_2_the_father.html'],
    ['OCA · Joint Filioque consultation (2003)', 'https://www.oca.org/news/archived/agreed-statement-on-filioque-adopted-by-north-american-orthodox-catholic-co'],
    ['OCA · Original sin', 'https://www.oca.org/questions/teaching/st.-augustine-original-sin'],
    ['Catholic Catechism · The Fall, §§404–405', 'https://www.vatican.va/content/catechism/en/part_one/section_two/chapter_one/article_1/paragraph_7_the_fall.html'],
    ['OCA · Mary, prayer and death', 'https://www.oca.org/questions/teaching/mary-prayer-death'],
    ['Catholic Catechism · Purgatory, §§1030–1032', 'https://www.vatican.va/content/catechism/en/part_one/section_two/chapter_three/article_12/iii_the_final_purification,_or_purgatory.html'],
    ['OCA · The Great Schism', 'https://www.oca.org/orthodoxy/the-orthodox-faith/church-history/eleventh-century/the-great-schism']
  ];
  const refs = ids => `<div class="religion-refs">${ids.map(i=>`<a href="${sources[i][1]}" target="_blank" rel="noopener noreferrer">${sources[i][0]} ↗</a>`).join('')}</div>`;
  const rows = [
    ['Papal authority','Doctrinal disagreement','Rejects universal papal supremacy; bishops govern synodally.','The Pope has universal jurisdiction; bishops also exercise authority together with him.',[0,1,2]],
    ['Papal infallibility','Doctrinal disagreement','Does not accept a distinct papal prerogative of infallibility.','Under defined conditions, definitive papal teaching on faith or morals is protected from error. This is not every papal opinion or personal sinlessness.',[0,1]],
    ['Filioque','Theology + creed','The Spirit proceeds from the Father; the creed has no “and the Son” addition.','Latin teaching: from Father and Son as one principle, not two independent sources.',[3,4]],
    ['Ancestral / original sin','Different emphases','OCA emphasizes inherited mortality and the consequences of the ancestral fall.','Inherited deprivation of original holiness; not a personal fault committed by Adam’s descendants.',[5,6]],
    ['Mary’s conception','Doctrinal disagreement','Honors Mary but does not receive the Catholic Immaculate Conception dogma.','Mary was preserved from original sin from her conception by Christ’s grace. This concerns Mary’s conception, not Jesus’s virgin birth.',[0,1,7]],
    ['After death','Dogmatic formulation','Prays for the departed, without accepting the Latin doctrine of purgatory.','Final purification of those already assured of salvation; distinct from damnation, not a second chance to choose God.',[7,8]]
  ];
  const flow = (name, side, nodes, note) => `<div class="christian-lane ${side}"><h3>${name}</h3><ol class="christian-flow">${nodes.map(n=>`<li>${n}</li>`).join('')}</ol><p>${note}</p></div>`;
  function render() {
    return `<article class="topic-page religion-page christian-page">
      <div class="eyebrow">RELIGION · COMPARATIVE GUIDE</div><h1>Orthodoxy vs Catholicism</h1>
      <p class="subtitle">A shared Christian foundation. Different answers about authority and doctrine.</p>
      <div class="christian-legend"><span class="east">Eastern Orthodox</span><span class="west">Catholic</span><span>Qualitative charts · reviewed 29 September 2026</span></div>
      <nav class="religion-jump" aria-label="Comparison sections">${[['authority','Church authority'],['trinity','The Holy Spirit'],['comparison','Differences chart'],['history','How the divide developed']].map(([id,name])=>`<button data-religion-jump="christian-${id}">${name}</button>`).join('')}</nav>
      <aside class="religion-context"><h2>Start with what is shared</h2><p>Both confess the Trinity and Jesus Christ’s incarnation and resurrection. Both understand the Church through bishops, sacramental life and apostolic continuity. The central disagreement is not whether councils or primacy exist, but how primacy and synodality belong together.</p>${refs([2,3])}</aside>
      <section id="christian-authority" tabindex="-1" class="christian-section"><div class="eyebrow">01 · AUTHORITY</div><h2>How is the Church held together?</h2>
      <figure class="christian-diagram"><figcaption>Conceptual organization chart · relationships, not a complete legal structure</figcaption><div class="christian-pair">
      ${flow('Eastern Orthodox','east',['Local churches with their bishops','Synods and councils','Communion in apostolic faith'],'Synodal communion; no accepted equivalent of the Catholic Pope’s universal jurisdiction. Primacy exists, but its scope is disputed.')}
      ${flow('Catholic','west',['Bishop of Rome · Pope','College of bishops in communion with him','Local churches with their bishops'],'Universal papal primacy together with episcopal collegiality. Local bishops have their own pastoral responsibility.')}
      </div><p class="religion-note">The Orthodox side is not a chain of command; its connecting arrows summarize relationships. The Chieti text is a joint historical dialogue document, not a settlement of present disagreements.</p>${refs([0,1,2])}</figure></section>
      <section id="christian-trinity" tabindex="-1" class="christian-section"><div class="eyebrow">02 · THE TRINITY</div><h2>What does “Filioque” change?</h2><p>Filioque is Latin for “and the Son.” The disagreement concerns the Spirit’s eternal procession and authority to alter the creed—not whether the Holy Spirit is divine.</p>
      <figure class="christian-diagram"><figcaption>Conceptual relationship diagram · eternal relations, not creation or a sequence in time</figcaption><div class="christian-pair">
      ${flow('Eastern Orthodox creed','east',['The Father','The Holy Spirit proceeds from the Father'],'The Father is the first origin. Eastern theology can also speak of the Spirit through the Son; these expressions need careful interpretation.')}
      ${flow('Latin Catholic formulation','west',['The Father and the Son','The Holy Spirit proceeds from both as one principle'],'The Son receives everything from the Father. Catholic teaching does not posit two separate origins or two gods.')}
      </div><p class="religion-note">The 381 creed did not contain the addition. The 2003 consultation proposed steps toward reconciliation; those recommendations are not a universally binding doctrinal agreement.</p>${refs([3,4])}</figure></section>
      <section id="christian-comparison" tabindex="-1" class="christian-section"><div class="eyebrow">03 · DIFFERENCES CHART</div><h2>Where the teachings diverge</h2><p>Each row distinguishes a doctrinal disagreement from a difference of emphasis. No scores or percentages imply a measurable distance between faiths.</p>
      <div class="christian-table" role="region" aria-label="Doctrinal comparison chart; scroll horizontally on narrow screens" tabindex="0"><table><caption>Six foundational questions · sources attached to every row</caption><thead><tr><th scope="col">Question</th><th scope="col" class="east">Eastern Orthodox</th><th scope="col" class="west">Catholic</th></tr></thead><tbody>${rows.map(([name,type,east,west,ids])=>`<tr><th scope="row">${name}<small>${type}</small>${refs(ids)}</th><td>${east}</td><td>${west}</td></tr>`).join('')}</tbody></table></div>
      <aside class="religion-context"><h3>Two shortcuts to avoid</h3><p>“Catholics inherit personal blame; Orthodox do not” misstates the Catholic Catechism. “Orthodox do not pray for the dead” is also false. Similar words can conceal different frameworks, while different words can overlap in meaning.</p>${refs([6,7,8])}</aside></section>
      <section id="christian-history" tabindex="-1" class="christian-section"><div class="eyebrow">04 · HISTORICAL CONTEXT</div><h2>A separation that developed over centuries</h2><figure class="christian-diagram"><figcaption>Milestone timeline · selected events, not a proportional time scale</figcaption><ol class="christian-timeline">
      <li><strong>1054</strong><div><h3>Mutual excommunications</h3><p>Roman legates and the patriarch of Constantinople exchanged condemnations. Separation was a longer process, not a single day when every local relationship ended.</p></div></li>
      <li><strong>1204</strong><div><h3>Constantinople sacked</h3><p>The Fourth Crusade deepened hostility and the division between East and West.</p></div></li>
      <li><strong>1965</strong><div><h3>Condemnations lifted</h3><p>The 1054 anathemas were lifted. This did not restore full communion.</p></div></li>
      <li><strong>2016</strong><div><h3>Joint study of primacy and synodality</h3><p>The Chieti dialogue examined the first millennium as a resource for seeking unity.</p></div></li></ol>${refs([9,2])}</figure></section>
      <footer class="religion-context"><h2>Scope & reading further</h2><p>This compares Eastern Orthodoxy with Catholic teaching; it does not cover Oriental Orthodox churches. Orthodox sources here represent the Orthodox Church in America, not every Orthodox theologian. Catholicism includes Eastern Catholic churches, so Latin customs should not be applied to every Catholic. These diagrams are editorial summaries, not official ecclesiastical charts.</p><div class="christian-related"><a href="#view=religion&topic=eastern-orthodoxy">Eastern Orthodoxy →</a><a href="#view=religion&topic=catholicism">Catholicism →</a></div>${refs(sources.map((_,i)=>i))}</footer>
    </article>`;
  }
  window.MindChristianComparison={render};
})();
