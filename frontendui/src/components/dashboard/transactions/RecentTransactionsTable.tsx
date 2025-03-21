
import React from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Clock,
  MoreVertical
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from '@/utils/formatters';

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

interface RecentTransactionsTableProps {
  transactions: Transaction[];
}

const RecentTransactionsTable: React.FC<RecentTransactionsTableProps> = ({ transactions }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium flex items-center">
                <span className={`mr-2 ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </span>
                <div>
                  <div>{transaction.description}</div>
                  {transaction.isRecurring && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      <span>Recurring</span>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell className={`text-right ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentTransactionsTable;
