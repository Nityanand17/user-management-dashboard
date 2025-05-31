import React from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from 'sonner';
import { UserFormProvider } from './context/UserFormContext';
import { UserProvider } from './context/UserContext';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';

function App() {
  // Simple routing based on path
  const path = window.location.pathname;
  
  const renderContent = () => {
    if (path === '/dashboard/add') {
      return <AddUser />;
    }
    return <Dashboard />;
  };
  
  return (
    <ThemeProvider defaultTheme="light">
      <UserProvider>
        <UserFormProvider>
          {renderContent()}
          <Toaster position="top-right" />
        </UserFormProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;