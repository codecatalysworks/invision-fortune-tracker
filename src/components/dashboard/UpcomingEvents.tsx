
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'completion' | 'vote_deadline' | 'payment';
  investmentId?: string;
  investmentType?: string;
}

interface UpcomingEventsProps {
  events: Event[];
  className?: string;
}

export function UpcomingEvents({ events, className }: UpcomingEventsProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const getEventTypeLabel = (type: Event['type']) => {
    switch (type) {
      case 'completion': return 'Investment End';
      case 'vote_deadline': return 'Vote Deadline';
      case 'payment': return 'Payment Due';
      default: return 'Event';
    }
  };
  
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="grow">
        {events.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">No upcoming events</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div 
                key={event.id}
                className="flex items-center gap-3 p-3 hover:bg-accent rounded-md transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5 grow">
                  <p className="text-sm font-medium">{event.title}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{formatDate(event.date)}</span>
                    <span className="mx-2">•</span>
                    <span>{getEventTypeLabel(event.type)}</span>
                  </div>
                </div>
                {event.investmentId && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    asChild
                    className="h-8 w-8"
                  >
                    <Link to={`/investments/${event.investmentType}/${event.investmentId}`}>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link to="/calendar">View Calendar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
