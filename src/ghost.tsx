import { ghostAnimations } from './constants/animations';
import { Clone, useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import type { Group } from 'three';

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
  animationName = ghostAnimations.hurt,
}: GhostProps) => {
  const groupRef = useRef<Group>(null);
  const model = useGLTF('./models/ghost/ghost.glb');
  const animations = useAnimations(model.animations, groupRef);

  useEffect(() => {
    const action = animations.actions[animationName];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [animationName, animations.actions]);

  return (
    <>
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        <Clone object={model.scene} />
      </group>
    </>
  );
};

export default Ghost;
