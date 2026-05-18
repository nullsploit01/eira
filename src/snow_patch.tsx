import { useMemo } from 'react';

type SnowPatchProps = {
  position?: [number, number, number];
  scale?: number;
  count?: number;
};

const SnowPatch = ({ position = [0, 0, 0], scale = 1, count = 8 }: SnowPatchProps) => {
  const patches = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2,
      y: Math.random() * 0.03,
      scale: 0.2 + Math.random() * 0.5,
      rotation: Math.random() * Math.PI,
    }));
  }, [count]);

  return (
    <group position={position} scale={scale}>
      {patches.map((patch) => (
        <mesh
          key={patch.id}
          position={[patch.x, patch.y, patch.z]}
          rotation={[-Math.PI / 2, 0, patch.rotation]}
          receiveShadow
        >
          <circleGeometry args={[patch.scale, 16]} />
          <meshStandardMaterial opacity={0.15} color="#cfd8e6" transparent roughness={1} />
        </mesh>
      ))}
    </group>
  );
};

export default SnowPatch;
