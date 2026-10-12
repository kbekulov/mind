# War comparison provenance

Published in the existing Russia vs Ukraine war section, reviewed 12 October 2026.

## Supplied reference

`ukraine war rationale.html` was supplied by the user as the visual and analytical reference. Its author and publication date are unspecified. The original file remains outside this repository. Only the derived site presentation is published.

The adaptation retains the three-column structure, highlighted Ukraine rows, paired model bars, overall comparison and seven five-axis radar profiles. It uses Mind's existing dark palette and navigation. The previously published financial, military-loss and exchange charts remain in place with their own September dates; this change does not claim to refresh those statistics.

## Editorial model

The five inputs in `war-comparison.js` are transcribed exactly from the reference's conflict profiles: relative harm, legality, legitimacy, necessity and opportunity. These are illustrative editorial inputs, not independently verified measurements. The source supplies no reproducible rubric for the legal or strategic ratings. Their appearance in the site is an attributed model demonstration, not adoption as factual findings.

The reference's paired scores use half of each normalized component. The combined burden is the equal-weight mean of inverse legality, relative harm and inverse legitimacy. The interactive version permits weights from zero to five and divides by the sum of the weights. All-zero weights suppress the ranking. Necessity and opportunity do not contribute to this combined score. Values are displayed to one decimal; the default ranking matches the supplied reference after rounding.

The reference's relative-harm inputs remain frozen so its model can be reproduced. They are clearly separated from the externally checked death snapshots. The latter do not feed the model, because their periods, definitions and attribution are incompatible with a single causal ranking of interventions. No settings or research content are saved by the UI.

## Factual checks and corrections

- Ukraine: OHCHR's August 2026 report, page 4, records 17,257 civilian deaths since 24 February 2022 through August 2026. Page 5 explains verification and undercounting. The reference's 16,868 is not reused. The existing monthly figures remain from this same report.
- Syria: the OHCHR June 2022 release estimates 306,887 direct civilian deaths for 1 March 2011–31 March 2021. It is a statistical estimate, not a verified lower bound, and does not describe deaths caused solely by the US-led intervention.
- Iraq: the IBC homepage displayed 200,065–226,628 during review. Its database endpoint still displayed the reference's older 187,499–211,046. Use the current homepage with an explicit retrieval date and unspecified precise end date. IBC covers multiple perpetrators, not coalition-only deaths.
- Libya: Airwars' all-belligerents 2011 page displayed 1,166–2,519. These are assessed reports involving all military actors, not NATO-only deaths. The chart labels this scope explicitly.
- Gaza is omitted from the civilian-only chart because the supplied figure combines civilians and combatants. The Vietnam, Chechnya, Afghanistan and Kosovo figures are held out pending direct, precisely dated verification of their source records. Missing rows do not mean zero deaths. The conceptual reference profiles retain their original model inputs separately.

Every factual row links its supporting primary source on the page. The legal comparison records claims and institutional findings rather than a numeric legal verdict. It distinguishes UN General Assembly ES-11/1 from a judicial judgment; the ICJ's March 2022 provisional order from a final merits decision; and the February 2024 jurisdictional limitation from endorsement of Russia's conduct. The later Kosovo KFOR mandate is distinguished from the initial NATO air campaign. The Iraq Inquiry's criticism is not described as a court finding of illegality. The two conceptual strategic explanations and Ukraine-agency diagram are labeled hypotheses.

## Validation

`tests/war-comparison.cjs` covers formula outputs, keyboard-operated weights, all-zero weights, reset, profile synchronization, evidence disclosures, navigation, narrow screens and scroll reachability. It produces ignored screenshots for visual review. The regular suite also checks that existing research, vacancy dashboards and transcript navigation remain functional.
