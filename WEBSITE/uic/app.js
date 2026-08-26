/**
 * THE UNIVERSE IS CALLING — app shell / state machine.
 * Vanilla JS, no build step, no framework — matches the rest of this site.
 * Reads config + engine + analytics off the shared `UIC` namespace (see the
 * <script> load order in universe-is-calling.html).
 *
 * Flow: call -> intro -> question (x6, with "tidbit" interstitials after
 * Q2/Q4/Q7) -> the three-card reading (card_pull_1/2/3, not counted in the
 * numbered progress bar) -> connecting -> email gate -> sent -> reveal-hero
 * -> audio-gate (only if the result has audio configured; listening
 * required, no seeking, before continuing) -> transition -> reveal (the
 * reading) -> reveal-product (the frequency-match recommendation, its own
 * screen — see PHASE notes in CONTENT_GUIDE.md).
 */
(function () {
  'use strict';

  var ROOT = document.getElementById('uic-root');
  var LIVE = document.getElementById('uic-live');
  var QUESTIONS = UIC.QUESTIONS;
  var PROGRESS_QUESTIONS = QUESTIONS.filter(function (q) { return q.type !== 'card-pull'; });
  var COPY = UIC.COPY;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Show a brief engagement "tidbit" after finishing these indices within
  // PROGRESS_QUESTIONS (0-based) — after Q2, Q4, and the last real question
  // (right before the card reading begins). See CONTENT_GUIDE.md.
  var TIDBIT_AFTER_INDEX = [1, 3, 5];

  function uuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'uic-' + Date.now() + '-' + Math.random().toString(36).slice(2);
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // A small 4-point "twinkle" sparkle, not a cartoon 5-point star — a quick,
  // subtle burst on tap so choosing an answer feels alive without being loud.
  var SPARKLE_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c0 6 2 10 6 12-4 2-6 6-6 12 0-6-2-10-6-12 4-2 6-6 6-12z"/></svg>';

  function spawnSparkles(originEl) {
    if (reducedMotion || !originEl) return;
    var rect = originEl.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var count = 5;
    for (var i = 0; i < count; i++) {
      var angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5 - 0.25);
      var dist = 14 + Math.random() * 12;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist;
      var el = document.createElement('div');
      el.className = 'uic-sparkle';
      el.style.left = cx + 'px';
      el.style.top = cy + 'px';
      el.style.setProperty('--dx', dx + 'px');
      el.style.setProperty('--dy', dy + 'px');
      el.innerHTML = SPARKLE_SVG;
      document.body.appendChild(el);
      (function (node) { setTimeout(function () { node.remove(); }, 650); })(el);
    }
  }

  function readUtm() {
    var params = new URLSearchParams(window.location.search);
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    var utm = {};
    var found = false;
    keys.forEach(function (k) {
      var v = params.get(k);
      if (v) { utm[k.replace('utm_', '')] = v; found = true; }
    });
    if (found) {
      sessionStorage.setItem('uic_utm', JSON.stringify(utm));
    }
    try {
      return found ? utm : JSON.parse(sessionStorage.getItem('uic_utm') || '{}');
    } catch (_) { return {}; }
  }

  var utm = readUtm();

  var state = {
    screen: 'call',
    questionIndex: 0,
    answers: [], // [{questionId, optionId, freeText?}]
    firstName: '',
    email: '',
    sessionId: uuid(),
    result: null,
    kitStatus: null,
    submitting: false,
    submitError: null,
    tidbitCount: 0,
    cardPullPending: null,
    tidbitNextIndex: 0,
    audioUnlocked: false,
    showTranscript: false
  };

  UIC.analytics.setSessionProps(Object.assign({ utm_source: utm.source, utm_medium: utm.medium, utm_campaign: utm.campaign }, {}));

  // ---- dev-only preview mode ----
  // /universe-is-calling?uic_preview=1&result=money_surge&pattern=checking&name=Sarah
  //   &stage=hero|audio|transition|full (default full)  &audio=1 (force a QA test-tone)
  var qp = new URLSearchParams(window.location.search);
  if (qp.get('uic_preview') === '1') {
    var forcedResult = qp.get('result');
    var forcedPattern = qp.get('pattern');
    var RESULTS = UIC.RESULTS, PATTERNS = UIC.PATTERNS, PRODUCTS = UIC.PRODUCTS;
    var r = RESULTS.find(function (x) { return x.key === forcedResult; }) || RESULTS[0];
    var p = PATTERNS.find(function (x) { return x.key === forcedPattern; }) || PATTERNS[0];
    var ctx = { firstName: qp.get('name') || 'Preview', manifestingNoun: r.manifestingNoun, resultTitle: r.title };
    var audio = r.audio;
    if (qp.get('audio') === '1') {
      audio = { enabled: true, url: '/uic/audio/qa-test-tone.wav', title: 'QA Test Tone (2s)', duration: '0:02', transcript: 'This is a placeholder transcript for QA — a two-second test tone, not a real message.' };
    }
    state.firstName = ctx.firstName;
    state.result = {
      resultKey: r.key, resultTitle: r.title, identity: r.identity, manifestingNoun: r.manifestingNoun,
      redVelvetCake: r.redVelvetCake, declaration: r.declaration, patternKey: p.key, patternLabel: p.label,
      patternText: p.interpret(ctx), shareCard: r.shareCard, audio: audio,
      product: PRODUCTS[r.productSlug], primaryDesire: r.desireKey, secondaryDesire: null
    };
    var stage = qp.get('stage') || 'full';
    state.screen = stage === 'hero' ? 'reveal-hero' : stage === 'audio' ? 'audio-gate' : stage === 'transition' ? 'transition' : stage === 'product' ? 'reveal-product' : 'reveal';
  }

  function setAnswer(questionId, optionId, freeText) {
    state.answers = state.answers.filter(function (a) { return a.questionId !== questionId; });
    state.answers.push({ questionId: questionId, optionId: optionId, freeText: freeText });
  }

  function getAnswer(questionId) {
    return state.answers.find(function (a) { return a.questionId === questionId; });
  }

  function currentQuestion() {
    return QUESTIONS[state.questionIndex];
  }

  function optionsForQuestion(q) {
    if (q.options) return q.options;
    if (typeof q.resolveOptions === 'function') {
      var scored = UIC.scoreAnswers(state.answers);
      return q.resolveOptions(state.answers, scored.desireScores);
    }
    return [];
  }

  function setScreen(name) {
    state.screen = name;
    render();
    var heading = ROOT.querySelector('[data-uic-focus]');
    if (heading) heading.focus({ preventScroll: false });
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });

    if (name === 'gate') UIC.analytics.track('uic_email_gate_viewed', {});
    if (name === 'reveal-hero' && state.result) {
      UIC.analytics.track('uic_result_revealed', { result: state.result.resultKey, pattern: state.result.patternKey });
    }
    if (name === 'reveal-product' && state.result && state.result.product) {
      UIC.analytics.track('uic_product_viewed', { result: state.result.resultKey, product: state.result.product.title });
    }
  }

  // ---------------------------------------------------------------- CALL ----
  function renderCall() {
    return (
      '<section class="uic-screen uic-screen--call">' +
        '<div class="uic-call-card">' +
          '<div class="uic-ring' + (reducedMotion ? '' : ' uic-ring--pulse') + '" aria-hidden="true"></div>' +
          '<p class="uic-eyebrow">incoming call</p>' +
          '<h1 class="uic-caller uic-blk" data-uic-focus tabindex="-1">' + escapeHtml(COPY.incomingCall.caller) + '</h1>' +
          '<p class="uic-newmessage">' + escapeHtml(COPY.incomingCall.newMessage) + '</p>' +
          '<div class="uic-call-actions">' +
            '<button class="uic-btn uic-btn--primary uic-btn--full" data-action="answer-call">' + escapeHtml(COPY.incomingCall.primaryCta) + '</button>' +
            '<button class="uic-btn uic-btn--ghost" data-action="not-now">' + escapeHtml(COPY.incomingCall.secondaryCta) + '</button>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  // --------------------------------------------------------------- INTRO ----
  function renderIntro() {
    var lines = COPY.intro.lines.map(function (l, i) {
      return '<p class="uic-intro-line" style="animation-delay:' + (reducedMotion ? '0s' : (i * 0.7) + 's') + '">' + escapeHtml(l) + '</p>';
    }).join('');
    return (
      '<section class="uic-screen uic-screen--intro">' +
        '<div class="uic-intro-card">' +
          '<h1 class="uic-sr-only" data-uic-focus tabindex="-1">The universe has a message for you</h1>' +
          lines +
          '<button class="uic-btn uic-btn--primary uic-btn--full uic-intro-cta" data-action="start-questions">' + escapeHtml(COPY.intro.cta) + '</button>' +
        '</div>' +
      '</section>'
    );
  }

  // ------------------------------------------------------------ BRAND BAR ----
  // Persistent sticky strip across the whole experience — just enough that
  // she never forgets whose message this is, without competing with the
  // "incoming call" moment.
  function renderBrandHeader() {
    return '<div class="uic-brand-header">Manifest With Jac</div>';
  }

  // ---------------------------------------------------------- TOP PROGRESS ----
  function renderTopbar() {
    if (state.screen !== 'question' && state.screen !== 'tidbit') return '';
    if (currentQuestion().type === 'card-pull') return ''; // the reading has its own pacing, not a numbered step
    var total = PROGRESS_QUESTIONS.length;
    var current = Math.min(state.questionIndex + 1, total);
    var pct = Math.round((state.questionIndex / total) * 100);
    return (
      '<div class="uic-topbar">' +
        '<div class="uic-topbar-in">' +
          '<span class="uic-topbar-label uic-blk">' + current + ' / ' + total + '</span>' +
          '<div class="uic-topbar-track" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100">' +
            '<div class="uic-topbar-fill" style="width:' + pct + '%"></div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  // ------------------------------------------------------------ QUESTION ----
  function renderQuestion() {
    var q = currentQuestion();
    if (q.type === 'card-pull') return renderCardPull(q);
    var options = optionsForQuestion(q);
    var existing = getAnswer(q.id);
    var isImage = q.type === 'image-select';
    var promptText = typeof q.prompt === 'function' ? q.prompt(state.answers) : q.prompt;

    var optionsHtml = options.map(function (o) {
      var selected = existing && existing.optionId === o.id;
      if (isImage) {
        return (
          '<button class="uic-symbol' + (selected ? ' uic-symbol--selected' : '') + '" data-action="answer" data-option="' + escapeHtml(o.id) + '" aria-pressed="' + !!selected + '">' +
            '<span class="uic-symbol-glyph" aria-hidden="true">' + symbolGlyph(o.id) + '</span>' +
            '<span class="uic-symbol-label">' + escapeHtml(o.label) + '</span>' +
          '</button>'
        );
      }
      return (
        '<button class="uic-option' + (selected ? ' uic-option--selected' : '') + '" data-action="answer" data-option="' + escapeHtml(o.id) + '" aria-pressed="' + !!selected + '">' +
          '<span>' + escapeHtml(o.label) + '</span>' +
          '<span class="uic-option-radio" aria-hidden="true"></span>' +
        '</button>'
      );
    }).join('');

    return (
      '<section class="uic-screen uic-screen--question">' +
        '<div class="uic-question-card">' +
          (state.questionIndex > 0
            ? '<button class="uic-back" data-action="back" aria-label="' + escapeHtml(COPY.a11y.backButton) + '">&larr;</button>'
            : '') +
          '<h2 class="uic-question-prompt" data-uic-focus tabindex="-1">' + escapeHtml(promptText) + '</h2>' +
          '<div class="' + (isImage ? 'uic-symbol-grid' : 'uic-option-list') + '">' + optionsHtml + '</div>' +
        '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------- CARD PULL ----
  // A blind spread of face-down cards, drawn one at a time across 3
  // positions — a real 3-card reading (not one isolated pick mid-quiz).
  // She picks without seeing what's under it, then it flips to reveal.
  var CARD_POSITION_LABELS = {
    card_pull_1: "What's Already Moving",
    card_pull_2: "What You've Been Missing",
    card_pull_3: "What's About to Shift"
  };
  var ALL_CARDS = UIC.QUESTIONS.find(function (q) { return q.id === 'card_pull_1'; }).resolveOptions([]);

  function findCardById(id) {
    var found = null;
    ALL_CARDS.forEach(function (o) { if (o.id === id) found = o; });
    return found;
  }

  function cardPosition(questionId) {
    var m = /card_pull_(\d)/.exec(questionId);
    return m ? parseInt(m[1], 10) : 1;
  }

  function priorCardsBefore(position) {
    var out = [];
    for (var i = 1; i < position; i++) {
      var a = getAnswer('card_pull_' + i);
      if (a) out.push({ position: i, card: findCardById(a.optionId) });
    }
    return out;
  }

  function cardPriorStripHtml(priorCards) {
    if (!priorCards.length) return '';
    return '<div class="uic-card-prior-strip">' + priorCards.map(function (p) {
      return (
        '<div class="uic-card-prior-chip">' +
          '<span class="uic-card-prior-glyph" aria-hidden="true">' + symbolGlyph(p.card.id) + '</span>' +
          '<span class="uic-card-prior-label">' + escapeHtml(CARD_POSITION_LABELS['card_pull_' + p.position]) + '</span>' +
        '</div>'
      );
    }).join('') + '</div>';
  }

  function renderCardPull(q) {
    var position = cardPosition(q.id);
    var options = optionsForQuestion(q);
    var existing = getAnswer(q.id);
    var revealedId = state.cardPullPending || (existing && existing.optionId);
    var revealed = revealedId ? findCardById(revealedId) : null;
    var priorCards = priorCardsBefore(position);
    var isFinalReading = position === 3 && revealed;

    var body;
    if (isFinalReading) {
      var allThree = priorCards.concat([{ position: 3, card: revealed }]);
      body = (
        '<p class="uic-card-reading-intro">Your Reading</p>' +
        '<div class="uic-card-final-row">' + allThree.map(function (p) {
          return (
            '<div class="uic-card-final">' +
              '<p class="uic-card-position-label">' + escapeHtml(CARD_POSITION_LABELS['card_pull_' + p.position]) + '</p>' +
              '<div class="uic-card-face uic-card-face--small">' +
                '<span class="uic-card-face-glyph" aria-hidden="true">' + symbolGlyph(p.card.id) + '</span>' +
                '<p class="uic-card-face-title uic-blk">' + escapeHtml(p.card.label) + '</p>' +
              '</div>' +
            '</div>'
          );
        }).join('') + '</div>' +
        '<button class="uic-btn uic-btn--primary uic-btn--full" style="max-width:320px;margin:22px auto 0" data-action="card-pull-continue">Continue</button>'
      );
    } else if (revealed) {
      body = (
        cardPriorStripHtml(priorCards) +
        '<div class="uic-card-revealed">' +
          '<p class="uic-card-position-label">' + escapeHtml(CARD_POSITION_LABELS[q.id]) + '</p>' +
          '<div class="uic-card-face">' +
            '<span class="uic-card-face-glyph" aria-hidden="true">' + symbolGlyph(revealed.id) + '</span>' +
            '<p class="uic-card-face-title uic-blk">' + escapeHtml(revealed.label) + '</p>' +
            '<p class="uic-card-face-meaning">' + escapeHtml(revealed.meaning || '') + '</p>' +
          '</div>' +
          '<button class="uic-btn uic-btn--primary uic-btn--full" style="max-width:320px;margin:18px auto 0" data-action="card-pull-continue">Continue</button>' +
          '<button class="uic-btn uic-btn--text" data-action="card-pull-reset">Pull a different card</button>' +
        '</div>'
      );
    } else {
      var cardsHtml = options.map(function (o) {
        return '<button class="uic-card-back" data-action="pull-card" data-option="' + escapeHtml(o.id) + '" aria-label="Pull a card"><span class="uic-card-back-mark" aria-hidden="true">&#10022;</span></button>';
      }).join('');
      body = cardPriorStripHtml(priorCards) + '<div class="uic-card-spread">' + cardsHtml + '</div>';
    }

    var promptText = typeof q.prompt === 'function' ? q.prompt(state.answers) : q.prompt;
    return (
      '<section class="uic-screen uic-screen--question uic-screen--card-pull">' +
        '<div class="uic-question-card">' +
          (state.questionIndex > 0
            ? '<button class="uic-back" data-action="back" aria-label="' + escapeHtml(COPY.a11y.backButton) + '">&larr;</button>'
            : '') +
          '<h2 class="uic-question-prompt" data-uic-focus tabindex="-1">' + escapeHtml(promptText) + '</h2>' +
          body +
        '</div>' +
      '</section>'
    );
  }

  /** Shared by the normal 'answer' click and the card-pull's 'Continue'. */
  function commitAnswerAndAdvance(questionId, optionId) {
    var answeredIndex = state.questionIndex;
    setAnswer(questionId, optionId);
    UIC.analytics.track('uic_question_answered', { question_id: questionId, option_id: optionId, index: answeredIndex });

    if (answeredIndex < QUESTIONS.length - 1) {
      var nextIndex = answeredIndex + 1;
      if (TIDBIT_AFTER_INDEX.indexOf(answeredIndex) !== -1) {
        showTidbitThenAdvance(nextIndex);
      } else {
        state.questionIndex = nextIndex;
        UIC.analytics.track('uic_question_viewed', { question_id: currentQuestion().id, index: state.questionIndex });
        render();
      }
    } else {
      UIC.analytics.track('uic_questions_completed', { total: QUESTIONS.length });
      setScreen('connecting');
      runConnectingSequence();
      UIC.analytics.track('uic_result_calculated', {});
    }
  }

  // ------------------------------------------------------------- TIDBIT ----
  function renderTidbit() {
    var line = COPY.tidbits[state.tidbitCount % COPY.tidbits.length];
    return (
      '<section class="uic-screen uic-screen--tidbit" data-action="tidbit-continue">' +
        '<div class="uic-tidbit-card">' +
          '<div class="uic-tidbit-mark uic-blk" aria-hidden="true">?</div>' +
          '<p class="uic-tidbit-line" data-uic-focus tabindex="-1">' + escapeHtml(line) + '</p>' +
        '</div>' +
      '</section>'
    );
  }

  function showTidbitThenAdvance(nextIndex) {
    state.tidbitNextIndex = nextIndex;
    setScreen('tidbit');
    // Long enough to actually read a short sentence, not just glimpse it —
    // still tap-anywhere-to-skip for anyone who wants to move faster.
    var delay = reducedMotion ? 1300 : 3400;
    var timer = setTimeout(advanceFromTidbit, delay);
    ROOT.dataset.tidbitTimer = 'pending';
    ROOT._uicTidbitTimer = timer;
  }

  function advanceFromTidbit() {
    if (ROOT._uicTidbitTimer) { clearTimeout(ROOT._uicTidbitTimer); ROOT._uicTidbitTimer = null; }
    if (state.screen !== 'tidbit') return;
    state.tidbitCount += 1;
    state.questionIndex = state.tidbitNextIndex;
    UIC.analytics.track('uic_question_viewed', { question_id: currentQuestion().id, index: state.questionIndex });
    setScreen('question');
  }

  // Minimal line-art marks — no external image assets required. Swap for real
  // artwork later by editing SYMBOL_PATHS or by rendering <img src="o.image">
  // in renderQuestion() instead (o.image paths are already in questions.js).
  var SYMBOL_PATHS = {
    coin: '<circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="10"/>',
    key: '<circle cx="16" cy="16" r="7"/><line x1="21" y1="21" x2="36" y2="36"/><line x1="30" y1="30" x2="34" y2="26"/><line x1="34" y1="34" x2="38" y2="30"/>',
    mirror: '<ellipse cx="24" cy="18" rx="11" ry="14"/><line x1="24" y1="32" x2="24" y2="42"/><line x1="18" y1="42" x2="30" y2="42"/>',
    crystal: '<polygon points="24,6 34,18 30,42 18,42 14,18"/><line x1="14" y1="18" x2="34" y2="18"/>',
    star: '<path d="M24 6 L27 21 L42 24 L27 27 L24 42 L21 27 L6 24 L21 21 Z"/>',
    flame: '<path d="M24 6 C16 16 14 22 14 28 C14 36 19 42 24 42 C29 42 34 36 34 28 C34 24 32 20 29 17 C29 22 26 24 24 20 C22 17 23 10 24 6 Z"/>',
    doorway: '<path d="M14 42 V22 A10 10 0 0 1 34 22 V42"/><circle cx="24" cy="27" r="1.6" fill="currentColor" stroke="none"/>'
  };
  function symbolGlyph(id) {
    var inner = SYMBOL_PATHS[id] || SYMBOL_PATHS.star;
    return '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
  }

  // ---------------------------------------------------------- CONNECTING ----
  function renderConnecting() {
    return (
      '<section class="uic-screen uic-screen--connecting">' +
        '<div class="uic-connecting-card">' +
          '<div class="uic-orb" aria-hidden="true"></div>' +
          '<p class="uic-connecting-line uic-blk" id="uic-connecting-line" data-uic-focus tabindex="-1" aria-live="polite">' + escapeHtml(COPY.connecting.steps[0]) + '</p>' +
        '</div>' +
      '</section>'
    );
  }

  function runConnectingSequence() {
    var steps = COPY.connecting.steps;
    var i = 0;
    var el = document.getElementById('uic-connecting-line');
    var delay = reducedMotion ? 350 : 950;
    var interval = setInterval(function () {
      i += 1;
      if (i >= steps.length) {
        clearInterval(interval);
        setTimeout(function () { setScreen('gate'); }, delay);
        return;
      }
      if (el) { el.textContent = steps[i]; }
    }, delay);
  }

  // ----------------------------------------------------------------- GATE ----
  function renderGate() {
    return (
      '<section class="uic-screen uic-screen--gate">' +
        '<div class="uic-gate-card">' +
          '<p class="uic-eyebrow" data-uic-focus tabindex="-1">' + escapeHtml(COPY.emailGate.eyebrow) + '</p>' +
          '<h1 class="uic-gate-headline uic-blk">' + escapeHtml(COPY.emailGate.headline) + '</h1>' +
          '<form id="uic-gate-form" novalidate>' +
            '<label class="uic-sr-only" for="uic-first-name">First name</label>' +
            '<input class="uic-input" id="uic-first-name" name="firstName" type="text" autocomplete="given-name" placeholder="' + escapeHtml(COPY.emailGate.firstNamePlaceholder) + '" value="' + escapeHtml(state.firstName) + '" required maxlength="60" />' +
            '<label class="uic-sr-only" for="uic-email">Email address</label>' +
            '<input class="uic-input" id="uic-email" name="email" type="email" autocomplete="email" placeholder="' + escapeHtml(COPY.emailGate.emailPlaceholder) + '" value="' + escapeHtml(state.email) + '" required />' +
            '<div class="uic-honeypot" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off" /></label></div>' +
            (state.submitError ? '<p class="uic-error" role="alert">' + escapeHtml(state.submitError) + '</p>' : '') +
            '<button class="uic-btn uic-btn--primary uic-btn--full" type="submit" ' + (state.submitting ? 'disabled aria-busy="true"' : '') + '>' +
              (state.submitting ? escapeHtml(COPY.emailGate.submittingCta) : escapeHtml(COPY.emailGate.primaryCta)) +
            '</button>' +
            '<p class="uic-privacy-note">' + escapeHtml(COPY.emailGate.privacyNote) + '</p>' +
          '</form>' +
        '</div>' +
      '</section>'
    );
  }

  async function submitGate(firstName, email, website) {
    state.firstName = firstName;
    state.email = email;
    state.submitting = true;
    state.submitError = null;
    render();

    UIC.analytics.track('uic_email_submitted', { result: null });

    try {
      var res = await fetch('/.netlify/functions/uic-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: state.sessionId,
          firstName: firstName,
          email: email,
          answers: state.answers,
          utm: utm,
          entrySource: utm.source || 'direct',
          consent: true,
          website: website
        })
      });
      var data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error((data && data.error) || 'submit_failed');
      }
      state.result = data.result;
      state.kitStatus = data.kitStatus;
      state.submitting = false;
      UIC.analytics.track('uic_kit_submission_success', { result: data.result.resultKey, kit_status: data.kitStatus });
      setScreen('sent');
      setTimeout(function () { setScreen('reveal-hero'); }, reducedMotion ? 400 : 1400);
    } catch (err) {
      state.submitting = false;
      state.submitError = COPY.emailGate.errorGeneric;
      UIC.analytics.track('uic_kit_submission_failed', { error: String(err && err.message) });
      render();
    }
  }

  // ----------------------------------------------------------------- SENT ----
  function renderSent() {
    return (
      '<section class="uic-screen uic-screen--sent">' +
        '<div class="uic-sent-card">' +
          '<div class="uic-checkmark uic-blk" aria-hidden="true">&#10003;</div>' +
          '<h1 class="uic-blk" data-uic-focus tabindex="-1">' + escapeHtml(COPY.sent.headline) + '</h1>' +
          '<p>' + escapeHtml(COPY.sent.sub) + '</p>' +
        '</div>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------- REVEAL: HERO ----
  function renderRevealHero() {
    var r = state.result;
    if (!r) return renderRevealError();
    var greeting = state.firstName ? escapeHtml(state.firstName) + '...' : '';
    return (
      '<section class="uic-screen uic-screen--reveal-hero">' +
        '<div class="uic-reveal-hero">' +
          (greeting ? '<p class="uic-greeting" data-uic-focus tabindex="-1">' + greeting + '</p>' : '<p class="uic-greeting" data-uic-focus tabindex="-1"></p>') +
          '<p class="uic-know-why">' + escapeHtml(COPY.reveal.knowWhy) + '</p>' +
          '<p class="uic-eyebrow">' + escapeHtml(COPY.reveal.manifestingEyebrow) + '</p>' +
          '<h1 class="uic-result-title uic-blk">' + escapeHtml(r.resultTitle) + '</h1>' +
          '<button class="uic-btn uic-btn--primary uic-btn--full" style="max-width:320px;margin:0 auto" data-action="hero-continue">Continue</button>' +
        '</div>' +
      '</section>'
    );
  }

  function renderRevealError() {
    return '<section class="uic-screen"><p>Something went wrong. <a href="/universe-is-calling">Start over</a>.</p></section>';
  }

  // ------------------------------------------------------- REVEAL: AUDIO ----
  function renderAudioGate() {
    var r = state.result;
    if (!r) return renderRevealError();
    var audio = r.audio;
    var headline = audio.duration
      ? COPY.audioGate.headlineWithDuration.replace('{{duration}}', audio.duration)
      : COPY.audioGate.headlineDefault;
    return (
      '<section class="uic-screen uic-screen--audio-gate">' +
        '<div class="uic-audio-gate-card">' +
          '<p class="uic-eyebrow" data-uic-focus tabindex="-1">' + escapeHtml(COPY.audioGate.eyebrow) + '</p>' +
          '<h1 class="uic-transition-headline uic-blk">' + escapeHtml(headline) + '</h1>' +
          '<div class="uic-audio-player" style="max-width:340px;margin:22px auto 0">' +
            '<audio class="uic-sr-only" preload="metadata" tabindex="-1" controlslist="nodownload noplaybackrate" disableremoteplayback src="' + escapeHtml(audio.url) + '"></audio>' +
            '<button class="uic-audio-play" data-action="audio-toggle" aria-label="' + escapeHtml(COPY.a11y.audioPlay) + '">' +
              '<span class="uic-audio-icon" data-audio-icon>&#9658;</span>' +
            '</button>' +
            '<div class="uic-audio-meta">' +
              '<p class="uic-audio-title">' + escapeHtml(audio.title || 'Your message') + '</p>' +
              '<div class="uic-audio-bar"><div class="uic-audio-bar-fill" data-audio-fill></div></div>' +
              '<p class="uic-audio-time"><span data-audio-current>0:00</span> / <span data-audio-duration>' + escapeHtml(audio.duration || '--:--') + '</span></p>' +
            '</div>' +
          '</div>' +
          '<p class="uic-audio-gate-note">' + escapeHtml(COPY.audioGate.note) + '</p>' +
          '<button class="uic-btn uic-btn--primary uic-btn--full" style="max-width:320px;margin:0 auto" data-action="audio-gate-continue" ' + (state.audioUnlocked ? '' : 'disabled') + '>' + escapeHtml(COPY.audioGate.continueCta) + '</button>' +
          (audio.transcript ? (
            '<button class="uic-transcript-toggle" data-action="toggle-transcript">' + escapeHtml(state.showTranscript ? COPY.audioGate.transcriptToggleOff : COPY.audioGate.transcriptToggleOn) + '</button>' +
            (state.showTranscript ? '<p class="uic-transcript-text">' + escapeHtml(audio.transcript) + '</p>' : '')
          ) : '') +
        '</div>' +
      '</section>'
    );
  }

  // -------------------------------------------------- REVEAL: TRANSITION ----
  function renderTransition() {
    return (
      '<section class="uic-screen uic-screen--transition">' +
        '<div class="uic-transition-card">' +
          '<h1 class="uic-transition-headline uic-blk" data-uic-focus tabindex="-1">' + escapeHtml(COPY.transition.headline) + '</h1>' +
          '<p class="uic-transition-sub">' + escapeHtml(COPY.transition.sub) + '</p>' +
          '<button class="uic-btn uic-btn--primary uic-btn--full" style="max-width:320px;margin:0 auto" data-action="transition-continue">' + escapeHtml(COPY.transition.cta) + '</button>' +
        '</div>' +
      '</section>'
    );
  }

  // ------------------------------------------------------- REVEAL: FULL ----
  function renderProduct(product) {
    if (!product) return '';
    return (
      '<section class="uic-card uic-reveal-section uic-product-card" data-reveal>' +
        '<p class="uic-eyebrow">' + escapeHtml(COPY.reveal.productEyebrow) + '</p>' +
        '<p class="uic-eyebrow uic-eyebrow--gold">' + escapeHtml(COPY.reveal.productSubEyebrow) + '</p>' +
        '<h3 class="uic-product-title uic-blk">' + escapeHtml(product.title) + '</h3>' +
        '<p class="uic-product-pitch">' + escapeHtml(product.pitchIntro) + '</p>' +
        '<p class="uic-product-desc">' + escapeHtml(product.description) + '</p>' +
        '<p class="uic-product-price uic-blk">' + escapeHtml(product.price) + '</p>' +
        '<a class="uic-btn uic-btn--primary uic-btn--full" href="' + escapeHtml(product.checkoutUrl) + '" data-action="product-click">' + escapeHtml(product.cta) + '</a>' +
      '</section>'
    );
  }

  function renderReveal() {
    var r = state.result;
    if (!r) return renderRevealError();

    var cakeHtml = r.redVelvetCake.map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('');
    var patternParas = r.patternText.split('\n\n').map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('');

    return (
      '<section class="uic-screen uic-screen--reveal">' +
        '<section class="uic-card uic-reveal-section" data-reveal>' +
          '<div class="uic-cake">' + cakeHtml + '</div>' +
        '</section>' +

        '<section class="uic-card uic-reveal-section" data-reveal>' +
          '<p class="uic-eyebrow">' + escapeHtml(COPY.reveal.patternEyebrow) + '</p>' +
          '<div class="uic-pattern">' + patternParas + '</div>' +
        '</section>' +

        '<section class="uic-card uic-reveal-section uic-declaration-card" data-reveal>' +
          '<p class="uic-eyebrow">' + escapeHtml(COPY.reveal.messageEyebrow) + '</p>' +
          '<blockquote class="uic-declaration uic-blk">&ldquo;' + escapeHtml(r.declaration) + '&rdquo;</blockquote>' +
          '<button class="uic-btn uic-btn--ghost" data-action="share">' + escapeHtml(COPY.reveal.shareCta) + '</button>' +
        '</section>' +

        '<section class="uic-reveal-continue" data-reveal>' +
          '<button class="uic-btn uic-btn--primary uic-btn--full" style="max-width:320px;margin:0 auto" data-action="reveal-continue">' + escapeHtml(COPY.reveal.readingContinueCta) + '</button>' +
        '</section>' +
      '</section>'
    );
  }

  // ---------------------------------------------------- REVEAL: PRODUCT ----
  // Its own screen, on purpose — the reading finishes, she taps through,
  // THEN gets "here's what I recommend and why."
  function renderRevealProduct() {
    var r = state.result;
    if (!r) return renderRevealError();
    return (
      '<section class="uic-screen uic-screen--reveal-product">' +
        renderProduct(r.product) +
        '<section class="uic-reveal-footer" data-reveal>' +
          '<p class="uic-disclaimer">' + escapeHtml(COPY.disclaimer) + ' <a href="' + escapeHtml(COPY.legal.disclaimerUrl) + '">Read more</a>.</p>' +
          '<button class="uic-btn uic-btn--text" data-action="restart">' + escapeHtml(COPY.reveal.restartCta) + '</button>' +
        '</section>' +
      '</section>'
    );
  }

  // ---------------------------------------------------------------- RENDER ----
  function render() {
    var html;
    switch (state.screen) {
      case 'call': html = renderCall(); break;
      case 'intro': html = renderIntro(); break;
      case 'question': html = renderQuestion(); break;
      case 'tidbit': html = renderTidbit(); break;
      case 'connecting': html = renderConnecting(); break;
      case 'gate': html = renderGate(); break;
      case 'sent': html = renderSent(); break;
      case 'reveal-hero': html = renderRevealHero(); break;
      case 'audio-gate': html = renderAudioGate(); break;
      case 'transition': html = renderTransition(); break;
      case 'reveal': html = renderReveal(); break;
      case 'reveal-product': html = renderRevealProduct(); break;
      default: html = renderCall();
    }
    ROOT.innerHTML = renderBrandHeader() + renderTopbar() + html;
    if (state.screen === 'reveal' || state.screen === 'reveal-product') initRevealObservers();
  }

  function initRevealObservers() {
    var sections = ROOT.querySelectorAll('[data-reveal]');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach(function (s) { s.classList.add('uic-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('uic-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    sections.forEach(function (s) { io.observe(s); });
  }

  // ----------------------------------------------------------- INTERACTION ----
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;
    var action = btn.getAttribute('data-action');

    if (action === 'answer-call') {
      UIC.analytics.track('uic_answer_call_clicked', {});
      setScreen('intro');
    } else if (action === 'not-now') {
      UIC.analytics.track('uic_answer_call_clicked', { declined: true });
    } else if (action === 'start-questions') {
      state.questionIndex = 0;
      UIC.analytics.track('uic_question_viewed', { question_id: QUESTIONS[0].id, index: 0 });
      setScreen('question');
    } else if (action === 'back') {
      if (state.questionIndex > 0) {
        state.questionIndex -= 1;
        render();
      }
    } else if (action === 'answer') {
      var q = currentQuestion();
      var optionId = btn.getAttribute('data-option');
      spawnSparkles(btn);
      commitAnswerAndAdvance(q.id, optionId);
    } else if (action === 'pull-card') {
      state.cardPullPending = btn.getAttribute('data-option');
      render();
    } else if (action === 'card-pull-continue') {
      var cardQ = currentQuestion();
      var existing = getAnswer(cardQ.id);
      var chosen = state.cardPullPending || (existing && existing.optionId);
      state.cardPullPending = null;
      if (chosen) commitAnswerAndAdvance(cardQ.id, chosen);
    } else if (action === 'card-pull-reset') {
      state.cardPullPending = null;
      state.answers = state.answers.filter(function (a) { return a.questionId !== currentQuestion().id; });
      render();
    } else if (action === 'tidbit-continue') {
      advanceFromTidbit();
    } else if (action === 'hero-continue') {
      var r = state.result;
      if (r && r.audio && r.audio.enabled && r.audio.url) {
        state.audioUnlocked = false;
        state.showTranscript = false;
        setScreen('audio-gate');
      } else {
        setScreen('transition');
      }
    } else if (action === 'audio-toggle') {
      toggleAudio(btn);
    } else if (action === 'toggle-transcript') {
      state.showTranscript = !state.showTranscript;
      if (state.showTranscript) {
        state.audioUnlocked = true; // accessibility fallback — reading counts as "listening"
        UIC.analytics.track('uic_audio_played', { result: state.result.resultKey, via: 'transcript' });
      }
      render();
    } else if (action === 'audio-gate-continue') {
      if (!state.audioUnlocked) return;
      setScreen('transition');
    } else if (action === 'transition-continue') {
      setScreen('reveal');
    } else if (action === 'reveal-continue') {
      setScreen('reveal-product');
    } else if (action === 'product-click') {
      UIC.analytics.track('uic_product_clicked', { result: state.result.resultKey, product: state.result.product.title });
      // let the <a> navigate normally
    } else if (action === 'share') {
      handleShare();
    } else if (action === 'restart') {
      window.location.href = window.location.pathname;
    }
  });

  ROOT.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'uic-gate-form') {
      e.preventDefault();
      var fd = new FormData(e.target);
      var firstName = String(fd.get('firstName') || '').trim();
      var email = String(fd.get('email') || '').trim();
      var website = String(fd.get('website') || '');
      if (!firstName) { state.submitError = COPY.emailGate.errorName; render(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { state.submitError = COPY.emailGate.errorEmail; render(); return; }
      submitGate(firstName, email, website);
    }
  });

  function toggleAudio(btn) {
    var wrap = btn.closest('.uic-audio-player');
    var audioEl = wrap.querySelector('audio');
    var icon = wrap.querySelector('[data-audio-icon]');
    var fill = wrap.querySelector('[data-audio-fill]');
    var current = wrap.querySelector('[data-audio-current]');

    if (audioEl.paused) {
      audioEl.play().catch(function () {});
      icon.innerHTML = '&#10074;&#10074;';
      btn.setAttribute('aria-label', COPY.a11y.audioPause);
      UIC.analytics.track('uic_audio_played', { result: state.result.resultKey, via: 'player' });

      // Required listen, no skipping ahead: track the furthest point actually
      // played and snap back any jump beyond it (media-key "skip forward",
      // a stray keyboard seek, scrubbing via devtools, etc). Pausing/resuming
      // is still fine — that's not a skip, just a delay.
      var lastSafeTime = audioEl._uicLastSafeTime || 0;
      audioEl.onseeking = function () {
        if (audioEl.currentTime > lastSafeTime + 0.5) {
          audioEl.currentTime = lastSafeTime;
        }
      };
      audioEl.ontimeupdate = function () {
        if (!audioEl.duration) return;
        if (audioEl.currentTime > lastSafeTime) {
          lastSafeTime = audioEl.currentTime;
          audioEl._uicLastSafeTime = lastSafeTime;
        }
        fill.style.width = (audioEl.currentTime / audioEl.duration * 100) + '%';
        current.textContent = formatTime(audioEl.currentTime);
      };
      audioEl.onended = function () {
        icon.innerHTML = '&#9658;';
        btn.setAttribute('aria-label', COPY.a11y.audioPlay);
        if (!state.audioUnlocked) {
          state.audioUnlocked = true;
          UIC.analytics.track('uic_audio_gate_unlocked', { result: state.result.resultKey });
          render();
        }
      };
    } else {
      audioEl.pause();
      icon.innerHTML = '&#9658;';
      btn.setAttribute('aria-label', COPY.a11y.audioPlay);
    }
  }

  function formatTime(sec) {
    sec = Math.floor(sec || 0);
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  async function handleShare() {
    var r = state.result;
    UIC.analytics.track('uic_share_clicked', { result: r.resultKey });
    var text = r.shareCard.line1 + ' ' + r.shareCard.line2 + '\n\n"' + r.declaration + '"\n\n' + COPY.meta.siteName;
    if (navigator.share) {
      try {
        await navigator.share({ title: COPY.meta.siteName, text: text, url: window.location.origin + '/universe-is-calling' });
        return;
      } catch (_) { /* user cancelled — fall through to clipboard */ }
    }
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        announce('Copied your message — paste it anywhere.');
        return;
      } catch (_) {}
    }
    announce(text);
  }

  function announce(msg) {
    if (LIVE) LIVE.textContent = msg;
  }

  // ----------------------------------------------------------------- INIT ----
  UIC.analytics.track('uic_viewed', {});
  render();
})();
