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
 *   options   - array of { id, label, weights, image? }  (static — same for everyone)
 *   resolveOptions(answersSoFar, runningDesireScores) -> options[]  (conditional — see below)
 *               weights.desire   -> nudges DIMENSION 1 (what's trying to manifest)
 *               weights.pattern  -> nudges DIMENSION 2 (what she needs to hear)
 *
 * Desire keys (7, one per result archetype): money, business, beauty, magnetism, love, luck, lifestyle
 * Pattern keys (10): chasing, checking, doubting, switching, settling, holding, visibility, waiting, forcing, receiving
 *
 * CONDITIONAL QUESTIONS (Q2, Q3, Q6, Q7): once Q1 gives a clear leading
 * desire, these questions show options phrased for THAT category instead of
 * a mixed list spanning all 7 — e.g. if she picks "confidence" in Q1, Q2's
 * "notification" options are all confidence/beauty flavored, not a random
 * mix of money/business/love notifications. Each has a `general` fallback
 * bucket used only when Q1 was "Everything, honestly" (no clear lean yet).
 * This is a config pattern (`leadingDesire()` + per-desire tables below),
 * not special-cased app logic — engine.js and app.js just call
 * `resolveOptions()` generically for any question that defines it.
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

  var DESIRE_KEYS = ['money', 'business', 'beauty', 'magnetism', 'love', 'luck', 'lifestyle'];

  /** Returns the clear-leading desire key, or null if tied / nothing scored yet. */
  function leadingDesire(scores) {
    scores = scores || {};
    var best = -Infinity, top = null, tieAtBest = 0;
    DESIRE_KEYS.forEach(function (k) {
      var v = scores[k] || 0;
      if (v > best) { best = v; top = k; tieAtBest = 1; }
      else if (v === best) { tieAtBest += 1; }
    });
    if (best <= 0 || tieAtBest > 1) return null;
    return top;
  }

  function byDesire(table, scores, fallbackKey) {
    var lead = leadingDesire(scores);
    return (lead && table[lead]) || table[fallbackKey || 'general'];
  }

  // ---------------------------------------------------------------- Q2 ----
  var Q2_BY_DESIRE = {
    money: [
      { id: 'q2-money-1', label: '"$10,000 received."', weights: { desire: { money: 5 } } },
      { id: 'q2-money-2', label: '"Your balance just doubled overnight."', weights: { desire: { money: 5 }, pattern: { checking: 1 } } },
      { id: 'q2-money-3', label: '"Payment received — no invoice sent."', weights: { desire: { money: 4 }, pattern: { receiving: 1 } } },
      { id: 'q2-money-4', label: '"Autopay went through, and there\'s still plenty left."', weights: { desire: { money: 4 }, pattern: { holding: 1 } } },
      { id: 'q2-money-5', label: '"Refund: $2,400."', weights: { desire: { money: 4, luck: 1 } } },
      { id: 'q2-money-6', label: 'Someone paid you before you even asked.', weights: { desire: { money: 4 }, pattern: { receiving: 1 } } }
    ],
    business: [
      { id: 'q2-biz-1', label: '"You have 17 new orders."', weights: { desire: { business: 5 } } },
      { id: 'q2-biz-2', label: '"Sold out."', weights: { desire: { business: 5 }, pattern: { checking: 1 } } },
      { id: 'q2-biz-3', label: 'New client: "Can I book with you?"', weights: { desire: { business: 4, magnetism: 1 } } },
      { id: 'q2-biz-4', label: '"Waitlist is full."', weights: { desire: { business: 4 }, pattern: { holding: 1 } } },
      { id: 'q2-biz-5', label: 'Payment received. No negotiating.', weights: { desire: { business: 4 }, pattern: { receiving: 1 } } },
      { id: 'q2-biz-6', label: 'Someone tagged you: "She\'s the one to book."', weights: { desire: { business: 4, magnetism: 1 } } }
    ],
    beauty: [
      { id: 'q2-beauty-1', label: '3 new comments: "What are you using??"', weights: { desire: { beauty: 5 } } },
      { id: 'q2-beauty-2', label: '"You look different lately."', weights: { desire: { beauty: 5 } } },
      { id: 'q2-beauty-3', label: 'An old photo resurfaced — you almost didn\'t recognize yourself.', weights: { desire: { beauty: 4 }, pattern: { receiving: 1 } } },
      { id: 'q2-beauty-4', label: 'A stranger held eye contact a beat too long.', weights: { desire: { beauty: 4, magnetism: 1 } } },
      { id: 'q2-beauty-5', label: 'You caught your reflection and did a double-take.', weights: { desire: { beauty: 4 }, pattern: { checking: 1 } } },
      { id: 'q2-beauty-6', label: '"Whatever you\'re doing, keep doing it."', weights: { desire: { beauty: 4 } } }
    ],
    magnetism: [
      { id: 'q2-mag-1', label: '"I\'ve never met anyone like you."', weights: { desire: { magnetism: 5 } } },
      { id: 'q2-mag-2', label: 'The room got quieter when you walked in.', weights: { desire: { magnetism: 5 } } },
      { id: 'q2-mag-3', label: '"I still think about that conversation."', weights: { desire: { magnetism: 4 }, pattern: { receiving: 1 } } },
      { id: 'q2-mag-4', label: 'You got remembered by someone you barely spoke to.', weights: { desire: { magnetism: 4 } } },
      { id: 'q2-mag-5', label: 'An invite you didn\'t ask for.', weights: { desire: { magnetism: 4, luck: 1 } } },
      { id: 'q2-mag-6', label: '"Everyone was asking who you were."', weights: { desire: { magnetism: 4 } } }
    ],
    love: [
      { id: 'q2-love-1', label: 'A message from someone I actually want.', weights: { desire: { love: 5 } } },
      { id: 'q2-love-2', label: '"I can\'t stop thinking about you."', weights: { desire: { love: 5 } } },
      { id: 'q2-love-3', label: 'They texted first — again.', weights: { desire: { love: 4 }, pattern: { receiving: 1 } } },
      { id: 'q2-love-4', label: '"I want to make this official."', weights: { desire: { love: 4 } } },
      { id: 'q2-love-5', label: 'A reservation for two — their idea.', weights: { desire: { love: 4, lifestyle: 1 } } },
      { id: 'q2-love-6', label: '"I chose you. Easily."', weights: { desire: { love: 4 } } }
    ],
    luck: [
      { id: 'q2-luck-1', label: 'An unexpected opportunity. A yes.', weights: { desire: { luck: 5 } } },
      { id: 'q2-luck-2', label: '"You won."', weights: { desire: { luck: 5 } } },
      { id: 'q2-luck-3', label: 'Upgrade confirmed, no extra charge.', weights: { desire: { luck: 4 }, pattern: { receiving: 1 } } },
      { id: 'q2-luck-4', label: 'The exact thing you needed, right on time.', weights: { desire: { luck: 4 } } },
      { id: 'q2-luck-5', label: 'A refund you forgot you were owed.', weights: { desire: { luck: 4, money: 1 } } },
      { id: 'q2-luck-6', label: '"This almost never happens, but..."', weights: { desire: { luck: 4 } } }
    ],
    lifestyle: [
      { id: 'q2-life-1', label: '"Your reservation is confirmed."', weights: { desire: { lifestyle: 5 } } },
      { id: 'q2-life-2', label: 'Flight booked. No spreadsheet involved.', weights: { desire: { lifestyle: 5 } } },
      { id: 'q2-life-3', label: '"The place is even better than the photos."', weights: { desire: { lifestyle: 4 } } },
      { id: 'q2-life-4', label: 'Keys to the new place.', weights: { desire: { lifestyle: 4, money: 1 } } },
      { id: 'q2-life-5', label: 'Calendar cleared, on purpose.', weights: { desire: { lifestyle: 4 }, pattern: { receiving: 1 } } },
      { id: 'q2-life-6', label: '"This is just your life now."', weights: { desire: { lifestyle: 4 } } }
    ],
    general: [
      { id: 'cash', label: '"$10,000 received."', weights: { desire: { money: 5, lifestyle: 1 } } },
      { id: 'orders', label: '"You have 17 new orders."', weights: { desire: { business: 5 } } },
      { id: 'book', label: '"Can I book with you?"', weights: { desire: { business: 4, magnetism: 1 } } },
      { id: 'text', label: 'A message from someone I actually want.', weights: { desire: { love: 5 } } },
      { id: 'reservation', label: '"Your reservation is confirmed."', weights: { desire: { lifestyle: 4, luck: 1 } } },
      { id: 'opportunity', label: 'An unexpected opportunity. A yes.', weights: { desire: { luck: 5 } } },
      { id: 'bigger', label: 'Something even bigger than I thought.', weights: { desire: { lifestyle: 2, luck: 2, money: 1 } } }
    ]
  };

  // ---------------------------------------------------------------- Q3 ----
  var Q3_BY_DESIRE = {
    money: [
      { id: 'q3-money-1', label: '"I need more f*cking money."', weights: { desire: { money: 2 }, pattern: { forcing: 2 } } },
      { id: 'q3-money-2', label: '"Why does it feel like nothing\'s coming in?"', weights: { pattern: { waiting: 3, doubting: 1 } } },
      { id: 'q3-money-3', label: 'I check my account way more than I should.', weights: { pattern: { checking: 4 } } },
      { id: 'q3-money-4', label: '"I know it\'s coming, I just need it faster."', weights: { pattern: { forcing: 2, waiting: 1 } } },
      { id: 'q3-money-5', label: '"Maybe I\'m just bad with money."', weights: { pattern: { doubting: 3, settling: 1 } } },
      { id: 'q3-money-6', label: '"I\'ll believe it when I see it."', weights: { pattern: { doubting: 4 } } }
    ],
    business: [
      { id: 'q3-biz-1', label: '"Why is nobody buying?"', weights: { desire: { business: 2 }, pattern: { doubting: 3 } } },
      { id: 'q3-biz-2', label: '"I should probably lower my prices."', weights: { pattern: { settling: 4 } } },
      { id: 'q3-biz-3', label: 'I keep refreshing my sales page.', weights: { pattern: { checking: 4 } } },
      { id: 'q3-biz-4', label: 'I just need one more strategy to try.', weights: { pattern: { switching: 4 } } },
      { id: 'q3-biz-5', label: '"It shouldn\'t be this hard to sell this."', weights: { pattern: { forcing: 3, doubting: 1 } } },
      { id: 'q3-biz-6', label: '"I know I\'m meant to be busier than this."', weights: { pattern: { waiting: 2, settling: 1 } } }
    ],
    beauty: [
      { id: 'q3-beauty-1', label: '"I know I\'m meant for more than this."', weights: { desire: { beauty: 1 }, pattern: { settling: 3 } } },
      { id: 'q3-beauty-2', label: 'I keep picking myself apart in the mirror.', weights: { pattern: { checking: 3, doubting: 1 } } },
      { id: 'q3-beauty-3', label: '"Maybe this is just what I look like now."', weights: { pattern: { settling: 4 } } },
      { id: 'q3-beauty-4', label: '"I\'ll fix it eventually."', weights: { pattern: { waiting: 3 } } },
      { id: 'q3-beauty-5', label: '"Nobody\'s really noticing the difference."', weights: { pattern: { doubting: 3 } } },
      { id: 'q3-beauty-6', label: 'I have to work so hard to look like this.', weights: { pattern: { forcing: 4 } } }
    ],
    magnetism: [
      { id: 'q3-mag-1', label: '"I don\'t know why people don\'t remember me."', weights: { pattern: { doubting: 3 } } },
      { id: 'q3-mag-2', label: 'I have to try so hard to be noticed.', weights: { pattern: { forcing: 4 } } },
      { id: 'q3-mag-3', label: '"Maybe I\'m just forgettable."', weights: { pattern: { doubting: 4 } } },
      { id: 'q3-mag-4', label: 'I shrink so I don\'t take up too much space.', weights: { pattern: { visibility: 4 } } },
      { id: 'q3-mag-5', label: 'I\'m always the one who has to reach out first.', weights: { pattern: { chasing: 3 } } },
      { id: 'q3-mag-6', label: 'I wonder if anyone actually notices me.', weights: { pattern: { visibility: 2, doubting: 2 } } }
    ],
    love: [
      { id: 'q3-love-1', label: '"I\'m tired of waiting."', weights: { pattern: { waiting: 4 } } },
      { id: 'q3-love-2', label: '"Why do I always have to reach out first?"', weights: { pattern: { chasing: 4 } } },
      { id: 'q3-love-3', label: '"Maybe I\'m just too much."', weights: { pattern: { doubting: 3, settling: 1 } } },
      { id: 'q3-love-4', label: 'I keep overanalyzing every text.', weights: { pattern: { checking: 4 } } },
      { id: 'q3-love-5', label: '"I should probably lower my standards."', weights: { pattern: { settling: 4 } } },
      { id: 'q3-love-6', label: '"I know they\'re out there, I just have to find them."', weights: { pattern: { waiting: 2, forcing: 1 } } }
    ],
    luck: [
      { id: 'q3-luck-1', label: '"I need something BIG to happen."', weights: { desire: { luck: 1 }, pattern: { waiting: 2, forcing: 1 } } },
      { id: 'q3-luck-2', label: '"Why does everything feel so hard?"', weights: { pattern: { forcing: 3, doubting: 2 } } },
      { id: 'q3-luck-3', label: '"Nothing ever just works out for me."', weights: { pattern: { doubting: 4 } } },
      { id: 'q3-luck-4', label: 'I feel like I\'m always one step behind.', weights: { pattern: { chasing: 2, doubting: 1 } } },
      { id: 'q3-luck-5', label: 'I have to plan for every worst case.', weights: { pattern: { forcing: 3 } } },
      { id: 'q3-luck-6', label: '"I can feel that I\'m close."', weights: { pattern: { checking: 3, holding: 1 } } }
    ],
    lifestyle: [
      { id: 'q3-life-1', label: '"I know I\'m meant for more than this."', weights: { pattern: { settling: 3 } } },
      { id: 'q3-life-2', label: '"I\'ll enjoy my life once I\'ve earned it."', weights: { pattern: { settling: 3, waiting: 1 } } },
      { id: 'q3-life-3', label: '"This is just what being an adult looks like."', weights: { pattern: { settling: 4 } } },
      { id: 'q3-life-4', label: 'I keep putting the good stuff off.', weights: { pattern: { waiting: 3 } } },
      { id: 'q3-life-5', label: 'I have to justify every nice thing I buy.', weights: { pattern: { forcing: 3 } } },
      { id: 'q3-life-6', label: '"Someday I\'ll actually enjoy this."', weights: { pattern: { waiting: 4 } } }
    ],
    general: [
      { id: 'need-money', label: '"I need more f*cking money."', weights: { desire: { money: 3 }, pattern: { forcing: 2 } } },
      { id: 'nobody-buying', label: '"Why is nobody buying?"', weights: { desire: { business: 3 }, pattern: { doubting: 2 } } },
      { id: 'meant-for-more', label: '"I know I\'m meant for more than this."', weights: { desire: { lifestyle: 2 }, pattern: { settling: 3 } } },
      { id: 'tired-waiting', label: '"I\'m tired of waiting."', weights: { pattern: { waiting: 4 } } },
      { id: 'so-hard', label: '"Why does everything feel so hard?"', weights: { pattern: { forcing: 3, doubting: 2 } } },
      { id: 'need-big', label: '"I need something BIG to happen."', weights: { desire: { luck: 2 }, pattern: { waiting: 2, forcing: 1 } } },
      { id: 'feel-close', label: '"I can feel that I\'m close."', weights: { pattern: { checking: 3, holding: 1 } } }
    ]
  };

  // ---------------------------------------------------------------- Q6 ----
  var Q6_BY_DESIRE = {
    money: [
      { id: 'q6-money-1', label: '"I have more money than I know what to do with."', weights: { desire: { money: 5 } } },
      { id: 'q6-money-2', label: '"Money stopped being something I stress about."', weights: { desire: { money: 5 } } },
      { id: 'q6-money-3', label: '"I paid for something big without blinking."', weights: { desire: { money: 4, lifestyle: 1 } } },
      { id: 'q6-money-4', label: '"My savings account actually surprises me."', weights: { desire: { money: 4 } } },
      { id: 'q6-money-5', label: '"I stopped counting and started living."', weights: { desire: { money: 4 } } },
      { id: 'q6-money-6', label: '"Money just... shows up now."', weights: { desire: { money: 5 } } }
    ],
    business: [
      { id: 'q6-biz-1', label: '"My business is absolutely blowing up."', weights: { desire: { business: 5 } } },
      { id: 'q6-biz-2', label: '"I raised my prices and nothing changed — except my bank account."', weights: { desire: { business: 5 } } },
      { id: 'q6-biz-3', label: '"I\'m turning people away."', weights: { desire: { business: 4, magnetism: 1 } } },
      { id: 'q6-biz-4', label: '"I built something people can\'t stop talking about."', weights: { desire: { business: 4 } } },
      { id: 'q6-biz-5', label: '"My calendar is full, months out."', weights: { desire: { business: 4 } } },
      { id: 'q6-biz-6', label: '"I don\'t chase clients anymore. They chase me."', weights: { desire: { business: 5 } } }
    ],
    beauty: [
      { id: 'q6-beauty-1', label: '"I look and feel completely different."', weights: { desire: { beauty: 4, magnetism: 1 } } },
      { id: 'q6-beauty-2', label: '"I stopped recognizing old photos of myself."', weights: { desire: { beauty: 5 } } },
      { id: 'q6-beauty-3', label: '"I actually love what I see in the mirror."', weights: { desire: { beauty: 5 } } },
      { id: 'q6-beauty-4', label: '"People keep asking what I did differently."', weights: { desire: { beauty: 4 } } },
      { id: 'q6-beauty-5', label: '"Getting dressed became fun again."', weights: { desire: { beauty: 4 } } },
      { id: 'q6-beauty-6', label: '"I finally match how I feel on the inside."', weights: { desire: { beauty: 5 } } }
    ],
    magnetism: [
      { id: 'q6-mag-1', label: '"People notice me before I say a word."', weights: { desire: { magnetism: 5 } } },
      { id: 'q6-mag-2', label: '"I stopped shrinking, and everything changed."', weights: { desire: { magnetism: 5 } } },
      { id: 'q6-mag-3', label: '"I walk into a room differently now."', weights: { desire: { magnetism: 4 } } },
      { id: 'q6-mag-4', label: '"People remember me after one conversation."', weights: { desire: { magnetism: 4 } } },
      { id: 'q6-mag-5', label: '"I\'m chosen without having to perform for it."', weights: { desire: { magnetism: 4, love: 1 } } },
      { id: 'q6-mag-6', label: '"I take up space and nothing bad happens."', weights: { desire: { magnetism: 5 } } }
    ],
    love: [
      { id: 'q6-love-1', label: '"I am loved ridiculously well."', weights: { desire: { love: 5 } } },
      { id: 'q6-love-2', label: '"I stopped chasing and got chosen instead."', weights: { desire: { love: 5 } } },
      { id: 'q6-love-3', label: '"I found someone who shows up exactly how they say they will."', weights: { desire: { love: 4 } } },
      { id: 'q6-love-4', label: '"I feel safe enough to stop performing."', weights: { desire: { love: 4 } } },
      { id: 'q6-love-5', label: '"Love finally feels easy."', weights: { desire: { love: 4 } } },
      { id: 'q6-love-6', label: '"I\'m someone\'s whole yes."', weights: { desire: { love: 5 } } }
    ],
    luck: [
      { id: 'q6-luck-1', label: '"Everything keeps working out for me."', weights: { desire: { luck: 5 } } },
      { id: 'q6-luck-2', label: '"I stopped being surprised by good timing."', weights: { desire: { luck: 5 } } },
      { id: 'q6-luck-3', label: '"Things just click into place now."', weights: { desire: { luck: 4 } } },
      { id: 'q6-luck-4', label: '"I got the yes I wasn\'t even expecting."', weights: { desire: { luck: 4 } } },
      { id: 'q6-luck-5', label: '"Luck actually feels like mine now."', weights: { desire: { luck: 4 } } },
      { id: 'q6-luck-6', label: '"I cannot believe how much my life changed."', weights: { desire: { luck: 2, lifestyle: 2, money: 1 } } }
    ],
    lifestyle: [
      { id: 'q6-life-1', label: '"My life feels expensive in the best way."', weights: { desire: { lifestyle: 5 } } },
      { id: 'q6-life-2', label: '"Ease became my new normal."', weights: { desire: { lifestyle: 5 } } },
      { id: 'q6-life-3', label: '"I stopped waiting for the \'right time.\'"', weights: { desire: { lifestyle: 4 } } },
      { id: 'q6-life-4', label: '"My Tuesday looks like other people\'s vacation."', weights: { desire: { lifestyle: 4 } } },
      { id: 'q6-life-5', label: '"I upgraded my whole life, not just my bank account."', weights: { desire: { lifestyle: 4, money: 1 } } },
      { id: 'q6-life-6', label: '"I cannot believe how much my life changed."', weights: { desire: { lifestyle: 2, luck: 2, money: 1 } } }
    ],
    general: [
      { id: 'more-money', label: '"I have more money than I know what to do with."', weights: { desire: { money: 5 } } },
      { id: 'business-blowing-up', label: '"My business is absolutely blowing up."', weights: { desire: { business: 5 } } },
      { id: 'look-feel-different', label: '"I look and feel completely different."', weights: { desire: { beauty: 4, magnetism: 1 } } },
      { id: 'loved-well', label: '"I am loved ridiculously well."', weights: { desire: { love: 5 } } },
      { id: 'life-expensive', label: '"My life feels expensive in the best way."', weights: { desire: { lifestyle: 5 } } },
      { id: 'working-out', label: '"Everything keeps working out for me."', weights: { desire: { luck: 5 } } },
      { id: 'cant-believe', label: '"I cannot believe how much my life changed."', weights: { desire: { lifestyle: 2, luck: 2, money: 1 } } }
    ]
  };

  // ---------------------------------------------------------------- Q7 ----
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
      resolveOptions: function (answersSoFar, runningDesireScores) {
        return byDesire(Q2_BY_DESIRE, runningDesireScores);
      }
    },
    {
      id: 'q3_thinking',
      type: 'select',
      prompt: "Which one have you caught yourself thinking lately?",
      resolveOptions: function (answersSoFar, runningDesireScores) {
        return byDesire(Q3_BY_DESIRE, runningDesireScores);
      }
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
      // 'card-pull': a blind spread of face-down cards — she picks one
      // without seeing what it is, then it flips to reveal the symbol +
      // meaning. Purely atmospheric beyond the light desire weights below
      // (same role the old visible symbol-grid played) — see CONTENT_GUIDE.md.
      type: 'card-pull',
      prompt: "Don't think. Pick the one pulling you in.",
      options: [
        { id: 'coin', label: 'The Gold Coin', meaning: 'Abundance, arriving in tangible form.', image: '/uic/symbols/coin.svg', weights: { desire: { money: 3 } } },
        { id: 'key', label: 'The Key', meaning: 'An unlock. A door about to open.', image: '/uic/symbols/key.svg', weights: { desire: { lifestyle: 2, luck: 1 } } },
        { id: 'mirror', label: 'The Mirror', meaning: 'Self-recognition — the glow that was already underneath.', image: '/uic/symbols/mirror.svg', weights: { desire: { beauty: 3 } } },
        { id: 'crystal', label: 'The Crystal', meaning: 'Clarity. A frequency, amplified.', image: '/uic/symbols/crystal.svg', weights: { desire: { magnetism: 2, luck: 1 } } },
        { id: 'star', label: 'The Star', meaning: 'Being seen. Being remembered.', image: '/uic/symbols/star.svg', weights: { desire: { magnetism: 3 } } },
        { id: 'flame', label: 'The Flame', meaning: 'Desire. Chemistry. Ignition.', image: '/uic/symbols/flame.svg', weights: { desire: { love: 2, magnetism: 1 } } },
        { id: 'doorway', label: 'The Golden Doorway', meaning: 'A new chapter — already open.', image: '/uic/symbols/doorway.svg', weights: { desire: { lifestyle: 3, luck: 1 } } }
      ]
    },
    {
      id: 'q6_six_months',
      type: 'select',
      decisive: true,
      prompt: 'Six months from now, which sentence would you LOVE to be saying?',
      resolveOptions: function (answersSoFar, runningDesireScores) {
        return byDesire(Q6_BY_DESIRE, runningDesireScores);
      }
    },
    {
      id: 'q7_proof',
      type: 'select',
      prompt: 'What would feel like the biggest proof that your manifestation is actually here?',
      resolveOptions: function (answersSoFar, runningDesireScores) {
        var lead = leadingDesire(runningDesireScores) || 'lifestyle';
        return Q7_BY_DESIRE[lead] || Q7_BY_DESIRE.lifestyle;
      }
    }
  ];

  return { QUESTIONS: QUESTIONS };
});
