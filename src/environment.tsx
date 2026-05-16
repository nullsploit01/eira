import { snowmanAnimations } from './constants/animations';
import { useLevaControls } from './hooks/useLevaControls';
import { useAnimations, useGLTF, useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import { DoubleSide, Mesh, PointLight, PointLightHelper } from 'three';

const Environment = () => {
  const { camera } = useThree();
  const lightRef = useRef<PointLight>({} as PointLight);

  const cameraControls = useLevaControls('Camera', {
    cameraPosition: [3.28, 2, 5.3] as [number, number, number],
  });

  const welcomeLampControls = useLevaControls('WelcomeLamp', {
    scale: 0.6,
    position: {
      value: [-2, 1.2, 2.2] as [x: number, y: number, z: number],
      step: 0.1,
    },
    rotation: {
      value: [0, 0, 0] as [x: number, y: number, z: number],
      step: 0.1,
    },
    lightPosition: {
      value: [1.7, 0.5, -0.1] as [x: number, y: number, z: number],
      step: 0.1,
    },
    showHelper: false,
    lightColor: '#ffd580',
  });

  useEffect(() => {
    camera.position.set(...cameraControls.cameraPosition);
  }, [cameraControls]);

  const welcomeLamp = useGLTF('./models/welcome_lamp/welcome_lamp.glb');
  const snowMan = useGLTF('./models/snow_man/snow_man.glb');

  const snowManAnimations = useAnimations(snowMan.animations, snowMan.scene);

  useEffect(() => {
    welcomeLamp.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });

    snowMan.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
  }, []);

  const snowmanControls = useLevaControls('Snowman', {
    scale: 0.2,
    position: {
      value: [3, 0.2, 2] as [x: number, y: number, z: number],
      step: 0.1,
    },
    rotation: {
      value: [0, -1.9, 0] as [x: number, y: number, z: number],
      step: 0.1,
    },
    animation: {
      value: snowmanAnimations.jump,
      options: snowManAnimations.names,
    },
  });

  useEffect(() => {
    const action = snowManAnimations.actions[snowmanControls.animation];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [snowmanControls.animation]);

  useHelper(welcomeLampControls.showHelper ? lightRef : null, PointLightHelper, 0.5, 'hotpink');

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
          ref={lightRef}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          position={welcomeLampControls.lightPosition}
          intensity={8}
          scale={0.5}
          distance={15}
          decay={2}
          color={welcomeLampControls.lightColor}
          castShadow
        />
      </RigidBody>

      <RigidBody
        position={snowmanControls.position}
        rotation={snowmanControls.rotation}
        scale={snowmanControls.scale}
        colliders={false}
        type="fixed"
      >
        <mesh>
          <primitive object={snowMan.scene} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Environment;
