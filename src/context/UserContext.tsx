import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, NewUser } from '../types/user';

// Dummy user data
const dummyUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    website: "johndoe.com",
    address: {
      street: "123 Main St",
      suite: "Apt 4B",
      city: "New York",
      zipcode: "10001",
      geo: {
        lat: "40.7128",
        lng: "-74.0060"
      }
    },
    company: {
      name: "Tech Solutions Inc.",
      catchPhrase: "Innovative solutions for tomorrow",
      bs: "web services"
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    phone: "555-987-6543",
    website: "janesmith.com",
    address: {
      street: "456 Park Ave",
      suite: "Suite 201",
      city: "Boston",
      zipcode: "02108",
      geo: {
        lat: "42.3601",
        lng: "-71.0589"
      }
    },
    company: {
      name: "Creative Designs Co.",
      catchPhrase: "Bringing your vision to life",
      bs: "design services"
    }
  }
];

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (user: NewUser) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    // Check if we have any saved users in localStorage
    const savedUsers = localStorage.getItem('dashboardUsers');
    if (savedUsers) {
      const parsedSavedUsers = JSON.parse(savedUsers);
      return [...dummyUsers, ...parsedSavedUsers];
    }
    return dummyUsers;
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Add a new user
  const addUser = (newUser: NewUser) => {
    // Create a new user object with an ID
    const user: User = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: {
        street: newUser.address.street,
        city: newUser.address.city,
        zipcode: newUser.address.zipcode,
        suite: ''
      },
      website: '',
      username: newUser.email.split('@')[0]
    };

    // Update the users state
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);

    // Save the added users to localStorage
    const savedUsers = localStorage.getItem('dashboardUsers');
    const parsedSavedUsers = savedUsers ? JSON.parse(savedUsers) : [];
    localStorage.setItem('dashboardUsers', JSON.stringify([...parsedSavedUsers, user]));
  };

  return (
    <UserContext.Provider value={{ users, loading, error, addUser }}>
      {children}
    </UserContext.Provider>
  );
}; 