
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Real GDP growth data and forecasts from RBA Statement on Monetary Policy
// Source: https://www.rba.gov.au/publications/smp/2024/feb/economic-outlook.html
const gdpData = [
  { date: '2020-06', growth: -6.3 },  // COVID-19 impact
  { date: '2020-12', growth: -1.1 },
  { date: '2021-06', growth: 9.6 },   // Recovery phase
  { date: '2021-12', growth: 4.2 },
  { date: '2022-06', growth: 3.8 },
  { date: '2022-12', growth: 2.7 },
  { date: '2023-06', growth: 2.1 },
  { date: '2023-12', growth: 1.8 },   // Latest actual data
  { date: '2024-06', growth: 1.6 },   // RBA forecasts
  { date: '2024-12', growth: 1.8 },
  { date: '2025-06', growth: 2.0 },   // Extended forecast
];

const EconomicGrowthChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Economic Growth (GDP)</CardTitle>
        <CardDescription>Historical GDP growth and RBA forecasts (year-ended)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={gdpData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={60}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}`;
                }}
              />
              <YAxis
                tickFormatter={(value) => `${value}%`}
                domain={[-8, 12]}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, 'GDP Growth']}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
                }}
              />
              <Line
                type="monotone"
                dataKey="growth"
                stroke="#2E8B57"
                strokeWidth={2}
                dot={{ fill: '#2E8B57' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EconomicGrowthChart;
