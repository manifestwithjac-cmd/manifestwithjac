/**
 * Minimal Kit (formerly ConvertKit) v4 API client.
 *
 * Verified against Kit's current developer docs (developers.kit.com, Aug 2026):
 *  - Base URL: https://api.kit.com/v4
 *  - Auth: header `X-Kit-Api-Key: <v4 api key>` (created under Account Settings -> Developer).
 *          V3 API keys/secrets are NOT compatible with v4 — do not reuse an old ConvertKit key.
 *  - POST /v4/subscribers                        upserts a subscriber by email, sets first_name + fields
 *  - POST /v4/tags/{tag_id}/subscribers           tags a subscriber by email (also upserts if new)
 *  - POST /v4/sequences/{sequence_id}/subscribers enrolls an EXISTING subscriber into a sequence by email
 *
 * No endpoint exists to create/wire a visual "automation" (tag -> sequence) — that
 * part of Kit's product has no public API. We route around it entirely by calling
 * the sequence-enrollment endpoint directly, so no manual automation setup is
 * required in the Kit UI. See /KIT_SETUP.md.
 */
'use strict';

const KIT_API_BASE = 'https://api.kit.com/v4';

class KitError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = 'KitError';
    this.status = status;
    this.body = body;
  }
}

function client(apiKey) {
  if (!apiKey) {
    throw new Error('Kit API key missing (set KIT_API_KEY)');
  }

  async function call(path, body, { method = 'POST' } = {}) {
    const res = await fetch(`${KIT_API_BASE}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': apiKey
      },
      body: body ? JSON.stringify(body) : undefined
    });

    let json = null;
    try { json = await res.json(); } catch (_) { /* empty body is fine */ }

    if (!res.ok) {
      throw new KitError(`Kit API ${path} failed (${res.status})`, res.status, json);
    }
    return json;
  }

  return {
    /** Upsert a subscriber and set first_name + custom fields. */
    upsertSubscriber({ email, firstName, fields }) {
      return call('/subscribers', {
        email_address: email,
        first_name: firstName,
        state: 'active',
        fields
      });
    },

    /** Tag a subscriber by email (creates the subscriber if they don't exist yet). */
    tagSubscriber({ tagId, email, firstName, fields }) {
      return call(`/tags/${tagId}/subscribers`, {
        email_address: email,
        first_name: firstName,
        fields
      });
    },

    /** Enroll an already-existing subscriber into a sequence by email. */
    addToSequence({ sequenceId, email }) {
      return call(`/sequences/${sequenceId}/subscribers`, {
        email_address: email
      });
    }
  };
}

module.exports = { client, KitError };
