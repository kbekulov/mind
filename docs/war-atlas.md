# War catalogue channels

Two sibling Politics channels adapt the user-supplied `wars by duration.html` and `wars by outcome.html`. The original files remain outside the repository. The derived catalogue is in `data/war-atlas.js`, with local rendering in `war-atlas.js` and `war-atlas.css`. No external timeline library, backend or browser storage is used.

## Provenance and scope

The duration reference contains 127 entries; the outcome reference contains 55 selected wars, campaigns, battles and interventions. Neither supplies a systematic selection method or per-entry citations. The site's reference labels and detail dialogs make that limitation visible. These are attributed reference catalogues, not an independently verified historical database or national win-rate dataset.

Duration estimates and original Russian/Soviet participation markers are retained. Display groups use exact non-overlapping boundaries. Logarithmic plotting uses days / 365.2425 and months / 12; stacked points prevent collisions. A participation marker does not imply responsibility for starting a war. The Myanmar, Colombia, Somalia, Syria, Yemen and Sudan rows retain their supplied estimates with an unresolved-cutoff warning.

Outcome labels remain the reference author's interpretations. The relevant perspective is recorded, including the Bolshevik/Soviet side in the Russian Civil War. Original names, notes and boundaries remain in the data. Year-only and month-only values retain their precision metadata instead of presenting placeholder first-day dates as exact dates. Era buttons select overlapping intervals, not mutually exclusive historical counts. The 1917–1991 navigation band includes the revolutionary transition before the USSR.

The optional crisis bands reproduce interpretive reference periods. They are off by default and explicitly do not establish causation. Timeline filtering, era selection, zoom and pan also update the displayed outcome counts. Short bars have a disclosed six-pixel minimum; details retain actual date precision.

## Selected external checks, 12 October 2026

Each check links the underlying institutional source in the data and UI. A checked context does not certify the rest of that record.

- Ukraine: the full-scale phase starts on 24 February 2022, rather than conflating it with the war since 2014. The snapshot is 12 October 2026: 1,691 elapsed days, approximately 4.63 years. The ICJ historical background supports the start; the UN's 9 October 2026 Security Council report supports its continuing status. This is a fixed snapshot, not an automatic counter.
- Winter War: the Finnish government's commemoration records 105 days and the end on 13 March 1940. The outcome details distinguish Soviet territorial gains from Finland retaining independence.
- Falklands: the National Museum of the Royal Navy records 74 days, 2 April–14 June 1982.
- Crimean War: the National Army Museum records the Treaty of Paris on 30 March 1856. The supplied start-year precision remains unchanged.
- World War I: the US State Department historical documentary collection dates Brest-Litovsk to 3 March 1918. This record covers Russian participation, not the end of the entire war.
- Syria: the UN Secretary-General's 8 December 2024 statement records the fall of Assad's government. That date bounds the renamed Assad-support phase; it does not claim all Russian involvement in Syria ended.

All other estimates, outcomes and approximate boundaries remain reference-only pending further source work. Search and evidence filters allow users to isolate entries with selected external checks. The two catalogues have different scopes: for example, whole-war World War II duration versus the Eastern Front outcome.

## Validation

`tests/war-atlas.cjs` checks data integrity, duration bands, evidence/participation/outcome/search filters, modal and keyboard navigation, timeline zoom/pan and era overlap, responsive containment and scroll reachability. It also verifies that the pages make no browser-storage writes and preserve reference limitations. The workspace suite covers both channels in category navigation and reloads. Ignored screenshots support visual review.

## Overview-first presentation

The default duration graph now summarizes counts by duration band and the median. The default outcome view shows overall composition and a mutually exclusive breakdown by each conflict's starting era. These starting-era groups differ from the overlapping interval filters used by the navigation. Individual-point charts and the zoomable timeline remain in expandable detail panels. See [visual design](visual-overviews.md) for the common presentation rules and aggregate checks.
