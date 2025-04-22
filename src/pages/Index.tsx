import React from "react";
import RbaRatesChart from "@/components/RbaRatesChart";
import SupplyDemandChart from "@/components/SupplyDemandChart";
import DemographicsChart from "@/components/DemographicsChart";
import InflationChart from "@/components/InflationChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="hero-pattern py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-aussie-blue mb-4">
              Aussie Home Oracle
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get accurate property valuations from Australia's top real estate data sources,
              all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-grow bg-white py-8 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="rba" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 gap-4 mb-8">
              <TabsTrigger value="rba">RBA Interest Rates</TabsTrigger>
              <TabsTrigger value="supply">Supply & Demand</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="inflation">Inflation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rba">
              <RbaRatesChart />
            </TabsContent>

            <TabsContent value="supply">
              <SupplyDemandChart />
            </TabsContent>

            <TabsContent value="demographics">
              <DemographicsChart />
            </TabsContent>

            <TabsContent value="inflation">
              <InflationChart />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
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
