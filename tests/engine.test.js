'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const engine = require(path.join('..', 'WEBSITE', 'uic', 'engine.js'));
const { RESULTS } = require(path.join('..', 'WEBSITE', 'uic', 'config', 'results.js'));
const { PRODUCTS } = require(path.join('..', 'WEBSITE', 'uic', 'config', 'products.js'));
const { QUESTIONS } = require(path.join('..', 'WEBSITE', 'uic', 'config', 'questions.js'));

// One representative answer path per archetype (mirrors QA_MATRIX.md).
// Q2/Q3/Q6 are conditional on Q1's leading desire (see questions.js), so
// these paths use each desire's own option ids, not the shared "general"
// fallback (which only appears when Q1 was "Everything, honestly").
const PATHS_BY_RESULT = {
  money_surge: [['q1_transform', 'money'], ['q2_notification', 'q2-money-1'], ['q6_six_months', 'q6-money-1']],
  sold_out_era: [['q1_transform', 'business'], ['q2_notification', 'q2-biz-1'], ['q6_six_months', 'q6-biz-1']],
  glow_up: [['q1_transform', 'beauty'], ['q6_six_months', 'q6-beauty-1']],
  magnetic_era: [['card_pull_1', 'star'], ['q1_transform', 'everything']],
  love_upgrade: [['q1_transform', 'love'], ['q2_notification', 'q2-love-1'], ['q6_six_months', 'q6-love-1']],
  luck_streak: [['q1_transform', 'luck'], ['q2_notification', 'q2-luck-1'], ['q6_six_months', 'q6-luck-1']],
  life_upgrade: [['q1_transform', 'lifestyle'], ['q2_notification', 'q2-life-1'], ['q6_six_months', 'q6-life-1']]
};

test('every result archetype is reachable through a valid answer combination', () => {
  for (const [resultKey, pairs] of Object.entries(PATHS_BY_RESULT)) {
    const answers = pairs.map(([questionId, optionId]) => ({ questionId, optionId }));
    const result = engine.resolveResult(answers, { firstName: 'Test' });
    assert.equal(result.resultKey, resultKey, `expected ${resultKey}, got ${result.resultKey} for answers ${JSON.stringify(answers)}`);
  }
});

test('every result maps to a configured product', () => {
  RESULTS.forEach((r) => {
    assert.ok(PRODUCTS[r.productSlug], `result ${r.key} references missing product ${r.productSlug}`);
  });
});

test('a full 7-way desire tie resolves via the fixed DESIRE_PRIORITY order, not randomly', () => {
  const answers = [{ questionId: 'q1_transform', optionId: 'everything' }];
  const a = engine.resolveResult(answers, { firstName: 'Test' });
  const b = engine.resolveResult(answers, { firstName: 'Test' });
  assert.equal(a.resultKey, b.resultKey);
  assert.equal(a.primaryDesire, engine.DESIRE_PRIORITY[0]); // 'money' — first in priority order
});

test('pickWinner breaks a tied score using the decisive-only tally before falling back to priority order', () => {
  const scores = { money: 5, love: 5, business: 0 };
  const decisive = { money: 0, love: 3, business: 0 };
  const winner = engine.pickWinner(scores, decisive, ['money', 'love', 'business']);
  assert.equal(winner, 'love', 'love has the same raw score as money but more decisive-question weight');
});

test('pickWinner falls back to fixed priority order when scores AND decisive tallies are tied', () => {
  const scores = { business: 4, money: 4 };
  const decisive = { business: 0, money: 0 };
  const winner = engine.pickWinner(scores, decisive, ['money', 'business']);
  assert.equal(winner, 'money', 'money is listed first in the priority array passed in');
});

test('scoring is deterministic — same answers always produce the same result', () => {
  const answers = [
    { questionId: 'q4_when_quiet', optionId: 'check-constantly' },
    { questionId: 'q1_transform', optionId: 'money' }
  ];
  const a = engine.resolveResult(answers, { firstName: 'A' });
  const b = engine.resolveResult(answers, { firstName: 'A' });
  assert.equal(a.resultKey, b.resultKey);
  assert.equal(a.patternKey, b.patternKey);
  assert.equal(a.patternKey, 'checking');
});

test('unknown question/option ids are ignored, never crash, never forge weight', () => {
  const answers = [
    { questionId: 'not_a_real_question', optionId: 'money' },
    { questionId: 'q1_transform', optionId: 'not_a_real_option' },
    { questionId: 'q1_transform', optionId: 'love' }
  ];
  const result = engine.resolveResult(answers, { firstName: 'Test' });
  assert.equal(result.resultKey, 'love_upgrade');
});

