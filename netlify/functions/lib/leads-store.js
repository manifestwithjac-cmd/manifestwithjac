/**
 * Lightweight lead log + Kit-retry queue, backed by Netlify Blobs.
 *
 * Netlify Blobs needs zero external infra/credentials — it's provisioned
 * automatically per Netlify site. We use one store ("uic-leads") keyed by
 * session_id to:
 *   1. Give support/QA a record to look up a submission by session id.
 *   2. Let a scheduled function retry any lead whose Kit sync failed, so a
 *      transient Kit outage never permanently loses a lead (MASTER BRIEF #33).
 *
 * This module degrades gracefully (no-ops, logs to console) when
 * @netlify/blobs isn't resolvable — e.g. running tests locally outside
 * Netlify's runtime — so nothing here should ever crash the request handler.
 */
'use strict';

let getStore = null;
try {
  ({ getStore } = require('@netlify/blobs'));
} catch (_) {
  // Not running inside Netlify — leads-store becomes a no-op below.
}

function store() {
  if (!getStore) return null;
  try {
    return getStore('uic-leads');
  } catch (err) {
    console.error('[uic-leads] getStore failed', err);
    return null;
  }
}

async function saveLead(sessionId, record) {
  const s = store();
  if (!s) { console.log('[uic-leads] (no blob store) would save', sessionId, record.kitStatus); return; }
  try {
    await s.setJSON(sessionId, record);
  } catch (err) {
    console.error('[uic-leads] saveLead failed', err);
  }
}

async function getLead(sessionId) {
  const s = store();
  if (!s) return null;
  try {
    return await s.get(sessionId, { type: 'json' });
  } catch (err) {
    console.error('[uic-leads] getLead failed', err);
    return null;
  }
}

async function listPendingRetries(maxAttempts) {
  const s = store();
  if (!s) return [];
  try {
    const { blobs } = await s.list();
    const results = [];
    for (const b of blobs) {
      const record = await s.get(b.key, { type: 'json' });
      if (record && record.kitStatus === 'failed' && (record.kitAttempts || 0) < maxAttempts) {
        results.push(record);
      }
    }
    return results;
  } catch (err) {
    console.error('[uic-leads] listPendingRetries failed', err);
    return [];
  }
}

module.exports = { saveLead, getLead, listPendingRetries };
