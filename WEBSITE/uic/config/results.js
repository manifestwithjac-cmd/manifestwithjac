/**
 * THE UNIVERSE IS CALLING — result archetypes (Dimension 1: what's trying to manifest).
 *
 * Add a new archetype by adding an object to RESULTS. Nothing else in the app
 * needs to change — engine.js, app.js, and the Kit integration all read this
 * list generically. See /CONTENT_GUIDE.md.
 *
 * Fields:
 *  key            - stable id. Used as the Kit tag/sequence lookup key (config/integrations
 *                    maps this key -> real Kit tag id / sequence id via env vars).
 *  desireKey      - which scored desire (see questions.js) this archetype is won by.
 *  title          - the big reveal title.
 *  manifestingNoun- short noun phrase used inside pattern-interpretation templates.
 *  redVelvetCake  - array of paragraphs. Tangible scenes, not abstractions.
 *  keyMessages    - 3-5 quotable declarations; app picks one deterministically per session.
 *  declaration    - the single screenshot-friendly "message for today" line (default pick).
 *  activation     - the ~20-60s in-browser quick win. See CONTENT_GUIDE.md #activations.
 *  productSlug    - references products.js
 *  emailSummary   - short recap paragraph reused as the seed for Kit email 1.
 *  shareCard      - { line1, line2 } for the shareable result card.
 *  audio          - { enabled, url, title, duration, transcript } — url left blank until
 *                    ElevenLabs assets are supplied. See /AUDIO_ASSETS.md.
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

  var RESULTS = [
    {
      key: 'money_surge',
      desireKey: 'money',
      identity: 'a woman for whom money is normal',
      title: 'The Money Surge',
      manifestingNoun: 'more money than the bills need',
      redVelvetCake: [
        "This isn't just enough money to cover the thing.",
        "It's money left over. Sitting there after everything is paid.",
        "Money that lets you upgrade instead of recover. Money that makes a $2,000 expense inconvenient instead of destabilizing.",
        "Money that gives your desires a vote — not just your bills."
      ],
      keyMessages: [
        "Stop asking whether more is coming. Start deciding what you'll do when it arrives.",
        "Big numbers are about to stop feeling big.",
        "You're not chasing money anymore. Money is catching up to you.",
        "The next number doesn't need to make sense on paper."
      ],
      declaration: "Stop asking whether more is coming. Start deciding what you'll do when it arrives.",
      activation: {
        prompt1: 'Pick the amount that would feel ridiculously satisfying to receive next.',
        options1: [
          { id: 'k1', label: '$1,000' },
          { id: 'k5', label: '$5,000' },
          { id: 'k10', label: '$10,000' },
          { id: 'k25', label: '$25,000' },
          { id: 'k50', label: '$50,000+' },
          { id: 'own', label: 'My own number', freeText: true }
        ],
        transition: 'See that amount already sitting there. Now that you have it — what feels different first?',
        prompt2: 'What feels different first?',
        options2: [
          { id: 'exhale', label: 'I exhale.' },
          { id: 'pay', label: 'I pay everything.' },
          { id: 'book', label: 'I book the thing.' },
          { id: 'save', label: 'I save a huge chunk.' },
          { id: 'stop-checking', label: 'I stop checking.' },
          { id: 'options', label: 'I realize I have options.' }
        ],
        closing: 'More is normal here. You do not need your current numbers to approve what happens next.'
      },
      productSlug: 'wealthy_af',
      emailSummary: "The universe's message for you was THE MONEY SURGE — not survival money, overflow money. Money that gives your desires a vote instead of just your bills.",
      shareCard: { line1: 'MY MESSAGE:', line2: 'THE MONEY SURGE' },
      audio: { enabled: false, url: '', title: 'Your Money Surge Message', duration: '', transcript: '' }
    },
    {
      key: 'sold_out_era',
      desireKey: 'business',
      identity: 'a sold-out entrepreneur',
      title: 'The Sold-Out Era',
      manifestingNoun: 'a business that sells without you forcing it',
      redVelvetCake: [
        "This isn't one good launch. It's a calendar you have to defend.",
        "DMs that say 'I need this now' before you've even pitched it. A cart that closes itself.",
        "Clients who pay the number on the page. No haggling, no chasing, no convincing.",
        "Your business starts running on demand instead of your energy."
      ],
      keyMessages: [
        "You stop assuming every sale has to be chased down personally.",
        "Demand isn't something you manufacture. It's something you let land.",
        "The version of you that's sold out isn't working harder. She's just done apologizing for the price.",
        "You're not behind. You're about to be busy in a completely different way."
      ],
      declaration: "Demand isn't something you manufacture. It's something you let land.",
      activation: {
        prompt1: "Which notification are we normalizing?",
        options1: [
          { id: 'orders5', label: '5 new orders' },
          { id: 'clients10', label: '10 new clients' },
          { id: 'sold-out', label: 'Sold out' },
          { id: 'booked', label: 'Fully booked' },
          { id: 'day10k', label: '$10K sales day' },
          { id: 'own', label: 'Custom', freeText: true }
        ],
        transition: 'See it hit your phone. That notification is now normal for you.',
        prompt2: 'What do you do first?',
        options2: [
          { id: 'exhale', label: 'I exhale.' },
          { id: 'raise', label: 'I raise my prices.' },
          { id: 'hire', label: 'I hire the help.' },
          { id: 'unbothered', label: "I stop checking the numbers so much." },
          { id: 'plan', label: 'I plan what I do with it.' },
          { id: 'shrug', label: 'I barely react anymore.' }
        ],
        closing: "Being sold out is allowed to be normal. You don't have to earn every yes twice."
      },
      productSlug: 'sold_out_frequency',
      emailSummary: "The universe's message for you was THE SOLD-OUT ERA — a business that sells without you forcing every single yes out of it.",
      shareCard: { line1: 'MY MESSAGE:', line2: 'THE SOLD-OUT ERA' },
      audio: { enabled: false, url: '', title: 'Your Sold-Out Era Message', duration: '', transcript: '' }
    },
    {
      key: 'glow_up',
      desireKey: 'beauty',
      identity: 'a goddess',
      title: 'The Glow-Up',
      manifestingNoun: 'noticeably, undeniably different',
      redVelvetCake: [
        "Not a filter. Not a good-lighting day. An actual difference people ask you about.",
        "Catching your reflection and doing a double take, on a random Tuesday, no event to get ready for.",
        "Old photos that suddenly look like a different person wore your face.",
        "Getting dressed becomes fun again, because the mirror agrees with you now."
      ],
      keyMessages: [
        "You stop negotiating with the mirror.",
        "This isn't about fixing something. It's about finally matching what's underneath.",
        "People are about to ask what you did differently. You're allowed to just say 'I decided.'",
        "The upgrade isn't coming from more effort. It's coming from less resistance."
      ],
      declaration: "You stop negotiating with the mirror.",
      activation: {
        prompt1: 'What do people notice first?',
        options1: [
          { id: 'skin', label: 'Skin' },
          { id: 'hair', label: 'Hair' },
          { id: 'style', label: 'Style' },
          { id: 'confidence', label: 'Body confidence' },
          { id: 'presence', label: 'Presence' },
          { id: 'everything', label: 'Everything' }
        ],
        transition: "See it landing. Someone just noticed, out loud.",
        prompt2: 'What do you do with the compliment?',
        options2: [
          { id: 'take-it', label: 'I actually take it.' },
          { id: 'smile', label: 'I just smile and keep walking.' },
          { id: 'agree', label: 'I quietly agree.' },
          { id: 'no-deflect', label: "I don't deflect it for once." },
          { id: 'already-knew', label: 'I already knew.' }
        ],
        closing: "You were never trying to become someone else. You were clearing the way to look like you already feel."
      },
      productSlug: 'goddess_frequency',
      emailSummary: "The universe's message for you was THE GLOW-UP — the version of you that's noticeably, undeniably different. No filter required.",
      shareCard: { line1: 'MY MESSAGE:', line2: 'THE GLOW-UP' },
      audio: { enabled: false, url: '', title: 'Your Glow-Up Message', duration: '', transcript: '' }
    },
    {
      key: 'magnetic_era',
      desireKey: 'magnetism',
      identity: 'the most magnetic person in the room',
      title: 'The Magnetic Era',
      manifestingNoun: 'unforgettable without trying',
      redVelvetCake: [
        "People notice you before you say a word.",
        "You walk into a room and something in the air shifts — not louder, just impossible to skip over.",
        "You stop being the one doing the remembering. People remember you first.",
        "You get chosen before you campaign for it."
      ],
      keyMessages: [
        "People notice you before you say a word.",
        "You stop shrinking so someone else feels comfortable.",
        "Magnetic isn't loud. It's undeniable.",
        "You were never invisible. You were just politely dimming the light."
      ],
      declaration: "You stop shrinking so someone else feels comfortable.",
      activation: {
        prompt1: 'Where do you feel it landing first?',
        options1: [
          { id: 'room', label: 'A room going quiet when I walk in' },
          { id: 'remembered', label: 'Being remembered after one meeting' },
          { id: 'chosen', label: 'Being chosen without asking' },
          { id: 'followed', label: 'People wanting to stay near me' },
          { id: 'noticed', label: 'Just... being noticed' }
        ],
        transition: 'Feel that land. You did not perform for it.',
        prompt2: "What's different about how you take up space now?",
        options2: [
          { id: 'no-shrink', label: 'I stop shrinking.' },
          { id: 'no-apologize', label: 'I stop apologizing for being a lot.' },
          { id: 'eye-contact', label: 'I hold eye contact.' },
          { id: 'own-pace', label: 'I stop rushing myself.' },
          { id: 'still-magnetic', label: 'I stay quiet — and it still works.' }
        ],
        closing: "You don't need to get louder. You need to stop apologizing for the space you already take up."
      },
      productSlug: 'goddess_frequency',
      emailSummary: "The universe's message for you was THE MAGNETIC ERA — people notice you before you say a word, and you stop performing for it.",
      shareCard: { line1: 'MY MESSAGE:', line2: 'THE MAGNETIC ERA' },
      audio: { enabled: false, url: '', title: 'Your Magnetic Era Message', duration: '', transcript: '' }
    },
    {
      key: 'love_upgrade',
      desireKey: 'love',
      identity: 'a deeply adored woman',
      title: 'The Love Upgrade',
      manifestingNoun: 'chosen without chasing',
      redVelvetCake: [
        "Not almost. Not 'it's complicated.' Chosen, clearly, out loud.",
        "Someone who shows up the same way on a random Tuesday as they did in the beginning.",
        "You stop rehearsing what to text back. You just get to feel it.",
        "Love that doesn't require you to shrink, chase, or interpret mixed signals for clues."
      ],
      keyMessages: [
        "You stop performing for people who haven't chosen you yet.",
        "The right person doesn't need to be convinced.",
        "You're allowed to be loved the easy way.",
        "Devotion isn't something you have to earn twice."
      ],
      declaration: "You stop performing for people who haven't chosen you yet.",
      activation: {
        prompt1: 'What would feel like the clearest sign you\'re chosen?',
        options1: [
          { id: 'consistency', label: 'They show up consistently' },
          { id: 'initiate', label: 'They reach out first' },
          { id: 'plans', label: 'They make real plans with me' },
          { id: 'safe', label: 'I feel safe enough to be honest' },
          { id: 'no-games', label: 'No more mixed signals' }
        ],
        transition: 'Feel that certainty settle. No guessing required.',
        prompt2: 'What do you stop doing once you feel chosen?',
        options2: [
          { id: 'no-chase', label: 'I stop chasing.' },
          { id: 'no-overthink', label: 'I stop overthinking every text.' },
          { id: 'no-perform', label: 'I stop performing for approval.' },
          { id: 'receive', label: 'I let myself be loved on, plainly.' }
        ],
        closing: "You were never too much. You were just aimed at someone who hadn't caught up yet."
      },
      productSlug: 'already_chosen',
      emailSummary: "The universe's message for you was THE LOVE UPGRADE — chosen clearly, without chasing, without performing for it.",
      shareCard: { line1: 'MY MESSAGE:', line2: 'THE LOVE UPGRADE' },
      audio: { enabled: false, url: '', title: 'Your Love Upgrade Message', duration: '', transcript: '' }
    },
    {
      key: 'luck_streak',
      desireKey: 'luck',
      identity: 'a lucky woman',
      title: 'The Luck Streak',
      manifestingNoun: 'timing that works in your favor',
      redVelvetCake: [
        "The green light you didn't plan for. The refund you forgot you were owed. The upgrade nobody asked for.",
        "An opportunity that lands in your inbox before you go looking for it.",
        "You stop needing to force outcomes, because the timing starts doing the work for you.",
        "Things just... work out. Repeatedly. Almost annoyingly so."
      ],
      keyMessages: [
        "You stop needing to force the timing.",
        "Luck isn't random for you right now. It's a pattern about to repeat.",
        "You're not due for a win. You're due for a streak.",
        "The universe is done making you wait for the punchline."
      ],
      declaration: "You stop needing to force the timing.",
      activation: {
        prompt1: 'What would feel hilariously lucky right now?',
        options1: [
          { id: 'upgrade', label: 'An upgrade' },
          { id: 'refund', label: 'A refund' },
          { id: 'opportunity', label: 'An opportunity' },
          { id: 'invite', label: 'An invitation' },
          { id: 'timing', label: 'Perfect timing' },
          { id: 'money', label: 'Unexpected money' }
        ],
        transition: 'Let that land. This is just what your life does now.',
        prompt2: 'How do you react when it happens?',
        options2: [
          { id: 'laugh', label: 'I laugh out loud.' },
          { id: 'expect', label: "I'm not even that surprised anymore." },
          { id: 'thank', label: 'I say thank you and keep moving.' },
          { id: 'screenshot', label: 'I screenshot it.' }
        ],
        closing: "You don't have to chase the win. You just have to stop being surprised when it shows up."
      },
      productSlug: 'timeline_jump',
      emailSummary: "The universe's message for you was THE LUCK STREAK — timing that starts working in your favor, repeatedly.",
      shareCard: { line1: 'MY MESSAGE:', line2: 'THE LUCK STREAK' },
      audio: { enabled: false, url: '', title: 'Your Luck Streak Message', duration: '', transcript: '' }
    },
    {
      key: 'life_upgrade',
      desireKey: 'lifestyle',
      identity: 'a luxury woman',
      title: 'The Life Upgrade',
      manifestingNoun: 'a life that feels expensive in the best way',
      redVelvetCake: [
        "Not a bigger to-do list. A completely different Tuesday.",
        "The trip you book without a spreadsheet. The apartment with the view. The upgrade you don't have to justify.",
        "Your life stops looking like something you're recovering from and starts looking like something you chose.",
        "Ease becomes the default setting, not the vacation from it."
      ],
      keyMessages: [
        "Your life is allowed to feel expensive in the best way.",
        "This isn't about doing more. It's about finally living the version you keep postponing.",
        "You don't need a reason to upgrade. Wanting it is the reason.",
        "You're not starting over. You're finally furnishing the life you already decided on."
      ],
      declaration: "Your life is allowed to feel expensive in the best way.",
      activation: {
        prompt1: 'What gets upgraded first?',
        options1: [
          { id: 'home', label: 'Where I live' },
          { id: 'travel', label: 'How I travel' },
          { id: 'time', label: 'How I spend my time' },
          { id: 'wardrobe', label: 'What I wear' },
          { id: 'calendar', label: 'What ends up on my calendar' },
          { id: 'everything', label: 'All of it' }
        ],
        transition: 'See that version of your Tuesday. Feel how normal it is.',
        prompt2: 'What do you stop doing once this is just your life?',
        options2: [
          { id: 'no-justify', label: 'I stop justifying it.' },
          { id: 'no-wait', label: 'I stop waiting for a special occasion.' },
          { id: 'no-compare', label: 'I stop comparing it to before.' },
          { id: 'enjoy', label: 'I just enjoy it.' }
        ],
        closing: "You're not asking for too much. You're just finally imagining accurately."
      },
      productSlug: 'money_multiverse',
      emailSummary: "The universe's message for you was THE LIFE UPGRADE — a completely different Tuesday, where ease is the default instead of the vacation from it.",
      shareCard: { line1: 'MY MESSAGE:', line2: 'THE LIFE UPGRADE' },
      audio: { enabled: false, url: '', title: 'Your Life Upgrade Message', duration: '', transcript: '' }
    }
  ];

  return { RESULTS: RESULTS };
});
