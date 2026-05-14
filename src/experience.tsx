import { useLevaControls } from './hooks/useLevaControls';
import { useAnimations, useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useEffect } from 'react';
import { DoubleSide } from 'three';

const Experience = () => {
  const penguin = useGLTF('./models/penguin/scene.gltf');
  const penguinAnimations = useAnimations(penguin.animations, penguin.scene);

  const woodSigns = useGLTF('./models/wood_signs/scene.gltf');

  const penguinControls = useLevaControls('Penguin', {
    rotation: {
      value: [0, 3.2, 0],
      step: 0.1,
    },
    animationName: {
      options: penguinAnimations.names,
      value: 'Walk',
    },
  });

  console.log(woodSigns);

  useEffect(() => {
    const action = penguinAnimations.actions[penguinControls.animationName];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [penguinControls.animationName]);

  return (
    <>
      <RigidBody type="fixed">
        <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial side={DoubleSide} />
        </mesh>

        <CuboidCollider args={[5, 0.1, 5]} />
      </RigidBody>

      <RigidBody
        rotation={penguinControls.rotation as [number, number, number]}
        position={[0, 1, 0]}
      >
        <mesh scale={2}>
          <primitive object={penguin.scene} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Experience;
