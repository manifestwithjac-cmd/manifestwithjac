/**
 * Scheduled function — retries any lead whose Kit sync previously failed
 * (transient Kit outage, timeout, etc.). Runs every 15 minutes. Gives up
 * after MAX_ATTEMPTS and leaves the lead's status as 'failed' for manual
 * follow-up (the record is still in Netlify Blobs with the raw answers, so
 * nothing is lost — see /README.md "Failure handling").
 */
'use strict';

const engine = require('../../WEBSITE/uic/engine.js');
const { INTEGRATIONS } = require('../../WEBSITE/uic/config/integrations.js');
const { client: kitClient } = require('./lib/kit-client.js');
const { listPendingRetries, saveLead } = require('./lib/leads-store.js');

const MAX_ATTEMPTS = 5;

exports.handler = async () => {
  const apiKey = process.env[INTEGRATIONS.kit.apiKeyEnv];
  if (!apiKey) {
    console.warn('[uic-retry-kit] no Kit API key configured, skipping run');
    return { statusCode: 200, body: 'skipped: no api key' };
  }

  const pending = await listPendingRetries(MAX_ATTEMPTS);
  if (!pending.length) {
    return { statusCode: 200, body: 'no pending retries' };
  }

  const kit = kitClient(apiKey);
  let succeeded = 0;
  let stillFailed = 0;

  for (const lead of pending) {
    try {
      const result = engine.resolveResult(lead.answers, { firstName: lead.firstName, seed: lead.email });
      const fieldKeys = INTEGRATIONS.kit.customFieldKeys;
      const fields = {
        [fieldKeys.result]: result.resultTitle,
        [fieldKeys.primaryDesire]: result.primaryDesire,
        [fieldKeys.secondaryDesire]: result.secondaryDesire || '',
        [fieldKeys.pattern]: result.patternLabel,
        [fieldKeys.desiredIdentity]: result.identity,
        [fieldKeys.frequencyMatch]: result.product ? result.product.title : '',
        [fieldKeys.recommendedProduct]: result.product ? result.product.title : '',
        [fieldKeys.messageSummary]: result.emailSummary,
        [fieldKeys.entrySource]: lead.entrySource || '',
        [fieldKeys.campaign]: (lead.utm && lead.utm.campaign) || '',
        [fieldKeys.completedAt]: lead.createdAt,
        utm_source: (lead.utm && lead.utm.source) || '',
        utm_medium: (lead.utm && lead.utm.medium) || '',
        utm_campaign: (lead.utm && lead.utm.campaign) || '',
        utm_content: (lead.utm && lead.utm.content) || '',
        utm_term: (lead.utm && lead.utm.term) || ''
      };

      const tagEnvName = INTEGRATIONS.kit.results[result.resultKey].tagEnv;
      const sequenceEnvName = INTEGRATIONS.kit.results[result.resultKey].sequenceEnv;
      const resultTagId = process.env[tagEnvName];
      const sequenceId = process.env[sequenceEnvName];
      const universalTagId = process.env[INTEGRATIONS.kit.universalCompletedTagEnv];

      await kit.upsertSubscriber({ email: lead.email, firstName: lead.firstName, fields });
      if (universalTagId) await kit.tagSubscriber({ tagId: universalTagId, email: lead.email, firstName: lead.firstName });
      if (resultTagId) await kit.tagSubscriber({ tagId: resultTagId, email: lead.email, firstName: lead.firstName });
      if (sequenceId) await kit.addToSequence({ sequenceId, email: lead.email });

      lead.kitStatus = 'synced';
      lead.kitError = null;
      succeeded += 1;
    } catch (err) {
      lead.kitAttempts = (lead.kitAttempts || 0) + 1;
      lead.kitStatus = lead.kitAttempts >= MAX_ATTEMPTS ? 'failed_final' : 'failed';
      lead.kitError = err && err.message ? err.message : String(err);
      stillFailed += 1;
      console.error('[uic-retry-kit] retry failed for', lead.sessionId, lead.kitError);
    }
    await saveLead(lead.sessionId, lead);
  }

  const summary = `retried ${pending.length}: ${succeeded} synced, ${stillFailed} still failed`;
  console.log('[uic-retry-kit]', summary);
  return { statusCode: 200, body: summary };
};

exports.config = { schedule: '*/15 * * * *' };
