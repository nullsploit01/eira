import { useLevaControls } from './hooks/useLevaControls';
import Tree from './tree';
import { Sparkles } from '@react-three/drei';
import { useMemo } from 'react';

const StaticProps = () => {
  const controls = useLevaControls('StaticProps', {
    fogColor: '#202530',
    enableFog: true,
  });

  const randomScale = useMemo(() => 0.01 + Math.random() * 0.012, []);
  return (
    <>
      <Tree scale={randomScale} position={[6, 0, 2]} />
      <Tree scale={randomScale} position={[-6, 0, 5]} />
      <Tree scale={randomScale} position={[-6, 0, 7]} />
      <Tree scale={randomScale} position={[-12, 0, 5]} />
      <Tree scale={randomScale} position={[-8, 0, 11]} />
      <Tree scale={randomScale} position={[7.5, 0, -1]} />
      <Tree scale={randomScale} position={[1, 0, -4]} />
      <Tree scale={randomScale} position={[-6, 0, -1.5]} />
      <Tree scale={randomScale} position={[4, 0, 13]} />
      <Tree scale={randomScale} position={[12, 0, 11]} />
      <Tree scale={randomScale} position={[17, 0, -11]} />
      <Tree scale={randomScale} position={[12, 0, -8]} />
      <Tree scale={randomScale} position={[12, 0, -8]} />
      <Tree scale={randomScale} position={[8, 0, -8.3]} />
      <Tree scale={randomScale} position={[4, 0, -8.7]} />
      <Tree scale={randomScale} position={[0, 0, -9.7]} />
      <Tree scale={randomScale} position={[-4.1, 0, -13]} />
      <Tree scale={randomScale} position={[-8.3, 0, -10.7]} />
      <Tree scale={randomScale} position={[-13.3, 0, -11.7]} />
      <Tree scale={randomScale} position={[-16.3, 0, -7.7]} />
      <Tree scale={randomScale} position={[-16.3, 0, -12.7]} />
      <Tree scale={randomScale} position={[-12.3, 0, -7.7]} />
      {controls.enableFog && <fog attach="fog" args={[controls.fogColor, 10, 45]} />}

      <Sparkles
        position={[0, 2, 0]}
        count={200}
        scale={[40, 10, 40]}
        size={2}
        speed={0.2}
        opacity={0.5}
        color="#ffffff"
      />
    </>
  );
};

export default StaticProps;
