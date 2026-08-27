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
say. They auto-advance after 3.4s (1.3s with reduced motion) — long enough
to actually read the line, not just glimpse it — or sooner on tap; the
delay is set in `showTidbitThenAdvance()` in `app.js` if you need to retune
it (e.g. if a future tidbit line runs noticeably longer than the current
ones, which are all short sentences).

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

`WEBSITE/uic/styles.css` no longer shares `WEBSITE/shop.html`'s structural
bones — it started as Shop's hard-edged system (thick 3px borders, sharp
corners, hard offset-shadow on hover) and has since moved to its own soft,
rounded shape language (generous `border-radius`, pill buttons/answer
rows, gentle drop shadows instead of hard offsets) inspired by a reference
funnel the client liked the *feel* of, translated onto **our own dark,
mystical palette** (a purple-to-navy night-sky gradient, warm white type,
a gold accent, a dense field of tiny twinkling star specs with indigo
pooling in the corners) rather than that reference's cream/black/red — the
shape language moved, the color didn't. This has been iterated several
times: a bright white page read as a coaching/SaaS landing page; a first
dark-theme pass (near-black + violet/blue + a rounded sans) still read
"brand-brutalist"; a second pass (flat purple + gold, all-serif, shouting
all-caps headlines) still read too plain and too loud, so headline text
moved to mixed case and a real sans came back for UI chrome; a third pass
lightened every font-weight (nothing above 500 now — 600/700 read as
aggressive); this pass replaced the sharp hard-bordered geometry with the
soft rounded/shadow one described below.

**Type:** three fonts, each with one job — `--blk` (`'Seriously
Nostalgic'`) for anything that's "the universe speaking": the call screen,
question prompts, tidbits, the result reveal, product titles. This is a
**licensed display font, not a Google Font** — it's the same font already
embedded in `WEBSITE/quantum-blueprint.html` (as a base64 `@font-face`),
extracted once and vendored as a real file at
`WEBSITE/uic/fonts/seriously-nostalgic.otf`, loaded via the `@font-face`
rule near the top of `styles.css`. It only ships one weight (400/normal) —
every selector using `var(--blk)` sets `font-weight: 400;` and
`font-synthesis: none;` together, so the browser never tries to fake a
bold/italic that doesn't exist (which looks broken on a stylized display
face). It's **always mixed case, never `text-transform: uppercase`** — two
reasons stack here: a multi-line question in shouting caps reads as
yelling at her, and this specific font is stylized enough that forcing
caps breaks its character entirely. Two Google Fonts round out the
system, loaded via a `<link>` in `universe-is-calling.html` and
`preview.html` (falls back to system Georgia if that link is ever
removed): `--serif` (`Cormorant Garamond`) for the declaration
specifically, set in italic — Seriously Nostalgic has no italic, and the
declaration is the one quotable line, so it deliberately reads as a
different, more intimate voice than the display headlines around it.
`--sans` (`Josefin Sans`, an elegant geometric sans, distinct from Arial/
system defaults) for UI chrome — buttons, labels, body prose, and the
small tracked-caps labels (eyebrows, the brand header, the progress
counter) — those stay uppercase on purpose; they're short 2-4 word
utility labels in a different font, not sentences, so they don't read as
yelling the way a full headline in caps would.

