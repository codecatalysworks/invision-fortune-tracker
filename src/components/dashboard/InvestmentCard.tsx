
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface InvestmentCardProps {
  id: string;
  title: string;
  type: 'wine' | 'realestate' | 'cars' | 'highrisk' | 'rentals' | 'companies' | 'websites';
  amount: number;
  profit?: number;
  profitPercentage?: number;
  status: 'active' | 'proposed' | 'completed';
  startDate: string;
  endDate?: string;
  votes?: {
    total: number;
    positive: number;
  };
  imageSrc?: string;
}

export function InvestmentCard({
  id,
  title,
  type,
  amount,
  profit,
  profitPercentage,
  status,
  startDate,
  endDate,
  votes,
  imageSrc
}: InvestmentCardProps) {
  // Date formatter
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Calculate vote percentage
  const votePercentage = votes ? Math.round((votes.positive / votes.total) * 100) : 0;
  const isPassing = votePercentage > 50;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="overflow-hidden investment-card">
      {imageSrc && (
        <div className="relative h-40 w-full overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="h-full w-full object-cover transition-transform hover:scale-105" 
          />
          <Badge 
            variant="outline"
            className={cn(
              "absolute top-2 right-2",
              `bg-investment-${type} text-white border-none`
            )}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <Badge 
            variant={
              status === 'active' ? 'default' : 
              status === 'proposed' ? 'outline' : 
              'secondary'
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="mr-1 h-3 w-3" />
          <span>{formatDate(startDate)}</span>
          {endDate && <span> - {formatDate(endDate)}</span>}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Investment:</span>
          <span className="font-semibold">{formatCurrency(amount)}</span>
        </div>
        
        {profit !== undefined && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Profit:</span>
            <span className={cn(
              "font-semibold",
              profit >= 0 ? "text-profit-positive" : "text-profit-negative"
            )}>
              {profit >= 0 ? "+" : ""}{formatCurrency(profit)}
              {profitPercentage !== undefined && (
                <span className="ml-1 text-xs">
                  ({profit >= 0 ? "+" : ""}{profitPercentage}%)
                </span>
              )}
            </span>
          </div>
        )}
        
        {votes && status === 'proposed' && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Votes: {votes.positive} of {votes.total}</span>
              <span className={isPassing ? "text-profit-positive" : "text-profit-negative"}>
                {votePercentage}%
              </span>
            </div>
            <Progress value={votePercentage} className={isPassing ? "bg-profit-positive/20" : "bg-profit-negative/20"} />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/investments/${type}/${id}`}>
            View Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
