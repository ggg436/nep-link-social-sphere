
import { Link } from 'react-router-dom';
import { Search, MoreHorizontal } from 'lucide-react';

const FriendRequest = ({ 
  name, 
  image, 
  mutualCount, 
  timeAgo 
}: { 
  name: string; 
  image: string; 
  mutualCount: number; 
  timeAgo: string; 
}) => (
  <div className="flex items-start mb-2">
    <div className="flex-shrink-0 mr-2">
      <img 
        src={image} 
        alt={name} 
        className="w-12 h-12 rounded-full object-cover"
      />
    </div>
    <div className="flex-1">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-xs text-gray-500">{mutualCount} mutual friends</p>
          <p className="text-xs text-gray-500">{timeAgo}</p>
        </div>
      </div>
      <div className="flex space-x-2 mt-1">
        <button className="bg-neplink-blue text-white px-3 py-1 rounded-md font-medium">
          Confirm
        </button>
        <button className="bg-gray-200 text-black px-3 py-1 rounded-md font-medium">
          Delete
        </button>
      </div>
    </div>
  </div>
);

const Contact = ({ name, image }: { name: string; image: string }) => (
  <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
    <div className="relative mr-3">
      <img 
        src={image} 
        alt={name} 
        className="w-9 h-9 rounded-full object-cover"
      />
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
    </div>
    <span className="font-medium">{name}</span>
  </div>
);

const RightSidebar = () => {
  const friendRequests = [
    {
      id: 1,
      name: "Tarasor Gharti",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      mutualCount: 2,
      timeAgo: "3d"
    }
  ];
  
  const contacts = [
    {
      id: 1,
      name: "Bhumika Joshi",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 2,
      name: "Prabin Yadav",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 3,
      name: "Hemanta Yogi",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    },
    {
      id: 4,
      name: "Rajeev Shrestha",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    }
  ];

  return (
    <aside className="hidden xl:block w-[320px] h-[calc(100vh-56px)] overflow-y-auto p-4 sticky top-14">
      {/* Sponsored */}
      <div className="mb-5">
        <h3 className="text-gray-500 font-medium mb-3">Sponsored</h3>
        <div className="mb-3">
          <Link to="#" className="flex">
            <div className="mr-3 w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Ad" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Be 100% Ready for the SAT®</h4>
              <p className="text-xs text-gray-500">sat.magoosh.com</p>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Friend Requests */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-500 font-medium">Friend requests</h3>
          <Link to="/friends" className="text-neplink-blue text-sm">See all</Link>
        </div>
        
        {friendRequests.map(request => (
          <FriendRequest 
            key={request.id}
            name={request.name}
            image={request.image}
            mutualCount={request.mutualCount}
            timeAgo={request.timeAgo}
          />
        ))}
      </div>
      
      {/* Contacts */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-500 font-medium">Contacts</h3>
          <div className="flex space-x-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200">
              <Search className="h-4 w-4 text-gray-600" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200">
              <MoreHorizontal className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div>
          {contacts.map(contact => (
            <Contact 
              key={contact.id}
              name={contact.name}
              image={contact.image}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
