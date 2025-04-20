
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

interface ChatListItemProps {
  chat: Chat;
  onClick: (chatId: string) => void; // Changed from number to string
}

const ChatListItem = ({ chat, onClick }: ChatListItemProps) => {
  return (
    <div 
      className="flex items-start p-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => onClick(chat.id)}
    >
      <div className="relative flex-shrink-0">
        <img 
          src={chat.avatar} 
          alt={chat.name} 
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="ml-2 flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
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
      {chat.unread && (
        <div className="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0 mt-2"></div>
      )}
    </div>
  );
};

export default ChatListItem;
