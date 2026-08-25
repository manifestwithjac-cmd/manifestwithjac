/**
 * THE UNIVERSE IS CALLING — fixed flow copy (everything that isn't per-result).
 * Edit freely; nothing here is referenced by variable name outside app.js.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.UIC = root.UIC || {};
    Object.assign(root.UIC, factory());
  }
})(typeof self !== 'undefined' ? self : globalThis, function () {
  'use strict';

  var COPY = {
    meta: {
      siteName: 'The Universe Is Calling',
      brand: 'Manifest With Jac'
    },
    incomingCall: {
      caller: 'THE UNIVERSE',
      subline: 'incoming call',
      newMessage: 'You have 1 new message.',
      primaryCta: 'Answer the Call',
      secondaryCta: 'Not Now'
    },
    intro: {
      lines: [
        "I've been trying to reach you.",
        "Something you've been asking for wants to move.",
        "But first, I need to know what you've been asking me for."
      ],
      cta: 'Tell Me'
    },
    connecting: {
      steps: [
        'Connecting...',
        'Reading your answers...',
        'Your message is coming through...',
        'Message found.'
      ]
    },
    // Shown as brief interstitial "tidbit" moments between questions — not
    // answers, not a survey checkpoint. Just enough to make her feel like
    // something's being figured out about her as she goes. Configure which
    // question indices trigger one via TIDBIT_AFTER_QUESTION in app.js.
    // Picked deterministically (by session), so editing this list is safe.
    tidbits: [
      "Mm. I'm starting to see something.",
      "Interesting. There's a pattern forming here.",
      "Okay... I know exactly who this is for now.",
      "This is starting to make sense.",
      "I see what's actually going on here.",
      "Noted. That tells me a lot."
    ],
    emailGate: {
      eyebrow: 'Your message is ready.',
      headline: 'Where should I send it?',
      firstNamePlaceholder: 'First name',
      emailPlaceholder: 'Email address',
      consentLabel: 'Send me updates from Manifest With Jac. Unsubscribe anytime.',
      primaryCta: 'Send My Message',
      submittingCta: 'Sending...',
      privacyNote: 'No spam. No account. Just your message.',
      errorGeneric: "That didn't go through. Try again in a second.",
      errorEmail: 'That email doesn’t look right — mind double-checking it?',
      errorName: 'What should I call you?'
    },
    sent: {
      headline: 'Message Sent',
      sub: 'Connecting you now...'
    },
    reveal: {
      greetingTemplate: '{{firstName}}...',
      knowWhy: "I know why I'm calling you.",
      manifestingEyebrow: "WHAT'S TRYING TO MANIFEST FOR YOU:",
      patternEyebrow: 'WHAT I NEED YOU TO KNOW',
      messageEyebrow: 'YOUR MESSAGE FOR TODAY',
      audioEyebrow: 'PLAY YOUR MESSAGE',
      productEyebrow: 'BEFORE I GO...',
      productSubEyebrow: 'YOUR FREQUENCY MATCH:',
      shareCta: 'Save / Share My Message',
      restartCta: 'Answer Another Call'
    },
    // Shown after the hero reveal, before the full reading — only when the
    // result has audio configured (see results.js audio.enabled). Skipped
    // entirely if there's no audio yet.
    audioGate: {
      eyebrow: 'YOUR MESSAGE IS RECORDED',
      headline: "Press play. I'll tell you the rest after.",
      note: 'Your full reading unlocks once you’ve listened.',
      continueCta: 'See My Full Reading',
      transcriptToggleOn: "Can't listen right now? Read the transcript instead.",
      transcriptToggleOff: 'Hide transcript'
    },
    // Brief ceremonial beat between the audio gate (or the hero, if there's
    // no audio) and the full reading.
    transition: {
      headline: 'Your full reading is next.',
      sub: "Here's everything I'm seeing for you.",
      cta: "Show Me"
    },
    disclaimer: "For spiritual reflection and entertainment purposes. Your result is generated from the answers you provide and is not a prediction, a guarantee, or professional advice.",
    legal: {
      privacyPolicyUrl: 'PLACEHOLDER_PRIVACY_POLICY_URL',
      termsUrl: 'PLACEHOLDER_TERMS_URL',
      disclaimerUrl: '/disclaimer',
      shopUrl: '/shop'
    },
    progress: {
      style: 'bar'
    },
    a11y: {
      audioPlay: 'Play your message',
      audioPause: 'Pause your message',
      backButton: 'Go back one question',
      closeShare: 'Close share card'
    }
  };

  return { COPY: COPY };
});
