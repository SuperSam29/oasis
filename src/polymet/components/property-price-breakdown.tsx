interface PriceBreakdownProps {
  pricing: {
    actualBasePrice?: number;
    displayPrice?: number;
    discountPercentage?: number;
    totalPrice?: number;
    basePrice?: number; // For backward compatibility
    currency: string;
    nights: number;
    taxes?: number; // For backward compatibility
    total?: number; // For backward compatibility
  };
}

export default function PropertyPriceBreakdown({
  pricing,
}: PriceBreakdownProps) {
  // Support both new and old pricing formats
  const { 
    actualBasePrice, displayPrice, discountPercentage, totalPrice, 
    basePrice, currency, nights, taxes, total 
  } = pricing;
  
  // Determine which format we're using
  const isNewFormat = actualBasePrice !== undefined && displayPrice !== undefined;
  
  // Calculate values for display
  const nightlyRate = isNewFormat ? (actualBasePrice! / nights) : (basePrice!);
  const nightlyTotal = isNewFormat ? actualBasePrice! : (basePrice! * nights);
  const finalTotal = isNewFormat ? totalPrice! : total!;
  const discount = isNewFormat && discountPercentage ? (actualBasePrice! * (discountPercentage / 100)) : 0;
  const taxAmount = isNewFormat ? (totalPrice! - displayPrice!) : taxes!;

  return (
    <div
      className="space-y-4"
      data-pol-id="ji7iva"
      data-pol-file-name="property-price-breakdown"
      data-pol-file-type="component"
    >
      <h3
        className="text-lg font-medium"
        data-pol-id="siily0"
        data-pol-file-name="property-price-breakdown"
        data-pol-file-type="component"
      >
        Price details
      </h3>
      <div
        className="space-y-2"
        data-pol-id="kck7d9"
        data-pol-file-name="property-price-breakdown"
        data-pol-file-type="component"
      >
        <div
          className="flex justify-between"
          data-pol-id="r6fxxs"
          data-pol-file-name="property-price-breakdown"
          data-pol-file-type="component"
        >
          <span
            data-pol-id="g449sx"
            data-pol-file-name="property-price-breakdown"
            data-pol-file-type="component"
          >
            {currency}
            {nightlyRate.toLocaleString()} × {nights} nights
          </span>
          <span
            data-pol-id="yf7sgb"
            data-pol-file-name="property-price-breakdown"
            data-pol-file-type="component"
          >
            {currency}
            {nightlyTotal.toLocaleString()}
          </span>
        </div>
        {/* Show discount if using new format */}
        {isNewFormat && discountPercentage && discountPercentage > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discountPercentage}%)</span>
            <span>-{currency}{discount.toLocaleString()}</span>
          </div>
        )}
        <div
          className="flex justify-between"
          data-pol-id="y92qgy"
          data-pol-file-name="property-price-breakdown"
          data-pol-file-type="component"
        >
          <span
            data-pol-id="h63zwo"
            data-pol-file-name="property-price-breakdown"
            data-pol-file-type="component"
          >
            Taxes & Service Fee
          </span>
          <span
            data-pol-id="opj5hf"
            data-pol-file-name="property-price-breakdown"
            data-pol-file-type="component"
          >
            {currency}
            {taxAmount.toLocaleString()}
          </span>
        </div>
        <div
          className="h-px bg-border my-2"
          data-pol-id="0e6ri9"
          data-pol-file-name="property-price-breakdown"
          data-pol-file-type="component"
        />
        <div
          className="flex justify-between font-medium"
          data-pol-id="1yl23n"
          data-pol-file-name="property-price-breakdown"
          data-pol-file-type="component"
        >
          <span
            data-pol-id="sa2vwt"
            data-pol-file-name="property-price-breakdown"
            data-pol-file-type="component"
          >
            Total ({currency})
          </span>
          <span
            data-pol-id="hbw0i8"
            data-pol-file-name="property-price-breakdown"
            data-pol-file-type="component"
          >
            {currency}
            {finalTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
