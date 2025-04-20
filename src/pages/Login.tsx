
import { useState, FormEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "../hooks/use-toast";
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock login for demonstration - in real app, this would call an API
      if (email && password) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful login with user data
        const userData = {
          id: '1',
          name: 'John Doe',
          email,
          profileImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
        };
        
        // Set user in context and localStorage for persistence
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast({
          title: "Login successful",
          description: "Welcome back to NepLink!",
        });
        
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please enter both email and password",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left side - Logo and tagline */}
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
      
      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg neplink-shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Email address or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="auth-button-blue"
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
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
