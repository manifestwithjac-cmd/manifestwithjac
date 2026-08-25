/**
 * POST /.netlify/functions/uic-submit
 *
 * The single write endpoint for THE UNIVERSE IS CALLING. Receives the raw
 * quiz answers + name/email, independently RECOMPUTES the result server-side
 * (never trusts a client-supplied result — see engine.js SECURITY note),
 * syncs the lead to Kit, and returns the authoritative result payload the
 * browser reveals.
 *
 * Kit failures never block the reveal (MASTER BRIEF #33): the client always
 * gets its result back; a failed Kit sync is logged for the scheduled
 * uic-retry-kit function to retry.
 */
'use strict';

const engine = require('../../WEBSITE/uic/engine.js');
const { QUESTIONS } = require('../../WEBSITE/uic/config/questions.js');
const { INTEGRATIONS } = require('../../WEBSITE/uic/config/integrations.js');
const { client: kitClient } = require('./lib/kit-client.js');
const { saveLead } = require('./lib/leads-store.js');
const { checkRateLimit } = require('./lib/rate-limit.js');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ANSWERS = QUESTIONS.length + 2; // small buffer, never trust client array length blindly

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}

function sanitizeName(name) {
  return String(name || '').trim().slice(0, 60).replace(/[<>]/g, '');
}

function sanitizeUtm(utm) {
  const out = {};
  ['source', 'medium', 'campaign', 'content', 'term'].forEach((k) => {
    if (utm && typeof utm[k] === 'string') out[k] = utm[k].slice(0, 120);
  });
  return out;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (_) {
    return json(400, { ok: false, error: 'Invalid JSON' });
  }

  // Invisible honeypot: a real visitor never fills this hidden field.
  if (payload.website) {
    return json(200, { ok: true, skipped: true });
  }

  const ip = event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || 'unknown';
  const rate = await checkRateLimit(ip);
  if (!rate.allowed) {
    return json(429, { ok: false, error: 'Too many submissions, try again shortly.' });
  }

  const sessionId = String(payload.sessionId || '').slice(0, 100) || `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const firstName = sanitizeName(payload.firstName);
  const email = String(payload.email || '').trim().toLowerCase();
  const answers = Array.isArray(payload.answers) ? payload.answers.slice(0, MAX_ANSWERS) : [];
  const utm = sanitizeUtm(payload.utm);
  const entrySource = String(payload.entrySource || 'universe-is-calling').slice(0, 60);
  const consent = !!payload.consent;

  if (!firstName) return json(400, { ok: false, error: 'missing_name' });
  if (!EMAIL_RE.test(email)) return json(400, { ok: false, error: 'invalid_email' });
  if (!answers.length) return json(400, { ok: false, error: 'missing_answers' });

  let result;
  try {
    result = engine.resolveResult(answers, { firstName, seed: email });
  } catch (err) {
    console.error('[uic-submit] scoring failed', err);
    return json(500, { ok: false, error: 'scoring_failed' });
  }

  const nowIso = new Date().toISOString();
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
    [fieldKeys.entrySource]: entrySource,
    [fieldKeys.campaign]: utm.campaign || '',
    [fieldKeys.completedAt]: nowIso,
    utm_source: utm.source || '',
    utm_medium: utm.medium || '',
    utm_campaign: utm.campaign || '',
    utm_content: utm.content || '',
    utm_term: utm.term || ''
  };

  const leadRecord = {
    sessionId,
    firstName,
    email,
    answers,
    resultKey: result.resultKey,
    patternKey: result.patternKey,
    consent,
    utm,
    entrySource,
    createdAt: nowIso,
    kitStatus: 'pending',
    kitAttempts: 0,
    kitError: null
  };

  const apiKey = process.env[INTEGRATIONS.kit.apiKeyEnv];
  const tagEnvName = INTEGRATIONS.kit.results[result.resultKey].tagEnv;
  const sequenceEnvName = INTEGRATIONS.kit.results[result.resultKey].sequenceEnv;
  const resultTagId = process.env[tagEnvName];
  const sequenceId = process.env[sequenceEnvName];
  const universalTagId = process.env[INTEGRATIONS.kit.universalCompletedTagEnv];

  let kitStatus = 'skipped';
  let kitError = null;

  if (!apiKey) {
    kitStatus = 'skipped';
    kitError = `${INTEGRATIONS.kit.apiKeyEnv} not configured`;
    console.warn('[uic-submit]', kitError);
  } else {
    try {
      const kit = kitClient(apiKey);
      await kit.upsertSubscriber({ email, firstName, fields });
      if (universalTagId) await kit.tagSubscriber({ tagId: universalTagId, email, firstName });
      if (resultTagId) await kit.tagSubscriber({ tagId: resultTagId, email, firstName });
      if (sequenceId) await kit.addToSequence({ sequenceId, email });
      kitStatus = 'synced';
    } catch (err) {
      kitStatus = 'failed';
      kitError = err && err.message ? err.message : String(err);
      console.error('[uic-submit] Kit sync failed', kitError, err && err.body);
    }
  }

  leadRecord.kitStatus = kitStatus;
  leadRecord.kitAttempts = kitStatus === 'failed' ? 1 : 0;
  leadRecord.kitError = kitError;
  await saveLead(sessionId, leadRecord);

  // Never block the reveal on a Kit failure — the scheduled retry handles it.
  return json(200, {
    ok: true,
    sessionId,
    kitStatus,
    result: {
      resultKey: result.resultKey,
      resultTitle: result.resultTitle,
      identity: result.identity,
      manifestingNoun: result.manifestingNoun,
      redVelvetCake: result.redVelvetCake,
      declaration: result.declaration,
      patternKey: result.patternKey,
      patternLabel: result.patternLabel,
      patternText: result.patternText,
      activation: result.activation,
      shareCard: result.shareCard,
      audio: result.audio,
      product: result.product,
      primaryDesire: result.primaryDesire,
      secondaryDesire: result.secondaryDesire
    }
  });
};
