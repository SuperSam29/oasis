export const PROPERTY_DATA = {
  id: "prop123",
  title: "Elio by Altru Living",
  location: {
    city: "Arpora",
    state: "Goa",
    country: "India",
    description:
      "Located in the heart of Arpora, close to famous beaches and nightlife.",
    coordinates: { lat: 15.5615, lng: 73.7641 },
  },
  details: {
    type: "Entire villa",
    guests: 5,
    bedrooms: 2,
    beds: 2,
    baths: 2,
  },
  images: [
    // Living room
    { id: 1, url: "/Images/_SKR6262-HDR-Edit.jpeg", alt: "Main living area with sofa", category: "Living room" },
    { id: 2, url: "/Images/_SKR6253-HDR-Edit.jpeg", alt: "Living room with TV area", category: "Living room" },
    { id: 3, url: "/Images/_SKR6274-HDR-Edit.jpeg", alt: "Living room with natural light", category: "Living room" },
    { id: 4, url: "/Images/_SKR6292-HDR-Edit.jpeg", alt: "Staircase and living area", category: "Living room" },
    { id: 5, url: "/Images/_SKR6304-HDR-Edit.jpeg", alt: "Open concept living space", category: "Living room" },
    { id: 6, url: "/Images/_SKR6265-HDR-Edit.jpeg", alt: "Comfortable seating area", category: "Living room" },
    { id: 7, url: "/Images/_SKR6277-HDR-Edit.jpeg", alt: "Living room from another angle", category: "Living room" },
    
    // Full kitchen
    { id: 8, url: "/Images/_SKR6337-HDR-Edit.jpeg", alt: "Modern kitchen with appliances", category: "Full kitchen" },
    { id: 9, url: "/Images/_SKR6358-HDR-Edit.jpeg", alt: "Kitchen counter and storage", category: "Full kitchen" },
    { id: 10, url: "/Images/_SKR6376-HDR-Edit.jpeg", alt: "Kitchen from dining area", category: "Full kitchen" },
    { id: 11, url: "/Images/_SKR6394-HDR-Edit.jpeg", alt: "Full view of kitchen", category: "Full kitchen" },
    
    // Bedroom 1
    { id: 12, url: "/Images/_SKR6364-HDR-Edit.jpeg", alt: "Master bedroom with four-poster bed", category: "Bedroom 1" },
    { id: 13, url: "/Images/_SKR6322-HDR-Edit.jpeg", alt: "Bedroom with natural light", category: "Bedroom 1" },
    { id: 14, url: "/Images/_SKR6410-HDR-Edit.jpeg", alt: "Master bedroom view", category: "Bedroom 1" },
    { id: 15, url: "/Images/_SKR6419-HDR-Edit.jpeg", alt: "Bedroom with garden view", category: "Bedroom 1" },
    
    // Bedroom 2
    { id: 16, url: "/Images/_SKR6397-HDR-Edit.jpeg", alt: "Second bedroom with comfortable bed", category: "Bedroom 2" },
    { id: 17, url: "/Images/_SKR6437-HDR-Edit.jpeg", alt: "Second bedroom view", category: "Bedroom 2" },
    { id: 18, url: "/Images/_SKR6449-HDR-Edit.jpeg", alt: "Bedroom with wardrobe", category: "Bedroom 2" },
    
    // Full bathroom 1
    { id: 19, url: "/Images/_SKR6440-HDR-Edit.jpeg", alt: "Modern bathroom with shower", category: "Full bathroom 1" },
    { id: 20, url: "/Images/_SKR6460-HDR-Edit.jpeg", alt: "Bathroom amenities", category: "Full bathroom 1" },
    { id: 21, url: "/Images/_SKR6505-HDR-Edit.jpeg", alt: "Sink and mirror", category: "Full bathroom 1" },
    
    // Full bathroom 2
    { id: 22, url: "/Images/_SKR6493-HDR-Edit.jpeg", alt: "Second bathroom with shower", category: "Full bathroom 2" },
    { id: 23, url: "/Images/_SKR6517-HDR-Edit.jpeg", alt: "Guest bathroom", category: "Full bathroom 2" },
    { id: 24, url: "/Images/_SKR6523-HDR-Edit.jpeg", alt: "Bathroom with toiletries", category: "Full bathroom 2" },
    
    // Additional photos
    { id: 25, url: "/Images/_SKR6547-HDR-Edit.jpeg", alt: "Beautiful pool area", category: "Additional photos" },
    { id: 26, url: "/Images/_SKR6526-HDR-Edit.jpeg", alt: "Outdoor lounge area", category: "Additional photos" },
    { id: 27, url: "/Images/_SKR6538-HDR-Edit.jpeg", alt: "Garden view", category: "Additional photos" },
    { id: 28, url: "/Images/_SKR6562-HDR-Edit.jpeg", alt: "Villa exterior", category: "Additional photos" },
    { id: 29, url: "/Images/_SKR6571-HDR-Edit.jpeg", alt: "Property entrance", category: "Additional photos" },
    { id: 30, url: "/Images/_SKR6583-HDR-Edit.jpeg", alt: "Evening atmosphere", category: "Additional photos" },
    { id: 31, url: "/Images/_SKR6589-HDR-Edit.jpeg", alt: "Villa surroundings", category: "Additional photos" },
    { id: 32, url: "/Images/_SKR6595-HDR-Edit.jpeg", alt: "Tranquil setting", category: "Additional photos" },
    { id: 33, url: "/Images/_SKR6604-HDR-Edit.jpeg", alt: "Outdoor dining", category: "Additional photos" },
    { id: 34, url: "/Images/_SKR6638-HDR-Edit.jpeg", alt: "Evening view", category: "Additional photos" },
  ],
  pricing: {
    basePrice: 4500,
    currency: "₹",
    includesFees: true,
  },
  amenities: {
    bathroom: [
      "Hair dryer",
      "Cleaning products",
      "Shampoo",
      "Conditioner",
      "Body soap",
      "Hot water",
      "Shower gel",
    ],

    bedroomAndLaundry: [
      "Washing machine",
      "Dryer – In unit",
      "Hangers",
      "Bed linen",
      "Cotton linen",
      "Extra pillows and blankets",
      "Iron",
      "Clothes drying rack",
      "Safe",
      "Clothes storage: wardrobe and chest of drawers",
    ],

    entertainment: ["TV", "Books and reading material"],
    family: ["Board games"],
    heatingAndCooling: ["Air conditioning", "Ceiling fan", "Heating"],
    internetAndOffice: ["Wifi", "Dedicated workspace"],
    kitchenAndDining: [
      "Kitchen",
      "Space where guests can cook their own meals",
      "Fridge",
      "Microwave",
      "Cooking basics",
      "Pots and pans, oil, salt and pepper",
      "Dishes and cutlery",
      "Bowls, chopsticks, plates, cups, etc.",
      "Freezer",
      "Kettle",
      "Toaster",
    ],

    locationFeatures: ["Launderette nearby"],
    outdoor: [
      "Shared back garden",
      "An open space on the property usually covered in grass",
      "Outdoor furniture",
      "Outdoor dining area",
      "Sun loungers",
    ],

    parkingAndFacilities: ["Free parking on premises", "Pool"],
    services: [
      "Long-term stays allowed",
      "Allow stays of 28 days or more",
      "Self check-in",
      "Lockbox",
      "Cleaning available during stay",
    ],
  },
  unavailableAmenities: [
    "Exterior security cameras on property",
    "Essentials",
    "Smoke alarm",
    "Carbon monoxide alarm",
  ],

  unavailableNotes: {
    "Smoke alarm":
      "This place may not have a smoke detector. Contact the host with any questions.",
    "Carbon monoxide alarm":
      "This place may not have a carbon monoxide detector. Contact the host with any questions.",
  },
  highlightedAmenities: [
    "Kitchen",
    "Wifi",
    "Dedicated workspace",
    "Free parking on premises",
    "Pool",
    "TV",
    "Washing machine",
    "Dryer – In unit",
  ],
};
