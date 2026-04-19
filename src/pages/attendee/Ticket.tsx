import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket as TicketIcon, MapPin, QrCode } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';

export default function TicketPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-white p-6 transition-colors duration-500">
      <header className="flex justify-between items-center mb-8 max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/attendee/dashboard')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Stadium
        </button>
        <ThemeToggle />
      </header>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-black tracking-tighter uppercase mb-2 text-gray-900 dark:text-white">My Ticket</h1>
          <p className="text-xs text-gray-900 dark:text-white font-black uppercase tracking-[0.2em]">IPL 2026 · Mumbai Indians vs GT</p>
        </div>

        <div className="bg-surface border-4 border-foreground rounded-[3rem] overflow-hidden shadow-[20px_20px_0px_rgba(30,58,138,0.1)]">
          <div className="bg-primary p-8 text-white text-center border-b-4 border-foreground">
             <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TicketIcon className="w-8 h-8" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1">Gate A Entry</p>
             <h2 className="text-3xl font-heading font-black tracking-tighter">VIP SECTION 104</h2>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">Row</p>
                  <p className="text-2xl font-black font-heading tracking-tight text-gray-900 dark:text-white">D</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">Seat</p>
                  <p className="text-2xl font-black font-heading tracking-tight text-gray-900 dark:text-white">42</p>
               </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-3xl border-2 border-dashed border-border flex flex-col items-center">
               <div className="bg-white p-4 rounded-2xl mb-4">
                  <QrCode className="w-40 h-40 text-black" />
               </div>
               <p className="text-[9px] font-black uppercase tracking-widest text-gray-900 dark:text-white">Scan at Gate A Turnstile</p>
            </div>

            <button 
              onClick={() => navigate('/attendee/dashboard')}
              className="w-full h-16 bg-accent text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <MapPin className="w-5 h-5" /> Navigate to Seat
            </button>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
