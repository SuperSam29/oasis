import React from 'react';

interface PropertyPriceBreakdownProps {
  basePrice: number;
  nights: number;
  discountPercentage: number;
  totalPrice: number;
}

export default function PropertyPriceBreakdown({
  basePrice,
  nights,
  discountPercentage,
  totalPrice
}: PropertyPriceBreakdownProps) {
  // basePrice here is the display price (what Airbnb would charge)
  const subtotal = basePrice * nights; // Total Airbnb price
  const discountAmount = (subtotal * discountPercentage) / 100; // Discount amount
  const actualBasePrice = subtotal - discountAmount; // Our actual base price after discount
  const taxesAndFees = totalPrice - actualBasePrice; // Taxes calculated on our base price

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>₹{basePrice.toLocaleString()} × {nights} nights</span>
        <span>₹{subtotal.toLocaleString()}</span>
      </div>
      
      {discountPercentage > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Discount ({discountPercentage}%)</span>
          <span>-₹{discountAmount.toLocaleString()}</span>
        </div>
      )}
      
      <div className="flex justify-between text-gray-600 text-sm">
        <span>Taxes &amp; Service Fee</span>
        <span>₹{taxesAndFees.toLocaleString()}</span>
      </div>
      
      <div className="h-px bg-border my-2"></div>
      
      <div className="flex justify-between font-medium">
        <span>Total (₹)</span>
        <span>₹{totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
}
