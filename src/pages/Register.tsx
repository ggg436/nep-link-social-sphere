
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "../hooks/use-toast";

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!firstName || !lastName || !email || !password || !birthDay || !birthMonth || !birthYear || !gender) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Please fill in all required fields.",
        });
        setIsLoading(false);
        return;
      }

      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please log in.",
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate day options
  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Month options
  const monthOptions = [
    { value: '1', label: 'Jan' },
    { value: '2', label: 'Feb' },
    { value: '3', label: 'Mar' },
    { value: '4', label: 'Apr' },
    { value: '5', label: 'May' },
    { value: '6', label: 'Jun' },
    { value: '7', label: 'Jul' },
    { value: '8', label: 'Aug' },
    { value: '9', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' },
  ];
  
  // Year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <img src="/neplink-logo.svg" alt="NepLink" className="h-14 w-14 mx-auto" />
          <h1 className="text-neplink-blue text-4xl font-bold mt-2">neplink</h1>
        </div>
        
        <div className="bg-white rounded-lg neplink-shadow p-6">
          <h2 className="text-2xl font-bold mb-1 text-center">Create a new account</h2>
          <p className="text-gray-600 mb-4 text-center">It's quick and easy.</p>
          
          <div className="border-t border-gray-300 mb-4"></div>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Surname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field"
              />
            </div>
            
            <input
              type="text"
              placeholder="Mobile number or email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Date of birth</label>
              <div className="grid grid-cols-3 gap-3">
                <select 
                  value={birthDay} 
                  onChange={(e) => setBirthDay(e.target.value)}
                  className="input-field"
                >
                  <option value="" disabled>Day</option>
                  {dayOptions.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                
                <select 
                  value={birthMonth} 
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="input-field"
                >
                  <option value="" disabled>Month</option>
                  {monthOptions.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
                
                <select 
                  value={birthYear} 
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="input-field"
                >
                  <option value="" disabled>Year</option>
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Gender</label>
              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2">
                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="h-4 w-4"
                  />
                </div>
                
                <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2">
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="h-4 w-4"
                  />
                </div>
                
                <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2">
                  <label htmlFor="custom">Custom</label>
                  <input
                    type="radio"
                    id="custom"
                    name="gender"
                    value="custom"
                    checked={gender === 'custom'}
                    onChange={() => setGender('custom')}
                    className="h-4 w-4"
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
              You may receive SMS notifications from us and can opt out at any time.
            </p>
            
            <div className="flex justify-center pt-2">
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-neplink-green text-white text-lg font-semibold py-2 px-16 rounded-lg hover:brightness-110"
              >
                Sign Up
              </button>
            </div>
            
            <div className="text-center mt-4">
              <Link to="/login" className="text-neplink-blue hover:underline">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
