import { type PlayerAnimation, playerAnimations } from '../constants/animations';
import { create } from 'zustand';

type ExperienceState = {
  hasStarted: boolean;
  playerAnimation: PlayerAnimation;
  canMovePlayer: boolean;
  startGame: () => void;
  resetGame: () => void;
  setPlayerAnimation: (animation: PlayerAnimation) => void;
  setCanMovePlayer: (canMove: boolean) => void;
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  hasStarted: false,
  playerAnimation: playerAnimations.sleep,
  canMovePlayer: true,

  setCanMovePlayer: (canMove: boolean) =>
    set({
      canMovePlayer: canMove,
    }),

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
