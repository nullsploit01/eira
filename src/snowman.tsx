import { snowmanAnimations } from './constants/animations';
import { useLevaControls } from './hooks/useLevaControls';
import { useSnowmanLookAtCamera } from './hooks/useSnowmanLookAtCamera';
import SnowmanMessage from './snowman_message';
import { useAnimations, useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import { Group, Mesh } from 'three';

const Snowman = () => {
  const snowmanRef = useRef<Group>(null);

  const snowman = useGLTF('./models/snow_man/snow_man.glb');

  const animations = useAnimations(snowman.animations, snowman.scene);

  const controls = useLevaControls('Snowman', {
    scale: 0.2,

    position: {
      value: [3, 0.2, 2] as [number, number, number],
      step: 0.1,
    },

    rotation: {
      value: [0, -1.9, 0] as [number, number, number],
      step: 0.1,
    },

    animation: {
      value: snowmanAnimations.jump,
      options: animations.names,
    },
  });

  useSnowmanLookAtCamera(snowmanRef);

  useEffect(() => {
    snowman.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
  }, []);

  useEffect(() => {
    const action = animations.actions[controls.animation];

    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [controls.animation]);

  return (
    <RigidBody
      position={controls.position}
      rotation={controls.rotation}
      scale={controls.scale}
      colliders={false}
      type="fixed"
    >
      <primitive ref={snowmanRef} object={snowman.scene} />
      <CuboidCollider args={[1, 5, 1]} />
      <SnowmanMessage />
    </RigidBody>
  );
};

export default Snowman;
