
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface CreditCard {
  id: string;
  name: string;
  balance: number;
  limit: number;
  userId: string;
}

interface CreditCardsContentProps {
  creditCards: CreditCard[];
  onAddCreditCard: () => void;
}

const CreditCardsContent: React.FC<CreditCardsContentProps> = ({ creditCards, onAddCreditCard }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Credit Cards</h2>
        <Button onClick={onAddCreditCard}>Add Credit Card</Button>
      </div>
      
      {creditCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {creditCards.map(card => (
            <Card key={card.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{card.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Current Balance</span>
                    <span className={`font-semibold ${card.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(card.balance)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Credit Limit</span>
                    <span>{formatCurrency(card.limit)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Available Credit</span>
                    <span className="text-green-600">
                      {formatCurrency(card.limit + card.balance)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${Math.max(0, 100 - ((card.balance * -1) / card.limit) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Used: {Math.round(((card.balance * -1) / card.limit) * 100)}%</span>
                      <span>Limit: {formatCurrency(card.limit)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">No credit cards found. Add your first credit card to start tracking your expenses.</p>
        </div>
      )}
    </div>
  );
};

export default CreditCardsContent;
