
import { PropertyValueData } from "@/components/PropertyResult";

// This is a mock service to simulate API calls to property websites
// In a real implementation, this would connect to actual APIs or use web scraping techniques

export const getPropertyValuation = async (address: string): Promise<PropertyValueData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate random property data based on the address
  // In a real implementation, this would fetch actual data from various sources
  
  // Use the address to create a deterministic but random-looking value
  const hash = Array.from(address).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseValue = 500000 + (hash % 2000000);
  
  // Create variations for different sources
  const domainEstimate = baseValue * (0.9 + Math.random() * 0.2);
  const realEstateEstimate = baseValue * (0.85 + Math.random() * 0.3);
  const propertyValueEstimate = baseValue * (0.95 + Math.random() * 0.1);
  
  // Calculate average
  const avgValue = Math.round((domainEstimate + realEstateEstimate + propertyValueEstimate) / 3);
  
  // Extract suburb from address if possible
  const addressParts = address.split(",");
  let suburb = "";
  if (addressParts.length > 1) {
    const potentialSuburb = addressParts[1].trim().split(" ")[0];
    suburb = potentialSuburb;
  }
  
  return {
    address: address,
    estimatedValue: avgValue,
    bedrooms: 3 + (hash % 3),
    bathrooms: 1 + (hash % 3),
    parkingSpaces: hash % 3,
    landSize: 300 + (hash % 500),
    propertyType: hash % 3 === 0 ? "House" : hash % 3 === 1 ? "Apartment" : "Townhouse",
    lastSoldPrice: avgValue * 0.8,
    lastSoldDate: `${2018 + (hash % 5)}-${String(1 + (hash % 12)).padStart(2, '0')}-${String(1 + (hash % 28)).padStart(2, '0')}`,
    sources: [
      {
        name: "Domain.com.au",
        estimate: Math.round(domainEstimate),
        url: "https://domain.com.au"
      },
      {
        name: "Realestate.com.au",
        estimate: Math.round(realEstateEstimate),
        url: "https://realestate.com.au"
      },
      {
        name: "PropertyValue.com.au",
        estimate: Math.round(propertyValueEstimate),
        url: "https://propertyvalue.com.au"
      }
    ]
  };
};
