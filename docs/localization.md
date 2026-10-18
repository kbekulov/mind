# Four-language publication

Every published page and future document must have English (`en`), French (`fr`), Japanese (`ja`, displayed as JP) and Russian (`ru`) versions. The segmented slider in the global header controls all four languages. The choice is part of the URL (`?lang=fr#view=...`) and remains on navigation and reload. It does not write browser storage or modify research data.

## Runtime

`i18n.js` loads one self-hosted dictionary from `locales/`. It translates text nodes and accessible labels while preserving DOM elements, IDs, values, URLs, numerical data, event handlers, active filters, chart state and scroll position. A mutation observer covers asynchronously loaded vacancies, map popovers and modal details. Original text is retained in weak maps, allowing repeated switches without translating translations. Numeric templates handle changing counts. A fragment fallback handles composed labels; it must not be used to excuse untranslated document prose.

`locales/source.json` is the published text inventory. Per-language JSON files contain the translations; `overrides.json` holds editorial terminology and contextual corrections. The EN dictionary also supplies the English version of the originally Russian transcript. Complete transcript downloads are built under `data/transcripts/`. Original source PDFs, external sources and raw research/coverage ledgers remain source documents in their original languages; identify them accordingly rather than altering their evidence.

## Required workflow for new or revised content

1. Finish the source document, retaining citations, uncertainty, observations, periods and source context.
2. Run `node scripts/collect-localization.cjs`. It visits all research routes, career tabs, vacancy records, map popovers and every war/NATO detail view. Extend it when adding a new route or interactive state. Also include newly introduced empty/error states and dynamic UI messages in the inventory.
3. Supply translations for every new source string in all four dictionaries. `scripts/draft-locales.cjs` is an **optional offline draft helper** that sends only published strings to Google's translation endpoint. It is never used by visitors and must never receive private backlog inputs. Its output needs editorial review; it is not evidence of native-speaker review.
4. Write fluent, idiomatic French, Japanese, Russian and English. Review full paragraphs, not just isolated labels. Use established political, religious and historical terminology. Preserve technical product names, figures, distinctions between deaths and casualties, uncertainty and attributed claims. Do not silently rewrite a speaker's argument during translation. Add reusable corrections to `locales/overrides.json`.
5. Run `node scripts/finalize-locales.cjs` after review to apply terminology corrections, generate all transcript downloads, and record fingerprints of the publication sources. This records translation maintenance; it does not certify linguistic quality.
6. Run `npm test` and `node tests/localization.cjs`. Inspect desktop/mobile screenshots in all four languages, test language changes while filters or chart detail views are active, and verify translated downloads match the displayed paragraphs. The manifest check fails when a renderer or content dataset changes without a localization update.
7. Verify, commit and push all language versions together. If any translation remains unfinished, report it explicitly; do not label English fallback prose as a completed translation.

## Current translation provenance

The initial library-wide versions were produced from automated drafts. Editorial work includes navigation, job-search terminology, political labels, religious explanations, casualty definitions, dates and historical names; the Japanese transcript was rewritten and passages in its English and French versions were corrected. `editorial.json` retains these full-paragraph revisions separately from the reusable terminology in `overrides.json`. The wider corpus still needs a complete linguistic review; it must not be described as fully native-reviewed. The coverage checks verify completeness, source fingerprints and technical behavior, not linguistic accuracy.

Original employers' names, software/tool names, source titles and quotations may legitimately retain their original spelling. Names and technical terms are not evidence of a missing translation by themselves. Keep the Japanese language code `ja`; `JP` is only the user's requested visible selector label.
