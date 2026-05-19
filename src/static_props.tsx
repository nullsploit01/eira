import Fence from './fence';
import { useLevaControls } from './hooks/useLevaControls';
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

      {Array.from({ length: 19 }).map((_, index) => (
        <Fence key={index} rotation={[0, -0.3, 0]} position={[-18, 0, 17 - index * 2]} />
      ))}

      {Array.from({ length: 19 }).map((_, index) => (
        <Fence key={index} rotation={[0, -1.9, 0]} position={[-17 + index * 2, 0, 18.5]} />
      ))}

      {Array.from({ length: 19 }).map((_, index) => (
        <Fence key={index} rotation={[0, 1.2, 0]} position={[-19 + index * 2, 0, -18.5]} />
      ))}

      {Array.from({ length: 19 }).map((_, index) => (
        <Fence key={index} rotation={[0, 2.8, 0]} position={[19, 0, -17 + index * 2]} />
      ))}

      {/* <Fence rotation={[0, 2.8, 0]} position={[19, 0, -17]} />
      <Fence rotation={[0, 2.8, 0]} position={[19, 0, -15]} />
      <Fence rotation={[0, 2.8, 0]} position={[19, 0, -13]} /> */}

      {/* <Fence rotation={[0, 1.2, 0]} position={[-19, 0, -18.5]} />
      <Fence rotation={[0, 1.2, 0]} position={[-17, 0, -18.5]} />
      <Fence rotation={[0, 1.2, 0]} position={[-15, 0, -18.5]} /> */}

      {/* <Fence rotation={[0, -1.9, 0]} position={[-18, 0, 18.5]} />
      <Fence rotation={[0, -1.9, 0]} position={[-16, 0, 18.5]} />
      <Fence rotation={[0, -1.9, 0]} position={[-14, 0, 18.5]} /> */}

      {/* <Fence rotation={[0, -0.3, 0]} position={[-18, 0, 17]} />
      <Fence rotation={[0, -0.3, 0]} position={[-18, 0, 15]} />
      <Fence rotation={[0, -0.3, 0]} position={[-18, 0, 13]} />
      <Fence rotation={[0, -0.3, 0]} position={[-18, 0, 11]} /> */}
    </>
  );
};

export default StaticProps;
