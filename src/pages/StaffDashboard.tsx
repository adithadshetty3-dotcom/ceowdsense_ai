import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Users, 
  Bell, 
  ShieldAlert, 
  Megaphone, 
  LogOut,
  ChevronRight,
  TrendingUp,
  Activity,
  ClipboardList,
  MapPin,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Smartphone,
  Radio
} from 'lucide-react';
import { useStore } from '../lib/store';
import { useNavigate } from 'react-router-dom';
import CrowdMap from '../components/CrowdMap';
import ThemeToggle from '../components/ThemeToggle';
import { crowdZones } from '../lib/dummy-data';

interface StaffOrder {
  id: string;
  item: string;
  location: string;
  status: 'pending' | 'preparing' | 'delivering' | 'completed';
  time: string;
}

interface Incident {
  id: string;
  type: 'security' | 'medical' | 'maintenance' | 'crowd';
  severity: 'high' | 'medium' | 'low';
  location: string;
  description: string;
  timestamp: string;
}

const initialOrders: StaffOrder[] = [
  { id: 'ORD-101', item: 'Family Combo x2', location: 'Section B, Row 4', status: 'preparing', time: '4m ago' },
  { id: 'ORD-102', item: 'Premium Box Meal', location: 'VIP Lounge 2', status: 'pending', time: '1m ago' },
  { id: 'ORD-103', item: 'Beverage Pack', location: 'Section D, Row 12', status: 'delivering', time: '10m ago' },
];

const initialIncidents: Incident[] = [
  { id: 'INC-704', type: 'crowd', severity: 'high', location: 'Gate 4 Entrance', description: 'Bottleneck forming at turnstiles', timestamp: '14:22' },
  { id: 'INC-705', type: 'medical', severity: 'medium', location: 'Section A12', description: 'Attendee requesting dehydration support', timestamp: '14:25' },
  { id: 'INC-706', type: 'maintenance', severity: 'low', location: 'Gents Restroom B', description: 'Refill soap dispensers', timestamp: '14:28' },
];

