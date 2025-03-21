
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SavingsData {
  name: string;
  rate: number;
}

interface SavingsRateChartProps {
  data: SavingsData[];
  isDarkMode: boolean;
}

const SavingsRateChart: React.FC<SavingsRateChartProps> = ({ data, isDarkMode }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Savings Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
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
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: isDarkMode ? '#e5e7eb' : '#6b7280' }} 
                axisLine={{ stroke: isDarkMode ? '#4b5563' : '#d1d5db' }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Savings Rate']}
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  color: isDarkMode ? '#e5e7eb' : '#1f2937',
                  border: `1px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`
                }}
              />
              <Area 
                type="monotone" 
                dataKey="rate" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsRateChart;
