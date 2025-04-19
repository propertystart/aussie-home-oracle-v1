
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Home } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AddressSearchFormProps {
  onSearch: (address: string) => void;
  isSearching: boolean;
}

const AddressSearchForm: React.FC<AddressSearchFormProps> = ({ onSearch, isSearching }) => {
  const [address, setAddress] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter a valid Australian address",
        variant: "destructive",
      });
      return;
    }
    
    // Check if it appears to be an Australian address
    if (!address.toLowerCase().includes("australia") && 
        !/(nsw|vic|qld|sa|wa|tas|nt|act)/i.test(address)) {
      toast({
        title: "Australian Address Required",
        description: "Please enter a valid Australian address",
        variant: "destructive",
      });
      return;
    }
    
    onSearch(address);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address" className="text-lg font-medium">
          Property Address
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Smith Street, Sydney NSW, Australia"
              className="pl-10 py-6 text-lg"
              disabled={isSearching}
            />
          </div>
          <Button 
            type="submit" 
            size="lg"
            disabled={isSearching}
            className="bg-aussie-blue hover:bg-blue-900 text-white px-6"
          >
            {isSearching ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Searching...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                <span>Search</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddressSearchForm;
