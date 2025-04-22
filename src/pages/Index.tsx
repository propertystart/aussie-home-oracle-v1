import React, { useState } from "react";
import RbaRatesChart from "@/components/RbaRatesChart";
import SupplyDemandChart from "@/components/SupplyDemandChart";
import DemographicsChart from "@/components/DemographicsChart";
import InflationChart from "@/components/InflationChart";
import HousePriceChart from "@/components/HousePriceChart";
import EconomicGrowthChart from "@/components/EconomicGrowthChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [supplyPostcode, setSupplyPostcode] = useState("");
  const [demographicsPostcode, setDemographicsPostcode] = useState("");
  const [pricePostcode, setPricePostcode] = useState("");
  const [showSupplyChart, setShowSupplyChart] = useState(false);
  const [showDemographicsChart, setShowDemographicsChart] = useState(false);
  const [showPriceChart, setShowPriceChart] = useState(false);
  const { toast } = useToast();

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
          <Tabs defaultValue="rba" className="w-full">
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-6 gap-4 mb-8">
              <TabsTrigger value="rba" className="flex-1">RBA Interest Rates</TabsTrigger>
              <TabsTrigger value="growth" className="flex-1">Economic Growth</TabsTrigger>
              <TabsTrigger value="inflation" className="flex-1">Inflation</TabsTrigger>
              <TabsTrigger value="demographics" className="flex-1">Demographics</TabsTrigger>
              <TabsTrigger value="supply" className="flex-1">Supply & Demand</TabsTrigger>
              <TabsTrigger value="price" className="flex-1">Average House Price</TabsTrigger>
            </TabsList>
            
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
