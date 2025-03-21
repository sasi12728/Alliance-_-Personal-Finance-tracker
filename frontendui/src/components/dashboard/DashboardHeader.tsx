
import React from 'react';
import ProfileMenu from '@/components/ProfileMenu';

interface DashboardHeaderProps {
  selectedTab: string;
  isDarkMode: boolean;
  userData: {
    name: string;
    email: string;
    imageUrl: string;
  };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedTab,
  isDarkMode,
  userData
}) => {
  return (
    <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-blue-500 text-white'} p-4 shadow-md`}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</h1>
        <div className="flex items-center space-x-4">
          <ProfileMenu user={userData} />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
