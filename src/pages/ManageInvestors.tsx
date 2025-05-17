
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, MoreHorizontal, ArrowUpDown, Trash2, Edit, UserPlus } from "lucide-react";

// Mock investors data
const mockInvestors = [
  { 
    id: "1", 
    name: "John Smith", 
    email: "john.smith@example.com",
    totalContribution: 75000,
    joinDate: "2022-05-15",
    status: "active",
    lastActivity: "2023-06-28",
    investmentCount: 5,
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=John"
  },
  { 
    id: "2", 
    name: "Emily Johnson", 
    email: "emily.johnson@example.com",
    totalContribution: 120000,
    joinDate: "2021-11-03",
    status: "active",
    lastActivity: "2023-06-30",
    investmentCount: 8,
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Emily"
  },
  { 
    id: "3", 
    name: "Michael Lee", 
    email: "michael.lee@example.com",
    totalContribution: 50000,
    joinDate: "2022-08-22",
    status: "active",
    lastActivity: "2023-06-25",
    investmentCount: 3,
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Michael"
  },
  { 
    id: "4", 
    name: "Sarah Miller", 
    email: "sarah.miller@example.com",
    totalContribution: 250000,
    joinDate: "2020-03-10",
    status: "active",
    lastActivity: "2023-06-29",
    investmentCount: 12,
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Sarah"
  },
  { 
    id: "5", 
    name: "David Rodriguez", 
    email: "david.rodriguez@example.com",
    totalContribution: 180000,
    joinDate: "2021-05-05",
    status: "inactive",
    lastActivity: "2023-03-15",
    investmentCount: 7,
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=David"
  }
];

const ManageInvestors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isAddInvestorOpen, setIsAddInvestorOpen] = useState(false);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Sort and filter investors
  const sortAndFilterInvestors = () => {
    return [...mockInvestors]
      .filter(investor => 
        investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        investor.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        let fieldA: string | number = a[sortField as keyof typeof a] as string | number;
        let fieldB: string | number = b[sortField as keyof typeof b] as string | number;
        
        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return sortDirection === 'asc' 
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA);
        } else {
          // For numeric values
          return sortDirection === 'asc'
            ? Number(fieldA) - Number(fieldB)
            : Number(fieldB) - Number(fieldA);
        }
      });
  };
  
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const displayedInvestors = sortAndFilterInvestors();
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Investors</h1>
            <p className="text-muted-foreground">
              View and manage investor accounts and their contributions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isAddInvestorOpen} onOpenChange={setIsAddInvestorOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Investor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Investor</DialogTitle>
                  <DialogDescription>
                    Add a new investor to the platform. They'll receive an invitation email to set up their account.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input id="email" type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contribution" className="text-right">Initial Contribution</Label>
                    <Input id="contribution" type="number" className="col-span-3" placeholder="USD" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddInvestorOpen(false)}>Cancel</Button>
                  <Button type="submit">Add Investor</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Investors</CardTitle>
            <CardDescription>
              Manage your investors and their contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search investors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investor</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('totalContribution')}>
                    <div className="flex items-center">
                      Total Contribution
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('joinDate')}>
                    <div className="flex items-center">
                      Join Date
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('investmentCount')}>
                    <div className="flex items-center">
                      Investments
                      <ArrowUpDown className="ml-2 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedInvestors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center p-4">
                      No investors found
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedInvestors.map((investor) => (
                    <TableRow key={investor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={investor.avatar}
                            alt={investor.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{investor.name}</p>
                            <p className="text-sm text-muted-foreground">{investor.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{formatCurrency(investor.totalContribution)}</p>
                          <p className="text-xs text-muted-foreground">Last deposit: 3 weeks ago</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{formatDate(investor.joinDate)}</p>
                          <p className="text-xs text-muted-foreground">
                            Last activity: {formatDate(investor.lastActivity)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={investor.status === "active" ? "default" : "secondary"}>
                          {investor.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">{investor.investmentCount}</div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Details</DropdownMenuItem>
                            <DropdownMenuItem>Add Contribution</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Deactivate Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {displayedInvestors.length} of {mockInvestors.length} investors
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatCurrency(mockInvestors.reduce((sum, investor) => sum + investor.totalContribution, 0))}
              </div>
              <p className="text-sm text-muted-foreground">From {mockInvestors.filter(i => i.status === "active").length} active investors</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Average Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatCurrency(mockInvestors.reduce((sum, investor) => sum + investor.totalContribution, 0) / mockInvestors.length)}
              </div>
              <p className="text-sm text-muted-foreground">Per investor</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockInvestors.reduce((sum, investor) => sum + investor.investmentCount, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Across all investors</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ManageInvestors;
