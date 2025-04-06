"use client";

import PropertyLocationMapSimplified from "@/polymet/components/property-location-map-simplified";

interface PropertyLocationMapWrapperProps {
  location: {
    city: string;
    state: string;
    country: string;
    description: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  googleMapsUrl?: string;
}

export default function PropertyLocationMapWrapper({
  location,
  googleMapsUrl,
}: PropertyLocationMapWrapperProps) {
  // Simplified implementation that always uses the simplified map component
  return (
    <PropertyLocationMapSimplified
      location={location}
      googleMapsUrl={googleMapsUrl}
    />
  );
}
