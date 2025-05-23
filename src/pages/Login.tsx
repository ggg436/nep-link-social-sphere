import { useState, FormEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "../hooks/use-toast";
import AuthContext from '../contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);

    try {
      // Login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        let description = error.message;
        if (description.toLowerCase().includes('invalid login credentials')) {
          description = "Incorrect email or password. Please try again.";
        }
        setLoginError(description);
        toast({
          variant: "destructive",
          title: "Login failed",
          description,
        });
        setIsLoading(false);
        return;
      }

      if (data.user) {
        const userData = {
          id: data.user.id,
          name: data.user.user_metadata?.first_name 
            ? `${data.user.user_metadata.first_name} ${data.user.user_metadata.last_name || ''}`
            : email.split('@')[0],
          email: data.user.email || '',
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast({
          title: "Login successful",
          description: "Welcome back to NepLink!",
        });
        
        navigate('/');
      }
    } catch (error) {
      setLoginError("Something went wrong. Please try again.");
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative overflow-hidden">
      {/* Animated floating objects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-float-slow absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-blue-200 opacity-60"></div>
        <div className="animate-float-medium absolute top-3/4 left-1/6 w-14 h-14 rounded-full bg-blue-300 opacity-50"></div>
        <div className="animate-float-fast absolute top-1/2 right-1/4 w-16 h-16 rounded-lg bg-blue-100 opacity-40"></div>
        <div className="animate-float-medium absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-blue-200 opacity-30"></div>
        <div className="animate-float-slow animate-spin-slow absolute top-1/3 right-1/5 w-12 h-12 bg-blue-300 opacity-20 transform rotate-45"></div>
        <div className="animate-float-fast absolute bottom-1/3 left-1/3 w-10 h-10 rounded-lg bg-blue-400 opacity-40 transform rotate-12"></div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 relative z-10">
        <div className="text-center md:text-left max-w-md">
          <div className="flex justify-center md:justify-start mb-4">
            <img src="/neplink-logo.svg" alt="NepLink" className="h-14 w-14" />
          </div>
          <h1 className="text-neplink-blue text-5xl font-bold mb-4">neplink</h1>
          <p className="text-xl md:text-2xl">
            NepLink helps you connect and share with the people in your life.
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg neplink-shadow p-6 backdrop-blur-sm bg-opacity-90">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Email address or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              {loginError && (
                <div className="text-red-500 text-sm">{loginError}</div>
              )}
              <Button 
                type="submit"
                disabled={isLoading}
                className="auth-button-blue w-full"
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <Link to="#" className="text-neplink-blue hover:underline text-sm">
                Forgotten password?
              </Link>
            </div>
            
            <div className="border-t border-gray-300 my-4"></div>
            
            <div className="flex justify-center">
              <Link to="/register" className="auth-button-green max-w-[200px]">
                Create new account
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-5 text-sm">
            <span>Create a Page</span> for a celebrity, brand or business.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
