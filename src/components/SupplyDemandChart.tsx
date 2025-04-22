
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for average days on market from 2019 to 2024
const marketData = [
  { date: '2019-04', days: 45 },
  { date: '2019-07', days: 48 },
  { date: '2019-10', days: 42 },
  { date: '2020-03', days: 55 },
  { date: '2020-06', days: 62 },
  { date: '2020-09', days: 58 },
  { date: '2020-12', days: 52 },
  { date: '2021-03', days: 38 },
  { date: '2021-06', days: 32 },
  { date: '2021-09', days: 28 },
  { date: '2021-12', days: 25 },
  { date: '2022-03', days: 22 },
  { date: '2022-06', days: 24 },
  { date: '2022-09', days: 29 },
  { date: '2022-12', days: 35 },
  { date: '2023-03', days: 42 },
  { date: '2023-06', days: 48 },
  { date: '2023-09', days: 52 },
  { date: '2023-12', days: 49 },
  { date: '2024-02', days: 45 },
];

const SupplyDemandChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Supply & Demand Indicators</CardTitle>
        <CardDescription>Average days on market for similar properties</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={marketData}
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
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tickFormatter={(value) => `${value} days`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                formatter={(value) => [`${value} days`, 'Average Days on Market']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="days"
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

export default SupplyDemandChart;
