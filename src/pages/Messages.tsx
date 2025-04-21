import { useState } from 'react';
import { Search, Edit, Phone, VideoIcon, Info, Image, Smile, ThumbsUp, Expand, ArrowUp, Maximize2 } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
  unread?: boolean;
}

interface Message {
  id: number;
  senderId: number;
  text: string;
  time: string;
  isRead?: boolean;
}

const Messages = () => {
  const [activeContact, setActiveContact] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Bhumika Joshi",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      lastMessage: "General chat",
      time: "6m",
      isOnline: true,
      unread: true
    },
    {
      id: 2,
      name: "Hemanta Yogi",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      lastMessage: "Hlo vai",
      time: "1h",
      isOnline: true
    },
    {
      id: 3,
      name: "Python Projects with Code",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      lastMessage: "Python Questions Discussion",
      time: "23m",
      isOnline: false,
      unread: true
    },
    {
      id: 4,
      name: "Nab Iñ",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", 
      lastMessage: "ma chitwan xu yr",
      time: "Sat",
      isOnline: false
    },
    {
      id: 5,
      name: "Prabin Yadav",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      lastMessage: "K garna gako hos ",
      time: "Sat",
      isOnline: false
    }
  ];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: 1,
      text: "Hi there! How's it going?",
      time: "10:30 AM"
    },
    {
      id: 2,
      senderId: 0, // Current user
      text: "Hey! I'm good, thanks for asking. Just working on a new project. How about you?",
      time: "10:32 AM",
      isRead: true
    },
    {
      id: 3,
      senderId: 1,
      text: "Same here! Working on a new design. It's coming along nicely.",
      time: "10:33 AM"
    },
    {
      id: 4,
      senderId: 0, // Current user
      text: "That sounds great! Would love to see it when you're done.",
      time: "10:35 AM",
      isRead: true
    },
    {
      id: 5,
      senderId: 1,
      text: "Sure thing! I'll share it with you soon.",
      time: "10:36 AM"
    }
  ]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      senderId: 0, // Current user
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const selectedContact = contacts.find(contact => contact.id === activeContact);

  return (
    <div className="flex h-[calc(100vh-56px)] -m-4">
      {/* Contacts sidebar */}
      <div className="w-[360px] border-r border-gray-200 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Chats</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="huuuu"
              className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 focus:outline-none"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {contacts.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setActiveContact(contact.id)}
              className={`flex items-start p-2 hover:bg-gray-100 cursor-pointer ${
                activeContact === contact.id ? 'bg-neplink-light' : ''
              }`}
            >
              <div className="relative mr-3">
                <img 
                  src={contact.image} 
                  alt={contact.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                {contact.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold truncate">{contact.name}</h3>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <p className={`text-sm truncate ${contact.unread ? 'font-semibold text-black' : 'text-gray-500'}`}>
                  {contact.lastMessage}
                </p>
              </div>
              {contact.unread && (
                <div className="w-3 h-3 rounded-full bg-neplink-blue flex-shrink-0 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat area */}
      {activeContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center">
              <div className="relative mr-3">
                <img 
                  src={selectedContact?.image} 
                  alt={selectedContact?.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                {selectedContact?.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{selectedContact?.name}</h3>
                <p className="text-xs text-gray-500">
                  {selectedContact?.isOnline ? 'Active now' : 'Inactive'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Phone className="h-5 w-5 text-neplink-blue" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <VideoIcon className="h-5 w-5 text-neplink-blue" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Info className="h-5 w-5 text-neplink-blue" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-white">
            <div className="space-y-3">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
                >
                  {message.senderId !== 0 && (
                    <img 
                      src={selectedContact?.image} 
                      alt={selectedContact?.name} 
                      className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
                    />
                  )}
                  <div>
                    <div 
                      className={`px-3 py-2 rounded-2xl max-w-xs lg:max-w-md ${
                        message.senderId === 0 
                          ? 'bg-neplink-blue text-white rounded-br-none' 
                          : 'bg-gray-100 text-black rounded-bl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">{message.time}</span>
                      {message.senderId === 0 && message.isRead && (
                        <img 
                          src={selectedContact?.image} 
                          alt="Read" 
                          className="w-3 h-3 rounded-full ml-1"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <div className="flex space-x-2 mr-2">
                <button type="button" className="p-2 rounded-full hover:bg-gray-100">
                  <Image className="h-5 w-5 text-neplink-blue" />
                </button>
                <button type="button" className="p-2 rounded-full hover:bg-gray-100">
                  <Smile className="h-5 w-5 text-neplink-blue" />
                </button>
              </div>
              
              <div className="flex-1 bg-gray-100 rounded-full flex items-center">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Aa"
                  className="flex-1 bg-transparent px-4 py-1.5 focus:outline-none resize-none max-h-20 min-h-[36px]"
                  rows={1}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={!newMessage.trim()} 
                className="ml-2 p-2"
              >
                {newMessage.trim() ? (
                  <ArrowUp className="h-5 w-5 text-neplink-blue" />
                ) : (
                  <ThumbsUp className="h-5 w-5 text-neplink-blue" />
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
              <Edit className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-bold mb-1">New Message</h2>
            <p className="text-gray-500">Select a contact to start a conversation</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
