'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const engine = require(path.join('..', 'WEBSITE', 'uic', 'engine.js'));
const { RESULTS } = require(path.join('..', 'WEBSITE', 'uic', 'config', 'results.js'));
const { PRODUCTS } = require(path.join('..', 'WEBSITE', 'uic', 'config', 'products.js'));
const { QUESTIONS } = require(path.join('..', 'WEBSITE', 'uic', 'config', 'questions.js'));

// One representative answer path per archetype (mirrors QA_MATRIX.md).
const PATHS_BY_RESULT = {
  money_surge: [['q1_transform', 'money'], ['q2_notification', 'cash'], ['q6_six_months', 'more-money']],
  sold_out_era: [['q1_transform', 'business'], ['q2_notification', 'orders'], ['q6_six_months', 'business-blowing-up']],
  glow_up: [['q1_transform', 'beauty'], ['q6_six_months', 'look-feel-different']],
  magnetic_era: [['q5_symbol', 'star'], ['q1_transform', 'everything']],
  love_upgrade: [['q1_transform', 'love'], ['q2_notification', 'text'], ['q6_six_months', 'loved-well']],
  luck_streak: [['q1_transform', 'luck'], ['q2_notification', 'opportunity'], ['q6_six_months', 'working-out']],
  life_upgrade: [['q1_transform', 'lifestyle'], ['q2_notification', 'reservation'], ['q6_six_months', 'life-expensive']]
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

test('secondary desire is the runner-up, and null when nothing else scored', () => {
  const answers = [{ questionId: 'q1_transform', optionId: 'money' }];
  const result = engine.resolveResult(answers, { firstName: 'Test' });
  assert.equal(result.secondaryDesire, null);

  const answersTwo = [
    { questionId: 'q1_transform', optionId: 'money' },   // money +4
    { questionId: 'q2_notification', optionId: 'text' }  // love +5 (outright leader, no tie)
  ];
  const resultTwo = engine.resolveResult(answersTwo, { firstName: 'Test' });
  assert.equal(resultTwo.resultKey, 'love_upgrade');
  assert.equal(resultTwo.secondaryDesire, 'money');
});
