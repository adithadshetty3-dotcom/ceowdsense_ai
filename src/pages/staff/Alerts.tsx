import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Filter, CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';

const historicalAlerts = [
  { id: 1, title: 'Medical Emergency', body: 'Response team dispatched to Gate 4. Patient stabilized.', status: 'resolved', time: '1h ago', type: 'danger' },
  { id: 2, title: 'Lost Item Reported', body: 'Blue wallet found at Section 104. Moved to Lost & Found.', status: 'resolved', time: '2h ago', type: 'info' },
  { id: 3, title: 'Water Leak', body: 'Maintenance team resolving leak in Block B restrooms.', status: 'pending', time: '4h ago', type: 'warning' },
];

export default function StaffAlerts() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-gray-900 dark:text-white p-6 transition-colors duration-500">
      <header className="flex justify-between items-center mb-10 max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/staff/dashboard')}
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Operations Dashboard
        </button>
        <div className="flex items-center gap-6">
           <ThemeToggle />
           <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-black text-[10px] shadow-lg shadow-accent/20">ST</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-heading font-black tracking-tighter uppercase mb-2 text-foreground">Operational Alerts</h1>
            <p className="text-xs text-gray-900 dark:text-white font-black uppercase tracking-[0.2em]">Manage and Resolve Stadium Incidents</p>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-2 px-6 py-3 bg-muted rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground hover:bg-muted/80 transition-all border border-border">
                <Filter className="w-4 h-4" /> Filter
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                <ShieldAlert className="w-4 h-4" /> New Alert
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {historicalAlerts.map((alert, i) => (
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               key={alert.id} 
               className={`p-8 bg-surface border border-border rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-primary shadow-sm hover:shadow-xl`}
             >
               <div className="flex items-start gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                    alert.type === 'danger' ? 'bg-danger/10 text-danger' : 
                    alert.type === 'warning' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                  }`}>
                    {alert.type === 'danger' ? <ShieldAlert className="w-7 h-7" /> : 
                     alert.type === 'warning' ? <AlertTriangle className="w-7 h-7" /> : <Bell className="w-7 h-7" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                       <h3 className="text-xl font-black font-heading tracking-tight uppercase text-foreground">{alert.title}</h3>
                       <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          alert.status === 'resolved' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-warning/10 text-warning border border-warning/20'
                       }`}>
                          {alert.status}
                       </span>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white font-black leading-relaxed max-w-xl">{alert.body}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white mt-2">{alert.time}</p>
                  </div>
               </div>
               
               <div className="flex gap-3">
                  <button className="flex-1 md:flex-none px-6 py-4 bg-muted hover:bg-muted/80 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Report Log</button>
                  {alert.status === 'pending' && (
                    <button className="flex-1 md:flex-none px-6 py-4 bg-accent text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2">
                       <CheckCircle className="w-4 h-4" /> Resolve
                    </button>
                  )}
               </div>
             </motion.div>
           ))}
        </div>
      </main>
    </div>
  );
}
