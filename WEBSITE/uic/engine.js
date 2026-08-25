/**
 * THE UNIVERSE IS CALLING — deterministic scoring / routing engine.
 *
 * Loaded identically in the browser (for the instant pre-email calculation
 * and the "connecting..." pacing) and in the Netlify function (to
 * independently re-derive the result server-side before any Kit tag is
 * applied — see SECURITY below). Same code, same answer, same result. Always.
 *
 * ---- HOW SCORING WORKS (documented per MASTER BRIEF #13) ----
 * 1. Each answered option carries `weights.desire` and/or `weights.pattern`
 *    point deltas (see questions.js). Answers are folded in order into two
 *    running totals: desireScores{money,business,beauty,magnetism,love,luck,
 *    lifestyle} and patternScores{chasing,checking,doubting,switching,
 *    settling,holding,visibility,waiting,forcing,receiving}.
 * 2. Questions flagged `decisive: true` (q2, q4, q6) ALSO accumulate into a
 *    parallel decisive-only tally, used only to break ties.
 * 3. PRIMARY RESULT = the desire with the highest score. Ties are broken by
 *    (a) higher decisive-only tally, then (b) fixed priority order
 *    DESIRE_PRIORITY below. No randomness is ever used for routing.
 * 4. SECONDARY DESIRE = the next-highest desire score (must be > 0).
 * 5. PATTERN = the same procedure over patternScores / PATTERN_PRIORITY.
 * 6. Each RESULTS[] entry has a 1:1 desireKey, so step 3 also determines the
 *    archetype directly — no separate lookup table to keep in sync.
 *
 * ---- SECURITY (per MASTER BRIEF #52) ----
 * scoreAnswers() takes ONLY {questionId, optionId} pairs and re-derives every
 * weight from the canonical config below. A client can never hand the server
 * a fabricated result, pattern, or score — the server always recomputes from
 * scratch off the raw answer ids before any Kit tag is applied.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./config/index.js'));
  } else {
    root.UIC = root.UIC || {};
    Object.assign(root.UIC, factory(root.UIC));
  }
})(typeof self !== 'undefined' ? self : globalThis, function (CFG) {
  'use strict';

  var DESIRE_PRIORITY = ['money', 'business', 'beauty', 'magnetism', 'love', 'luck', 'lifestyle'];
  var PATTERN_PRIORITY = ['forcing', 'checking', 'doubting', 'waiting', 'chasing', 'settling', 'switching', 'visibility', 'holding', 'receiving'];

  function emptyTally(keys) {
    var t = {};
    keys.forEach(function (k) { t[k] = 0; });
    return t;
  }

  function addWeights(target, weights) {
    if (!weights) return;
    Object.keys(weights).forEach(function (k) {
      target[k] = (target[k] || 0) + weights[k];
    });
  }

  function findQuestion(id) {
    var found = null;
    CFG.QUESTIONS.forEach(function (q) { if (q.id === id) found = q; });
    return found;
  }

  function findOption(question, optionId, answersSoFar, desireScores) {
    var options = question.options;
    if (!options && typeof question.resolveOptions === 'function') {
      options = question.resolveOptions(answersSoFar, desireScores);
    }
    if (!options) return null;
    var found = null;
    options.forEach(function (o) { if (o.id === optionId) found = o; });
    return found;
  }

  /**
   * @param {Array<{questionId:string, optionId:string, freeText?:string}>} answers
   * @returns {{desireScores:object, patternScores:object, decisiveDesire:object,
   *            decisivePattern:object, resolvedAnswers:Array}}
   */
  function scoreAnswers(answers) {
    var desireScores = emptyTally(DESIRE_PRIORITY);
    var patternScores = emptyTally(PATTERN_PRIORITY);
    var decisiveDesire = emptyTally(DESIRE_PRIORITY);
    var decisivePattern = emptyTally(PATTERN_PRIORITY);
    var resolvedAnswers = [];

    (answers || []).forEach(function (a) {
      var question = findQuestion(a.questionId);
      if (!question) return;
      var option = findOption(question, a.optionId, resolvedAnswers, desireScores);
      if (!option) return;

      addWeights(desireScores, option.weights && option.weights.desire);
      addWeights(patternScores, option.weights && option.weights.pattern);
      if (question.decisive) {
        addWeights(decisiveDesire, option.weights && option.weights.desire);
        addWeights(decisivePattern, option.weights && option.weights.pattern);
      }

      resolvedAnswers.push({
        questionId: question.id,
        optionId: option.id,
        label: option.label,
        freeText: typeof a.freeText === 'string' ? a.freeText.slice(0, 120) : undefined
      });
    });

    return {
      desireScores: desireScores,
      patternScores: patternScores,
      decisiveDesire: decisiveDesire,
      decisivePattern: decisivePattern,
      resolvedAnswers: resolvedAnswers
    };
  }

  function pickWinner(scores, decisiveScores, priority) {
    var best = null;
    var bestScore = -Infinity;
    priority.forEach(function (key) {
      var score = scores[key] || 0;
      if (score > bestScore) { bestScore = score; best = key; }
    });
    var tied = priority.filter(function (key) { return (scores[key] || 0) === bestScore; });
    if (tied.length > 1) {
      var bestDecisive = -Infinity;
      var decisiveWinner = null;
      tied.forEach(function (key) {
        var d = decisiveScores[key] || 0;
        if (d > bestDecisive) { bestDecisive = d; decisiveWinner = key; }
      });
      var tiedAfterDecisive = tied.filter(function (key) { return (decisiveScores[key] || 0) === bestDecisive; });
      best = tiedAfterDecisive.length === 1 ? decisiveWinner : tiedAfterDecisive[0];
    }
    return best;
  }

  function secondBest(scores, excludeKey, priority) {
    var best = null;
    var bestScore = 0;
    priority.forEach(function (key) {
      if (key === excludeKey) return;
      var score = scores[key] || 0;
      if (score > bestScore) { bestScore = score; best = key; }
    });
    return bestScore > 0 ? best : null;
  }

  function simpleHash(str) {
    var h = 0;
    for (var i = 0; i < (str || '').length; i++) {
      h = (h * 31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
  }

  function pickDeclaration(result, seed) {
    if (!result.keyMessages || !result.keyMessages.length) return result.declaration;
    if (!seed) return result.declaration;
    var idx = simpleHash(seed) % result.keyMessages.length;
    return result.keyMessages[idx];
  }

  function findResultByDesire(desireKey) {
    var found = null;
    CFG.RESULTS.forEach(function (r) { if (r.desireKey === desireKey) found = r; });
    return found;
  }

  function findPattern(key) {
    var found = null;
    CFG.PATTERNS.forEach(function (p) { if (p.key === key) found = p; });
    return found;
  }

  /**
   * Full pipeline: raw answers -> the complete, ready-to-render result payload.
   * @param {Array} answers
   * @param {{firstName?:string, seed?:string}} opts
   */
  function resolveResult(answers, opts) {
    opts = opts || {};
    var scored = scoreAnswers(answers);
    var primaryDesire = pickWinner(scored.desireScores, scored.decisiveDesire, DESIRE_PRIORITY);
    var secondaryDesire = secondBest(scored.desireScores, primaryDesire, DESIRE_PRIORITY);
    var patternKey = pickWinner(scored.patternScores, scored.decisivePattern, PATTERN_PRIORITY);

    var result = findResultByDesire(primaryDesire);
    var pattern = findPattern(patternKey);
    var firstName = (opts.firstName || '').trim();
    var ctx = { firstName: firstName, manifestingNoun: result.manifestingNoun, resultTitle: result.title };
    var product = CFG.PRODUCTS[result.productSlug];

    return {
      resultKey: result.key,
      resultTitle: result.title,
      identity: result.identity,
      manifestingNoun: result.manifestingNoun,
      redVelvetCake: result.redVelvetCake,
      declaration: pickDeclaration(result, opts.seed),
      keyMessages: result.keyMessages,
      activation: result.activation,
      shareCard: result.shareCard,
      audio: result.audio,
      emailSummary: result.emailSummary,
      primaryDesire: primaryDesire,
      secondaryDesire: secondaryDesire,
      patternKey: patternKey,
      patternLabel: pattern.label,
      patternText: pattern.interpret(ctx),
      product: product,
      productSlug: result.productSlug,
      resolvedAnswers: scored.resolvedAnswers,
      desireScores: scored.desireScores,
      patternScores: scored.patternScores
    };
  }

  return {
    DESIRE_PRIORITY: DESIRE_PRIORITY,
    PATTERN_PRIORITY: PATTERN_PRIORITY,
    scoreAnswers: scoreAnswers,
    resolveResult: resolveResult,
    pickWinner: pickWinner
  };
});
