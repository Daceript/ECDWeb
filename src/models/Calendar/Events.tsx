export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    description?: string;
    location?: string;
    url?: string;
    imageUrl?: string;
    category?: string;
}