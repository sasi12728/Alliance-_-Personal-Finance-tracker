
import React from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface CalendarContentProps {
  currentDate: Date | undefined;
  setCurrentDate: (date: Date | undefined) => void;
  transactions: Transaction[];
}

const CalendarContent: React.FC<CalendarContentProps> = ({
  currentDate,
  setCurrentDate,
  transactions
}) => {
  const getDayTransactions = (day: Date | undefined) => {
    if (!day) return [];
    
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getDate() === day.getDate() &&
        transactionDate.getMonth() === day.getMonth() &&
        transactionDate.getFullYear() === day.getFullYear()
      );
    });
  };
  
  const selectedDayTransactions = getDayTransactions(currentDate);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Financial Calendar</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={currentDate}
              onSelect={setCurrentDate}
              className="mx-auto"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {currentDate ? formatDate(currentDate) : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayTransactions.length > 0 ? (
              <div className="space-y-3">
                {selectedDayTransactions.map(transaction => (
                  <div 
                    key={transaction.id} 
                    className="flex justify-between items-center p-3 rounded border dark:border-gray-700"
                  >
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-xs text-gray-500">{transaction.category}</div>
                    </div>
                    <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                {currentDate 
                  ? 'No transactions for this date.' 
                  : 'Select a date to view transactions.'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarContent;
