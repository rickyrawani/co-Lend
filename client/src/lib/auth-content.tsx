import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { AuthUser, UserRole } from "@shared/schema";

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check sessionStorage first
    const sessionUser = sessionStorage.getItem("co-lending-user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
      setIsLoading(false);
      return;
    }

    // Check localStorage for "remember me"
    const storedUser = localStorage.getItem("co-lending-user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Also set in sessionStorage for current session
      sessionStorage.setItem("co-lending-user", storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay (500-800ms)
    const delay = Math.floor(Math.random() * 300) + 500;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Import mock users dynamically to avoid circular dependencies
    const { mockUsers } = await import("@/data/mock-data");
    
    const foundUser = mockUsers.find(
      u => (u.email === email || u.userId === email) && u.password === password
    );

    if (!foundUser) {
      return { success: false, error: "Invalid email or password" };
    }

    const authUser: AuthUser = {
      id: foundUser.userId,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    setUser(authUser);
    
    // Always store in sessionStorage
    sessionStorage.setItem("co-lending-user", JSON.stringify(authUser));
    
    // Store in localStorage only if "Remember me" is checked
    if (rememberMe) {
      localStorage.setItem("co-lending-user", JSON.stringify(authUser));
    }

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("co-lending-user");
    localStorage.removeItem("co-lending-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
