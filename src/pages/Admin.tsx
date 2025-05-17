
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightCircle, CalendarIcon, CircleDollarSign, Plus, User, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage investments, investors, and platform settings
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$365,000</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Funds</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$120,000</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Proposals</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="investments">
          <TabsList>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="investors">Investors</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          <TabsContent value="investments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Management</CardTitle>
                <CardDescription>
                  Add, edit, or remove investments from the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-accent">
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Investment</CardTitle>
                      <CardDescription>
                        Create a new investment or proposal
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm mb-4">
                        Choose an investment type to add a new investment or create a proposal for voting.
                      </p>
                      <Button asChild>
                        <Link to="/admin/add-investment">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Investment
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Manage Active Investments</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm mb-4">
                        Edit details, update profits, or add comments to existing investments.
                      </p>
                      <Button variant="outline" asChild>
                        <Link to="/investments">
                          View Investments
                          <ArrowRightCircle className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Manage Proposals</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm mb-4">
                        Review proposals, check voting status, or remove pending proposals.
                      </p>
                      <Button variant="outline" asChild>
                        <Link to="/proposals">
                          View Proposals
                          <ArrowRightCircle className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="investors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Investor Management</CardTitle>
                <CardDescription>
                  Add, edit, or remove investors from the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-accent">
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Investor</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm mb-4">
                        Add a new investor to the platform and set their contribution amount.
                      </p>
                      <Button asChild>
                        <Link to="/admin/add-investor">
                          <User className="mr-2 h-4 w-4" />
                          Add Investor
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Manage Investors</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm mb-4">
                        View, edit, or remove existing investors from the platform.
                      </p>
                      <Button variant="outline" asChild>
                        <Link to="/admin/investors">
                          View Investors
                          <ArrowRightCircle className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Investment Contributions</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm mb-4">
                        Manage investor contributions and fund allocations.
                      </p>
                      <Button variant="outline" asChild>
                        <Link to="/admin/contributions">
                          View Contributions
                          <ArrowRightCircle className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Calendar</CardTitle>
                <CardDescription>
                  View upcoming events, proposal deadlines, and investment end dates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  The calendar view allows you to track important dates for your investments.
                </p>
                <Button asChild>
                  <Link to="/admin/calendar">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    View Full Calendar
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Admin;
