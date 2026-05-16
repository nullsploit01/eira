import { useLevaControls } from './hooks/useLevaControls';
import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useEffect } from 'react';
import { DoubleSide } from 'three';

const Environment = () => {
  const { camera } = useThree();

  const cameraControls = useLevaControls('Camera', {
    cameraPosition: [3.28, 2.38, 5.3] as [number, number, number],
  });

  const welcomeLampControls = useLevaControls('WelcomeLamp', {
    scale: 0.6,
    position: {
      value: [-2, 1.4, 2.2] as [x: number, y: number, z: number],
      step: 0.1,
    },
    rotation: {
      value: [0, 0, 0] as [x: number, y: number, z: number],
      step: 0.1,
    },
  });

  useEffect(() => {
    camera.position.set(...cameraControls.cameraPosition);
  }, [cameraControls]);

  const welcomeLamp = useGLTF('./models/welcome_lamp/welcome_lamp.glb');
  return (
    <>
      <RigidBody type="fixed">
        <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial side={DoubleSide} />
        </mesh>

        <CuboidCollider args={[50, 0.1, 50]} />
      </RigidBody>
      <RigidBody
        type="fixed"
        position={welcomeLampControls.position}
        scale={welcomeLampControls.scale}
        rotation={welcomeLampControls.rotation}
      >
        <mesh>
          <primitive object={welcomeLamp.scene} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Environment;
