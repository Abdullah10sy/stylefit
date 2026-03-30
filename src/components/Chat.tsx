"use client";
import React, { useState, useRef, useEffect } from "react";
import { useStore } from "@/app/store";

const AI_REPLIES: any = {
  interview: "For a job interview, opt for a well-fitted suit in navy or charcoal. A crisp white shirt, dark trousers, and polished oxfords project confidence. Brands like Van Heusen, Raymond, and Arrow have great options in India. 💼",
  slim: "For slim body types, layering adds visual volume! Horizontal stripes, wide-leg trousers, and structured blazers are your best friends. Avoid super-tight fits head-to-toe — some looser pieces balance your silhouette beautifully. 👕",
  dark: "Deep jewel tones like emerald, cobalt, and burgundy complement dark skin tones stunningly. Warm earthy tones — terracotta, mustard — also look incredible. Bright whites and bold patterns work brilliantly too! 🎨",
  chinos: "Chinos are incredibly versatile! Derby shoes or loafers work for smart-casual, while clean white sneakers keep it relaxed. Chelsea boots elevate the look for evenings. ✦",
  default: "Great question! Fashion is all about finding what makes you feel confident. For your body type, focus on fit above everything — well-tailored clothes always look better than expensive but ill-fitting ones. ✦"
};

function getAIReply(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes('interview') || m.includes('job') || m.includes('office')) return AI_REPLIES.interview;
  if (m.includes('slim') || m.includes('thin') || m.includes('lean')) return AI_REPLIES.slim;
  if (m.includes('color') || m.includes('colour') || m.includes('dark skin')) return AI_REPLIES.dark;
  if (m.includes('chino') || m.includes('shoes') || m.includes('footwear')) return AI_REPLIES.chinos;
  return AI_REPLIES.default;
}

export function Chat() {
  const { state } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: "👋 Hi! I'm your personal AI stylist. Ask me anything about fashion, outfit pairings, or styling tips!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const msgsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: getAIReply(text) }]);
    }, 1200 + Math.random() * 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage(input);
    }
  };

  if (!state.user || state.activeSection === "hero" || state.activeSection === "login") {
    return null;
  }

  return (
    <>
      <button className={`chat-fab ${isOpen ? 'hidden' : ''}`} onClick={() => setIsOpen(true)}>
        💬 <span>Stylist</span>
      </button>

      <div className={`chat-panel ${!isOpen ? 'hidden' : ''}`}>
        <div className="chat-header">
          <div className="chat-title-area">
            <div className="chat-avatar-icon">✦</div>
            <div>
              <div className="chat-name">AI Stylist</div>
              <div className="chat-status-dot">● Online</div>
            </div>
          </div>
          <button className="chat-close-btn" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role === 'user' ? 'user-msg' : 'ai-msg'}`}>
              <div className="chat-bubble">{m.text}</div>
            </div>
          ))}
          {messages.length === 1 && (
            <div className="chat-suggestions">
              <button className="chat-suggest" onClick={() => sendMessage("What to wear to a job interview?")}>What to wear to a job interview?</button>
              <button className="chat-suggest" onClick={() => sendMessage("Tips for dressing a slim body?")}>Tips for dressing a slim body?</button>
              <button className="chat-suggest" onClick={() => sendMessage("Best colors for dark skin tones?")}>Best colors for dark skin tones?</button>
            </div>
          )}
          {isTyping && (
            <div className="chat-msg ai-msg"><div className="chat-bubble"><span className="typing-dot"></span><span className="typing-dot"></span><span className="typing-dot"></span></div></div>
          )}
          <div ref={msgsEndRef} />
        </div>
        <div className="chat-input-row">
          <input className="chat-input" placeholder="Ask your stylist anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} />
          <button className="chat-send-btn" onClick={() => sendMessage(input)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
