
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { InvestmentTypeIcon } from "@/components/dashboard/InvestmentTypeIcon";

// Mock events data
const mockEvents = [
  {
    id: "e1",
    date: new Date(2023, 6, 5),
    title: "Wine Collection Valuation",
    type: "valuation",
    investment: {
      id: "1",
      title: "Vintage Wine Collection",
      type: "wine",
    },
    description: "Annual valuation of the vintage wine collection by expert sommelier"
  },
  {
    id: "e2",
    date: new Date(2023, 6, 12),
    title: "Real Estate Inspection",
    type: "maintenance",
    investment: {
      id: "2",
      title: "Apartment Rental Property",
      type: "realestate",
    },
    description: "Regular inspection of the rental property"
  },
  {
    id: "e3",
    date: new Date(2023, 6, 20),
    title: "Car Collection Display",
    type: "event",
    investment: {
      id: "3",
      title: "Classic Car Collection",
      type: "cars",
    },
    description: "Public display of the classic car collection at the annual auto show"
  },
  {
    id: "e4",
    date: new Date(2023, 6, 25),
    title: "Investment Proposal Vote Deadline",
    type: "deadline",
    investment: {
      id: "4",
      title: "Tech Startup Investment",
      type: "highrisk",
    },
    description: "Deadline for voting on the tech startup investment proposal"
  },
  {
    id: "e5",
    date: new Date(2023, 6, 15),
    title: "Monthly Rental Income",
    type: "payment",
    investment: {
      id: "5",
      title: "Luxury Vacation Rental",
      type: "rentals",
    },
    description: "Expected monthly income from the luxury vacation rental"
  },
];

// Event types and their colors
const eventTypes = {
  valuation: { label: "Valuation", color: "bg-blue-500" },
  maintenance: { label: "Maintenance", color: "bg-amber-500" },
  event: { label: "Event", color: "bg-green-500" },
  deadline: { label: "Deadline", color: "bg-red-500" },
  payment: { label: "Payment", color: "bg-purple-500" },
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState("month");
  const [filterType, setFilterType] = useState("all");
  
  // Get current month and year
  const currentMonth = date ? date.toLocaleString('default', { month: 'long' }) : '';
  const currentYear = date ? date.getFullYear() : new Date().getFullYear();
  
  // Helper to advance month
  const changeMonth = (increment: number) => {
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + increment);
      setDate(newDate);
    }
  };
  
  // Filter events for the current month and selected type
  const filteredEvents = mockEvents.filter(event => {
    // Type filter
    if (filterType !== "all" && event.type !== filterType) {
      return false;
    }
    
    // Only show events for the current month in month view
    if (selectedView === "month" && date) {
      return (
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
      );
    }
    
    return true;
  });
  
  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return mockEvents.filter(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };
  
  // Custom day render function
  const renderDay = (day: Date) => {
    const events = getEventsForDay(day);
    if (events.length === 0) return null;
    
    return (
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        {events.slice(0, 3).map((event, i) => (
          <div 
            key={event.id}
            className={`${eventTypes[event.type as keyof typeof eventTypes].color} h-1 w-1 rounded-full mx-0.5`} 
          />
        ))}
        {events.length > 3 && (
          <div className="h-1 w-1 rounded-full mx-0.5 bg-gray-400" />
        )}
      </div>
    );
  };
  
  // Format full date
  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              View and manage all investment events and deadlines
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {Object.entries(eventTypes).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>{currentMonth} {currentYear}</CardTitle>
              <CardDescription>Investment calendar</CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>Today</Button>
              <Button variant="outline" size="icon" onClick={() => changeMonth(1)}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="md:grid md:grid-cols-7 gap-6">
              <div className="col-span-5">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="w-full rounded-md border"
                  components={{
                    DayContent: (props) => (
                      <div className="relative h-full w-full p-2">
                        {props.children}
                        {renderDay(props.date)}
                      </div>
                    ),
                  }}
                />
              </div>
              <div className="col-span-2 mt-6 md:mt-0">
                <div className="flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      {date ? formatFullDate(date) : 'Select a date'}
                    </h3>
                    
                    <div className="space-y-2">
                      {date && getEventsForDay(date).length === 0 ? (
                        <p className="text-muted-foreground text-sm">No events scheduled</p>
                      ) : (
                        date && getEventsForDay(date).map(event => (
                          <Card key={event.id} className="overflow-hidden">
                            <div className={`h-1 w-full ${eventTypes[event.type as keyof typeof eventTypes].color}`} />
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{event.title}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                                </div>
                                {event.investment && (
                                  <InvestmentTypeIcon type={event.investment.type as any} size={16} />
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="outline" className="text-xs">{eventTypes[event.type as keyof typeof eventTypes].label}</Badge>
                                <Button variant="ghost" size="sm" className="h-6 px-2">Details</Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>All scheduled events for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <p className="text-muted-foreground">No events found for the selected filters</p>
              ) : (
                filteredEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-4 p-3 rounded-md border hover:bg-muted transition-colors">
                    <div className={`w-3 h-10 rounded-sm ${eventTypes[event.type as keyof typeof eventTypes].color}`} />
                    <div className="min-w-[80px]">
                      <p className="font-medium">{event.date.getDate()}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date.toLocaleString('default', { month: 'short' })}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {event.investment && (
                        <InvestmentTypeIcon type={event.investment.type as any} size={20} />
                      )}
                      <Badge variant="outline">{eventTypes[event.type as keyof typeof eventTypes].label}</Badge>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CalendarPage;
