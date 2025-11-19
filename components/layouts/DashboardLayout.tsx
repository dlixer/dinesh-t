import React, { useState } from 'react';
// FIX: Rewriting import to fix potential tooling issues and adding useLocation.
import { NavLink, Link, useLocation } from 'react-router-dom';
import LogoIcon from '../icons/LogoIcon';
import DashboardIcon from '../icons/DashboardIcon';
import AutomationIcon from '../icons/AutomationIcon';
import ContactsIcon from '../icons/ContactsIcon';
import GiftIcon from '../icons/GiftIcon';
import SupportIcon from '../icons/SupportIcon';
import SettingsIcon from '../icons/SettingsIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import UserIcon from '../icons/UserIcon';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { name: 'Automations', path: '/automations', icon: AutomationIcon },
  { name: 'Contacts', path: '/contacts', icon: ContactsIcon },
  { name: 'Refer & Earn', path: '/referral', icon: GiftIcon },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();

  // Find the current page title
  const pageTitle = navItems.find(item => location.pathname.startsWith(item.path))?.name;

  // Hide header on automation builder page for a more focused UI
  const showHeader = location.pathname !== '/automations/new';

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200">
          <LogoIcon className="h-9" />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
           <div className="p-4 rounded-lg bg-purple-50 text-center">
              <h4 className="font-bold text-purple-800">Upgrade to PRO</h4>
              <p className="text-xs text-purple-700 mt-1">Unlock all features and grow your account faster.</p>
              <Link to="/paymentplan" className="mt-3 inline-block btn-primary text-white text-sm font-medium px-4 py-2 rounded-lg transition-all">
                Upgrade Now
              </Link>
           </div>
           <div className="mt-4 text-center">
            <Link to="/support" className="text-sm text-gray-600 hover:text-purple-600 font-medium flex items-center justify-center gap-2">
                <SupportIcon className="w-5 h-5" />
                <span>Support / Feedback</span>
            </Link>
           </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {showHeader && (
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
            <div>
                <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
            </div>
            <div className="relative">
                <button 
                onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <UserIcon className="w-5 h-5" />
                </div>
                <span>Your Account</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileMenuOpen(false)}>My Account</Link>
                    {/* FIX: Using Link for SPA navigation instead of anchor tag with href. */}
                    <Link to="/login" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
                </div>
                )}
            </div>
            </header>
        )}
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;