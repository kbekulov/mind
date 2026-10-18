/* User-supplied 12 Axes report, 18 October 2026. Scores are report outputs, not independent findings. */
window.MindPoliticalProfileData = {
  date: '18 October 2026', questions: 240, source: 'data/12axes-report-2026-10-18.pdf',
  ideology: 'Paternalistic Conservatism', family: 'Right', match: 95.8,
  description: "Conservative tradition that accepts social reforms and protection for the poorest to preserve national cohesion, seeing elites as responsible for the people's welfare and for harmony between classes.",
  sentence: 'I want a nation united by responsible elites, who reform and protect the poorest to keep harmony among the classes.',
  axes: [
    {name:'Structure',left:'Federal',right:'Unitary',label:'Balanced'},
    {name:'Economy',left:'Public',right:'Private',label:'Balanced'},
    {name:'Representation',left:'Democracy',right:'Autocracy',label:'Balanced'},
    {name:'Control',left:'Planning',right:'Free market',label:'60% Planning',position:40,color:'#c89bfa'},
    {name:'Power',left:'Security',right:'Liberty',label:'Balanced'},
    {name:'Trade',left:'Protectionism',right:'Globalism',label:'Balanced'},
    {name:'Immigration',left:'Assimilation',right:'Multiculturalism',label:'63% Assimilation',position:37,color:'#f494bc'},
    {name:'Religion',left:'Irreligious',right:'Religious',label:'71% Religious',position:71,color:'#9ba5ff'},
    {name:'Diplomacy',left:'Militarist',right:'Pacifist',label:'Balanced'},
    {name:'Morality',left:'Progressive',right:'Traditionalist',label:'80% Traditionalist',position:80,color:'#e8bd89'},
    {name:'Intervention',left:'Non-interventionist',right:'Nationalist',label:'59% Nationalist',position:59,color:'#f9a079'},
    {name:'Technology',left:'Technology',right:'Biology',label:'Balanced'}
  ],
  distinctive: {axis:'Religion',percent:75,text:'75% of the ideologies lean less toward religious than you do.'},
  typical: {axis:'Economy',label:'At the centre',text:'You sit at the centre on Economy, and so does the catalog. This is where your profile stands out least.'},
  countries: {
    main: {name:'Ethiopia',score:94,kind:'Present-day',subtitle:'Ethnic federation under a dominant party',description:'An ethnic federation in East Africa and a never-colonized state, Ethiopia is led by Abiy Ahmed and the Prosperity Party, emerging from the Tigray war, with ethnic tensions and an opening state economy, plus the Renaissance Dam.'},
    historical: {name:'Kingdom of Greece',score:90,kind:'Historical',subtitle:'Parliamentary-Orthodox monarchy · 1832–1924, 1935–1973',description:'Hellenic state under the Wittelsbach and Glücksburg dynasties, forged in independence against the Ottomans, marked by strong Orthodox faith, royal authority, and Megali Idea expansionism.'},
    dimensions:[['Politically','Armenia',92],['Socially','Gran Colombia',92],['Economically','France',99]],
    furthest:['Free Territory (Makhnovshchina)','Anarchist Aragon and Catalonia','Paris Commune']
  },
  figures: {
    main: {name:'Aristotle',score:93,kind:'Closest figure',subtitle:'Philosopher · 384–322 BC',description:'A Greek philosopher, Aristotle formulated a political vision centered on the polis, civic virtue, and mixed government, defending moderate private property, natural hierarchy, and moral education as the foundations of common life.'},
    dimensions:[['Politically','Jordan Peterson',93],['Socially','Socrates',94],['Economically','Pythagoras',99]],
    furthest:['Ezra Heywood','Satoshi Nakamoto','Subcomandante Marcos'],
    ranking:[['Aristotle','Philosophy',93],['Jordan Peterson','Intellectual life',93],['Carl Gustaf Emil Mannerheim','Politics',92],['Abraham Lincoln','Politics',90],['Boris III of Bulgaria','Politics',90],['Enéas Carneiro','Politics',90],['Georges Sorel','Political theory',90],['Harry S. Truman','Politics',89]]
  },
  reading:[
    {author:'Aristotle',title:'Politics',year:'350 BC',score:93,url:'https://www.amazon.com/s?k=Politics+Aristotle&i=stripbooks'},
    {author:'Jordan Peterson',title:'12 Rules for Life',year:'2018',score:93,url:'https://www.amazon.com/s?k=12+Rules+for+Life+Jordan+Peterson&i=stripbooks'},
    {author:'Georges Sorel',title:'Reflections on Violence',year:'1908',score:90,url:'https://www.amazon.com/s?k=Reflections+on+Violence+Georges+Sorel&i=stripbooks'}
  ],
  parties:{
    main:{name:'Liberal Democratic Party (LDP)',score:87,kind:'Active party',subtitle:'Party · Japan',description:'Conservative party that has governed Japan almost without interruption since 1955. It defends the US alliance, business-led development, moderate cultural nationalism and revision of the pacifist Constitution, with internal factions and ties to business.'},
    historical:{name:'Populares',score:87,kind:'Historical party',subtitle:'Movement · c. 133–44 BC · Republican Rome',description:'Faction of the Roman Republic that legislated through tribunes and assemblies against the Senate, defending land reform, grain distribution, debt relief and rights for Italian allies, from Tiberius Gracchus to Marius and Caesar.'},
    dimensions:[['Politically','Azov Battalion',85],['Socially','Imperial House of Japan',89],['Economically','Democratic Party (United States)',99]],
    furthest:['Libertarian Party','Democratic Socialists of America (DSA)','EZLN (Zapatista Army of National Liberation)']
  },
  timeline:{era:'21st century',period:'Since 2000',score:90,rows:[
    {era:'Antiquity',period:'Until 476',items:[['Aristotle','384–322 BC'],['Heraclitus','c. 535–c. 475 BC']]},
    {era:'Middle Ages',period:'476 to 1500',items:[['Belisarius','c. 500–565'],['Republic of Venice','697–1797']]},
    {era:'Early modern era',period:'1500 to 1800',items:[['James Cook','1728–1779'],['Jean-Paul Marat','1743–1793']]},
    {era:'19th century',period:'1800 to 1900',items:[['Abraham Lincoln','1809–1865'],['Kingdom of Greece','1832–1924, 1935–1973']]},
    {era:'20th century',period:'1900 to 2000',items:[['Carl Gustaf Emil Mannerheim','1867–1951'],['Boris III of Bulgaria','1894–1943']]},
    {era:'21st century',period:'Since 2000',items:[['Ethiopia','Current in the report'],['Jordan Peterson','1962–']]}
  ]},
  alternatives:[
    {name:'National Conservatism',family:'Right',description:"Current that unites traditional values, family, and religion with strong cultural nationalism, defending sovereignty, borders, and the people's identity within democracy, with clear distrust of globalism."},
    {name:'Cultural Nationalism',family:'Right',description:"Nationalism based on shared language, traditions, and heritage rather than race, which values the people's cultural identity and the integration of those who adopt these values, defending the nation's cohesion."},
    {name:'Pragmatic Conservatism',family:'Right',description:'Conservatism that protects institutions, family and order without doctrinal rigidity: it allows gradual reform and concessions in order to conserve the essential, in the line of Burke and Disraeli, rather than restoring an idealized past.'}
  ],
  furthestIdeology:{name:'Progressive Libertarianism',family:'Libertarian',description:"Branch that pursues gender equality through individual freedom and the market rather than the state, defending autonomy, equal rights, and the end of legal restrictions on women's choices."},
  compass:{political:'Center-right',social:'Strongly traditionalist',description:'Center-right with Strongly traditionalist social values'},
  method:"12 Axes compares your answers with profiles of ideologies, countries and figures on the same 12 axes. Compatibility measures closeness between profiles; it is not a scientific diagnosis or a definitive label.",
  privacy:'The report states that answers are not stored.'
};
