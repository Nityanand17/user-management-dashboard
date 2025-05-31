import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../components/theme-provider';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 md:w-64 bg-white dark:bg-gray-800 shadow-sm z-10">
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 hidden md:block">Admin Dashboard</h1>
            <div className="md:hidden flex justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <nav className="mt-8 flex-1">
            <ul className="space-y-2 px-2">
              <li>
                <a 
                  href="/" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  <Users className="h-5 w-5" />
                  <span className="hidden md:block">Users</span>
                </a>
              </li>
              <li>
                <a 
                  href="/dashboard/add" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  <Plus className="h-5 w-5" />
                  <span className="hidden md:block">Add User</span>
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="p-4">
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 w-full"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="hidden md:block">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="ml-16 md:ml-64 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
          </header>
          
          <main>{children}</main>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout; 