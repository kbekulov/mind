# Big-picture visual design

All research visuals lead with a broad pattern, proportion, distribution or relationship. The shared `visuals.js` and `visuals.css` provide overview bars, composition charts, interval plots, conceptual maps and expandable detail panels. The existing Discord palette and read-only navigation remain.

## Published views

- **Jobs:** geographic spread and country shares remain interactive. Bar lengths now use the selected vacancy count as a common denominator. Leading categories are shown first; remaining categories, work arrangements and the country/tool matrix are secondary disclosures. Map clicks still open the country's jobs and mouse-wheel zoom remains direct.
- **Gender:** the author’s argument now leads the parent page (29 October 2026). Two Plotly concept diagrams show the access/effort/reputation pathway and its analogies. Scenario controls test the model’s implications; no invented percentages or measured-looking effect curves. A comparison table and text equivalents support close reading. The separate speech is unchanged.
- **Ukraine:** the loan chart shows the disbursed share within the ceiling. GDP and military-loss ranges use interval markers. Exchange overviews sum only their selected dated events (445 people per receiving side; 1,014 versus 78 returned remains), with the individual events available underneath. The separate UAE cumulative figure is never added. Legal case records sit below a conceptual guide.
- **War catalogues:** duration bands and the median replace the individual-point plot as the default. Outcomes show overall composition and composition by starting era. The five starting-era groups are mutually exclusive; navigation filters still select overlapping conflict intervals. Individual conflicts, logarithmic points and the zoomable timeline remain available in disclosures. Reference classifications retain their limitations.
- **NATO:** the main chart shows the pre-1949 share of image entries. Century clustering and selected operation types show the broad composition. The operation timeline and full image-claim register are expandable; selecting a century opens the register automatically. These are counts of image claims and selected examples, not a census of invasions or NATO missions.
- **Religion and philosophy:** worldview, purpose, authority and explanatory relationships are presented as labelled conceptual maps. Sources and qualifications remain available. Arrows do not turn a doctrine or proposed explanation into a measured causal effect.

The redesign changes presentation and calculations over existing published data; it is not a new research refresh. Observation periods, units, source links and underlying datasets are preserved. Selected samples are not treated as population totals, and overlapping tool mentions are not turned into mutually exclusive shares.

`tests/visual-overviews.cjs` checks aggregate arithmetic, one-era-per-conflict assignment, endpoints, disclosure defaults, zero-count color consistency and desktop/mobile layouts across all research channels. Existing suites continue to cover filters, maps, detailed timeline controls, source disclosures and the transcript.
