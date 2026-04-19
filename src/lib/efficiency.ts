/**
 * Efficiency & Performance Optimization Library
 */

import { useMemo } from 'react';

// Predictive Cache for Crowd Data
const crowdCache = new Map<string, any>();

export const getCachedCrowdData = (zoneId: string) => {
  if (crowdCache.has(zoneId)) {
    return crowdCache.get(zoneId);
  }
  return null;
};

export const setCachedCrowdData = (zoneId: string, data: any) => {
  crowdCache.set(zoneId, data);
  // Auto-expire after 30 seconds for efficiency
  setTimeout(() => crowdCache.delete(zoneId), 30000);
};

// Hook for memoized calculations
export const useCrowdMetrics = (load: number) => {
  return useMemo(() => {
    return {
      isCapped: load > 95,
      alertLevel: load > 85 ? 'high' : load > 60 ? 'medium' : 'low',
      recommendation: load > 85 ? 'Reroute required' : 'Optimal flow',
    };
  }, [load]);
};
