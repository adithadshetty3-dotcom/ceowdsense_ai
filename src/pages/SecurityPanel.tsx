import { motion } from 'motion/react';
import { Shield, Lock, Eye, Zap, Fingerprint, Database, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SecurityPanel() {
  const navigate = useNavigate();

  const securityFeatures = [
    { title: 'Secure Login', desc: 'Google Authentication with MFA enforcement', status: 'Active', icon: Lock, color: 'text-primary' },
    { title: 'End-to-End Encryption', desc: 'AES-256 bit data transit protection', status: 'Optimal', icon: Shield, color: 'text-accent' },
    { title: 'Abuse Detection', desc: 'AI-powered rate limiting & bot prevention', status: 'Guarding', icon: Zap, color: 'text-warning' },
    { title: 'Emergency Override', desc: 'Manual system bypass protocol active', status: 'Standby', icon: Zap, color: 'text-danger' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 lg:p-10">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <button onClick={() => navigate(-1)} className="text-xs font-black uppercase tracking-widest mb-2 hover:text-primary transition-colors flex items-center gap-2">
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl lg:text-5xl font-heading font-black tracking-tighter">Security <span className="text-primary">Ops Center</span></h1>
        </div>
        <div className="flex gap-4">
           <div className="bg-accent/10 border border-accent/20 px-6 py-3 rounded-2xl flex items-center gap-3">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Status: Protected</span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((f, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={f.title}
                className="bg-surface border border-border p-8 rounded-[2.5rem] shadow-xl group hover:border-primary transition-all transition-duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${f.color.replace('text', 'bg-')}/10 flex items-center justify-center`}>
                    <f.icon className={`w-7 h-7 ${f.color}`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${f.status === 'Optimal' || f.status === 'Active' ? 'bg-accent/10 text-accent' : 'bg-muted text-foreground/50'}`}>
                    {f.status}
                  </span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-2">{f.title}</h3>
                <p className="text-xs text-foreground/60 font-bold uppercase tracking-widest leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="bg-surface border border-border rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse" />
            <h2 className="text-xl font-black mb-8 uppercase tracking-tighter flex items-center gap-3">
               <Fingerprint className="w-6 h-6 text-primary" /> Active Encryption Tunnel
            </h2>
            <div className="space-y-4">
               <div className="p-6 bg-background rounded-3xl border border-border flex items-center gap-6 group hover:border-accent transition-all">
                  <Database className="w-10 h-10 text-accent" />
                  <div className="flex-1">
                     <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Database Sync</span>
                        <span className="text-accent text-[10px] font-black uppercase">Encrypted</span>
                     </div>
                     <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ x: ["-100%", "100%"] }} 
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-1/2 h-full bg-primary" 
                        />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-surface rounded-[2.5rem] border border-border p-8 shadow-xl">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" /> Global Access Logs
             </h3>
             <div className="space-y-4 font-mono text-[10px] text-foreground/50">
                {[
                  { ip: '192.168.1.1', action: 'Auth Success', time: '12:04:01' },
                  { ip: '104.22.1.8', action: 'Token Refresh', time: '12:03:55' },
                  { ip: '45.1.82.9', action: 'Route Mapping', time: '12:03:22' },
                  { ip: '14.221.9.0', action: 'Session Begin', time: '12:02:10' },
                ].map((log, i) => (
                  <div key={i} className="flex justify-between border-b border-border/50 pb-2">
                    <span>{log.ip}</span>
                    <span className="text-accent font-bold uppercase">{log.action}</span>
                  </div>
                ))}
             </div>
             <button className="w-full mt-6 py-3 bg-foreground text-background rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
                Download Audit Trail
             </button>
          </div>

          <div className="bg-danger/10 text-danger border border-danger/20 p-8 rounded-[2.5rem] shadow-xl">
             <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5" />
                <h4 className="text-[11px] font-black uppercase tracking-widest">Abuse Sentinel</h4>
             </div>
             <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed mb-4">
                No suspicious activity detected in the last 24 hours. Threat level: Alpha.
             </p>
             <div className="flex gap-2">
                <div className="flex-1 h-1 bg-danger rounded-full" />
                <div className="flex-1 h-1 bg-muted rounded-full" />
                <div className="flex-1 h-1 bg-muted rounded-full" />
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AlertCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
