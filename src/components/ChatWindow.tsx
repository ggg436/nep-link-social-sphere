
import { useState, useEffect } from 'react';
import { X, Minus, ChevronDown, Phone, VideoIcon, Info, Image, Paperclip, Smile, ThumbsUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  isOnline?: boolean;
}

// Update the Message interface to match Supabase's schema
interface Message {
  id: string;
  content: string; // Changed from message_text to content
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
}

interface ChatWindowProps {
  chat: Chat;
  onClose: () => void;
}

const ChatWindow = ({ chat, onClose }: ChatWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Get current user
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (isMounted && data.user) {
        setCurrentUserId(data.user.id);
      }
    };
    getCurrentUser();

    // Fetch existing messages for this chat
    if (currentUserId) {
      fetchMessages();
    }

    // Subscribe to new messages
    const channel = supabase
      .channel('messages')
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMessage = payload.new as Message;
          
          // Only append if this message is relevant for this chat window
          if (
            (newMessage.sender_id === chat.id && newMessage.receiver_id === currentUserId) ||
            (newMessage.receiver_id === chat.id && newMessage.sender_id === currentUserId)
          ) {
            setMessages(prev => {
              // Avoid duplicate if already exists
              return prev.some(m => m.id === newMessage.id) ? prev : [...prev, newMessage];
            });
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [chat.id, currentUserId]);

  const fetchMessages = async () => {
    try {
      // Fetch only the messages between the current user and this chat (other user)
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${chat.id},receiver_id.eq.${currentUserId}),and(sender_id.eq.${currentUserId},receiver_id.eq.${chat.id})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Error fetching messages",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error in fetchMessages:', error);
      toast({
        title: "Error",
        description: "Something went wrong while fetching messages",
        variant: "destructive"
      });
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !currentUserId) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          content: message, // Changed from message_text to content
          receiver_id: chat.id,
          sender_id: currentUserId
        });

      if (error) {
        console.error('Error sending message:', error);
        toast({
          title: "Error sending message",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      setMessage('');
    } catch (error) {
      console.error('Error in sendMessage:', error);
      toast({
        title: "Error",
        description: "Something went wrong while sending your message",
        variant: "destructive"
      });
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="w-80 bg-white rounded-t-lg shadow-lg border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between bg-white rounded-t-lg">
        <div className="flex items-center cursor-pointer" onClick={toggleMinimize}>
          <div className="relative mr-2">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-8 h-8 rounded-full"
            />
            {chat.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <h3 className="font-medium text-sm">{chat.name}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <button className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <Phone className="h-3.5 w-3.5 text-gray-600" />
          </button>
          <button className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <VideoIcon className="h-3.5 w-3.5 text-gray-600" />
          </button>
          <button onClick={toggleMinimize} className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center">
            {isMinimized ? <ChevronDown className="h-3.5 w-3.5 text-gray-600" /> : <Minus className="h-3.5 w-3.5 text-gray-600" />}
          </button>
          <button onClick={onClose} className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <X className="h-3.5 w-3.5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <>
          <div className="flex-1 p-2 overflow-y-auto min-h-[300px]">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-14">No messages yet</div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-2 ${msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] p-2 rounded-lg ${
                    msg.sender_id === currentUserId
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex space-x-1 mr-1">
                <button className="p-1.5 rounded-full hover:bg-gray-100">
                  <Image className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-1.5 rounded-full hover:bg-gray-100">
                  <Paperclip className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-1.5 rounded-full hover:bg-gray-100">
                  <Smile className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="flex-1 bg-gray-100 rounded-full flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                  placeholder="Aa"
                  className="flex-1 bg-transparent px-3 py-1 text-sm focus:outline-none"
                />
              </div>
              <button
                className="ml-1 p-1.5"
                onClick={sendMessage}
              >
                {message.trim() ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <ThumbsUp className="h-4 w-4 text-blue-600" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
