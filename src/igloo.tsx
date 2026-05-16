import { useLevaControls } from './hooks/useLevaControls';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const Igloo = () => {
  const igloo = useGLTF('./models/igloo/igloo.glb');
  const controls = useLevaControls('Igloo', {
    position: {
      value: [-5, -0.2, 13] as [number, number, number],
      step: 0.1,
    },
    rotation: {
      value: [0, 1.7, 0] as [number, number, number],
      step: 0.1,
    },
    scale: {
      value: 2.2,
      step: 0.1,
    },
  });
  return (
    <>
      <group rotation={controls.rotation} position={controls.position}>
        <RigidBody type="fixed">
          <mesh scale={controls.scale}>
            <primitive object={igloo.scene} />
          </mesh>
        </RigidBody>
      </group>
    </>
  );
};

export default Igloo;
