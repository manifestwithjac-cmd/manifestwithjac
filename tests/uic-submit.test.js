'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const handlerPath = path.join('..', 'netlify', 'functions', 'uic-submit.js');

function makeEvent(body) {
  return {
    httpMethod: 'POST',
    headers: { 'x-nf-client-connection-ip': '203.0.113.5' },
    body: JSON.stringify(body)
  };
}

const VALID_ANSWERS = [
  { questionId: 'q1_transform', optionId: 'money' },
  { questionId: 'q2_notification', optionId: 'cash' },
  { questionId: 'q6_six_months', optionId: 'more-money' }
];

function withEnv(vars, fn) {
  const prev = {};
  Object.keys(vars).forEach((k) => { prev[k] = process.env[k]; process.env[k] = vars[k]; });
  return Promise.resolve(fn()).finally(() => {
    Object.keys(vars).forEach((k) => {
      if (prev[k] === undefined) delete process.env[k];
      else process.env[k] = prev[k];
    });
  });
}

test('rejects non-POST requests', async () => {
  delete require.cache[require.resolve(handlerPath)];
  const { handler } = require(handlerPath);
  const res = await handler({ httpMethod: 'GET' });
  assert.equal(res.statusCode, 405);
});

test('rejects an invalid email and does not touch Kit', async () => {
  delete require.cache[require.resolve(handlerPath)];
  const { handler } = require(handlerPath);
  const res = await handler(makeEvent({
    sessionId: 's1', firstName: 'Sarah', email: 'not-an-email', answers: VALID_ANSWERS
  }));
  assert.equal(res.statusCode, 400);
  assert.equal(JSON.parse(res.body).error, 'invalid_email');
});

test('rejects a missing first name', async () => {
  delete require.cache[require.resolve(handlerPath)];
  const { handler } = require(handlerPath);
  const res = await handler(makeEvent({
    sessionId: 's2', firstName: '  ', email: 'sarah@example.com', answers: VALID_ANSWERS
  }));
  assert.equal(res.statusCode, 400);
  assert.equal(JSON.parse(res.body).error, 'missing_name');
});

test('honeypot field silently short-circuits without scoring or Kit calls', async () => {
  delete require.cache[require.resolve(handlerPath)];
  const { handler } = require(handlerPath);
  const res = await handler(makeEvent({
    sessionId: 's3', firstName: 'Bot', email: 'bot@example.com', answers: VALID_ANSWERS, website: 'http://spam.example'
  }));
  assert.equal(res.statusCode, 200);
  const body = JSON.parse(res.body);
  assert.equal(body.skipped, true);
});

test('valid submission recomputes the result server-side and returns it, even with no Kit key configured', async () => {
  delete require.cache[require.resolve(handlerPath)];
  const { handler } = require(handlerPath);
  await withEnv({ KIT_API_KEY: '' }, async () => {
    const res = await handler(makeEvent({
      sessionId: 's4', firstName: 'Sarah', email: 'sarah@example.com', answers: VALID_ANSWERS
    }));
    assert.equal(res.statusCode, 200);
    const body = JSON.parse(res.body);
    assert.equal(body.ok, true);
    assert.equal(body.result.resultKey, 'money_surge');
    assert.equal(body.kitStatus, 'skipped');
  });
});

test('a client-supplied "result" field is ignored — the server always recomputes from answers', async () => {
  delete require.cache[require.resolve(handlerPath)];
  const { handler } = require(handlerPath);
  const res = await handler(makeEvent({
    sessionId: 's5',
    firstName: 'Sarah',
    email: 'sarah2@example.com',
    answers: VALID_ANSWERS, // these answers score as money_surge
    result: 'love_upgrade'  // attacker tries to override the result directly
  }));
  const body = JSON.parse(res.body);
  assert.equal(body.result.resultKey, 'money_surge', 'server must ignore any client-supplied result field');
});

test('Kit failure never blocks the reveal — client still gets its result back', async () => {
  delete require.cache[require.resolve(handlerPath)];
  const originalFetch = global.fetch;
  global.fetch = async () => ({ ok: false, status: 500, json: async () => ({ error: 'boom' }) });

  await withEnv({
    KIT_API_KEY: 'test-key',
    KIT_TAG_UIC_COMPLETED: '111',
    KIT_TAG_MONEY_SURGE: '222',
    KIT_SEQUENCE_MONEY_SURGE: '333'
  }, async () => {
    const { handler } = require(handlerPath);
    const res = await handler(makeEvent({
      sessionId: 's6', firstName: 'Sarah', email: 'sarah3@example.com', answers: VALID_ANSWERS
    }));
    const body = JSON.parse(res.body);
    assert.equal(res.statusCode, 200);
    assert.equal(body.ok, true);
    assert.equal(body.kitStatus, 'failed');
    assert.equal(body.result.resultKey, 'money_surge');
  });

  global.fetch = originalFetch;
});

test('successful Kit sync calls upsert, both tags, and sequence enrollment with the right ids', async () => {
  delete require.cache[require.resolve(handlerPath)];
  const calls = [];
  const originalFetch = global.fetch;
  global.fetch = async (url, opts) => {
    calls.push({ url, body: JSON.parse(opts.body), headers: opts.headers });
    return { ok: true, status: 200, json: async () => ({ subscriber: { id: 1 } }) };
  };

  await withEnv({
    KIT_API_KEY: 'test-key',
    KIT_TAG_UIC_COMPLETED: '111',
    KIT_TAG_MONEY_SURGE: '222',
    KIT_SEQUENCE_MONEY_SURGE: '333'
  }, async () => {
    const { handler } = require(handlerPath);
    const res = await handler(makeEvent({
      sessionId: 's7', firstName: 'Sarah', email: 'sarah4@example.com', answers: VALID_ANSWERS
    }));
    const body = JSON.parse(res.body);
    assert.equal(body.kitStatus, 'synced');
  });

  assert.equal(calls.length, 4, 'expected upsertSubscriber + 2 tag calls + sequence enrollment');
  assert.match(calls[0].url, /\/v4\/subscribers$/);
  assert.equal(calls[0].headers['X-Kit-Api-Key'], 'test-key');
  assert.match(calls[1].url, /\/v4\/tags\/111\/subscribers$/);
  assert.match(calls[2].url, /\/v4\/tags\/222\/subscribers$/);
  assert.match(calls[3].url, /\/v4\/sequences\/333\/subscribers$/);
  assert.equal(calls[3].body.email_address, 'sarah4@example.com');

  global.fetch = originalFetch;
});
