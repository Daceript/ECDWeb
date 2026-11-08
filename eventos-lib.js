/* ==========================================================================
   eventos-lib.js - shared by the home page and the Calendario page.
   It reads the list in eventos.js. You normally never edit this file.
   ========================================================================== */
(function () {
  var DAYS_AHEAD = 30;   // how far ahead weekly events are listed in "upcoming"

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dayKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function today() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }

  // Reads 2026-10-15 or 10/15/2026 (what Google Sheets exports).
  function parseDate(s) {
    s = (s || '').trim();
    var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s);
    if (m) return new Date(+m[3], +m[1] - 1, +m[2]);
    return null;
  }

  // Reads 19:30, 19:30:00 or 7:30 PM. Returns minutes since midnight, or -1.
  function parseTime(s) {
    var m = /^(\d{1,2}):(\d{2})(?::\d{2})?\s*([AaPp][Mm])?$/.exec((s || '').trim());
    if (!m) return -1;
    var h = +m[1];
    if (m[3]) { var pm = m[3].toLowerCase() === 'pm'; h = h % 12 + (pm ? 12 : 0); }
    return h * 60 + +m[2];
  }

  function formatTime(s) {
    var t = parseTime(s);
    if (t < 0) return '';
    var h = Math.floor(t / 60), min = t % 60;
    return (h % 12 || 12) + ':' + pad(min) + ' ' + (h >= 12 ? 'PM' : 'AM');
  }

  // Text of a field in the visitor's language (falls back to Spanish).
  function pick(ev, field, english) {
    return (english && ev[field + '_en']) ? ev[field + '_en'] : (ev[field] || '');
  }

  function isWeekly(ev) { return /^(semanal|weekly)$/i.test((ev.repetir || '').trim()); }

  // Every occurrence between two dates (weekly events are repeated).
  function occurrences(list, from, to) {
    var out = [];
    list.forEach(function (ev) {
      var start = parseDate(ev.fecha);
      if (!start || !ev.titulo) return;
      if (!isWeekly(ev)) {
        if (start >= from && start <= to) out.push({ ev: ev, date: start });
        return;
      }
      var until = parseDate(ev.hasta);
      var end = until && until < to ? until : to;
      var d = start;
      if (d < from) d = addDays(start, 7 * Math.ceil(Math.round((from - start) / 864e5) / 7));
      for (; d <= end; d = addDays(d, 7)) out.push({ ev: ev, date: d });
    });
    return out;
  }

  // Upcoming events, soonest first. Past events are left out.
  function upcoming(list) {
    var t = today();
    var single = list.filter(function (e) { return !isWeekly(e); });
    var weekly = list.filter(isWeekly);
    var out = occurrences(single, t, addDays(t, 3650)).concat(occurrences(weekly, t, addDays(t, DAYS_AHEAD)));
    out.sort(function (a, b) { return (a.date - b.date) || (parseTime(a.ev.hora) - parseTime(b.ev.hora)); });
    return out;
  }

  function parseCSV(text) {
    var rows = [], row = [], cur = '', quoted = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (quoted) {
        if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else quoted = false; }
        else cur += c;
      } else if (c === '"') quoted = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(cur); cur = ''; rows.push(row); row = [];
      } else cur += c;
    }
    if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
    var head = (rows.shift() || []).map(function (h) { return h.trim().toLowerCase(); });
    return rows.filter(function (r) { return r.some(function (x) { return x.trim() !== ''; }); }).map(function (r) {
      var o = {};
      head.forEach(function (h, i) { o[h] = (r[i] || '').trim(); });
      return o;
    });
  }

  // Calls back right away with the list in eventos.js. If a Google Sheet link is set
  // (EVENTOS_HOJA_URL), calls back again with the sheet's events once they arrive.
  function load(callback) {
    callback(window.EVENTOS || []);
    if (window.EVENTOS_HOJA_URL) {
      fetch(window.EVENTOS_HOJA_URL)
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then(function (csv) { callback(parseCSV(csv)); })
        .catch(function () { /* keep the list from eventos.js */ });
    }
  }

  window.Eventos = {
    dayKey: dayKey, addDays: addDays, today: today, parseDate: parseDate, parseTime: parseTime,
    formatTime: formatTime, pick: pick, occurrences: occurrences, upcoming: upcoming, parseCSV: parseCSV, load: load
  };
})();
