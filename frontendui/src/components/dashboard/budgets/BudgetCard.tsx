
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface Budget {
  id: string;
  amount: number;
  userId: string;
  category: string;
  spent: number;
  startDate: Date;
  endDate: Date;
}

interface BudgetCardProps {
  budget: Budget;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
  const percentSpent = (budget.spent / budget.amount) * 100;
  const isOverBudget = budget.spent > budget.amount;

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold">{budget.category}</h3>
            <p className="text-xs text-gray-500">
              {formatDate(budget.startDate)} - {formatDate(budget.endDate)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
            </p>
            <p className={`text-xs ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
              {isOverBudget 
                ? `${Math.round(percentSpent - 100)}% over budget` 
                : `${Math.round(percentSpent)}% used`}
            </p>
          </div>
        </div>
        
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
          <div 
            className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min(percentSpent, 100)}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCard;
