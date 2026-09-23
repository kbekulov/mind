// Geometry is prepared once; no mapping libraries or remote tiles ship to visitors.
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {geoNaturalEarth1, geoPath, geoGraticule10} from 'd3-geo';
import {feature} from 'topojson-client';
const require=createRequire(import.meta.url);
const atlas=require('world-atlas/countries-50m.json');
const countries=feature(atlas,atlas.objects.countries).features.filter(f=>f.id!=='010');
const projection=geoNaturalEarth1().fitExtent([[16,18],[984,482]],{type:'FeatureCollection',features:countries});
const path=geoPath(projection).digits(1);
// Explicit mainland label anchors avoid offshore territories skewing centroids.
const anchors={Lithuania:[24,55.3],Switzerland:[8.2,46.8],Poland:[19.2,52],Austria:[14.1,47.6],Portugal:[-8,39.6],France:[2.5,46.6],Germany:[10.4,51.1],'United Kingdom':[-2.5,54],Spain:[-3.8,40.2],Netherlands:[5.3,52.2],India:[79,22.8],Malaysia:[102.2,4.2],Singapore:[103.82,1.35],Thailand:[101,15.5],'United Arab Emirates':[54.5,24],Philippines:[122.8,12.5]};
const shapes=countries.map(f=>({id:f.id,name:f.properties.name,path:path(f),anchor:(anchors[f.properties.name]?projection(anchors[f.properties.name]):path.centroid(f)).map(n=>+n.toFixed(2))}));
const output={version:1,width:1000,height:500,projection:'Natural Earth I',source:'Natural Earth 4.1.0 via world-atlas 2.0.2, 1:50m',views:{World:{center:[500,250],zoom:1},Europe:{center:projection([12,50]),zoom:4},Asia:{center:projection([100,27]),zoom:2}},graticule:path(geoGraticule10()),countries:shapes};
fs.writeFileSync(new URL('../data/world-map.json',import.meta.url),JSON.stringify(output)+'\n');
console.log(`Generated ${shapes.length} country/territory shapes (${Math.round(JSON.stringify(output).length/1024)} KB).`);
