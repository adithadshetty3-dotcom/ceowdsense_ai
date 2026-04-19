import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map as MapIcon, 
  LogOut, 
  DoorOpen, 
  Bath, 
  Utensils, 
  AlertTriangle, 
  Ticket,
  User,
  LayoutDashboard,
  Settings,
  Search,
  Bell,
  Camera,
  ChevronRight,
  TrendingUp,
  Users,
  Activity,
  Shield,
  Sparkles,
  Mic,
  Volume2
} from 'lucide-react';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';
import CrowdMap from '../components/CrowdMap';
import NavigationPanel from '../components/NavigationPanel';
import ThemeToggle from '../components/ThemeToggle';
import Chatbot from '../components/Chatbot';
import LiveViewNavigation from '../components/LiveViewNavigation';
import { routes } from '../lib/dummy-data';
import { useCrowdMetrics } from '../lib/efficiency';
import { sanitizeInput } from '../lib/security';

const quickActions = [
  { id: 'camera', icon: Camera, label: 'AR Navigation', symbol: '📍', primary: true },
  { id: 'exit', icon: DoorOpen, label: 'Find Exit', symbol: '🚪' },
  { id: 'restroom', icon: Bath, label: 'Restroom', symbol: '🚻' },
  { id: 'food', icon: Utensils, label: 'Dining', symbol: '🍔' },
  { id: 'emergency', icon: AlertTriangle, label: 'SOS', symbol: '🚨', emergency: true },
];

const alerts = [
  { title: 'Congestion Warning', body: 'Gate 4 is high traffic. Use Gate 6.', type: 'warning' },
  { title: 'Halftime Special', body: '20% off at Section 108.', type: 'info' },
];

const translations: Record<string, Record<string, string>> = {
  EN: {
    dashboard: "Dashboard",
    ar_nav: "AR Navigation",
    tickets: "My Tickets",
    dining: "Dining",
    settings: "App Settings",
    test: "System Test",
    security: "Security Ops",
    welcome: "Namaste",
    navigate: "Navigate Smarter, Skip the Crowd",
    insights: "Live Insights",
    density: "Crowd Density",
    wait: "Est. Wait Time",
    route: "Suggested Route",
    start: "Start Navigation",
    high: "High",
    mins: "Mins"
  },
  HI: {
    dashboard: "डैशबोर्ड",
    ar_nav: "AR नेविगेशन",
    tickets: "टिकट",
    dining: "भोजन",
    settings: "ऐप सेटिंग्स",
    test: "सिस्टम टेस्ट",
    security: "सुरक्षा",
    welcome: "नमस्ते",
    navigate: "स्मार्ट नेविगेट करें, भीड़ से बचें",
    insights: "लाइव इनसाइट्स",
    density: "भीड़ का घनत्व",
    wait: "अनुमानित समय",
    route: "सुझाया गया रास्ता",
    start: "नेविगेशन शुरू करें",
    high: "उच्च",
    mins: "मिनट"
  }
};