test('a client cannot forge a result by sending arbitrary weights — only ids are honored', () => {
  // scoreAnswers only reads questionId/optionId; any extra "weights" field on
  // the input is simply ignored because findOption() re-looks-up the option
  // from canonical config, never from the caller-supplied object.
  const forged = [{
    questionId: 'q1_transform',
    optionId: 'money',
    weights: { desire: { love: 999 } } // attacker-supplied, must be ignored
  }];
  const result = engine.resolveResult(forged, { firstName: 'Test' });
  assert.equal(result.resultKey, 'money_surge');
});

test('conditional question 7 offers options matching the leading desire', () => {
  const q7 = QUESTIONS.find((q) => q.id === 'q7_proof');
  const moneyLeaning = q7.resolveOptions([], { money: 10, business: 0, beauty: 0, magnetism: 0, love: 0, luck: 0, lifestyle: 0 });
  assert.ok(moneyLeaning.every((o) => o.id.startsWith('q7-money-')));

  const loveLeaning = q7.resolveOptions([], { money: 0, business: 0, beauty: 0, magnetism: 0, love: 10, luck: 0, lifestyle: 0 });
  assert.ok(loveLeaning.every((o) => o.id.startsWith('q7-love-')));
});

test('conditional questions 2, 3, and 6 all reflect the leading desire — not a mixed generic list', () => {
  const byId = (id) => QUESTIONS.find((q) => q.id === id);
  const beautyScores = { money: 0, business: 0, beauty: 10, magnetism: 0, love: 0, luck: 0, lifestyle: 0 };

  ['q2_notification', 'q3_thinking', 'q6_six_months'].forEach((qid) => {
    const q = byId(qid);
    const opts = q.resolveOptions([], beautyScores);
    assert.ok(opts.length > 0, `${qid} returned no options`);
    assert.ok(opts.every((o) => o.id.startsWith('q' + qid[1] + '-beauty-')), `${qid} did not return beauty-flavored options: ${opts.map((o) => o.id)}`);
  });
});

test('Q2/Q3/Q6 fall back to the shared "general" mixed list only when Q1 was "Everything, honestly" (a tie)', () => {
  const q2 = QUESTIONS.find((q) => q.id === 'q2_notification');
  const tiedScores = { money: 1, business: 1, beauty: 1, magnetism: 1, love: 1, luck: 1, lifestyle: 1 };
  const opts = q2.resolveOptions([], tiedScores);
  assert.ok(opts.some((o) => o.id === 'cash'), 'expected the original general-fallback option ids when nothing is leading');
});

test('the three-card reading draws without replacement across positions 1, 2, and 3', () => {
  const byId = (id) => QUESTIONS.find((q) => q.id === id);
  const pull1 = byId('card_pull_1');
  const pull2 = byId('card_pull_2');
  const pull3 = byId('card_pull_3');

  const opts1 = pull1.resolveOptions([]);
  assert.equal(opts1.length, 7, 'all 7 cards available at position 1');

  const afterOne = [{ questionId: 'card_pull_1', optionId: 'star' }];
  const opts2 = pull2.resolveOptions(afterOne);
  assert.equal(opts2.length, 6);
  assert.ok(!opts2.some((o) => o.id === 'star'), 'the card drawn at position 1 is not offered again at position 2');

  const afterTwo = afterOne.concat([{ questionId: 'card_pull_2', optionId: 'coin' }]);
  const opts3 = pull3.resolveOptions(afterTwo);
  assert.equal(opts3.length, 5);
  assert.ok(!opts3.some((o) => o.id === 'star' || o.id === 'coin'), 'neither prior draw is offered again at position 3');
});

test('card_pull_1/2/3 questions are excluded from the question 5 slot — Q5 is a normal conditional question again', () => {
  assert.ok(!QUESTIONS.some((q) => q.id === 'q5_symbol'), 'q5_symbol should no longer exist as a standalone question');
  const ids = QUESTIONS.map((q) => q.id);
  assert.deepEqual(ids, ['q1_transform', 'q2_notification', 'q3_thinking', 'q4_when_quiet', 'q6_six_months', 'q7_proof', 'card_pull_1', 'card_pull_2', 'card_pull_3']);
});

test('secondary desire is the runner-up, and null when nothing else scored', () => {
  const answers = [{ questionId: 'q1_transform', optionId: 'money' }];
  const result = engine.resolveResult(answers, { firstName: 'Test' });
  assert.equal(result.secondaryDesire, null);

  const answersTwo = [
    { questionId: 'q1_transform', optionId: 'money' },        // money +4
    { questionId: 'q2_notification', optionId: 'q2-money-5' } // "Refund: $2,400." -> money +4, luck +1
  ];
  const resultTwo = engine.resolveResult(answersTwo, { firstName: 'Test' });
  assert.equal(resultTwo.resultKey, 'money_surge');
  assert.equal(resultTwo.secondaryDesire, 'luck');
});
