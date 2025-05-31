import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Card from '../components/UI/Card';
import { useUsers } from '../context/UserContext';

const Dashboard: React.FC = () => {
  const { users, loading, error } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');

  // Update filtered users when users or search term changes
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = users.filter(
        user => 
          user.name.toLowerCase().includes(term) || 
          user.address.city.toLowerCase().includes(term)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <DashboardLayout title="Users">
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading users...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title="Users">
        <Card className="text-center py-10 text-red-500">
          <p>{error}</p>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Users">
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* User list */}
      {filteredUsers.length === 0 ? (
        <Card className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No users found matching your search.</p>
        </Card>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredUsers.map((user) => (
            <motion.div key={user.id} variants={item}>
              <Card>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{user.name}</h3>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Phone:</span> {user.phone}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">City:</span> {user.address.city}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard; 