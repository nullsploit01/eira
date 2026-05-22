import Fence from './fence';
import { useIsMobile } from './hooks/useIsMobile';
import { useLevaControls } from './hooks/useLevaControls';
import { useExperienceStore } from './stores/experience_store';
import Tree from './tree';
import { Html } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';

const StaticProps = () => {
  const controls = useLevaControls('StaticProps', {
    fogColor: '#202530',
    enableFog: true,
  });

  const isMobile = useIsMobile();
  const hasStarted = useExperienceStore((state) => state.hasStarted);
  const randomScale = useMemo(() => 0.01 + Math.random() * 0.012, []);

  const [showMobileHint, setShowMobileHint] = useState(false);

  useEffect(() => {
    if (!isMobile || !hasStarted) {
      return;
    }

    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setShowMobileHint(true);

    const timeout = setTimeout(() => {
      setShowMobileHint(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isMobile, hasStarted]);

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

      <Html position={[0, 1, 0]}>
        {showMobileHint && (
          <div
            style={{
              position: 'fixed',
              bottom: '38px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px 16px',
              borderRadius: '999px',
              background: 'rgba(180,220,255,0.08)',
              border: '1px solid rgba(220,235,255,0.12)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: 'rgba(240,248,255,0.92)',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              textShadow: '0 1px 4px rgba(0,0,0,0.35)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
              pointerEvents: 'none',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              zIndex: 1000,
              opacity: 0.9,
            }}
          >
            Tap the snow to wander ❄️
          </div>
        )}
      </Html>
    </>
  );
};

export default StaticProps;
