import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar({ open, navItems }) {
  return (
    <div className={`${open ? 'w-64' : 'w-0'} bg-white border-r transition-all overflow-hidden flex-shrink-0`}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <BookOpen className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold">TGL Solutions</h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg
                ${item.active ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}
              `}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
