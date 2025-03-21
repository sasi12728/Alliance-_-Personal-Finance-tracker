
import React from 'react';
import { 
  BarChart3,
  Clock,
  Calendar,
  Wallet,
  CreditCard,
  LineChart,
  Menu,
  User,
  Settings as SettingsIcon
} from 'lucide-react';
import SidebarItem from './SidebarItem';

interface DashboardSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  setIsSettingsOpen: (open: boolean) => void;
  isDarkMode: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedTab,
  setSelectedTab,
  setIsSettingsOpen,
  isDarkMode
}) => {
  return (
    <div className={`${isSidebarOpen ? 'w-60' : 'w-20'} ${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-full flex flex-col shadow-md transition-all duration-300`}>
      <div className="p-4 flex items-center">
        {isSidebarOpen ? (
          <div className="flex items-center">
            <span className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center mr-2">F</span>
            <span className="font-bold text-lg">FinanceFlow</span>
          </div>
        ) : (
          <span className="bg-primary text-primary-foreground w-10 h-10 rounded-md flex items-center justify-center mx-auto">F</span>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          <SidebarItem
            icon={<BarChart3 />}
            label="Overview"
            isActive={selectedTab === "overview"}
            isCollapsed={!isSidebarOpen}
            path="#"
            onClick={() => setSelectedTab("overview")}
            isDarkMode={isDarkMode}
          />
          <SidebarItem
            icon={<Clock />}
            label="Transactions"
            isActive={selectedTab === "transactions"}
            isCollapsed={!isSidebarOpen}
            path="#"
            onClick={() => setSelectedTab("transactions")}
            isDarkMode={isDarkMode}
          />
          <SidebarItem
            icon={<Calendar />}
            label="Budgets"
            isActive={selectedTab === "budgets"}
            isCollapsed={!isSidebarOpen}
            path="#"
            onClick={() => setSelectedTab("budgets")}
            isDarkMode={isDarkMode}
          />
          <SidebarItem
            icon={<Wallet />}
            label="Accounts"
            isActive={selectedTab === "accounts"}
            isCollapsed={!isSidebarOpen}
            path="#"
            onClick={() => setSelectedTab("accounts")}
            isDarkMode={isDarkMode}
          />
          <SidebarItem
            icon={<CreditCard />}
            label="Credit cards"
            isActive={selectedTab === "credit-cards"}
            isCollapsed={!isSidebarOpen}
            path="#"
            onClick={() => setSelectedTab("credit-cards")}
            isDarkMode={isDarkMode}
          />
          <SidebarItem
            icon={<LineChart />}
            label="Analytics"
            isActive={selectedTab === "analytics"}
            isCollapsed={!isSidebarOpen}
            path="#"
            onClick={() => setSelectedTab("analytics")}
            isDarkMode={isDarkMode}
          />
          <SidebarItem
            icon={<Calendar />}
            label="Calendar"
            isActive={selectedTab === "calendar"}
            isCollapsed={!isSidebarOpen}
            path="#"
            onClick={() => setSelectedTab("calendar")}
            isDarkMode={isDarkMode}
          />
          <SidebarItem
            icon={<User />}
            label="Profile"
            isActive={selectedTab === "profile"}
            isCollapsed={!isSidebarOpen}
            path="#"
            onClick={() => setSelectedTab("profile")}
            isDarkMode={isDarkMode}
          />
          <SidebarItem
            icon={<SettingsIcon />}
            label="Settings"
            isActive={selectedTab === "settings"}
            isCollapsed={!isSidebarOpen}
            path="#"
            onClick={() => setIsSettingsOpen(true)}
            isDarkMode={isDarkMode}
          />
        </ul>
      </nav>
      
      <div className="p-4 border-t dark:border-gray-700">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`w-full flex items-center justify-center p-2 rounded-md ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <Menu size={20} />
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
