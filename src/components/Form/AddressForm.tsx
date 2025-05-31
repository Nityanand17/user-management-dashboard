import React from 'react';
import { motion } from 'framer-motion';
import { useUserForm } from '../../context/UserFormContext';

const AddressForm: React.FC = () => {
  const { formData, updateFormData } = useUserForm();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ 
      address: { 
        ...formData.address, 
        [name]: value 
      } 
    });
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
        <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Street Address
        </label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.address.street}
          onChange={handleChange}
          placeholder="123 Main St"
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white
            ${formData.address.street.trim() ? 'border-gray-300 focus:ring-blue-500' : 'border-red-300 focus:ring-red-500'}`}
        />
        {!formData.address.street.trim() && (
          <p className="mt-1 text-sm text-red-500">Street address is required</p>
        )}
      </div>
      
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.address.city}
          onChange={handleChange}
          placeholder="New York"
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white
            ${formData.address.city.trim() ? 'border-gray-300 focus:ring-blue-500' : 'border-red-300 focus:ring-red-500'}`}
        />
        {!formData.address.city.trim() && (
          <p className="mt-1 text-sm text-red-500">City is required</p>
        )}
      </div>
      
      <div>
        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          ZIP Code
        </label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={formData.address.zipcode}
          onChange={handleChange}
          placeholder="10001"
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white
            ${formData.address.zipcode.trim() ? 'border-gray-300 focus:ring-blue-500' : 'border-red-300 focus:ring-red-500'}`}
        />
        {!formData.address.zipcode.trim() && (
          <p className="mt-1 text-sm text-red-500">ZIP code is required</p>
        )}
      </div>
    </motion.div>
  );
};

export default AddressForm; 