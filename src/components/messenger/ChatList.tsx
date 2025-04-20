
import { Search, Edit, Maximize2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ChatListItem from './ChatListItem';
import { toast } from '@/hooks/use-toast';

interface Chat {
  id: string; // Changed from number to string to match Supabase UUID
  name: string;
  groupChat: boolean;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  subtext?: string;
}

interface ChatListProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onChatClick: (chatId: string) => void; // Changed from number to string
  onClose: () => void;
}

const ChatList = ({ activeTab, onTabChange, onChatClick, onClose }: ChatListProps) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Subscribe to real-time updates for new messages
    const channel = supabase
      .channel('messages-channel')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'messages' 
        }, 
        payload => {
          console.log('Real-time update:', payload);
          // Update chats when new messages arrive
          fetchChats();
        }
      )
      .subscribe();

    // Initial fetch of chats
    fetchChats();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchChats = async () => {
    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Error fetching messages",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      // Transform messages into chat list format
      // This is a simplified version - you would typically want to group by conversation
      const transformedChats: Chat[] = messages.map(msg => ({
        id: msg.id,
        name: 'User', // You would typically fetch user details here
        groupChat: false,
        avatar: 'https://via.placeholder.com/40',
        lastMessage: msg.content,
        time: new Date(msg.created_at).toLocaleTimeString(),
        unread: !msg.read
      }));

      setChats(transformedChats);
    } catch (error) {
      console.error('Error in fetchChats:', error);
      toast({
        title: "Error",
        description: "Something went wrong while fetching chats",
        variant: "destructive"
      });
    }
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages"
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
        </button>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatListItem 
              key={chat.id} 
              chat={chat}
              onClick={onChatClick}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No messages yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
