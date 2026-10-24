# CV channel

Route: `#view=market&topic=cv`. This is the explicitly requested session-only draft/export exception to the read-only research library. It has no server write, browser storage, analytics or external translation/AI call. Optional contact fields and pasted job descriptions exist only in memory. The supplied PDF is not published; its email and phone are not embedded in code or metadata.

The CV heading and download filename contain no personal name. Name, email and phone default to localized placeholders in the form and Markdown export. Optional replacements stay in the current tab, survive profile/language changes, and disappear on reload; empty fields restore the placeholders. Do not hardcode personal details into these defaults.

## Evidence and boundaries

`data/cv.js` is the curated four-language evidence bank, reviewed 23 October 2026 against the two-page Automation Developer CV, the supplied LinkedIn screenshots and direct user clarifications. The exact degree is **BScEcon in Politics and International Relations**, Cardiff University, 2014–2017. Preserve the BScEcon award in all translations. Credentials are self-reported, not independently authenticated.

Include the May 2018–May 2019 database role from the screenshots, even though the abbreviated PDF omitted it. Professional Blazor/C# bots and departmental GenAI integration/Claude come from the new PDF. Do not turn Codex personal projects into employer experience, membership in a 25-person team into management of 25 people, or a two-project 99% success result into a company-wide metric. Blue Prism certification validity is not independently checked. SAFe expired June 2023 and is excluded by default; when included it always says expired. Language levels are unspecified except basic Japanese. Earlier French courses are not current proficiency evidence.

Eight presets reorder/select evidence. Management and product ownership are transition profiles, with gaps shown separately from the exported professional history. Employment titles never change when selecting a target. The user can supply an application target, change the summary separately in each language, select/reorder senior achievements, choose skills and toggle sections. Manual wording remains user-authored and is not machine-translated. Clipboard failure selects the raw Markdown for manual copying; download uses the identical generator.

## Dates

The senior role is `current:true`, `end:null`, starting September 2021. Every generation reads the current Europe/Vilnius date. The export includes a localized Present label plus the current year. An open tab checks date changes every minute. Enterprise automation tenure starts May 2019; count completed years, never assign that tenure to every skill. Historical roles retain fixed months. A session override can close the current role; its end must be September 2021 or later and no later than the current month. Update the published credential record when employment actually ends, so future visits do not reset the role to ongoing.

## Research scope

`data/cv-market.js` is a dated requirements study and includes its specific source links, overlap, gaps and application-verification limitations. It is separate from the observatory's active inventory and totals. This task did not recheck the entire catalogue, so its `researchedAt`, historical statuses and country completeness must not be advanced. The companion `data/cv-market-audit.json` records checks, rejected leads and incomplete coverage; `data/search-runs.json` links to it. Do not describe this targeted study as an exhaustive global search. All previous discovery work remains pending under `docs/job-search.md`.

## Localization and verification

The generator uses explicitly authored EN/FR/JA/RU objects, avoiding translation of arbitrary pasted text. `data-no-translate` marks its subtree as owned by this generator, not exempt from localization. `scripts/cv-locales.cjs` validates every four-language object and adds all static units to the shared corpus/dictionaries, including export-only text. It runs during collection and finalization. `tests/cv.cjs` covers all eight presets in four languages, future dates, ending employment, immutable historical dates, expiry, selection/order, keyword checks, injection, copy/download parity, state retention and mobile layout. The main localization route suite also includes CV. No independent native-speaker review is claimed.

Run `npm.cmd run i18n:collect`, `npm.cmd run i18n:finalize`, then `npm.cmd test` after source changes. Commit and push the complete language set together. Never stage the private source PDF, temporary screenshots or backlog.
