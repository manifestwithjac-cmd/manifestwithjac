# Kit Setup — THE UNIVERSE IS CALLING

This documents exactly what's already been created in your live Kit account,
what the app does with it, and the one thing you still need to provide.

Verified against Kit's current (v4) developer documentation — this is **not**
the old ConvertKit v3 API. Base URL `https://api.kit.com/v4`, authenticated
with an `X-Kit-Api-Key` header (a V4 API key, created under **Account
Settings → Developer**). V3 API keys/secrets do not work here.

## What's already been created for you

While building this, the following were created directly in your Kit account
via the Kit API (no manual setup needed for these):

**Tags** (8):
`UIC - Completed`, `UIC - Money Surge`, `UIC - Sold Out Era`, `UIC - Glow Up`,
`UIC - Magnetic Era`, `UIC - Love Upgrade`, `UIC - Luck Streak`, `UIC - Life Upgrade`

**Custom fields** (11):
`UIC Result`, `UIC Primary Desire`, `UIC Secondary Desire`, `UIC Pattern`,
`UIC Desired Identity`, `UIC Frequency Match`, `UIC Recommended Product`,
`UIC Message Summary`, `UIC Entry Source`, `UIC Campaign`, `UIC Completed At`

The app also reuses your **existing** `utm_source` / `utm_medium` /
`utm_campaign` / `utm_content` / `utm_term` custom fields — it did not
duplicate them.

**Sequences** (7, currently empty — see "What you still need to do" below):
`Universe Is Calling - Money Surge`, `- Sold Out Era`, `- Glow Up`,
`- Magnetic Era`, `- Love Upgrade`, `- Luck Streak`, `- Life Upgrade`

The real ids for all of the above are already filled into `.env.example` —
copy them into your Netlify site's environment variables as-is.

## How the routing actually works (no visual automation needed)

Kit's public API has no endpoint to create or wire a visual "automation"
(the tag → sequence canvas in the Kit UI) — that part of the product simply
isn't exposed via API. Rather than asking you to hand-build 7 automations,
the app routes around it: **`POST /v4/sequences/{id}/subscribers` enrolls a
subscriber into a sequence directly, by email, with no automation required.**

So on every submission, `netlify/functions/uic-submit.js` does four Kit API
calls in order:
1. `POST /v4/subscribers` — upserts the subscriber, sets `first_name` and all
   the custom fields above (including UTM passthrough).
2. `POST /v4/tags/{UIC_COMPLETED}/subscribers` — universal completion tag.
3. `POST /v4/tags/{result_tag}/subscribers` — the one result-specific tag
   (e.g. `UIC - Money Surge`).
4. `POST /v4/sequences/{result_sequence}/subscribers` — enrolls her directly
   into the matching sequence.

The tags still exist for a reason: they're what you'll use in Kit to segment,
filter, or build broadcasts/reports later ("everyone tagged Money Surge who
hasn't bought yet," etc). They're not what triggers the sequence — the direct
API call is.

## What you still need to do

**1. Provide `KIT_API_KEY`.** This is the only credential nobody but you can
   generate: Kit → Account Settings → Developer → API Keys → New API Key.
   Paste it into Netlify's environment variables (see `.env.example`).

**2. Review and publish the sequence emails.** The Kit API *can* create
   sequence emails as drafts (`create_sequence_email`), so all 3 emails for
   all 7 sequences (21 total) were pre-drafted for you directly in Kit while
   building this — open each sequence in Kit and you'll find them waiting as
   **unpublished drafts**, correctly spaced (immediate / +1 day / +2 days).
   Review the copy, adjust anything in Jac's voice that needs a personal
   touch, and hit **Publish** on each — a draft sequence email never sends.
   One exception: the 3 "Love Upgrade" emails link to
   `/already-chosen`, which isn't a live page yet (see products.js) — update
   that link before publishing those three. The full source copy for all 7
   sequences also lives in `/content/email-sequences/` in this repo if you
   ever need to regenerate or edit in bulk.

**3. Set `PRIVACY_POLICY_URL` / `TERMS_URL`.** `WEBSITE/uic/config/copy.js`
   has `PLACEHOLDER_PRIVACY_POLICY_URL` / `PLACEHOLDER_TERMS_URL` — swap in
   your real URLs (or leave blank to hide the links; see CONTENT_GUIDE.md).

## How to test the integration end-to-end

1. Set `KIT_API_KEY` (and the tag/sequence ids from `.env.example`) in
   Netlify's environment variables, then deploy (or `netlify dev` locally).
2. Visit `/universe-is-calling`, answer the call, complete the quiz with a
   test email you can check, and submit.
3. The result should reveal in-browser **immediately** — it never waits on
   Kit. Kit sync happens in the background of that same request.
4. In Kit, search Subscribers for your test email. Confirm: `UIC - Completed`
   tag applied, the one matching result tag applied, all `UIC *` custom
   fields populated, and the subscriber shows as enrolled in the matching
   `Universe Is Calling - *` sequence.
5. To test the **retry path**: temporarily set `KIT_API_KEY` to garbage,
   submit once (you'll see the browser still reveals the result normally —
   check the Netlify function logs for `kitStatus: "failed"`), then restore
   the real key. Within 15 minutes the scheduled `uic-retry-kit` function
   retries it automatically; you can also trigger it manually via Netlify's
   "Trigger function" UI on `uic-retry-kit` to test immediately.
6. To QA all 7 results (and all 10 patterns) without repeatedly taking the
   quiz, use the dev-only preview at `/uic/preview.html` — see QA_MATRIX.md.
   It never calls Kit.

## Reused vs. new

Nothing about your existing forms, tags, sequences, or subscribers was
touched or modified. Everything above is additive and prefixed `UIC` /
`Universe Is Calling -` so it's easy to find and easy to delete if you ever
want to tear this experience down.
