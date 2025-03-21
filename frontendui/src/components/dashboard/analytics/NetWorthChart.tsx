
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface NetWorthData {
  name: string;
  assets: number;
  liabilities: number;
}

interface NetWorthChartProps {
  data: NetWorthData[];
  isDarkMode: boolean;
}

const NetWorthChart: React.FC<NetWorthChartProps> = ({ data, isDarkMode }) => {
  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((d) => d.assets - d.liabilities));
    const dataMin = Math.min(...data.map((d) => d.assets - d.liabilities));
    
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
    
    return dataMax / (dataMax - dataMin);
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Net Worth</CardTitle>
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
              <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset={gradientOffset()} stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset={gradientOffset()} stopColor="#EF4444" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="assets" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.3} 
                name="Assets"
              />
              <Area 
                type="monotone" 
                dataKey="liabilities" 
                stroke="#EF4444" 
                fill="#EF4444" 
                fillOpacity={0.3}
                name="Liabilities"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetWorthChart;
