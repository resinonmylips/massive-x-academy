import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, CornerDownLeft, Sparkles, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "👋 Welcome! I am your AI Massive X Expert Assistant. I have read the complete hardware & software manual. Ask me anything about Wavetable Readout Modes, the Semi-Modular Routing system, Feedbacks HPFs, filter self-oscillations, or sample rate conversion ratios!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "How to patch an acid bass?",
    "Up-Down Bend mode even harmonics?",
    "Explain Asimov vs Blue Monark",
    "How to build a Sub-Oscillator?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10) // Send trailing conversation chunks for context
        })
      });

      if (!response.ok) {
        throw new Error('Server returned error response');
      }

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.text || "I was unable to formulate an answer. Make sure your server-side API is correctly initialized.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: "⚠️ **System Communication Issue**: I was unable to connect to the Gemini API server. Please confirm that your `GEMINI_API_KEY` is specified in AI Studio's **Settings > Secrets** panel.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-assistant-card" className="bg-ni-card border border-ni-border rounded-xl flex flex-col h-[520px] shadow-2xl relative overflow-hidden">
      {/* Panel Header */}
      <div className="bg-ni-dark border-b border-ni-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-ni-teal animate-pulse" />
          <Bot size={16} className="text-ni-orange" />
          <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">Massive X Master Co-Pilot</span>
        </div>
        <span className="text-[9px] font-mono text-gray-500 bg-ni-border/40 px-2 py-0.5 rounded">V1.6 AI Engine</span>
      </div>

      {/* Message Output Thread */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-ni-dark/40"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              {/* Avatar Icon */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                msg.sender === 'user' 
                  ? 'bg-ni-orange/10 border-ni-orange/20 text-ni-orange' 
                  : 'bg-ni-teal/10 border-ni-teal/20 text-ni-teal'
              }`}>
                {msg.sender === 'user' ? <User size={13} /> : <Bot size={13} />}
              </div>

              {/* Speech balloon */}
              <div className={`rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-ni-orange/10 border border-ni-orange/20 text-gray-200 rounded-tr-none'
                  : 'bg-ni-border/40 border border-ni-border/70 text-gray-300 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-line font-sans prose prose-invert prose-xs">
                  {msg.text}
                </div>
                <span className="block text-[8px] font-mono text-gray-500 text-right mt-1.5 uppercase">
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Typing state */}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="flex gap-3 self-start max-w-[85%]"
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-ni-teal/10 border border-ni-teal/20 text-ni-teal">
                <Bot size={13} />
              </div>
              <div className="bg-ni-border/40 border border-ni-border/70 rounded-xl rounded-tl-none px-3.5 py-3 text-xs text-gray-400 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-ni-teal rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-ni-teal rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-ni-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500 ml-1.5">Analyzing Manual Specs...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggestion Quick Chips */}
      <div className="px-4 py-2 border-t border-ni-border bg-ni-dark flex gap-1.5 overflow-x-auto shrink-0 select-none">
        {suggestions.map((sug) => (
          <button
            key={sug}
            onClick={() => handleSendMessage(sug)}
            className="flex items-center gap-1.5 px-3 py-1 bg-ni-border/50 hover:bg-ni-border/80 border border-ni-border text-[10px] font-mono text-gray-300 rounded-full shrink-0 transition-all cursor-pointer"
          >
            <Sparkles size={10} className="text-ni-orange" />
            {sug}
          </button>
        ))}
      </div>

      {/* Input container */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="border-t border-ni-border bg-ni-dark/80 px-4 py-3 flex gap-2.5 items-center shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about filter routing, wavetable modes, ADSR shapes..."
          className="flex-1 bg-ni-dark border border-ni-border focus:border-gray-500 text-white rounded-lg px-3.5 py-2 text-xs font-sans outline-none placeholder:text-gray-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-4 py-2 bg-ni-orange hover:bg-ni-orange/90 text-ni-dark disabled:bg-ni-border disabled:text-gray-500 rounded-lg flex items-center gap-1.5 transition-all text-xs font-mono font-bold"
        >
          <Send size={11} />
          <span>SEND</span>
        </button>
      </form>
    </div>
  );
}
