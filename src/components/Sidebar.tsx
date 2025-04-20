
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { 
  User, 
  Users, 
  Clock, 
  BookmarkCheck, 
  Layers, 
  CalendarDays, 
  ShoppingBag, 
  ChevronDown
} from 'lucide-react';
import AuthContext from '../contexts/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <aside className="hidden lg:block w-[320px] h-[calc(100vh-56px)] overflow-y-auto p-4 sticky top-14">
      <nav className="space-y-1">
        <Link 
          to="/profile/me" 
          className="flex items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden mr-2">
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 m-1.5 text-gray-600" />
            )}
          </div>
          <span className="font-medium">{user?.name || 'User Profile'}</span>
        </Link>
        
        <Link 
          to="/friends" 
          className="flex items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <div className="w-9 h-9 rounded-full bg-neplink-light mr-2 flex items-center justify-center">
            <Users className="h-5 w-5 text-neplink-blue" />
          </div>
          <span className="font-medium">Friends</span>
        </Link>
        
        <Link 
          to="/memories" 
          className="flex items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <div className="w-9 h-9 rounded-full bg-neplink-light mr-2 flex items-center justify-center">
            <Clock className="h-5 w-5 text-neplink-blue" />
          </div>
          <span className="font-medium">Memories</span>
        </Link>
        
        <Link 
          to="/saved" 
          className="flex items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <div className="w-9 h-9 rounded-full bg-neplink-light mr-2 flex items-center justify-center">
            <BookmarkCheck className="h-5 w-5 text-neplink-blue" />
          </div>
          <span className="font-medium">Saved</span>
        </Link>
        
        <Link 
          to="/groups" 
          className="flex items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <div className="w-9 h-9 rounded-full bg-neplink-light mr-2 flex items-center justify-center">
            <Layers className="h-5 w-5 text-neplink-blue" />
          </div>
          <span className="font-medium">Groups</span>
        </Link>
        
        <Link 
          to="/events" 
          className="flex items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <div className="w-9 h-9 rounded-full bg-neplink-light mr-2 flex items-center justify-center">
            <CalendarDays className="h-5 w-5 text-neplink-blue" />
          </div>
          <span className="font-medium">Events</span>
        </Link>
        
        <Link 
          to="/marketplace" 
          className="flex items-center p-2 rounded-lg hover:bg-gray-200"
        >
          <div className="w-9 h-9 rounded-full bg-neplink-light mr-2 flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-neplink-blue" />
          </div>
          <span className="font-medium">Marketplace</span>
        </Link>
        
        <button className="flex items-center p-2 rounded-lg hover:bg-gray-200 w-full">
          <div className="w-9 h-9 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
            <ChevronDown className="h-5 w-5 text-gray-700" />
          </div>
          <span className="font-medium">See more</span>
        </button>
      </nav>
      
      <hr className="my-3 border-gray-300" />
      
      <div className="mt-2">
        <h3 className="text-gray-500 font-medium mb-2 px-2">Your shortcuts</h3>
        <div className="space-y-1">
          <Link 
            to="/groups/buy-nothing" 
            className="flex items-center p-2 rounded-lg hover:bg-gray-200"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-300 overflow-hidden mr-2">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                alt="BUY NOTHING KATHMANDU" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium">BUY NOTHING KATHMANDU</span>
          </Link>
          
          <Link 
            to="/groups/nepal-astronomical" 
            className="flex items-center p-2 rounded-lg hover:bg-gray-200"
          >
            <div className="w-9 h-9 rounded-lg bg-gray-300 overflow-hidden mr-2">
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                alt="Nepal Astronomical Society" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium">Nepal Astronomical Society</span>
          </Link>
        </div>
      </div>
      
      <div className="mt-4 px-2 text-xs text-gray-500">
        <p>Privacy · Terms · Advertising · Ad Choices · Cookies · More · NepLink © 2025</p>
      </div>
    </aside>
  );
};

export default Sidebar;
