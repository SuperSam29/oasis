interface LowestPriceGuaranteeSealProps {
  className?: string;
}

export default function LowestPriceGuaranteeSeal({ className }: LowestPriceGuaranteeSealProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img 
        src="/grunge-red-guarantee-lowest-price-260nw-700809232-removebg-preview.png" 
        alt="Lowest Price Guarantee" 
        className="w-full h-full object-contain"
      />
    </div>
  );
} 