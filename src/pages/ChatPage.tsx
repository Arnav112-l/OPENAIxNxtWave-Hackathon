import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: 'चेड़ो वाहनों से जो चाहिये के काटों बताइए कर, उठो वो बेहिश्त् काले.',
    sender: 'bot',
    timestamp: new Date(),
  }]);
  const [inputText, setInputText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim() || !shopId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsParsing(true);

    try {
      const result = await api.parseOrder(inputText, shopId);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.success 
          ? `Found ${result.data.items.length} items: ${result.data.items.map((i: any) => i.name).join(', ')}`
          : 'Sorry, could not understand. Can you try again?',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-semibold text-lg">Chat to Order</h1>
        </div>
        <button className="text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-red-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {isParsing && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <p className="text-sm text-gray-600">Understanding your order...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div className="bg-white border-t px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold mb-4">Upload product images</h3>
            <p className="text-sm text-gray-600 mb-4">चेड़ो वाहनों से जो चाहिये के काटों बताइए कर, उठो वो बेहिश्त् काले.</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <button className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 mb-2">
                📤 Upload
              </button>
              <p className="text-sm text-gray-500">Drag and drop or use camera</p>
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your order..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
