import React from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from 'sonner';
import { UserFormProvider } from './context/UserFormContext';
import { UserProvider } from './context/UserContext';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';

function App() {
  // Get the current path
  const path = window.location.pathname;
  
  // Render the appropriate component based on the path
  const renderContent = () => {
    // Handle both root path and /dashboard path
    if (path === '/' || path === '/dashboard' || path === '') {
      return <Dashboard />;
    }
    // Handle /dashboard/add path
    if (path === '/dashboard/add') {
      return <AddUser />;
    }
    // Default to Dashboard
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