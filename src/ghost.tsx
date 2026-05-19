import { ghostAnimations } from './constants/animations';
import { Clone, useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Group, LoopOnce, LoopRepeat, MathUtils, Vector3 } from 'three';

type GhostProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  animationName?: string;
};

const Ghost = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.5,
  animationName = ghostAnimations.walk,
}: GhostProps) => {
  const groupRef = useRef<Group>(null);
  const model = useGLTF('./models/ghost/ghost.glb');
  const animations = useAnimations(model.animations, groupRef);
  const targetPosition = useRef(new Vector3(...position));
  const baseY = useRef(position[1]);
  const targetY = useRef(position[1]);
  const isMoving = useRef(false);
  const isAnimating = useRef(false);

  const playAnimation = (name: string, duration = 0.5, loop = false) => {
    Object.values(animations.actions).forEach((action) => {
      action?.fadeOut(0.2);
    });

    const action = animations.actions[name];
    if (!action) {
      return;
    }

    action.reset();
    action.timeScale = 0.8;
    action.setLoop(loop ? LoopRepeat : LoopOnce, loop ? Infinity : 1);
    action.clampWhenFinished = true;
    action.fadeIn(0.2);
    action.play();

    if (duration !== Infinity && !loop) {
      setTimeout(() => {
        action.fadeOut(0.2);
      }, duration * 1000);
    }
  };

  useEffect(() => {
    playAnimation(animationName, Infinity, true);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const angle = Math.atan2(
      state.camera.position.x - groupRef.current.position.x,
      state.camera.position.z - groupRef.current.position.z,
    );

    groupRef.current.rotation.y = angle;
    const ghost = groupRef.current;

    // floating idle motion
    if (!isAnimating.current) {
      ghost.position.y = baseY.current + Math.sin(state.clock.elapsedTime * 2) * 0.08;
    }

    // smooth x/z movement
    if (isMoving.current) {
      ghost.position.lerp(targetPosition.current, 1.5 * delta);
      const distance = ghost.position.distanceTo(targetPosition.current);
      if (distance < 0.02) {
        isMoving.current = false;
      }
    }

    // smooth up/down motion
    ghost.position.y = MathUtils.lerp(ghost.position.y, targetY.current, 4 * delta);
  });

  const handleClick = () => {
    if (!groupRef.current || isAnimating.current) {
      return;
    }

    isAnimating.current = true;
    const ghost = groupRef.current;
    const startX = ghost.position.x;
    const startZ = ghost.position.z;

    // hurt
    playAnimation(ghostAnimations.hurt, 0.8);
    isMoving.current = true;
    targetPosition.current.set(startX + 0.4, targetY.current, startZ - 0.3);

    // spooky attack drift
    setTimeout(() => {
      playAnimation(ghostAnimations.attack, 1);
      isMoving.current = true;
      targetPosition.current.set(startX - 0.3, targetY.current, startZ + 0.2);
    }, 900);

    // collapse
    setTimeout(() => {
      targetY.current = baseY.current - 0.7;
      playAnimation(ghostAnimations.knockdown, 1.5);
    }, 2000);

    // stay down
    setTimeout(() => {
      playAnimation(ghostAnimations.knockdownIdle, Infinity, true);
    }, 3600);

    // rise up
    setTimeout(() => {
      targetY.current = baseY.current;
      playAnimation(ghostAnimations.knockdownUp, 2);
    }, 5200);

    // back to idle
    setTimeout(() => {
      playAnimation(ghostAnimations.idle, Infinity, true);
      isAnimating.current = false;
    }, 7600);
  };

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <Clone object={model.scene} />
    </group>
  );
};

export default Ghost;
