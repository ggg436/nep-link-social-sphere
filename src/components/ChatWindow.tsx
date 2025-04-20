
import { useState } from 'react';
import { X, Minus, ChevronDown, Phone, VideoIcon, Info, Image, Paperclip, Smile, ThumbsUp } from 'lucide-react';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  isOnline?: boolean;
}

interface ChatWindowProps {
  chat: Chat;
  onClose: () => void;
}

const ChatWindow = ({ chat, onClose }: ChatWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');

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
            {/* Placeholder for messages */}
            <div className="text-center text-gray-500 mt-4 text-xs">
              No messages yet
            </div>
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
                  placeholder="Aa"
                  className="flex-1 bg-transparent px-3 py-1 text-sm focus:outline-none"
                />
              </div>
              <button className="ml-1 p-1.5">
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
