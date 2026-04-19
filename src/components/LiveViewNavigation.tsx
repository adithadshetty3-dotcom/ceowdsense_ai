import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUp, ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useStore } from '../lib/store';

interface LiveViewNavigationProps {
  onClose: () => void;
}

const steps = [
  { text: "Go straight for 20 meters", direction: "straight" },
  { text: "Turn right at the junction", direction: "right" },
  { text: "Continue towards Gate A", direction: "straight", alert: "Crowded ahead ⚠️" },
  { text: "Reach Section 104", direction: "straight" },
];

export default function LiveViewNavigation({ onClose }: LiveViewNavigationProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { selectedRoute } = useStore();

  const [error, setError] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    
    async function setupCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera API is not supported in this browser or environment (requires HTTPS).");
        return;
      }
      try {
        let mediaStream: MediaStream;
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: { ideal: 'environment' } } 
          });
        } catch (e) {
          mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        }

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
        currentStream = mediaStream;
        setError(null);
      } catch (err) {
        console.error("Camera access denied:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (errorMessage.includes("Permission denied") || errorMessage.includes("NotAllowedError")) {
          setError("Camera permission was denied. Please allow camera access to use AR Navigation.");
        } else {
          setError(`Camera Error: ${errorMessage}`);
        }
      }
    }

    async function setupLocation() {
      if (!navigator.geolocation) {
        setLocationStatus('denied');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationStatus('granted');
        },
        (err) => {
          console.error("Location error:", err);
          setLocationStatus('denied');
        },
        { enableHighAccuracy: true }
      );

      return navigator.geolocation.watchPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        null,
        { enableHighAccuracy: true }
      );
    }

    setupCamera();
    let locationWatchId: number | null = null;
    setupLocation().then(id => {
      if (typeof id === 'number') locationWatchId = id;
    });

    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 5000);

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
      if (locationWatchId !== null) {
        navigator.geolocation.clearWatch(locationWatchId);
      }
      clearInterval(interval);
    };
  }, []);

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[300] bg-black overflow-hidden flex flex-col">
      {/* Background Camera Feed */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* AR Overlay Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-8 pb-32">
        {/* Header */}
        <div className="w-full flex justify-between items-start">
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <h2 className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              Live AR Navigation
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error || locationStatus === 'denied' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/80 backdrop-blur-xl p-8 rounded-[2.5rem] border-2 border-white/20 max-w-sm text-center shadow-2xl relative z-10"
          >
            <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-6" />
            <h3 className="text-white text-xl font-black uppercase tracking-tight mb-4">Permissions Required</h3>
            <p className="text-white/80 text-sm font-bold leading-relaxed mb-6 px-4">
              {error ? error : "Location access is required for real-time guidance. Please enable location services in your browser settings."}
            </p>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all"
            >
              Adjust Settings
            </button>
          </motion.div>
        ) : locationStatus === 'pending' ? (
          <div className="flex flex-col items-center gap-4">
             <div className="w-8 h-8 border-4 border-white/20 border-t-accent rounded-full animate-spin" />
             <p className="text-white text-[10px] font-black uppercase tracking-widest">Calibrating Location...</p>
          </div>
        ) : (
          /* AR Navigation Content (Arrows, etc.) */
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -20 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-32 h-32 bg-accent/80 backdrop-blur-lg rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.5)] border-4 border-white/30">
                {step.direction === 'straight' && <ArrowUp className="w-16 h-16 text-white animate-bounce" />}
                {step.direction === 'right' && <ArrowRight className="w-16 h-16 text-white animate-pulse" />}
                {step.direction === 'left' && <ArrowLeft className="w-16 h-16 text-white animate-pulse" />}
              </div>
              
              <div className="bg-black/60 backdrop-blur-xl px-8 py-4 rounded-[2rem] border-2 border-accent/40 shadow-2xl max-w-[300px] text-center">
                <p className="text-white text-lg font-black uppercase tracking-tight leading-none mb-1">
                  {step.text}
                </p>
                <div className="h-1 bg-white/20 rounded-full w-full overflow-hidden mt-3">
                   <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="h-full bg-accent" 
                   />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Alerts / Footer */}
        <div className="w-full flex flex-col items-center gap-4">
          <AnimatePresence>
            {step.alert && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-danger/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-3 animate-pulse"
              >
                <AlertTriangle className="w-5 h-5 text-white" />
                <span className="text-white text-xs font-black uppercase tracking-widest">{step.alert}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scanning effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-[2px] bg-accent/30 shadow-[0_0_15px_rgba(34,197,94,0.5)] absolute animate-scan top-0" />
      </div>
    </div>
  );
}
