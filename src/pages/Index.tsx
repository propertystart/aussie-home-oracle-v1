import React, { useState } from "react";
import RbaRatesChart from "@/components/RbaRatesChart";
import SupplyDemandChart from "@/components/SupplyDemandChart";
import DemographicsChart from "@/components/DemographicsChart";
import InflationChart from "@/components/InflationChart";
import HousePriceChart from "@/components/HousePriceChart";
import EconomicGrowthChart from "@/components/EconomicGrowthChart";
import NetPresentValueChart from "@/components/NetPresentValueChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ValueDataPoint, getPropertyValueHistory, PropertyAddress } from "@/services/houseValueService";
import { 
  ViewComAuProperty, 
  getPropertyDataFromViewComAu,
  convertToValueDataPoints 
} from "@/services/viewComAuService";

const Index = () => {
  const [supplyPostcode, setSupplyPostcode] = useState("");
  const [demographicsPostcode, setDemographicsPostcode] = useState("");
  const [pricePostcode, setPricePostcode] = useState("");
  const [showSupplyChart, setShowSupplyChart] = useState(false);
  const [showDemographicsChart, setShowDemographicsChart] = useState(false);
  const [showPriceChart, setShowPriceChart] = useState(false);
  const { toast } = useToast();

  // Property value states
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [cars, setCars] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [landArea, setLandArea] = useState("");

  const [supplyBeds, setSupplyBeds] = useState("");
  const [supplyBaths, setSupplyBaths] = useState("");
  const [supplyCars, setSupplyCars] = useState("");
  const [supplyFloorArea, setSupplyFloorArea] = useState("");
  const [supplyLandArea, setSupplyLandArea] = useState("");

  // Net Present Value states
  const [npvAddress, setNpvAddress] = useState("");
  const [npvSuburb, setNpvSuburb] = useState("");
  const [npvPostcode, setNpvPostcode] = useState("");
  const [valueData, setValueData] = useState<ValueDataPoint[]>([]);
  const [viewComAuData, setViewComAuData] = useState<ViewComAuProperty | null>(null);
  const [isLoadingValueData, setIsLoadingValueData] = useState(false);
  const [showValueChart, setShowValueChart] = useState(false);
  const [dataSource, setDataSource] = useState<"default" | "viewcomau">("default");

  const validatePostcode = (postcode: string) => {
    return /^\d{4}$/.test(postcode);
  };

  const handleSupplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePostcode(supplyPostcode)) {
      toast({
        title: "Invalid Postcode",
        description: "Please enter a valid 4-digit Australian postcode",
        variant: "destructive",
      });
      return;
    }
    setShowSupplyChart(true);
  };

  const handleDemographicsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePostcode(demographicsPostcode)) {
      toast({
        title: "Invalid Postcode",
        description: "Please enter a valid 4-digit Australian postcode",
        variant: "destructive",
      });
      return;
    }
    setShowDemographicsChart(true);
  };

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePostcode(pricePostcode)) {
      toast({
        title: "Invalid Postcode",
        description: "Please enter a valid 4-digit Australian postcode",
        variant: "destructive",
      });
      return;
    }
    setShowPriceChart(true);
  };

  const handleNpvSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePostcode(npvPostcode)) {
      toast({
        title: "Invalid Postcode",
        description: "Please enter a valid 4-digit Australian postcode",
        variant: "destructive",
      });
      return;
    }
    
    if (!npvAddress.trim() || !npvSuburb.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both address and suburb",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingValueData(true);
    try {
      const propertyData: PropertyAddress = {
        address: npvAddress,
        suburb: npvSuburb,
        postcode: npvPostcode
      };
      
      // Determine which data source to use
      if (dataSource === "viewcomau") {
        // Fetch data from View.com.au
        const viewData = await getPropertyDataFromViewComAu(propertyData);
        if (viewData) {
          setViewComAuData(viewData);
          const formattedData = convertToValueDataPoints(viewData);
          setValueData(formattedData);
          setShowValueChart(true);
          toast({
            title: "Success",
            description: "Property data fetched from View.com.au",
          });
        } else {
          toast({
            title: "Error",
            description: "Property not found on View.com.au",
            variant: "destructive",
          });
        }
      } else {
        // Use default data source
        setViewComAuData(null);
        const data = await getPropertyValueHistory(propertyData);
        setValueData(data);
        setShowValueChart(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch property value history",
        variant: "destructive",
      });
    } finally {
      setIsLoadingValueData(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="hero-pattern py-6 px-4 md:py-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-aussie-blue mb-2">
              Aussie Home Oracle
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get accurate property valuations from Australia's top real estate data sources,
              all in one place.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow bg-white py-4 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="npv" className="w-full">
            <TabsList className="flex justify-between w-full max-w-4xl mx-auto mb-8">
              <TabsTrigger value="npv">Net Present Value</TabsTrigger>
              <TabsTrigger value="rba">RBA Interest Rates</TabsTrigger>
              <TabsTrigger value="growth">Economic Growth</TabsTrigger>
              <TabsTrigger value="inflation">Inflation</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="supply">Supply & Demand</TabsTrigger>
              <TabsTrigger value="price">Average House Price</TabsTrigger>
            </TabsList>
            
            <TabsContent value="npv">
              <div className="max-w-md mx-auto mb-8">
                <form onSubmit={handleNpvSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Street Address"
                      value={npvAddress}
                      onChange={(e) => setNpvAddress(e.target.value)}
                      className="w-full"
                    />
                    <Input
                      type="text"
                      placeholder="Suburb"
                      value={npvSuburb}
                      onChange={(e) => setNpvSuburb(e.target.value)}
                      className="w-full"
                    />
                    <Input
                      type="text"
                      placeholder="Postcode"
                      value={npvPostcode}
                      onChange={(e) => setNpvPostcode(e.target.value)}
                      className="w-full"
                      maxLength={4}
                    />
                    <div className="flex items-center space-x-2 py-2">
                      <label className="text-sm font-medium">Data Source:</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            name="dataSource"
                            checked={dataSource === "default"}
                            onChange={() => setDataSource("default")}
                            className="h-4 w-4 text-aussie-blue"
                          />
                          <span className="text-sm">Default</span>
                        </label>
                        <label className="flex items-center gap-1.5">
                          <input
                            type="radio"
                            name="dataSource"
                            checked={dataSource === "viewcomau"}
                            onChange={() => setDataSource("viewcomau")}
                            className="h-4 w-4 text-aussie-blue"
                          />
                          <span className="text-sm">View.com.au</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isLoadingValueData}
                      className="bg-aussie-blue hover:bg-blue-800"
                    >
                      {isLoadingValueData ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        "Calculate Value"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
              {showValueChart && valueData.length > 0 && (
                <NetPresentValueChart 
                  data={valueData} 
                  viewComAuData={viewComAuData || undefined} 
                />
              )}
            </TabsContent>

            <TabsContent value="rba">
              <RbaRatesChart />
            </TabsContent>

            <TabsContent value="growth">
              <EconomicGrowthChart />
            </TabsContent>

            <TabsContent value="inflation">
              <InflationChart />
            </TabsContent>

            <TabsContent value="demographics">
              <div className="max-w-md mx-auto mb-8">
                <form onSubmit={handleDemographicsSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      placeholder="Enter postcode"
                      value={demographicsPostcode}
                      onChange={(e) => setDemographicsPostcode(e.target.value)}
                      className="flex-grow"
                      maxLength={4}
                    />
                    <Button type="submit">View Data</Button>
                  </div>
                </form>
              </div>
              {showDemographicsChart && <DemographicsChart />}
            </TabsContent>

            <TabsContent value="supply">
              <div className="max-w-md mx-auto mb-8">
                <form onSubmit={handleSupplySubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      placeholder="Enter postcode"
                      value={supplyPostcode}
                      onChange={(e) => setSupplyPostcode(e.target.value)}
                      className="flex-grow"
                      maxLength={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Beds"
                        value={supplyBeds}
                        onChange={(e) => setSupplyBeds(e.target.value)}
                        min="0"
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Baths"
                        value={supplyBaths}
                        onChange={(e) => setSupplyBaths(e.target.value)}
                        min="0"
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Cars"
                        value={supplyCars}
                        onChange={(e) => setSupplyCars(e.target.value)}
                        min="0"
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Floor Area (m²)"
                        value={supplyFloorArea}
                        onChange={(e) => setSupplyFloorArea(e.target.value)}
                        min="0"
                        className="flex-1"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Land Area (m²)"
                        value={supplyLandArea}
                        onChange={(e) => setSupplyLandArea(e.target.value)}
                        min="0"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">View Data</Button>
                  </div>
                </form>
              </div>
              {showSupplyChart && <SupplyDemandChart />}
            </TabsContent>

            <TabsContent value="price">
              <div className="max-w-md mx-auto mb-8">
                <form onSubmit={handlePriceSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      type="text"
                      placeholder="Enter postcode"
                      value={pricePostcode}
                      onChange={(e) => setPricePostcode(e.target.value)}
                      className="flex-grow"
                      maxLength={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Beds"
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                        min="0"
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Baths"
                        value={baths}
                        onChange={(e) => setBaths(e.target.value)}
                        min="0"
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Cars"
                        value={cars}
                        onChange={(e) => setCars(e.target.value)}
                        min="0"
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Floor Area (m²)"
                        value={floorArea}
                        onChange={(e) => setFloorArea(e.target.value)}
                        min="0"
                        className="flex-1"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Land Area (m²)"
                        value={landArea}
                        onChange={(e) => setLandArea(e.target.value)}
                        min="0"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">View Data</Button>
                  </div>
                </form>
              </div>
              {showPriceChart && <HousePriceChart />}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="bg-aussie-blue text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Aussie Home Oracle • Property valuations for informational purposes only</p>
          <p className="text-sm mt-2 text-slate-300">
            Not affiliated with Domain.com.au, Realestate.com.au, or PropertyValue.com.au
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
