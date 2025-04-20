import { Search, Maximize2, Edit, X } from 'lucide-react';
import { useState } from 'react';
import ChatWindow from './ChatWindow';

// Sample data for chats
const sampleChats = [
  {
    id: 1,
    name: 'RESEARCH, PUBLICATION and SCIENCE',
    groupChat: true,
    avatar: 'https://via.placeholder.com/40?text=R',
    lastMessage: 'Lauren: 📝 Call for Papers: - ...',
    time: '2m',
    unread: true
  },
  {
    id: 2,
    name: '🇺🇸 USA FOR CO29',
    groupChat: true,
    avatar: 'https://via.placeholder.com/40?text=US',
    lastMessage: 'Prabin: Timro voli vi ho ra?',
    time: '22m',
    unread: true
  },
  {
    id: 3,
    name: 'Hemanta Yogi',
    groupChat: false,
    avatar: 'https://via.placeholder.com/40?text=HY',
    lastMessage: 'Ok vaii',
    time: '1h',
    unread: true
  },
  {
    id: 4,
    name: 'Python Projects with Code',
    groupChat: true,
    avatar: 'https://via.placeholder.com/40?text=PY',
    lastMessage: 'Python Questions Discussion',
    time: '1h',
    unread: true,
    subtext: 'Pytha-je peux parler français'
  },
  {
    id: 5,
    name: 'Taekwondo Nepahm.com ❤️',
    groupChat: true,
    avatar: 'https://via.placeholder.com/40?text=TK',
    lastMessage: 'General chat',
    time: '2h',
    unread: true,
    subtext: 'Ramesh: Heart kop is that wha...'
  },
  {
    id: 6,
    name: 'Taekwondo Nepahm.com ❤️',
    groupChat: true,
    avatar: 'https://via.placeholder.com/40?text=TK',
    lastMessage: 'First sundarhaicha and belba',
    time: '2h',
    unread: true,
    subtext: 'Event has passed'
  },
  {
    id: 7,
    name: 'SPRING-FALL USA/MOCK PREPARAT...',
    groupChat: true,
    avatar: 'https://via.placeholder.com/40?text=SF',
    lastMessage: 'F1 Queries',
    time: '4h',
    unread: true,
    subtext: 'Event has passed'
  },
  {
    id: 8,
    name: 'Sanjok Gc',
    groupChat: false,
    avatar: 'https://via.placeholder.com/40?text=SG',
    lastMessage: 'You urgent a message',
    time: '7h',
    unread: false
  },
  {
    id: 9,
    name: 'Nepal Astronomical Society',
    groupChat: true,
    avatar: 'https://via.placeholder.com/40?text=NAS',
    lastMessage: 'Abhishek Sam',
    time: '1d',
    unread: false
  }
];

interface MessengerPanelProps {
  onClose: () => void;
}

const MessengerPanel = ({ onClose }: MessengerPanelProps) => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [activeChats, setActiveChats] = useState<number[]>([]);

  const handleChatClick = (chatId: number) => {
    // Add to active chats if not already open
    if (!activeChats.includes(chatId)) {
      setActiveChats([...activeChats, chatId]);
    }
  };

  const closeChat = (chatId: number) => {
    setActiveChats(activeChats.filter(id => id !== chatId));
  };

  return (
    <>
      <div className="fixed right-4 top-14 w-96 h-[600px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-2xl font-bold">Chats</h2>
          <div className="flex space-x-2">
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <Maximize2 className="h-5 w-5 text-gray-600" />
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <Edit className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Hello"
              className="bg-gray-100 w-full pl-10 pr-4 py-2 rounded-full border-none focus:outline-none focus:ring-1 focus:ring-gray-300 text-sm"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button 
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'inbox' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500'}`}
            onClick={() => setActiveTab('inbox')}
          >
            Inbox
          </button>
          <button 
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'communities' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500'}`}
            onClick={() => setActiveTab('communities')}
          >
            Communities
            <span className="ml-1 w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
          </button>
        </div>

        {/* Message status */}
        <div className="px-3 py-2 text-xs text-gray-500">
          Missing chat history. <span className="text-blue-600 cursor-pointer">Restore now</span>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {sampleChats.map((chat) => (
            <div 
              key={chat.id} 
              className="flex items-start p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleChatClick(chat.id)}
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={chat.avatar} 
                  alt={chat.name} 
                  className="w-12 h-12 rounded-full"
                />
                {chat.unread && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-blue-600"></div>
                )}
              </div>
              <div className="ml-2 flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-sm truncate pr-1">{chat.name}</p>
                  <p className="text-xs text-gray-500 whitespace-nowrap">{chat.time}</p>
                </div>
                <p className={`text-sm truncate ${chat.unread ? 'text-black' : 'text-gray-500'}`}>
                  {chat.lastMessage}
                </p>
                {chat.subtext && (
                  <p className="text-xs text-gray-500 truncate">{chat.subtext}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active chat windows */}
      {activeChats.map((chatId, index) => {
        const chat = sampleChats.find(c => c.id === chatId);
        if (!chat) return null;
        
        // Calculate position based on the index in activeChats array
        // Start from the right side of the screen with proper spacing
        const rightPosition = 90 + (index * 320);
        
        return (
          <div key={chatId} style={{ position: 'fixed', right: `${rightPosition}px`, bottom: 0, zIndex: 40 }}>
            <ChatWindow 
              chat={chat} 
              onClose={() => closeChat(chatId)} 
            />
          </div>
        );
      })}
    </>
  );
};

export default MessengerPanel; 