export default function AttendeeDashboard() {
  const { user, logout, setSelectedRoute, language, setLanguage, highVisibility } = useStore();
  const navigate = useNavigate();
  const t = translations[language] || translations.EN;
  const metrics = useCrowdMetrics(72); // Current stadium occupancy is 72%
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [isVoiceOverlayOpen, setIsVoiceOverlayOpen] = useState(false);
  const [voiceText, setVoiceText] = useState("");

  const handleVoiceCommand = () => {
    setIsVoiceOverlayOpen(true);
    setVoiceText("Listening...");
    setTimeout(() => {
      setVoiceText("Navigating to Gate B");
      setTimeout(() => {
        setIsVoiceOverlayOpen(false);
        setIsLiveViewActive(true);
      }, 1500);
    }, 2000);
  };

  const readScreen = () => {
    if ('speechSynthesis' in window) {
      const text = language === 'EN' ? "Welcome to CrowdSense AI dashboard" : "क्राउड सेंस एआई डैशबोर्ड में आपका स्वागत है";
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const [isLiveViewActive, setIsLiveViewActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const playSOS = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/sos.mp3");
      }
      audioRef.current.play().catch(err => console.error("Sound play failed:", err));
    } catch (e) {
      console.error("SOS Sound error:", e);
    }
  }, []);

  const handleAction = (id: string) => {
    if (id === 'camera') setIsLiveViewActive(true);
    if (id === 'exit') setSelectedRoute(routes.exit);
    if (id === 'restroom') setSelectedRoute(routes.restroom);
    if (id === 'food') navigate('/attendee/dining');
    if (id === 'emergency') {
      setIsSOSActive(true);
      playSOS();
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(1000);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground transition-colors duration-500 relative selection:bg-accent/30 selection:text-accent-foreground dark:text-white">
      <AnimatePresence>
        {isSOSActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="fixed inset-0 bg-danger/80 z-[500] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-background p-10 rounded-[3rem] shadow-2xl border-4 border-foreground text-center"
            >
              <AlertTriangle className="w-20 h-20 text-danger mx-auto mb-6 animate-bounce" />
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-foreground">Emergency Alert Triggered</h2>
              <p className="text-foreground font-black mb-8 uppercase tracking-widest">Help is on the way. Stay calm.</p>
              <button 
                onClick={() => setIsSOSActive(false)}
                className="bg-foreground text-background px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
              >
                Cancel Alert
              </button>
            </motion.div>
          </motion.div>
        )}

        {isLiveViewActive && (
          <LiveViewNavigation onClose={() => setIsLiveViewActive(false)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <header role="banner" className="h-20 px-6 lg:px-10 flex justify-between items-center border-b border-border bg-surface/80 backdrop-blur-xl z-50 sticky top-0">
        <div className="logo-geom group cursor-pointer" onClick={() => navigate('/')} role="button" aria-label="Go to Home">
          <span className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-black group-hover:rotate-12 transition-transform">C</span>
          <span className="font-heading font-black tracking-tighter text-xl text-foreground">CROWDSENSE <span className="text-accent">AI</span></span>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={readScreen}
            className="w-10 h-10 rounded-full bg-muted/30 border border-border flex items-center justify-center text-foreground hover:text-primary transition-all shadow-sm"
            aria-label="Read Screen Aloud"
            title="Read Screen"
          >
            <Volume2 className="w-5 h-5" />
          </motion.button>
          <div className="flex bg-muted/30 rounded-full p-1 border border-border" role="group" aria-label="Language Selector">
            {['EN', 'HI'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as 'EN' | 'HI')}
                className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${language === lang ? 'bg-primary text-white shadow-lg' : 'text-foreground/50 hover:text-foreground'}`}
                aria-pressed={language === lang}
              >
                {lang}
              </button>
            ))}
          </div>
          <ThemeToggle />
          <div className="flex items-center gap-3 bg-muted/30 p-1.5 pl-4 rounded-full border border-border">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block text-foreground">Attendee</span>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-[11px] font-black text-white shadow-lg overflow-hidden border-2 border-background">
               {user?.photoURL ? <img src={user.photoURL} alt="User" referrerPolicy="no-referrer" /> : user?.displayName?.split(' ').map(n => n[0]).join('') || 'MJ'}
            </div>
            <button onClick={handleLogout} className="w-9 h-9 rounded-full hover:bg-danger/10 flex items-center justify-center text-foreground hover:text-danger transition-all">
              <LogOut className="w-4 h-4 text-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main role="main" className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] gap-8 p-6 lg:p-10 overflow-hidden">
        
        {/* Left: Venue Stats & Profile */}
        <section aria-labelledby="venue-insight-title" className="hidden lg:flex flex-col gap-6">
          <div className="bg-surface border border-border rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <Users className="w-24 h-24 text-foreground" />
             </div>
             <h4 id="venue-insight-title" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground mb-4">Venue Insight</h4>
             <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-black font-heading tracking-tighter text-foreground">72%</span>
                <span className="text-accent text-xs font-black flex items-center gap-1 uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3" /> Peak
                </span>
             </div>
             <p className="text-xs text-foreground font-black mb-6 uppercase tracking-widest">Current stadium occupancy. Expected peak at 19:30 IST.</p>
             <div className="h-3 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full" 
                />
             </div>
             <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-2 mb-1">
                   <Cpu className="w-3 h-3 text-primary" />
                   <span className="text-[9px] font-black uppercase tracking-widest text-primary">AI Recommendation</span>
                </div>
                <p className="text-[10px] font-bold text-foreground opacity-80 uppercase leading-tight">{metrics.recommendation} Strategy: Path-Priority {metrics.alertLevel}</p>
             </div>
          </div>

          <div className="flex flex-col gap-3" role="navigation" aria-label="Main Sidebar Navigation">
             <div className="nav-item-geom active shadow-lg scale-[1.02]" role="link" aria-current="page">
                <LayoutDashboard className="w-5 h-5 mx-2 text-white" />
                <span className="text-sm font-black uppercase tracking-widest text-white tracking-widest">{t.dashboard}</span>
             </div>
             <div onClick={() => setIsLiveViewActive(true)} className="nav-item-geom text-foreground hover:text-accent transition-all group" role="button" aria-label="Open AR Navigation">
                <Camera className="w-5 h-5 mx-2 group-hover:rotate-12 transition-transform text-current" />
                <span className="text-sm font-black uppercase tracking-widest text-foreground">{t.ar_nav}</span>
             </div>
             <div onClick={() => navigate('/attendee/ticket')} className="nav-item-geom text-foreground hover:text-primary transition-all group" role="link" aria-label="Go to My Tickets">
                <Ticket className="w-5 h-5 mx-2 group-hover:rotate-12 transition-transform text-current" />
                <span className="text-sm font-black uppercase tracking-widest text-foreground">{t.tickets}</span>
             </div>
             <div onClick={() => navigate('/attendee/dining')} className="nav-item-geom text-foreground hover:text-primary transition-all group" role="link" aria-label="Go to Dining">
                <Utensils className="w-5 h-5 mx-2 group-hover:rotate-12 transition-transform text-current" />
                <span className="text-sm font-black uppercase tracking-widest text-foreground">{t.dining}</span>
             </div>
             <div onClick={() => navigate('/attendee/settings')} className="nav-item-geom text-foreground hover:text-primary transition-all group" role="link" aria-label="Go to Settings">
                <Settings className="w-5 h-5 mx-2 group-hover:rotate-12 transition-transform text-current" />
                <span className="text-sm font-black uppercase tracking-widest text-foreground">{t.settings}</span>
             </div>
             <div className="h-px bg-border my-2 opacity-50" aria-hidden="true" />
             <div onClick={() => navigate('/testing')} className="nav-item-geom text-foreground hover:text-primary transition-all group" role="link" aria-label="Go to System Test Dashboard">
                <Activity className="w-5 h-5 mx-2 group-hover:rotate-12 transition-transform text-current" />
                <span className="text-sm font-black uppercase tracking-widest text-foreground">{t.test}</span>
             </div>
             <div onClick={() => navigate('/security')} className="nav-item-geom text-foreground hover:text-primary transition-all group" role="link" aria-label="Go to Security Operations">
                <Shield className="w-5 h-5 mx-2 group-hover:rotate-12 transition-transform text-current" />
                <span className="text-sm font-black uppercase tracking-widest text-foreground">{t.security}</span>
             </div>
          </div>
        </section>

        {/* Center: Hero & Map */}
        <section className="flex flex-col gap-8 overflow-hidden">
          {/* Hero Section */}
          <div className="flex flex-col gap-2">
             <motion.h1 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="text-4xl lg:text-5xl font-heading font-black tracking-tighter leading-[0.9] text-foreground"
             >
                {t.welcome}, <br/> {user?.displayName?.split(' ')[0] || 'VIKRAM'}! 🇮🇳
             </motion.h1>
             <p className="text-foreground font-black uppercase tracking-[0.2em] text-xs">{t.navigate}</p>
             
             {/* Dynamic Status Badges */}
             <div className="flex gap-4 mt-4">
                <div className="bg-surface border border-border rounded-2xl px-5 py-3 flex items-center gap-3 shadow-sm">
                   <div className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Gate A: <span className="text-danger">Crowded</span></span>
                </div>
                <div className="bg-surface border border-border rounded-2xl px-5 py-3 flex items-center gap-3 shadow-sm">
                   <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(22,163,74,0.5)]" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Gate B: <span className="text-accent">Free</span></span>
                </div>
             </div>
          </div>

          {/* Map Preview */}
          <div className="flex-1 min-h-[420px] relative rounded-[3rem] overflow-hidden border border-border shadow-2xl bg-surface group">
             <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                <div className="bg-surface/80 backdrop-blur-md border border-border rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-accent" /> Live Crowd Heatmap
                </div>
             </div>
             <CrowdMap />
          </div>

          {/* Quick Actions redesign - Large Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {quickActions.map((action) => (
              <motion.button 
                key={action.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAction(action.id)}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[2rem] border-2 transition-all shadow-xl ${
                  action.emergency 
                    ? 'bg-danger/10 border-danger text-danger' 
                    : action.primary 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-surface border-border hover:border-primary text-foreground'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner ${
                  action.primary ? 'bg-white/20' : 'bg-muted'
                }`}>
                   {action.symbol}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Right: Navigation & Alerts */}
        <section className="hidden xl:flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-surface rounded-[2.5rem] border border-border p-8 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground mb-6 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" /> {t.insights}
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{t.density}</span>
                   <span className="px-3 py-1 bg-danger/10 text-danger rounded-full text-[9px] font-black uppercase tracking-widest">{t.high}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{t.wait}</span>
                   <span className="text-sm font-black tracking-tighter uppercase">6 {t.mins}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{t.route}</span>
                   <span className="text-sm font-black tracking-tighter text-primary uppercase">Gate B</span>
                </div>
             </div>
             <button onClick={() => setIsLiveViewActive(true)} className="w-full mt-6 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2">
                {t.start} <ChevronRight className="w-3 h-3" />
             </button>
          </div>

          <NavigationPanel />

          <div className="bg-surface rounded-[2.5rem] border border-border p-8 shadow-xl">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground mb-6 flex items-center gap-2">
                <Bell className="w-3 h-3 text-warning" /> Live Alerts
             </h3>
             <div className="space-y-4">
                {alerts.map((alert, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className={`p-5 rounded-2xl border transition-all ${
                    alert.type === 'warning' ? 'bg-warning/5 border-warning/20' : 'bg-accent/5 border-accent/20'
                  }`}
                  >
                    <div className="text-[11px] font-black uppercase tracking-tight mb-1 text-foreground">{alert.title}</div>
                    <div className="text-xs text-foreground font-black leading-relaxed">{alert.body}</div>
                  </motion.div>
                ))}
             </div>
          </div>

          <div className="mt-auto bg-primary text-white p-8 rounded-[2.5rem] border-4 border-white/10 shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
             <div className="relative z-10 flex flex-col items-center">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-2">LOCAL TIME</div>
                <div className="text-4xl font-heading font-black tracking-tighter mb-4">
                   {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })} <span className="text-xs font-bold uppercase tracking-widest ml-1">IST</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20 text-[10px] font-black uppercase tracking-widest">
                   72°F · Mumbai, IN
                </div>
             </div>
          </div>
        </section>
      </main>

      {/* Chatbot */}
      <Chatbot />

      {/* Accessibility Floating Mic */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleVoiceCommand}
        className="fixed bottom-24 right-6 lg:bottom-28 lg:right-10 w-16 h-16 bg-accent text-white rounded-full shadow-2xl flex items-center justify-center z-[90] border-4 border-background"
        title="Voice Command"
      >
        <Mic className="w-7 h-7" />
      </motion.button>

      {/* Voice Overlay */}
      <AnimatePresence>
        {isVoiceOverlayOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center text-white p-10 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center mb-12 border-4 border-white/40 shadow-[0_0_60px_rgba(255,255,255,0.3)]"
            >
              <Mic className="w-20 h-20 text-white" />
            </motion.div>
            <h2 className="text-4xl lg:text-6xl font-heading font-black uppercase tracking-widest animate-pulse leading-tight">
              {voiceText}
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation (Floating bottom) */}
      <nav className="fixed bottom-6 left-6 right-6 h-20 bg-surface/80 backdrop-blur-2xl border border-border rounded-[2.5rem] flex items-center justify-around lg:hidden z-50 shadow-2xl px-6 border-t-2 border-white/10">
        <motion.button onClick={() => navigate('/attendee/dashboard')} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-2 text-primary">
          <LayoutDashboard className="w-6 h-6 text-current" />
          <span className="text-[9px] font-black uppercase tracking-tighter text-foreground">Explore</span>
        </motion.button>
        <motion.button onClick={() => navigate('/attendee/ticket')} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-2 text-foreground hover:text-primary">
          <Ticket className="w-6 h-6 text-current" />
          <span className="text-[9px] font-black uppercase tracking-tighter text-foreground">Tickets</span>
        </motion.button>
        <div className="relative -top-10">
           <motion.button 
             whileTap={{ scale: 0.9 }} 
             onClick={() => setIsLiveViewActive(true)}
             className="w-16 h-16 bg-primary text-white rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-background ring-4 ring-primary/20"
           >
             <Camera className="w-8 h-8 text-white" />
           </motion.button>
        </div>
        <motion.button onClick={() => navigate('/attendee/dining')} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-2 text-foreground hover:text-primary">
          <Utensils className="w-6 h-6 text-current" />
          <span className="text-[9px] font-black uppercase tracking-tighter text-foreground">Dining</span>
        </motion.button>
        <motion.button onClick={() => navigate('/attendee/settings')} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-2 text-foreground hover:text-primary">
          <Settings className="w-6 h-6 text-current" />
          <span className="text-[9px] font-black uppercase tracking-tighter text-foreground">Settings</span>
        </motion.button>
      </nav>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 10px; }
        @media (max-width: 1024px) {
           main { padding-bottom: 120px !important; }
        }
      `}</style>
    </div>
  );
}

