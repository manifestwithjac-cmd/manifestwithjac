// Netlify Function: Fast Cash 7 day reminders
// Path when deployed: /.netlify/functions/fast-cash-ics
//
// Serves the seven daily reminders as a real text/calendar response so a plain
// link adds them to the calendar. The page used to build the file in the
// browser and hand it to an <a download>, which iOS Safari and in app browsers
// ignore outright, so the button did nothing on a phone.
//
// Query params (all optional):
//   start  YYYY-MM-DD, the local date of the day 1 reminder. Default: tomorrow.
//   hour   0-23, the local hour of each reminder. Default: 9.
//   min    0-59, the local minute of each reminder. Default: 0.
//
// Times are written as floating local times on purpose (no TZID, no Z) so 9am
// stays 9am whatever timezone the phone is in.

const DAYS = [
  { theme: 'Get Clear', move: 'Open the door' },
  { theme: 'Clear The Old Story', move: "Collect what you're owed" },
  { theme: 'Open To Receiving', move: 'Let it in' },
  { theme: 'Move Like Her', move: 'The bold move' },
  { theme: 'Already Rich', move: "Spend like there's more" },
  { theme: 'Be Seen', move: 'Show up loud' },
  { theme: 'Celebrate Her', move: 'Mark it and raise it' }
];

const PAGE = 'https://manifestwithjac.com/fast-cash-7-day-money-challenge';

function pad(n) {
  return String(n).padStart(2, '0');
}

// RFC 5545 TEXT escaping. An unescaped comma turns a SUMMARY into a multi value
// list, which strict parsers reject.
function esc(s) {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

// RFC 5545 content lines are limited to 75 octets, continuation lines start
// with a single space.
function fold(line) {
  const bytes = Buffer.from(line, 'utf8');
  if (bytes.length <= 75) return line;
  const out = [];
  let i = 0;
  let limit = 75;
  while (i < bytes.length) {
    let take = Math.min(limit, bytes.length - i);
    // do not split a multi byte character
    while (take > 1 && (bytes[i + take] & 0xc0) === 0x80) take--;
    out.push((i === 0 ? '' : ' ') + bytes.slice(i, i + take).toString('utf8'));
    i += take;
    limit = 74;
  }
  return out.join('\r\n');
}

function parseStart(raw) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(raw || ''));
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  const probe = new Date(Date.UTC(y, mo - 1, d));
  if (probe.getUTCFullYear() !== y || probe.getUTCMonth() !== mo - 1 || probe.getUTCDate() !== d) return null;
  return { y, mo, d };
}

function clampInt(raw, min, max, fallback) {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < min || n > max) return fallback;
  return n;
}

function buildICS(opts) {
  const o = opts || {};
  let start = parseStart(o.start);
  if (!start) {
    const t = new Date();
    t.setUTCDate(t.getUTCDate() + 1);
    start = { y: t.getUTCFullYear(), mo: t.getUTCMonth() + 1, d: t.getUTCDate() };
  }
  const hour = clampInt(o.hour, 0, 23, 9);
  const min = clampInt(o.min, 0, 59, 0);

  const now = new Date();
  const stamp =
    now.getUTCFullYear() + pad(now.getUTCMonth() + 1) + pad(now.getUTCDate()) +
    'T' + pad(now.getUTCHours()) + pad(now.getUTCMinutes()) + pad(now.getUTCSeconds()) + 'Z';
  const seed = o.seed || stamp;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Manifest With Jac//Fast Cash 7 Day//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Fast Cash 7 days'
  ];

  DAYS.forEach(function (day, i) {
    const n = i + 1;
    // step the date in UTC so month ends roll over, then print the parts as a
    // floating local time
    const s = new Date(Date.UTC(start.y, start.mo - 1, start.d));
    s.setUTCDate(s.getUTCDate() + i);
    const date = s.getUTCFullYear() + pad(s.getUTCMonth() + 1) + pad(s.getUTCDate());
    const startAt = date + 'T' + pad(hour) + pad(min) + '00';

    const endMinutes = hour * 60 + min + 30;
    const endDayShift = Math.floor(endMinutes / 1440);
    const e = new Date(Date.UTC(start.y, start.mo - 1, start.d));
    e.setUTCDate(e.getUTCDate() + i + endDayShift);
    const endDate = e.getUTCFullYear() + pad(e.getUTCMonth() + 1) + pad(e.getUTCDate());
    const endAt = endDate + 'T' + pad(Math.floor((endMinutes % 1440) / 60)) + pad(endMinutes % 60) + '00';

    lines.push('BEGIN:VEVENT');
    lines.push('UID:fastcash-day' + n + '-' + seed + '@manifestwithjac.com');
    lines.push('DTSTAMP:' + stamp);
    lines.push(fold('DTSTART:' + startAt));
    lines.push(fold('DTEND:' + endAt));
    lines.push(fold('SUMMARY:' + esc('Fast Cash Day ' + n + ': ' + day.theme)));
    lines.push(fold('DESCRIPTION:' + esc(
      day.move + '. Do today’s ritual and log what came in. Small counts. Just do one.\n\n' + PAGE
    )));
    lines.push(fold('URL:' + PAGE));
    lines.push('BEGIN:VALARM');
    lines.push('ACTION:DISPLAY');
    lines.push('TRIGGER:-PT0S');
    lines.push(fold('DESCRIPTION:' + esc('Fast Cash Day ' + n + ': ' + day.theme)));
    lines.push('END:VALARM');
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}

exports.handler = async (event) => {
  const method = (event && event.httpMethod) || 'GET';
  if (method !== 'GET' && method !== 'HEAD') {
    return { statusCode: 405, headers: { Allow: 'GET, HEAD' }, body: 'Method Not Allowed' };
  }

  const q = (event && event.queryStringParameters) || {};
  const body = buildICS({ start: q.start, hour: q.hour, min: q.min });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="fast-cash-7-days.ics"',
      'Cache-Control': 'no-store'
    },
    body: method === 'HEAD' ? '' : body
  };
};

exports.buildICS = buildICS;
exports.DAYS = DAYS;
