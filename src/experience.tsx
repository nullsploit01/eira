import { useLevaControls } from './hooks/useLevaControls';
import { SpotLight, Text3D } from '@react-three/drei';

const Experience = () => {
  const spotlightControls = useLevaControls('Spotlight', {
    position: {
      value: [2.7, 3.1, 1.9],
      step: 0.1,
    },
  });

  return (
    <mesh position={[-3.9, 1, 0]}>
      <SpotLight
        position={spotlightControls.position as [number, number, number]}
        distance={10}
        angle={3}
        attenuation={5}
        intensity={10}
        anglePower={0}
      />

      <Text3D scale={0.3} font={'./fonts/carter_one.json'}>
        Harshal Dharmik
        <meshPhysicalMaterial toneMapped />
      </Text3D>
    </mesh>
  );
};

export default Experience;
