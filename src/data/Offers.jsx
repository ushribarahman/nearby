const offers = [
  {
    id: 1,
    type: "offer",
    title: "BOGO - Buy One Get One Free",
    location: "Gulshan, Dhaka",
    date: "30 Sep",
    time: "11:00 AM - 9:00 PM",
    duration: "10 hours",
    image: "/offer2.webp",
    category: "Food",
    status: "Active",
    discount: "50% OFF",
    originalPrice: 600,
    offerPrice: 300,
    about: "Enjoy our special Buy One Get One Free offer on all menu items. Perfect for sharing with friends and family!",
    vendors: ["Restaurant A", "Cafe B", "Food Stall C"],
    schedule: [
      { time: "11:00 AM", activity: "Offer Starts" },
      { time: "1:00 PM", activity: "Lunch Rush" },
      { time: "3:00 PM", activity: "Afternoon Special" },
      { time: "7:00 PM", activity: "Dinner Time" },
      { time: "9:00 PM", activity: "Offer Ends" }
    ],
    organizer: {
      name: "Food Plaza",
      description: "Premium dining experience in the heart of Gulshan",
      email: "info@foodplaza.com",
      phone: "+880 1234-567890"
    },
    mapLink: "https://maps.google.com/maps?q=Gulshan,Dhaka"
  },
  {
    id: 2,
    type: "offer",
    title: "Weekend Buffet Special",
    location: "Banani, Dhaka",
    date: "15 Oct",
    time: "12:00 PM - 10:00 PM",
    duration: "10 hours",
    image: "/offer1.jpg",
    category: "Dining",
    status: "Active",
    discount: "30% OFF",
    originalPrice: 2500,
    offerPrice: 1750,
    about: "Indulge in our lavish weekend buffet with a 30% discount. Featuring international cuisines and live cooking stations.",
    vendors: ["Chef Special", "Grill House", "Dessert Bar"],
    schedule: [
      { time: "12:00 PM", activity: "Buffet Opens" },
      { time: "2:00 PM", activity: "Live Cooking Session" },
      { time: "5:00 PM", activity: "Evening Special" },
      { time: "8:00 PM", activity: "Dinner Service" },
      { time: "10:00 PM", activity: "Buffet Closes" }
    ],
    organizer: {
      name: "Grand Dining",
      description: "Luxury dining experience with panoramic views",
      email: "contact@granddining.com",
      phone: "+880 1234-567891"
    },
    mapLink: "https://maps.google.com/maps?q=Banani,Dhaka"
  }
];

export default offers;