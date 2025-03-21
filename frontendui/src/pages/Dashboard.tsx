
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from '@/contexts/ThemeContext';
import ProfileMenu from '@/components/ProfileMenu';
import SettingsDialog from '@/components/SettingsDialog';

// Dashboard components
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import OverviewContent from '@/components/dashboard/overview/OverviewContent';
import TransactionsContent from '@/components/dashboard/transactions/TransactionsContent';
import BudgetsContent from '@/components/dashboard/budgets/BudgetsContent';
import AccountsContent from '@/components/dashboard/accounts/AccountsContent';
import CreditCardsContent from '@/components/dashboard/creditCards/CreditCardsContent';
import AnalyticsContent from '@/components/dashboard/analytics/AnalyticsContent';
import CalendarContent from '@/components/dashboard/calendar/CalendarContent';
import ProfileContent from '@/components/dashboard/profile/ProfileContent';

// Dialogs
import AddTransactionDialog from '@/components/dashboard/dialogs/AddTransactionDialog';
import AddBudgetDialog from '@/components/dashboard/dialogs/AddBudgetDialog';
import AddAccountDialog from '@/components/dashboard/dialogs/AddAccountDialog';

// Sample data based on the provided ER diagram
const userData = {
  name: "John Doe",
  email: "john@example.com",
  imageUrl: ""
};

const accounts = [
  { id: "1", name: "Wallet", type: "cash", balance: 90.24, isDefault: false, userId: "1" },
  { id: "2", name: "Bank account", type: "bank", balance: 13537.47, isDefault: true, userId: "1" }
];

const creditCards = [
  { id: "1", name: "Credit card", balance: -189.00, limit: 1000, userId: "1" }
];

const transactions = [
  { id: "1", type: "expense", userId: "1", amount: 62.00, accountId: "1", description: "Bar", category: "Entertainment", date: new Date("2023-05-29"), isRecurring: false },
  { id: "2", type: "expense", userId: "1", amount: 45.50, accountId: "1", description: "Restaurant", category: "Eating out", date: new Date("2023-05-26"), isRecurring: false },
  { id: "3", type: "expense", userId: "1", amount: 30.00, accountId: "1", description: "Gas station", category: "Fuel", date: new Date("2023-05-25"), isRecurring: false },
  { id: "4", type: "income", userId: "1", amount: 120.00, accountId: "2", description: "Freelance work", category: "Income", date: new Date("2023-05-24"), isRecurring: false },
  { id: "5", type: "expense", userId: "1", amount: 15.20, accountId: "2", description: "Grocery shopping", category: "Food", date: new Date("2023-05-23"), isRecurring: false },
  { id: "6", type: "expense", userId: "1", amount: 89.99, accountId: "2", description: "New shoes", category: "Shopping", date: new Date("2023-05-22"), isRecurring: false },
  { id: "7", type: "income", userId: "1", amount: 2500.00, accountId: "2", description: "Salary", category: "Income", date: new Date("2023-05-15"), isRecurring: true },
  { id: "8", type: "expense", userId: "1", amount: 800.00, accountId: "2", description: "Rent", category: "Housing", date: new Date("2023-05-01"), isRecurring: true },
];

const budgets = [
  { id: "1", amount: 30.00, userId: "1", category: "Entertainment", spent: 8.00, startDate: new Date("2023-05-27"), endDate: new Date("2023-06-02") },
  { id: "2", amount: 100.00, userId: "1", category: "Eating out", spent: 45.50, startDate: new Date("2023-05-01"), endDate: new Date("2023-05-31") },
  { id: "3", amount: 120.00, userId: "1", category: "Fuel", spent: 30.00, startDate: new Date("2023-05-01"), endDate: new Date("2023-05-31") },
  { id: "4", amount: 300.00, userId: "1", category: "Shopping", spent: 89.99, startDate: new Date("2023-05-01"), endDate: new Date("2023-05-31") },
  { id: "5", amount: 200.00, userId: "1", category: "Food", spent: 15.20, startDate: new Date("2023-05-01"), endDate: new Date("2023-05-31") },
  { id: "6", amount: 1000.00, userId: "1", category: "Housing", spent: 800.00, startDate: new Date("2023-05-01"), endDate: new Date("2023-05-31") },
];

// These are for the analytics charts
const monthlyOverviewData = [
  { name: 'Jan', income: 4500, expenses: 3700 },
  { name: 'Feb', income: 4200, expenses: 3100 },
  { name: 'Mar', income: 4800, expenses: 3800 },
  { name: 'Apr', income: 4900, expenses: 3300 },
  { name: 'May', income: 5000, expenses: 3500 },
  { name: 'Jun', income: 4600, expenses: 3600 },
  { name: 'Jul', income: 5100, expenses: 3400 },
  { name: 'Aug', income: 5200, expenses: 3800 },
  { name: 'Sep', income: 5500, expenses: 4000 },
  { name: 'Oct', income: 5300, expenses: 3900 },
  { name: 'Nov', income: 5400, expenses: 4100 },
  { name: 'Dec', income: 5800, expenses: 4600 },
];

