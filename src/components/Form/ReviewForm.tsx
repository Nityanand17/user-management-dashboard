import React from 'react';
import { motion } from 'framer-motion';
import { useUserForm } from '../../context/UserFormContext';
import Card from '../UI/Card';

const ReviewForm: React.FC = () => {
  const { formData } = useUserForm();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Name</span>
            <span className="text-sm font-medium text-gray-800 dark:text-white">{formData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
            <span className="text-sm font-medium text-gray-800 dark:text-white">{formData.email}</span>
          </div>
          {formData.phone && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Phone</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white">{formData.phone}</span>
            </div>
          )}
        </div>
      </Card>
      
      <Card className="overflow-hidden">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Address</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Street</span>
            <span className="text-sm font-medium text-gray-800 dark:text-white">{formData.address.street}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">City</span>
            <span className="text-sm font-medium text-gray-800 dark:text-white">{formData.address.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">ZIP Code</span>
            <span className="text-sm font-medium text-gray-800 dark:text-white">{formData.address.zipcode}</span>
          </div>
        </div>
      </Card>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
        Please review your information above before submitting.
      </p>
    </motion.div>
  );
};

export default ReviewForm; 