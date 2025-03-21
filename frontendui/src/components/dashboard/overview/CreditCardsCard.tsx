
import React from 'react';
import { Plus } from 'lucide-react';
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

interface CreditCardsCardProps {
  creditCards: CreditCard[];
  onAddCreditCard: () => void;
}

const CreditCardsCard: React.FC<CreditCardsCardProps> = ({ creditCards, onAddCreditCard }) => {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Credit Cards</CardTitle>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0" 
          onClick={onAddCreditCard}
        >
          <Plus size={16} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {creditCards.map(card => (
            <div key={card.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{card.name}</div>
                <div className="text-xs text-gray-500">
                  Limit: {formatCurrency(card.limit)}
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${card.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(card.balance)}
                </div>
                <div className="text-xs text-gray-500">
                  Available: {formatCurrency(card.limit + card.balance)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditCardsCard;
