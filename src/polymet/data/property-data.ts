// New Base URL for images
const IMAGE_BASE_URL = "https://ik.imagekit.io/nami/Website%20Pictures";

// Updated helper function to extract category from the full ImageKit URL
const getCategoryFromUrl = (url: string): string => {
  try {
    const urlObject = new URL(url);
    const pathParts = urlObject.pathname.split('/').filter(part => part !== '');
    // Example pathParts: ['nami', 'Website Pictures', 'Category_Name', 'filename.jpeg']
    // We expect the category name to be the second-to-last part
    if (pathParts.length >= 3) {
      let categoryName = pathParts[pathParts.length - 2];
      categoryName = categoryName.replace(/[_\-]/g, ' '); // Replace _ and -
      return decodeURIComponent(categoryName);
    }
  } catch (error) {
    console.error("Error parsing URL for category:", url, error);
  }
  return "Uncategorized";
};

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
    // Update URLs to use IMAGE_BASE_URL
    // Living_Area
    { id: 1, url: `${IMAGE_BASE_URL}/Living_Area/_SKR6277-HDR-Edit.jpeg`, alt: "Living Area view" },
    { id: 2, url: `${IMAGE_BASE_URL}/Living_Area/_SKR6274-HDR-Edit.jpeg`, alt: "Living Area view" },
    { id: 3, url: `${IMAGE_BASE_URL}/Living_Area/_SKR6304-HDR-Edit.jpeg`, alt: "Living Area view" },
    { id: 4, url: `${IMAGE_BASE_URL}/Living_Area/_SKR6337-HDR-Edit.jpeg`, alt: "Living Area view" },
    { id: 5, url: `${IMAGE_BASE_URL}/Living_Area/_SKR6322-HDR-Edit.jpeg`, alt: "Living Area view" },
    { id: 6, url: `${IMAGE_BASE_URL}/Living_Area/_SKR6460-HDR-Edit.jpeg`, alt: "Living Area view" },

    // Kitchen
    { id: 7, url: `${IMAGE_BASE_URL}/Kitchen/_SKR6638-HDR-Edit.jpeg`, alt: "Kitchen view" },
    { id: 8, url: `${IMAGE_BASE_URL}/Kitchen/_SKR6706-Edit.jpeg`, alt: "Kitchen view" },

    // Bedroom_1
    { id: 9, url: `${IMAGE_BASE_URL}/Bedroom_1/_SKR6738-Edit.jpeg`, alt: "Bedroom 1 view" },
    { id: 10, url: `${IMAGE_BASE_URL}/Bedroom_1/_SKR6410-HDR-Edit.jpeg`, alt: "Bedroom 1 view" },
    { id: 11, url: `${IMAGE_BASE_URL}/Bedroom_1/_SKR6437-HDR-Edit.jpeg`, alt: "Bedroom 1 view" },

    // Bedroom_2
    { id: 12, url: `${IMAGE_BASE_URL}/Bedroom_2/_SKR6505-HDR-Edit.jpeg`, alt: "Bedroom 2 view" },
    { id: 13, url: `${IMAGE_BASE_URL}/Bedroom_2/_SKR6538-HDR-Edit.jpeg`, alt: "Bedroom 2 view" },
    { id: 14, url: `${IMAGE_BASE_URL}/Bedroom_2/_SKR6724-Edit.jpeg`, alt: "Bedroom 2 view" },
    { id: 15, url: `${IMAGE_BASE_URL}/Bedroom_2/_SKR6517-HDR-Edit.jpeg`, alt: "Bedroom 2 view" },
    { id: 16, url: `${IMAGE_BASE_URL}/Bedroom_2/_SKR6526-HDR-Edit.jpeg`, alt: "Bedroom 2 view" },

    // Bathroom_1
    { id: 17, url: `${IMAGE_BASE_URL}/Bathroom_1/_SKR6589-HDR-Edit.jpeg`, alt: "Bathroom 1 view" },
    { id: 18, url: `${IMAGE_BASE_URL}/Bathroom_1/_SKR6583-HDR-Edit.jpeg`, alt: "Bathroom 1 view" },
    { id: 19, url: `${IMAGE_BASE_URL}/Bathroom_1/_SKR6571-HDR-Edit.jpeg`, alt: "Bathroom 1 view" },
    { id: 20, url: `${IMAGE_BASE_URL}/Bathroom_1/_SKR6729-Edit.jpeg`, alt: "Bathroom 1 view" },

    // Bathroom_2
    { id: 21, url: `${IMAGE_BASE_URL}/Bathroom_2/_SKR6595-HDR-Edit.jpeg`, alt: "Bathroom 2 view" },
    { id: 22, url: `${IMAGE_BASE_URL}/Bathroom_2/_SKR6604-HDR-Edit.jpeg`, alt: "Bathroom 2 view" },

    // Extra_Property
    { id: 23, url: `${IMAGE_BASE_URL}/Extra_Property/_SKR6675-Edit.jpeg`, alt: "Property exterior/grounds" },
    { id: 24, url: `${IMAGE_BASE_URL}/Extra_Property/_SKR6715-Edit.jpeg`, alt: "Property exterior/grounds" },
    { id: 25, url: `${IMAGE_BASE_URL}/Extra_Property/_SKR6665-Edit.jpeg`, alt: "Property exterior/grounds" },

    // Private_Terrace
    { id: 26, url: `${IMAGE_BASE_URL}/Private_Terrace/_SKR6559-HDR-Edit.jpeg`, alt: "Private Terrace view" },
    { id: 27, url: `${IMAGE_BASE_URL}/Private_Terrace/_SKR6547-HDR-Edit.jpeg`, alt: "Private Terrace view" },
    { id: 28, url: `${IMAGE_BASE_URL}/Private_Terrace/_SKR6765-Edit.jpeg`, alt: "Private Terrace view" },
    { id: 29, url: `${IMAGE_BASE_URL}/Private_Terrace/_SKR6562-HDR-Edit.jpeg`, alt: "Private Terrace view" },

  ].map(image => ({ ...image, category: getCategoryFromUrl(image.url) })), // Dynamically add category
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
