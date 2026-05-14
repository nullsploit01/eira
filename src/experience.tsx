import Player from './player';
// import { useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';

const Experience = () => {
  // const woodSigns = useGLTF('./models/wood_signs/scene.gltf');

  return (
    <>
      <RigidBody type="fixed">
        <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial side={DoubleSide} />
        </mesh>

        <CuboidCollider args={[50, 0.1, 50]} />
      </RigidBody>

      <Player />
    </>
  );
};

export default Experience;
