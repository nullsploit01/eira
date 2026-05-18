import { useTexture } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { DoubleSide, RepeatWrapping } from 'three';

const Ground = () => {
  const texture = useTexture({
    map: '/textures/snow/snow_02_diff_1k.png',
    normalMap: '/textures/snow/snow_02_nor_gl_1k.png',
    roughnessMap: '/textures/snow/snow_02_arm_1k.png',
  });

  texture.map.rotation = Math.PI * 0.15;
  texture.map.center.set(0.5, 0.5);
  texture.map.wrapS = RepeatWrapping;
  texture.map.wrapT = RepeatWrapping;

  return (
    <RigidBody type="fixed">
      <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial {...texture} side={DoubleSide} />
      </mesh>

      <CuboidCollider args={[20, 0.1, 20]} />
    </RigidBody>
  );
};

export default Ground;
