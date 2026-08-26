# Content Guide — THE UNIVERSE IS CALLING

Everything editable lives in `WEBSITE/uic/config/*.js`. Nothing else in the
app needs to change for the edits below — the question engine, scoring, and
Kit integration all read these files generically. Each file is plain
JavaScript with comments; you don't need to know JS, just follow the shape
of what's already there and keep the punctuation (commas, quotes, curly
braces) matching.

After editing, refresh `/universe-is-calling` (or use `/uic/preview.html`
for results/patterns) to see the change — there's no build step.

## Add or change a question

File: `WEBSITE/uic/config/questions.js`

Each question is one object in the `QUESTIONS` array:

```js
{
  id: 'q1_transform',           // never change this once live — analytics keys off it
  type: 'select',                // or 'image-select'
  decisive: true,                 // optional — see "How scoring works" below
  prompt: "Your question text",
  options: [
    { id: 'money', label: 'More money', weights: { desire: { money: 4 } } },
    ...
  ]
}
```

- To **add an answer**, add another object to `options`.
- To **change scoring**, edit the numbers inside `weights.desire` / `weights.pattern`.
  Desire keys: `money, business, beauty, magnetism, love, luck, lifestyle`.
  Pattern keys: `chasing, checking, doubting, switching, settling, holding,
  visibility, waiting, forcing, receiving`.
- To **add a whole new question**, copy an existing object, give it a new
  unique `id`, and add it to the array (position = where it appears in the
  quiz).
- To **remove a question**, delete its object. Nothing else needs updating.

### Conditional questions (Q2, Q3, Q6, Q7)

These four don't use a static `options` array — they use
`resolveOptions(answersSoFar, runningDesireScores)` instead, so the options
she sees are phrased for whichever desire is currently leading (usually
locked in by her Q1 pick). Pick "My beauty / confidence" in Q1 and every one
of these becomes a beauty-flavored line — not a mixed list of money/business/
love notifications she has to squint at to find something relevant.

