import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "ready" | "playing" | "ended" | "celebrating";

interface GameState {
  phase: GamePhase;
  currentAnimal: string;
  isAnimalAnimating: boolean;
  progressAnimation: 'none' | 'jump' | 'spin' | 'celebrate';
  
  // Actions
  start: () => void;
  restart: () => void;
  end: () => void;
  setCurrentAnimal: (animal: string) => void;
  animateAnimal: (animation: 'none' | 'jump' | 'spin' | 'celebrate') => void;
  celebrate: () => void;
}

export const useGame = create<GameState>()(
  subscribeWithSelector((set) => ({
    phase: "ready",
    currentAnimal: "default",
    isAnimalAnimating: false,
    progressAnimation: 'none',
    
    start: () => {
      set((state) => {
        // Only transition from ready to playing
        if (state.phase === "ready") {
          return { phase: "playing" };
        }
        return {};
      });
    },
    
    restart: () => {
      set(() => ({ phase: "ready" }));
    },
    
    end: () => {
      set((state) => {
        // Only transition from playing to ended
        if (state.phase === "playing") {
          return { phase: "ended" };
        }
        return {};
      });
    },
    
    setCurrentAnimal: (animal: string) => {
      set({ currentAnimal: animal });
    },
    
    animateAnimal: (animation: 'none' | 'jump' | 'spin' | 'celebrate') => {
      set({ progressAnimation: animation, isAnimalAnimating: animation !== 'none' });
      
      // Reiniciar la animación después de un tiempo
      if (animation !== 'none') {
        setTimeout(() => {
          set({ progressAnimation: 'none', isAnimalAnimating: false });
        }, animation === 'celebrate' ? 3000 : 1000);
      }
    },
    
    celebrate: () => {
      // Cambiar el estado a celebración
      set({ phase: "celebrating" });
      
      // Volver a "playing" después de la celebración
      setTimeout(() => {
        set({ phase: "playing" });
      }, 3000);
    }
  }))
);
