
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface MonthlyData {
  name: string;
  income: number;
  expenses: number;
}

interface MonthlyOverviewChartProps {
  data: MonthlyData[];
  isDarkMode: boolean;
}

const MonthlyOverviewChart: React.FC<MonthlyOverviewChartProps> = ({ data, isDarkMode }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: isDarkMode ? '#e5e7eb' : '#6b7280' }} 
                axisLine={{ stroke: isDarkMode ? '#4b5563' : '#d1d5db' }}
              />
              <YAxis 
                tickFormatter={(value) => `${value / 1000}k`}
                tick={{ fill: isDarkMode ? '#e5e7eb' : '#6b7280' }} 
                axisLine={{ stroke: isDarkMode ? '#4b5563' : '#d1d5db' }}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  color: isDarkMode ? '#e5e7eb' : '#1f2937',
                  border: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`
                }}
              />
              <Legend />
              <Bar 
                dataKey="income" 
                name="Income" 
                fill="#10B981" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="expenses" 
                name="Expenses" 
                fill="#EF4444" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverviewChart;
