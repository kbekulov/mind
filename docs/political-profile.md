# Personal political profile

Route: `#view=politics&topic=my-political-profile`, under Politics.

Source: the user's eight-page `12axes-report-2026-10-18.pdf`, generated on 18 October 2026 after 240 answers. The source is published unchanged at `data/12axes-report-2026-10-18.pdf`, as requested. `data/political-profile.js` records its content; `political-profile.js` and `.css` render it.

All ten report sections are included: axes, distinctive/typical positions, country comparisons, figure comparisons, eight ranked figures, three readings, party/group comparisons, six historical eras, other ideologies and the compass summary. Descriptions are attributed to the supplied report, not independently verified research or endorsements. Preserve this attribution when updating the page.

## Display decisions

- Keep the exact 95.8% headline compatibility score, mentioning the cover's rounded 96% separately.
- Show the five explicitly printed axis percentages. For a left-pole score, its position is `100 - score`; for a right-pole score, its position is `score`.
- Seven axes print only “Balanced.” Use a hatched central zone as a qualitative symbol, not a manufactured exact score. It is not an uncertainty interval.
- Figure comparison bars use a full 0–100 scale. The 75% religion comparison is against the ideology catalogue, not a population percentile.
- Reproduce the compass's verbal classifications without extracting numerical coordinates from the drawing. The full original diagram is in the linked PDF.
- Retain the source's classifications, including Gran Colombia under a social country comparison and non-party entities in its party category. Explain the latter's mixed scope.
- Normalize BC notation and names into English (Boris III of Bulgaria, Enéas Carneiro, Glücksburg). The US flag in the source identifies its Democratic Party entry.
- Reading links preserve the report's Amazon searches with the affiliate tag removed. No quiz response-level data are supplied or invented.
- The timeline represents the quiz's historical associations, not changes in the user's beliefs. Dates spanning several eras remain as given.

Validation: `node tests/political-profile.cjs`, plus the existing workspace regression and full `npm test`. Screenshots are written to ignored `test-results/political-profile/`.
