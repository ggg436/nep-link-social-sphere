
import { useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Camera, Pencil } from 'lucide-react';
import AuthContext from '../contexts/AuthContext';
import { useToast } from "../hooks/use-toast";

const ProfileTabs = [
  { id: 'posts', label: 'Posts' },
  { id: 'about', label: 'About' },
  { id: 'friends', label: 'Friends' },
  { id: 'photos', label: 'Photos' },
  { id: 'videos', label: 'Videos' },
];

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('posts');
  
  const handleUpdateProfilePhoto = () => {
    toast({
      title: "Feature coming soon",
      description: "Profile photo update will be available soon!",
    });
  };
  
  const handleUpdateCoverPhoto = () => {
    toast({
      title: "Feature coming soon",
      description: "Cover photo update will be available soon!",
    });
  };

  return (
    <div className="-mx-4">
      {/* Cover Photo */}
      <div className="relative h-[300px] bg-gray-300 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={handleUpdateCoverPhoto}
          className="absolute bottom-4 right-4 bg-white p-2 rounded-lg flex items-center shadow-md"
        >
          <Camera className="h-5 w-5 mr-2" />
          <span className="font-medium">Edit Cover Photo</span>
        </button>
      </div>
      
      {/* Profile Info */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-end pb-4 relative">
            <div className="absolute left-4 transform -translate-y-1/2 ring-4 ring-white rounded-full">
              <div className="relative">
                <img 
                  src={user?.profileImage || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"} 
                  alt="Profile" 
                  className="w-40 h-40 rounded-full object-cover border-4 border-white"
                />
                <button 
                  onClick={handleUpdateProfilePhoto}
                  className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full"
                >
                  <Camera className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="md:ml-44 mt-24 md:mt-0 text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold">{user?.name || 'User Profile'}</h1>
              <p className="text-gray-500 mt-1">999 friends</p>
              <div className="flex mt-2 flex-wrap justify-center md:justify-start">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white -ml-1 first:ml-0">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                    alt="Friend" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white -ml-1">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="Friend" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white -ml-1">
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                    alt="Friend" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button className="bg-neplink-blue text-white px-4 py-1.5 rounded-md font-medium flex items-center">
                <span>+ Add to Story</span>
              </button>
              <button className="bg-gray-200 px-4 py-1.5 rounded-md font-medium flex items-center">
                <Pencil className="h-4 w-4 mr-2" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
          
          <hr className="border-gray-300 mb-0" />
          
          {/* Profile Tabs */}
          <div className="flex overflow-x-auto">
            {ProfileTabs.map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium flex-shrink-0 relative ${
                  activeTab === tab.id 
                    ? 'text-neplink-blue' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-neplink-blue"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-bold text-xl mb-3">Intro</h2>
              <button className="w-full bg-gray-200 py-2 rounded-md font-medium">
                Add Bio
              </button>
              
              <div className="mt-3 space-y-3">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Lives in Kathmandu, Nepal</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Followed by 1.2k people</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span>Studied at Tribhuvan University</span>
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="w-full bg-gray-200 py-2 rounded-md font-medium">
                  Edit Details
                </button>
                <button className="w-full bg-gray-200 py-2 rounded-md font-medium">
                  Add Hobbies
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-xl">Photos</h2>
                <a href="#" className="text-neplink-blue">See All Photos</a>
              </div>
              
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-md overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop&crop=faces&auto=format&q=60&ixlib=rb-4.0.3&ixid=${i}`} 
                      alt={`Photo ${i+1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-2">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
              <div className="flex items-center">
                <img 
                  src={user?.profileImage || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full mr-2 object-cover"
                />
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2.5 text-left text-gray-500">
                  What's on your mind?
                </button>
              </div>
              
              <hr className="my-3" />
              
              <div className="flex justify-around">
                <button className="flex items-center justify-center p-1 rounded-lg hover:bg-gray-100 flex-1">
                  <svg className="h-6 w-6 text-red-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                  <span className="font-medium text-gray-600">Live video</span>
                </button>
                
                <button className="flex items-center justify-center p-1 rounded-lg hover:bg-gray-100 flex-1">
                  <svg className="h-6 w-6 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span className="font-medium text-gray-600">Photo/video</span>
                </button>
                
                <button className="flex items-center justify-center p-1 rounded-lg hover:bg-gray-100 flex-1">
                  <svg className="h-6 w-6 text-yellow-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                  <span className="font-medium text-gray-600">Feeling/activity</span>
                </button>
              </div>
            </div>
            
            {/* Posts */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <img 
                        src={user?.profileImage || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{user?.name || 'User Profile'}</h4>
                        <p className="text-xs text-gray-500">3d · <span className="fa fa-globe"></span></p>
                      </div>
                    </div>
                    <button>
                      <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mt-2">
                    <p>Just finished my first project with React! 🚀</p>
                  </div>
                </div>
                
                <div className="w-full">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="Post content" 
                    className="w-full object-cover max-h-[400px]"
                  />
                </div>
                
                <div className="p-3">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <div className="bg-neplink-blue rounded-full w-5 h-5 flex items-center justify-center">
                        <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14Z"></path>
                          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                      </div>
                      <span className="text-gray-500 text-sm ml-2">48</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      <span>12 comments · 3 shares</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-1">
                    <div className="flex justify-around">
                      <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                        <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14Z"></path>
                          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                        <span className="text-gray-500 font-medium">Like</span>
                      </button>
                      
                      <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                        <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <span className="text-gray-500 font-medium">Comment</span>
                      </button>
                      
                      <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                        <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                          <polyline points="16 6 12 2 8 6"></polyline>
                          <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        <span className="text-gray-500 font-medium">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <img 
                        src={user?.profileImage || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{user?.name || 'User Profile'}</h4>
                        <p className="text-xs text-gray-500">1w · <span className="fa fa-globe"></span></p>
                      </div>
                    </div>
                    <button>
                      <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mt-2">
                    <p>Beautiful day at Patan Durbar Square 😍</p>
                  </div>
                </div>
                
                <div className="w-full">
                  <img 
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" 
                    alt="Post content" 
                    className="w-full object-cover max-h-[400px]"
                  />
                </div>
                
                <div className="p-3">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <div className="bg-neplink-blue rounded-full w-5 h-5 flex items-center justify-center">
                        <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14Z"></path>
                          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                      </div>
                      <span className="text-gray-500 text-sm ml-2">132</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                      <span>24 comments · 7 shares</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-1">
                    <div className="flex justify-around">
                      <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                        <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14Z"></path>
                          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                        <span className="text-gray-500 font-medium">Like</span>
                      </button>
                      
                      <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                        <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <span className="text-gray-500 font-medium">Comment</span>
                      </button>
                      
                      <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                        <svg className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                          <polyline points="16 6 12 2 8 6"></polyline>
                          <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        <span className="text-gray-500 font-medium">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
