import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Card from '../components/UI/Card';
import BasicInfoForm from '../components/Form/BasicInfoForm';
import AddressForm from '../components/Form/AddressForm';
import ReviewForm from '../components/Form/ReviewForm';
import { useUserForm } from '../context/UserFormContext';
import { useUsers } from '../context/UserContext';

const AddUser: React.FC = () => {
  const { currentStep, setCurrentStep, formData, isFormValid, resetForm } = useUserForm();
  const { addUser } = useUsers();
  
  const steps = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'address', label: 'Address' },
    { id: 'review', label: 'Review' },
  ];
  
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  
  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id as any);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id as any);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid('review')) {
      // Add the user to our context
      addUser(formData);
      
      // Log the form data to the console
      console.log('Submitting user data:', formData);
      
      // Show success toast
      toast.success('User added successfully!');
      
      // Reset form after submission
      resetForm();
      
      // Navigate to dashboard
      window.location.href = '/dashboard';
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return <BasicInfoForm />;
      case 'address':
        return <AddressForm />;
      case 'review':
        return <ReviewForm />;
      default:
        return <BasicInfoForm />;
    }
  };
  
  return (
    <DashboardLayout title="Add New User">
      <Card className="max-w-2xl mx-auto">
        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step circle */}
                <div 
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${currentStepIndex >= index 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600'}`}
                >
                  <span 
                    className={`text-sm font-medium
                      ${currentStepIndex >= index 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {index + 1}
                  </span>
                  
                  {/* Step label */}
                  <span 
                    className={`absolute -bottom-6 whitespace-nowrap text-xs font-medium
                      ${currentStepIndex >= index 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {step.label}
                  </span>
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div 
                    className={`flex-1 h-0.5 mx-2
                      ${currentStepIndex > index 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300 dark:bg-gray-600'}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Form content */}
          <div className="mb-8 min-h-[300px]">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>
          
          {/* Form navigation */}
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={goToPreviousStep}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                ${currentStepIndex === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'}`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            
            <div className="flex gap-3">
              <a
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              >
                Cancel
              </a>
              
              {currentStepIndex === steps.length - 1 ? (
                <button
                  type="submit"
                  disabled={!isFormValid('review')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                    ${isFormValid('review')
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}
                >
                  <Check className="h-4 w-4" />
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goToNextStep}
                  disabled={!isFormValid(currentStep)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                    ${isFormValid(currentStep)
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default AddUser; 