"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, X } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { fetchNamiCalendar, getBlockedDates } from "@/polymet/utils/nami-calendar";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface PropertyBookingCalendarProps {
  onChange?: (checkIn?: Date, checkOut?: Date) => void;
  defaultCheckInDate?: Date;
  defaultCheckOutDate?: Date;
  className?: string;
  propertyId: string;
}

// Hardcoded Airbnb iCal URL - (Keep commented out)
// const AIRBNB_ICAL_URL = "https://www.airbnb.co.uk/calendar/ical/1194779357845731963.ics?s=ca2a7532c96d1edb8cb1a49c80862fd1";

// Helper function to extract hotel ID from URL (re-defined locally)
function extractHotelIdFromUrl(): string | undefined {
  const pathname = window.location.pathname;
  const propertyPathMatch = pathname.match(/\/property\/([^\/]+)/);
  if (propertyPathMatch && propertyPathMatch[1]) {
    return propertyPathMatch[1];
  }
  // Fallback: Check query params if needed
  const urlParams = new URLSearchParams(window.location.search);
  const hotelId = urlParams.get('hotelId');
  if (hotelId) {
    return hotelId;
  }
  return undefined;
}

export default function PropertyBookingCalendar({
  onChange,
  defaultCheckInDate,
  defaultCheckOutDate,
  className,
  propertyId,
}: PropertyBookingCalendarProps) {
  // Extract hotel ID from URL
  const [hotelId, setHotelId] = useState<string | undefined>(extractHotelIdFromUrl());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(defaultCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(defaultCheckOutDate);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarMessage, setCalendarMessage] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);
  const [numNights, setNumNights] = useState(0);
  const [isInitialSelection, setIsInitialSelection] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);
  const [showHotelIdError, setShowHotelIdError] = useState(false);

  // State for dynamic pricing
  const [dynamicPrice, setDynamicPrice] = useState<number | null>(null);
  const [displayPrice, setDisplayPrice] = useState<number | null>(null); // Airbnb's price
  const [actualBasePrice, setActualBasePrice] = useState<number | null>(null); // Our price without taxes
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null); // Final price with taxes
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);

  // Handle check-in date change
  const handleDateSelect = (date: Date | { from?: Date; to?: Date } | undefined) => {
    if (!date) return;
    
    // If we have a date object (single date clicked)
    if (date instanceof Date) {
      // Direct field selection mode
      if (!isInitialSelection) {
        if (selectingCheckIn) {
          setCheckInDate(date);
          // If the new check-in date is after check-out date, clear check-out
          if (checkOutDate && date >= checkOutDate) {
            setCheckOutDate(undefined);
          }
        } else {
          // Selecting check-out date directly
          if (checkInDate && date <= checkInDate) {
            // Can't select a checkout date before checkin
            return;
          }
          
          // Enforce minimum 2-night stay
          if (checkInDate) {
            const nightsSelected = Math.round((date.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
            if (nightsSelected < 2) {
              setCalendarMessage("Minimum 2-night stay required.");
              return;
            }
          }
          
          setCheckOutDate(date);
        }
        // Don't close calendar automatically in direct selection mode
      } 
      // Initial sequential selection mode
      else {
        // If both dates already selected, reset and start over
        if (checkInDate && checkOutDate) {
          setCheckInDate(date);
          setCheckOutDate(undefined);
          return;
        }
        
        // First click or reset just happened
        if (!checkInDate) {
          setCheckInDate(date);
        } 
        // Second click
        else {
          // If selecting a date before check-in, use it as new check-in
          if (date <= checkInDate) {
            setCheckInDate(date);
            setCheckOutDate(undefined);
          } else {
            // Enforce minimum 2-night stay
            const nightsSelected = Math.round((date.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
            if (nightsSelected < 2) {
              setCalendarMessage("Minimum 2-night stay required.");
              return;
            }
            
            setCheckOutDate(date);
          }
        }
      }
    } 
    // If we have a date range object (range selected via drag)
    else if ('from' in date && date.from) {
      // Enforce minimum 2-night stay for range selections
      if (date.from && date.to) {
        const nightsSelected = Math.round((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24));
        if (nightsSelected < 2) {
          setCalendarMessage("Minimum 2-night stay required.");
          return;
        }
      }
      
      setCheckInDate(date.from);
      setCheckOutDate(date.to);
    }
  };

  // Check-in/Check-out selector
  const handleFieldClick = (isCheckIn: boolean) => {
    setIsCalendarOpen(true);
    setSelectingCheckIn(isCheckIn);
    setIsInitialSelection(false); // Switch to direct field selection mode
  };

  // Create a DateRange object for the calendar
  const selectedDateRange = checkInDate 
    ? { from: checkInDate, to: checkOutDate } 
    : undefined;

  // Update hotel ID when URL changes
  useEffect(() => {
    console.log('URL changed, current path:', window.location.pathname);
    console.log('URL search params:', window.location.search);
    
    const extractedHotelId = extractHotelIdFromUrl();
    setHotelId(extractedHotelId);
    setShowHotelIdError(!extractedHotelId);
    console.log(`Hotel ID extracted from URL: ${extractedHotelId || 'not found, showing error'}`);
    
    if (!extractedHotelId) {
      console.error('Hotel ID extraction failed. This will show an error message to the user.');
    }
  }, [window.location.pathname, window.location.search]);

  // Function to fetch price from the API
  const fetchPriceForDates = async (checkIn: Date, checkOut: Date) => {
    if (!hotelId) {
      setPriceError("Hotel ID not found. Cannot fetch pricing information.");
      setIsPriceLoading(false);
      return;
    }

    setIsPriceLoading(true);
    setPriceError(null);
    setDynamicPrice(null); // Clear previous price

    // Fix: Use local date format rather than UTC to prevent date shift
    // Format dates as YYYY-MM-DD preserving the local date values 
    const formatLocalDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const checkInFormatted = formatLocalDate(checkIn);
    const checkOutFormatted = formatLocalDate(checkOut);
    
    console.log(`Local date formatting - Check-in: ${checkInFormatted}, Check-out: ${checkOutFormatted}`);

    // Use hotelId from state, which comes from URL
    const apiUrl = `https://api-nami.lucify.in/api/v1/booking/availability-pricing?hotelId=${hotelId}&checkInAt=${checkInFormatted}&checkOutAt=${checkOutFormatted}`;

    try {
      console.log("Fetching price from:", apiUrl);
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Price API response:", data);

      // Use the complete response format with all price components
      const priceData = data?.data;
      
      if (priceData && priceData.displayPrice) {
        // Store all pricing components in state
        setDisplayPrice(priceData.displayPrice); // Original Airbnb price
        setActualBasePrice(priceData.actualBasePrice); // Our discounted base price
        setDiscountPercentage(priceData.discountPercentage); // % discount we offer
        setTotalPrice(priceData.totalPrice); // Final price with taxes
        
        // For backward compatibility, keep using dynamicPrice
        setDynamicPrice(priceData.totalPrice); // Now using total price (with taxes) as dynamic price
        
        // Store all pricing information in localStorage for booking confirmation page
        localStorage.setItem('bookingDisplayPrice', priceData.displayPrice.toString());
        localStorage.setItem('bookingActualBasePrice', priceData.actualBasePrice.toString());
        localStorage.setItem('bookingDiscountPercentage', priceData.discountPercentage.toString());
        localStorage.setItem('bookingTotalPrice', priceData.totalPrice.toString());
      } else {
        console.error("Price data not found or invalid format in API response:", data);
        throw new Error("Could not retrieve price information.");
      }
    } catch (error) {
      console.error("Error fetching price:", error);
      setPriceError(error instanceof Error ? error.message : "Failed to fetch price.");
    } finally {
      setIsPriceLoading(false);
    }
  };
  
  // Function to load calendar data
  const loadCalendarData = async () => {
    if (!hotelId) {
      setBlockedDates(getPastDates());
      setCalendarMessage("Hotel ID not found. Calendar availability cannot be loaded.");
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setCalendarMessage("Loading availability data...");
    
    try {
      console.log(`Loading calendar data for hotel ID: ${hotelId}`);
      
      // Fetch calendar data from Nami API, passing the hotel ID
      const calendarData = await fetchNamiCalendar(hotelId);
      
      if (!calendarData.success) {
        const errorMessage = calendarData.error || 'Failed to load calendar data';
        setCalendarMessage(`Error: ${errorMessage}`);
        // Fallback to just blocking past dates
        setBlockedDates(getPastDates());
        return;
      }
      
      // Get blocked dates
      const unavailableDates = getBlockedDates(calendarData);
      
      // Set blocked dates state
      setBlockedDates(unavailableDates);
      setCalendarMessage("Select your desired dates.");
      setLastRefreshed(new Date());
      
      console.log(`Calendar data loaded with ${unavailableDates.length} blocked dates`);
    } catch (error) {
      console.error('Error loading calendar data:', error);
      setCalendarMessage("Could not load availability. Using default availability instead.");
      // Fallback to just blocking past dates
      setBlockedDates(getPastDates());
    } finally {
      setIsLoading(false);
    }
  };
  
  // useEffect for initial setup and when hotelId changes
  useEffect(() => {
    loadCalendarData(); // Load calendar data
  }, [hotelId]); // Reload when hotelId changes

  // Update numNights and fetch dynamic price when dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
      setNumNights(nights);
      // Fetch price when both dates are selected
      fetchPriceForDates(checkInDate, checkOutDate);
    } else {
      setNumNights(0);
      // Clear dynamic price if dates are incomplete
      setDynamicPrice(null);
      setPriceError(null);
      setIsPriceLoading(false);
    }
  }, [checkInDate, checkOutDate]);

  // Update parent component when dates change
  useEffect(() => {
    if (onChange) {
      onChange(checkInDate, checkOutDate);
    }
  }, [checkInDate, checkOutDate, onChange]);

  // Handle calendar close
  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
  };
  
  // Clear dates
  const handleClearDates = () => {
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setSelectingCheckIn(true);
  };

  // Function to handle navigation to booking confirmation
  const handleBookingConfirmation = () => {
    // Check if dates, guests, dynamic price, and hotel ID are ready
    if (!hotelId) {
      setCalendarMessage("Hotel ID not found. Cannot proceed with booking.");
      return;
    }

    if (checkInDate && checkOutDate && guestCount > 0 && totalPrice !== null && !isPriceLoading && !priceError) {
      // Format dates as YYYY-MM-DD preserving the local date values
      const formatLocalDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      // Store booking details in localStorage with local date formatting
      localStorage.setItem('bookingCheckIn', formatLocalDate(checkInDate));
      localStorage.setItem('bookingCheckOut', formatLocalDate(checkOutDate));
      localStorage.setItem('bookingGuests', guestCount.toString());
      localStorage.setItem('bookingHotelId', hotelId); // Store hotel ID for confirmation page
      
      // Store the DYNAMIC price (total for the stay) as bookingBasePrice for confirmation page logic
      const nightlyPrice = numNights > 0 ? totalPrice / numNights : 0;
      localStorage.setItem('bookingBasePrice', nightlyPrice.toString());

      // Use propertyId in the navigation path
      window.location.href = `/property/${propertyId}/booking`;
    } else {
      console.error('Booking details incomplete (dates, guests, or price fetching issue), cannot proceed.');
      // Optionally show an error message to the user
      if (priceError) setCalendarMessage(`Error: ${priceError}`);
      else if (isPriceLoading) setCalendarMessage("Still calculating price...");
      else setCalendarMessage("Please select dates and ensure price is loaded.");
    }
  };

  // Function to increment guest count
  const incrementGuests = () => {
    if (guestCount < 10) {
      setGuestCount(prev => prev + 1);
    }
  };

  // Function to decrement guest count
  const decrementGuests = () => {
    if (guestCount > 1) {
      setGuestCount(prev => prev - 1);
    }
  };

  // Check if all required data is selected for booking and hotel ID exists
  const isBookingReady = hotelId && checkInDate && checkOutDate && guestCount > 0 && totalPrice !== null && !isPriceLoading && !priceError;

  // If no hotel ID is found, show an error message instead of the calendar
  if (showHotelIdError) {
    return (
      <div className={`${className} p-6 border rounded-lg bg-red-50 border-red-200`}>
        <div className="text-red-600 font-medium mb-2">Hotel ID Not Found</div>
        <p className="text-gray-700 mb-4">
          Unable to load availability information. The hotel ID parameter is missing from the URL.
        </p>
        <p className="text-sm text-gray-500">
          Please ensure you're accessing this page with a valid hotel ID in the URL.
        </p>
      </div>
    );
  }

  return (
    <div className={`${className} border rounded-lg shadow-lg`}>
      {/* Date Selection */}
      <div className="p-4">
        <div className="flex border rounded-lg mb-4">
          {/* Check-in Button */}
          <button
            className={`flex-1 p-3 text-left ${selectingCheckIn ? 'bg-gray-100' : ''}`}
            onClick={() => {
              setIsCalendarOpen(true);
              setSelectingCheckIn(true);
            }}
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Check-in</div>
            <div className="text-sm">{checkInDate ? format(checkInDate, 'MMM dd, yyyy') : "Select date"}</div>
          </button>
          {/* Vertical divider */}
          <div className="border-l" />
          {/* Check-out Button */}
          <button
            className={`flex-1 p-3 text-left ${!selectingCheckIn ? 'bg-gray-100' : ''}`}
            onClick={() => {
              setIsCalendarOpen(true);
              setSelectingCheckIn(false);
            }}
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Checkout</div>
            <div className="text-sm">{checkOutDate ? format(checkOutDate, 'MMM dd, yyyy') : "Select date"}</div>
          </button>
        </div>

        {/* Guest Selector */}
        <div className="border rounded-lg mb-4">
          <div 
            onClick={() => setIsGuestSelectorOpen(!isGuestSelectorOpen)}
            className="p-3 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
          >
            <div>
              <div className="text-sm font-medium">GUESTS</div>
              <div className="mt-1">
                {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
              </div>
            </div>
            <div className={`transition-transform duration-200 ${isGuestSelectorOpen ? 'rotate-180' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {isGuestSelectorOpen && (
            <div className="p-4 border-t">
              <div className="flex justify-between items-center">
                <span>Guests</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={decrementGuests}
                    disabled={guestCount <= 1}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center ${guestCount <= 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:border-gray-500'}`}
                  >
                    -
                  </button>
                  <span>{guestCount}</span>
                  <button
                    onClick={incrementGuests}
                    disabled={guestCount >= 10}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center ${guestCount >= 10 ? 'text-gray-300 cursor-not-allowed' : 'hover:border-gray-500'}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Price and booking button */}
      <div className="p-4 border-t">
        {/* Display Dynamic Price Info */} 
        {isPriceLoading && (
          <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
            <span>Calculating price...</span>
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}
        {priceError && (
          <div className="flex justify-between items-center mb-2 text-sm text-red-600">
            <span>Error loading price</span>
            {/* Optionally add retry button? */}
          </div>
        )}
        {displayPrice !== null && actualBasePrice !== null && numNights > 0 && (
          <div className="space-y-2">
            {/* Original price (Airbnb price) */}
            <div className="flex justify-between items-center">
              <span>Original price</span>
              <span className={discountPercentage ? "line-through text-gray-500" : ""}>
                ₹{displayPrice.toLocaleString()}
              </span>
            </div>
            
            {/* Our discounted price (if there is a discount) */}
            {discountPercentage && discountPercentage > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span>Our price ({discountPercentage}% off)</span>
                <span>₹{actualBasePrice.toLocaleString()}</span>
              </div>
            )}

            {/* Taxes & fees (difference between actualBasePrice and totalPrice) */}
            {totalPrice && actualBasePrice && totalPrice > actualBasePrice && (
              <div className="flex justify-between items-center text-gray-600 text-sm">
                <span>Taxes & fees</span>
                <span>₹{(totalPrice - actualBasePrice).toLocaleString()}</span>
              </div>
            )}
            
            {/* Total price with taxes */}
            {totalPrice && (
              <div className="flex justify-between items-center font-semibold border-t pt-2 mt-2">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            )}
          </div>
        )}
        
        <button
          onClick={handleBookingConfirmation}
          disabled={!isBookingReady}
          className={`w-full p-3 rounded-lg text-white font-medium transition-colors mt-4 ${isBookingReady ? 'bg-black hover:bg-gray-800' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          {isBookingReady ? 'Reserve' : (isPriceLoading ? 'Calculating...' : (priceError ? 'Try Again Later' : 'Select dates'))}
        </button>
        
        <div className="text-center mt-2 text-sm text-gray-500">
          You won't be charged yet
        </div>
      </div>
      
      {/* Calendar Content - As a fixed overlay */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={handleCalendarClose}>
          <div 
            className="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl w-full m-4 animate-scale-up" 
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside calendar
          >
            {/* Calendar Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">
                  {numNights > 0 ? `${numNights} nights` : "Select dates"}
                </h3>
                <p className="text-sm text-gray-500">
                  {checkInDate && checkOutDate ? 
                    `${format(checkInDate, 'MMM dd, yyyy')} - ${format(checkOutDate, 'MMM dd, yyyy')}` : 
                    "Add your travel dates for exact pricing"}
                </p>
              </div>
              <button className="text-gray-500 hover:text-gray-700" onClick={handleClearDates}>Clear dates</button>
            </div>
            
            {/* Calendar itself */}
            <div className="p-0">
              {isLoading ? (
                <div className="p-6 text-center">Loading availability...</div>
              ) : (
                <>
                  {/* Add message about minimum stay */}
                  <div className="px-4 py-2 text-sm text-gray-600 italic">
                    Note: Minimum 2-night stay required
                  </div>
                  <Calendar
                    mode="range"
                    selected={{ from: checkInDate, to: checkOutDate }}
                    onSelect={(range: Date | DateRange | undefined) => {
                      if (range && typeof range === 'object' && 'from' in range && range.from) {
                        // Enforce minimum 2-night stay
                        if (range.from && range.to) {
                          const nightsSelected = Math.round((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24));
                          if (nightsSelected < 2) {
                            setCalendarMessage("Minimum 2-night stay required.");
                            return;
                          }
                        }
                        
                        setCheckInDate(range.from);
                        setCheckOutDate(range.to);
                        setSelectingCheckIn(false);
                        setIsInitialSelection(false);
                        if (range.to) {
                          setIsCalendarOpen(false);
                        }
                      } else if (range === undefined) {
                        handleClearDates();
                      } else if (range instanceof Date) {
                        setCheckInDate(range);
                        setCheckOutDate(undefined);
                        setSelectingCheckIn(false);
                        setIsInitialSelection(false);
                      }
                    }}
                    blockedDates={blockedDates}
                    className="p-0"
                  />
                </>
              )}
            </div>
            
            {/* Calendar Footer */}
            <div className="p-4 border-t flex justify-end">
              <Button onClick={handleCalendarClose}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Keep the local definition of getPastDates
const getPastDates = (): Date[] => {
  const pastDates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() - 1);
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  while (currentDate >= oneYearAgo) {
    pastDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() - 1);
  }
  return pastDates;
};
