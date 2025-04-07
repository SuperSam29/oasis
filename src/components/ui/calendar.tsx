"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, X, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// Days of week abbreviations
const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

export type CalendarProps = {
  className?: string;
  selected?: Date | DateRange;
  onSelect?: (date: Date | DateRange | undefined) => void;
  mode?: "single" | "range" | "multiple";
  defaultMonth?: Date;
  onDayClick?: (day: Date) => void;
  fromDate?: Date;
  toDate?: Date;
  blockedDates?: Date[];
  onApply?: () => void;
  onClose?: () => void;
  showKeyboard?: boolean;
}

function Calendar({
  className,
  selected,
  onSelect,
  mode = "single",
  defaultMonth = new Date(),
  onDayClick,
  blockedDates = [],
  onApply,
  onClose,
  showKeyboard = false,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(defaultMonth);
  const [error, setError] = React.useState<string | null>(null);
  
  // Type guards
  const isDateRange = (value: any): value is DateRange => {
    return typeof value === 'object' && value !== null && !Array.isArray(value) && ('from' in value || 'to' in value);
  };
  
  // Function to check if a date is blocked (unavailable)
  function isDateBlocked(date: Date, blockedDates?: Date[]) {
    // Block dates in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return true;
    }
    
    if (!blockedDates || blockedDates.length === 0) {
      // If no blocked dates provided, assume date is available (except past dates)
      return false;
    }
    
    // Normalize the date to noon for consistent comparison
    const normalizedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      12, 0, 0
    );
    
    // Check if this date exists in our blocked dates array
    const isBlocked = blockedDates.some(blockedDate => {
      const normalizedBlockedDate = new Date(
        blockedDate.getFullYear(),
        blockedDate.getMonth(),
        blockedDate.getDate(),
        12, 0, 0
      );
      
      return normalizedDate.getTime() === normalizedBlockedDate.getTime();
    });
    
    // Special case: If this is a checkout date selection (not a check-in)
    // We allow the first day of a booking period to be selected as checkout
    if (isBlocked && mode === "range" && isDateRange(selected) && selected.from) {
      // Is the date after the check-in date? (can't check out before checking in)
      if (date > selected.from) {
        // Check if this date is the first day of a booking period
        // by checking if the previous day is NOT blocked
        const previousDay = new Date(date);
        previousDay.setDate(previousDay.getDate() - 1);
        
        // Only check the previous day if it's not in the past
        if (previousDay >= today) {
          // Check if previous day is available (not in blockedDates)
          const isPreviousDayBlocked = blockedDates.some(blockedDate => 
            isSameDay(previousDay, blockedDate)
          );
          
          // If previous day is NOT blocked, this is the first day of a booking period
          // Make it available for checkout
          if (!isPreviousDayBlocked) {
            return false; // Allow it to be selected
          }
        }
      }
    }
    
    return isBlocked;
  }
  
  // Generate days for a given month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDay.getDay();
    
    const daysInMonth = lastDay.getDate();
    
    // Create array for days
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };
  
  // Get month name
  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  // Check if a date is selected (for range selection)
  const isDateSelected = (date: Date) => {
    if (!selected) return false;
    
    if (mode === "single" && selected instanceof Date) {
      return isSameDay(selected, date);
    }
    
    if (mode === "range" && isDateRange(selected)) {
      return (selected.from && isSameDay(selected.from, date)) || 
             (selected.to && isSameDay(selected.to, date));
    }
    
    return false;
  };
  
  // Check if a date is in range (between start and end dates)
  const isDateInRange = (date: Date) => {
    if (mode !== "range" || !selected || selected instanceof Date) return false;
    
    if (isDateRange(selected)) {
      const { from, to } = selected;
      if (!from || !to) return false;
      
      return date > from && date < to;
    }
    
    return false;
  };

  // Check if date is the start of range
  const isRangeStart = (date: Date) => {
    if (mode !== "range" || !selected || selected instanceof Date) return false;
    
    if (isDateRange(selected) && selected.from) {
      return isSameDay(date, selected.from);
    }
    
    return false;
  };
  
  // Check if date is the end of range
  const isRangeEnd = (date: Date) => {
    if (mode !== "range" || !selected || selected instanceof Date) return false;
    
    if (isDateRange(selected) && selected.to) {
      return isSameDay(date, selected.to);
    }
    
    return false;
  };
  
  // Navigate to previous month
  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };
  
  // Navigate to next month
  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };
  
  // Helper function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
  };
  
  // Check if there are blocked dates between two dates
  const hasBlockedDatesBetween = (start: Date, end: Date): boolean => {
    // We're only checking dates strictly between start and end
    const dayAfterStart = new Date(start);
    dayAfterStart.setDate(dayAfterStart.getDate() + 1);
    
    const dayBeforeEnd = new Date(end);
    dayBeforeEnd.setDate(dayBeforeEnd.getDate() - 1);
    
    // If the range is adjacent days, there's nothing between them
    if (dayAfterStart > dayBeforeEnd) {
      return false;
    }
    
    // Check every day in between (excluding start and end dates)
    let currentDate = new Date(dayAfterStart);
    while (currentDate <= dayBeforeEnd) {
      // Check if this date is blocked
      if (blockedDates.some(blockedDate => isSameDay(currentDate, blockedDate))) {
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return false;
  };
  
  // Handle day click
  const handleDayClick = (day: Date) => {
    // Special handling based on what the user is selecting
    if (mode === "range" && isDateRange(selected)) {
      const { from, to } = selected;
      
      // If we've already selected a range, reset to start a new selection
      if (from && to) {
        onSelect?.({ from: day, to: undefined });
        return;
      }
      
      // If we have a check-in date but no check-out date yet
      if (from && !to) {
        // Trying to select a date before check-in? Make it the new check-in
        if (day < from) {
          onSelect?.({ from: day, to: undefined });
          return;
        }
        
        // Is this day blocked? Check if it's the first day of a booking period
        if (isDateBlocked(day, blockedDates)) {
          // Check if it's the first day of a booking period
          const previousDay = new Date(day);
          previousDay.setDate(previousDay.getDate() - 1);
          
          const isPreviousDayBlocked = blockedDates.some(blockedDate => 
            isSameDay(previousDay, blockedDate)
          );
          
          // If previous day is NOT blocked, this is the first day of a booking period
          // Allow it to be selected as checkout
          if (!isPreviousDayBlocked && day > from) {
            onSelect?.({ from, to: day });
            return;
          }
          
          setError("This date is blocked and cannot be selected");
          return;
        }
        
        // Check for blocked dates in between
        if (hasBlockedDatesBetween(from, day)) {
          setError("Cannot select a range with unavailable dates between");
          onSelect?.({ from: day, to: undefined });
        } else {
          // Valid selection
          onSelect?.({ from, to: day });
        }
        return;
      }
    }
      
    // Standard blocking check for new check-in date selection
    if (isDateBlocked(day, blockedDates)) {
      setError("This date is blocked and cannot be selected");
      return;
    }
    
    setError(null);
    
    if (onDayClick) {
      onDayClick(day);
    } else if (onSelect) {
      if (mode === "single") {
        onSelect(day);
      } else if (mode === "range") {
        // Start a new selection
        onSelect({ from: day, to: undefined });
      }
    }
  };
  
  const renderDaysOfWeek = () => {
    return DAYS_OF_WEEK.map((day) => (
      <div
        key={day}
        className="h-9 flex items-center justify-center text-sm font-medium text-gray-500"
      >
        {day}
      </div>
    ));
  };
  
  // Render each calendar day
  const renderDay = (day: Date | null, index: number) => {
    if (!day) {
      return <div key={`empty-${index}`} className="h-10 w-10"></div>;
    }
    
    const isBlocked = isDateBlocked(day, blockedDates);
    const isSelected = isDateSelected(day);
    const isInRange = isDateInRange(day);
    const startDate = isRangeStart(day);
    const endDate = isRangeEnd(day);
    
    const isToday = isSameDay(day, new Date());
    
    return (
      <div 
        key={day.toISOString()} 
        className={cn(
          "h-10 w-10 p-0 relative",
          isInRange && "bg-gray-100",
          startDate && "rounded-l-full",
          endDate && "rounded-r-full"
        )}
      >
        <button
          type="button"
          onClick={() => handleDayClick(day)}
          disabled={isBlocked}
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-gray-200",
            isBlocked 
              ? "text-gray-300 cursor-not-allowed bg-red-50" 
              : startDate || endDate
                ? "bg-black text-white hover:bg-gray-800" 
                : isInRange 
                  ? "hover:bg-gray-300" 
                  : "hover:bg-gray-200",
            isToday && !isSelected && "border border-gray-300",
            isSelected && !startDate && !endDate && "bg-gray-200 font-bold"
          )}
        >
          {day.getDate()}
        </button>
      </div>
    );
  };
  
  // Render the calendar grid for a specific month
  const renderCalendarGrid = (monthOffset: number) => {
    const monthDate = new Date(currentMonth);
    monthDate.setMonth(currentMonth.getMonth() + monthOffset);
    const days = getDaysInMonth(monthDate);
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {renderDaysOfWeek()}
        {days.map((day, index) => renderDay(day, index))}
      </div>
    );
  };
  
  const handleClearDates = () => {
    setError(null);
    if (onSelect) {
      if (mode === "single") {
        onSelect(undefined);
      } else if (mode === "range") {
        onSelect({ from: undefined, to: undefined });
      }
    }
  };
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  
  const handleApply = () => {
    if (onApply) {
      onApply();
    }
  };
  
  // Add debugging for the blockedDates prop to ensure it's being passed correctly
  // Inside the Calendar component, right after destructuring props
  // Log blocked dates when in range mode to help with debugging
  React.useEffect(() => {
    if (mode === "range" && blockedDates && blockedDates.length > 0) {
      console.log(`Calendar received ${blockedDates.length} blocked dates`);
      
      // Log a few samples of April 2025 dates if they exist
      const april2025Dates = blockedDates.filter(
        date => date.getFullYear() === 2025 && date.getMonth() === 3
      );
      
      if (april2025Dates.length > 0) {
        console.log(`Found ${april2025Dates.length} blocked dates in April 2025:`);
        april2025Dates.slice(0, 5).forEach(date => {
          console.log(`- ${date.toISOString().split('T')[0]}`);
        });
        if (april2025Dates.length > 5) {
          console.log(`... and ${april2025Dates.length - 5} more`);
        }
      }
    }
  }, [mode, blockedDates]);

  // Render the month heading and calendar grid
  const renderMonth = (monthOffset: number) => {
    const monthDate = new Date(currentMonth);
    monthDate.setMonth(currentMonth.getMonth() + monthOffset);
    
    return (
      <div>
        <h3 className="text-center font-medium pb-2 mb-1">
          {getMonthName(monthDate)} {monthDate.getFullYear()}
        </h3>
        {renderCalendarGrid(monthOffset)}
      </div>
    );
  };

  return (
    <div 
      className={cn(
        "p-3 bg-white w-full flex flex-col",
        className
      )}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-9 w-9 p-0 rounded-full"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "h-9 w-9 p-0 rounded-full"
            )}
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        <button
          type="button"
          onClick={handleNextMonth}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-9 w-9 p-0 rounded-full"
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
        {renderMonth(0)}
        <div className="hidden md:block">
          {renderMonth(1)}
        </div>
      </div>
      
      {/* Display error message */}
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
      
      {/* Additional buttons */}
      {(onApply || onClose) && (
        <div className="flex justify-end mt-4 gap-3">
          {onApply && (
            <button
              type="button"
              onClick={onApply}
              className={cn(
                "px-4 py-2 bg-black text-white rounded-md text-sm font-medium"
              )}
            >
              Apply
            </button>
          )}
        </div>
      )}
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar }
