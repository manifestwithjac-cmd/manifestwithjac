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
      activationIntro: "Before we go further, I need you to do one thing.",
      productEyebrow: 'BEFORE I GO...',
      productSubEyebrow: 'YOUR FREQUENCY MATCH:',
      shareCta: 'Save / Share My Message',
      restartCta: 'Answer Another Call'
    },
    disclaimer: "For spiritual reflection and entertainment purposes. Your result is generated from the answers you provide and is not a prediction, a guarantee, or professional advice.",
    legal: {
      privacyPolicyUrl: 'PLACEHOLDER_PRIVACY_POLICY_URL',
      termsUrl: 'PLACEHOLDER_TERMS_URL'
    },
    progress: {
      style: 'dots'
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
