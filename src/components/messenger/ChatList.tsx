import { Search, Edit, Maximize2, X } from 'lucide-react';
import ChatListItem from './ChatListItem';

interface Chat {
  id: number;
  name: string;
  groupChat: boolean;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  subtext?: string;
}

interface ChatListProps {
  chats: Chat[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onChatClick: (chatId: number) => void;
  onClose: () => void;
}

const ChatList = ({ chats, activeTab, onTabChange, onChatClick, onClose }: ChatListProps) => {
  return (
    <div className="w-96 h-[600px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
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
          onClick={() => onTabChange('inbox')}
        >
          Inbox
        </button>
        <button 
          className={`flex-1 py-3 font-medium text-sm ${activeTab === 'communities' 
            ? 'text-blue-600 border-b-2 border-blue-600' 
            : 'text-gray-500'}`}
          onClick={() => onTabChange('communities')}
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
        {chats.map((chat) => (
          <ChatListItem 
            key={chat.id} 
            chat={chat}
            onClick={onChatClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
