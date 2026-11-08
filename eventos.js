/* ==========================================================================
   EVENTOS - the only file you edit to add, change or remove events.
   The home page and the Calendario page both read this list. Save the file, upload it, done.

   Each event is one block between { }. Fields:
     fecha            date, written AAAA-MM-DD          (required)  '2026-10-15'
     hora             start time, 24-hour               (optional)  '19:30'
     titulo           title in Spanish                  (required)
     titulo_en        title in English                  (optional, Spanish is used if empty)
     descripcion      short description in Spanish      (optional)
     descripcion_en   short description in English      (optional)
     detalle          small bold line, Spanish          (optional)  'En Vivo & en Persona'
     detalle_en       same line in English              (optional)
     lugar            address or place                  (optional)
     imagen           flyer or photo file name or link  (optional)  'flyer-bautismo.jpg'
     repetir          'semanal' to repeat every week    (optional)
     hasta            last date of a repeating event    (optional)  '2026-12-20'

   Past events disappear by themselves. Repeating events only need to be
   written once, with the date of their first meeting.
   ========================================================================== */

/* Optional: to manage events from a Google Sheet instead, paste the sheet's
   "published CSV" link between the quotes. Leave it empty to use the list below. */
window.EVENTOS_HOJA_URL = '';

window.EVENTOS = [
  {
    fecha: '2026-10-15', hora: '19:00',
    titulo: 'Clase de Bautismo y Discipulado',
    titulo_en: 'Baptism and Discipleship Class',
    descripcion: 'Descripción breve del encuentro.',
    descripcion_en: 'Short description of the gathering.'
  },
  {
    fecha: '2026-10-15', hora: '19:30',
    titulo: 'Clase de Bautismo y Discipulado (Inglés)',
    titulo_en: 'Baptism and Discipleship Class (English)',
    descripcion: 'Descripción breve del encuentro.',
    descripcion_en: 'Short description of the gathering.'
  },
  {
    fecha: '2026-10-15', hora: '19:30',
    titulo: '"Arraigados en Jesús" - Servicio de Jueves',
    titulo_en: '"Rooted in Jesus" - Thursday Service',
    descripcion: 'Descripción breve del encuentro.',
    descripcion_en: 'Short description of the gathering.',
    imagen: 'logo.png'
  },
  {
    fecha: '2026-10-17', hora: '19:00',
    titulo: 'Clase de Bautismo y Discipulado',
    titulo_en: 'Baptism and Discipleship Class',
    descripcion: 'Descripción breve del encuentro.',
    descripcion_en: 'Short description of the gathering.'
  },
  {
    fecha: '2026-10-18', hora: '11:00',
    titulo: 'Día de Pentecostés - Servicio',
    titulo_en: 'Pentecost Day - Service',
    detalle: 'En Vivo & en Persona',
    detalle_en: 'Live & In Person',
    lugar: '3595 Broadway, New York',
    descripcion: 'Descripción breve del encuentro.',
    descripcion_en: 'Short description of the gathering.',
    imagen: 'logo.png'
  },
  {
    fecha: '2026-10-18', hora: '19:30',
    titulo: 'Escuela Dominical - Jóvenes, Damas, Caballeros',
    titulo_en: 'Sunday School - Youth, Women, Men',
    descripcion: 'Descripción breve del encuentro.',
    descripcion_en: 'Short description of the gathering.'
  },
  {
    fecha: '2026-10-20', hora: '19:00', repetir: 'semanal',
    titulo: 'Oración y Estudio Bíblico',
    titulo_en: 'Prayer and Bible Study',
    descripcion: 'Descripción breve del encuentro.',
    descripcion_en: 'Short description of the gathering.'
  },
  {
    fecha: '2026-10-20', hora: '19:30', repetir: 'semanal',
    titulo: 'Royal Rangers Weekly Bible Study',
    descripcion: 'Descripción breve del encuentro.',
    descripcion_en: 'Short description of the gathering.',
    imagen: 'logo.png'
  },
  {
    fecha: '2026-10-20', hora: '19:30', repetir: 'semanal',
    titulo: 'Missioneritas',
    descripcion: 'Descripción breve del encuentro.',
    descripcion_en: 'Short description of the gathering.',
    imagen: 'logo.png'
  }
];
