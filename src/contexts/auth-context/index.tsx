import { createContext, useState, useEffect, useContext } from 'react';
import { AuthService } from '@/services/auth';
import { useUser } from '@/hooks/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { router } from '@/routes';

interface AuthContextData {
  isAuthenticated: boolean;
  role: string | null;
  user: User | null | undefined;
  setAuthState: (authState: {
    isAuthenticated: boolean;
    role: string | null;
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const { user, isLoading } = useUser();
  const queryClient = useQueryClient();

  const setAuthState = (authState: {
    isAuthenticated: boolean;
    role: string | null;
  }) => {
    setIsAuthenticated(authState.isAuthenticated);
    setRole(authState.role);

    // if (authState.isAuthenticated) {
    //   queryClient.invalidateQueries({ queryKey: ['user'] });
    // }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setRole(null);
    queryClient.clear();
  };

  useEffect(() => {
    const decoded = AuthService.decodeToken();
    if (decoded) {
      setAuthState({
        isAuthenticated: AuthService.isAuthenticated(),
        role: decoded.scope?.[0] || null,
      });
    }
  }, []);

  useEffect(() => {
    const decoded = AuthService.decodeToken();

    if (decoded && decoded.exp) {
      const expirationTime = decoded.exp * 1000 - Date.now();

      const timeout = setTimeout(() => {
        logout();
        router.navigate('/login');
      }, expirationTime);

      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, logout]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, user, setAuthState, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
