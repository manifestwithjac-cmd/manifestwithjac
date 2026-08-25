# QA Matrix — THE UNIVERSE IS CALLING

## Result → Product → Kit tag → Kit sequence

| Result | Desire key | Product (frequency match) | Kit tag | Kit sequence |
|---|---|---|---|---|
| The Money Surge | `money` | Wealthy As F*ck™ Stack — $47 | `UIC - Money Surge` | `Universe Is Calling - Money Surge` |
| The Sold-Out Era | `business` | Sold Out Frequency — $67 | `UIC - Sold Out Era` | `Universe Is Calling - Sold Out Era` |
| The Glow-Up | `beauty` | Goddess Frequency — $67 | `UIC - Glow Up` | `Universe Is Calling - Glow Up` |
| The Magnetic Era | `magnetism` | Goddess Frequency — $67 | `UIC - Magnetic Era` | `Universe Is Calling - Magnetic Era` |
| The Love Upgrade | `love` | Already Chosen — $17 *(checkout URL placeholder — page not live yet)* | `UIC - Love Upgrade` | `Universe Is Calling - Love Upgrade` |
| The Luck Streak | `luck` | Timeline Jump Sleep Portal™ — $19 | `UIC - Luck Streak` | `Universe Is Calling - Luck Streak` |
| The Life Upgrade | `lifestyle` | Money Multiverse™ — $197 *(above typical impulse range — see products.js)* | `UIC - Life Upgrade` | `Universe Is Calling - Life Upgrade` |

Every submission also gets the universal `UIC - Completed` tag.
Real Kit ids for all of the above are already in `.env.example`.

## Pattern library ("what she needs to hear")

`chasing, checking, doubting, switching, settling, holding, visibility,
waiting, forcing, receiving` — any of these 10 can pair with any of the 7
results above (70 combinations), via `WEBSITE/uic/config/patterns.js`.

## One valid answer path per result (for manual QA)

Take the quiz start to finish using these answers to land on each result —
these exact paths are also asserted in `tests/engine.test.js`:

- **Money Surge:** Q1 "More money" → Q2 "$10,000 received." → Q6 "I have more money than I know what to do with."
- **Sold-Out Era:** Q1 "My business / sales" → Q2 "You have 17 new orders." → Q6 "My business is absolutely blowing up."
- **Glow-Up:** Q1 "My beauty / confidence" → Q6 "I look and feel completely different."
- **Magnetic Era:** Q5 "Star" → Q1 "Everything, honestly"
- **Love Upgrade:** Q1 "My love life" → Q2 "A message from someone I actually want." → Q6 "I am loved ridiculously well."
- **Luck Streak:** Q1 "My luck / opportunities" → Q2 "An unexpected opportunity. A yes." → Q6 "Everything keeps working out for me."
- **Life Upgrade:** Q1 "My lifestyle" → Q2 "Your reservation is confirmed." → Q6 "My life feels expensive in the best way."

Any unanswered questions in a path above can be answered arbitrarily — they
won't change the outcome for that path.

## Fast QA without retaking the quiz

`/uic/preview.html` (dev-only, not linked anywhere public, `noindex`):
generates links to `/universe-is-calling?uic_preview=1&result={key}&pattern={key}&name=X`
for every result and every pattern. This mode skips straight to the reveal
screen and **never calls Kit** — safe to click through repeatedly.

## Critical failure states to test before launch

| Scenario | Expected behavior | Where it's handled |
|---|---|---|
| Invalid email | Inline error, no submission | `uic-submit.js` (`EMAIL_RE`), `app.js` client-side check |
| Empty first name | Inline error, no submission | same |
| Honeypot field filled (bot) | Silent fake-success, no Kit call, no scoring | `uic-submit.js` `payload.website` check |
| Kit API key missing/invalid | Result still reveals in-browser; `kitStatus: "skipped"` or `"failed"` | `uic-submit.js` |
| Kit API times out / 5xx | Result still reveals; lead saved with `kitStatus: "failed"`; scheduled retry picks it up within 15 min | `uic-retry-kit.js` |
| Duplicate/returning subscriber email | Upserted, not duplicated (Kit's own upsert-by-email behavior); latest result's tag/fields applied | Kit API `/v4/subscribers` |
| Client tries to submit a fabricated `result` field | Ignored — server always recomputes from raw answers | `tests/uic-submit.test.js` |
| No audio configured for a result | Audio section doesn't render at all | `renderAudioSection()` in `app.js` |
| Missing/placeholder product checkout URL | Button still renders (don't silently hide a CTA); fix the URL in `products.js` before launch | `products.js` `placeholder: true` flag |
| Refresh mid-quiz | Restarts at the call screen (session isn't persisted across reload by design — quiz is short) | — |
| Back button on question 2+ | Previous answer preserved, re-answering replaces it (no double-counted weight) | `setAnswer()` in `app.js` |
| `prefers-reduced-motion` | Animations shortened/disabled, no auto-playing motion loops | CSS `@media (prefers-reduced-motion)` + `reducedMotion` checks in `app.js` |
| Rate limit exceeded (>8 submits/IP/10min) | 429, generic error shown, funnel not otherwise broken | `netlify/functions/lib/rate-limit.js` |

## Automated tests

`npm test` runs `tests/engine.test.js` (scoring, tie-breaking, routing,
product mapping, conditional Q7) and `tests/uic-submit.test.js` (validation,
honeypot, Kit success/failure paths, forged-result rejection) — 18 assertions
total, all passing as of this build.
