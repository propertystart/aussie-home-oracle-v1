
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for projected population changes (2024-2029)
const populationData = [
  { year: 2024, change: 2150 },
  { year: 2025, change: 2340 },
  { year: 2026, change: 2580 },
  { year: 2027, change: 2420 },
  { year: 2028, change: 2680 },
  { year: 2029, change: 2890 },
];

const DemographicsChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Local Demographics</CardTitle>
        <CardDescription>Projected annual population change in the municipality</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={populationData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                angle={0}
                textAnchor="middle"
              />
              <YAxis
                tickFormatter={(value) => `${(value >= 0 ? '+' : '')}${value.toLocaleString()}`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                formatter={(value) => [`${(value >= 0 ? '+' : '')}${value.toLocaleString()} people`, 'Net Population Change']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="change"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ fill: '#6366F1' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemographicsChart;

