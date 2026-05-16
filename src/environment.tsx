import { useLevaControls } from './hooks/useLevaControls';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useEffect } from 'react';
import { DoubleSide, Mesh } from 'three';

const Environment = () => {
  const { camera } = useThree();

  const cameraControls = useLevaControls('Camera', {
    cameraPosition: [3.28, 2.38, 5.3] as [number, number, number],
  });

  const welcomeLampControls = useLevaControls('WelcomeLamp', {
    scale: 0.6,
    position: {
      value: [-2, 1.5, 2.2] as [x: number, y: number, z: number],
      step: 0.1,
    },
    rotation: {
      value: [0, 0, 0] as [x: number, y: number, z: number],
      step: 0.1,
    },
    lightPosition: {
      value: [2.1, -0.4, -0.1] as [x: number, y: number, z: number],
      step: 0.1,
    },
    lightColor: '#ffd580',
  });

  useEffect(() => {
    camera.position.set(...cameraControls.cameraPosition);
  }, [cameraControls]);

  const welcomeLamp = useGLTF('./models/welcome_lamp/welcome_lamp.glb');

  useEffect(() => {
    welcomeLamp.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
  }, []);

  return (
    <>
      <RigidBody type="fixed">
        <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial side={DoubleSide} />
        </mesh>

        <CuboidCollider args={[50, 0.1, 50]} />
      </RigidBody>
      <RigidBody
        colliders={false}
        type="fixed"
        position={welcomeLampControls.position}
        scale={welcomeLampControls.scale}
        rotation={welcomeLampControls.rotation}
      >
        <mesh castShadow receiveShadow>
          <primitive object={welcomeLamp.scene} />
        </mesh>
        <CuboidCollider args={[1, 2, 1]} />
        <pointLight
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          position={welcomeLampControls.lightPosition}
          intensity={8}
          distance={15}
          decay={2}
          color={welcomeLampControls.lightColor}
          castShadow
        />
      </RigidBody>
    </>
  );
};

export default Environment;
