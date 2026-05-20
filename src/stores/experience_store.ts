import { type PlayerAnimation, playerAnimations } from '../constants/animations';
import { create } from 'zustand';

type ExperienceState = {
  hasStarted: boolean;
  playerAnimation: PlayerAnimation;
  startGame: () => void;
  resetGame: () => void;
  setPlayerAnimation: (animation: PlayerAnimation) => void;
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  hasStarted: false,
  playerAnimation: playerAnimations.sleep,

  startGame: () =>
    set({
      hasStarted: true,
    }),

  setPlayerAnimation: (animation: PlayerAnimation) =>
    set({
      playerAnimation: animation,
    }),

  resetGame: () =>
    set({
      hasStarted: false,
    }),
}));
