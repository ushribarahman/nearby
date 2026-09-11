const events = [
  {
    id: 1,
    type: "event",
    title: "Carpe Diem: The Takeover",
    location: "Aloki, Dhaka",
    date: "17 Oct",
    time: "7:00 PM - 10:00 PM",
    duration: "3 hours",
    image: "https://floral-mountain-2867.fly.storage.tigris.dev/media/events/banner/EVENT-COVER-s1-v2_-_Lovan_Ilya.jpg",
    category: "Music",
    status: "Coming Soon",
    ticketPrice: 1500,
    about: "Join us for an electrifying night of music and entertainment at Carpe Diem: The Takeover. Experience the best of local talent and international vibes.",
    performers: ["Lovan Ilya", "DJ Spark", "The Rhythm Band"],
    schedule: [
      { time: "7:00 PM", activity: "Doors Open" },
      { time: "7:30 PM", activity: "Opening Act" },
      { time: "8:30 PM", activity: "Main Performance" },
      { time: "9:30 PM", activity: "Closing Show" },
      { time: "10:00 PM", activity: "Event Ends" }
    ],
    organizer: {
      name: "Event Management Co.",
      email: "info@eventmanagement.com",
      phone: "+880 1234-567890"
    },
    mapLink: "https://maps.google.com/maps?q=Aloki,Dhaka"
  },
  {
    id: 2,
    type: "event",
    title: "Dhaka Makers presents Crafted By Makers: Workshop Series",
    location: "Shala neighborhood art space, Aloki",
    date: "13 Nov",
    time: "10:00 AM - 4:00 PM",
    duration: "6 hours",
    image: "https://floral-mountain-2867.fly.storage.tigris.dev/media/events/banner/1200x630_-_Dhaka_Makers.jpg",
    category: "Workshop",
    status: "Coming Soon",
    ticketPrice: 0,
    about: "Learn from the best makers in Dhaka at this hands-on workshop series. Perfect for beginners and enthusiasts looking to develop new skills.",
    performers: ["Craft Expert 1", "Craft Expert 2", "Artisan 3"],
    schedule: [
      { time: "10:00 AM", activity: "Registration" },
      { time: "10:30 AM", activity: "Workshop Session 1" },
      { time: "12:30 PM", activity: "Lunch Break" },
      { time: "1:30 PM", activity: "Workshop Session 2" },
      { time: "3:30 PM", activity: "Q&A Session" },
      { time: "4:00 PM", activity: "Event Ends" }
    ],
    organizer: {
      name: "Dhaka Makers",
      email: "contact@dhakamakers.com",
      phone: "+880 1234-567891"
    },
    mapLink: "https://maps.google.com/maps?q=Shala+neighborhood+art+space,Aloki"
  },
  {
    id: 3,
    type: "event",
    title: "X Force presents Indie Fest: Chapter One",
    location: "Chefs Table Courtside, Dhaka",
    date: "03 Aug",
    time: "6:00 PM - 11:00 PM",
    duration: "5 hours",
    image: "https://floral-mountain-2867.fly.storage.tigris.dev/media/events/banner/Tickify_1_-_Micdrop_Experiential.png",
    category: "Music",
    status: "Available",
    ticketPrice: 1000,
    about: "Indie Fest returns with Chapter One featuring the best independent artists. A celebration of music, art, and community.",
    performers: ["Micdrop Experiential", "X Force Band", "Special Guest"],
    schedule: [
      { time: "6:00 PM", activity: "Doors Open" },
      { time: "6:30 PM", activity: "Opening Act" },
      { time: "8:00 PM", activity: "Main Performance" },
      { time: "10:00 PM", activity: "DJ Set" },
      { time: "11:00 PM", activity: "Event Ends" }
    ],
    organizer: {
      name: "X Force Events",
      email: "events@xforce.com",
      phone: "+880 1234-567892"
    },
    mapLink: "https://maps.google.com/maps?q=Chefs+Table+Courtside,Dhaka"
  },
  {
    id: 4,
    type: "event",
    title: "1st National Literature Festival 2026",
    location: "St Joseph international School campus",
    date: "06 Oct",
    time: "9:00 AM - 6:00 PM",
    duration: "9 hours",
    image: "https://floral-mountain-2867.fly.storage.tigris.dev/media/events/slider_banner/WhatsApp_Image_2025-12-22_at_22.30.01_-_Abrar_Khan.jpeg",
    category: "Festival",
    status: "Available",
    ticketPrice: 0,
    about: "The first National Literature Festival brings together authors, poets, and literature enthusiasts for a day of celebration and learning.",
    performers: ["Abrar Khan", "Poet 2", "Author 3"],
    schedule: [
      { time: "9:00 AM", activity: "Opening Ceremony" },
      { time: "10:00 AM", activity: "Poetry Reading" },
      { time: "12:00 PM", activity: "Author Panel Discussion" },
      { time: "2:00 PM", activity: "Book Signing" },
      { time: "4:00 PM", activity: "Closing Session" },
      { time: "6:00 PM", activity: "Event Ends" }
    ],
    organizer: {
      name: "National Literature Foundation",
      email: "info@literaturefest.com",
      phone: "+880 1234-567893"
    },
    mapLink: "https://maps.google.com/maps?q=St+Joseph+international+School+campus"
  }
];

export default events;