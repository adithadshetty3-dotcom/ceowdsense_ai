import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';

const responses: Record<string, string> = {
  "exit": "Nearest exit is Gate A. Follow the navigation panel for step-by-step directions.",
  "restroom": "Restrooms are available near the Food Court and Section 204.",
  "crowd": "Gate A is currently experiencing high density. Try Gate B or C for a faster exit.",
  "food": "The main Food Court is located at the South end of the plaza.",
  "seat": "Please check your ticket for the section number or use 'Find My Seat' in the dashboard.",
  "sos": "Emergency support has been notified. Stay where you are, help is on the way.",
};

const TypingIndicator = () => (
  <div className="flex gap-1.5 p-3 bg-muted rounded-2xl rounded-tl-none w-fit">
    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1.5 h-1.5 bg-foreground/30 rounded-full" />
    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1.5 h-1.5 bg-foreground/30 rounded-full" />
    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1.5 h-1.5 bg-foreground/30 rounded-full" />
  </div>
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; content: string }[]>([
    { role: 'bot', content: "Namaste! I'm CrowdSense AI. How can I help you navigate the stadium today?" }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim().toLowerCase();
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    // Logic for bot response
    setTimeout(() => {
      let botResponse = "I'm here to help with navigation and crowd info. Try asking about 'exit', 'restroom', or 'stadium capacity'.";
      
      for (const key in responses) {
        if (userMsg.includes(key)) {
          botResponse = responses[key];
          break;
        }
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-16 h-16 bg-primary text-white rounded-full shadow-[0_0_30px_rgba(30,58,138,0.3)] flex items-center justify-center z-[100] border-4 border-background"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-background animate-bounce">1</span>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-0 lg:inset-auto lg:bottom-28 lg:right-10 lg:w-[420px] lg:h-[650px] bg-surface border border-border lg:rounded-[2.5rem] shadow-2xl z-[110] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-7 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                 <Sparkles className="w-20 h-20" />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl leading-tight tracking-tighter uppercase">CrowdSense AI</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-80">Online · Smart Support</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-10">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" ref={scrollRef}>
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-accent text-white' : 'bg-primary text-white'}`}>
                      {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={`p-5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-muted text-foreground rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && <TypingIndicator />}
            </div>

            {/* Input Box */}
            <div className="p-6 border-t border-border bg-muted/20">
              <div className="flex gap-3 bg-surface border border-border rounded-2xl p-2 shadow-inner group focus-within:ring-2 focus-within:ring-primary transition-all">
                <input
                  type="text"
                  placeholder="Ask about exits, gates, or food..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none placeholder-muted-foreground text-foreground font-medium"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all font-black shadow-lg disabled:opacity-50"
                >
                  <Send className="w-5 h-5 pl-0.5" />
                </motion.button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-3 text-center uppercase font-black tracking-widest opacity-50 italic">AI-Powered Stadium Assistant</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
