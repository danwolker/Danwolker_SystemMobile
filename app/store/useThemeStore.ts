import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',  // Agora começa em Light Mode
  toggleTheme: () => {
    const current = get().theme;
    set({ theme: current === 'dark' ? 'light' : 'dark' });
  },
}));
