import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, Moon, BellOff, UserCircle } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';
import { useStore } from '../../lib/store';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-white p-6 transition-colors duration-500">
      <header className="flex justify-between items-center mb-8 max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/attendee/dashboard')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <ThemeToggle />
      </header>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto"
      >
        <div className="mb-10">
          <h1 className="text-5xl font-heading font-black tracking-tighter uppercase mb-2 text-foreground">App Settings</h1>
          <p className="text-xs text-muted-foreground font-black uppercase tracking-[0.2em]">Configure your CrowdSense Experience</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <section className="bg-surface border border-border rounded-[2.5rem] p-8 shadow-xl">
             <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-[1.5rem] bg-primary flex items-center justify-center text-white text-2xl font-black shadow-2xl border-4 border-background overflow-hidden">
                   {user?.photoURL ? <img src={user.photoURL} alt="User" referrerPolicy="no-referrer" /> : user?.displayName?.split(' ').map(n => n[0]).join('') || 'MJ'}
                </div>
                <div>
                   <h2 className="text-2xl font-black font-heading tracking-tighter uppercase text-foreground">{user?.displayName || 'Marcus Johnson'}</h2>
                   <p className="text-xs text-muted-foreground font-bold">{user?.email || 'marcus@example.com'}</p>
                </div>
             </div>
             
             <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
                   <div className="flex items-center gap-3">
                      <UserCircle className="w-5 h-5 text-primary" />
                      <span className="text-xs font-black uppercase tracking-widest text-foreground">Account Tier</span>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest bg-accent text-white px-3 py-1 rounded-full">VIP MEMBER</span>
                </div>
             </div>
          </section>

          {/* Preferences Section */}
          <section className="bg-surface border border-border rounded-[2.5rem] p-8 shadow-xl space-y-6">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Preferences</h3>
             
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                      <Bell className="w-5 h-5 text-primary" />
                   </div>
                   <div>
                      <p className="text-sm font-black uppercase tracking-tight text-foreground">Smart Alerts</p>
                      <p className="text-[10px] text-muted-foreground font-bold">Crowd density & event updates</p>
                   </div>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative p-1 cursor-pointer">
                   <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                </div>
             </div>

             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                   </div>
                   <div>
                      <p className="text-sm font-black uppercase tracking-tight text-foreground">Emergency Sharing</p>
                      <p className="text-[10px] text-muted-foreground font-bold">Share location with medical staff</p>
                   </div>
                </div>
                <div className="w-12 h-6 bg-accent rounded-full relative p-1 cursor-pointer">
                   <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                </div>
             </div>

             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                      <Moon className="w-5 h-5 text-primary" />
                   </div>
                   <div>
                      <p className="text-sm font-black uppercase tracking-tight text-foreground">Theme Settings</p>
                      <p className="text-[10px] text-muted-foreground font-bold">Switch between Light/Dark mode</p>
                   </div>
                </div>
                <ThemeToggle />
             </div>
          </section>

          <button 
            onClick={() => navigate('/login')}
            className="w-full p-6 text-center text-xs font-black uppercase tracking-[0.3em] text-danger hover:bg-danger/5 rounded-[2.5rem] transition-all border border-transparent hover:border-danger/20"
          >
            Sign Out of Experience
          </button>
        </div>
      </motion.main>
    </div>
  );
}
