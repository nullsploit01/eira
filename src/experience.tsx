import { useLevaControls } from './hooks/useLevaControls';
import { Center, SpotLight, useGLTF } from '@react-three/drei';

const Experience = () => {
  const spotlightControls = useLevaControls('Spotlight', {
    position: {
      value: [2.7, 3.1, 1.9],
      step: 0.1,
    },
  });

  const penguinControls = useLevaControls('Penguin', {
    rotation: {
      value: [0, 3.2, 0],
      step: 0.1,
    },
  });

  const penguin = useGLTF('./models/penguin/scene.gltf');

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
        <mesh scale={1.5} rotation={penguinControls.rotation as [number, number, number]}>
          <primitive object={penguin.scene} />
        </mesh>
      </Center>
    </mesh>
  );
};

export default Experience;
