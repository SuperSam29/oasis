import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";
import LowestPriceGuaranteeSeal from "./lowest-price-guarantee-seal";

interface PropertyBookingSummaryProps {
  property: {
    id: string;
    title: string;
    details: {
      type: string;
    };
    images: Array<{
      id: number;
      url: string;
      alt: string;
    }>;
  };
  rating?: {
    value: number;
    count: number;
  };
  isSuperhost?: boolean;
  showPriceGuarantee?: boolean;
}

export default function PropertyBookingSummary({
  property,
  rating,
  isSuperhost = false,
  showPriceGuarantee = true,
}: PropertyBookingSummaryProps) {
  return (
    <div
      className="flex flex-col gap-4"
      data-pol-id="rz4jds"
      data-pol-file-name="property-booking-summary"
      data-pol-file-type="component"
    >
      <div
        className="flex gap-4 items-start relative"
        data-pol-id="r1q27d"
        data-pol-file-name="property-booking-summary"
        data-pol-file-type="component"
      >
        <div
          className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0"
          data-pol-id="hhp1jf"
          data-pol-file-name="property-booking-summary"
          data-pol-file-type="component"
        >
          <img
            src={property.images[0].url}
            alt={property.images[0].alt}
            className="object-cover w-full h-full"
            data-pol-id="0jehpl"
            data-pol-file-name="property-booking-summary"
            data-pol-file-type="component"
          />
        </div>
        <div
          className="space-y-1 flex-1"
          data-pol-id="43gvmw"
          data-pol-file-name="property-booking-summary"
          data-pol-file-type="component"
        >
          <div className="flex items-start justify-between">
            <h3
              className="font-medium line-clamp-2"
              data-pol-id="ecaysk"
              data-pol-file-name="property-booking-summary"
              data-pol-file-type="component"
            >
              {property.title}
            </h3>
            
            {/* Price Guarantee Seal - positioned to the right */}
            {showPriceGuarantee && (
              <div className="ml-2 flex-shrink-0">
                <LowestPriceGuaranteeSeal className="w-24 h-24" />
              </div>
            )}
          </div>
          
          <p
            className="text-sm text-muted-foreground"
            data-pol-id="lgspsn"
            data-pol-file-name="property-booking-summary"
            data-pol-file-type="component"
          >
            {property.details.type}
          </p>
          <div
            className="flex items-center gap-2 text-sm"
            data-pol-id="bax0c5"
            data-pol-file-name="property-booking-summary"
            data-pol-file-type="component"
          >
            {rating && (
              <div
                className="flex items-center"
                data-pol-id="awvqe1"
                data-pol-file-name="property-booking-summary"
                data-pol-file-type="component"
              >
                <StarIcon
                  className="h-4 w-4 fill-current"
                  data-pol-id="3o3rpg"
                  data-pol-file-name="property-booking-summary"
                  data-pol-file-type="component"
                />
                <span
                  className="ml-1"
                  data-pol-id="e5t0s6"
                  data-pol-file-name="property-booking-summary"
                  data-pol-file-type="component"
                >
                  {rating.value} ({rating.count} reviews)
                </span>
              </div>
            )}
            {isSuperhost && (
              <>
                <span
                  className="text-muted-foreground"
                  data-pol-id="3tj310"
                  data-pol-file-name="property-booking-summary"
                  data-pol-file-type="component"
                >
                  •
                </span>
                <Badge
                  variant="outline"
                  className="font-normal"
                  data-pol-id="xiejqy"
                  data-pol-file-name="property-booking-summary"
                  data-pol-file-type="component"
                >
                  Superhost
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
