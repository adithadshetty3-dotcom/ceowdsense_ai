import { crowdZones } from '../lib/dummy-data';
import { useStore } from '../lib/store';

export default function CrowdMap() {
  const { setSelectedZone, selectedZone } = useStore();

  const getDensityColor = (density: string) => {
    switch (density) {
      case 'high': return 'bg-danger text-destructive-foreground border-danger/20';
      case 'medium': return 'bg-warning text-gray-900 border-warning/20';
      case 'low': return 'bg-accent text-accent-foreground border-accent/20';
      default: return 'bg-muted text-foreground';
    }
  };

  return (
    <div className="map-placeholder-geom flex-1 p-6 h-full min-h-[400px]">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full relative z-10 h-fit">
        {crowdZones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setSelectedZone(zone)}
            className={`p-6 rounded-2xl border transition-all flex flex-col items-center justify-center gap-3 relative group ${
              selectedZone?.id === zone.id ? 'ring-2 ring-primary scale-105 z-20 shadow-xl' : 'hover:scale-102 shadow-sm'
            } ${getDensityColor(zone.density)}`}
          >
            <span className="text-4xl filter drop-shadow-md">{zone.symbol}</span>
            <div className="text-center">
              <div className="text-xs font-black uppercase tracking-widest leading-none mb-1">{zone.name}</div>
              <div className="text-[10px] font-bold opacity-75">{zone.people} PEOPLE</div>
            </div>
            
            {zone.density === 'high' && (
              <div className="absolute top-3 right-3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {selectedZone && (
        <div className="absolute bottom-6 left-6 right-6 bg-surface/95 backdrop-blur-md p-4 rounded-xl border border-border shadow-2xl z-30 animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold uppercase">{selectedZone.name}</h4>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Crowd Density: {selectedZone.density}</p>
            </div>
            <button 
              onClick={() => setSelectedZone(null)}
              className="text-[10px] font-bold text-primary hover:underline"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
