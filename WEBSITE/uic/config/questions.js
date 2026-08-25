/**
 * THE UNIVERSE IS CALLING — question bank.
 *
 * Edit this file to change questions, answers, or scoring weights.
 * See /CONTENT_GUIDE.md for the full how-to.
 *
 * Each question:
 *   id        - stable string id, never reuse/rename once live (analytics keys off it)
 *   type      - 'select' | 'image-select'
 *   decisive  - true = this question's weights count double when breaking a scoring tie
 *   prompt    - the line shown on screen (can be a function(answersSoFar) for conditional copy)
 *   options   - array of { id, label, weights, image? }
 *               weights.desire   -> nudges DIMENSION 1 (what's trying to manifest)
 *               weights.pattern  -> nudges DIMENSION 2 (what she needs to hear)
 *
 * Desire keys (7, one per result archetype): money, business, beauty, magnetism, love, luck, lifestyle
 * Pattern keys (10): chasing, checking, doubting, switching, settling, holding, visibility, waiting, forcing, receiving
 *
 * Question 7 demonstrates conditional branching: its options change based on
 * whichever desire is currently leading after questions 1-6. This is a config
 * pattern, not special-cased app logic — see engine.js `resolveOptions()`.
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

  var Q7_BY_DESIRE = {
    money: [
      { id: 'q7-money-1', label: 'A number in my account that surprises me', weights: { pattern: { checking: 2 } } },
      { id: 'q7-money-2', label: "Money left over after everything's paid", weights: { pattern: { receiving: 2 } } },
      { id: 'q7-money-3', label: 'Buying something without checking the price first', weights: { pattern: { receiving: 2, holding: 1 } } },
      { id: 'q7-money-4', label: 'Someone paying me before I even ask', weights: { pattern: { checking: 1, forcing: 1 } } }
    ],
    business: [
      { id: 'q7-biz-1', label: "My phone won't stop buzzing with orders", weights: { pattern: { checking: 2 } } },
      { id: 'q7-biz-2', label: '"I need this now" in my DMs', weights: { pattern: { receiving: 2 } } },
      { id: 'q7-biz-3', label: 'A fully sold-out cart', weights: { pattern: { forcing: 1, checking: 1 } } },
      { id: 'q7-biz-4', label: 'Someone paying full price without blinking', weights: { pattern: { receiving: 2, holding: 1 } } }
    ],
    beauty: [
      { id: 'q7-beauty-1', label: 'Catching myself in a mirror and doing a double take', weights: { pattern: { checking: 1, receiving: 1 } } },
      { id: 'q7-beauty-2', label: 'A room shifting when I walk in', weights: { pattern: { receiving: 2 } } },
      { id: 'q7-beauty-3', label: 'Someone staring a beat too long', weights: { pattern: { visibility: 1, receiving: 1 } } },
      { id: 'q7-beauty-4', label: "Compliments I didn't fish for", weights: { pattern: { receiving: 2, holding: 1 } } }
    ],
    magnetism: [
      { id: 'q7-mag-1', label: 'Walking in and feeling the room notice', weights: { pattern: { visibility: 1, receiving: 1 } } },
      { id: 'q7-mag-2', label: "People remembering me after one conversation", weights: { pattern: { receiving: 2 } } },
      { id: 'q7-mag-3', label: "Not shrinking so someone else feels comfortable", weights: { pattern: { visibility: 2 } } },
      { id: 'q7-mag-4', label: 'Being chosen without performing for it', weights: { pattern: { receiving: 2, holding: 1 } } }
    ],
    love: [
      { id: 'q7-love-1', label: "A text I've been waiting for", weights: { pattern: { checking: 2 } } },
      { id: 'q7-love-2', label: 'Being chosen without chasing', weights: { pattern: { chasing: 1, receiving: 2 } } },
      { id: 'q7-love-3', label: 'Someone showing up consistently, no games', weights: { pattern: { receiving: 1, holding: 1 } } },
      { id: 'q7-love-4', label: 'Feeling safe enough to stop performing', weights: { pattern: { receiving: 2, holding: 1 } } }
    ],
    luck: [
      { id: 'q7-luck-1', label: 'Something working out with zero effort', weights: { pattern: { forcing: 1, receiving: 1 } } },
      { id: 'q7-luck-2', label: 'Perfect timing that felt engineered for me', weights: { pattern: { receiving: 2 } } },
      { id: 'q7-luck-3', label: 'An opportunity landing in my lap, unasked', weights: { pattern: { chasing: 1, receiving: 1 } } },
      { id: 'q7-luck-4', label: "A yes I didn't see coming", weights: { pattern: { receiving: 2, holding: 1 } } }
    ],
    lifestyle: [
      { id: 'q7-life-1', label: 'Booking something without checking my bank app first', weights: { pattern: { checking: 2 } } },
      { id: 'q7-life-2', label: 'A calendar full of things I actually want to do', weights: { pattern: { receiving: 1 } } },
      { id: 'q7-life-3', label: 'Waking up somewhere new, no big occasion needed', weights: { pattern: { receiving: 2 } } },
      { id: 'q7-life-4', label: 'Not flinching at the price tag', weights: { pattern: { receiving: 2, holding: 1 } } }
    ]
  };

  var QUESTIONS = [
    {
      id: 'q1_transform',
      type: 'select',
      prompt: "If one part of your life completely transformed next, what would you choose?",
      options: [
        { id: 'money', label: 'More money', weights: { desire: { money: 4 } } },
        { id: 'business', label: 'My business / sales', weights: { desire: { business: 4 } } },
        { id: 'beauty', label: 'My beauty / confidence', weights: { desire: { beauty: 4 } } },
        { id: 'love', label: 'My love life', weights: { desire: { love: 4 } } },
        { id: 'lifestyle', label: 'My lifestyle', weights: { desire: { lifestyle: 4 } } },
        { id: 'luck', label: 'My luck / opportunities', weights: { desire: { luck: 4 } } },
        { id: 'everything', label: 'Everything, honestly', weights: { desire: { money: 1, business: 1, beauty: 1, love: 1, lifestyle: 1, luck: 1, magnetism: 1 } } }
      ]
    },
    {
      id: 'q2_notification',
      type: 'select',
      decisive: true,
      prompt: 'Which notification would make you absolutely lose your mind right now?',
      options: [
        { id: 'cash', label: '"$10,000 received."', weights: { desire: { money: 5, lifestyle: 1 } } },
        { id: 'orders', label: '"You have 17 new orders."', weights: { desire: { business: 5 } } },
        { id: 'book', label: '"Can I book with you?"', weights: { desire: { business: 4, magnetism: 1 } } },
        { id: 'text', label: 'A message from someone I actually want.', weights: { desire: { love: 5 } } },
        { id: 'reservation', label: '"Your reservation is confirmed."', weights: { desire: { lifestyle: 4, luck: 1 } } },
        { id: 'opportunity', label: 'An unexpected opportunity. A yes.', weights: { desire: { luck: 5 } } },
        { id: 'bigger', label: 'Something even bigger than I thought.', weights: { desire: { lifestyle: 2, luck: 2, money: 1 } } }
      ]
    },
    {
      id: 'q3_thinking',
      type: 'select',
      prompt: "Which one have you caught yourself thinking lately?",
      options: [
        { id: 'need-money', label: '"I need more f*cking money."', weights: { desire: { money: 3 }, pattern: { forcing: 2 } } },
        { id: 'nobody-buying', label: '"Why is nobody buying?"', weights: { desire: { business: 3 }, pattern: { doubting: 2 } } },
        { id: 'meant-for-more', label: '"I know I\'m meant for more than this."', weights: { desire: { lifestyle: 2 }, pattern: { settling: 3 } } },
        { id: 'tired-waiting', label: '"I\'m tired of waiting."', weights: { pattern: { waiting: 4 } } },
        { id: 'so-hard', label: '"Why does everything feel so hard?"', weights: { pattern: { forcing: 3, doubting: 2 } } },
        { id: 'need-big', label: '"I need something BIG to happen."', weights: { desire: { luck: 2 }, pattern: { waiting: 2, forcing: 1 } } },
        { id: 'feel-close', label: '"I can feel that I\'m close."', weights: { pattern: { checking: 3, holding: 1 } } }
      ]
    },
    {
      id: 'q4_when_quiet',
      type: 'select',
      decisive: true,
      prompt: "When it feels like nothing is happening, what do you usually do?",
      options: [
        { id: 'try-harder', label: 'Try harder', weights: { pattern: { forcing: 5 } } },
        { id: 'check-constantly', label: 'Check constantly', weights: { pattern: { checking: 5 } } },
        { id: 'switch-techniques', label: 'Switch techniques', weights: { pattern: { switching: 5 } } },
        { id: 'start-doubting', label: 'Start doubting it', weights: { pattern: { doubting: 5 } } },
        { id: 'get-frustrated', label: 'Get frustrated', weights: { pattern: { forcing: 2, doubting: 3 } } },
        { id: 'settle-less', label: 'Settle for less', weights: { pattern: { settling: 5 } } },
        { id: 'still-know', label: "I still know it's coming", weights: { pattern: { holding: 4, receiving: 2 } } }
      ]
    },
    {
      id: 'q5_symbol',
      type: 'image-select',
      prompt: "Don't think. Pick the one pulling you in.",
      options: [
        { id: 'coin', label: 'Gold coin', image: '/uic/symbols/coin.svg', weights: { desire: { money: 3 } } },
        { id: 'key', label: 'Key', image: '/uic/symbols/key.svg', weights: { desire: { lifestyle: 2, luck: 1 } } },
        { id: 'mirror', label: 'Mirror', image: '/uic/symbols/mirror.svg', weights: { desire: { beauty: 3 } } },
        { id: 'crystal', label: 'Crystal', image: '/uic/symbols/crystal.svg', weights: { desire: { magnetism: 2, luck: 1 } } },
        { id: 'star', label: 'Star', image: '/uic/symbols/star.svg', weights: { desire: { magnetism: 3 } } },
        { id: 'flame', label: 'Flame', image: '/uic/symbols/flame.svg', weights: { desire: { love: 2, magnetism: 1 } } },
        { id: 'doorway', label: 'Golden doorway', image: '/uic/symbols/doorway.svg', weights: { desire: { lifestyle: 3, luck: 1 } } }
      ]
    },
    {
      id: 'q6_six_months',
      type: 'select',
      decisive: true,
      prompt: 'Six months from now, which sentence would you LOVE to be saying?',
      options: [
        { id: 'more-money', label: '"I have more money than I know what to do with."', weights: { desire: { money: 5 } } },
        { id: 'business-blowing-up', label: '"My business is absolutely blowing up."', weights: { desire: { business: 5 } } },
        { id: 'look-feel-different', label: '"I look and feel completely different."', weights: { desire: { beauty: 4, magnetism: 1 } } },
        { id: 'loved-well', label: '"I am loved ridiculously well."', weights: { desire: { love: 5 } } },
        { id: 'life-expensive', label: '"My life feels expensive in the best way."', weights: { desire: { lifestyle: 5 } } },
        { id: 'working-out', label: '"Everything keeps working out for me."', weights: { desire: { luck: 5 } } },
        { id: 'cant-believe', label: '"I cannot believe how much my life changed."', weights: { desire: { lifestyle: 2, luck: 2, money: 1 } } }
      ]
    },
    {
      id: 'q7_proof',
      type: 'select',
      prompt: 'What would feel like the biggest proof that your manifestation is actually here?',
      resolveOptions: function (answersSoFar, runningDesireScores) {
        var top = 'lifestyle';
        var best = -Infinity;
        Object.keys(runningDesireScores || {}).forEach(function (key) {
          if (runningDesireScores[key] > best) { best = runningDesireScores[key]; top = key; }
        });
        return Q7_BY_DESIRE[top] || Q7_BY_DESIRE.lifestyle;
      }
    }
  ];

  return { QUESTIONS: QUESTIONS };
});
