// New Base URL for images
const IMAGE_BASE_URL = "/Images";

// Updated helper function to extract category from the directory name
// and format it as a proper title
const getCategoryFromPath = (path: string): string => {
  try {
    const pathParts = path.split('/');
    // The category should be the folder name in the path, which is at index 2 in the path structure
    // Example: "/Images/Living Room/image.webp" -> "Living Room"
    if (pathParts.length >= 3) {
      return pathParts[2]; // Return folder name directly
    }
  } catch (error) {
    console.error("Error parsing path for category:", path, error);
  }
  return "Uncategorized";
};

// Group images by their categories
export const groupImagesByCategory = (images: any[]) => {
  const groupedImages = images.reduce((acc, image) => {
    const category = image.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(image);
    return acc;
  }, {});

  // Convert to array format with category title and images
  return Object.entries(groupedImages).map(([category, images]) => ({
    title: category, // Use the folder name directly as the title
    images,
  }));
};

export const PROPERTY_DATA = {
  id: "prop123",
  title: "Oasis by Altru Living",
  location: {
    city: "Anjuna",
    state: "",
    country: "India",
    description:
      "Located in the heart of Anjuna, close to famous beaches and nightlife.",
    coordinates: { lat: 15.5615, lng: 73.7641 },
  },
  details: {
    type: "Entire apartment",
    guests: 5,
    bedrooms: 2,
    beds: 2,
    baths: 2,
  },
  images: [
    // Living Room
    { id: 1, url: `${IMAGE_BASE_URL}/Living Room/ce1a4454-3fdf-4b6b-81b8-237937478f55 (1).webp`, alt: "Living Room view" },
    { id: 2, url: `${IMAGE_BASE_URL}/Living Room/421697bd-71cc-4d0f-903e-3640d7d7d4bb.webp`, alt: "Living Room view" },
    { id: 3, url: `${IMAGE_BASE_URL}/Living Room/0c632d12-8338-45ec-a0ff-cce2b0404bd2.webp`, alt: "Living Room view" },
    { id: 4, url: `${IMAGE_BASE_URL}/Living Room/bf3379cd-bf35-4342-a2df-b8dc4ca6c0c0.webp`, alt: "Living Room view" },
    { id: 5, url: `${IMAGE_BASE_URL}/Living Room/7632ecb5-a74a-4c0d-8da2-e5c4bc598d1a.webp`, alt: "Living Room view" },
    { id: 6, url: `${IMAGE_BASE_URL}/Living Room/1f376cd7-8b6b-454c-9c93-45f85188a260.webp`, alt: "Living Room view" },
    { id: 7, url: `${IMAGE_BASE_URL}/Living Room/60338f0a-669f-4231-8256-7e8740324820.webp`, alt: "Living Room view" },
    { id: 8, url: `${IMAGE_BASE_URL}/Living Room/eed5225a-892d-4605-b745-c489d2e3c6d5.webp`, alt: "Living Room view" },
    { id: 9, url: `${IMAGE_BASE_URL}/Living Room/0ff30820-5d8f-4fba-8cda-f65ceec68c65.webp`, alt: "Living Room view" },
    { id: 10, url: `${IMAGE_BASE_URL}/Living Room/ac993031-ccab-45a6-8528-5134518f2cb5.webp`, alt: "Living Room view" },
    { id: 11, url: `${IMAGE_BASE_URL}/Living Room/680b6ebe-f911-417e-a646-268cb6fab40b(1).webp`, alt: "Living Room view" },
    { id: 12, url: `${IMAGE_BASE_URL}/Living Room/56e08e4d-a09c-489f-94b4-05d565fc21b8.webp`, alt: "Living Room view" },
    { id: 13, url: `${IMAGE_BASE_URL}/Living Room/ee4d20d8-ac53-43fa-b29d-2f524527d8d1.webp`, alt: "Living Room view" },
    { id: 14, url: `${IMAGE_BASE_URL}/Living Room/55ea10c4-9939-4d94-840b-fa1285a2cbbc.webp`, alt: "Living Room view" },

    // Full Kitchen
    { id: 15, url: `${IMAGE_BASE_URL}/Full Kitchen/e182e7e0-557c-4346-93a2-43205b45eb49.webp`, alt: "Kitchen view" },
    { id: 16, url: `${IMAGE_BASE_URL}/Full Kitchen/aea409f2-9440-4ec4-b107-176a61e6f35d.webp`, alt: "Kitchen view" },

    // Bedroom 1
    { id: 17, url: `${IMAGE_BASE_URL}/Bedroom 1/c3b5c68f-2eb1-4c7c-ac1f-8b15a2bc84ab.webp`, alt: "Bedroom 1 view" },
    { id: 18, url: `${IMAGE_BASE_URL}/Bedroom 1/913f8142-13c4-44b8-95ee-5a4957508165.webp`, alt: "Bedroom 1 view" },
    { id: 19, url: `${IMAGE_BASE_URL}/Bedroom 1/38638835-87a8-40f6-95b2-b58a863dd6bd.webp`, alt: "Bedroom 1 view" },
    { id: 20, url: `${IMAGE_BASE_URL}/Bedroom 1/c5cec610-6ab6-4d97-b4f3-c07484d7b855.webp`, alt: "Bedroom 1 view" },
    { id: 21, url: `${IMAGE_BASE_URL}/Bedroom 1/e1044029-4d25-4761-95e1-5b2c326296c0.webp`, alt: "Bedroom 1 view" },
    { id: 22, url: `${IMAGE_BASE_URL}/Bedroom 1/1ce345fe-775f-40c8-b237-7c2864f057c3.webp`, alt: "Bedroom 1 view" },
    { id: 23, url: `${IMAGE_BASE_URL}/Bedroom 1/7227fc79-8bfa-4957-984a-70a9d629ad2f.webp`, alt: "Bedroom 1 view" },
    { id: 24, url: `${IMAGE_BASE_URL}/Bedroom 1/9190a5d5-c42f-474e-b740-62ae3430deb5.webp`, alt: "Bedroom 1 view" },

    // Bedroom 2
    { id: 25, url: `${IMAGE_BASE_URL}/Bedroom 2/accce727-6874-4aee-b8ca-d9c1115cf9f3.webp`, alt: "Bedroom 2 view" },
    { id: 26, url: `${IMAGE_BASE_URL}/Bedroom 2/71b41d9b-8721-4cfc-ab44-8e5c717a1586.webp`, alt: "Bedroom 2 view" },
    { id: 27, url: `${IMAGE_BASE_URL}/Bedroom 2/7730658f-557a-4c62-bafc-2ed93d36b448.webp`, alt: "Bedroom 2 view" },
    { id: 28, url: `${IMAGE_BASE_URL}/Bedroom 2/349ace0f-04c9-47df-84a3-4a5ea7d3a074.webp`, alt: "Bedroom 2 view" },
    { id: 29, url: `${IMAGE_BASE_URL}/Bedroom 2/077d2e32-ab51-455b-8633-1c2ff69c5c3e.webp`, alt: "Bedroom 2 view" },
    { id: 30, url: `${IMAGE_BASE_URL}/Bedroom 2/88e6a511-cab5-4f43-a83f-192a4117c0e3.webp`, alt: "Bedroom 2 view" },
    { id: 31, url: `${IMAGE_BASE_URL}/Bedroom 2/9fdea526-f58d-4e26-a3c0-1f316abbb959.webp`, alt: "Bedroom 2 view" },

    // Full bathroom 1
    { id: 32, url: `${IMAGE_BASE_URL}/Full bathroom 1/91cdb25b-e2fc-4d33-b394-7a0d7893257c.webp`, alt: "Bathroom 1 view" },
    { id: 33, url: `${IMAGE_BASE_URL}/Full bathroom 1/e6bd625d-edd9-4c1e-b9b5-ec5a3488e262.webp`, alt: "Bathroom 1 view" },
    { id: 34, url: `${IMAGE_BASE_URL}/Full bathroom 1/478bfa7c-f7e9-430d-8065-09f97b6e08f2.webp`, alt: "Bathroom 1 view" },
    { id: 35, url: `${IMAGE_BASE_URL}/Full bathroom 1/93484dd4-b7da-4a94-a043-02ee6a55fae4.webp`, alt: "Bathroom 1 view" },

    // Full bathroom 2
    { id: 36, url: `${IMAGE_BASE_URL}/Full bathroom 2/9988b867-ec4f-44e6-93c8-902587a5e995.webp`, alt: "Bathroom 2 view" },
    { id: 37, url: `${IMAGE_BASE_URL}/Full bathroom 2/47453468-473b-4c3a-9db1-2452d52e4e59.webp`, alt: "Bathroom 2 view" },
    { id: 38, url: `${IMAGE_BASE_URL}/Full bathroom 2/f4e9bcdc-2722-42ed-b5c8-59eb41545fbf.webp`, alt: "Bathroom 2 view" },

    // Pool
    { id: 39, url: `${IMAGE_BASE_URL}/Pool/7f0eb3ad-0fce-42fd-9898-dda0cd52199c.webp`, alt: "Pool view" },
    { id: 40, url: `${IMAGE_BASE_URL}/Pool/fa41863c-3bc2-4d72-a201-15fa2562dee1.avif`, alt: "Pool view" },
    { id: 41, url: `${IMAGE_BASE_URL}/Pool/6ae63fec-83f3-48a7-b956-85a33e20e204.webp`, alt: "Pool view" },

    // Exterior
    { id: 42, url: `${IMAGE_BASE_URL}/Exterior/1abb10f4-25d9-4a50-a7cd-44b975e55262.webp`, alt: "Property exterior" },

  ].map(image => ({ ...image, category: getCategoryFromPath(image.url) })), // Dynamically add category
  pricing: {
    basePrice: 4500,
    currency: "₹",
    includesFees: true,
  },
  amenities: {
    bathroom: [
      "Bath",
      "Hair dryer",
      "Cleaning products",
      "Shampoo",
      "Natural (no harmful Chemicals) conditioner",
      "Natural (no harmful Chemicals) body soap",
      "Hot water",
      "Shower gel",
    ],

    bedroomAndLaundry: [
      "Washing machine",
      "Free dryer – In unit",
      "Hangers",
      "Bed linen",
      "Cotton linen",
      "Extra pillows and blankets",
      "Room-darkening blinds",
      "Iron",
      "Clothes drying rack",
      "Safe",
      "Clothes storage: wardrobe, wardrobe and chest of drawers",
    ],

    entertainment: [
      "TV", 
      "Books and reading material",
      "Cinema",
    ],
    
    family: ["Window guards"],
    
    homeSafety: [
      "Fire extinguisher",
      "First aid kit",
    ],
    
    heatingAndCooling: [
      "AC – split-type ductless system", 
      "Ceiling fan", 
      "Heating"
    ],
    
    internetAndOffice: ["Wifi", "Dedicated workspace"],
    
    kitchenAndDining: [
      "Kitchen",
      "Space where guests can cook their own meals",
      "Samsung refrigerator",
      "Microwave",
      "Cooking basics",
      "Pots and pans, oil, salt and pepper",
      "Dishes and cutlery",
      "Bowls, chopsticks, plates, cups, etc.",
      "Freezer",
      "Cooker",
      "Kettle",
    ],

    locationFeatures: [
      "Launderette nearby",
      "Resort access",
      "Guests can use nearby resort facilities",
    ],
    
    outdoor: [
      "Garden",
      "An open space on the property usually covered in grass",
      "Bikes",
    ],

    parkingAndFacilities: [
      "Free residential garage on premises – 1 space", 
      "Pool",
      "Lift",
      "The home or building has a lift that's at least 52 inches (132cm) deep and a doorway at least 32 inches (81cm) wide",
    ],
    
    services: [
      "Pets allowed",
      "Assistance animals are always allowed",
      "Long-term stays allowed",
      "Allow stays of 28 days or more",
      "Self check-in",
      "Lockbox",
      "Housekeeping available 12 hours a day, every day",
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
    "Free residential garage on premises – 1 space",
    "Pool",
    "TV",
    "Washing machine",
    "Free dryer – In unit",
  ],
};
