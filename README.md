# The Universe Is Calling

A fast, interactive manifestation experience for Manifest With Jac. She
answers a few questions about what she wants, gives her first name + email
to see her result, and gets an instant personalized "message from the
universe" — a result archetype, a pattern insight, a quotable declaration,
an optional audio message, a 20-60 second interactive activation, and one
matching product recommendation. Behind the scenes she's tagged and routed
into the right Kit sequence.

Live at `/universe-is-calling` once deployed.

## Table of contents

- [Architecture](#architecture)
- [Local development](#local-development)
- [Environment variables](#environment-variables)
- [Deployment](#deployment)
- [Kit integration](#kit-integration)
- [Content editing](#content-editing)
- [Audio](#audio)
- [Analytics](#analytics)
- [Testing](#testing)
- [Failure handling](#failure-handling)
- [What's still needed from you](#whats-still-needed-from-you)

## Architecture

This repo is a static site (`WEBSITE/`) deployed on Netlify, plus a handful
of Netlify Functions (`netlify/functions/`) for anything that needs a secret
credential or server-side trust. THE UNIVERSE IS CALLING follows that exact
pattern — no framework, no build step, no new infrastructure beyond what the
site already uses (one exception: Netlify Blobs, zero-config, for a lead
log/retry queue — see [Failure handling](#failure-handling)).

```
WEBSITE/
  universe-is-calling.html       entry page
  uic/
    styles.css                    design system (cream / ink / oxblood / gold)
    app.js                        state machine + rendering, vanilla JS
    engine.js                     scoring/routing — SINGLE SOURCE OF TRUTH,
                                   loaded identically in browser and server
    analytics.js                  provider-agnostic event layer
    preview.html                  dev-only QA tool, not linked publicly
    config/
      questions.js                the 7 questions + weighted answers
      results.js                  7 result archetypes (Dimension 1)
      patterns.js                 10 secondary patterns (Dimension 2)
      products.js                 product/checkout catalog
      copy.js                     fixed flow copy (buttons, screens, etc.)
      integrations.js             Kit tag/sequence env-var mapping (no secrets)
      index.js                    Node-only aggregator (browser loads files individually)

netlify/functions/
  uic-submit.js                   the one write endpoint (validate, RECOMPUTE
                                   result server-side, sync to Kit, respond)
  uic-retry-kit.js                scheduled (every 15 min), retries failed Kit syncs
  lib/
    kit-client.js                 Kit v4 API wrapper
    leads-store.js                Netlify Blobs read/write (lead log + retry queue)
    rate-limit.js                 lightweight invisible abuse guard

tests/                            node --test suite (zero extra dependencies)
content/email-sequences/          source copy for all 21 Kit sequence emails
```

**Why one shared `engine.js`, loaded twice:** the scoring/routing logic is
written once, in a small UMD-style file, and required unmodified by both the
browser (`<script src="/uic/engine.js">`) and the Netlify function
(`require('../../WEBSITE/uic/engine.js')`). This is what makes it possible
for the server to independently re-derive the result from raw answer ids
and never trust anything the client sends — see
[Security](#security-result-integrity) below.

## Local development

No build step. To preview the static pages, serve `WEBSITE/` with any static
file server. To exercise the full flow including the Netlify Function (Kit
submission, scoring), install the Netlify CLI and run `netlify dev` from the
repo root — it serves `WEBSITE/` and `netlify/functions/` together the same
way production does.

```bash
npm install        # only needed for @netlify/blobs + running tests
npm test            # run the full test suite (no network/Netlify needed)
netlify dev          # full local site + functions (requires Netlify CLI)
```

## Environment variables

See `.env.example` — copy its values into Netlify's Site settings →
Environment variables. All the Kit tag/sequence ids are already real (they
were created directly in the live Kit account while building this — see
KIT_SETUP.md). The one value only you can provide is `KIT_API_KEY`.

## Deployment

This deploys the same way the rest of the site does — push to the connected
branch and Netlify builds it (see `netlify.toml`; Node 20). No new build
step, no new publish directory. The scheduled retry function
(`uic-retry-kit.js`) is picked up automatically by Netlify from its
`exports.config = { schedule: '*/15 * * * *' }` — nothing extra to configure
in `netlify.toml`.

## Kit integration

Full details, exact endpoints, and what's already been created for you in
your live Kit account: **[KIT_SETUP.md](./KIT_SETUP.md)**.

Short version: verified against Kit's current v4 API (not legacy
ConvertKit v3). On submit, the app upserts the subscriber, applies the
universal `UIC - Completed` tag plus one result-specific tag, sets 11 custom
fields (plus your existing UTM fields), and enrolls the subscriber directly
into the matching sequence via `POST /v4/sequences/{id}/subscribers` — no
manual "automation" wiring required in Kit's UI.

### Security: result integrity

The client never gets to declare its own result. `uic-submit.js` takes only
raw `{questionId, optionId}` pairs and re-derives the desire/pattern scores
from the canonical config in `engine.js` before ever touching Kit — a
request with a forged `result` field is simply ignored (see
`tests/uic-submit.test.js`, "a client-supplied result field is ignored").

## Content editing

Full how-to for every editable piece (questions, scoring, results, patterns,
products, prices, Kit mappings, activations, audio, copy):
**[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)**.

## Audio

The experience works with zero audio files — the "Play Your Message"
section just doesn't render until you add one. Format/bitrate/naming/wiring
instructions: **[AUDIO_ASSETS.md](./AUDIO_ASSETS.md)**.

## Analytics

`WEBSITE/uic/analytics.js` fans every funnel event out to whatever's already
on `window` — GA4 (`gtag`), Meta Pixel (`fbq`), GTM (`dataLayer`), or
Plausible — no new provider is required, and it's a no-op if none are
present. Append `?uic_debug=1` to the URL to see every event logged to the
console while testing. Full event list and properties are documented at the
top of that file.

UTM parameters (`utm_source/medium/campaign/content/term`) are captured on
load, persisted in `sessionStorage`, attached to every analytics event, and
sent to Kit as custom fields on submit (reusing your existing `utm_*` custom
fields — no duplicates created).

## Testing

`npm test` runs `tests/engine.test.js` (scoring, tie-breaking, every result
archetype's reachability, the conditional 7th question, forged-weight
rejection) and `tests/uic-submit.test.js` (input validation, honeypot, Kit
success/failure handling, forged-result rejection) — see
**[QA_MATRIX.md](./QA_MATRIX.md)** for the full result → pattern → product →
Kit-tag → Kit-sequence map and manual QA answer paths, plus the dev-only
`/uic/preview.html` tool for visually checking every result/pattern
combination without retaking the quiz 70 times.

## Failure handling

Kit being briefly unavailable never blocks the reveal — the browser always
gets its result back from `uic-submit.js` regardless of Kit's status. A
failed Kit sync is logged to Netlify Blobs (`uic-leads` store, zero
additional infra/credentials — Netlify provisions it per-site automatically)
with the full lead + answers, and `uic-retry-kit.js` retries it every 15
minutes for up to 5 attempts. Nothing is lost even if Kit is down for an
hour. Full list of handled failure states in QA_MATRIX.md.

## What's still needed from you

1. **`KIT_API_KEY`** — a V4 key from Kit → Account Settings → Developer.
   Nothing else can generate this for you.
2. **Review + publish the 21 drafted Kit sequence emails** — see
   KIT_SETUP.md step 2.
3. **The "Already Chosen" checkout URL** — that product page isn't live on
   the site yet; the Love Upgrade result and its 3 emails currently point at
   a placeholder (`products.js`, `content/email-sequences/love-upgrade.md`).
4. **`PRIVACY_POLICY_URL` / `TERMS_URL`** in `WEBSITE/uic/config/copy.js` —
   currently placeholders.
5. **ElevenLabs audio files**, whenever you're ready — see AUDIO_ASSETS.md.
   Nothing is blocked without them.
6. Optional: reconsider the **Life Upgrade** product — it currently points
   at Money Multiverse™ ($197), well above this funnel's $9-$39 impulse
   range, because it's the closest real match already on the site. Swap
   `productSlug` in `results.js` if you'd rather route to something cheaper.
