"use client";

import HeroBanner from "../../../components/herobanner";

import {
  Calendar,
  dayjsLocalizer,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import dayjs from "dayjs";
import "dayjs/locale/es";

import { CalendarEvent } from "../../../models/Calendar/Events";
import { getEventColor } from "../../../models/Calendar/eventCategoryColors";

import Section from "../../../components/section";

dayjs.locale("es");

const localizer = dayjsLocalizer(dayjs);

const messages = {
  today: "Actual",
  previous: "Anterior",
  next: "Siguiente",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango",
  showMore: (total: number) => `+${total} más`,
};

const today = new Date();

const initialEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Servicio Dominical",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 12, 0),
    location: "Templo Principal",
    description: "Servicio de adoración y predicación de la Palabra.",
    category: "culto",
  },
  {
    id: "2",
    title: "Estudio Bíblico",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 19, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 20, 30),
    location: "Salón de Reuniones B",
    description: "Profundizando en el libro de Romanos.",
    category: "estudio",
  },
  {
    id: "3",
    title: "Reunión de Jóvenes",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 18, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 20, 0),
    location: "Patio de Actividades",
    description: "Noche de juegos, música y reflexión para jóvenes.",
    category: "jovenes",
  },
  {
    id: "4",
    title: "Oración Matutina",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 7, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 8, 0),
    location: "Capilla",
    description: "Tiempo de intercesión y alabanza para comenzar la semana.",
    category: "oracion",
  },
  {
    id: "5",
    title: "Culto de Damas",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10, 15, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10, 17, 0),
    location: "Salón Principal",
    description: "Encuentro mensual del ministerio de mujeres.",
    category: "ministerio",
  },
  {
    id: "6",
    title: "Servicio Dominical",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9, 10, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9, 12, 0),
    location: "Templo Principal",
    description: "Servicio de adoración y predicación de la Palabra.",
    category: "culto",
  },
  {
    id: "7",
    title: "Ensayo del Coro",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12, 18, 30),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12, 20, 0),
    location: "Auditorio",
    description: "Preparación para el culto especial del próximo mes.",
    category: "ensayo",
  },
  {
    id: "8",
    title: "Conferencia de Fe",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14, 9, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14, 17, 0),
    allDay: false,
    location: "Templo Principal",
    description: "Conferencia anual con oradores invitados. Entrada libre.",
    category: "conferencia",
  },
];


export default function EventsCalendar({
  events = initialEvents,
}: {
  events?: CalendarEvent[];
}) {
  const calendarEvents = events.map((event) => ({
    ...event,
    start: event.start instanceof Date ? event.start : new Date(event.start),
    end: event.end instanceof Date ? event.end : new Date(event.end),
  }));

  return (
    <>
      <HeroBanner
        churchTitle={true}
        title={<>Calendario</>}
        description="manténgase actualizado de nuestros encuentros!"
      />

      <section className="container mx-auto px-2 py-4">
        <Calendar
          className="minimal-calendar"
          localizer={localizer}
          messages={messages}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: "min(85vh, 820px)",
            width: "100%",
          }}
          defaultView="month"
          views={["month","week"]}
          popup
          selectable={false}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: getEventColor((event as CalendarEvent).category),
            },
          })}
          onSelectEvent={(event) => {
            console.log("Clicked", event);
          }}
        />
      </section>

      <style jsx global>{`
        .minimal-calendar {
          background: #ffffff;
          border-radius: 16px;
          padding: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
          font-family: inherit;
        }
        .minimal-calendar .rbc-toolbar {
          margin-bottom: 0.75rem;
        }
        .minimal-calendar .rbc-toolbar button {
          color: #374151;
          border: 1px solid #e5e7eb;
          background: transparent;
          border-radius: 8px;
          padding: 0.4rem 0.9rem;
          box-shadow: none;
        }
        .minimal-calendar .rbc-toolbar button:hover {
          background: #f3f4f6;
        }
        .minimal-calendar .rbc-toolbar button.rbc-active {
          background: #111827;
          color: #ffffff;
          border-color: #111827;
        }
        .minimal-calendar .rbc-toolbar-label {
          font-weight: 600;
          color: #111827;
        }
        .minimal-calendar .rbc-month-view,
        .minimal-calendar .rbc-header,
        .minimal-calendar .rbc-day-bg,
        .minimal-calendar .rbc-month-row,
        .minimal-calendar .rbc-off-range-bg {
          border-color: #f0f1f1;
        }
        .minimal-calendar .rbc-header {
          padding: 0.5rem 0;
          font-weight: 500;
          color: #6b7280;
        }
        .minimal-calendar .rbc-today {
          background-color: #f9fafb;
        }
        .minimal-calendar .rbc-event {
          border: none;
          border-radius: 6px;
          padding: 2px 8px;
        }
        .minimal-calendar .rbc-event-label {
          font-size: 0.8rem;
          font-weight: 600;
        }
        .minimal-calendar .rbc-event-content {
          font-size: 0.85rem;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.35;
        }
        .minimal-calendar .rbc-event:focus {
          outline: none;
        }
        .minimal-calendar .rbc-show-more {
          color: #13423d;
          background: transparent;
        }
      `}</style>

        <Section variant="gray"> 
          
        </Section>
    </>
  );
}