/**
 * THE UNIVERSE IS CALLING — Kit integration wiring.
 *
 * This file does NOT contain secrets or real IDs — it maps each result key to
 * the *name* of the environment variable that holds its real Kit tag/sequence
 * ID. The Netlify function (netlify/functions/lib/kit-client.js) reads the
 * actual IDs from process.env using these names at request time.
 *
 * Real values for this Kit account are documented in KIT_SETUP.md.
 * To add an 8th result archetype: add its key to results.js AND add a row
 * here with new env var names, then set those env vars in Netlify.
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

  var INTEGRATIONS = {
    kit: {
      apiKeyEnv: 'KIT_API_KEY',
      universalCompletedTagEnv: 'KIT_TAG_UIC_COMPLETED',
      results: {
        money_surge: { tagEnv: 'KIT_TAG_MONEY_SURGE', sequenceEnv: 'KIT_SEQUENCE_MONEY_SURGE' },
        sold_out_era: { tagEnv: 'KIT_TAG_SOLD_OUT_ERA', sequenceEnv: 'KIT_SEQUENCE_SOLD_OUT_ERA' },
        glow_up: { tagEnv: 'KIT_TAG_GLOW_UP', sequenceEnv: 'KIT_SEQUENCE_GLOW_UP' },
        magnetic_era: { tagEnv: 'KIT_TAG_MAGNETIC_ERA', sequenceEnv: 'KIT_SEQUENCE_MAGNETIC_ERA' },
        love_upgrade: { tagEnv: 'KIT_TAG_LOVE_UPGRADE', sequenceEnv: 'KIT_SEQUENCE_LOVE_UPGRADE' },
        luck_streak: { tagEnv: 'KIT_TAG_LUCK_STREAK', sequenceEnv: 'KIT_SEQUENCE_LUCK_STREAK' },
        life_upgrade: { tagEnv: 'KIT_TAG_LIFE_UPGRADE', sequenceEnv: 'KIT_SEQUENCE_LIFE_UPGRADE' }
      },
      customFieldKeys: {
        result: 'uic_result',
        primaryDesire: 'uic_primary_desire',
        secondaryDesire: 'uic_secondary_desire',
        pattern: 'uic_pattern',
        desiredIdentity: 'uic_desired_identity',
        frequencyMatch: 'uic_frequency_match',
        recommendedProduct: 'uic_recommended_product',
        messageSummary: 'uic_message_summary',
        entrySource: 'uic_entry_source',
        campaign: 'uic_campaign',
        completedAt: 'uic_completed_at'
      }
    }
  };

  return { INTEGRATIONS: INTEGRATIONS };
});
