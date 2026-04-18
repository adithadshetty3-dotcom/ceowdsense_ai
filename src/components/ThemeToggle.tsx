import { Sun, Moon } from 'lucide-react';
import { useStore } from '../lib/store';

export default function ThemeToggle() {
  const { theme, setTheme } = useStore();

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors border border-border"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-primary" />
      ) : (
        <Sun className="w-5 h-5 text-warning" />
      )}
    </button>
  );
}
