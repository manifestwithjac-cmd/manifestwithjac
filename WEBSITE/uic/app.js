/**
 * THE UNIVERSE IS CALLING — app shell / state machine.
 * Vanilla JS, no build step, no framework — matches the rest of this site.
 * Reads config + engine + analytics off the shared `UIC` namespace (see the
 * <script> load order in universe-is-calling.html).
 */
(function () {
  'use strict';

  var ROOT = document.getElementById('uic-root');
  var LIVE = document.getElementById('uic-live');
  var QUESTIONS = UIC.QUESTIONS;
  var COPY = UIC.COPY;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function uuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'uic-' + Date.now() + '-' + Math.random().toString(36).slice(2);
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
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
    activation: { step: 1, choice1: null, choice1Label: '', choice2: null },
    submitting: false,
    submitError: null
  };

  UIC.analytics.setSessionProps(Object.assign({ utm_source: utm.source, utm_medium: utm.medium, utm_campaign: utm.campaign }, {}));

  // ---- dev-only preview mode: ?uic_preview=1&result=money_surge&pattern=checking ----
  var qp = new URLSearchParams(window.location.search);
  if (qp.get('uic_preview') === '1') {
    var forcedResult = qp.get('result');
    var forcedPattern = qp.get('pattern');
    var RESULTS = UIC.RESULTS, PATTERNS = UIC.PATTERNS, PRODUCTS = UIC.PRODUCTS;
    var r = RESULTS.find(function (x) { return x.key === forcedResult; }) || RESULTS[0];
    var p = PATTERNS.find(function (x) { return x.key === forcedPattern; }) || PATTERNS[0];
    var ctx = { firstName: qp.get('name') || 'Preview', manifestingNoun: r.manifestingNoun, resultTitle: r.title };
    state.firstName = ctx.firstName;
    state.result = {
      resultKey: r.key, resultTitle: r.title, identity: r.identity, manifestingNoun: r.manifestingNoun,
      redVelvetCake: r.redVelvetCake, declaration: r.declaration, patternKey: p.key, patternLabel: p.label,
      patternText: p.interpret(ctx), activation: r.activation, shareCard: r.shareCard, audio: r.audio,
      product: PRODUCTS[r.productSlug], primaryDesire: r.desireKey, secondaryDesire: null
    };
    state.screen = 'reveal';
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
    if (name === 'reveal' && state.result) {
      UIC.analytics.track('uic_result_revealed', { result: state.result.resultKey, pattern: state.result.patternKey });
      if (state.result.product) {
        UIC.analytics.track('uic_product_viewed', { result: state.result.resultKey, product: state.result.product.title });
      }
    }
  }

  // ---------------------------------------------------------------- CALL ----
  function renderCall() {
    return (
      '<section class="uic-screen uic-screen--call">' +
        '<div class="uic-call-card">' +
          '<div class="uic-ring' + (reducedMotion ? '' : ' uic-ring--pulse') + '" aria-hidden="true"></div>' +
          '<p class="uic-eyebrow">incoming call</p>' +
          '<h1 class="uic-caller" data-uic-focus tabindex="-1">' + escapeHtml(COPY.incomingCall.caller) + '</h1>' +
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

  // ------------------------------------------------------------ QUESTION ----
  function renderProgress() {
    var dots = QUESTIONS.map(function (q, i) {
      var cls = 'uic-dot' + (i < state.questionIndex ? ' uic-dot--done' : '') + (i === state.questionIndex ? ' uic-dot--active' : '');
      return '<span class="' + cls + '"></span>';
    }).join('');
    return '<div class="uic-progress" role="presentation">' + dots + '</div>';
  }

  function renderQuestion() {
    var q = currentQuestion();
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
        '</button>'
      );
    }).join('');

    return (
      '<section class="uic-screen uic-screen--question">' +
        renderProgress() +
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
          '<p class="uic-connecting-line" id="uic-connecting-line" data-uic-focus tabindex="-1" aria-live="polite">' + escapeHtml(COPY.connecting.steps[0]) + '</p>' +
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
          '<h1 class="uic-gate-headline">' + escapeHtml(COPY.emailGate.headline) + '</h1>' +
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
      setTimeout(function () { setScreen('reveal'); }, reducedMotion ? 400 : 1400);
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
          '<div class="uic-checkmark" aria-hidden="true">&#10003;</div>' +
          '<h1 data-uic-focus tabindex="-1">' + escapeHtml(COPY.sent.headline) + '</h1>' +
          '<p>' + escapeHtml(COPY.sent.sub) + '</p>' +
        '</div>' +
      '</section>'
    );
  }

  // --------------------------------------------------------------- REVEAL ----
  function renderAudioSection(audio) {
    if (!audio || !audio.enabled || !audio.url) return '';
    return (
      '<section class="uic-card uic-reveal-section" data-reveal>' +
        '<p class="uic-eyebrow">' + escapeHtml(COPY.reveal.audioEyebrow) + '</p>' +
        '<div class="uic-audio-player" data-audio-src="' + escapeHtml(audio.url) + '">' +
          '<audio class="uic-sr-only" preload="none" src="' + escapeHtml(audio.url) + '"></audio>' +
          '<button class="uic-audio-play" data-action="audio-toggle" aria-label="' + escapeHtml(COPY.a11y.audioPlay) + '">' +
            '<span class="uic-audio-icon" data-audio-icon>&#9658;</span>' +
          '</button>' +
          '<div class="uic-audio-meta">' +
            '<p class="uic-audio-title">' + escapeHtml(audio.title || 'Your message') + '</p>' +
            '<div class="uic-audio-bar"><div class="uic-audio-bar-fill" data-audio-fill></div></div>' +
            '<p class="uic-audio-time"><span data-audio-current>0:00</span> / <span data-audio-duration>' + escapeHtml(audio.duration || '--:--') + '</span></p>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  function renderActivation(activation) {
    if (!activation) return '';
    var a = state.activation;
    var body = '';
    if (a.step === 1) {
      body =
        '<p class="uic-activation-prompt">' + escapeHtml(activation.prompt1) + '</p>' +
        '<div class="uic-option-list">' + activation.options1.map(function (o) {
          return '<button class="uic-option" data-action="activation-1" data-option="' + escapeHtml(o.id) + '" data-label="' + escapeHtml(o.label) + '">' + escapeHtml(o.label) + '</button>';
        }).join('') + '</div>';
    } else if (a.step === 2) {
      body =
        '<p class="uic-activation-transition">' + escapeHtml(activation.transition) + '</p>' +
        '<p class="uic-activation-prompt">' + escapeHtml(activation.prompt2) + '</p>' +
        '<div class="uic-option-list">' + activation.options2.map(function (o) {
          return '<button class="uic-option" data-action="activation-2" data-option="' + escapeHtml(o.id) + '">' + escapeHtml(o.label) + '</button>';
        }).join('') + '</div>';
    } else {
      body = '<p class="uic-declaration uic-declaration--activation">' + escapeHtml(activation.closing) + '</p>';
    }
    return (
      '<section class="uic-card uic-reveal-section" data-reveal>' +
        '<p class="uic-eyebrow">' + escapeHtml(COPY.reveal.activationIntro) + '</p>' +
        '<div class="uic-activation" data-activation-step="' + a.step + '">' + body + '</div>' +
      '</section>'
    );
  }

  function renderProduct(product) {
    if (!product) return '';
    return (
      '<section class="uic-card uic-reveal-section uic-product-card" data-reveal>' +
        '<p class="uic-eyebrow">' + escapeHtml(COPY.reveal.productEyebrow) + '</p>' +
        '<p class="uic-eyebrow uic-eyebrow--gold">' + escapeHtml(COPY.reveal.productSubEyebrow) + '</p>' +
        '<h3 class="uic-product-title">' + escapeHtml(product.title) + '</h3>' +
        '<p class="uic-product-pitch">' + escapeHtml(product.pitchIntro) + '</p>' +
        '<p class="uic-product-desc">' + escapeHtml(product.description) + '</p>' +
        '<p class="uic-product-price">' + escapeHtml(product.price) + '</p>' +
        '<a class="uic-btn uic-btn--primary uic-btn--full" href="' + escapeHtml(product.checkoutUrl) + '" data-action="product-click">' + escapeHtml(product.cta) + '</a>' +
      '</section>'
    );
  }

  function renderReveal() {
    var r = state.result;
    if (!r) return '<section class="uic-screen"><p>Something went wrong. <a href="/universe-is-calling">Start over</a>.</p></section>';

    var greeting = state.firstName ? escapeHtml(state.firstName) + '...' : '';
    var cakeHtml = r.redVelvetCake.map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('');
    var patternParas = r.patternText.split('\n\n').map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('');

    return (
      '<section class="uic-screen uic-screen--reveal">' +
        '<div class="uic-reveal-hero" data-reveal>' +
          (greeting ? '<p class="uic-greeting" data-uic-focus tabindex="-1">' + greeting + '</p>' : '<p class="uic-greeting" data-uic-focus tabindex="-1"></p>') +
          '<p class="uic-know-why">' + escapeHtml(COPY.reveal.knowWhy) + '</p>' +
          '<p class="uic-eyebrow">' + escapeHtml(COPY.reveal.manifestingEyebrow) + '</p>' +
          '<h1 class="uic-result-title">' + escapeHtml(r.resultTitle) + '</h1>' +
        '</div>' +

        '<section class="uic-card uic-reveal-section" data-reveal>' +
          '<div class="uic-cake">' + cakeHtml + '</div>' +
        '</section>' +

        '<section class="uic-card uic-reveal-section" data-reveal>' +
          '<p class="uic-eyebrow">' + escapeHtml(COPY.reveal.patternEyebrow) + '</p>' +
          '<div class="uic-pattern">' + patternParas + '</div>' +
        '</section>' +

        '<section class="uic-card uic-reveal-section uic-declaration-card" data-reveal>' +
          '<p class="uic-eyebrow">' + escapeHtml(COPY.reveal.messageEyebrow) + '</p>' +
          '<blockquote class="uic-declaration">&ldquo;' + escapeHtml(r.declaration) + '&rdquo;</blockquote>' +
          '<button class="uic-btn uic-btn--ghost" data-action="share">' + escapeHtml(COPY.reveal.shareCta) + '</button>' +
        '</section>' +

        renderAudioSection(r.audio) +
        renderActivation(r.activation) +
        renderProduct(r.product) +

        '<section class="uic-reveal-footer" data-reveal>' +
          '<p class="uic-disclaimer">' + escapeHtml(COPY.disclaimer) + '</p>' +
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
      case 'connecting': html = renderConnecting(); break;
      case 'gate': html = renderGate(); break;
      case 'sent': html = renderSent(); break;
      case 'reveal': html = renderReveal(); break;
      default: html = renderCall();
    }
    ROOT.innerHTML = html;
    if (state.screen === 'reveal') initRevealObservers();
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
      setAnswer(q.id, optionId);
      UIC.analytics.track('uic_question_answered', { question_id: q.id, option_id: optionId, index: state.questionIndex });
      if (state.questionIndex < QUESTIONS.length - 1) {
        state.questionIndex += 1;
        UIC.analytics.track('uic_question_viewed', { question_id: currentQuestion().id, index: state.questionIndex });
        render();
      } else {
        UIC.analytics.track('uic_questions_completed', { total: QUESTIONS.length });
        setScreen('connecting');
        runConnectingSequence();
        UIC.analytics.track('uic_result_calculated', {});
      }
    } else if (action === 'audio-toggle') {
      toggleAudio(btn);
    } else if (action === 'activation-1') {
      state.activation.step = 2;
      state.activation.choice1 = btn.getAttribute('data-option');
      state.activation.choice1Label = btn.getAttribute('data-label');
      UIC.analytics.track('uic_activation_started', { result: state.result.resultKey, choice: state.activation.choice1 });
      render();
      var el = ROOT.querySelector('.uic-activation');
      if (el) el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
    } else if (action === 'activation-2') {
      state.activation.step = 3;
      state.activation.choice2 = btn.getAttribute('data-option');
      UIC.analytics.track('uic_activation_completed', { result: state.result.resultKey, choice2: state.activation.choice2 });
      render();
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

  var audioEl = null;
  function toggleAudio(btn) {
    var wrap = btn.closest('.uic-audio-player');
    audioEl = wrap.querySelector('audio');
    var icon = wrap.querySelector('[data-audio-icon]');
    var fill = wrap.querySelector('[data-audio-fill]');
    var current = wrap.querySelector('[data-audio-current]');

    if (audioEl.paused) {
      audioEl.play().catch(function () {});
      icon.innerHTML = '&#10074;&#10074;';
      btn.setAttribute('aria-label', COPY.a11y.audioPause);
      UIC.analytics.track('uic_audio_played', { result: state.result.resultKey });
      audioEl.ontimeupdate = function () {
        if (!audioEl.duration) return;
        fill.style.width = (audioEl.currentTime / audioEl.duration * 100) + '%';
        current.textContent = formatTime(audioEl.currentTime);
      };
      audioEl.onended = function () {
        icon.innerHTML = '&#9658;';
        btn.setAttribute('aria-label', COPY.a11y.audioPlay);
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
  if (state.screen === 'reveal') {
    UIC.analytics.track('uic_result_revealed', { result: state.result.resultKey, preview: true });
  }
  render();
})();
