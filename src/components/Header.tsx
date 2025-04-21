import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  MessageCircle, 
  User, 
  Search, 
  Home, 
  Users, 
  Video, 
  LayoutGrid, 
  LogOut, 
  Settings, 
  HelpCircle,
  ShoppingBag
} from 'lucide-react';
import { useToast } from "../hooks/use-toast";
import AuthContext from '../contexts/AuthContext';

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/login');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        {/* Left section: Logo and Search */}
        <div className="flex items-center flex-1">
          <Link to="/" className="mr-2">
            <img src="/neplink-logo.svg" alt="NepLink" className="h-10 w-10" />
          </Link>
          <div className="relative mx-2 flex-1 max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Hello"
              className="bg-gray-100 w-full pl-10 pr-4 py-2 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-neplink-blue"
            />
          </div>
        </div>

        {/* Middle section: Navigation */}
        <nav className="hidden md:flex flex-1 justify-center space-x-1">
          <Link 
            to="/" 
            className="px-10 py-2 rounded-lg hover:bg-gray-100 border-b-4 border-neplink-blue text-neplink-blue"
          >
            <Home className="h-6 w-6" />
          </Link>
          <Link 
            to="/friends" 
            className="px-10 py-2 rounded-lg hover:bg-gray-100"
          >
            <Users className="h-6 w-6" />
          </Link>
          <Link 
            to="/videos" 
            className="px-10 py-2 rounded-lg hover:bg-gray-100"
          >
            <Video className="h-6 w-6" />
          </Link>
          <Link 
            to="/marketplace" 
            className="px-10 py-2 rounded-lg hover:bg-gray-100"
          >
            <ShoppingBag className="h-6 w-6" />
          </Link>
        </nav>

        {/* Right section: User actions */}
        <div className="flex items-center justify-end flex-1 space-x-2">
          <button className="nav-icon bg-gray-200">
            <LayoutGrid className="h-6 w-6" />
          </button>
          <Link to="/messages" className="nav-icon bg-gray-200 relative">
            <MessageCircle className="h-6 w-6" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </Link>
          <button className="nav-icon bg-gray-200 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          <div className="relative">
            <button 
              onClick={toggleProfileMenu}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 overflow-hidden"
            >
              {user?.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-gray-600" />
              )}
            </button>
            
            {/* Profile dropdown menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link 
                  to="/profile/me" 
                  className="px-4 py-3 flex items-center hover:bg-gray-100"
                >
                  <div className="mr-3 w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 m-2 text-gray-600" />
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">
                      {user?.name || 'User Profile'}
                    </span>
                    <span className="text-sm text-gray-500">
                      See your profile
                    </span>
                  </div>
                </Link>
                
                <hr className="my-1 border-gray-200" />
                
                <button className="w-full px-4 py-2 flex items-center hover:bg-gray-100">
                  <div className="mr-3 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="text-left">Settings & privacy</span>
                </button>
                
                <button className="w-full px-4 py-2 flex items-center hover:bg-gray-100">
                  <div className="mr-3 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <HelpCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="text-left">Help & support</span>
                </button>
                
                <hr className="my-1 border-gray-200" />
                
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 flex items-center hover:bg-gray-100"
                >
                  <div className="mr-3 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <LogOut className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="text-left">Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
