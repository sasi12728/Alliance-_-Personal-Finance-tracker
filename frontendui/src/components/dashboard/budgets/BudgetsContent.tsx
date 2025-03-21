
import React from 'react';
import { Button } from '@/components/ui/button';
import BudgetCard from './BudgetCard';

interface Budget {
  id: string;
  amount: number;
  userId: string;
  category: string;
  spent: number;
  startDate: Date;
  endDate: Date;
}

interface BudgetsContentProps {
  budgets: Budget[];
  onAddBudget: () => void;
}

const BudgetsContent: React.FC<BudgetsContentProps> = ({ budgets, onAddBudget }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Budgets</h2>
        <Button onClick={onAddBudget}>Create Budget</Button>
      </div>
      
      {budgets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map(budget => (
            <BudgetCard key={budget.id} budget={budget} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">No budgets found. Create your first budget to start tracking your spending.</p>
        </div>
      )}
    </div>
  );
};

export default BudgetsContent;
