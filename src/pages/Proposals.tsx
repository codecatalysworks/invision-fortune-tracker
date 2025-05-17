
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { InvestmentCard } from "@/components/dashboard/InvestmentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, Vote } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - in a real app, this would come from an API
const mockProposals = [
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
    id: '9',
    title: 'Beachfront Rental Property',
    type: 'realestate' as const,
    amount: 350000,
    status: 'proposed' as const,
    startDate: '2024-08-15',
    votes: {
      total: 8,
      positive: 6
    },
    imageSrc: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
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

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "highest", label: "Highest Amount" },
  { value: "lowest", label: "Lowest Amount" },
  { value: "votes", label: "Most Votes" }
];

const Proposals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOption, setSortOption] = useState("votes");
  
  // Filter proposals based on filters
  const filteredProposals = mockProposals.filter(proposal => {
    // Type filter
    if (typeFilter !== "all" && proposal.type !== typeFilter) {
      return false;
    }
    
    // Search filter
    if (searchQuery && !proposal.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sort proposals
  const sortedProposals = [...filteredProposals].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case "oldest":
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      case "highest":
        return b.amount - a.amount;
      case "lowest":
        return a.amount - b.amount;
      case "votes":
        return b.votes!.total - a.votes!.total;
      default:
        return 0;
    }
  });
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Vote className="h-8 w-8" />
            <h1 className="text-3xl font-bold tracking-tight">Investment Proposals</h1>
          </div>
          {/* Admin would see a new proposal button here */}
        </div>
        
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">About Investment Proposals</h2>
          <p className="text-muted-foreground">
            Investment proposals are potential investments that require approval from investors.
            Each proposal is subject to a 1-month voting period. If over 51% of investors vote in favor,
            the proposal becomes an active investment. Otherwise, it is removed from consideration.
          </p>
          <div className="flex items-center gap-2 text-sm bg-accent p-3 rounded-md">
            <Vote className="h-4 w-4 flex-shrink-0" />
            <span>
              You have <strong>3</strong> pending proposals to review and vote on.
            </span>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-card rounded-lg border p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search proposals..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full md:w-[180px]">
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Investment type" />
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
        
        {/* Proposals grid */}
        {sortedProposals.length === 0 ? (
          <div className="bg-card rounded-lg border p-8 text-center">
            <h3 className="text-lg font-medium">No proposals found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedProposals.map((proposal) => (
              <InvestmentCard key={proposal.id} {...proposal} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Proposals;
