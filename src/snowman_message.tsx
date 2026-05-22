import { useExperienceStore } from './stores/experience_store';
import { Html, useCursor } from '@react-three/drei';
import { useState } from 'react';

const SnowmanMessage = () => {
  const [hovered, setHovered] = useState(false);

  const startGame = useExperienceStore((state) => state.startGame);
  const hasStarted = useExperienceStore((state) => state.hasStarted);

  useCursor(hovered);

  return (
    <Html position={[0, 6, 0]} center distanceFactor={4}>
      <div
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => startGame()}
        style={{
          position: 'relative',

          padding: '10px 24px',

          borderRadius: '999px',

          background: hovered
            ? `
              linear-gradient(
                180deg,
                rgba(210,230,255,0.16),
                rgba(120,150,180,0.08)
              )
            `
            : `
              linear-gradient(
                180deg,
                rgba(220,235,255,0.1),
                rgba(120,150,180,0.05)
              )
            `,
          border: '1px solid rgba(220,235,255,0.14)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: hovered
            ? `
              0 0 18px rgba(180,220,255,0.08),
              0 8px 24px rgba(0,0,0,0.24)
            `
            : `
              0 4px 16px rgba(0,0,0,0.18)
            `,
          transform: hovered ? 'translateY(-2px)' : 'translateY(0px)',
          transition: 'all 0.22s ease',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            color: 'rgba(245,250,255,0.96)',
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            fontFamily: '"Georgia", serif',
            textShadow: '0 1px 6px rgba(0,0,0,0.35)',
            whiteSpace: 'nowrap',
          }}
        >
          {!hasStarted ? 'Begin Journey' : 'Have Fun ❄️'}
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '-5px',
            width: '10px',
            height: '10px',
            transform: 'translateX(-50%) rotate(45deg)',
            background: 'rgba(200,225,255,0.08)',
            borderRight: '1px solid rgba(220,235,255,0.1)',
            borderBottom: '1px solid rgba(220,235,255,0.1)',
          }}
        />
      </div>
    </Html>
  );
};

export default SnowmanMessage;
