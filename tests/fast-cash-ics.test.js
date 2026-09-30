const test = require('node:test');
const assert = require('node:assert');
const fn = require('../netlify/functions/fast-cash-ics.js');

function call(query, method) {
  return fn.handler({ httpMethod: method || 'GET', queryStringParameters: query || {} });
}

test('serves a calendar with the right headers', async () => {
  const res = await call({ start: '2026-10-05' });
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.headers['Content-Type'], 'text/calendar; charset=utf-8');
  assert.match(res.headers['Content-Disposition'], /fast-cash-7-days\.ics/);
  assert.match(res.body, /^BEGIN:VCALENDAR\r\n/);
  assert.match(res.body, /END:VCALENDAR\r\n$/);
});

test('has seven events, each with an alarm', async () => {
  const res = await call({ start: '2026-10-05' });
  assert.strictEqual((res.body.match(/BEGIN:VEVENT/g) || []).length, 7);
  assert.strictEqual((res.body.match(/END:VEVENT/g) || []).length, 7);
  assert.strictEqual((res.body.match(/BEGIN:VALARM/g) || []).length, 7);
  assert.strictEqual((res.body.match(/END:VALARM/g) || []).length, 7);
});

test('dates run seven consecutive days from start at the asked time', async () => {
  const res = await call({ start: '2026-10-05', hour: '7', min: '30' });
  const starts = res.body.match(/DTSTART:[0-9T]+/g);
  assert.deepStrictEqual(starts, [
    'DTSTART:20261005T073000', 'DTSTART:20261006T073000', 'DTSTART:20261007T073000',
    'DTSTART:20261008T073000', 'DTSTART:20261009T073000', 'DTSTART:20261010T073000',
    'DTSTART:20261011T073000'
  ]);
  assert.match(res.body, /DTEND:20261005T080000/);
});

test('rolls over a month end', async () => {
  const res = await call({ start: '2026-10-29' });
  const starts = res.body.match(/DTSTART:[0-9T]+/g);
  assert.strictEqual(starts[0], 'DTSTART:20261029T090000');
  assert.strictEqual(starts[6], 'DTSTART:20261104T090000');
});

test('rolls the end time over midnight', async () => {
  const res = await call({ start: '2026-10-05', hour: '23', min: '45' });
  assert.match(res.body, /DTSTART:20261005T234500/);
  assert.match(res.body, /DTEND:20261006T001500/);
});

test('falls back to tomorrow when start is missing or junk', async () => {
  for (const q of [{}, { start: 'soon' }, { start: '2026-13-01' }, { start: '2026-02-30' }]) {
    const res = await call(q);
    const first = res.body.match(/DTSTART:(\d{8})/)[1];
    const t = new Date();
    t.setUTCDate(t.getUTCDate() + 1);
    const want = t.getUTCFullYear() + String(t.getUTCMonth() + 1).padStart(2, '0') + String(t.getUTCDate()).padStart(2, '0');
    assert.strictEqual(first, want, 'start=' + JSON.stringify(q));
  }
});

test('clamps a silly hour back to nine', async () => {
  for (const h of ['99', '-1', 'noon', '9.5']) {
    const res = await call({ start: '2026-10-05', hour: h });
    assert.match(res.body, /DTSTART:20261005T090000/, 'hour=' + h);
  }
});

test('escapes commas and semicolons in text values', async () => {
  const res = await call({ start: '2026-10-05' });
  assert.match(res.body, /DESCRIPTION:Open the door\. Do today/);
  assert.match(res.body, /Small counts\\\. Just do one|Small counts\. Just do one/);
  // every day 7 summary carries the theme, comma free after escaping
  assert.match(res.body, /SUMMARY:Fast Cash Day 7: Celebrate Her/);
  // no bare comma may survive in a TEXT value
  const textLines = res.body.split('\r\n').filter((l) => /^(SUMMARY|DESCRIPTION):/.test(l));
  assert.ok(textLines.length > 0);
  for (const l of textLines) {
    assert.ok(!/(^|[^\\]),/.test(l), 'unescaped comma: ' + l);
  }
});

test('no content line exceeds 75 octets', async () => {
  const res = await call({ start: '2026-10-05' });
  for (const l of res.body.split('\r\n')) {
    assert.ok(Buffer.from(l, 'utf8').length <= 75, 'long line (' + Buffer.from(l, 'utf8').length + '): ' + l);
  }
});

test('unfolds back to readable text', async () => {
  const res = await call({ start: '2026-10-05' });
  const unfolded = res.body.replace(/\r\n /g, '');
  assert.match(unfolded, /DESCRIPTION:Mark it and raise it\. Do today’s ritual/);
  assert.match(unfolded, /https:\/\/manifestwithjac\.com\/fast-cash-7-day-money-challenge/);
});

test('uids are unique per day', async () => {
  const res = await call({ start: '2026-10-05' });
  const uids = res.body.replace(/\r\n /g, '').match(/^UID:.+$/gm);
  assert.strictEqual(uids.length, 7);
  assert.strictEqual(new Set(uids).size, 7);
});

test('HEAD returns headers with no body, other methods are rejected', async () => {
  const head = await call({ start: '2026-10-05' }, 'HEAD');
  assert.strictEqual(head.statusCode, 200);
  assert.strictEqual(head.body, '');
  const post = await call({}, 'POST');
  assert.strictEqual(post.statusCode, 405);
});
