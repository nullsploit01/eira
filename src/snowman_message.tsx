import { useExperienceStore } from './stores/experience_store';
import { Html, useCursor } from '@react-three/drei';
import { useState } from 'react';

const SnowmanMessage = () => {
  const [hovered, setHovered] = useState(false);

  const startGame = useExperienceStore((state) => state.startGame);
  const hasStarted = useExperienceStore((state) => state.hasStarted);

  useCursor(hovered);

  return (
    <Html position={[0, 6, 0]} center distanceFactor={6}>
      <div
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => startGame()}
        style={{
          position: 'relative',
          padding: '6px 12px',
          background: hovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.18)',
          transform: hovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0px) scale(1)',
          boxShadow: hovered ? '0 0 20px rgba(255,255,255,0.2)' : '0 4px 10px rgba(0,0,0,0.12)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(6px)',
          borderRadius: '12px',
          color: 'white',
          fontSize: '11px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 4px rgba(0,0,0,0.45)',
          transition: 'all 0.2s ease',
        }}
      >
        {!hasStarted ? 'Lost in the snow?' : 'Have Fun!'}
        <div
          style={{
            position: 'absolute',
            bottom: '-4px',
            left: '18px',
            width: '8px',
            height: '8px',
            background: 'rgba(255,255,255,0.18)',
            borderRight: '1px solid rgba(255,255,255,0.12)',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
    </Html>
  );
};

export default SnowmanMessage;
