# Mind: canonical worldwide job search

Run a deep, broad, evidence-led vacancy search for Kiril and publish the verified results in Mind's Jobs / rpa-jobs section. Maximize credible options, not raw listing count. This is a research publication, not an application tracker or an automatic feed.

## Workspace and starting evidence

Work only in the Mind repository at `https://github.com/kbekulov/mind`. Read `AGENTS.md`, this protocol, `data/rpa-vacancies.json`, `data/job-history.json` and `data/search-runs.json`. Do not execute Jobflow's merger, write to its repository, use its D1 database or publish through Sites. Mind is static GitHub Pages; preserve `CNAME` for `mind.bekulov.com`.

Record the UTC start time before research. Build a recheck ledger for every active record, every Unknown record and previously researched role family. Preserve existing IDs, original titles, source evidence, fit assessments and status history. Never fabricate a prior first-seen timestamp during migration.

## Global geography and eligibility

Search Europe, Asia (including the Middle East), Africa, North America (including Central America and the Caribbean), South America and Oceania. Include all seniority levels and onsite, hybrid, remote, permanent, contract and part-time arrangements. Lithuania and Switzerland remain useful search lanes, not geographic restrictions or assumed relocation preferences.

Maintain a country × role-family coverage ledger. Search regional languages where useful: English, Lithuanian, Russian, French, German, Italian, Spanish, Portuguese, Japanese, Chinese and relevant local variants. A query language is not a candidate qualification. Rotate markets and sources; do not equate zero findings with no vacancies.

Record the advertised job location separately from remote-residence eligibility, required work authorization, visa sponsorship, relocation and time-zone restrictions. Use Unknown/null when unspecified. A role can be technically relevant while eligibility remains unconfirmed. Do not label it eligible for Kiril without evidence. Never interpret “remote” as worldwide permission. Count one requisition once globally; preserve multiple explicitly eligible countries as metadata, without cloning advertisements to inflate the map.

## Candidate evidence, not a keyword wish list

Use the self-reported LinkedIn screenshots reviewed 23 September 2026 and the profile object in the dataset. Supported overlaps: Blue Prism/RPA; custom C#/.NET internal platforms and desktop tools; API, JavaScript, VB/VBA, SQL and automation integrations; UiPath and Power Automate solutions; applied LLM integration; solution design; process improvement and analysis; code standards, mentoring, hiring participation and Agile delivery.

Languages confirmed by the user: Russian, English, Lithuanian, French, and a little Japanese. Exact proficiency and work rights remain unknown. French coursework is not current fluency; do not assume professional Japanese. SAFe 5 expired June 2023. Do not infer CS education (the documented degree is International Relations and Politics), formal people management, product ownership, cloud/ML expertise, or years in a specific tool from overall tenure.

Desired roles: developer, manager, team lead, analyst and product owner. Search all five independently. Interest is not experience. Keep direct and plausible fits first; label adjacent, leadership, platform or product roles as Stretch when their requirements exceed the evidence.

## Independent discovery lanes

1. RPA developer, engineer, analyst, architect, controller, manager; robotic process automation; intelligent automation; hyperautomation; enterprise/business-process/workflow/digital automation; CoE.
2. Blue Prism, UiPath, Power Automate, Automation Anywhere, Power Platform, Power Apps, Copilot Studio, Camunda, BPM/BPMN, n8n, workflow/process orchestration, case management, process/task mining, low-code/no-code, API automation, Azure Logic Apps, ServiceNow, Dynamics 365, Salesforce, Microsoft 365, SharePoint, middleware. These are discovery terms, not asserted skills.
3. C#/.NET desktop, WPF/XAML/WinForms, internal platforms, developer productivity and reusable engineering tools. Do not exclude these merely because “automation” is absent from the title.
4. Automation/RPA/engineering manager; team, technical, practice, delivery, capability and chapter lead; Head of Automation; CoE leadership; portfolio/programme ownership; AI enablement/adoption lead.
5. Business/systems/functional/requirements/process analyst; business and functional specialist; process improvement/excellence/design/development/governance; operational excellence; continuous improvement; solution/technology/functional consultant; target operating model; process controls; shared-services/GBS transformation.
6. Product owner, technical/platform/automation product owner, product/platform/process manager, delivery/project/programme manager, digital/business transformation. Require substantive overlap in responsibilities.
7. Solution/platform/application/integration architect, API/middleware/enterprise applications engineer and substantive systems automation. Treat enterprise architecture as a stretch unless demonstrated requirements genuinely fit.
8. Applied AI, LLM/agentic workflows, AI adoption, intelligent document processing/OCR, conversational automation and virtual agents. Distinguish applied integration from model research, cloud operations and MLOps.
9. Existing employers, original vacancies, renamed equivalents, reposts and successor requisitions; new employer discovery and direct ATS searches.

Exclude generic software/data/QA/marketing automation and generic project management with no documented overlap. Do not confuse industrial robotics or an unrelated “RPA” acronym with business-process automation.

## Sources and employer discovery

Prefer official employer vacancy → official ATS → specific reputable local job-board listing → direct LinkedIn vacancy → recruiter → aggregator/mirror. Search Workday, Greenhouse, SmartRecruiters, Oracle, SuccessFactors, Lever and regional boards. Examples: CVbankas/CV.lt/CVMarket/Work in Lithuania; jobs.ch; Job Bank Canada; SEEK Australia/NZ; JobStreet Asia; CareerCross Japan; Gupy Brazil; regional African and Middle Eastern boards. These are discovery channels, not blanket endorsements or claims that all were checked.

Revisit employers from the existing dataset and the inherited employer register below. Expand beyond it across finance, shared services, consulting, healthcare, enterprise software, public services and internal automation teams worldwide. Seek the stronger official source before accepting a mirror. Never report an employer lane complete based only on a combined search snippet.

