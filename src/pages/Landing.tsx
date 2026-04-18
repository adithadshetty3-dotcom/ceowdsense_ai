import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Button } from '../components/ui/button';
import { Navigation as NavIcon, Sparkles } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function Landing() {
  const navigate = useNavigate();
  const setRole = useStore((state) => state.setRole);

  const handleRoleSelection = (role: 'attendee' | 'staff') => {
    setRole(role);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background transition-colors duration-500 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
      
      <div className="absolute top-8 right-8 z-50">
        <ThemeToggle />
      </div>
      
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full relative z-10"
      >
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-primary text-white w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20 border-4 border-background"
        >
          <NavIcon className="w-10 h-10 animate-pulse" />
        </motion.div>

        <div className="mb-12">
          <h1 className="text-6xl lg:text-[7.5rem] mb-4 font-heading font-black tracking-tighter uppercase leading-[0.85] text-foreground">
            CrowdSense<br />
            <span className="text-accent">AI</span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-border" />
            <p className="text-muted-foreground font-black uppercase tracking-[0.4em] text-[10px] lg:text-xs">
              Smarter Stadium Navigation
            </p>
            <span className="h-[2px] w-8 bg-border" />
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              className="w-full h-20 text-xl rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest border-b-8 border-primary/20 shadow-2xl transition-all"
              onClick={() => handleRoleSelection('attendee')}
            >
              Enter Stadium 🏟️
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outline" 
              className="w-full h-20 text-xl rounded-2xl border-2 border-border bg-surface text-foreground hover:bg-muted font-black uppercase tracking-widest transition-all"
              onClick={() => handleRoleSelection('staff')}
            >
              Staff portal
            </Button>
          </motion.div>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 opacity-40 grayscale group hover:grayscale-0 transition-all">
           <p className="text-[10px] font-black uppercase tracking-[0.3em]">Official Partner: IPL 2026 🇮🇳</p>
        </div>
      </motion.div>
    </div>
  );
}
