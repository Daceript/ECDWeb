/* ==========================================================================
   Calendario page. Three parts: menu, language switch, list of events.
   You normally never edit this file. To change events, edit eventos.js.
   ========================================================================== */

/* ---------- 1. Menu (same behavior as the home page) ---------- */
(function () {
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');
  var aboutBtn = document.getElementById('about-btn');
  var sub = document.getElementById('sub-about');

  function setSub(open) {
    aboutBtn.setAttribute('aria-expanded', String(open));
    sub.hidden = !open;
  }

  toggle.addEventListener('click', function () {
    var open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  aboutBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setSub(sub.hidden);
  });

  document.addEventListener('click', function (e) {
    if (!sub.hidden && !sub.contains(e.target)) setSub(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setSub(false);
  });
})();


/* ---------- 2. Language switch (ES | EN) ---------- */
/* The Spanish text is in the HTML; the English text is listed here.
   The chosen language is shared with the home page. */
(function () {
  var EN = {
    brand_aria: 'Iglesia Un Encuentro Con Dios, home',
    menu: 'Menu',
    about: 'About us',
    about1: 'Our story',
    about2: 'Leadership',
    about3: 'What we believe',
    education: 'Education',
    prayer: 'Prayer Requests',
    calendar: 'Calendar',
    cal_h1: 'Calendar',
    cal_sub: 'Stay up to date with our gatherings!',
    copy: '© 2026 Iglesia Un Encuentro Con Dios. All rights reserved.',
    email: 'Email Us!'
  };
  var TITLE_ES = document.title;
  var TITLE_EN = 'Calendar · Iglesia Un Encuentro Con Dios';
  var nodes = document.querySelectorAll('[data-i18n],[data-i18n-aria]');

  nodes.forEach(function (el) {
    if (el.hasAttribute('data-i18n')) el.dataset.es = el.textContent;
    if (el.hasAttribute('data-i18n-aria')) el.dataset.esAria = el.getAttribute('aria-label');
  });

  function apply(lang) {
    var en = lang === 'en';
    nodes.forEach(function (el) {
      if (el.hasAttribute('data-i18n')) el.textContent = en ? EN[el.getAttribute('data-i18n')] : el.dataset.es;
      if (el.hasAttribute('data-i18n-aria')) el.setAttribute('aria-label', en ? EN[el.getAttribute('data-i18n-aria')] : el.dataset.esAria);
    });
    document.title = en ? TITLE_EN : TITLE_ES;
    document.documentElement.lang = en ? 'en' : 'es';   // the events list redraws when this changes
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.lang-switch button');
    if (!b) return;
    apply(b.dataset.lang);
    try { localStorage.setItem('ecd-lang', b.dataset.lang); } catch (err) {}
  });

  var saved = null;
  try { saved = localStorage.getItem('ecd-lang'); } catch (e) {}
  if (saved === 'en') apply('en');
})();


/* ---------- 3. List of events (uses eventos-lib.js) ---------- */
(function () {
  var agenda = document.getElementById('agenda');
  if (!agenda || !window.Eventos) return;

  var events = [];
  var TEXT = {
    es: { today: 'Hoy', empty: 'No hay eventos próximos por el momento. ¡Vuelva pronto!' },
    en: { today: 'Today', empty: 'There are no upcoming events right now. Please check back soon!' }
  };

  function isEnglish() { return document.documentElement.lang === 'en'; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;   // textContent keeps anything typed in a sheet from running as code
    return node;
  }

  function render() {
    var en = isEnglish();
    var loc = en ? 'en-US' : 'es-US';
    var t = TEXT[en ? 'en' : 'es'];
    var items = Eventos.upcoming(events);
    var todayKey = Eventos.dayKey(new Date());
    agenda.innerHTML = '';

    if (!items.length) {
      agenda.appendChild(el('p', 'agenda-vacia', t.empty));
      return;
    }

    var lastKey = '', list = null;
    items.forEach(function (item) {
      var k = Eventos.dayKey(item.date);
      if (k !== lastKey) {
        lastKey = k;
        var group = el('section', 'dia');
        var head = el('div', 'dia-head');
        var tile = el('span', 'dia-tile', String(item.date.getDate()));
        tile.setAttribute('aria-hidden', 'true');
        head.appendChild(tile);
        head.appendChild(el('h2', 'dia-title', cap(new Intl.DateTimeFormat(loc, { weekday: 'long', month: 'long', day: 'numeric' }).format(item.date))));
        if (k === todayKey) head.appendChild(el('span', 'dia-hoy', t.today));
        list = el('ul', 'eventos');
        group.appendChild(head);
        group.appendChild(list);
        agenda.appendChild(group);
      }

      var ev = item.ev;
      var li = el('li', 'evento' + (ev.imagen ? '' : ' sin-imagen'));
      if (ev.imagen) {
        var img = el('img', 'evento-img');
        img.src = ev.imagen;
        img.alt = '';
        img.loading = 'lazy';
        li.appendChild(img);
      }
      var body = el('div', 'evento-body');
      body.appendChild(el('h3', 'evento-titulo', Eventos.pick(ev, 'titulo', en)));
      if (Eventos.pick(ev, 'detalle', en)) body.appendChild(el('p', 'evento-detalle', Eventos.pick(ev, 'detalle', en)));
      if (ev.lugar) body.appendChild(el('p', 'evento-lugar', ev.lugar));
      if (Eventos.pick(ev, 'descripcion', en)) body.appendChild(el('p', 'evento-desc', Eventos.pick(ev, 'descripcion', en)));
      li.appendChild(body);
      var time = Eventos.formatTime(ev.hora);
      if (time) li.appendChild(el('p', 'evento-hora', time));
      list.appendChild(li);
    });
  }

  Eventos.load(function (list) { events = list; render(); });

  // redraw when the visitor switches between Spanish and English
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
