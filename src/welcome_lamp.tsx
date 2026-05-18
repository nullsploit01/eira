import { useLevaControls } from './hooks/useLevaControls';
import { useGLTF, useHelper } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import { Mesh, PointLight, PointLightHelper } from 'three';

const WelcomeLamp = () => {
  const lightRef = useRef<PointLight>({} as PointLight);

  const welcomeLamp = useGLTF('./models/welcome_lamp/welcome_lamp.glb');

  const controls = useLevaControls('WelcomeLamp', {
    scale: 0.6,

    position: {
      value: [-2, 1.2, 2.2] as [number, number, number],
      step: 0.1,
    },

    rotation: {
      value: [0, 0, 0] as [number, number, number],
      step: 0.1,
    },

    lightPosition: {
      value: [1.7, 0.5, -0.1] as [number, number, number],
      step: 0.1,
    },

    showHelper: false,
    lightColor: '#ffd580',
  });

  useEffect(() => {
    welcomeLamp.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);

  useHelper(controls.showHelper ? lightRef : null, PointLightHelper, 0.5, 'hotpink');

  return (
    <RigidBody
      colliders={false}
      type="fixed"
      position={controls.position}
      scale={controls.scale}
      rotation={controls.rotation}
    >
      <primitive object={welcomeLamp.scene} />

      <CuboidCollider args={[1, 2, 1]} />

      <pointLight
        ref={lightRef}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        position={controls.lightPosition}
        intensity={8}
        distance={15}
        decay={2}
        color={controls.lightColor}
      />
    </RigidBody>
  );
};

export default WelcomeLamp;
