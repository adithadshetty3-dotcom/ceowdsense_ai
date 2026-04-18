import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Megaphone, Send, History, Sparkles, MessageSquare } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';
import { useState } from 'react';

const recentBroadcasts = [
  { id: 1, text: "Halftime special: 20% off at all beverage stalls.", recipients: "All Attendees", time: "15m ago" },
  { id: 2, text: "Security alert: Please avoid Gate 4 due to congestion.", recipients: "Section 104-108", time: "45m ago" },
];

export default function StaffAnnouncements() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if(!msg.trim()) return;
    setSent(true);
    setMsg('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-white p-6 transition-colors duration-500">
      <header className="flex justify-between items-center mb-10 max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/staff/dashboard')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Broadcaster
        </button>
        <ThemeToggle />
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-heading font-black tracking-tighter uppercase mb-2 text-foreground">Venue Broadcaster</h1>
          <p className="text-xs text-muted-foreground font-black uppercase tracking-[0.2em]">Send instantaneous updates to the stadium crowd</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           {/* Compose Section */}
           <section className="space-y-6">
              <div className="bg-surface border-4 border-foreground rounded-[3rem] p-8 shadow-[20px_20px_0px_rgba(30,58,138,0.1)]">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                       <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Draft Broadcast</h3>
                 </div>

                 <textarea 
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Type stadium announcement here..."
                    className="w-full h-40 bg-muted/30 border-2 border-border rounded-[2rem] p-6 text-sm font-medium focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground/50 resize-none text-foreground"
                 />

                 <div className="mt-6 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Target Audience</p>
                    <div className="flex flex-wrap gap-2">
                       <button className="px-5 py-2 rounded-full border-2 border-primary bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">Global</button>
                       <button className="px-5 py-2 rounded-full border-2 border-border bg-transparent text-muted-foreground text-[10px] font-black uppercase tracking-widest hover:border-primary transition-colors">Gate A Only</button>
                       <button className="px-5 py-2 rounded-full border-2 border-border bg-transparent text-muted-foreground text-[10px] font-black uppercase tracking-widest hover:border-primary transition-colors">VIP Lounges</button>
                    </div>
                 </div>

                 <button 
                   onClick={handleSend}
                   className="w-full mt-8 h-18 bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                 >
                   <Megaphone className="w-6 h-6" /> BROADCAST NOW
                 </button>
              </div>

              {sent && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-accent text-white p-4 rounded-2xl flex items-center gap-3 font-black uppercase tracking-widest text-[10px] justify-center shadow-lg"
                 >
                    <Sparkles className="w-4 h-4" /> Message Broadcasted Successfully
                 </motion.div>
              )}
           </section>

           {/* History Section */}
           <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                 <History className="w-4 h-4 text-muted-foreground" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Recent Activity</h3>
              </div>

              <div className="space-y-4">
                 {recentBroadcasts.map((b, i) => (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     key={b.id} 
                     className="bg-surface border border-border p-6 rounded-[2rem] shadow-sm"
                   >
                     <div className="flex justify-between items-start mb-3">
                        <span className="text-[9px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">{b.recipients}</span>
                        <span className="text-[9px] font-bold text-muted-foreground">{b.time}</span>
                     </div>
                     <p className="text-sm font-medium leading-relaxed italic text-foreground">"{b.text}"</p>
                   </motion.div>
                 ))}
              </div>

              <div className="bg-muted/30 p-8 rounded-[2rem] border-2 border-dashed border-border text-center">
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">End of History</p>
              </div>
           </section>
        </div>
      </main>
    </div>
  );
}
