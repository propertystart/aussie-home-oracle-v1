
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample inflation rate data (2019-2024)
const inflationData = [
  { date: '2019-Q1', rate: 1.3 },
  { date: '2019-Q2', rate: 1.6 },
  { date: '2019-Q3', rate: 1.7 },
  { date: '2019-Q4', rate: 1.8 },
  { date: '2020-Q1', rate: 2.2 },
  { date: '2020-Q2', rate: -0.3 },
  { date: '2020-Q3', rate: 0.7 },
  { date: '2020-Q4', rate: 0.9 },
  { date: '2021-Q1', rate: 1.1 },
  { date: '2021-Q2', rate: 3.8 },
  { date: '2021-Q3', rate: 3.0 },
  { date: '2021-Q4', rate: 3.5 },
  { date: '2022-Q1', rate: 5.1 },
  { date: '2022-Q2', rate: 6.1 },
  { date: '2022-Q3', rate: 7.3 },
  { date: '2022-Q4', rate: 7.8 },
  { date: '2023-Q1', rate: 7.0 },
  { date: '2023-Q2', rate: 6.0 },
  { date: '2023-Q3', rate: 5.4 },
  { date: '2023-Q4', rate: 4.1 },
  { date: '2024-Q1', rate: 3.4 },
];

const InflationChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Consumer Price Index (CPI)</CardTitle>
        <CardDescription>Quarterly inflation rate changes over the last 5 years</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={inflationData}
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
              />
              <YAxis
                tickFormatter={(value) => 
                  `${typeof value === 'number' ? value.toFixed(1) : value}%`
                }
                domain={['auto', 'auto']}
              />
              <Tooltip
                formatter={(value) => {
                  const numValue = Number(value);
                  return [`${!isNaN(numValue) ? numValue.toFixed(1) : value}%`, 'Inflation Rate'];
                }}
                labelFormatter={(label) => `Period: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#FF4500"
                strokeWidth={2}
                dot={{ fill: '#FF4500' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InflationChart;

