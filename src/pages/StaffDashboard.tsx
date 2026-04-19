import { motion } from 'motion/react';
import { 
  BarChart3, 
  Users, 
  Bell, 
  ShieldAlert, 
  Megaphone, 
  LayoutDashboard,
  LogOut,
  Map as MapIcon,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';
import CrowdMap from '../components/CrowdMap';
import ThemeToggle from '../components/ThemeToggle';
import Chatbot from '../components/Chatbot';
import { crowdZones } from '../lib/dummy-data';

const alerts = [
  { id: 1, title: 'Congestion Warning', body: 'Gate 4 is currently experiencing high traffic. Please use Gate 6 for faster exit.', type: 'warning', time: '2m' },
  { id: 2, title: 'Emergency Service Requested', body: 'Security personnel dispatched to Section A Row 12.', type: 'danger', time: '5m' },
  { id: 3, title: 'Concessions Update', body: 'Restock required at West Stand Food Court.', type: 'info', time: '12m' },
];

export default function StaffDashboard() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground transition-colors duration-500">
      {/* Header */}
      <header className="h-20 px-6 lg:px-10 flex justify-between items-center border-b border-border bg-surface/80 backdrop-blur-lg z-50">
        <div className="logo-geom">CROWDSENSE <span className="text-accent">AI</span></div>
        <div className="flex items-center gap-4 lg:gap-6">
          <ThemeToggle />
          <div className="user-pill-geom">
            <div className="role-badge-geom bg-accent text-accent-foreground hidden sm:block">Staff Port</div>
            <span className="font-black text-xs text-foreground hover:text-primary transition-all cursor-default">{user?.displayName || 'Marcus Johnson'}</span>
            <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground grid place-items-center text-[10px] font-black">ST</div>
            <button onClick={handleLogout} className="ml-2 text-foreground hover:text-danger transition-colors">
              <LogOut className="w-4 h-4 text-current" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-6 p-6 lg:px-10 overflow-hidden">
        
        {/* Left Sidebar Section */}
        <section className="hidden lg:flex flex-col gap-3">
          <div className="tab-bar-geom">
            <div className="tab-geom text-foreground hover:text-primary transition-all cursor-pointer" onClick={() => navigate('/attendee/dashboard')}>Attendee</div>
            <div className="tab-geom active bg-primary text-white">Staff Portal</div>
          </div>
          
          <div className="nav-item-geom active shadow-lg scale-[1.02]">
            <div className="icon-box-geom">📊</div>
            <span className="text-white font-black uppercase tracking-widest text-sm">Overview</span>
          </div>
          <div className="nav-item-geom text-foreground hover:text-primary transition-all cursor-pointer">
            <div className="icon-box-geom text-foreground">🌊</div>
            <span className="text-sm font-black uppercase tracking-widest text-foreground">Attendee Flow</span>
          </div>
          <div onClick={() => navigate('/staff/alerts')} className="nav-item-geom text-foreground hover:text-primary transition-all cursor-pointer">
            <div className="icon-box-geom text-foreground">🛡️</div>
            <span className="text-sm font-black uppercase tracking-widest text-foreground">Security Ops</span>
          </div>
          <div className="nav-item-geom text-foreground hover:text-primary transition-all cursor-pointer">
            <div className="icon-box-geom text-foreground">🗺️</div>
            <span className="text-sm font-black uppercase tracking-widest text-foreground">Venue Control</span>
          </div>

          <div className="nav-card mt-auto bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-foreground">Public Address</h4>
                <p className="text-[10px] text-foreground font-black uppercase tracking-widest">Broadcast to venue</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/staff/announcements')}
              className="w-full bg-primary py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-primary/90 transition-all shadow-md"
            >
              CREATE ANNOUNCEMENT
            </button>
          </div>
        </section>

        {/* Center Canvas Area */}
        <section className="flex flex-col gap-6 overflow-hidden">
          {/* Top Metrics Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="nav-card">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-[10px] text-foreground font-black uppercase tracking-widest">Live Attendance</span>
              </div>
              <div className="text-3xl font-heading mb-1 tracking-tighter text-foreground">42,850</div>
              <div className="flex items-center gap-1 text-[10px] text-accent font-bold uppercase">
                <TrendingUp className="w-3 h-3" /> +12% from start
              </div>
            </div>
            
            <div className="nav-card">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-4 h-4 text-warning" />
                <span className="text-[10px] text-foreground font-black uppercase tracking-widest">Vibe Score</span>
              </div>
              <div className="text-3xl font-heading mb-1 text-warning tracking-tighter">MODERATE</div>
              <div className="text-[10px] text-foreground font-black uppercase tracking-[0.2em]">Avg. wait time: 4m</div>
            </div>

            <div className="nav-card">
              <div className="flex items-center justify-between mb-4">
                <ShieldAlert className="w-4 h-4 text-danger" />
                <span className="text-[10px] text-foreground font-black uppercase tracking-widest">Security Status</span>
              </div>
              <div className="text-3xl font-heading mb-1 text-danger flex items-baseline gap-2 tracking-tighter">
                03 <span className="text-xs text-foreground uppercase font-black tracking-widest">Alerts</span>
              </div>
              <div className="progress-bar-geom mt-3">
                <div className="progress-fill-geom bg-danger" style={{ width: '40%' }} />
              </div>
            </div>
          </div>

          {/* Map Section */}
          <CrowdMap />
        </section>

        {/* Right Operations Feed Section */}
        <section className="flex flex-col gap-4 overflow-y-auto pr-1">
          <div className="flex items-center justify-between mb-2">
             <h3 className="text-[10px] text-foreground uppercase tracking-[1px] font-black">Operations Feed</h3>
             <button className="text-[10px] text-accent font-black uppercase tracking-wider hover:underline">MARK ALL SEEN</button>
          </div>
          
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`alert-card-geom ${alert.type === 'info' ? 'info' : alert.type === 'danger' ? 'border-danger' : ''} relative overflow-hidden group hover:bg-muted/50 transition-colors`}>
                <div className="flex justify-between items-start mb-1">
                  <div className="text-[11px] font-black uppercase tracking-tight text-foreground">{alert.title}</div>
                  <span className="text-[9px] text-foreground bg-muted px-1.5 py-0.5 rounded font-bold">{alert.time} ago</span>
                </div>
                <div className="text-[12px] text-foreground leading-snug pr-4 font-black">{alert.body}</div>
                <ChevronRight className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-foreground opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            ))}
          </div>

          <div className="mt-8">
             <h3 className="text-[10px] text-foreground uppercase tracking-[1px] font-black mb-4">Zone Distribution</h3>
             <div className="space-y-4">
                {crowdZones.map((zone) => (
                   <div key={zone.id} className="space-y-2">
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-foreground">
                        <span>{zone.name}</span>
                        <span>{zone.people}</span>
                      </div>
                      <div className="progress-bar-geom">
                        <div 
                           className={`progress-fill-geom ${zone.density === 'high' ? 'bg-danger' : zone.density === 'medium' ? 'bg-warning' : 'bg-accent'}`} 
                           style={{ width: `${Math.min((zone.people / 500) * 100, 100)}%` }} 
                        />
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </section>
      </main>

      <Chatbot />

      {/* Floating Bottom Control Hub (Staff Only) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 h-14 px-8 bg-surface/90 backdrop-blur-xl border border-border rounded-full flex items-center gap-8 lg:hidden z-50 shadow-2xl">
         <button onClick={() => navigate('/staff/dashboard')} className="text-accent hover:scale-110 transition-transform"><BarChart3 className="w-5 h-5" /></button>
         <button onClick={() => navigate('/staff/announcements')} className="text-foreground hover:text-primary transition-colors hover:scale-110 transition-transform"><Megaphone className="w-5 h-5" /></button>
         <button className="text-foreground hover:text-primary transition-colors hover:scale-110 transition-transform"><Users className="w-5 h-5" /></button>
         <div className="w-px h-6 bg-border mx-2" />
         <button onClick={() => navigate('/staff/alerts')} className="text-danger hover:scale-110 transition-transform"><ShieldAlert className="w-5 h-5" /></button>
      </div>
    </div>
  );
}

