# Mind castle

A Discord-inspired personal research workspace at **https://mind.bekulov.com**.

## What it does

- Topic spaces and expandable channel navigation; create your own spaces and channels.
- Documents with Markdown headings, emphasis, quotes, lists, checklists, tables, code, safe external links, bar charts, and process diagrams.
- `[[Exact document title]]` links, backlinks, and a document relationship graph.
- Full-content search, pins, filters, sorting, list/card views, and a research board grouped by stage.
- Browser-local persistence, Markdown export, and validated JSON workspace backup/restore.
- Responsive mobile navigation, keyboard shortcuts, and accessible dialogs.

The initial documents are editable examples and research frameworks, not verified findings.

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
