
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ArrowLeft, PieChart, Edit, Share2, Trash2 } from "lucide-react";
import { InvestmentTypeIcon } from "@/components/dashboard/InvestmentTypeIcon";
import { CommentSection } from "@/components/investments/CommentSection";

// Mock investment data
const mockInvestment = {
  id: '6',
  title: 'Fintech SaaS Company',
  type: 'companies' as const,
  amount: 100000,
  status: 'proposed' as const,
  description: 'Early-stage investment in a promising fintech SaaS company that provides payment processing solutions for small businesses. This company has shown strong initial traction with a growing customer base.',
  startDate: '2024-07-01',
  endDate: '2026-07-01',
  expectedReturn: 35, // percentage
  riskLevel: 'medium',
  fundingStage: 'Series A',
  location: 'San Francisco, CA',
  team: [
    { name: 'Sarah Johnson', role: 'CEO & Co-founder' },
    { name: 'Michael Chen', role: 'CTO & Co-founder' },
    { name: 'David Rodriguez', role: 'CFO' }
  ],
  documents: [
    { name: 'Business Plan', type: 'PDF' },
    { name: 'Financial Projections', type: 'XLSX' },
    { name: 'Term Sheet', type: 'PDF' }
  ],
  milestones: [
    { title: 'Product Launch', date: '2024-09-01' },
    { title: 'Revenue Milestone ($1M ARR)', date: '2025-03-01' },
    { title: 'International Expansion', date: '2025-12-01' }
  ],
  votes: {
    total: 12,
    positive: 5
  },
  imageSrc: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
};

// Mock comment data
const mockComments = [
  {
    id: 'c1',
    author: 'John Smith',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=John',
    date: '2023-11-15T14:30:00',
    content: 'I really like the team behind this company. The CEO has a strong track record in the fintech space.',
    isAdmin: false
  },
  {
    id: 'c2',
    author: 'Emily Johnson',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Emily',
    date: '2023-11-16T09:45:00',
    content: 'The valuation seems a bit high for a Series A. What competitive advantages do they have over existing payment processors?',
    isAdmin: true
  },
  {
    id: 'c3',
    author: 'Michael Lee',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Michael',
    date: '2023-11-17T16:20:00',
    content: 'I spoke with one of their customers last week. They seem to be very satisfied with the product and mentioned they\'re planning to expand their usage.',
    isAdmin: false
  }
];

const InvestmentDetail = () => {
  const { id, type } = useParams<{ id: string, type: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [hasVoted, setHasVoted] = useState(false);
  
  // In a real app, this would fetch the investment based on id and type
  const investment = mockInvestment;
  
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
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Calculate vote percentage
  const votePercentage = Math.round((investment.votes.positive / investment.votes.total) * 100);
  const isPassing = votePercentage > 50;
  const remainingDays = 30; // In a real app, calculate days remaining for voting
  
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Back button and title */}
        <div className="flex flex-col space-y-2">
          <Link to={`/investments/${type}`} className="flex items-center text-muted-foreground hover:text-primary w-fit">
            <ArrowLeft className="mr-1 h-4 w-4" />
            <span>Back to {type} investments</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <InvestmentTypeIcon type={type as any} size={32} withBackground />
              <h1 className="text-3xl font-bold tracking-tight">{investment.title}</h1>
              <Badge variant={investment.status === 'active' ? 'default' : investment.status === 'proposed' ? 'outline' : 'secondary'}>
                {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured image */}
            {investment.imageSrc && (
              <Card>
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={investment.imageSrc} 
                    alt={investment.title} 
                    className="h-full w-full object-cover" 
                  />
                </div>
              </Card>
            )}
            
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{investment.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Investment Amount</h4>
                        <p className="text-lg font-semibold">{formatCurrency(investment.amount)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Expected Return</h4>
                        <p className="text-lg font-semibold">{investment.expectedReturn}%</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Start Date</h4>
                        <p className="text-base">{formatDate(investment.startDate)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">End Date</h4>
                        <p className="text-base">{formatDate(investment.endDate)}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Risk Level</h4>
                        <p className="text-base capitalize">{investment.riskLevel}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Funding Stage</h4>
                        <p className="text-base">{investment.fundingStage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Team</CardTitle>
                    <CardDescription>Key team members of the company</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {investment.team.map((member, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-md bg-accent/50">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Milestones</CardTitle>
                    <CardDescription>Key upcoming milestones for the company</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {investment.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mt-1 mr-4 flex h-2 w-2 rounded-full bg-primary" />
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <p className="font-medium">{milestone.title}</p>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              <span>{formatDate(milestone.date)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Financials Tab */}
              <TabsContent value="financials">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Projections</CardTitle>
                    <CardDescription>Expected financial performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <PieChart className="h-10 w-10 text-muted-foreground" />
                      <p className="ml-2 text-muted-foreground">Financial charts would be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Documents Tab */}
              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Related Documents</CardTitle>
                    <CardDescription>Documents related to this investment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {investment.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-md border">
                          <div className="flex items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-muted mr-3">
                              <span className="text-xs font-medium">{doc.type}</span>
                            </div>
                            <span>{doc.name}</span>
                          </div>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Discussion Tab */}
              <TabsContent value="discussion">
                <CommentSection comments={mockComments} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right column - Sidebar */}
          <div className="space-y-6">
            {/* Voting card for proposed investments */}
            {investment.status === 'proposed' && (
              <Card>
                <CardHeader>
                  <CardTitle>Voting Status</CardTitle>
                  <CardDescription>This investment requires a vote</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current votes: {investment.votes.positive} of {investment.votes.total}</span>
                      <span className={isPassing ? "text-profit-positive" : "text-profit-negative"}>
                        {votePercentage}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-secondary">
                      <div 
                        className={`h-2 ${isPassing ? "bg-profit-positive" : "bg-profit-negative"}`} 
                        style={{ width: `${votePercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isPassing 
                        ? "Currently passing. Requires >50% approval."
                        : "Currently not passing. Requires >50% approval."
                      }
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {remainingDays} days remaining for voting
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant={hasVoted ? "outline" : "default"} 
                        className="w-full"
                        disabled={hasVoted}
                        onClick={() => setHasVoted(true)}
                      >
                        Vote Yes
                      </Button>
                      <Button 
                        variant={hasVoted ? "outline" : "destructive"} 
                        className="w-full"
                        disabled={hasVoted}
                        onClick={() => setHasVoted(true)}
                      >
                        Vote No
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Investment summary */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium">{formatCurrency(investment.amount)}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Term</p>
                    <p className="font-medium">2 Years</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Expected Return</p>
                    <p className="font-medium">{investment.expectedReturn}%</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm text-muted-foreground">Risk Level</p>
                    <p className="font-medium capitalize">{investment.riskLevel}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={true}>
                  Investment Locked
                </Button>
              </CardFooter>
            </Card>
            
            {/* Additional actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Investment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Details
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Investment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default InvestmentDetail;
