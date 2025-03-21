
import React from 'react';
import MonthlyOverviewChart from './MonthlyOverviewChart';
import CategorySpendingChart from './CategorySpendingChart';
import SavingsRateChart from './SavingsRateChart';
import NetWorthChart from './NetWorthChart';

interface MonthlyData {
  name: string;
  income: number;
  expenses: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface SavingsData {
  name: string;
  rate: number;
}

interface NetWorthData {
  name: string;
  assets: number;
  liabilities: number;
}

interface AnalyticsContentProps {
  monthlyOverviewData: MonthlyData[];
  categorySpendingData: CategoryData[];
  categoryColors: Record<string, string>;
  saveRateData: SavingsData[];
  netWorthData: NetWorthData[];
  isDarkMode: boolean;
}

const AnalyticsContent: React.FC<AnalyticsContentProps> = ({
  monthlyOverviewData,
  categorySpendingData,
  categoryColors,
  saveRateData,
  netWorthData,
  isDarkMode
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <MonthlyOverviewChart 
          data={monthlyOverviewData} 
          isDarkMode={isDarkMode}
        />
        <CategorySpendingChart 
          data={categorySpendingData} 
          categoryColors={categoryColors}
          isDarkMode={isDarkMode}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SavingsRateChart 
          data={saveRateData} 
          isDarkMode={isDarkMode}
        />
        <NetWorthChart 
          data={netWorthData} 
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default AnalyticsContent;
