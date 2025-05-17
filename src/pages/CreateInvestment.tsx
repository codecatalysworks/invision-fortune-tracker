
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Upload } from "lucide-react";
import { InvestmentTypeIcon } from "@/components/dashboard/InvestmentTypeIcon";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const investmentTypes = [
  { value: "wine", label: "Wine" },
  { value: "realestate", label: "Real Estate" },
  { value: "cars", label: "Cars" },
  { value: "highrisk", label: "High Risk" },
  { value: "rentals", label: "Rentals" },
  { value: "companies", label: "Companies" },
  { value: "websites", label: "Websites" }
];

const CreateInvestment = () => {
  const [investmentType, setInvestmentType] = useState<string>("wine");
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [expectedReturn, setExpectedReturn] = useState<string>("");
  const [isProposal, setIsProposal] = useState<boolean>(true);
  const [images, setImages] = useState<FileList | null>(null);
  
  // Type-specific fields for Real Estate
  const [propertyType, setPropertyType] = useState<string>("residential");
  const [isFullyRented, setIsFullyRented] = useState<boolean>(true);
  const [purchasePrice, setPurchasePrice] = useState<string>("");
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");
  
  // Type-specific fields for Rentals
  const [rentalItemName, setRentalItemName] = useState<string>("");
  const [rentalPrice, setRentalPrice] = useState<string>("");
  const [rentalPeriod, setRentalPeriod] = useState<string>("daily");
  const [breakevenRentals, setBreakevenRentals] = useState<string>("");
  
  // Risk level selection
  const [riskLevel, setRiskLevel] = useState<string>("medium");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the investment data
    console.log({
      investmentType,
      title,
      amount,
      description,
      startDate,
      endDate,
      expectedReturn,
      isProposal,
      riskLevel
    });
    
    // Additional fields based on investment type
    if (investmentType === 'realestate') {
      console.log({
        propertyType,
        isFullyRented,
        purchasePrice,
        monthlyIncome
      });
    } else if (investmentType === 'rentals') {
      console.log({
        rentalItemName,
        rentalPrice,
        rentalPeriod,
        breakevenRentals
      });
    }
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Investment</h1>
            <p className="text-muted-foreground">
              Add a new investment opportunity to the platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" type="submit" form="create-investment-form">
              Save as Draft
            </Button>
            <Button type="submit" form="create-investment-form">
              {isProposal ? "Create Proposal" : "Create Investment"}
            </Button>
          </div>
        </div>
        
        <form id="create-investment-form" onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details of the investment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Investment Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter investment title" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="investment-type">Investment Type</Label>
                    <Select value={investmentType} onValueChange={setInvestmentType}>
                      <SelectTrigger id="investment-type">
                        <SelectValue placeholder="Select investment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {investmentTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              <InvestmentTypeIcon type={type.value as any} size={16} />
                              <span className="ml-2">{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the investment opportunity" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Investment Amount (USD)</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="50000"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expected-return">Expected Return (%)</Label>
                    <Input 
                      id="expected-return" 
                      type="number" 
                      placeholder="15"
                      value={expectedReturn}
                      onChange={e => setExpectedReturn(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="risk-level">Risk Level</Label>
                    <Select value={riskLevel} onValueChange={setRiskLevel}>
                      <SelectTrigger id="risk-level">
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select date (if applicable)"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(date) => date < (startDate || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="proposal"
                    checked={isProposal}
                    onCheckedChange={setIsProposal}
                  />
                  <Label htmlFor="proposal">Create as investment proposal (requires voting)</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
                <CardDescription>
                  Additional details specific to the investment type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={investmentType} value={investmentType} onValueChange={setInvestmentType}>
                  <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
                    {investmentTypes.map(type => (
                      <TabsTrigger key={type.value} value={type.value} className="flex items-center gap-1">
                        <InvestmentTypeIcon type={type.value as any} size={16} />
                        <span className="hidden md:inline">{type.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {/* Wine Tab */}
                  <TabsContent value="wine" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Wine Details</Label>
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Wine Type</Label>
                              <Select defaultValue="red">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select wine type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="red">Red Wine</SelectItem>
                                  <SelectItem value="white">White Wine</SelectItem>
                                  <SelectItem value="sparkling">Sparkling Wine</SelectItem>
                                  <SelectItem value="dessert">Dessert Wine</SelectItem>
                                  <SelectItem value="collection">Wine Collection</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Vintage Year</Label>
                              <Input placeholder="e.g., 2015" />
                            </div>
                            <div className="space-y-2">
                              <Label>Region</Label>
                              <Input placeholder="e.g., Bordeaux" />
                            </div>
                            <div className="space-y-2">
                              <Label>Storage Conditions</Label>
                              <Input placeholder="e.g., Temperature controlled cellar" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Real Estate Tab */}
                  <TabsContent value="realestate" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Property Details</Label>
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Property Type</Label>
                              <Select value={propertyType} onValueChange={setPropertyType}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="residential">Residential</SelectItem>
                                  <SelectItem value="commercial">Commercial</SelectItem>
                                  <SelectItem value="mixed">Mixed Use</SelectItem>
                                  <SelectItem value="land">Land</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Purchase Price</Label>
                              <Input 
                                placeholder="e.g., 500000" 
                                value={purchasePrice}
                                onChange={e => setPurchasePrice(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Rental Type</Label>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="rental-type"
                                  checked={isFullyRented}
                                  onCheckedChange={setIsFullyRented}
                                />
                                <Label htmlFor="rental-type">
                                  {isFullyRented ? "Fully rented" : "Rented by room"}
                                </Label>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Monthly Income</Label>
                              <Input 
                                placeholder="e.g., 3500" 
                                value={monthlyIncome}
                                onChange={e => setMonthlyIncome(e.target.value)}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Cars Tab */}
                  <TabsContent value="cars" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Car Details</Label>
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Car Type</Label>
                              <Select defaultValue="luxury">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select car type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="luxury">Luxury</SelectItem>
                                  <SelectItem value="classic">Classic</SelectItem>
                                  <SelectItem value="electric">Electric</SelectItem>
                                  <SelectItem value="collection">Collection</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Make & Model</Label>
                              <Input placeholder="e.g., Porsche 911" />
                            </div>
                            <div className="space-y-2">
                              <Label>Year</Label>
                              <Input placeholder="e.g., 2022" />
                            </div>
                            <div className="space-y-2">
                              <Label>Purchase Value</Label>
                              <Input placeholder="e.g., 150000" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Rentals Tab */}
                  <TabsContent value="rentals" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Rental Item Details</Label>
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Item Name</Label>
                              <Input 
                                placeholder="e.g., Luxury RV" 
                                value={rentalItemName}
                                onChange={e => setRentalItemName(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Rental Period</Label>
                              <Select value={rentalPeriod} onValueChange={setRentalPeriod}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select rental period" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hourly">Hourly</SelectItem>
                                  <SelectItem value="daily">Daily</SelectItem>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Rental Price (per period)</Label>
                              <Input 
                                placeholder="e.g., 250" 
                                value={rentalPrice}
                                onChange={e => setRentalPrice(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Rentals to Break Even</Label>
                              <Input 
                                placeholder="e.g., 40" 
                                value={breakevenRentals}
                                onChange={e => setBreakevenRentals(e.target.value)}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* High Risk Tab */}
                  <TabsContent value="highrisk" className="space-y-4">
                    <div className="space-y-2">
                      <Label>High Risk Investment Details</Label>
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Investment Category</Label>
                              <Select defaultValue="startup">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="startup">Startup</SelectItem>
                                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                                  <SelectItem value="venture">Venture Capital</SelectItem>
                                  <SelectItem value="trading">Trading</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Potential Return (%)</Label>
                              <Input placeholder="e.g., 200" />
                            </div>
                            <div className="space-y-2">
                              <Label>Risk Assessment</Label>
                              <Textarea placeholder="Describe the risk assessment of this investment" className="min-h-[80px]" />
                            </div>
                            <div className="space-y-2">
                              <Label>Risk Mitigation Strategy</Label>
                              <Textarea placeholder="How are risks being mitigated?" className="min-h-[80px]" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Companies Tab */}
                  <TabsContent value="companies" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Company Details</Label>
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Company Name</Label>
                              <Input placeholder="e.g., TechCorp Inc." />
                            </div>
                            <div className="space-y-2">
                              <Label>Industry</Label>
                              <Input placeholder="e.g., Fintech" />
                            </div>
                            <div className="space-y-2">
                              <Label>Funding Stage</Label>
                              <Select defaultValue="seriesA">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select funding stage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="seed">Seed</SelectItem>
                                  <SelectItem value="seriesA">Series A</SelectItem>
                                  <SelectItem value="seriesB">Series B</SelectItem>
                                  <SelectItem value="seriesC">Series C</SelectItem>
                                  <SelectItem value="public">Public</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Valuation</Label>
                              <Input placeholder="e.g., 5000000" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Websites Tab */}
                  <TabsContent value="websites" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Website Details</Label>
                      <Card>
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Website URL</Label>
                              <Input placeholder="e.g., https://example.com" />
                            </div>
                            <div className="space-y-2">
                              <Label>Monthly Traffic</Label>
                              <Input placeholder="e.g., 50000" />
                            </div>
                            <div className="space-y-2">
                              <Label>Revenue Model</Label>
                              <Select defaultValue="ads">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select revenue model" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ads">Advertising</SelectItem>
                                  <SelectItem value="subscription">Subscription</SelectItem>
                                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                                  <SelectItem value="affiliate">Affiliate</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Monthly Revenue</Label>
                              <Input placeholder="e.g., 5000" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Images & Documents</CardTitle>
                <CardDescription>
                  Upload images and documents related to the investment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="block mb-2">Featured Image</Label>
                      <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-md cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                        <div className="space-y-2 text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Drag & drop or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG or WebP up to 5MB
                          </p>
                          <Input
                            id="featured-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setImages(e.target.files)}
                          />
                          <Button variant="secondary" size="sm" onClick={() => document.getElementById('featured-image')?.click()}>
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="block mb-2">Additional Images</Label>
                      <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-md cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                        <div className="space-y-2 text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Drag & drop or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Up to 5 images, 5MB each
                          </p>
                          <Input
                            id="additional-images"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                          />
                          <Button variant="secondary" size="sm" onClick={() => document.getElementById('additional-images')?.click()}>
                            Choose Files
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block mb-2">Documents</Label>
                    <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                      <div className="space-y-2 text-center">
                        <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Upload supporting documents (PDF, DOCX, XLSX)
                        </p>
                        <Input
                          id="documents"
                          type="file"
                          accept=".pdf,.docx,.xlsx"
                          multiple
                          className="hidden"
                        />
                        <Button variant="secondary" size="sm" onClick={() => document.getElementById('documents')?.click()}>
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default CreateInvestment;
