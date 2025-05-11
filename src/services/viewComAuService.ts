
import { PropertyAddress } from "./houseValueService";

// Define the data structure we expect from View.com.au
export interface ViewComAuProperty {
  id: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize: number;
  floorSize: number;
  priceEstimate: number;
  lastSalePrice?: number;
  lastSaleDate?: string;
  historicalPrices: HistoricalPrice[];
}

export interface HistoricalPrice {
  date: string;
  value: number;
  isEstimate: boolean;
}

// This function would require an actual API key and integration with View.com.au
// For now, we're creating a mock implementation
export const getPropertyDataFromViewComAu = async (
  propertyAddress: PropertyAddress
): Promise<ViewComAuProperty | null> => {
  console.log("Fetching property data from View.com.au for:", propertyAddress);
  
  // In a real implementation, this would make an API call to View.com.au
  // For demonstration purposes, we'll create mock data
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock historical data (5 years back)
  const currentYear = new Date().getFullYear();
  const basePrice = 800000 + Math.random() * 400000;
  const historicalPrices: HistoricalPrice[] = [];
  
  // Past 5 years (historical)
  for (let i = 5; i >= 0; i--) {
    const year = currentYear - i;
    // Apply some variability to create realistic price changes
    const adjustment = 1 - (i * 0.05) - (Math.random() * 0.03);
    historicalPrices.push({
      date: `${year}-01-01`,
      value: Math.round(basePrice * adjustment),
      isEstimate: i > 2 // Make some historical data "estimates"
    });
  }
  
  // Future 5 years (predictions)
  for (let i = 1; i <= 5; i++) {
    const year = currentYear + i;
    // Assume general upward trend with some variability
    const adjustment = 1 + (i * 0.04) + (Math.random() * 0.02);
    historicalPrices.push({
      date: `${year}-01-01`,
      value: Math.round(basePrice * adjustment),
      isEstimate: true // All future prices are estimates
    });
  }
  
  return {
    id: `property-${Math.random().toString(36).substring(2, 10)}`,
    address: propertyAddress.address,
    suburb: propertyAddress.suburb,
    state: "NSW", // Mock state
    postcode: propertyAddress.postcode,
    propertyType: "House",
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    landSize: 450,
    floorSize: 180,
    priceEstimate: Math.round(basePrice * 1.1),
    lastSalePrice: Math.round(basePrice * 0.95),
    lastSaleDate: `${currentYear - 2}-06-15`,
    historicalPrices
  };
};

// Helper function to convert View.com.au data to ValueDataPoint format
export const convertToValueDataPoints = (property: ViewComAuProperty) => {
  return property.historicalPrices.map(price => {
    const year = parseInt(price.date.split('-')[0]);
    const currentYear = new Date().getFullYear();
    
    return {
      year,
      value: price.value,
      isHistorical: year <= currentYear
    };
  });
};

// Calculate NPV using View.com.au data
export const calculateNPVFromViewComAu = (
  property: ViewComAuProperty,
  discountRate: number = 0.05
): number => {
  const currentYear = new Date().getFullYear();
  let npv = 0;
  
  // Only use future values for NPV calculation
  const futurePrices = property.historicalPrices.filter(
    price => parseInt(price.date.split('-')[0]) > currentYear
  );
  
  // Current property value (use the most recent historical price)
  const currentValue = property.historicalPrices.find(
    price => parseInt(price.date.split('-')[0]) === currentYear
  )?.value || property.priceEstimate;
  
  // NPV calculation
  futurePrices.forEach(price => {
    const year = parseInt(price.date.split('-')[0]);
    const yearDiff = year - currentYear;
    const discountFactor = Math.pow(1 + discountRate, yearDiff);
    npv += price.value / discountFactor;
  });
  
  // Subtract initial investment (current value)
  npv -= currentValue;
  
  return Math.round(npv);
};
