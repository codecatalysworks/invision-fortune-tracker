
import { cn } from "@/lib/utils";
import { Building, Car, Home, Hotel, MonitorSmartphone, Package, Wine } from "lucide-react";

type InvestmentType = 'wine' | 'realestate' | 'cars' | 'highrisk' | 'rentals' | 'companies' | 'websites';

interface InvestmentTypeIconProps {
  type: InvestmentType;
  size?: number;
  className?: string;
  withBackground?: boolean;
}

export function InvestmentTypeIcon({ type, size = 24, className, withBackground = false }: InvestmentTypeIconProps) {
  const iconMap = {
    wine: Wine,
    realestate: Home,
    cars: Car,
    highrisk: Package,
    rentals: Hotel,
    companies: Building,
    websites: MonitorSmartphone
  };

  const Icon = iconMap[type];
  
  if (withBackground) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center rounded-full",
          `bg-investment-${type}/10 text-investment-${type}`,
          className
        )}
        style={{ width: size * 2, height: size * 2 }}
      >
        <Icon size={size} />
      </div>
    );
  }
  
  return <Icon size={size} className={cn(`text-investment-${type}`, className)} />;
}
