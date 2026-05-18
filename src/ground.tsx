import { useTexture } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { DoubleSide, RepeatWrapping } from 'three';

const Ground = () => {
  const texture = useTexture({
    map: '/textures/snow/snow_02_diff_1k.png',
    normalMap: '/textures/snow/snow_02_nor_gl_1k.png',
    roughnessMap: '/textures/snow/snow_02_arm_1k.png',
  });

  texture.map.repeat.set(20, 20);
  texture.map.wrapS = RepeatWrapping;
  texture.map.wrapT = RepeatWrapping;

  return (
    <RigidBody type="fixed">
      <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial {...texture} side={DoubleSide} />
      </mesh>

      <CuboidCollider args={[50, 0.1, 50]} />
    </RigidBody>
  );
};

export default Ground;