Continue independent title, language, technology, country and employer variants while they produce credible new leads. Record attempted queries, reviewed sources, failures and unsearched lanes. A bounded refresh can publish verified results, but must explicitly identify incomplete coverage; never claim a census, universal eligibility, or every possible vacancy.

## Verification and state

Every visible vacancy needs a discovered, role-specific direct URL, recognizable employer/title/location, current role description and positive application-route or current-list evidence. HTTP 200 or a search snippet alone is insufficient. Follow redirects: a careers homepage is not the original vacancy. Do not guess IDs or URLs. Keep essential URL parameters; remove tracking only when the clean URL resolves correctly.

Use exactly these current statuses:
- `Newly found`: new record with positive current-open evidence.
- `Still open`: existing record positively reverified.
- `Unknown`: ambiguous/blocked/conflicting application state, unverified direct link or disappearance without explicit closure.
- `Closed/Expired/No longer accepting applications`: explicit source closure only.

Age or an elapsed date alone does not prove closure. Record stale dates and resolve contradictory evidence. Preserve older advertisements with a functioning current official application route, flagged as older. Prefer current official evidence over conflicting lower-priority sources. Retain unresolved and closed records in `data/job-history.json`; exclude them from every vacancy list, source register, export, map and dashboard total. Keep historical research downloads and aggregate audit counts clearly separate from active results.

Recheck every previously active role each refresh. Update `lastVerifiedAt` and `sourceLastCheckedAt` on a check, `lastSeenAt` only when actually seen, and `firstSeenAt` only on genuine first discovery. Record previous status, reason and dated history. A new requisition/application window is a new record linked to its predecessor. Cross-postings of the same requisition are one vacancy; normalize employer/title/location conservatively and retain supporting sources.

## Mind data contract

Preserve the existing schema and renderer fields: `id`, `company`, `title`, `country`, `region`, `location`, `level`, `experience`, `field`, `tools`, `mode`, `employment`, `summary`, `notes`, `salary`, `postedAt`, `checkedAt`, `sourceUrl`, `evidenceUrl`, `sourceType`, `status`, `verification`, `fit`, `researchBatch`.

Extend each record with one `roleFocus` (`developer`, `manager`, `teamlead`, `analyst`, `productowner`) chosen by dominant responsibilities, and multiple `roleFamilies` for overlaps. Managerial title alone does not establish people-management work. Store `requisitionId`, `applicationDeadline`, `requiredLanguages`, `workAuthorization`, `remoteEligibility`, `sponsorship`, `firstSeenAt`, `lastSeenAt`, `lastVerifiedAt`, `sourceLastCheckedAt`, `statusHistory` where evidenced. Unknown is explicit; never infer language requirements from location or posting language.

`fit.band` retains Strong technical fit / Potential fit / Stretch / Lower priority. `fit.strengths` must identify actual overlap; `fit.checks` must name material gaps. Keep technical relevance separate from eligibility. Do not use the old Lithuania/Switzerland bonus or present a numerical score as probability of hire. Salary remains in original currency/period/basis; no invented conversion or annualization.

In global dashboards, count one primary advertised country per distinct requisition and explain that limitation for multi-country/remote roles. Use a separate Unknown/Multiple countries bucket where necessary; never assign headquarters as job location. Worldwide search scope and actually represented countries are different measures. Regional counts must support all six regions.

## Publish and report

1. Merge reviewed active records into `data/rpa-vacancies.json`; archive Unknown/closed records with reasons in `data/job-history.json`.
2. Update `data/search-runs.json` with UTC times, scope, actual coverage, blockers, counts, sources and incomplete lanes. Do not refresh dates on unchecked records.
3. Validate schema, uniqueness, URLs, fit, status histories and all previously active outcomes. Inspect every changed direct link and application route.
4. Run `npm test`, check relevant desktop/mobile views, filters, global regional totals, map/pie and exports, then inspect the diff. Static publication has no production build command.
5. Commit all relevant changes and push to `https://github.com/kbekulov/mind.git`. Verify GitHub Pages and `https://mind.bekulov.com`; report deployment separately from push.
6. Report actual new/rechecked/restored/Unknown/closed counts, role-focus counts, coverage limitations, tests and publication result. Never apply, send messages, or schedule recurring searches without a separate request.

## Inherited employer register

Swedbank; SEB; Luminor; Danske Bank; Nasdaq; Western Union; Revolut; Adyen; Moody's; Telia; Cognizant / Devbridge; Accenture; EPAM; Baltic Amadeus; Tietoevry; Vinted; Nord Security; Teltonika; Ignitis Group; LTG Group / LTG Link; Girteka; Thermo Fisher Scientific; Citco; Dexcom; Mediq; Metso; Registrų centras; CPVA; EKSMA Optics; FL Technics; EUROCASH1; Lietuvos bankas; Litgrid; EPSO-G; Macaw; BURGA; CGI; Convera; TAUMONA; Hoptrans; Robodam; Synergy Effect. Also check every employer already recorded in Mind and newly discovered global employers.

Historical discovery seeds: Citco intelligent-automation manager/developer; Vinted AI process architect; LTG/LTG Link process manager/automation architect; Mediq business-process manager/RPA developer; Metso automation analyst; Registrų centras RPA analyst/programmer; Western Union RPA developer; Luminor risk quantification and automation manager; Dexcom process excellence/business analysis; Danske workflow enablement specialists/architects; EKSMA business-process development; FL Technics automation/systems project manager; EUROCASH1 IT project manager; Cognizant MS Power/UiPath developer. These are leads, not verified active vacancies.
