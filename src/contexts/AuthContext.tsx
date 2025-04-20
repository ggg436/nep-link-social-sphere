
import { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  session: null
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          const userData = {
            id: currentSession.user.id,
            name: currentSession.user.user_metadata?.first_name 
              ? `${currentSession.user.user_metadata.first_name} ${currentSession.user.user_metadata.last_name || ''}`
              : currentSession.user.email?.split('@')[0] || 'User',
            email: currentSession.user.email || '',
          };
          
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('user');
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const userData = {
          id: data.session.user.id,
          name: data.session.user.user_metadata?.first_name 
            ? `${data.session.user.user_metadata.first_name} ${data.session.user.user_metadata.last_name || ''}`
            : data.session.user.email?.split('@')[0] || 'User',
          email: data.session.user.email || '',
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        setSession(data.session);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        // Try to get user from localStorage if no active session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
