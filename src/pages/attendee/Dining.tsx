import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Utensils, Timer, Star, Plus, MapPin } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';
import { useState } from 'react';
import { useStore } from '../../lib/store';

const menuItems = [
  { id: 1, name: 'Mumbai Vada Pav', price: '₹99', rating: 4.8, img: 'https://picsum.photos/seed/vadapav/200/200' },
  { id: 2, name: 'Stadium Popcorn', price: '₹149', rating: 4.5, img: 'https://picsum.photos/seed/popcorn/200/200' },
  { id: 3, name: 'Chicken Tikka Wrap', price: '₹249', rating: 4.9, img: 'https://picsum.photos/seed/wrap/200/200' },
  { id: 4, name: 'Masala Chai', price: '₹79', rating: 4.7, img: 'https://picsum.photos/seed/chai/200/200' },
];

export default function DiningPage() {
  const navigate = useNavigate();
  const [ordered, setOrdered] = useState(false);

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-white p-6 transition-colors duration-500">
      <header className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/attendee/dashboard')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <ThemeToggle />
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-5xl font-heading font-black tracking-tighter uppercase mb-2 text-gray-900 dark:text-white">Stadium Dining</h1>
            <p className="text-xs text-gray-900 dark:text-white font-black uppercase tracking-[0.2em]">Quick Bites · Pre-order & Skip the Queue</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-surface border border-border px-5 py-3 rounded-2xl flex items-center gap-3">
                <Timer className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">Avg. Wait: 12m</span>
             </div>
          </div>
        </div>

        {ordered && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="bg-accent text-white p-6 rounded-3xl mb-8 flex items-center justify-between shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Timer className="w-6 h-6 animate-pulse" />
               </div>
               <div>
                  <h4 className="font-black uppercase tracking-tighter text-lg">Order Received!</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-white">Order ready in 5 mins at Counter 4</p>
               </div>
            </div>
            <button onClick={() => setOrdered(false)} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Dismiss</button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={item.id}
              className="bg-surface border border-border rounded-[2rem] p-4 flex gap-6 items-center hover:border-primary transition-all group shadow-sm hover:shadow-xl"
            >
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-muted flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-2 mb-1">
                    <Star className="w-3 h-3 text-warning fill-warning" />
                    <span className="text-[10px] font-black text-warning">{item.rating}</span>
                 </div>
                 <h3 className="text-lg font-black font-heading tracking-tight uppercase truncate text-gray-900 dark:text-white">{item.name}</h3>
                 <p className="text-accent font-black text-xl mb-3">{item.price}</p>
                 <button 
                   onClick={() => setOrdered(true)}
                   className="bg-primary text-white p-3 rounded-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all w-fit shadow-lg shadow-primary/20"
                 >
                   <Plus className="w-4 h-4" /> <span className="text-[10px] font-black uppercase tracking-widest px-2">ORDER NOW</span>
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
