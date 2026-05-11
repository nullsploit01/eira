import { useLevaControls } from './hooks/useLevaControls';
import { Center, SpotLight, useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

const Experience = () => {
  const spotlightControls = useLevaControls('Spotlight', {
    position: {
      value: [2.7, 3.1, 1.9],
      step: 0.1,
    },
  });

  const penguin = useGLTF('./models/penguin/scene.gltf');
  const animations = useAnimations(penguin.animations, penguin.scene);
  console.log(animations);

  const penguinControls = useLevaControls('Penguin', {
    rotation: {
      value: [0, 3.2, 0],
      step: 0.1,
    },
    animationName: {
      options: animations.names,
      value: 'Walk',
    },
  });

  useEffect(() => {
    const action = animations.actions[penguinControls.animationName];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [penguinControls.animationName]);

  return (
    <mesh>
      <SpotLight
        position={spotlightControls.position as [number, number, number]}
        distance={10}
        angle={3}
        attenuation={5}
        intensity={10}
        anglePower={0}
      />
      <Center>
        <mesh scale={2.5} rotation={penguinControls.rotation as [number, number, number]}>
          <primitive object={penguin.scene} />
        </mesh>
      </Center>
    </mesh>
  );
};

export default Experience;
