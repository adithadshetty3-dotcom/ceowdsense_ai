import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { LogIn, ArrowLeft } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function Login() {
  const navigate = useNavigate();
  const { user, login } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const role = user?.role || 'attendee';

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login for this phase
    setTimeout(() => {
      login({
        uid: '123',
        email: email || 'user@example.com',
        displayName: user?.displayName || 'Marcus Johnson',
        photoURL: 'https://picsum.photos/seed/user123/200/200',
        role: role
      });
      setIsLoading(false);
      navigate(role === 'staff' ? '/staff/dashboard' : '/attendee/dashboard');
    }, 1200);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      login({
        uid: 'google-123',
        email: 'kumar.v@example.com',
        displayName: 'Vikram Kumar',
        photoURL: 'https://picsum.photos/seed/kumar/200/200',
        role: role
      });
      setIsLoading(false);
      navigate(role === 'staff' ? '/staff/dashboard' : '/attendee/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-8 left-8 z-50">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>
      
      <div className="absolute top-8 right-8 z-50">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-surface border-4 border-foreground rounded-[3rem] p-8 lg:p-12 shadow-[20px_20px_0px_rgba(30,58,138,0.1)]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-black tracking-tighter uppercase mb-4 text-foreground leading-none">
              Welcome <br/> Back
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-accent flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Signing in as {role}
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground ml-1">Email ID</label>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-16 bg-muted/30 border-2 border-border rounded-2xl focus:border-primary transition-all text-foreground font-bold px-6"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground ml-1">Secret Key</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-16 bg-muted/30 border-2 border-border rounded-2xl focus:border-primary transition-all text-foreground font-bold px-6"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl mt-4 border-b-4 border-primary/20 shadow-xl transition-all hover:translate-y-[-2px] active:translate-y-[2px]"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Secure Log In'}
            </Button>
          </form>

          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-border"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.4em]">
              <span className="bg-surface px-4 text-muted-foreground">OR</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full h-16 border-2 border-border bg-transparent text-foreground hover:bg-muted/50 rounded-2xl flex gap-4 items-center justify-center font-black uppercase tracking-widest transition-all"
            onClick={handleGoogleSignIn}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/layout/google.svg" className="w-5 h-5" alt="Google" referrerPolicy="no-referrer" />
            Google Connect
          </Button>
        </div>
        
        <p className="text-center mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50">
          Powered by CrowdSense Intelligence Engine
        </p>
      </motion.div>
    </div>
  );
}
