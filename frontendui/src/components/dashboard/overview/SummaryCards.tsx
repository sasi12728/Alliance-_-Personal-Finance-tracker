
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface SummaryCardsProps {
  totalBalance: number;
  totalCreditCardBalance: number;
  netBalance: number;
  currentMonthIncome: number;
  currentMonthExpenses: number;
  currentMonthNet: number;
  lastMonthIncome: number;
  lastMonthExpenses: number;
  lastMonthNet: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalBalance,
  totalCreditCardBalance,
  netBalance,
  currentMonthIncome,
  currentMonthExpenses,
  currentMonthNet,
  lastMonthIncome,
  lastMonthExpenses,
  lastMonthNet
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span>Balance:</span>
              <span className="font-semibold text-green-600">{formatCurrency(totalBalance)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Credit cards:</span>
              <span className="font-semibold text-red-600">{formatCurrency(totalCreditCardBalance)}</span>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between items-center">
              <span>Net:</span>
              <span className="font-semibold text-green-600">{formatCurrency(netBalance)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">This month</CardTitle>
            <ChevronDown size={16} className="text-gray-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <div className="flex items-center text-green-600">
                <ChevronUp size={16} />
                <span>{formatCurrency(currentMonthIncome)}</span>
              </div>
              <div className="flex items-center text-red-600">
                <ChevronDown size={16} />
                <span>{formatCurrency(currentMonthExpenses)}</span>
              </div>
            </div>
            <div className="w-16 h-16">
              <div className="w-full h-full rounded-full border-4 border-green-500 relative">
                <div 
                  className="absolute top-0 right-0 bottom-0 left-0 rounded-full border-4 border-red-500"
                  style={{ 
                    clipPath: `inset(0 0 0 ${(currentMonthIncome / (currentMonthIncome + currentMonthExpenses)) * 100}%)` 
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Net:</span>
            <span className={`font-semibold ${currentMonthNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(currentMonthNet)}
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle className="text-sm font-medium text-gray-600">Last month</CardTitle>
            <ChevronDown size={16} className="text-gray-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <div className="flex items-center text-green-600">
                <ChevronUp size={16} />
                <span>{formatCurrency(lastMonthIncome)}</span>
              </div>
              <div className="flex items-center text-red-600">
                <ChevronDown size={16} />
                <span>{formatCurrency(lastMonthExpenses)}</span>
              </div>
            </div>
            <div className="w-16 h-16">
              <div className="w-full h-full rounded-full border-4 border-green-500 relative">
                <div 
                  className="absolute top-0 right-0 bottom-0 left-0 rounded-full border-4 border-red-500"
                  style={{ 
                    clipPath: `inset(0 0 0 ${(lastMonthIncome / (lastMonthIncome + lastMonthExpenses)) * 100}%)` 
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Net:</span>
            <span className={`font-semibold ${lastMonthNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(lastMonthNet)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
