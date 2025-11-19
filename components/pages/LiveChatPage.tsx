import React, { useState, useRef, useEffect } from 'react';
import DirectMessageIcon from '../icons/DirectMessageIcon';
import LiveChatIcon from '../icons/LiveChatIcon';

const conversations = [];

const initialMessages = {};


const LiveChatPage: React.FC = () => {
    const [selectedConversation, setSelectedConversation] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);
        setMessages(initialMessages[conversation.id] || []);
    }

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !selectedConversation) return;
        
        const newMsg = {
            from: 'me',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

  return (
    // FIX: Using h-full to adapt to the layout's main content area for a more robust UI.
    <div className="flex h-full fade-in-up -m-6">
      {/* Conversation List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Live Chat</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(convo => (
            <div
              key={convo.id}
              onClick={() => handleSelectConversation(convo)}
              className={`p-4 flex items-start gap-3 cursor-pointer border-l-4 ${selectedConversation?.id === convo.id ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:bg-gray-50'}`}
            >
              <img src={convo.avatar} alt={convo.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-sm text-gray-800">{convo.name}</p>
                  <p className="text-xs text-gray-500">{convo.time}</p>
                </div>
                <div className="flex justify-between items-start mt-1">
                    <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                    {convo.unread > 0 && (
                        <span className="bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0">{convo.unread}</span>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col bg-slate-50">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-3">
              <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-10 h-10 rounded-full" />
              <div>
                <h2 className="font-bold text-gray-800">{selectedConversation.name}</h2>
                <p className="text-sm text-green-600">Active now</p>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                            {msg.from === 'user' && <img src={selectedConversation.avatar} alt="avatar" className="w-6 h-6 rounded-full" />}
                            <div className={`px-4 py-2 rounded-2xl max-w-sm ${msg.from === 'me' ? 'bg-purple-500 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
            </div>
            <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button type="submit" className="p-2 rounded-full text-white btn-primary transition-all flex-shrink-0 w-10 h-10 flex items-center justify-center">
                        <DirectMessageIcon className="w-5 h-5"/>
                    </button>
                </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 p-4">
            <LiveChatIcon className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">Select a conversation</h3>
            <p>Choose a conversation from the left panel to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChatPage;