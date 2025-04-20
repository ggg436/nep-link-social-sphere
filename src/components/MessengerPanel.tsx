import { useState } from 'react';
import { X } from 'lucide-react';
import ChatList from './messenger/ChatList';
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
    if (!activeChats.includes(chatId)) {
      setActiveChats([...activeChats, chatId]);
    }
  };

  const closeChat = (chatId: number) => {
    setActiveChats(activeChats.filter(id => id !== chatId));
  };

  return (
    <>
      <div className="fixed right-4 top-14 z-50">
        <ChatList
          chats={sampleChats}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onChatClick={handleChatClick}
          onClose={onClose}
        />
      </div>

      {/* Active chat windows */}
      {activeChats.map((chatId, index) => {
        const chat = sampleChats.find(c => c.id === chatId);
        if (!chat) return null;
        
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
