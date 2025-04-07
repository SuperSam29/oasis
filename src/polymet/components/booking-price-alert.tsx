import { TagIcon } from "lucide-react";
import LowestPriceGuaranteeSeal from "./lowest-price-guarantee-seal";

interface BookingPriceAlertProps {
  message: string;
  subMessage?: string;
  type?: "discount" | "warning" | "info";
  showPriceGuarantee?: boolean;
}

export default function BookingPriceAlert({
  message,
  subMessage,
  type = "discount",
  showPriceGuarantee = false,
}: BookingPriceAlertProps) {
  const getBgColor = () => {
    switch (type) {
      case "discount":
        return "bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-900";
      case "warning":
        return "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900";
      case "info":
        return "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900";
      default:
        return "bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-900";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "discount":
        return "text-pink-500 dark:text-pink-400";
      case "warning":
        return "text-amber-500 dark:text-amber-400";
      case "info":
        return "text-blue-500 dark:text-blue-400";
      default:
        return "text-pink-500 dark:text-pink-400";
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border ${getBgColor()} relative`}
      data-pol-id="womyf1"
      data-pol-file-name="booking-price-alert"
      data-pol-file-type="component"
    >
      {/* Price Guarantee Seal */}
      {showPriceGuarantee && (
        <div className="absolute -top-4 -right-4 w-14 h-14">
          <LowestPriceGuaranteeSeal className="w-full h-full" />
        </div>
      )}
      
      <div
        className="flex gap-3"
        data-pol-id="r5ihzb"
        data-pol-file-name="booking-price-alert"
        data-pol-file-type="component"
      >
        <div
          className={`mt-0.5 ${getIconColor()}`}
          data-pol-id="vfpugg"
          data-pol-file-name="booking-price-alert"
          data-pol-file-type="component"
        >
          <TagIcon
            className="h-5 w-5"
            data-pol-id="ccnalz"
            data-pol-file-name="booking-price-alert"
            data-pol-file-type="component"
          />
        </div>
        <div
          data-pol-id="u78qiz"
          data-pol-file-name="booking-price-alert"
          data-pol-file-type="component"
        >
          <p
            className="font-medium"
            data-pol-id="ttjdac"
            data-pol-file-name="booking-price-alert"
            data-pol-file-type="component"
          >
            {message}
          </p>
          {subMessage && (
            <p
              className="text-sm text-muted-foreground mt-1"
              data-pol-id="uq5u2s"
              data-pol-file-name="booking-price-alert"
              data-pol-file-type="component"
            >
              {subMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
