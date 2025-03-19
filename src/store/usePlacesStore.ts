import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlaceT, RecommendOptionsT } from '@/types';

// Zustand 스토어 상태 정의
interface PlacesState {
  recentSearches: { places: PlaceT[]; options: RecommendOptionsT }[];
  addSearch: (places: PlaceT[], options: RecommendOptionsT) => void;
  initializeSearchHistory: () => void;
}

// Zustand 스토어 생성
export const usePlaceStore = create<PlacesState>()(
  persist(
    (set, get) => ({
      recentSearches: [],

      addSearch: (places, options) => {
        const currentSearches = get().recentSearches;

        // 검색 기록 최대 5개까지만 유지
        const updatedSearches = [{ places, options }, ...currentSearches].slice(0, 5);

        set({ recentSearches: updatedSearches });
      },

      initializeSearchHistory: () => {
        if (typeof window !== 'undefined') {
          const savedData = localStorage.getItem('recent-search-storage');
          if (savedData) {
            try {
              const parsedData = JSON.parse(savedData);
              if (Array.isArray(parsedData.state.recentSearches)) {
                set({ recentSearches: parsedData.state.recentSearches });
              }
            } catch (error) {
              console.error('❌ 저장된 검색 기록 불러오기 실패:', error);
            }
          }
        }
      }
    }),
    {
      name: 'recent-search-storage'
    }
  )
);
