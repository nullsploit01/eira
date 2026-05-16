import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';

const Ground = () => {
  return (
    <RigidBody type="fixed">
      <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial side={DoubleSide} />
      </mesh>

      <CuboidCollider args={[50, 0.1, 50]} />
    </RigidBody>
  );
};

export default Ground;
