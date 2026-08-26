/**
 * THE UNIVERSE IS CALLING — analytics event layer.
 *
 * Not tied to one provider. track() fans an event out to whatever is present
 * on window: gtag (GA4), fbq (Meta Pixel), dataLayer (GTM), plausible — all
 * optional, all no-ops if absent. In dev (no known provider present) it logs
 * to console so you can see the funnel while building.
 *
 * To wire a new provider: add one line inside track(). See README.md#analytics.
 *
 * Events fired (see CONTENT_GUIDE.md for the full list + properties):
 *   uic_viewed, uic_answer_call_clicked, uic_question_viewed, uic_question_answered,
 *   uic_questions_completed, uic_result_calculated, uic_email_gate_viewed,
 *   uic_email_submitted, uic_kit_submission_success, uic_kit_submission_failed,
 *   uic_result_revealed, uic_audio_played, uic_audio_gate_unlocked,
 *   uic_product_viewed, uic_product_clicked, uic_share_clicked
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

  var sessionProps = {};

  function setSessionProps(props) {
    sessionProps = Object.assign({}, sessionProps, props);
  }

  function track(eventName, props) {
    var merged = Object.assign({}, sessionProps, props || {});

    try {
      if (typeof window !== 'undefined') {
        if (typeof window.gtag === 'function') {
          window.gtag('event', eventName, merged);
        }
        if (typeof window.fbq === 'function') {
          window.fbq('trackCustom', eventName, merged);
        }
        if (Array.isArray(window.dataLayer)) {
          window.dataLayer.push(Object.assign({ event: eventName }, merged));
        }
        if (window.plausible) {
          window.plausible(eventName, { props: merged });
        }
      }
    } catch (err) {
      // Analytics must never break the funnel.
      console.error('[uic-analytics] provider error', err);
    }

    if (typeof window !== 'undefined' && window.location && /uic_debug=1/.test(window.location.search)) {
      console.log('[uic-analytics]', eventName, merged);
    }
  }

  return { analytics: { track: track, setSessionProps: setSessionProps } };
});
