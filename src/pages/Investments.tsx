
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { InvestmentCard } from "@/components/dashboard/InvestmentCard";
import { InvestmentTypeIcon } from "@/components/dashboard/InvestmentTypeIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

// Mock data - in a real app, this would come from an API
const mockInvestments = [
  {
    id: '1',
    title: 'Luxury Cabernet Collection',
    type: 'wine' as const,
    amount: 12500,
    profit: 2300,
    profitPercentage: 18.4,
    status: 'active' as const,
    startDate: '2023-06-15',
    endDate: '2024-12-15',
    imageSrc: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
  },
  {
    id: '2',
    title: 'Downtown Apartment',
    type: 'realestate' as const,
    amount: 250000,
    profit: 12000,
    profitPercentage: 4.8,
    status: 'active' as const,
    startDate: '2022-03-10',
    imageSrc: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: '3',
    title: 'Premium Electric Vehicle Fleet',
    type: 'cars' as const,
    amount: 180000,
    profit: -8500,
    profitPercentage: -4.7,
    status: 'active' as const,
    startDate: '2023-01-20',
    endDate: '2024-07-20',
    imageSrc: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: '4',
    title: 'Tech Startup Investment',
    type: 'highrisk' as const,
    amount: 50000,
    status: 'proposed' as const,
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    votes: {
      total: 15,
      positive: 9
    },
    imageSrc: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: '5',
    title: 'Luxury Vacation Rental',
    type: 'rentals' as const,
    amount: 75000,
    profit: 9200,
    profitPercentage: 12.3,
    status: 'active' as const,
    startDate: '2023-04-15',
    imageSrc: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: '6',
    title: 'Fintech SaaS Company',
    type: 'companies' as const,
    amount: 100000,
    status: 'proposed' as const,
    startDate: '2024-07-01',
    endDate: '2026-07-01',
    votes: {
      total: 12,
      positive: 5
    },
    imageSrc: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: '7',
    title: 'Travel Blog Network',
    type: 'websites' as const,
    amount: 35000,
    profit: 4800,
    profitPercentage: 13.7,
    status: 'active' as const,
    startDate: '2023-08-10',
    endDate: '2024-08-10',
    imageSrc: 'https://images.unsplash.com/photo-1581091226033-c6e0f4f4d8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
  },
  {
    id: '8',
    title: 'Château Margaux 2018',
    type: 'wine' as const,
    amount: 28000,
    profit: 3600,
    profitPercentage: 12.9,
    status: 'active' as const,
    startDate: '2022-10-05',
    endDate: '2025-10-05',
    imageSrc: 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
  }
];

const investmentTypes = [
  { value: "all", label: "All Types" },
  { value: "wine", label: "Wine" },
  { value: "realestate", label: "Real Estate" },
  { value: "cars", label: "Cars" },
  { value: "highrisk", label: "High Risk" },
  { value: "rentals", label: "Rentals" },
  { value: "companies", label: "Companies" },
  { value: "websites", label: "Websites" }
];

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "proposed", label: "Proposed" },
  { value: "completed", label: "Completed" }
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "highest", label: "Highest Amount" },
  { value: "lowest", label: "Lowest Amount" },
  { value: "profit", label: "Highest Profit" },
  { value: "loss", label: "Highest Loss" }
];

const Investments = () => {
  const { type } = useParams<{ type?: string }>();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  
  // Filter investments based on URL param and filters
  const filteredInvestments = mockInvestments.filter(investment => {
    // Type filter (from URL)
    if (type && type !== "all" && investment.type !== type) {
      return false;
    }
    
    // Search filter
    if (searchQuery && !investment.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== "all" && investment.status !== statusFilter) {
      return false;
    }
    
    return true;
  });
  
  // Sort investments
  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case "oldest":
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      case "highest":
        return b.amount - a.amount;
      case "lowest":
        return a.amount - b.amount;
      case "profit":
        // If profit is undefined, treat as 0
        const profitA = a.profit || 0;
        const profitB = b.profit || 0;
        return profitB - profitA;
      case "loss":
        // If profit is undefined, treat as 0
        const lossA = a.profit || 0;
        const lossB = b.profit || 0;
        return lossA - lossB;
      default:
        return 0;
    }
  });
  
  // Get the title for the current view
  const getPageTitle = () => {
    if (!type || type === "all") return "All Investments";
    
    const typeInfo = investmentTypes.find(t => t.value === type);
    return typeInfo ? typeInfo.label : "Investments";
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            {type && type !== "all" && (
              <InvestmentTypeIcon type={type as any} size={28} withBackground />
            )}
            <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-card rounded-lg border p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search investments..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {!type && (
              <div className="w-full md:w-[180px]">
                <Select
                  value={type || "all"}
                  onValueChange={(value) => {
                    // This would normally be handled by router navigation
                    // In a real app, use navigate(`/investments/${value === 'all' ? '' : value}`)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {investmentTypes.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="w-full md:w-[180px]">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-[180px]">
              <Select
                value={sortOption}
                onValueChange={setSortOption}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Investment grid */}
        {sortedInvestments.length === 0 ? (
          <div className="bg-card rounded-lg border p-8 text-center">
            <h3 className="text-lg font-medium">No investments found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedInvestments.map((investment) => (
              <InvestmentCard key={investment.id} {...investment} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Investments;