export default function StaffDashboard() {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<StaffOrder[]>(initialOrders);
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [activeTab, setActiveTab] = useState<'ops' | 'orders' | 'resources'>('ops');

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const updateOrderStatus = (id: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        if (order.status === 'pending') return { ...order, status: 'preparing' };
        if (order.status === 'preparing') return { ...order, status: 'delivering' };
        return { ...order, status: 'completed' };
      }
      return order;
    }).filter(o => o.status !== 'completed'));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0A0B0E] text-[#E0E2E6] font-mono">
      {/* Technical Navigation Header */}
      <header className="h-16 px-6 flex justify-between items-center border-b border-[#1E2229] bg-[#0A0B0E]/95 backdrop-blur-md z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
             <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-black group-hover:bg-accent transition-colors">C</div>
             <span className="text-sm font-black tracking-[0.2em] uppercase">Control <span className="text-primary group-hover:text-accent transition-colors">Node</span></span>
          </div>
          <div className="h-6 w-px bg-[#1E2229]" />
          <div className="hidden md:flex gap-6">
            {['ops', 'orders', 'resources'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-white relative ${activeTab === tab ? 'text-primary' : 'text-[#626770]'}`}
              >
                {tab}
                {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute -bottom-6 left-0 right-0 h-1 bg-primary" />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Operator Session</span>
            <span className="text-[11px] text-white font-medium uppercase tracking-tighter">{user?.displayName || 'OPERATOR_ALPHA'}</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button 
              onClick={handleLogout}
              className="w-10 h-10 border border-[#1E2229] rounded flex items-center justify-center hover:bg-[#1E2229] transition-all group"
            >
              <LogOut className="w-4 h-4 text-[#626770] group-hover:text-danger transition-colors" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_380px] overflow-hidden">
        
        {/* Main Operational Area */}
        <div className="overflow-y-auto p-6 space-y-6">
          {activeTab === 'ops' && (
            <AnimatePresence mode="wait">
              <motion.div 
                key="ops"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Real-time Grid Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Network Load', value: '0.82', unit: 'ms', icon: Radio, col: 'text-accent' },
                    { label: 'Active Signals', value: '4,210', unit: 'nodes', icon: Smartphone, col: 'text-primary' },
                    { label: 'Deployment', value: '88', unit: '%', icon: Truck, col: 'text-warning' },
                    { label: 'Security Level', value: 'CRITICAL', unit: '', icon: ShieldAlert, col: 'text-danger' },
                  ].map((stat, i) => ( stat.label === 'Security Level' ? (
                      <div key={i} className="bg-[#12141A] border border-[#1E2229] p-4 group hover:border-danger transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-5"><stat.icon className="w-12 h-12" /></div>
                        <div className="text-[9px] font-black text-[#626770] uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className={`text-2xl font-black tracking-tighter ${stat.col}`}>{stat.value}</div>
                      </div>
                    ) : (
                      <div key={i} className="bg-[#12141A] border border-[#1E2229] p-4 group hover:border-primary transition-all">
                        <div className="text-[9px] font-black text-[#626770] uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-2xl font-black tracking-tighter ${stat.col}`}>{stat.value}</span>
                          <span className="text-[9px] text-[#626770] font-black uppercase tracking-widest">{stat.unit}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Map Control Visualizer */}
                <div className="bg-[#12141A] border border-[#1E2229] p-2 relative">
                   <div className="absolute top-6 left-6 z-10 space-y-2 pointer-events-none">
                      <div className="bg-[#0A0B0E]/80 backdrop-blur border border-[#1E2229] p-3 text-[10px] font-black uppercase tracking-widest">
                         <MapPin className="w-3 h-3 text-primary mb-2" />
                         Tactical Overlay Active
                      </div>
                   </div>
                   <div className="h-[400px] rounded overflow-hidden opacity-80 filter grayscale brightness-75">
                      <CrowdMap />
                   </div>
                   <div className="p-4 flex gap-4">
                      <button className="flex-1 h-12 bg-primary/20 border border-primary/40 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all hover:text-white">Redistribute Traffic</button>
                      <button className="flex-1 h-12 bg-danger/20 border border-danger/40 text-danger text-[10px] font-black uppercase tracking-widest hover:bg-danger transition-all hover:text-white">Emergency Broadcast</button>
                   </div>
                </div>

                {/* High Density Zone Table */}
                <div className="bg-[#12141A] border border-[#1E2229]">
                  <div className="p-4 border-b border-[#1E2229] flex justify-between items-center">
                    <h3 className="text-[10px] font-black uppercase tracking-widest">Zone Criticality Report</h3>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <div className="w-2 h-2 rounded-full bg-warning" />
                      <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#1E2229] text-[9px] font-black uppercase tracking-widest text-[#626770]">
                          <th className="p-4">Sector ID</th>
                          <th className="p-4">Occupancy</th>
                          <th className="p-4">Trend</th>
                          <th className="p-4">Allocation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {crowdZones.slice(0, 4).map((zone) => (
                          <tr key={zone.id} className="border-b border-[#1E2229] text-[11px] hover:bg-[#1E2229]/30 transition-colors">
                            <td className="p-4 font-black">{zone.name}</td>
                            <td className="p-4">
                               <div className="flex items-center gap-2">
                                  <div className="w-12 h-1 bg-[#1E2229] rounded-full overflow-hidden">
                                     <div className={`h-full ${zone.density === 'high' ? 'bg-danger' : 'bg-primary'}`} style={{ width: zone.density === 'high' ? '92%' : '45%' }} />
                                  </div>
                                  <span>{zone.people}</span>
                               </div>
                            </td>
                            <td className="p-4 capitalize">{zone.density}</td>
                            <td className="p-4">
                               <button className="text-[9px] font-black uppercase tracking-widest text-primary border border-primary/30 px-2 py-1 rounded hover:bg-primary hover:text-white transition-all">Assign Staff</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {activeTab === 'orders' && (
            <AnimatePresence mode="wait">
              <motion.div 
                key="orders"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                 <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black uppercase tracking-tighter">F&B Service Queue</h2>
                    <div className="text-[10px] bg-primary/20 text-primary px-3 py-1 rounded-full font-black uppercase tracking-widest border border-primary/20">
                       {orders.length} ACTIVE REQUESTS
                    </div>
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-[#12141A] border border-[#1E2229] p-6 rounded-lg flex justify-between items-center group hover:border-accent transition-all relative overflow-hidden">
                        {order.status === 'preparing' && <div className="absolute top-0 left-0 h-full w-1 bg-warning" />}
                        {order.status === 'delivering' && <div className="absolute top-0 left-0 h-full w-1 bg-primary animate-pulse" />}
                        <div className="flex gap-6 items-center">
                          <div className="w-12 h-12 bg-[#1E2229] rounded flex items-center justify-center font-black text-xs border border-[#1E2229]">
                             {order.id.split('-')[1]}
                          </div>
                          <div>
                            <h3 className="font-black text-sm uppercase mb-1">{order.item}</h3>
                            <div className="flex gap-4 text-[10px] text-[#626770] uppercase font-black tracking-widest">
                               <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {order.location}</span>
                               <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {order.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                             order.status === 'pending' ? 'border-[#1E2229] text-[#626770]' :
                             order.status === 'preparing' ? 'border-warning/30 text-warning bg-warning/5' :
                             'border-primary/30 text-primary bg-primary/5'
                           }`}>
                             {order.status}
                           </div>
                           <button 
                             onClick={() => updateOrderStatus(order.id)}
                             className="w-10 h-10 bg-[#1E2229] border border-[#1E2229] rounded flex items-center justify-center hover:bg-accent hover:border-accent transition-all hover:text-white"
                           >
                              {order.status === 'delivering' ? <CheckCircle2 className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                           </button>
                        </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
            </AnimatePresence>
          )}

          {activeTab === 'resources' && (
             <div className="flex flex-col items-center justify-center h-[500px] border border-dashed border-[#1E2229] rounded-2xl opacity-40">
                <Radio className="w-12 h-12 mb-4 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Establishing Local Node Comms...</span>
             </div>
          )}
        </div>

        {/* Right Operations Ticker */}
        <aside className="border-l border-[#1E2229] bg-[#0A0B0E] flex flex-col">
          <div className="p-6 border-b border-[#1E2229]">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#626770]">Incident Log</h3>
                <span className="text-[9px] text-danger animate-pulse font-black uppercase racking-widest">Live Feed</span>
             </div>
             <div className="space-y-4">
                {incidents.map((inc) => (
                  <div key={inc.id} className="group cursor-pointer">
                     <div className="flex justify-between items-start mb-2">
                        <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                          inc.severity === 'high' ? 'bg-danger/10 border-danger/20 text-danger' : 
                          inc.severity === 'medium' ? 'bg-warning/10 border-warning/20 text-warning' : 
                          'bg-primary/10 border-primary/20 text-primary'
                        }`}>
                          {inc.type} :: {inc.severity}
                        </div>
                        <span className="text-[8px] text-[#626770] font-black">{inc.timestamp}</span>
                     </div>
                     <h4 className="text-[11px] font-black uppercase tracking-tight text-white mb-1 group-hover:text-primary transition-colors">{inc.location}</h4>
                     <p className="text-[10px] text-[#626770] leading-snug">{inc.description}</p>
                     <div className="h-px w-full bg-[#1E2229] mt-4" />
                  </div>
                ))}
             </div>
          </div>
          
          <div className="p-6 mt-auto">
             <div className="nav-card bg-primary/5 border border-primary/20 p-6 rounded-xl space-y-4 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 p-4 opacity-5"><Megaphone className="w-20 h-20" /></div>
                <div>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Public Address Channel</h4>
                   <p className="text-[11px] text-[#E0E2E6] font-medium leading-tight">Broadcast operational instructions to all attendees in Sectors A/B.</p>
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded text-[10px] font-black uppercase tracking-widest shadow-xl transition-all">Push to Broadcast</button>
             </div>
          </div>

          <div className="bg-[#12141A] p-6 flex flex-col gap-4">
             <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-[#626770]">
                <span>Duty Status</span>
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                   <span className="text-accent">ONLINE</span>
                </div>
             </div>
             <div className="flex gap-2">
                <button className="flex-1 py-3 border border-[#1E2229] rounded text-[9px] font-black uppercase tracking-widest hover:border-primary transition-all">Break</button>
                <button className="flex-1 py-3 border border-[#1E2229] rounded text-[9px] font-black uppercase tracking-widest hover:border-danger transition-all">Sign Off</button>
             </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

