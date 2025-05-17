
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightCircle, CircleDollarSign, Clock, Package, PieChart, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InvestmentCard } from "@/components/dashboard/InvestmentCard";
import { Link } from "react-router-dom";
import { ProfitChart } from "@/components/dashboard/ProfitChart";
import { CategoryDistribution } from "@/components/dashboard/CategoryDistribution";
import { StatCard } from "@/components/dashboard/StatCard";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";

// Mock data
const mockInvestments = [
  {
    id: '1',
    title: 'Vintage Wine Collection',
    type: 'wine' as const,
    amount: 25000,
    profit: 5000,
    status: 'active' as const,
    profitability: 20,
    imageSrc: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '2',
    title: 'Apartment Rental Property',
    type: 'realestate' as const,
    amount: 200000,
    profit: 15000,
    status: 'active' as const,
    profitability: 7.5,
    imageSrc: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80'
  },
  {
    id: '3',
    title: 'Classic Car Collection',
    type: 'cars' as const,
    amount: 150000,
    profit: 30000,
    status: 'active' as const,
    profitability: 20,
    imageSrc: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1152&q=80'
  }
];

const InvestorDashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Investor Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your investments
            </p>
          </div>
          <Button asChild>
            <Link to="/proposals">
              <Package className="mr-2 h-4 w-4" />
              View Proposals
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Investment"
            value="$375,000"
            description="+12% from last month"
            icon={<CircleDollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          
          <StatCard
            title="Total Profit"
            value="$45,000"
            description="+5.2% from last month"
            icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
          />
          
          <StatCard
            title="ROI"
            value="12%"
            description="Annualized return"
            icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Portfolio Growth</CardTitle>
                  <CardDescription>
                    Your investment performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfitChart />
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Investment Distribution</CardTitle>
                  <CardDescription>
                    Breakdown by investment type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryDistribution />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Upcoming Events</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <UpcomingEvents />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="investments">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockInvestments.map((investment) => (
                <InvestmentCard key={investment.id} {...investment} />
              ))}
              <Card className="flex flex-col justify-center items-center p-6 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Explore More Investments</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse all available investment opportunities.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/investments">
                    View All Investments
                    <ArrowRightCircle className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates on your investments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="min-w-10 min-h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <PieChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Dividend payment received</p>
                      <p className="text-sm text-muted-foreground">$1,250 from Apartment Rental Property</p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="min-w-10 min-h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CircleDollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Vintage Wine Collection valuation updated</p>
                      <p className="text-sm text-muted-foreground">New estimate: $30,000 (+20% increase)</p>
                      <p className="text-xs text-muted-foreground mt-1">5 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="min-w-10 min-h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">New investment proposal available</p>
                      <p className="text-sm text-muted-foreground">Tech Startup Investment - $50,000 opportunity</p>
                      <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default InvestorDashboard;
