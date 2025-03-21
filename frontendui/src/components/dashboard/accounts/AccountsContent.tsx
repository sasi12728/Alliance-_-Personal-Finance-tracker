
import React from 'react';
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

interface AccountsContentProps {
  accounts: Account[];
  onAddAccount: () => void;
}

const AccountsContent: React.FC<AccountsContentProps> = ({ accounts, onAddAccount }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Accounts</h2>
        <Button onClick={onAddAccount}>Add Account</Button>
      </div>
      
      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map(account => (
            <Card key={account.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{account.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Balance</span>
                    <span className={`font-semibold ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(account.balance)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Type</span>
                    <span className="capitalize">{account.type}</span>
                  </div>
                  {account.isDefault && (
                    <div className="mt-2 text-sm text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-center">
                      Default Account
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">No accounts found. Add your first account to start tracking your finances.</p>
        </div>
      )}
    </div>
  );
};

export default AccountsContent;
