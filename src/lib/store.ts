import { create } from 'zustand';
import { AppState, UserProfile, UserRole, Theme, CrowdZone } from '../types';

export const useStore = create<AppState>((set) => ({
  user: null,
  isAuthReady: false,
  theme: 'light',
  selectedZone: null,
  selectedRoute: null,
  language: 'EN',
  highVisibility: false,
  setLanguage: (language) => set({ language }),
  setHighVisibility: (highVisibility) => {
    document.documentElement.classList.toggle('high-visibility', highVisibility);
    set({ highVisibility });
  },
  login: (user) => set({ user, isAuthReady: true }),
  logout: () => set({ user: null, isAuthReady: true, selectedZone: null, selectedRoute: null }),
  setRole: (role: UserRole) => set((state) => ({
    user: state.user ? { ...state.user, role } : null
  })),
  setTheme: (theme: Theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    set({ theme });
  },
  setSelectedZone: (zone: CrowdZone | null) => set({ selectedZone: zone }),
  setSelectedRoute: (route: string[] | null) => set({ selectedRoute: route }),
}));
