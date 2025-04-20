
import { useState } from 'react';
import { ChevronRight, Settings } from 'lucide-react';

interface FriendRequest {
  id: number;
  name: string;
  image: string;
  mutualFriends: number;
  followersCount?: string;
}

const FriendRequestItem = ({ request }: { request: FriendRequest }) => (
  <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
    <div className="h-40 overflow-hidden">
      <img 
        src={request.image} 
        alt={request.name} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-3">
      <h3 className="font-semibold">{request.name}</h3>
      {request.followersCount ? (
        <p className="text-xs text-gray-500">Followed by {request.followersCount}</p>
      ) : (
        <p className="text-xs text-gray-500">
          {request.mutualFriends} mutual friends
        </p>
      )}
      
      <div className="mt-2 grid grid-cols-1 gap-2">
        <button className="bg-neplink-blue text-white w-full py-1 rounded-md font-medium">
          Confirm
        </button>
        <button className="bg-gray-200 text-black w-full py-1 rounded-md font-medium">
          Delete
        </button>
      </div>
    </div>
  </div>
);

const Friends = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    {
      id: 1,
      name: "Tarasor Gharti",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      mutualFriends: 2
    },
    {
      id: 2,
      name: "Shreeya Sabin Surkheti",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      mutualFriends: 2
    },
    {
      id: 3,
      name: "Nab İñ",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      mutualFriends: 2
    },
    {
      id: 4,
      name: "Dhruba Prasad Pokharel",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      mutualFriends: 0,
      followersCount: "3.7K"
    },
    {
      id: 5,
      name: "Vivaan Ghimire",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      mutualFriends: 0
    },
    {
      id: 6,
      name: "Sabedul Islam",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      mutualFriends: 0
    },
    {
      id: 7,
      name: "Shreekhanda Karki",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      mutualFriends: 0
    },
    {
      id: 8,
      name: "Victor Garcia",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      mutualFriends: 1
    }
  ]);

  return (
    <div className="lg:flex">
      <div className="lg:w-80 lg:pr-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Friends</h1>
          <button className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full">
            <Settings className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mb-6">
          <a href="#" className="flex items-center p-2 bg-gray-100 rounded-lg">
            <div className="w-9 h-9 mr-2 bg-neplink-blue rounded-full flex items-center justify-center">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </div>
            <span className="font-medium">Home</span>
          </a>
          
          <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <div className="w-9 h-9 mr-2 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="font-medium">Friend Requests</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </a>
          
          <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <div className="w-9 h-9 mr-2 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="font-medium">Suggestions</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </a>
          
          <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <div className="w-9 h-9 mr-2 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="font-medium">All friends</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </a>
          
          <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <div className="w-9 h-9 mr-2 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span className="font-medium">Birthdays</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </a>
          
          <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <div className="w-9 h-9 mr-2 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </div>
              <span className="font-medium">Custom Lists</span>
            </div>
            <ChevronRight className="h-5 w-5" />
          </a>
        </nav>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Friend Requests</h2>
          <a href="#" className="text-neplink-blue">See all</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friendRequests.map(request => (
            <FriendRequestItem key={request.id} request={request} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
