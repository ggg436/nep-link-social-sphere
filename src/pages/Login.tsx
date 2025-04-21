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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
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
      
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg neplink-shadow p-6">
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