Each of these questions has one option table per desire
(`Q2_BY_DESIRE.money`, `Q2_BY_DESIRE.beauty`, etc. — same shape for Q3_BY_DESIRE
and Q6_BY_DESIRE, near the top of `questions.js`) plus a `general` bucket
used only when nothing is clearly leading yet (i.e. she picked "Everything,
honestly" in Q1 — a genuine 7-way tie).

- To **edit an option's wording/weights**, find it inside the right desire's
  array (e.g. `Q3_BY_DESIRE.money`) and edit it like any other option.
- To **add an option to one desire**, add another object to that desire's
  array — try to keep every desire's array the same length so the quiz feels
  balanced, but it's not required.
- To **make a currently-static question conditional** (or vice versa), copy
  the pattern from Q2/Q3/Q6: build a `{money: [...], business: [...], ...,
  general: [...]}` table, then set the question's `resolveOptions` to
  `function (answersSoFar, runningDesireScores) { return byDesire(TABLE,
  runningDesireScores); }` instead of a static `options` array.
- Q1 and Q4 are deliberately **not** conditional — Q1 is the anchor pick
  that establishes the leading desire in the first place, and Q4 asks about
  a *behavior pattern* (not a desire), so it stays universal on purpose. Q5's
  symbol pick also stays universal — it's meant to be instinctive/non-verbal.

## How scoring works (so your edits behave predictably)

1. Every answered option's weights get added into two running totals across
   the whole quiz: desire scores and pattern scores.
2. The desire with the highest total wins — that picks the RESULT (each
   result in `results.js` has a `desireKey` it's tied to 1:1).
3. The pattern with the highest total wins — that picks which entry from
   `patterns.js` explains "what she needs to hear."
4. Questions marked `decisive: true` break ties (higher decisive-only total
   wins); if still tied, a fixed priority order is used (see `DESIRE_PRIORITY`
   / `PATTERN_PRIORITY` at the top of `WEBSITE/uic/engine.js`). No randomness,
   ever — this is deliberate so the same answers always produce the same
   result and it's testable.

Full test coverage for this lives in `tests/engine.test.js` — run `npm test`
after any scoring edit to confirm every result is still reachable.

## Add a new result archetype (8th, 9th, ...)

1. Add an object to `RESULTS` in `WEBSITE/uic/config/results.js` — copy an
   existing one as a template (see the field-by-field comment at the top of
   that file). Give it a new `key` and a `desireKey` that isn't already used
   by another result (each desire maps to exactly one result).
2. If it needs a new desire category entirely (not just reusing one of the
   existing 7), add the key to the option weights in `questions.js` and to
   `DESIRE_PRIORITY` in `engine.js`.
3. Add a product for it in `products.js` (or point `productSlug` at an
   existing one).
4. In Kit: create a tag and a sequence for it (see KIT_SETUP.md), then add
   the new env var names to `WEBSITE/uic/config/integrations.js` and the
   real ids to your Netlify environment variables.

## Change result copy (the reveal screen content)

File: `WEBSITE/uic/config/results.js`. Per result:
- `redVelvetCake` — array of paragraphs for "what this actually looks like."
  Keep it tangible/specific (scenes, not concepts) — see the brand voice
  notes at the top of the file and MASTER BRIEF's "Red Velvet Cake" rule.
- `keyMessages` — 3-5 quotable declarations; the app deterministically picks
  one per session (same person always sees the same one).
- `declaration` — the default/fallback quotable line.
- `emailSummary` — feeds the seed copy for Kit email 1 (see `/content/email-sequences/`).
- `shareCard` — the two lines shown on the shareable result card.

## Change pattern copy ("what I need you to know")

File: `WEBSITE/uic/config/patterns.js`. Each pattern has one `interpret(ctx)`
function returning the paragraph shown. `ctx.manifestingNoun` and
`ctx.firstName` are the only two insertion points — keep edits to full,
natural sentences around them, not sentence fragments (avoid it reading like
a mad-lib). This copy is intentionally generic-per-pattern (not written per
result), which is what lets 7 results × 10 patterns combine without writing
70 separate blocks — see MASTER BRIEF's composable-copy requirement.

## Add an audio message

See `AUDIO_ASSETS.md` — it's a few lines in `results.js`'s `audio` field per
result.

## Change or add a product

File: `WEBSITE/uic/config/products.js`. One object per product
(`title, description, price, image, checkoutUrl, cta`). To change what a
result recommends, change that result's `productSlug` in `results.js` — you
don't need to touch `products.js` unless you're changing the product itself
(price, URL, copy).

## Change the "tidbit" interstitials during the quiz

File: `WEBSITE/uic/config/copy.js`, the `tidbits` array — short lines like
"Mm. I'm starting to see something." shown as a brief full-screen beat
between certain questions, to keep her engaged without turning it into
another Q&A round. Which question indices trigger one is set by
`TIDBIT_AFTER_INDEX` near the top of `WEBSITE/uic/app.js` (currently after
questions 2, 4, and 6 — 0-indexed as `[1, 3, 5]`). Add/remove indices there
to change when they fire; add/remove lines in `copy.js` to change what they
say. They auto-advance after a couple seconds, or on tap.

## Change the required-listen audio gate or the "full reading is next" transition

File: `WEBSITE/uic/config/copy.js`, the `audioGate` and `transition` blocks.
`audioGate` only ever shows for a result that has `audio.enabled: true` (see
AUDIO_ASSETS.md) — listening to the end (or reading the transcript, for
accessibility) is required before the "See My Full Reading" button unlocks.
If a result has no audio configured, the audio-gate screen is skipped
entirely and she goes straight from the hero reveal to the `transition`
screen ("Your full reading is next").

The audio-gate headline tells her up front that it's short:
`audioGate.headlineWithDuration` (used when that result's `audio.duration`
is set, e.g. "your reading is available after this — just 0:47") or
`audioGate.headlineDefault` ("...after this short audio") when no duration
is set. Keep whichever one you use true to the actual recording length.

**No skipping ahead.** The player has no seek/scrub control at all, and
`toggleAudio()` in `app.js` actively blocks it further: it tracks the
furthest point she's actually played (`lastSafeTime`) and snaps any jump
past that back down — covers manual seeking, a stray keyboard/media-key
skip, etc. Pausing and resuming is still fine (that's not a skip). This is
intentional per direction: she needs to hear the whole message before
"See My Full Reading" unlocks.

## Reading vs. product recommendation — two separate screens

By design, finishing the reading (Red Velvet Cake / pattern / declaration)
does **not** scroll straight into the product pitch. She taps
`reveal.readingContinueCta` ("There's One More Thing") and lands on a
dedicated `reveal-product` screen with the frequency-match recommendation
and its "why" — see `renderReveal()` / `renderRevealProduct()` in `app.js`.
Edit the CTA text in `copy.js`; edit the product pitch itself in
`products.js` (see "Change or add a product" above).

## Change the top progress bar

File: `WEBSITE/uic/app.js`, `renderTopbar()`. It only shows during the
question flow (and the "tidbit" interstitials), and displays both a
numeric "X / 7" label and a filled bar — both driven off
`state.questionIndex` and `QUESTIONS.length`, so adding/removing a question
in `questions.js` updates it automatically.

## Change a Kit tag or sequence mapping

File: `WEBSITE/uic/config/integrations.js` maps each result to the *names*
of the environment variables holding the real Kit ids (not the ids
themselves — those live in Netlify's env vars, see `.env.example` and
KIT_SETUP.md). To point a result at a different tag/sequence, either change
the id in the env var, or change the env var name here and set a new one.

## Change fixed flow copy (buttons, screen headlines, disclaimer, etc.)

File: `WEBSITE/uic/config/copy.js` — every string that isn't tied to a
specific result or question lives here (incoming call screen, "Tune In"
intro, connecting-screen steps, email gate labels, disclaimer, etc.). Keep
the intro framed as the universe already knowing why it's calling — she's
tuning in to find out, not explaining herself to it (avoid anything that
reads like "tell me why you're reaching out").

## The three-card reading

After all 6 real questions are answered (not mixed into the numbered quiz —
this is its own ritual moment), she pulls three cards, one position at a
time: a blind spread of face-down cards, she taps one without knowing what's
under it, it flips to reveal a symbol + tarot-style title + one-line
meaning, then the deck reshuffles minus that card for the next pull. After
the third pull, all three revealed cards are shown together as "Your
Reading" — each under a positional label (`CARD_POSITION_LABELS` in
`app.js`: "What's Already Moving" / "What You've Been Missing" / "What's
About to Shift").

This is deliberately atmospheric-plus-structural, not a fourth scoring
dimension — the position labels give it the shape of a real reading without
requiring bespoke copy for every card × position × result combination. Each
card still carries the same light desire weights the old single-symbol pick
used.

Implemented as three questions in `questions.js` — `card_pull_1`,
`card_pull_2`, `card_pull_3` (`type: 'card-pull'`), appended after
`q7_proof`. They're excluded from the numbered progress bar (see
`PROGRESS_QUESTIONS` in `app.js`) since they're a ritual, not "question 7 of
9." `renderCardPull()` in `app.js` handles the position-aware rendering
(prior-picks strip, single reveal, final 3-card spread).

- To **edit a card's title/meaning**, edit its `label` / `meaning` in the
  `CARD_SYMBOLS` table near the top of `questions.js`.
- To **add/remove a card** from the deck, add/remove an entry in
  `CARD_SYMBOLS` — the spread, the exclusion-per-position logic, and
  everything else adapts automatically.
- To **change a position's label or the "Your Reading" framing**, edit
  `CARD_POSITION_LABELS` in `app.js`.
- The icons are simple inline line-art (no image files needed) — see
  `SYMBOL_PATHS` in `WEBSITE/uic/app.js`. `questions.js` already has an
  `image` field per card reserved for real artwork later; to switch to real
  images, add files under `WEBSITE/uic/symbols/` matching those paths and
  render `<img src="o.image">` in `renderCardPull()`'s revealed-card markup
  instead of calling `symbolGlyph(o.id)`.
- She can change a pick before continuing ("Pull a different card" on the
  single-reveal view for positions 1-2) — same spirit as any other
  question's back-button, phrased to fit the ritual. Position 3 skips
  straight to the full reading instead, so the payoff is immediate.

## Consent checkbox / legal links

`WEBSITE/uic/config/copy.js` has `legal.privacyPolicyUrl` /
`legal.termsUrl` as placeholders (V1 ships without a visible consent
checkbox to keep the form to two fields — see MASTER BRIEF's "keep the form
extremely short" rule). If your jurisdiction needs an explicit opt-in
checkbox, add one to the form in `renderGate()` in `app.js` and wire its
checked state into the `consent` field already sent to
`/.netlify/functions/uic-submit`.

## Footer (Shop / Disclaimer links) and the Disclaimer page

The site footer (Shop link, Disclaimer link, contact email) is static markup
in `WEBSITE/universe-is-calling.html` right below `#uic-root`, styled by
`.uic-site-footer` in `styles.css` — edit the HTML directly to change the
links or text. The Disclaimer page itself is a standalone file,
`WEBSITE/disclaimer.html` — it's plain HTML matching `shop.html`'s design
system, not part of the config-driven app, so edit its copy directly in that
file.

## Visual design system

`WEBSITE/uic/styles.css` keeps `WEBSITE/shop.html`'s structural bones —
thick 3px borders, hard drop-shadow on button/card hover, uppercase
tight-tracking headlines — but **inverts the palette to a dark, cosmic
theme** (near-black background, cream type, a faint star-field + a
violet/blue galactic glow) rather than Shop's white background, and swaps
Shop's Arial/Arial Black pairing for its own type system. This was a
deliberate choice: a bright white page reads as a coaching/SaaS landing
page, and this experience is supposed to feel like the universe calling,
not a bootcamp sign-up form.

**Type:** two Google Fonts, loaded via a `<link>` in
`universe-is-calling.html` and `preview.html` (falls back to system Georgia
/ Arial if that link is ever removed) — `--serif` (`Cormorant Garamond`,
aliased as `--blk`) for anything that's "the universe speaking": the call
screen, question prompts, tidbits, the result reveal, the declaration
(set in italic — it's the one quotable line), product titles. `--sans`
(`Poppins`) for UI chrome — buttons, the progress-bar label, body prose in
the reading. This replaced the original Arial/Arial Black pairing, which
read as a dashboard rather than a message from somewhere bigger. Every
selector that references `var(--blk)` sets its own `font-weight` (Cormorant
tops out at 700, unlike Arial Black's baked-in 900) — if you add a new
headline-style element, set `font-weight: 600;` alongside it or it'll
render at the browser default (400) and look thin.

**Color:** all colors run through `:root` custom properties at the top of
the file — `--ink` (cream, text/borders), `--paper` (near-black, page
background), `--violet` and `--blue` (the galactic accent pair — violet
for alerts/hovers/focus/price/declaration marks, blue for card backs/glows/
position labels), `--grey`. `--red` and `--gold` still exist as aliases
(`--red: var(--violet); --gold: var(--blue);`) purely so the ~40 existing
rules that reference `var(--red)`/`var(--gold)` didn't all need rewriting
when the accent pair moved from red/gold to violet/blue — if you're adding
a *new* rule, reach for `--violet`/`--blue` directly rather than the alias
names. Two colors are intentionally **not** tied to any of this:
`--card-face-bg` / `--card-face-ink` keep the revealed tarot-card face
light/cream regardless of the page theme (a card should read as an object
catching light against the dark page, not a page-colored panel), and the
card *backs* are hardcoded near-black so they hold their "mystery" look
even against a dark page. If you ever want to go back to a light theme,
swap the `:root` values — everything else in the file references those
variables — but re-check `.uic-card-back` / `.uic-card-face` first, since
those two are deliberately theme-independent.
