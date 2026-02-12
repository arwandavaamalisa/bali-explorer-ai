
import React from 'react';
import { Message } from '../types';
import { User, Palmtree } from 'lucide-react';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex w-full mb-6 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] lg:max-w-[75%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'} gap-3`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAssistant ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-600'}`}>
          {isAssistant ? <Palmtree size={18} /> : <User size={18} />}
        </div>
        
        <div className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}>
          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isAssistant 
              ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100' 
              : 'bg-emerald-600 text-white rounded-tr-none'
          }`}>
            <div className="prose prose-sm max-w-none">
              {message.content.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 px-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};
