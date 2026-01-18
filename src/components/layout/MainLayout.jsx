import Sidebar from './Sidebar';
import Header from './Header';
import { navItems as defaultNavItems } from '../../features/statistics/dashboard.mock';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Update active state based on current route
  const navItems = defaultNavItems.map(item => ({
    ...item,
    active: item.path === location.pathname
  }));

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar bên trái */}
      <Sidebar navItems={navItems} open={sidebarOpen} />

      {/* Khu vực bên phải */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header phía trên */}
        <Header sidebarOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Nội dung page */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
