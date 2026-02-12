
import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatBubble } from './components/ChatBubble';
import { Message } from './types';
import { travelAgent } from './services/geminiservice';
import { QUICK_PROMPTS } from './constants';
import { Send, Map, Menu, X, Waves, Info } from 'lucide-react';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Om Swastiastu! I am Wayan, your personal Bali travel expert. How can I help you plan your dream getaway to the Island of the Gods today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await travelAgent.sendMessage(text);
      const assistantMessage: Message = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="relative flex flex-col w-full max-w-xs bg-white">
            <div className="absolute top-0 right-0 p-4 -mr-12">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-slate-800 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <Sidebar />
          </div>
          <div 
            className="flex-shrink-0 w-full bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                Trip Planner
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </h2>
              <p className="text-xs text-slate-500">Speaking with Wayan • Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
              <Info size={14} />
              Bali Info
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <Map size={20} />
            </button>
          </div>
        </header>

        {/* Chat Canvas */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-4"
        >
          {messages.length === 1 && (
            <div className="max-w-2xl mx-auto py-12 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Waves size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Welcome to Bali!</h3>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                Ask me about villas, cultural experiences, the best beaches, or a custom 7-day itinerary.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="p-4 text-sm text-left border border-slate-200 rounded-xl bg-white hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
                  >
                    <span className="text-slate-700 group-hover:text-emerald-700">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            {messages.map((msg, i) => (
              <ChatBubble key={i} message={msg} />
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-6">
                <div className="flex gap-3 items-center bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Wayan is typing...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Dock */}
        <div className="p-4 lg:p-6 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2 pl-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about your Bali trip..."
              className="flex-1 py-3 bg-transparent border-none focus:ring-0 text-sm resize-none max-h-32"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-xl transition-all ${
                input.trim() && !isLoading 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="max-w-4xl mx-auto text-[10px] text-slate-400 mt-2 text-center">
            Information provided by AI can vary. Please verify important travel requirements before booking.
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
