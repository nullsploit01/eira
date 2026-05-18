import { useLevaControls } from './hooks/useLevaControls';
import SnowPatch from './snow_patch';
import Tree from './tree';
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
      {controls.enableFog && <fog attach="fog" args={[controls.fogColor, 10, 45]} />}

      <SnowPatch position={[2, 0.01, -1]} scale={0.5} />
      <SnowPatch position={[3, 0.01, 3]} scale={1.5} />
      <SnowPatch position={[12, 0.01, 3]} scale={1.5} />
      <SnowPatch position={[5, 0.01, 1]} scale={1.5} />
      <SnowPatch position={[3, 0.01, 12]} scale={2.5} />
      <SnowPatch position={[12, 0.01, 7]} scale={1} />
      <SnowPatch position={[-5, 0.01, 7]} scale={1} />
      <SnowPatch position={[-12, 0.01, 7]} scale={1} />
    </>
  );
};

export default StaticProps;
