import { useLevaControls } from './hooks/useLevaControls';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

const CampFire = () => {
  const model = useGLTF('./models/camp_fire/camp_fire.glb');
  const animations = useAnimations(model.animations, model.scene);

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

  return (
    <>
      <group position={controls.position} rotation={controls.rotation}>
        <primitive object={model.scene} />
      </group>
    </>
  );
};

export default CampFire;
