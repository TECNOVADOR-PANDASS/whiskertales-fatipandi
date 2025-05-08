import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReadingProgressState {
  storiesRead: number;
  storyHistory: string[];
  
  // Actions
  incrementStoriesRead: (storyTitle: string) => void;
  resetProgress: () => void;
}

export const useReadingProgress = create<ReadingProgressState>()(
  persist(
    (set, get) => ({
      storiesRead: 0,
      storyHistory: [],
      
      incrementStoriesRead: (storyTitle: string) => {
        set(state => {
          // Verificar si esta historia ya está en el historial para evitar duplicados
          if (!state.storyHistory.includes(storyTitle)) {
            return {
              storiesRead: state.storiesRead + 1,
              storyHistory: [...state.storyHistory, storyTitle]
            };
          }
          return state;
        });
      },
      
      resetProgress: () => set({ storiesRead: 0, storyHistory: [] }),
    }),
    {
      name: 'reading-progress-storage', // nombre para localStorage
    }
  )
);