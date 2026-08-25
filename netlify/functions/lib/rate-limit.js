/**
 * Best-effort, invisible abuse guard (MASTER BRIEF #53). Not meant to stop a
 * determined attacker — meant to stop naive bots without adding a CAPTCHA to
 * a funnel where every extra field costs conversion. Backed by Netlify Blobs;
 * degrades to "always allow" if Blobs isn't available (e.g. local testing).
 */
'use strict';

let getStore = null;
try {
  ({ getStore } = require('@netlify/blobs'));
} catch (_) {}

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 8;

async function checkRateLimit(ip) {
  if (!getStore || !ip || ip === 'unknown') return { allowed: true };
  try {
    const store = getStore('uic-ratelimit');
    const key = `ip_${ip}`;
    const now = Date.now();
    const existing = (await store.get(key, { type: 'json' })) || { count: 0, windowStart: now };

    if (now - existing.windowStart > WINDOW_MS) {
      existing.count = 0;
      existing.windowStart = now;
    }
    existing.count += 1;
    await store.setJSON(key, existing);

    return { allowed: existing.count <= MAX_PER_WINDOW };
  } catch (err) {
    console.error('[uic-ratelimit] failed open', err);
    return { allowed: true };
  }
}

module.exports = { checkRateLimit };
