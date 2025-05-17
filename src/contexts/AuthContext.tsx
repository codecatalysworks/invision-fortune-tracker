
import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "investor" | "admin";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // This would be replaced with actual API call in a real app
    // Simulate successful login
    setUser({
      id: "1",
      name: "John Doe",
      email: email,
      role: email.includes("admin") ? "admin" : "investor",
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // This would be replaced with actual API call in a real app
    // Simulate successful registration
    setUser({
      id: "1",
      name: name,
      email: email,
      role: "investor", // New users default to investor role
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
