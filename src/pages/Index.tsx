
import React, { useState, useEffect } from "react";
import AddressSearchForm from "@/components/AddressSearchForm";
import PropertyResult, { PropertyValueData } from "@/components/PropertyResult";
import { getPropertyValuation } from "@/services/propertyService";
import { Building, DollarSign, Home, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FIRECRAWL_API_KEY_STORAGE = 'firecrawl_api_key';

const Index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyValueData | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem(FIRECRAWL_API_KEY_STORAGE);
    if (savedApiKey) {
      setIsApiKeySet(true);
    }
  }, []);

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem(FIRECRAWL_API_KEY_STORAGE, apiKey);
    setIsApiKeySet(true);
    toast({
      title: "Success",
      description: "API key saved successfully",
    });
  };

  const handleSearch = async (address: string) => {
    setIsSearching(true);
    try {
      const data = await getPropertyValuation(address);
      setPropertyData(data);
    } catch (error) {
      console.error("Error fetching property data:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to retrieve property information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  if (!isApiKeySet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-aussie-blue mb-4">Enter Firecrawl API Key</h2>
          <p className="text-slate-600 mb-4">
            To use this application, you need to provide your Firecrawl API key.
            You can get one from the Firecrawl website.
          </p>
          <div className="space-y-4">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Firecrawl API key"
              className="w-full"
            />
            <Button 
              onClick={handleApiKeySubmit}
              className="w-full bg-aussie-blue hover:bg-blue-900"
            >
              Save API Key
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          
          <AddressSearchForm onSearch={handleSearch} isSearching={isSearching} />
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-grow bg-white py-8 px-4">
        <div className="container mx-auto">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-aussie-blue border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg text-slate-600">Searching property databases...</p>
            </div>
          ) : propertyData ? (
            <PropertyResult data={propertyData} />
          ) : (
            <div className="py-12 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Search className="h-8 w-8 text-aussie-blue" />}
                  title="Comprehensive Search"
                  description="Search any Australian residential property to get instant access to detailed valuation data."
                />
                <FeatureCard
                  icon={<DollarSign className="h-8 w-8 text-aussie-blue" />}
                  title="Accurate Valuations"
                  description="Get accurate property valuations aggregated from Australia's leading real estate websites."
                />
                <FeatureCard
                  icon={<Building className="h-8 w-8 text-aussie-blue" />}
                  title="Property Insights"
                  description="View detailed property information including size, features, and sales history."
                />
              </div>
              
              <div className="mt-12 text-center">
                <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <Home className="h-12 w-12 text-aussie-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Enter an address above to get started</h3>
                  <p className="text-slate-600">
                    Provide a full Australian address including street, suburb, state, and postcode for the best results.
                  </p>
                </div>
              </div>
            </div>
          )}
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

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm text-center hover:shadow-md transition-shadow">
      <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default Index;

