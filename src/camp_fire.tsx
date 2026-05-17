import { useLevaControls } from './hooks/useLevaControls';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type { PointLight } from 'three';

const CampFire = () => {
  const model = useGLTF('./models/camp_fire/camp_fire.glb');
  const animations = useAnimations(model.animations, model.scene);
  const lightRef = useRef<PointLight>({} as PointLight);
  const controls = useLevaControls('CampFire', {
    scale: 1.5,
    position: {
      value: [9, 0, 11.5] as [number, number, number],
      step: 0.1,
    },
    rotation: {
      value: [0, 0, 0] as [number, number, number],
      step: 0.1,
    },
    animation: {
      value: animations.names[0],
      options: animations.names,
    },
  });

  useEffect(() => {
    const action = animations.actions[controls.animation];

    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [controls.animation]);

  useFrame((state) => {
    lightRef.current.intensity =
      4 + Math.sin(state.clock.elapsedTime * 8) * 0.4 + Math.random() * 0.2;
  });

  return (
    <>
      <group position={controls.position} rotation={controls.rotation}>
        <mesh scale={0.7}>
          <primitive object={model.scene} />
        </mesh>
        <pointLight
          castShadow
          ref={lightRef}
          position={[0, 1, 0]}
          intensity={4}
          distance={8}
          decay={2}
          color="#ff9e57"
        />
        <pointLight position={[0, 0.3, 0]} intensity={2} distance={4} decay={2} color="#ff5a36" />
      </group>
    </>
  );
};

export default CampFire;
