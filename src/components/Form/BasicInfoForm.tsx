import React from 'react';
import { motion } from 'framer-motion';
import { useUserForm } from '../../context/UserFormContext';

const BasicInfoForm: React.FC = () => {
  const { formData, updateFormData } = useUserForm();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white
            ${formData.name.trim() ? 'border-gray-300 focus:ring-blue-500' : 'border-red-300 focus:ring-red-500'}`}
        />
        {!formData.name.trim() && (
          <p className="mt-1 text-sm text-red-500">Name is required</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white
            ${formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) 
              ? 'border-gray-300 focus:ring-blue-500' 
              : 'border-red-300 focus:ring-red-500'}`}
        />
        {!formData.email.trim() ? (
          <p className="mt-1 text-sm text-red-500">Email is required</p>
        ) : !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) && (
          <p className="mt-1 text-sm text-red-500">Please enter a valid email address</p>
        )}
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(123) 456-7890"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
    </motion.div>
  );
};

export default BasicInfoForm; 