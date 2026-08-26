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

Take the quiz start to finish, picking Q1 as shown — since Q2/Q3/Q6 are
conditional on Q1 (see CONTENT_GUIDE.md), whichever Q1 answer you pick,
**any** option in Q2/Q3/Q6 after it reinforces the same result, so you don't
need to hunt for a specific line. These exact paths (using each desire's
first conditional option) are also asserted in `tests/engine.test.js`:

- **Money Surge:** Q1 "More money" → Q2/Q3/Q6: any option (all reinforce money)
- **Sold-Out Era:** Q1 "My business / sales" → Q2/Q3/Q6: any option
- **Glow-Up:** Q1 "My beauty / confidence" → Q2/Q3/Q6: any option
- **Magnetic Era:** Q1 "Everything, honestly" → pull "The Star" as any one of
  your three cards (magnetism has no direct Q1 option, so it's reached via
  a Q1 tie + the card reading)
- **Love Upgrade:** Q1 "My love life" → Q2/Q3/Q6: any option
- **Luck Streak:** Q1 "My luck / opportunities" → Q2/Q3/Q6: any option
- **Life Upgrade:** Q1 "My lifestyle" → Q2/Q3/Q6: any option

Any unanswered questions in a path above can be answered arbitrarily — they
won't change the outcome for that path. If Q1 is "Everything, honestly"
instead, Q2/Q3/Q6 fall back to the original mixed list spanning all 7
desires (the `general` bucket in `questions.js`) — worth spot-checking too,
since it's the one case where conditional branching doesn't apply.

## Fast QA without retaking the quiz

`/uic/preview.html` (dev-only, not linked anywhere public, `noindex`):
generates links to `/universe-is-calling?uic_preview=1&result={key}&pattern={key}&name=X`
for every result and every pattern. This mode **never calls Kit** — safe to
click through repeatedly. Extra query params for testing the staged reveal:

- `&stage=hero|audio|transition|full|product` — jump straight to any point
  in the reveal sequence: `hero` (result name/identity reveal), `audio`
  (the required-listen gate), `transition` ("your full reading is next"),
  `full` (default — the reading screen: cake, pattern, declaration, share
  card, no product), `product` (the second screen — product recommendation
  + why + disclaimer + footer).
- `&audio=1` — force the result's audio to the bundled 2-second QA test tone
  (`WEBSITE/uic/audio/qa-test-tone.wav`), so you can test the required-listen
  gate and its disabled/enabled continue button before real audio exists.

Example: `/universe-is-calling?uic_preview=1&result=money_surge&stage=audio&audio=1`

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
| No audio configured for a result | Audio-gate screen skipped entirely, straight to the "full reading is next" transition | `hero-continue` handler in `app.js` |
| Audio configured, not yet finished playing | "See My Full Reading" stays disabled | `renderAudioGate()` / `audioUnlocked` in `app.js` |
| User tries to scrub/seek/fast-forward the audio | Playhead is silently snapped back to the last position actually heard — no seeking ahead, no way to skip to the end | `onseeking`/`ontimeupdate` handlers in `toggleAudio()` in `app.js` |
| Can't listen (accessibility) | "Read the transcript instead" link also unlocks continuing | `toggle-transcript` handler in `app.js` |
| User closes the reading screen before seeing the product | Reading and product recommendation are two separate sequential screens (`reveal` → `reveal-product`); product/pitch/disclaimer/footer only exist on the second screen, reached via "There's One More Thing" | `renderReveal()` / `renderRevealProduct()` in `app.js` |
| Missing/placeholder product checkout URL | Button still renders (don't silently hide a CTA); fix the URL in `products.js` before launch | `products.js` `placeholder: true` flag |
| Refresh mid-quiz | Restarts at the call screen (session isn't persisted across reload by design — quiz is short) | — |
| Back button on question 2+ | Previous answer preserved, re-answering replaces it (no double-counted weight) | `setAnswer()` in `app.js` |
| `prefers-reduced-motion` | Animations shortened/disabled, tidbit interstitials advance faster, no auto-playing motion loops | CSS `@media (prefers-reduced-motion)` + `reducedMotion` checks in `app.js` |
| Rate limit exceeded (>8 submits/IP/10min) | 429, generic error shown, funnel not otherwise broken | `netlify/functions/lib/rate-limit.js` |

## Automated tests

`npm test` runs `tests/engine.test.js` (scoring, tie-breaking, routing,
product mapping, conditional Q2/Q3/Q6/Q7, and the three-card reading —
draw-without-replacement across positions 1–3, confirming `q5_symbol` no
longer exists as a standalone question) and `tests/uic-submit.test.js`
(validation, honeypot, Kit success/failure paths, forged-result rejection)
— 22 assertions total, all passing as of this build.
