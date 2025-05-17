
import { ArrowDown, ArrowRight, ArrowUp, Banknote, Calendar, LineChart, Plus, TrendingUp, UserPlus, Users, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProfitChart } from "@/components/dashboard/ProfitChart";
import { CategoryDistribution } from "@/components/dashboard/CategoryDistribution";
import { InvestmentCard } from "@/components/dashboard/InvestmentCard";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";

// Mock data
const mockProfitData = [
  { name: 'Jan', profit: 12000 },
  { name: 'Feb', profit: 19000 },
  { name: 'Mar', profit: 17000 },
  { name: 'Apr', profit: 21000 },
  { name: 'May', profit: 24000 },
  { name: 'Jun', profit: 28000 },
  { name: 'Jul', profit: 25000 },
  { name: 'Aug', profit: 32000 },
];

const mockCategoryData = [
  { name: 'Wine', value: 50000, color: '#7E2553' },
  { name: 'Real Estate', value: 120000, color: '#5D4037' },
  { name: 'Cars', value: 30000, color: '#1976D2' },
  { name: 'High Risk', value: 15000, color: '#D32F2F' },
  { name: 'Rentals', value: 45000, color: '#388E3C' },
  { name: 'Companies', value: 80000, color: '#303F9F' },
  { name: 'Websites', value: 25000, color: '#00796B' },
];

const mockRecentInvestments = [
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
  }
];

const mockEvents = [
  {
    id: 'e1',
    title: 'Luxury Cabernet Collection Matures',
    date: '2024-12-15',
    type: 'completion' as const,
    investmentId: '1',
    investmentType: 'wine',
  },
  {
    id: 'e2',
    title: 'Tech Startup Investment Vote Deadline',
    date: '2024-06-01',
    type: 'vote_deadline' as const,
    investmentId: '4',
    investmentType: 'highrisk',
  },
  {
    id: 'e3',
    title: 'Downtown Apartment Rental Payment',
    date: '2024-06-05',
    type: 'payment' as const,
    investmentId: '2',
    investmentType: 'realestate',
  }
];

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your investments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link to="/proposals">
                <Vote className="mr-2 h-4 w-4" />
                View Proposals
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin">
                <Plus className="mr-2 h-4 w-4" />
                New Investment
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Investments"
            value="$365,000"
            icon={Banknote}
            description="Across all investment types"
            trend={{ value: 12, isPositive: true }}
          />
          
          <StatCard 
            title="Total Profit"
            value="$38,600"
            icon={TrendingUp}
            description="10.6% return on investment"
            trend={{ value: 3.2, isPositive: true }}
          />
          
          <StatCard 
            title="Active Investments"
            value="8"
            icon={LineChart}
            description="3 ending in the next 30 days"
          />
          
          <StatCard 
            title="Pending Proposals"
            value="3"
            icon={Vote}
            description="1 proposal ending soon"
            trend={{ value: 2, isPositive: false }}
          />
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfitChart 
            data={mockProfitData}
            className="lg:col-span-2"
          />
          <CategoryDistribution 
            data={mockCategoryData} 
          />
        </div>
        
        {/* Recent Investments Row */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Investments</CardTitle>
              <CardDescription>Your latest investment activities</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/investments">
                See All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {mockRecentInvestments.map(investment => (
                <InvestmentCard 
                  key={investment.id}
                  {...investment}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Events Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="md:col-span-1 lg:col-span-1">
            <CardHeader>
              <CardTitle>Investor Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Total Investors</span>
                </div>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserPlus className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>New This Month</span>
                </div>
                <span className="font-bold">2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ArrowUp className="mr-2 h-5 w-5 text-profit-positive" />
                  <span>Top Contributor</span>
                </div>
                <span className="font-bold">$120,000</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ArrowDown className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Avg. Contribution</span>
                </div>
                <span className="font-bold">$30,416</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/admin/investors">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Investors
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <UpcomingEvents 
            events={mockEvents} 
            className="md:col-span-1 lg:col-span-1"
          />
          
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button asChild className="justify-start">
                <Link to="/admin">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Investment
                </Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/admin/investors">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New Investor
                </Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/proposals">
                  <Vote className="mr-2 h-4 w-4" />
                  Vote on Proposals
                </Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/calendar">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
