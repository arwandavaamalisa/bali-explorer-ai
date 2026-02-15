import ReactMarkdown from 'react-markdown';
import React from 'react';
import { Message } from '../types';
import { User, Palm tree } from 'lucide-react';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex w-full mb-6 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] lg:max-w-[75%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'} gap-3`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAssistant ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-600'}`}>
          {isAssistant ? <Palm tree size={18} /> : <User size={18} />}
        </div>

        <div className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}>
          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isAssistant 
              ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100' 
              : 'bg-emerald-600 text-white rounded-tr-none'
          }`}>
            <ReactMarkdown className="prose prose-sm max-w-none">
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
