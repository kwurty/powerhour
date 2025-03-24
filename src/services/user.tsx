import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

// Define the User interface
interface User {
  id: number;
  username: string;
  email: string;
  iat: number;
}

// Define the context state types
interface UserContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLogged: () => boolean;
  isReady: () => boolean;
}

// Create context with default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook for accessing the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

// Provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Decode JWT and set user data
  const login = (token: string) => {
    const decodedUser = jwtDecode<User>(token);
    setUser(decodedUser);
    localStorage.setItem("token", token);
  };

  // Clear user data on logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const isLogged = () => {
    if (user != null) {
      return true;
    } else {
      return false;
    }
  };

  const isReady = () => {
    let token = localStorage.getItem("token");
    if (token && user) {
      return true;
    } else if (token && user === null) {
      return false;
    } else if (!token && user === null) {
      return true;
    } else return true;
  };

  // Check for token in local storage on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode<User>(token);
      setUser(decodedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, isLogged, isReady }}>
      {children}
    </UserContext.Provider>
  );
};
