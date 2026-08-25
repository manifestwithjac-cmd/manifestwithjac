# Audio Assets — THE UNIVERSE IS CALLING

The experience works completely without audio — the "PLAY YOUR MESSAGE"
section simply doesn't render until you add a file (see `renderAudioSection`
in `WEBSITE/uic/app.js`). This is the guide for when you're ready to add
ElevenLabs-generated messages.

## What to generate

One audio message per result archetype is the V1 target (7 total). You can
later create pattern-specific variants (up to 70 result × pattern combos) —
the config already supports it, see "Wiring it up" below.

**Suggested duration:** 45–90 seconds per message.
**Script source:** Use `redVelvetCake` + `declaration` from
`WEBSITE/uic/config/results.js` as your starting script for each result — it's
already written in Jac's voice and sized about right for 45-90s spoken.

## Recommended export settings

- **Format:** MP3
- **Bitrate:** 128 kbps (good quality, small enough for mobile — this plays
  on paid social traffic, keep it light)
- **Sample rate:** 44.1 kHz
- **Loudness:** normalize to around -16 LUFS so all 7 messages feel
  consistent in volume next to each other

## Naming convention

```
/WEBSITE/uic/audio/{result-key}.mp3
/WEBSITE/uic/audio/{result-key}--{pattern-key}.mp3   (optional, future)
```

Example: `/WEBSITE/uic/audio/money-surge.mp3`,
or later `/WEBSITE/uic/audio/money-surge--checking.mp3`.

## Where files live

Drop the finished MP3s straight into `WEBSITE/uic/audio/` (create the folder)
— Netlify serves anything under `WEBSITE/` as a static asset automatically,
no config needed. If you'd rather host audio elsewhere (S3, a CDN, Fillout,
etc.) that's fine too — the config just needs a URL, it doesn't have to be
local.

## Wiring it up

Each result in `WEBSITE/uic/config/results.js` has an `audio` object:

```js
audio: {
  enabled: false,          // flip to true once the file exists
  url: '',                 // '/uic/audio/money-surge.mp3' or a full https URL
  title: 'Your Money Surge Message',
  duration: '',            // '1:12' — shown next to the progress bar
  transcript: ''           // optional, for accessibility / future use
}
```

Set `enabled: true` and fill in `url` + `duration` — that's it, the custom
audio player (play/pause/progress/time, in `app.js`'s `renderAudioSection` /
`toggleAudio`) picks it up automatically. Leave `enabled: false` on any
result you haven't recorded yet; that section just stays hidden for that
result only, nothing else breaks.

## Future: per-pattern audio

The `audio` field currently lives on each RESULT (7 files). If you want
result+pattern-specific audio later (up to 70 files, `redVelvetCake` +
pattern-aware script), the cleanest path is: add an `audioByPattern: { checking:
{...}, doubting: {...}, ... }` map alongside the existing `audio` field on
each result, and have `engine.js`'s `resolveResult()` prefer
`audioByPattern[patternKey]` when present, falling back to `audio`. That's a
small, additive change — nothing else in the app needs to know about it.

## Future: live ElevenLabs generation (not built in V1, on purpose)

MASTER BRIEF explicitly asks V1 to NOT depend on live audio generation. If
you want to explore dynamic "Sarah, I know why I'm calling you..." audio
later, the natural integration point is `netlify/functions/uic-submit.js`:
after the result is computed and before the response is sent, you could call
ElevenLabs' API with the personalized script and return a signed URL. Keep
it behind a feature flag (an env var like `ELEVENLABS_ENABLED=true`), keep a
deterministic pre-recorded fallback (this file's config) for when it's off
or the API call fails, and never let that call block or fail the funnel —
same failure-handling pattern already used for Kit.
