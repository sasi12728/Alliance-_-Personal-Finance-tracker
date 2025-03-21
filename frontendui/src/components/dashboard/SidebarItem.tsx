
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  path: string;
  onClick: () => void;
  isDarkMode: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive,
  isCollapsed,
  path,
  onClick,
  isDarkMode
}) => {
  return (
    <li className={`
      ${isActive ? (isDarkMode ? 'bg-gray-700' : 'bg-blue-100 text-blue-600') : ''}
      ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
      rounded-md transition-colors
    `}>
      <Link
        to={path}
        className="flex items-center px-3 py-2"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <span className={`${isActive ? 'text-blue-500' : ''}`}>
          {icon}
        </span>
        {!isCollapsed && (
          <span className="ml-3 text-sm font-medium">{label}</span>
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;
