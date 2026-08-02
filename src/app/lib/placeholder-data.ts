// Each JavaScript object in the file represents a table in your database. For example, for the invoices table:

const events = [
    {
        dateTime: "2026-06-18T23:00:00.000Z",
        eventName: "Clase de Bautismo y Disipulado",
        image: null,
        note: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
        ministry: null,
    },
    {
        dateTime: "2026-06-18T23:30:00.000Z",
        eventName: "Baptism and Discipleship Class",
        image: null,
        note: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
        ministry: null,
    },
    {
        dateTime: "2026-06-20T18:00:00.000Z",
        eventName: "Una granita de arena",
        image: "",
        note: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
        ministry: "dorcas",
    },
    {
        dateTime: "2026-06-20T00:00:00.000Z",
        eventName: "Midnight Prayer Vigil",
        image: "https://example.com/images/prayer-vigil.jpg",
        note: "A quiet overnight vigil to pray for the community and ministries. Arrive before midnight to settle in.",
        ministry: "prayer",
    },
    {
        dateTime: "2026-06-20T09:30:00.000Z",
        eventName: "Women’s Breakfast",
        image: null,
        note: "Breakfast fellowship for women of all ages. Bring a friend and a journal.",
        ministry: "women",
    },
    {
        dateTime: "2026-06-20T09:30:00.000Z",
        eventName: "Men’s Leadership Workshop",
        image: "https://example.com/images/leadership-workshop.png",
        note: "A concurrent session for men focused on leadership development and mentoring.",
        ministry: "men",
    },
    {
        dateTime: "2026-06-20T23:59:00.000Z",
        eventName: "End-of-Day Worship Set",
        image: "https://example.com/images/worship-set.png",
        note: "Late-night worship to close the day with music, prayer, and communion.",
        ministry: "music",
    },
    {
        dateTime: "2026-06-21T12:00:00.000Z",
        eventName: "Sunday Service",
        image: "https://example.com/images/sunday-service.jpg",
        note: "Weekly community gathering with worship, announcements, and a message from the pastor.",
        ministry: "worship",
    },
    {
        dateTime: "2026-06-21T12:00:00.000Z",
        eventName: "Children’s Program",
        image: "",
        note: "Children’s activities and lessons run in parallel with the main service.",
        ministry: "children",
    },
    {
        dateTime: "2026-06-22T16:00:00.000Z",
        eventName: "Youth Game Night",
        image: null,
        note: "Games, snacks, and conversation for youth ages 13-18.",
        ministry: "youth",
    },
    {
        dateTime: "2026-06-22T16:00:00.000Z",
        eventName: "Community Outreach Planning",
        image: "https://example.com/images/outreach-planning.png",
        note: "Planning team meets to organize neighborhood outreach and service projects.",
        ministry: "outreach",
    },
    {
        dateTime: "2026-06-23T19:00:00.000Z",
        eventName: "Financial Stewardship Seminar",
        image: null,
        note: "Learn practical budgeting, giving, and stewardship principles from a biblical perspective.",
        ministry: "finance",
    },
    {
        dateTime: "2026-06-24T22:30:00.000Z",
        eventName: "Late Night Discussion",
        image: "https://example.com/images/discussion.jpg",
        note: "Open discussion on faith, doubt, and everyday living. Runs past midnight when needed.",
        ministry: "small-groups",
    },
    {
        dateTime: "2026-06-25T08:00:00.000Z",
        eventName: "Empty Note Test Event",
        image: "",
        note: "",
        ministry: null,
    },
    {
        dateTime: "2026-06-25T08:00:00.000Z",
        eventName: "Duplicate Start Time Rehearsal",
        image: null,
        note: "A second event with the same exact start time to test event collision handling.",
        ministry: "music",
    },
    {
        dateTime: "2026-06-26T14:00:00.000Z",
        eventName: "Long Note Test: Ministry Roundtable",
        image: "https://example.com/images/roundtable.jpg",
        note: "This event has a longer note that includes additional details about speakers, topics, expected attendance, and logistics. It should help test how the UI renders multi-line descriptions and text wrapping across cards or list items.",
        ministry: "leadership",
    }
]

const ministries = [
    {
        name: "dorcas",
        description: "A ministry focused on providing practical help and support to those in need within our community. We organize food drives, clothing donations, and assist with household needs for families facing hardship.",
        image: "https://example.com/images/dorcas.jpg",
        tags: ["alcanze","servicio"],
    },
    {
        name: "jovenes",
        description: "Our youth ministry is dedicated to engaging and mentoring young people in their faith journey. We organize events, study groups, and community service opportunities to help youth grow spiritually and socially.",
        image: "https://example.com/images/jovenes.jpg",
        tags: ["grupo demografico"]
    },
    {
        name: "caballeros",
        tags: ["grupo demografico"]
    },
    {
        name: "damas",
        tags: ["grupo demografico"]
    },
    {
        name: "niños",
        description: "Our children’s ministry is focused on creating a fun and engaging environment for kids to learn about God’s love. We offer Sunday school classes, vacation Bible school, and special events throughout the year.",
        image: "https://example.com/images/ninos.jpg",
        tags: ["grupo demografico"]
    },
    {
        name: "misioneritas",
        description: "",
        image: "https://example.com/images/oracion.jpg",
        tags: ["grupo demografico"]
    },
    {
        name: "Royal Rangers",
        description: "A ministry focused on mentoring boys",
        image: "",
        tags: ["grupo demografico"]
    },
    {
        name: "Ujieres",
        description: "A ministry focused on hospitality and welcoming newcomers to our church. Ujieres serve as greeters, ushers, and hosts during services and events, creating a warm and inviting atmosphere for all attendees.",
        image: "https://example.com/images/ujieres.jpg",
        tags: ["servicio"]
    },
    {
        name: "Diaconos",
        description: "A ministry focused on serving the church community through acts of service, compassion, and support. Diaconos assist with various needs within the church, including helping with events, providing care for members in need, and supporting the overall mission of the church.",
        image: "https://example.com/images/diaconos.jpg",
        tags: ["servicio"]
    },
    {
        name: "Evangelismo",
        description: "A ministry focused on sharing the message of the gospel and reaching out to those who have not yet heard or accepted it. Evangelismo organizes outreach events, evangelistic campaigns, and training sessions to equip members to share their faith effectively.",
        image: "https://example.com/images/evangelismo.jpg",
        tags: ["alcanze"]
    },
    {
        name: "Altar",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image: "https://example.com/images/altar.jpg",
        tags: ["servicio"]  
    }
]