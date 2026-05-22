import { useLevaControls } from './hooks/useLevaControls';
import { useExperienceStore } from './stores/experience_store';
import { Html, useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import type { Group } from 'three';

const WisdomBear = () => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const model = useGLTF('./models/polar_bear/polar_bear.glb');
  const animations = useAnimations(model.animations, model.scene);
  const setCanMovePlayer = useExperienceStore((state) => state.setCanMovePlayer);

  const ref = useRef<Group>(null);
  const controls = useLevaControls('WisdomBear', {
    scale: 70,
    position: {
      value: [14.2, 0, 1.4] as [number, number, number],
      step: 0.1,
    },
    rotation: {
      value: [0, 4.3, 0] as [number, number, number],
      step: 0.1,
    },
    animation: {
      value: animations.names[0],
      options: animations.names,
    },
  });

  useEffect(() => {
    const action = animations.actions[controls.animation];
    action?.reset().fadeIn(0.5).play();
    return () => {
      action?.fadeOut(0.5);
    };
  }, [controls.animation]);

  return (
    <>
      <group ref={ref} position={controls.position} rotation={controls.rotation}>
        {!active && (
          <Html position={[-3, 1.5, 1]} center>
            <div
              onClick={() => {
                setActive(true);
                // setCanMovePlayer(false);
              }}
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => setHovered(false)}
              style={{
                position: 'relative',
                padding: '10px 18px',
                borderRadius: '14px',
                background: `
                    linear-gradient(
                    180deg,
                    rgba(16, 22, 34, 0.72),
                    rgba(10, 14, 22, 0.82)
                    )
                `,
                border: hovered
                  ? '1px solid rgba(220,240,255,0.18)'
                  : '1px solid rgba(180,220,255,0.08)',
                backdropFilter: 'blur(10px)',
                color: '#dce7f5',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                transform: hovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0px) scale(1)',
                boxShadow: hovered
                  ? `
                    0 0 30px rgba(180,220,255,0.18),
                    0 0 12px rgba(180,220,255,0.12),
                    0 6px 30px rgba(0,0,0,0.45)
                    `
                  : `
                0 0 18px rgba(180,220,255,0.08),
                0 6px 30px rgba(0,0,0,0.45)
                `,
                userSelect: 'none',
                overflow: 'hidden',
                transition: 'all 0.25s ease',
                animation: 'frostFloat 4s ease-in-out infinite',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    radial-gradient(
                      circle at top left,
                      rgba(180,220,255,0.06),
                      transparent 40%
                    )
                  `,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: hovered ? 'rgba(240,250,255,1)' : 'rgba(220,240,255,0.95)',
                    boxShadow: hovered
                      ? '0 0 16px rgba(220,240,255,1)'
                      : '0 0 10px rgba(200,230,255,0.8)',
                  }}
                />
                <span>Seek Wisdom</span>
              </div>
            </div>
          </Html>
        )}
        {active && (
          <Html position={[0, 1.25, 0]} center>
            <div
              style={{
                width: '400px',
                padding: '26px',
                borderRadius: '24px',
                background: `
                  linear-gradient(
                    180deg,
                    rgba(16,22,34,0.84),
                    rgba(7,10,18,0.94)
                  )
                `,
                border: '1px solid rgba(180,220,255,0.06)',
                backdropFilter: 'blur(16px)',
                boxShadow: `
                  0 0 40px rgba(120,180,255,0.04),
                  0 12px 60px rgba(0,0,0,0.55)
                `,
                color: '#dce7f5',
                position: 'relative',
                overflow: 'hidden',
                animation: 'frostFloat 4s ease-in-out infinite',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    radial-gradient(
                      circle at top left,
                      rgba(180,220,255,0.08),
                      transparent 42%
                    )
                  `,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-40px',
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  background: 'rgba(180,220,255,0.03)',
                  filter: 'blur(40px)',
                }}
              />

              <div
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: 'rgba(200,220,255,0.42)',
                  marginBottom: '18px',
                }}
              >
                ❄ Frozen Whispers
              </div>

              <div
                style={{
                  fontSize: '46px',
                  fontWeight: 700,
                  lineHeight: 0.94,
                  color: '#f4f8ff',
                  marginBottom: '18px',
                  letterSpacing: '-0.04em',
                  textShadow: '0 0 14px rgba(180,220,255,0.08)',
                }}
              >
                Welcome,
                <br />
                traveler
              </div>

              {/* divider */}
              <div
                style={{
                  width: '110px',
                  height: '1px',
                  background: 'linear-gradient(to right, rgba(200,230,255,0.65), transparent)',
                  marginBottom: '20px',
                }}
              />

              <div
                style={{
                  fontSize: '15px',
                  lineHeight: 1.9,
                  color: 'rgba(225,235,248,0.76)',
                  marginBottom: '24px',
                }}
              >
                The village is quiet tonight.
                <br />
                Ghosts dance when bothered. Campfires whisper strange wisdom. Igloos occasionally
                hide wandering quests. Snowmen wave at travelers they vaguely trust.
              </div>

              {/* whisper notes */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginBottom: '22px',
                }}
              >
                {[
                  'Things react when touched.',
                  'Not every visitor truly left.',
                  'The bear remembers more than it says.',
                ].map((text, index) => (
                  <div
                    key={text}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: 'rgba(205,220,240,0.52)',
                      padding: '6px 0',
                      borderBottom: index !== 2 ? '1px solid rgba(255,255,255,0.035)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: '3px',
                        height: '3px',
                        borderRadius: '999px',
                        background: 'rgba(200,230,255,0.45)',
                        boxShadow: '0 0 8px rgba(180,220,255,0.18)',
                      }}
                    />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <button
                  onClick={() => {
                    setActive(false);
                    setCanMovePlayer(true);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(190,220,255,0.72)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    letterSpacing: '0.03em',
                    padding: 0,
                    transition: '0.2s ease',
                    opacity: 0.9,
                  }}
                >
                  Continue Wandering →
                </button>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  <button
                    onClick={() => {
                      window.location.hash = '#debug';
                      window.location.reload();
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'rgba(190,220,255,0.34)',
                      cursor: 'pointer',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      padding: 0,
                    }}
                  >
                    Debug
                  </button>

                  <a
                    href="https://github.com/nullsploit01/portfolio"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: 'rgba(190,220,255,0.5)',
                      textDecoration: 'bold',
                      fontSize: '11px',
                    }}
                  >
                    Credits
                  </a>
                </div>
              </div>
            </div>
          </Html>
        )}
        <mesh scale={controls.scale}>
          <primitive object={model.scene} />
        </mesh>
      </group>
    </>
  );
};

export default WisdomBear;
