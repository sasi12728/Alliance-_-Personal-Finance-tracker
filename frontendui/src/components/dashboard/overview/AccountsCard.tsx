
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

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  isDefault: boolean;
  userId: string;
}

interface AccountsCardProps {
  accounts: Account[];
  onAddAccount: () => void;
}

const AccountsCard: React.FC<AccountsCardProps> = ({ accounts, onAddAccount }) => {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Accounts</CardTitle>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0" 
          onClick={onAddAccount}
        >
          <Plus size={16} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accounts.map(account => (
            <div key={account.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{account.name}</div>
                <div className="text-xs text-gray-500">EUR - €</div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {account.balance >= 0 ? '+' : ''}{formatCurrency(account.balance)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountsCard;
