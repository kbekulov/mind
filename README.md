# Mind castle

A Discord-inspired personal research workspace at **https://mind.bekulov.com**.

## What it does

- Topic spaces and expandable channel navigation; create your own spaces and channels.
- Documents with Markdown headings, emphasis, quotes, lists, checklists, tables, code, safe external links, bar charts, and process diagrams.
- `[[Exact document title]]` links, backlinks, and a document relationship graph.
- Full-content search, pins, filters, sorting, list/card views, and a research board grouped by stage.
- Browser-local persistence, Markdown export, and validated JSON workspace backup/restore.
- Responsive mobile navigation, keyboard shortcuts, and accessible dialogs.

The initial personal documents are editable examples and research frameworks. The separate **RPA observatory** (`#view=market`) contains real sourced research: 26 vacancy advertisements across 16 European and Asian countries, checked on 23 September 2026. All seniority levels and work arrangements are in scope.

## Published job research

`data/rpa-vacancies.json` is the versioned source of truth for the public research collection. `market.js` renders filters, linked vacancies, country/tool/field/seniority/arrangement dashboards, a country–tool matrix, filtered JSON exports, and a source register. `market.css` styles the collection and removes the former large-icon rail in favor of one compact sidebar.

This is a purposive, manually checked snapshot, not a census or a live job feed. Counts represent distinct collected advertisements, not openings or total market demand. Platform mentions include optional and alternative tools. Unknown values remain explicit. Salary figures retain their original currency and period. Published roles with application routes are labeled “Listed at check”; continued availability is not guaranteed. The Sources & method view records methodology and selected rejected leads, including closed ads and talent campaigns.

To refresh, verify the employer or agency source, update each record's evidence and check date, remove closed ads, and update the collection date and snapshot labels together. Never infer remote eligibility, salary or sponsorship. Deduplicate by employer/title/country, preserving multi-city roles as one ad. Public research loads separately from local notes, so existing workspaces receive updates without resetting personal documents. Public research is exported separately from personal workspace backups.

### World map

The observatory map follows the current filters, shades countries by collected vacancy count and opens matching listings when a country or count is selected. Zoom controls, World/Europe/Asia views, drag-to-pan, keyboard navigation and a text list of country totals support desktop and mobile. Ordinary wheel scrolling remains page scrolling. Small countries have connected count labels to prevent overlapping numbers. The color domain stays anchored to the largest country total in the full snapshot, making filtered views comparable.

`world-map.js` defines the reusable `<mind-world-map>` component. All site maps should reuse its `world-map.css` palette and interaction patterns. The self-hosted `data/world-map.json` contains Natural Earth I projected country geometry (Natural Earth 4.1.0 via world-atlas 2.0.2); there are no remote tiles, API keys or mapping libraries in the browser. Rebuild the checked-in geometry with `npm run build:map`. Mapping dependencies are build-time only. Attribution and redistribution terms are in `data/world-map-LICENSE.txt`. The map shows countries and territories at illustrative scale, with Antarctica omitted.

## Storage and privacy

This first version is static and served by GitHub Pages. Notes are stored in `localStorage` under `mind.workspace.v1` on the current browser/device. They are **not** written to the repository and do not sync across devices. Browser data deletion removes local notes. Use **Workspace settings → Export** for backups; import a backup to transfer a workspace. Imported backups replace local content only after confirmation.

There is no account, server-side database, collaborative editing, or authentication. Do not assume the browser is an encrypted vault. Google Fonts is the only externally loaded page resource; system fonts work as a fallback.

## Develop

```sh
npm install
npx playwright install chromium
npm start
```

Then visit `http://127.0.0.1:4173`. Run `npm test` in another terminal. Tests use an isolated browser context, not the user's stored notes. The live site requires no build or runtime dependencies.

## Content formats

Normal Markdown is supported with a deliberately small, HTML-escaped renderer. Raw HTML and script links are not rendered. Use a `chart` fenced block with `Label | 12` rows for non-negative bar charts. Use a `diagram` fenced block with `Question -> Evidence -> Synthesis` for flow diagrams. General Mermaid diagrams, arbitrary rich-text pasting, attachments, and formulas are not supported yet.

## Architecture and growth

`app.js` separates the versioned workspace model, validated storage, Markdown rendering, navigation, and editor actions. Documents have stable IDs, space/channel placement, a format, stage, tags, and created/updated timestamps. A future database adapter can replace browser storage without changing this core record shape. The graph currently displays up to 80 documents, while search, collections, and exports include all records. Browser storage capacity is finite; large datasets and multi-device use will need a backend.

`styles.css` contains shared design tokens and responsive layouts. `CNAME` preserves the existing GitHub Pages custom domain. Changes pushed to `main` are published by the repository's existing Pages setup. See `AGENTS.md` for the required automatic commit-and-push workflow.
