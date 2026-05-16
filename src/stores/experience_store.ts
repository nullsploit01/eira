import { create } from 'zustand';

type ExperienceState = {
  hasStarted: boolean;

  startGame: () => void;
  resetGame: () => void;
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  hasStarted: false,

  startGame: () =>
    set({
      hasStarted: true,
    }),

  resetGame: () =>
    set({
      hasStarted: false,
    }),
}));
