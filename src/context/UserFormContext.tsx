import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NewUser, FormStep } from '../types/user';

// Default form data
const defaultFormData: NewUser = {
  name: '',
  email: '',
  address: {
    street: '',
    city: '',
    zipcode: '',
  },
  phone: '',
};

interface UserFormContextType {
  formData: NewUser;
  updateFormData: (data: Partial<NewUser>) => void;
  currentStep: FormStep;
  setCurrentStep: (step: FormStep) => void;
  resetForm: () => void;
  isFormValid: (step: FormStep) => boolean;
}

const UserFormContext = createContext<UserFormContextType | undefined>(undefined);

export const useUserForm = () => {
  const context = useContext(UserFormContext);
  if (!context) {
    throw new Error('useUserForm must be used within a UserFormProvider');
  }
  return context;
};

interface UserFormProviderProps {
  children: ReactNode;
}

export const UserFormProvider: React.FC<UserFormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<NewUser>(() => {
    const savedData = localStorage.getItem('userFormData');
    return savedData ? JSON.parse(savedData) : defaultFormData;
  });
  
  const [currentStep, setCurrentStep] = useState<FormStep>(() => {
    const savedStep = localStorage.getItem('userFormStep');
    return (savedStep as FormStep) || 'basic';
  });

  // Save to localStorage whenever formData or currentStep changes
  useEffect(() => {
    localStorage.setItem('userFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('userFormStep', currentStep);
  }, [currentStep]);

  const updateFormData = (data: Partial<NewUser>) => {
    setFormData(prev => {
      if (data.address) {
        return {
          ...prev,
          ...data,
          address: {
            ...prev.address,
            ...data.address,
          }
        };
      }
      return { ...prev, ...data };
    });
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setCurrentStep('basic');
  };

  const isFormValid = (step: FormStep): boolean => {
    switch (step) {
      case 'basic':
        return Boolean(
          formData.name.trim() && 
          formData.email.trim() && 
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        );
      case 'address':
        return Boolean(
          formData.address.street.trim() && 
          formData.address.city.trim() && 
          formData.address.zipcode.trim()
        );
      case 'review':
        return isFormValid('basic') && isFormValid('address');
      default:
        return false;
    }
  };

  return (
    <UserFormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        resetForm,
        isFormValid,
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
}; 