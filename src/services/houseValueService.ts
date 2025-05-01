
// This service provides historical and forecasted property values

export interface PropertyAddress {
  address: string;
  suburb: string;
  postcode: string;
}

export interface ValueDataPoint {
  year: number;
  value: number;
  isHistorical: boolean;
}

// Function to get historical and predicted property values
export const getPropertyValueHistory = async (propertyAddress: PropertyAddress): Promise<ValueDataPoint[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const { address, suburb, postcode } = propertyAddress;
  
  // Create a deterministic but random-looking seed based on the input
  const seed = Array.from(address + suburb + postcode).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Base property value (between $500K and $2M)
  const baseValue = 500000 + (seed % 1500000);
  
  // Generate historical values (last 5 years)
  const currentYear = new Date().getFullYear();
  const historicalData: ValueDataPoint[] = [];
  
  for (let i = 5; i >= 1; i--) {
    // Growth rates vary between 3-8% per year historically with some randomness
    const yearlyGrowthRate = 0.03 + (((seed * i) % 100) / 200) + (Math.random() * 0.02);
    const value = Math.round(baseValue / Math.pow(1 + yearlyGrowthRate, i));
    
    historicalData.push({
      year: currentYear - i,
      value,
      isHistorical: true
    });
  }
  
  // Current year value
  historicalData.push({
    year: currentYear,
    value: baseValue,
    isHistorical: true
  });
  
  // Generate future predicted values (next 5 years)
  const futureData: ValueDataPoint[] = [];
  
  for (let i = 1; i <= 5; i++) {
    // Future growth rates typically have higher variability (4-10%)
    const yearlyGrowthRate = 0.04 + (((seed * (i + 5)) % 100) / 200) + (Math.random() * 0.03);
    const value = Math.round(baseValue * Math.pow(1 + yearlyGrowthRate, i));
    
    futureData.push({
      year: currentYear + i,
      value,
      isHistorical: false
    });
  }
  
  return [...historicalData, ...futureData];
};

// Calculate Net Present Value based on future values and discount rate
export const calculateNPV = (data: ValueDataPoint[], discountRate: number = 0.05): number => {
  const currentValue = data.find(d => d.isHistorical && d.year === new Date().getFullYear())?.value || 0;
  const futureValues = data.filter(d => !d.isHistorical);
  
  if (futureValues.length === 0) return currentValue;
  
  // NPV calculation: Future value / (1 + discountRate)^years
  const npvSum = futureValues.reduce((sum, dataPoint) => {
    const years = dataPoint.year - new Date().getFullYear();
    return sum + (dataPoint.value / Math.pow(1 + discountRate, years));
  }, 0);
  
  // Return average of NPV calculations
  return Math.round(npvSum / futureValues.length);
};
