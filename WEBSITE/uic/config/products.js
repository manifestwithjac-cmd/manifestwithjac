/**
 * THE UNIVERSE IS CALLING — product / "frequency match" catalog.
 *
 * Single source of truth for product info shown after the result reveal.
 * Wired to real, already-live Manifest With Jac sales pages where a good
 * match exists in the current shop. Anything marked PLACEHOLDER needs a
 * real checkoutUrl from you before launch — see README "What I still need."
 *
 * A result links to a product via RESULTS[i].productSlug -> PRODUCTS[slug].
 * To swap what a result recommends, change productSlug in results.js — you
 * do not need to touch this file. To change a price/URL/image, edit here only.
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

  var PRODUCTS = {
    wealthy_af: {
      title: 'Wealthy As F*ck™ Stack',
      pitchIntro: "Based on your answers, I wouldn't give you another exercise about trying harder to manifest money. I'd normalize more.",
      description: "The subliminal + rampage stack that makes bigger numbers feel normal — while your financial timelines quietly rearrange in your favor.",
      price: '$47',
      image: '/wealthy-af-cover.jpg',
      checkoutUrl: '/wealthy-as-fuck',
      cta: 'Tune In',
      placeholder: false
    },
    sold_out_frequency: {
      title: 'Sold Out Frequency',
      pitchIntro: "Based on your answers, you don't need another strategy call. You need your business to stop requiring so much convincing.",
      description: "Seven audios built to install a business that sells out on its own — so demand stops depending on how hard you push that day.",
      price: '$67',
      image: '/sold-out-frequency-cover.jpg',
      checkoutUrl: '/sold-out-frequency',
      cta: 'Tune In',
      placeholder: false
    },
    goddess_frequency: {
      title: 'Goddess Frequency',
      pitchIntro: "Based on your answers, this isn't about doing more to your face or your body. It's about creation on command.",
      description: "Six audios to embody her and create on command — the version of you people notice before you say a word. Lifetime access, yours to keep.",
      price: '$67',
      image: '/goddess-frequency-cover.jpg',
      checkoutUrl: '/goddess-frequency',
      cta: 'Tune In',
      placeholder: false
    },
    already_chosen: {
      title: 'Already Chosen',
      pitchIntro: "Based on your answers, I wouldn't give you a script to send them. I'd help you stop chasing a yes that should already be obvious.",
      description: "A specific-person ritual built to make them feel it — without you performing, chasing, or over-explaining what you want.",
      price: '$17',
      image: '/already-chosen-cover.jpg',
      // PLACEHOLDER: "Already Chosen" doesn't have a live sales/checkout page yet
      // (confirmed against the current site — it only exists as a shop teaser).
      // Replace with the real URL once the page exists, e.g. "/already-chosen".
      checkoutUrl: 'PLACEHOLDER_ALREADY_CHOSEN_CHECKOUT_URL',
      cta: 'Tune In',
      placeholder: true
    },
    timeline_jump: {
      title: 'Timeline Jump Sleep Portal™',
      pitchIntro: "Based on your answers, you don't need to force the next opportunity. You need to fall asleep in a different timeline.",
      description: "Press play before bed. The overnight subconscious audio built to shift your timing while you sleep — no willpower required.",
      price: '$19',
      image: '/timeline-jump-hero.webp',
      checkoutUrl: '/timeline-jump',
      cta: 'Tune In',
      placeholder: false
    },
    money_multiverse: {
      title: 'Money Multiverse™',
      pitchIntro: "Based on your answers, this isn't about squeezing more out of the life you have. It's about rewiring which life you're standing in.",
      description: "The energy-healing audio rewire across four portals that turns you into the version of you money — and ease — is magnetically drawn to.",
      price: '$197',
      image: '/money-multiverse-mockup.png',
      checkoutUrl: '/Money-multiverse',
      cta: 'Tune In',
      // Note: priced above the typical $9-$39 impulse range this brief targets.
      // It's the closest real match on the current site for a full "life upgrade."
      // If you'd rather route this result to a lower-ticket impulse buy, swap
      // productSlug on the life_upgrade result in results.js, or edit this
      // object's price/checkoutUrl to point at a new $9-$39 product.
      placeholder: false
    }
  };

  return { PRODUCTS: PRODUCTS };
});
