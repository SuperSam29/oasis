"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertyBookingCalendar from "@/polymet/components/property-booking-calendar";
import { BLOCKED_DATES } from "@/polymet/data/blocked-dates";
import { differenceInDays } from "date-fns";
import { Separator } from "@/components/ui/separator";

interface EnhancedPropertyBookingWidgetProps {
  pricing: {
    basePrice: number;
    currency: string;
    includesFees: boolean;
  };
  propertyId: string;
}

export default function EnhancedPropertyBookingWidget({
  pricing,
  propertyId,
}: EnhancedPropertyBookingWidgetProps) {
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState("1");
  const [nightsCount, setNightsCount] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  // Calculate nights count and total price when dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nights = differenceInDays(checkOutDate, checkInDate);
      setNightsCount(nights);
      setTotalPrice(nights * pricing.basePrice);
    } else {
      setNightsCount(null);
      setTotalPrice(null);
    }
  }, [checkInDate, checkOutDate, pricing.basePrice]);

  const handleDateChange = (checkIn?: Date, checkOut?: Date) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
  };

  const handleCheckAvailability = () => {
    console.log("Checking availability for:", {
      checkInDate,
      checkOutDate,
      guests,
      nightsCount,
      totalPrice,
    });
  };

  return (
    <div
      className="border rounded-xl shadow-sm p-6 space-y-4 sticky top-4"
      data-pol-id="gi6wo9"
      data-pol-file-name="enhanced-property-booking-widget"
      data-pol-file-type="component"
    >
      {/* Calendar Component */}
      <PropertyBookingCalendar
        propertyId={propertyId}
        onChange={handleDateChange}
        className="booking-calendar-widget"
      />

      {/* Price Breakdown (shown only when dates are selected) */}
      {nightsCount && totalPrice !== null && (
        <>
          <Separator className="my-4" />
          <div
            className="space-y-2"
            data-pol-id="2x875y"
            data-pol-file-name="enhanced-property-booking-widget"
            data-pol-file-type="component"
          >
            <div
              className="flex justify-between"
              data-pol-id="7o8m7o"
              data-pol-file-name="enhanced-property-booking-widget"
              data-pol-file-type="component"
            >
              <span>
                {pricing.currency}
                {pricing.basePrice} x {nightsCount} nights
              </span>
              <span>
                {pricing.currency}
                {totalPrice.toLocaleString()}
              </span>
            </div>
            {/* Add more details like taxes/fees if needed */}
            <div
              className="flex justify-between font-semibold text-lg pt-2"
              data-pol-id="n9a2o4"
              data-pol-file-name="enhanced-property-booking-widget"
              data-pol-file-type="component"
            >
              <span>Total</span>
              <span>
                {pricing.currency}
                {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
