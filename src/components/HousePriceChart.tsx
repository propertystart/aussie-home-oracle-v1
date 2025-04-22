
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for average house prices (April 2020 - April 2025)
const priceData = [
  { date: '2020-04', price: 850000 },
  { date: '2020-07', price: 865000 },
  { date: '2020-10', price: 878000 },
  { date: '2021-01', price: 895000 },
  { date: '2021-04', price: 925000 },
  { date: '2021-07', price: 968000 },
  { date: '2021-10', price: 1015000 },
  { date: '2022-01', price: 1080000 },
  { date: '2022-04', price: 1150000 },
  { date: '2022-07', price: 1185000 },
  { date: '2022-10', price: 1210000 },
  { date: '2023-01', price: 1195000 },
  { date: '2023-04', price: 1175000 },
  { date: '2023-07', price: 1168000 },
  { date: '2023-10', price: 1182000 },
  { date: '2024-01', price: 1205000 },
  { date: '2024-04', price: 1235000 },
  { date: '2024-07', price: 1258000 },
  { date: '2024-10', price: 1275000 },
  { date: '2025-01', price: 1295000 },
  { date: '2025-04', price: 1320000 },
];

const HousePriceChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Average House Price</CardTitle>
        <CardDescription>Historical average house prices in the selected suburb</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={priceData}
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
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Average Price']}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' });
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
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

export default HousePriceChart;
