import { MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyLocationMapSimplifiedProps {
  location: {
    city: string;
    state: string;
    country: string;
    description: string;
  };
  googleMapsUrl?: string;
}

export default function PropertyLocationMapSimplified({
  location,
  googleMapsUrl = "https://maps.app.goo.gl/S9e4x7NnxkBhvEQ28",
}: PropertyLocationMapSimplifiedProps) {
  const handleOpenGoogleMaps = () => {
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Where you'll be
      </h2>
      <p className="text-muted-foreground">
        {location.city}, {location.state}, {location.country}
      </p>

      <div 
        className="relative w-full h-60 md:h-80 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
        onClick={handleOpenGoogleMaps}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-5 bg-white rounded-full shadow-md">
            <MapIcon className="h-10 w-10 text-blue-500" />
          </div>
          <p className="font-medium text-center">
            View on Google Maps
          </p>
        </div>
        
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-sm text-center">
            {location.description}
          </p>
        </div>
      </div>
    </div>
  );
} 