**If you ever need to re-extract or replace the font file:** the source
`@font-face` lives in `WEBSITE/quantum-blueprint.html` — search that file
for `Seriously Nostalgic` to find it (it's a single long `src:url(data:
font/otf;base64,...)` line). Decode the base64 payload after
`base64,` and before `) format(` into a `.otf` file — don't paste the
base64 directly into `styles.css`, that bloats every page load with a
~37KB inline string; a real file at `WEBSITE/uic/fonts/` is cacheable and
keeps the stylesheet readable.

**Color:** all colors run through `:root` custom properties at the top of
the file — `--ink` (warm white, text/borders), `--paper` (deep purple, the
solid fill used on cards/buttons/screens — the page's ambient background
itself is a purple-to-navy gradient set directly on `body`, not this
token), `--gold-accent` (the one definitive accent — hovers, focus, price,
the progress fill, card glows, position labels), `--indigo` (atmospheric-
only depth in the star-field, never a UI color), `--grey`.
`--violet`, `--blue`, `--red`, and `--gold` all still exist purely as
aliases chaining back to `--gold-accent` (`--violet`/`--blue` point at
`--gold-accent` directly; `--red`/`--gold` point at those) — this is the
second palette pivot, and rather than rewrite the ~40 rules referencing
`var(--red)`/`var(--gold)` again, the alias chain just got re-pointed. If
you're adding a *new* rule, reach for `--gold-accent` directly rather than
any of the legacy names. Two colors are intentionally **not** tied to any
of this: `--card-face-bg` / `--card-face-ink` keep the revealed tarot-card
face light/cream regardless of the page theme (a card should read as an
object catching light against the dark page, not a page-colored panel),
and the card *backs* are hardcoded near-black so they hold their "mystery"
look even against a dark page. If you ever want to go back to a light
theme, swap the `:root` values — everything else in the file references
those variables — but re-check `.uic-card-back` / `.uic-card-face` first,
since those two are deliberately theme-independent.

**Persistent brand header:** a thin sticky strip reading "Manifest With
Jac" (`renderBrandHeader()` in `app.js`, `.uic-brand-header` in
`styles.css`) sits above everything, on every screen — not just a footer
credit. It's always the first thing written into `#uic-root`, with the
progress bar (when present) sticking directly beneath it via
`--brand-header-h`; change that one variable if you resize the header and
the progress bar will follow without extra edits.

**Sizing:** headline `clamp()` sizes, body text, button padding, and
tap-target sizing have been trimmed down twice now from the original
build — it kept reading oversized on an actual iPhone screen. If you add a
new full-bleed headline or body element, look at a sibling's current
values (e.g. `.uic-question-prompt`, `.uic-option`) rather than reaching
for the original build's sizes.

**Weight:** nothing in the flow goes above `font-weight: 500` anymore —
an earlier pass leaned on 600/700 everywhere (headlines, buttons, answer
boxes, even body copy), which read as aggressive/shouty regardless of
casing. Most body text and UI labels now sit at 400 (true "regular");
headlines and anything that needs a touch more presence sit at 500. If you
add a new element, start at 400 and only go to 500 if it's genuinely not
legible enough — never reach for 600+.

**Sparkle on answer.** Tapping an answer box spawns a brief burst of tiny
gold sparkles (`spawnSparkles()` in `app.js`, `.uic-sparkle` in
`styles.css`) — a small 4-point "twinkle" shape, not a cartoon 5-point
star, deliberately subtle. They're appended straight to `<body>` (not
`#uic-root`) with `position: fixed` coordinates taken from the clicked
box's own bounding rect, specifically so they survive the re-render that
immediately follows an answer click and finish their ~600ms animation
before self-removing. Skipped entirely under `prefers-reduced-motion`.

**Shape language.** Two radius tokens: `--radius` (22px, used on cards,
inputs, the transcript box, the symbol grid) and `--radius-pill` (999px,
used on buttons, answer rows, and the two progress bars). `--border`
dropped from 3px to 1.5px and most bordered boxes (`.uic-card`,
`.uic-option`, `.uic-btn--ghost`) now use a soft `box-shadow` instead of a
visible border for definition — a transparent border is kept in the rule
(not removed) specifically so the `--selected`/hover states that DO set a
visible border-color don't cause a layout jump. The old hover pattern
(`transform: translate(-Npx,-Npx)` + a hard offset `box-shadow`, borrowed
from `shop.html`) is gone site-wide, replaced by a small `translateY(-2px)`
lift plus a softer shadow. If you add a new bordered/boxed element, start
from `.uic-option` or `.uic-card` as the reference, not an older screenshot
of this file's history.

**Layered contrast (dark → light panel → dark controls).** The very first
pass at this rounded system used one flat mid-tone (`--grey-light`) for
both the containing panels AND the controls inside them, which read as
flat/no depth. Fixed by adding `--panel` (a distinctly lighter violet,
`#4C3F77`) for containers — `.uic-question-card` (wraps the prompt +
answer list) and `.uic-gate-card` (wraps the email form) now have their
own visible panel background for the first time; they used to be
transparent, sitting directly on the page gradient. `.uic-card` (the
reveal panels) switched from `--grey-light` to `--panel` too. Meanwhile
`.uic-option`, `.uic-input`, and `.uic-symbol` all switched to `--paper`
(the darkest tone, matching the page backdrop) so the interactive controls
read as dark cutouts against the lighter panel around them — dark page →
light panel → dark control is the pattern; don't flatten it back to one
tone when adding something new.
