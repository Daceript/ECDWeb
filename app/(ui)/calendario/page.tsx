import React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'; // Part of MUI X Premium/Pro suites
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SchedulerEvent } from '@mui/x-scheduler/models';

import HeroBanner from '../../components/herobanner';

"use client";
const initialEvents: SchedulerEvent[] = [
    { id: 1, title: 'Team Sync', start: new Date(2026, 5, 15, 10, 0).toISOString(), end: new Date(2026, 5, 15, 11, 30).toISOString() },
    { id: 2, title: 'Product Launch', start: new Date(2026, 5, 18, 14, 0).toISOString(), end: new Date(2026, 5, 18, 15, 0).toISOString() },
];

export default function Page() {

    const [events, setEvents] = React.useState<SchedulerEvent[]>(initialEvents);

    return (

        <html>
        <HeroBanner
            // title={"Bienvenidos a\nIglesia un Encuentro con Dios"}
            churchTitle={true}
            title={<>Calendario</>}
            description="mantengase actualizado de nuestros encuentros!"
        />
        
        {/* Calendario de eventos */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
            // Force the picker to show only the month view
            views={['month']}
            openTo="month"
        />
        </LocalizationProvider>
        </html>

        // card-view of events with image, title, date and description
    );
}
        