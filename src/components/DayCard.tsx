import dayjs from "dayjs";

import { CalendarEvent } from "../models/Calendar/Events";

export default function DayCard({
  date,
  events,
}: {
  date: Date;
  events: CalendarEvent[];
}) {
  const dateLabel = dayjs(date).format("dddd, D [de] MMMM");

  return (
    <div
      className="rounded-lg bg-[#f3f4f4] p-6"
      style={{ boxShadow: "0 4px 12px 0 rgba(45, 90, 84, 0.08)" }}
    >
      <p className="font-serif text-3xl font-semibold capitalize text-[#191c1c]">{dateLabel}</p>

      <ul className="mt-4 flex flex-col divide-y divide-[#c0c8c6]">
        {events.map((event) => (
          <li key={event.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt=""
                className="h-[100px] w-[80px] shrink-0 rounded-[5px] object-cover"
              />
            ) : null}

            <div className="min-w-0 flex-1">
              <p className="text-2xl font-normal text-[#191c1c]">{event.title}</p>
              {event.location ? (
                <p className="mt-1 text-base font-normal text-[#404847]">{event.location}</p>
              ) : null}
              {event.description ? (
                <p className="mt-1 max-w-2xl text-base font-normal text-[#404847]">
                  {event.description}
                </p>
              ) : null}
            </div>

            <div className="shrink-0 pt-1 text-xl font-bold text-[#13423d]">
              {dayjs(event.start).format("h:mmA")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
