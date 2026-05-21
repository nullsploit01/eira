import { Clone, useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useEffect } from 'react';
import * as THREE from 'three';

type TreeProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

const Tree = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 0.5 }: TreeProps) => {
  const model = useGLTF('./models/pine_tree/pine_tree.glb');

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }, []);

  return (
    <RigidBody type="fixed" colliders={false} position={position} rotation={rotation}>
      <mesh scale={scale}>
        <Clone object={model.scene} />
      </mesh>
      <CuboidCollider args={[0.2, 0.6, 0.2]} position={[0, 0.6, 0]} />
    </RigidBody>
  );
};

export default Tree;
