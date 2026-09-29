# Mind castle

A published research library at **https://mind.bekulov.com**, hosted on GitHub Pages with Discord-inspired colors.

## Publishing model

Content is maintained in this repository, then committed and pushed to GitHub Pages. There is no content creation through the site, browser-local workspace, inbox, channels, editor, or import flow. Existing browser storage from earlier versions is neither read nor erased. Old workspace bookmarks open the published observatory.

The landing page is the **Job observatory**, currently the site's published collection. A persistent side menu provides Jobs, Politics, Philosophy and Religion. Sections awaiting content clearly state that no research is published yet. On mobile, the menu opens from the header.

Politics contains Russia vs Ukraine war and Gender war. Religion contains Eastern Orthodoxy, Catholicism, Islam, Buddhism and Shinto. Philosophy contains Realism and Idealism, both in international relations. The sidebar uses collapsible Discord-style categories and compact hash-prefixed subsection links, all visible by default. Subsections have bookmarkable URLs; this is navigation, not a chat or content editor.

## Job observatory

`data/rpa-vacancies.json` contains 64 sourced advertisements across 28 countries and six world regions, checked on 27 September 2026. The refresh rechecked all 59 previously active records: 40 remain open, 18 explicitly closed, and one could not be verified. It added 22 new verified roles and restored two older leads with current application routes. Older postings retain their original dates and warnings. Direct and plausible fits are shown by default; stretch and lower-priority roles remain available. Counts describe this research sample, not total market demand or guaranteed availability.

The current pool contains 37 developer, nine analyst, six team-lead, four manager and eight product-owner roles. The search ledger records 84 discovery queries, source checks and a country/territory follow-up register. No country is marked complete: internal board searches, local-language coverage, public employment services, partner directories and professional communities still have substantial gaps. The map counts each requisition once, including roles advertised in more than one country.

Follow [the canonical worldwide search protocol](docs/job-search.md) on every refresh. It adapts the former Jobflow prompt to Mind's static publication and evidence-based profile matching. `data/search-runs.json` records actual coverage and unresolved lanes; `data/job-history.json` retains historical and unverified records outside active results. This run is bounded worldwide discovery, not an exhaustive employer or country census. Role-focus and region filters, map, pie chart and exports all use the same verified pool. Location is separate from work authorization and remote-residence eligibility.

The profile assessment uses user-supplied professional screenshots and language/role clarifications. Target roles include developer, manager, team lead, analyst and product owner. Confirmed languages are Russian, English, Lithuanian and French, plus a little Japanese. Each listing distinguishes relevant experience from requirements still to confirm. See `AGENTS.md` for future research criteria.

Visitors can search and filter vacancies, open employer links, review the career assessment and source methodology, and download research JSON. Filters are temporary; downloads do not publish or modify site content.

## Charts and map

The country pie chart shows filtered counts and percentages with stable colors and a clickable legend. Other charts summarize tools, fields, seniority and arrangements. The country–tool matrix supports drill-down.

The reusable `<mind-world-map>` component uses self-hosted geometry. Wheel scrolling over the map zooms at the cursor without modifier keys; scrolling outside moves the page. Dragging, keyboard controls and country labels provide alternate interactions. Counts follow the vacancy filters. Selecting a country opens a scrollable job popover on the map, listing every matching vacancy with its employer and location. Only selecting a job opens its source in a new tab. Close with Escape, the close button, or a click outside; map selection does not change filters or tabs.

`data/world-map.json` uses Natural Earth I geometry (Natural Earth 4.1.0 via world-atlas 2.0.2). Attribution and terms are in `data/world-map-LICENSE.txt`. Rebuild geometry with `npm run build:map`.

## Gender research and local backlog

The Gender war section includes two source-derived conceptual briefings: implicit expectations and relational conflict, and moral judgment and gendered trust. Six process diagrams, a qualitative timeline, comparison matrices and an expandable catalogue cover 40 proposed mechanisms. These are hypotheses from supplied analytical briefs, not verified podcast transcripts or population statistics. Legal, clinical and population claims remain in a visible verification queue. Existing fertility timelines retain their separate statistical sources.

`data/gender-research.json` is the reusable derived dataset; `data/gender-research.js` supplies the same data to the static page. Keep them identical (checked by the browser tests). `gender-research.js` renders the research. No raw backlog content is published.

Pending local `backlog/*.txt` inputs take priority under `AGENTS.md`. The entire directory is ignored. After integration and verification, originals are preserved in local `backlog/archive/` with a Europe/Vilnius timestamp. Only derived site content and project rules are committed.

## Development

```sh
npm install
npx playwright install chromium
npm start
npm test
```

Preview at `http://127.0.0.1:4173`. Tests cover read-only behavior, filters, counts, exports, profile details, maps, keyboard access, responsive layout and scrolling. No build is required for publication.

`app.js` renders the minimal published-site shell; `market.js` renders the observatory. Styles are in `styles.css`, `market.css`, `profile.css` and `world-map.css`. Preserve the root `CNAME`. Verify, commit and push each change as described in `AGENTS.md`.
