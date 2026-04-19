import { motion } from 'motion/react';
import { ChevronRight, MapPin, X, Navigation as NavIcon } from 'lucide-react';
import { useStore } from '../lib/store';

export default function NavigationPanel() {
  const { selectedRoute, setSelectedRoute } = useStore();

  if (!selectedRoute) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      className="bg-primary text-primary-foreground border-4 border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative BG Icon */}
      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
         <NavIcon className="w-24 h-24 rotate-12" />
      </div>

      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Active Route</h3>
            <p className="text-[9px] font-bold uppercase tracking-widest">To Section 104</p>
          </div>
        </div>
        <button onClick={() => setSelectedRoute(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6 relative z-10">
        {selectedRoute.map((step, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index} 
            className="flex gap-4 group"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center text-[10px] font-black shadow-lg">
                {index + 1}
              </div>
              {index < selectedRoute.length - 1 && (
                <div className="w-0.5 flex-1 bg-white/20 rounded-full min-h-[20px]" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <p className="text-sm font-bold leading-tight group-last:pb-0">{step}</p>
              {index < selectedRoute.length - 1 && (
                 <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <ChevronRight className="w-3 h-3 text-accent mt-2" />
                 </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Guidance Active</span>
      </div>
    </motion.div>
  );
}
