import { create } from 'zustand';
import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  mode: ThemeMode | null;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

// zustand 스토어 생성
export const useThemeStore = create<ThemeStore>((set) => ({
  mode: 'light',

  setMode: (mode) => {
    set({ mode });
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', mode);
    }
  },

  toggleMode: () => {
    set((state) => {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', newMode);
      }
      return { mode: newMode };
    });
  }
}));

// 상태 업데이트
export function useInitializeTheme() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
      if (savedMode) {
        useThemeStore.setState({ mode: savedMode });
      } else {
        useThemeStore.setState({ mode: 'light' }); // 기본값을 light로 설정
      }
    }
  }, []);
}
