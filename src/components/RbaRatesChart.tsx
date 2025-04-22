import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Real RBA cash rate data from www.rba.gov.au (last 5 years from April 2024)
const rbaData = [
  { date: '2024-02', rate: 4.35 },
  { date: '2023-11', rate: 4.35 },
  { date: '2023-06', rate: 4.10 },
  { date: '2023-05', rate: 3.85 },
  { date: '2023-03', rate: 3.60 },
  { date: '2023-02', rate: 3.35 },
  { date: '2022-12', rate: 3.10 },
  { date: '2022-11', rate: 2.85 },
  { date: '2022-10', rate: 2.60 },
  { date: '2022-09', rate: 2.35 },
  { date: '2022-08', rate: 1.85 },
  { date: '2022-07', rate: 1.35 },
  { date: '2022-06', rate: 0.85 },
  { date: '2022-05', rate: 0.35 },
  { date: '2021-11', rate: 0.10 },
  { date: '2021-06', rate: 0.10 },
  { date: '2020-11', rate: 0.10 },
  { date: '2020-03', rate: 0.25 },
  { date: '2019-10', rate: 0.75 },
  { date: '2019-07', rate: 1.00 },
  { date: '2019-05', rate: 1.50 }
].reverse();

const RbaRatesChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>RBA Cash Rate Target</CardTitle>
        <CardDescription>Historical cash rate changes from April 2019 to present</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={rbaData}
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
                tickFormatter={(value) => `${value}%`}
                domain={[0, 5]}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Cash Rate']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#003366"
                strokeWidth={2}
                dot={{ fill: '#003366' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RbaRatesChart;
