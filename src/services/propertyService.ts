
import { PropertyValueData } from "@/components/PropertyResult";
import FirecrawlApp from '@mendable/firecrawl-js';

// Store the API key in localStorage temporarily
const FIRECRAWL_API_KEY_STORAGE = 'firecrawl_api_key';

export const getPropertyValuation = async (address: string): Promise<PropertyValueData> => {
  const apiKey = localStorage.getItem(FIRECRAWL_API_KEY_STORAGE);
  if (!apiKey) {
    throw new Error('Firecrawl API key not found. Please set it first.');
  }

  const firecrawl = new FirecrawlApp({ apiKey });

  try {
    // Create the search URLs for each property website
    const domainUrl = `https://www.domain.com.au/address/${encodeURIComponent(address)}`;
    const realEstateUrl = `https://www.realestate.com.au/property/${encodeURIComponent(address)}`;
    const propertyValueUrl = `https://www.propertyvalue.com.au/address/${encodeURIComponent(address)}`;

    // Crawl all websites concurrently
    const [domainData, realEstateData, propertyValueData] = await Promise.all([
      firecrawl.crawlUrl(domainUrl),
      firecrawl.crawlUrl(realEstateUrl),
      firecrawl.crawlUrl(propertyValueUrl)
    ]);

    // Extract price information using regular expressions
    const findPrice = (text: string): number | null => {
      const priceMatch = text.match(/\$([0-9,]+)/);
      return priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : null;
    };

    // Extract prices from the crawled data
    const domainPrice = findPrice(JSON.stringify(domainData)) || 0;
    const realEstatePrice = findPrice(JSON.stringify(realEstateData)) || 0;
    const propertyValuePrice = findPrice(JSON.stringify(propertyValueData)) || 0;

    // Calculate average price (excluding zeros)
    const validPrices = [domainPrice, realEstatePrice, propertyValuePrice].filter(price => price > 0);
    const avgValue = validPrices.length > 0 
      ? Math.round(validPrices.reduce((a, b) => a + b, 0) / validPrices.length)
      : 0;

    // Extract property details using regex patterns
    const findBedrooms = (text: string): number => {
      const match = text.match(/(\d+)\s*(?:bed|bedroom)/i);
      return match ? parseInt(match[1]) : 0;
    };

    const findBathrooms = (text: string): number => {
      const match = text.match(/(\d+)\s*(?:bath|bathroom)/i);
      return match ? parseInt(match[1]) : 0;
    };

    const findParking = (text: string): number => {
      const match = text.match(/(\d+)\s*(?:car|parking|garage)/i);
      return match ? parseInt(match[1]) : 0;
    };

    const findLandSize = (text: string): number => {
      const match = text.match(/(\d+)\s*(?:m²|sqm|square meters)/i);
      return match ? parseInt(match[1]) : 0;
    };

    const allText = JSON.stringify([domainData, realEstateData, propertyValueData]);
    
    return {
      address: address,
      estimatedValue: avgValue,
      bedrooms: findBedrooms(allText),
      bathrooms: findBathrooms(allText),
      parkingSpaces: findParking(allText),
      landSize: findLandSize(allText),
      propertyType: allText.toLowerCase().includes('apartment') ? 'Apartment' : 
                   allText.toLowerCase().includes('townhouse') ? 'Townhouse' : 'House',
      sources: [
        {
          name: "Domain.com.au",
          estimate: domainPrice || undefined,
          url: domainUrl
        },
        {
          name: "Realestate.com.au",
          estimate: realEstatePrice || undefined,
          url: realEstateUrl
        },
        {
          name: "PropertyValue.com.au",
          estimate: propertyValuePrice || undefined,
          url: propertyValueUrl
        }
      ]
    };
  } catch (error) {
    console.error('Error crawling property data:', error);
    throw new Error('Failed to fetch property data. Please try again.');
  }
};

