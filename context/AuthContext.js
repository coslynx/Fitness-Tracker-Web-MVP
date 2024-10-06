import { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('token');
    if (session) {
      setUser(JSON.parse(session));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (credentials: Credentials) => {
    try {
      const response = await signIn(credentials);
      setUser(response.user);
      localStorage.setItem('token', JSON.stringify(response.user));
      toast.success('Login successful');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await signOut();
      setUser(null);
      localStorage.removeItem('token');
      toast.success('Logout successful');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;