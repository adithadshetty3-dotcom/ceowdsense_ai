export type UserRole = 'attendee' | 'staff' | null;
export type Theme = 'light' | 'dark';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
}

export interface CrowdZone {
  id: string;
  name: string;
  density: 'low' | 'medium' | 'high';
  people: number;
  symbol?: string;
}

export interface AppState {
  user: UserProfile | null;
  isAuthReady: boolean;
  theme: Theme;
  selectedZone: CrowdZone | null;
  selectedRoute: string[] | null;
  language: 'EN' | 'HI';
  highVisibility: boolean;
  setLanguage: (lang: 'EN' | 'HI') => void;
  setHighVisibility: (active: boolean) => void;
  login: (user: UserProfile) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  setTheme: (theme: Theme) => void;
  setSelectedZone: (zone: CrowdZone | null) => void;
  setSelectedRoute: (route: string[] | null) => void;
}
