
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Building, DollarSign, Home, Map, Ruler } from "lucide-react";

export interface PropertyValueData {
  address: string;
  estimatedValue: number;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  landSize?: number;
  propertyType?: string;
  lastSoldPrice?: number;
  lastSoldDate?: string;
  sources: {
    name: string;
    estimate?: number;
    url: string;
  }[];
}

interface PropertyResultProps {
  data: PropertyValueData;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0
  }).format(value);
};

const PropertyResult: React.FC<PropertyResultProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border border-slate-200 shadow-lg overflow-hidden">
        <CardHeader className="bg-aussie-blue text-white pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{data.address}</CardTitle>
              <CardDescription className="text-slate-200 mt-1">
                {data.propertyType || "Residential Property"}
              </CardDescription>
            </div>
            {data.propertyType && (
              <Badge className="bg-aussie-gold text-aussie-blue hover:bg-yellow-400">
                {data.propertyType}
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h3 className="text-slate-500 mb-1">Estimated Property Value</h3>
            <div className="flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-aussie-gold mr-1" />
              <span className="text-4xl font-bold text-aussie-blue">
                {formatCurrency(data.estimatedValue)}
              </span>
            </div>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {data.bedrooms && (
              <div className="flex items-center p-3 bg-slate-50 rounded-md">
                <Home className="h-5 w-5 text-slate-600 mr-3" />
                <div>
                  <p className="text-sm text-slate-500">Bedrooms</p>
                  <p className="font-semibold">{data.bedrooms}</p>
                </div>
              </div>
            )}
            
            {data.bathrooms && (
              <div className="flex items-center p-3 bg-slate-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 mr-3">
                  <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path>
                  <line x1="10" x2="8" y1="5" y2="7"></line>
                  <line x1="2" x2="22" y1="12" y2="12"></line>
                  <line x1="7" x2="7" y1="19" y2="21"></line>
                  <line x1="17" x2="17" y1="19" y2="21"></line>
                </svg>
                <div>
                  <p className="text-sm text-slate-500">Bathrooms</p>
                  <p className="font-semibold">{data.bathrooms}</p>
                </div>
              </div>
            )}
            
            {data.parkingSpaces && (
              <div className="flex items-center p-3 bg-slate-50 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 mr-3">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <path d="M8 19h8"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <div>
                  <p className="text-sm text-slate-500">Parking</p>
                  <p className="font-semibold">{data.parkingSpaces} {data.parkingSpaces === 1 ? 'space' : 'spaces'}</p>
                </div>
              </div>
            )}
            
            {data.landSize && (
              <div className="flex items-center p-3 bg-slate-50 rounded-md">
                <Ruler className="h-5 w-5 text-slate-600 mr-3" />
                <div>
                  <p className="text-sm text-slate-500">Land Size</p>
                  <p className="font-semibold">{data.landSize} m²</p>
                </div>
              </div>
            )}
          </div>

          {/* Last Sold Info */}
          {(data.lastSoldPrice || data.lastSoldDate) && (
            <div className="mt-6 p-4 bg-slate-50 rounded-md">
              <h4 className="font-semibold mb-2 flex items-center">
                <Building className="h-5 w-5 mr-2 text-slate-600" />
                Last Sale Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.lastSoldPrice && (
                  <div>
                    <p className="text-sm text-slate-500">Last Sold Price</p>
                    <p className="font-semibold">{formatCurrency(data.lastSoldPrice)}</p>
                  </div>
                )}
                {data.lastSoldDate && (
                  <div>
                    <p className="text-sm text-slate-500">Last Sold Date</p>
                    <p className="font-semibold">{data.lastSoldDate}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sources */}
          <div className="mt-6">
            <h4 className="font-semibold mb-3 flex items-center">
              <Map className="h-5 w-5 mr-2 text-slate-600" />
              Data Sources
            </h4>
            <div className="space-y-2">
              {data.sources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-md">
                  <div className="flex items-center">
                    <span className="font-medium">{source.name}</span>
                    {source.estimate && (
                      <span className="ml-3 text-slate-600">
                        Estimate: {formatCurrency(source.estimate)}
                      </span>
                    )}
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-aussie-blue hover:underline"
                  >
                    View <ArrowUpRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4 bg-slate-50 text-sm text-slate-500">
          <p>
            This is an estimated value based on available data. Actual property value may vary. 
            Please consult a professional valuer for an official property valuation.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PropertyResult;