const categorySpendingData = [
  { name: 'Housing', value: 1200 },
  { name: 'Food', value: 450 },
  { name: 'Transportation', value: 300 },
  { name: 'Entertainment', value: 250 },
  { name: 'Shopping', value: 400 },
  { name: 'Utilities', value: 200 },
  { name: 'Healthcare', value: 150 },
  { name: 'Other', value: 100 },
];

const CATEGORY_COLORS = {
  'Housing': '#8B5CF6',
  'Food': '#10B981',
  'Transportation': '#F59E0B',
  'Entertainment': '#EF4444',
  'Shopping': '#3B82F6',
  'Utilities': '#6366F1',
  'Healthcare': '#EC4899',
  'Other': '#8B5CF6',
  'Eating out': '#EC4899',
  'Fuel': '#F59E0B',
  'Income': '#10B981',
};

const saveRateData = [
  { name: 'Jan', rate: 15 },
  { name: 'Feb', rate: 18 },
  { name: 'Mar', rate: 14 },
  { name: 'Apr', rate: 20 },
  { name: 'May', rate: 22 },
  { name: 'Jun', rate: 19 },
  { name: 'Jul', rate: 23 },
  { name: 'Aug', rate: 25 },
  { name: 'Sep', rate: 21 },
  { name: 'Oct', rate: 24 },
  { name: 'Nov', rate: 26 },
  { name: 'Dec', rate: 28 },
];

const netWorthData = [
  { name: 'Jan', assets: 15000, liabilities: 8000 },
  { name: 'Feb', assets: 15500, liabilities: 7800 },
  { name: 'Mar', assets: 16000, liabilities: 7600 },
  { name: 'Apr', assets: 16200, liabilities: 7500 },
  { name: 'May', assets: 16800, liabilities: 7300 },
  { name: 'Jun', assets: 17200, liabilities: 7100 },
  { name: 'Jul', assets: 17800, liabilities: 6900 },
  { name: 'Aug', assets: 18200, liabilities: 6700 },
  { name: 'Sep', assets: 18800, liabilities: 6500 },
  { name: 'Oct', assets: 19200, liabilities: 6300 },
  { name: 'Nov', assets: 19800, liabilities: 6100 },
  { name: 'Dec', assets: 20500, liabilities: 6000 },
];

