import { CrowdZone } from '../types';

export const crowdZones: CrowdZone[] = [
  { id: "gateA", name: "Gate A", density: "high", people: 120, symbol: '🚪' },
  { id: "gateB", name: "Gate B", density: "low", people: 45, symbol: '🚪' },
  { id: "food", name: "Food Court", density: "medium", people: 80, symbol: '🍔' },
  { id: "restroom", name: "Restroom Area", density: "low", people: 20, symbol: '🚻' },
  { id: "seating", name: "North Seating", density: "high", people: 450, symbol: '💺' },
  { id: "plaza", name: "Entry Plaza", density: "medium", people: 150, symbol: '🏟️' },
];

export const routes = {
  exit: ["Go straight towards the North tunnel", "Turn left at the Concession stand", "Reach Gate A directly ahead"],
  restroom: ["Turn right at the Seating Area entrance", "Walk 20m past the VIP lounge", "Restroom is ahead on your right"],
};
