
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  Label
} from "recharts";
import { ValueDataPoint, calculateNPV } from "@/services/houseValueService";
import { ViewComAuProperty, calculateNPVFromViewComAu } from "@/services/viewComAuService";

interface NetPresentValueChartProps {
  data: ValueDataPoint[];
  viewComAuData?: ViewComAuProperty;
  discountRate?: number;
}

const NetPresentValueChart: React.FC<NetPresentValueChartProps> = ({ 
  data, 
  viewComAuData, 
  discountRate = 0.05 
}) => {
  const currentYear = new Date().getFullYear();
  
  // Use View.com.au data for NPV if available, otherwise use the regular data
  const npv = viewComAuData 
    ? calculateNPVFromViewComAu(viewComAuData, discountRate)
    : calculateNPV(data, discountRate);
  
  // Format currency for labels
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isHistorical = payload[0].payload.isHistorical;
      const source = viewComAuData ? "View.com.au" : "Market estimate";
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow">
          <p className="font-semibold">{label}</p>
          <p className="text-aussie-blue">
            {isHistorical ? "Historical Price: " : "Predicted Price: "}
            <span className="font-semibold">{formatCurrency(payload[0].value)}</span>
          </p>
          {!isHistorical && (
            <p className="text-xs text-gray-500">Based on {source} projections</p>
          )}
          {viewComAuData && (
            <p className="text-xs text-gray-500 mt-1">Data source: View.com.au</p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-aussie-blue">Property Value Projection</h2>
        <p className="text-gray-500">
          {viewComAuData 
            ? "Historical and projected property values from View.com.au"
            : "Historical and projected property values"}
        </p>
      </div>

      <div className="p-4 mb-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="font-medium">Net Present Value (NPV): <span className="font-bold">{formatCurrency(npv)}</span></p>
        <p className="text-sm text-gray-600">Using {discountRate * 100}% discount rate</p>
        {viewComAuData && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Property details from View.com.au:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
              <p className="text-xs text-gray-600">Type: {viewComAuData.propertyType}</p>
              <p className="text-xs text-gray-600">Bedrooms: {viewComAuData.bedrooms}</p>
              <p className="text-xs text-gray-600">Bathrooms: {viewComAuData.bathrooms}</p>
              <p className="text-xs text-gray-600">Car spaces: {viewComAuData.carSpaces}</p>
              {viewComAuData.lastSalePrice && (
                <p className="text-xs text-gray-600 col-span-2">
                  Last sale: {formatCurrency(viewComAuData.lastSalePrice)} ({viewComAuData.lastSaleDate})
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              tickFormatter={(year) => year.toString()}
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              domain={['dataMin - 100000', 'dataMax + 100000']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine 
              x={currentYear} 
              stroke="#888" 
              strokeDasharray="3 3"
            >
              <Label value="Current" position="top" />
            </ReferenceLine>
            <Line 
              type="monotone" 
              dataKey="value" 
              name="Historical Value" 
              stroke="#4F46E5" 
              strokeWidth={2}
              dot={{ fill: '#4F46E5', r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls
              isAnimationActive={true}
            />
            <Line 
              type="monotone" 
              dataKey={(data) => data.isHistorical ? undefined : data.value} 
              name="Predicted Value" 
              stroke="#E11D48" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#E11D48', r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 italic">
        {viewComAuData 
          ? "Note: Data provided by View.com.au. Future values are estimates and may vary."
          : "Note: Predictions are based on historical trends and market analysis. Actual future values may vary."}
      </div>
    </div>
  );
};

export default NetPresentValueChart;
