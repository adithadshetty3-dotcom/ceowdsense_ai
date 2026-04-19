
export const simulateCrowdLoad = () => Math.floor(Math.random() * (95 - 60 + 1)) + 60; // 60-95%
export const simulateResponseTime = () => (Math.random() * (2.1 - 0.8) + 0.8).toFixed(1); // 0.8-2.1s
export const simulateNavigationAccuracy = () => Math.floor(Math.random() * (98 - 85 + 1)) + 85; // 85-98%
export const simulateEmergencyTime = () => (Math.random() * (2.5 - 1.2) + 1.2).toFixed(1); // 1.2-2.5s

export const getSystemHealth = () => {
  const load = simulateCrowdLoad();
  if (load > 90) return 'moderate';
  return 'optimal';
};
