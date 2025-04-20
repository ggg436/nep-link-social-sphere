
import { useState } from 'react';
import { useContext } from 'react';
import { 
  Video as VideoIcon, 
  Image, 
  Smile, 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  MoreHorizontal 
} from 'lucide-react';
import AuthContext from '../contexts/AuthContext';
import CreatePostCard from '../components/CreatePostCard';
import StoryCard from '../components/StoryCard';

interface Post {
  id: string;
  user: {
    name: string;
    image: string;
    verified?: boolean;
  };
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

const Home = () => {
  const { user } = useContext(AuthContext);
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'NABIL BANK',
        image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
        verified: true
      },
      time: '6h',
      content: '#NabilBank #TogetherAhead #Notice\n\nDear Customers,\n\nWe have been experiencing technical issues in the nBank service (app and web). Our team is actively working to resolve the problem.\n\nWe sincerely apologize for the inconvenience and appreciate your patience. We will post an update as soon as we resolve the issue.\n\nThank you!',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      likes: 1300,
      comments: 414,
      shares: 42
    },
    {
      id: '2',
      user: {
        name: 'Lexilexi.ai',
        image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
      },
      time: '12h',
      content: "Tired of the ad struggle? 🤔 Find it hard to pinpoint your audience, craft engaging copy, or balance your budget?\n\nSay hello to LexiLexi.ai! ✅",
      likes: 245,
      comments: 37,
      shares: 5
    }
  ]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stories Section */}
      <div className="mb-4">
        <div className="flex overflow-x-auto space-x-2 pb-4">
          <StoryCard 
            isCreate 
            image={user?.profileImage || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"}
          />
          <StoryCard 
            name="Bhumika Joshi" 
            image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
          />
          <StoryCard 
            name="Kiran Adhikari" 
            image="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
          />
          <StoryCard 
            name="Vikram Bastola" 
            image="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          />
          <StoryCard 
            name="Kmc Note" 
            image="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
          />
        </div>
      </div>

      {/* Create Post Card */}
      <CreatePostCard />

      {/* Posts Feed */}
      <div className="space-y-4 mt-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow">
            {/* Post header */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex">
                  <img 
                    src={post.user.image} 
                    alt={post.user.name} 
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-semibold">{post.user.name}</h4>
                      {post.user.verified && (
                        <svg className="w-4 h-4 text-neplink-blue ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.7 14.5l-4-4 1.4-1.4 2.6 2.6 6-6 1.4 1.4-7.4 7.4z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                </div>
                <button>
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              {/* Post content */}
              <div className="mt-2">
                <p className="whitespace-pre-line">{post.content}</p>
              </div>
            </div>
            
            {/* Post image if available */}
            {post.image && (
              <div className="w-full">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full object-cover max-h-[500px]"
                />
              </div>
            )}
            
            {/* Post stats */}
            <div className="px-4 py-2 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-neplink-blue rounded-full w-5 h-5 flex items-center justify-center">
                  <ThumbsUp className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-500 text-sm ml-2">
                  {post.likes.toLocaleString()} {post.likes > 1 ? 'likes' : 'like'}
                </span>
              </div>
              <div className="text-gray-500 text-sm">
                <span>
                  {post.comments} comments
                </span>
                <span className="mx-2">·</span>
                <span>
                  {post.shares} shares
                </span>
              </div>
            </div>
            
            {/* Post actions */}
            <div className="border-t border-b border-gray-200">
              <div className="flex justify-around p-1">
                <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                  <ThumbsUp className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-500 font-medium">Like</span>
                </button>
                <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                  <MessageCircle className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-500 font-medium">Comment</span>
                </button>
                <button className="flex-1 flex items-center justify-center p-2 hover:bg-gray-100 rounded-md">
                  <Share2 className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-500 font-medium">Share</span>
                </button>
              </div>
            </div>
            
            {/* Comment section */}
            <div className="p-4">
              <div className="flex">
                <img 
                  src={user?.profileImage || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"} 
                  alt="Your profile" 
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    className="w-full bg-gray-100 rounded-full py-2 px-3 pr-10 focus:outline-none focus:ring-1 focus:ring-neplink-blue"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Smile className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