const Dashboard = () => {
  const { toast } = useToast();
  const { isDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  // New transaction form state
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: '',
    account: '1',
    date: new Date(),
    isRecurring: false
  });

  // New budget form state
  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: '',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
  });

  // New account form state
  const [newAccount, setNewAccount] = useState({
    name: '',
    type: 'bank',
    balance: ''
  });
  
  // Calculate summary data
  const totalBalance = accounts.reduce((total, account) => total + account.balance, 0);
  const totalCreditCardBalance = creditCards.reduce((total, card) => total + card.balance, 0);
  const netBalance = totalBalance + totalCreditCardBalance;
  
  // Current month data
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
  });
  
  const currentMonthIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);
    
  const currentMonthExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);
    
  const currentMonthNet = currentMonthIncome - currentMonthExpenses;
  
  // Last month data (shifted back by one month)
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const lastMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === lastMonth && transactionDate.getFullYear() === lastMonthYear;
  });
  
  const lastMonthIncome = lastMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);
    
  const lastMonthExpenses = lastMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);
    
  const lastMonthNet = lastMonthIncome - lastMonthExpenses;

  // Filter transactions based on search and filters
  const handleSearchAndFilter = () => {
    let filtered = [...transactions];
    
    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }
    
    // Apply date filter
    if (dateRange !== "all") {
      const today = new Date();
      let startDate = new Date();
      
      if (dateRange === "today") {
        startDate = new Date(today.setHours(0, 0, 0, 0));
        filtered = filtered.filter(t => new Date(t.date) >= startDate);
      } else if (dateRange === "week") {
        startDate = new Date(today.setDate(today.getDate() - 7));
        filtered = filtered.filter(t => new Date(t.date) >= startDate);
      } else if (dateRange === "month") {
        startDate = new Date(today.setMonth(today.getMonth() - 1));
        filtered = filtered.filter(t => new Date(t.date) >= startDate);
      } else if (dateRange === "year") {
        startDate = new Date(today.setFullYear(today.getFullYear() - 1));
        filtered = filtered.filter(t => new Date(t.date) >= startDate);
      }
    }
    
    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredTransactions(filtered);
  };

  // Handle search and filter changes
  React.useEffect(() => {
    handleSearchAndFilter();
  }, [searchQuery, categoryFilter, dateRange]);

  // Handle new transaction
  const handleAddTransaction = () => {
    const amount = parseFloat(newTransaction.amount);
    
    if (!newTransaction.description || isNaN(amount) || amount <= 0 || !newTransaction.category) {
      toast({
        title: "Invalid input",
        description: "Please fill all required fields with valid values.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would make an API call to add the transaction
    toast({
      title: "Transaction added",
      description: `${transactionType === 'income' ? 'Income' : 'Expense'} of ${amount.toFixed(2)} added successfully.`
    });
    
    setIsAddTransactionOpen(false);
    setNewTransaction({
      description: '',
      amount: '',
      category: '',
      account: '1',
      date: new Date(),
      isRecurring: false
    });
  };

  // Handle new budget
  const handleAddBudget = () => {
    const amount = parseFloat(newBudget.amount);
    
    if (!newBudget.category || isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid input",
        description: "Please fill all required fields with valid values.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would make an API call to add the budget
    toast({
      title: "Budget added",
      description: `Budget of ${amount.toFixed(2)} for ${newBudget.category} added successfully.`
    });
    
    setIsAddBudgetOpen(false);
    setNewBudget({
      category: '',
      amount: '',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
    });
  };

  // Handle new account
  const handleAddAccount = () => {
    const balance = parseFloat(newAccount.balance);
    
    if (!newAccount.name || isNaN(balance)) {
      toast({
        title: "Invalid input",
        description: "Please fill all required fields with valid values.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would make an API call to add the account
    toast({
      title: "Account added",
      description: `${newAccount.name} with balance of ${balance.toFixed(2)} added successfully.`
    });
    
    setIsAddAccountOpen(false);
    setNewAccount({
      name: '',
      type: 'bank',
      balance: ''
    });
  };

  // Get unique categories for filter dropdown
  const uniqueCategories = Array.from(new Set(transactions.map(t => t.category)));
  
  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <DashboardSidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setIsSettingsOpen={setIsSettingsOpen}
        isDarkMode={isDarkMode}
      />
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <DashboardHeader 
          selectedTab={selectedTab}
          isDarkMode={isDarkMode}
          userData={userData}
        />
        
        {/* Dashboard content */}
        <main className="p-4">
          {/* Different tab contents */}
          {selectedTab === "overview" && (
            <OverviewContent 
              totalBalance={totalBalance}
              totalCreditCardBalance={totalCreditCardBalance}
              netBalance={netBalance}
              currentMonthIncome={currentMonthIncome}
              currentMonthExpenses={currentMonthExpenses}
              currentMonthNet={currentMonthNet}
              lastMonthIncome={lastMonthIncome}
              lastMonthExpenses={lastMonthExpenses}
              lastMonthNet={lastMonthNet}
              accounts={accounts}
              creditCards={creditCards}
              recentTransactions={transactions}
              onAddTransaction={() => setIsAddTransactionOpen(true)}
              onAddAccount={() => setIsAddAccountOpen(true)}
              onAddCreditCard={() => {}} // This would be implemented in a real app
            />
          )}
          
          {selectedTab === "transactions" && (
            <TransactionsContent 
              filteredTransactions={filteredTransactions}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              dateRange={dateRange}
              setDateRange={setDateRange}
              uniqueCategories={uniqueCategories}
              onAddTransaction={() => setIsAddTransactionOpen(true)}
            />
          )}
          
          {selectedTab === "budgets" && (
            <BudgetsContent 
              budgets={budgets}
              onAddBudget={() => setIsAddBudgetOpen(true)}
            />
          )}
          
          {selectedTab === "accounts" && (
            <AccountsContent 
              accounts={accounts}
              onAddAccount={() => setIsAddAccountOpen(true)}
            />
          )}
          
          {selectedTab === "credit-cards" && (
            <CreditCardsContent 
              creditCards={creditCards}
              onAddCreditCard={() => {}} // This would be implemented in a real app
            />
          )}
          
          {selectedTab === "analytics" && (
            <AnalyticsContent 
              monthlyOverviewData={monthlyOverviewData}
              categorySpendingData={categorySpendingData}
              categoryColors={CATEGORY_COLORS}
              saveRateData={saveRateData}
              netWorthData={netWorthData}
              isDarkMode={isDarkMode}
            />
          )}
          
          {selectedTab === "calendar" && (
            <CalendarContent 
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              transactions={transactions}
            />
          )}
          
          {selectedTab === "profile" && (
            <ProfileContent 
              userData={userData}
            />
          )}
        </main>
      </div>
      
      {/* Dialogs */}
      <AddTransactionDialog 
        isOpen={isAddTransactionOpen}
        onClose={() => setIsAddTransactionOpen(false)}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
        newTransaction={newTransaction}
        setNewTransaction={setNewTransaction}
        handleAddTransaction={handleAddTransaction}
        accounts={accounts}
        uniqueCategories={uniqueCategories}
      />
      
      <AddBudgetDialog 
        isOpen={isAddBudgetOpen}
        onClose={() => setIsAddBudgetOpen(false)}
        newBudget={newBudget}
        setNewBudget={setNewBudget}
        handleAddBudget={handleAddBudget}
        uniqueCategories={uniqueCategories}
      />
      
      <AddAccountDialog 
        isOpen={isAddAccountOpen}
        onClose={() => setIsAddAccountOpen(false)}
        newAccount={newAccount}
        setNewAccount={setNewAccount}
        handleAddAccount={handleAddAccount}
      />
      
      <SettingsDialog 
        open={isSettingsOpen} 
        onOpenChange={setIsSettingsOpen} 
        user={userData}
      />
    </div>
  );
};

export default Dashboard;
