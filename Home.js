/* Language switch. The Spanish text lives in the HTML itself; English is listed here. */
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
      hero_kicker: 'Welcome to',
      hero_tag: 'Where we are all one family in Christ Jesus',
      visit: 'Visit us',
      join: 'Join online',
      essence_title: 'Our essence',
      essence_text: 'This is a short description of who you are as a church: your mission, what unites you, and what first-time visitors can expect.',
      cal_title: 'Our upcoming gatherings',
      cal_full: 'View full calendar',
      month: 'Month',
      event_name: 'Event name',
      event_meta: 'Time · Place',
      photo: 'Photo space',
      newsec: 'Space for a new section',
      copy: '© 2026 Iglesia Un Encuentro Con Dios. All rights reserved.',
      splash: 'Welcome',
      logo_alt: 'Iglesia Un Encuentro Con Dios logo',
      email: 'Email Us!',
      cal_aria: 'Calendar',
      cal_prev: 'Previous month',
      cal_next: 'Next month',
      legend_today: 'Today',
      legend_event: 'Event'
    };
    var nodes = document.querySelectorAll('[data-i18n],[data-i18n-aria],[data-i18n-alt]');
 
    nodes.forEach(function (el) {
      if (el.hasAttribute('data-i18n')) el.dataset.es = el.textContent;
      if (el.hasAttribute('data-i18n-aria')) el.dataset.esAria = el.getAttribute('aria-label');
      if (el.hasAttribute('data-i18n-alt')) el.dataset.esAlt = el.getAttribute('alt');
    });
 
    function apply(lang) {
      var en = lang === 'en';
      nodes.forEach(function (el) {
        if (el.hasAttribute('data-i18n')) el.textContent = en ? EN[el.getAttribute('data-i18n')] : el.dataset.es;
        if (el.hasAttribute('data-i18n-aria')) el.setAttribute('aria-label', en ? EN[el.getAttribute('data-i18n-aria')] : el.dataset.esAria);
        if (el.hasAttribute('data-i18n-alt')) el.setAttribute('alt', en ? EN[el.getAttribute('data-i18n-alt')] : el.dataset.esAlt);
      });
      document.documentElement.lang = en ? 'en' : 'es';
      document.querySelectorAll('.lang-switch button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
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

  /* Upcoming events and mini calendar. Both read the list in eventos.js,
     the same list the Calendario page uses. */
  (function () {
    var list = document.getElementById('home-events');
    var grid = document.getElementById('cal-grid');
    var title = document.getElementById('cal-title');
    if (!window.Eventos || !list || !grid || !title) return;

    var HOME_EVENTS = 5;   // how many upcoming events to show next to the calendar
    var events = [];
    var today = new Date();
    var view = new Date(today.getFullYear(), today.getMonth(), 1);

    var TEXT = {
      es: { empty: 'No hay eventos próximos por el momento.', event: ['evento', 'eventos'] },
      en: { empty: 'There are no upcoming events right now.', event: ['event', 'events'] }
    };

    function isEnglish() { return document.documentElement.lang === 'en'; }
    function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
    function el(tag, cls, text) {
      var node = document.createElement(tag);
      if (cls) node.className = cls;
      if (text) node.textContent = text;
      return node;
    }

    /* Next events, as cards */
    function renderEvents() {
      var en = isEnglish();
      var loc = en ? 'en-US' : 'es-US';
      var items = Eventos.upcoming(events).slice(0, HOME_EVENTS);
      list.innerHTML = '';

      if (!items.length) {
        list.appendChild(el('li', 'events-vacio', TEXT[en ? 'en' : 'es'].empty));
        return;
      }
      items.forEach(function (item) {
        var ev = item.ev;
        var li = el('li', 'event');
        var date = el('div', 'event-date');
        date.appendChild(el('small', '', new Intl.DateTimeFormat(loc, { month: 'short' }).format(item.date).replace('.', '')));
        date.appendChild(el('strong', '', String(item.date.getDate())));
        var info = el('div', 'event-info');
        info.appendChild(el('h3', '', Eventos.pick(ev, 'titulo', en)));
        var meta = [Eventos.formatTime(ev.hora), ev.lugar].filter(Boolean).join(' · ');
        if (meta) info.appendChild(el('p', '', meta));
        li.appendChild(date);
        li.appendChild(info);
        list.appendChild(li);
      });
    }

    /* Month grid; days with an event are highlighted */
    function renderCalendar() {
      var en = isEnglish();
      var loc = en ? 'en-US' : 'es-US';
      var y = view.getFullYear(), m = view.getMonth();
      var days = new Date(y, m + 1, 0).getDate();
      var count = {};
      Eventos.occurrences(events, new Date(y, m, 1), new Date(y, m, days)).forEach(function (o) {
        var d = o.date.getDate();
        count[d] = (count[d] || 0) + 1;
      });

      title.textContent = cap(new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric' }).format(view));
      grid.innerHTML = '';

      for (var i = 0; i < 7; i++) {
        var dow = el('span', 'cal-dow', cap(new Intl.DateTimeFormat(loc, { weekday: 'short' }).format(new Date(2023, 0, 1 + i)).replace('.', '')));
        dow.setAttribute('aria-hidden', 'true');
        grid.appendChild(dow);
      }
      for (var b = 0; b < new Date(y, m, 1).getDay(); b++) grid.appendChild(el('span', 'cal-cell cal-blank'));

      for (var d = 1; d <= days; d++) {
        var isToday = d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
        var cell = el('span', 'cal-cell' + (count[d] ? ' cal-event' : '') + (isToday ? ' cal-today' : ''), String(d));
        var label = new Intl.DateTimeFormat(loc, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date(y, m, d));
        if (isToday) label += en ? ', today' : ', hoy';
        if (count[d]) label += ', ' + count[d] + ' ' + TEXT[en ? 'en' : 'es'].event[count[d] === 1 ? 0 : 1];
        cell.setAttribute('aria-label', label);
        grid.appendChild(cell);
      }
    }

    function render() { renderEvents(); renderCalendar(); }

    document.getElementById('cal-prev').addEventListener('click', function () { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); renderCalendar(); });
    document.getElementById('cal-next').addEventListener('click', function () { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); renderCalendar(); });

    Eventos.load(function (l) { events = l; render(); });

    // redraw when the visitor switches between Spanish and English
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  })();