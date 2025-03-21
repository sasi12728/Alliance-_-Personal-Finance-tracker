
import React from 'react';
import { Button } from '@/components/ui/button';
import SummaryCards from './SummaryCards';
import AccountsCard from './AccountsCard';
import CreditCardsCard from './CreditCardsCard';
import RecentTransactionsTable from '../transactions/RecentTransactionsTable';

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  isDefault: boolean;
  userId: string;
}

interface CreditCard {
  id: string;
  name: string;
  balance: number;
  limit: number;
  userId: string;
}

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

interface OverviewContentProps {
  totalBalance: number;
  totalCreditCardBalance: number;
  netBalance: number;
  currentMonthIncome: number;
  currentMonthExpenses: number;
  currentMonthNet: number;
  lastMonthIncome: number;
  lastMonthExpenses: number;
  lastMonthNet: number;
  accounts: Account[];
  creditCards: CreditCard[];
  recentTransactions: Transaction[];
  onAddTransaction: () => void;
  onAddAccount: () => void;
  onAddCreditCard: () => void;
}

const OverviewContent: React.FC<OverviewContentProps> = ({
  totalBalance,
  totalCreditCardBalance,
  netBalance,
  currentMonthIncome,
  currentMonthExpenses,
  currentMonthNet,
  lastMonthIncome,
  lastMonthExpenses,
  lastMonthNet,
  accounts,
  creditCards,
  recentTransactions,
  onAddTransaction,
  onAddAccount,
  onAddCreditCard
}) => {
  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <SummaryCards 
        totalBalance={totalBalance}
        totalCreditCardBalance={totalCreditCardBalance}
        netBalance={netBalance}
        currentMonthIncome={currentMonthIncome}
        currentMonthExpenses={currentMonthExpenses}
        currentMonthNet={currentMonthNet}
        lastMonthIncome={lastMonthIncome}
        lastMonthExpenses={lastMonthExpenses}
        lastMonthNet={lastMonthNet}
      />
      
      {/* Accounts and Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <AccountsCard 
          accounts={accounts}
          onAddAccount={onAddAccount}
        />
        <CreditCardsCard 
          creditCards={creditCards}
          onAddCreditCard={onAddCreditCard}
        />
      </div>
      
      {/* Recent Transactions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddTransaction}
          >
            Add Transaction
          </Button>
        </div>
        <RecentTransactionsTable transactions={recentTransactions.slice(0, 5)} />
      </div>
    </div>
  );
};

export default OverviewContent;
