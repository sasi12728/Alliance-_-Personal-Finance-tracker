
import React from 'react';
import { Button } from '@/components/ui/button';
import TransactionFilters from './TransactionFilters';
import RecentTransactionsTable from './RecentTransactionsTable';

interface Transaction {
  id: string;
  type: string;
  userId: string;
  amount: number;
  accountId: string;
  description: string;
  category: string;
  date: Date;
  isRecurring: boolean;
}

interface TransactionsContentProps {
  filteredTransactions: Transaction[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  uniqueCategories: string[];
  onAddTransaction: () => void;
}

const TransactionsContent: React.FC<TransactionsContentProps> = ({
  filteredTransactions,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  dateRange,
  setDateRange,
  uniqueCategories,
  onAddTransaction
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <Button onClick={onAddTransaction}>Add Transaction</Button>
      </div>
      
      <TransactionFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        uniqueCategories={uniqueCategories}
      />
      
      {filteredTransactions.length > 0 ? (
        <RecentTransactionsTable transactions={filteredTransactions} />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">No transactions found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default TransactionsContent;
