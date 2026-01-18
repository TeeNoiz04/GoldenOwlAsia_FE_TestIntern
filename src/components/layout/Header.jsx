import React from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { navItems as defaultNavItems } from '@/features/statistics/dashboard.mock';

export default function Header({ sidebarOpen, toggle }) {
  const location = useLocation();
  
  // Find current page title from navItems
  const currentPage = defaultNavItems.find(item => item.path === location.pathname);
  const pageTitle = currentPage?.name || 'Dashboard';

  return (
    <div className="bg-white border-b px-8 py-4 flex justify-between h-16 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={toggle}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h2 className="text-2xl font-bold">{pageTitle}</h2>
      </div>
      <span className="text-sm text-gray-500">Last updated: January 2026</span>
    </div>
  );
}
