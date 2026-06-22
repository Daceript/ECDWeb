type ISO8601String = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;

export type Event = {
    dateTime: ISO8601String;
    eventName: string;
    image?: string | null;
    note: string;
    ministry?: string;
}

export type Ministry = {
    name: string;
    description: string;
    image: string;
    tags: string[];
}

export type Person = {
    name: string;
    image?: string | null;
    contactInfo: {
        email?: string | null;
        phone?: string | null;
    }
}