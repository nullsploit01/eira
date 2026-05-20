import { useExperienceStore } from './stores/experience_store';
import { Clone, Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type WoodenSignProps = {
  title: string;
  message: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onClick?: () => void;
};

const WoodenSign = ({
  title,
  message,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.5,
  onClick = () => {},
}: WoodenSignProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const signRef = useRef<THREE.Group>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const setCanMovePlayer = useExperienceStore((state) => state.setCanMovePlayer);

  const woodenSign = useGLTF('./models/wooden_sign/wooden_sign.glb');

  useEffect(() => {
    woodenSign.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = child.material.clone();
      }
    });
  }, []);

  useFrame((state, delta) => {
    if (!glowLightRef.current) {
      return;
    }

    const targetIntensity = active || hovered ? 2 : 0;

    glowLightRef.current.intensity = THREE.MathUtils.lerp(
      glowLightRef.current.intensity,
      targetIntensity,
      4 * delta,
    );

    glowLightRef.current.intensity += Math.sin(state.clock.elapsedTime * 5) * 0.03;

    woodenSign.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshStandardMaterial;
        const emissiveIntensity = active || hovered ? 0.25 : 0;
        material.emissive = new THREE.Color('#ffcc88');
        material.emissiveIntensity = THREE.MathUtils.lerp(
          material.emissiveIntensity,
          emissiveIntensity,
          4 * delta,
        );
      }
    });
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <RigidBody type="fixed">
        <Clone
          ref={signRef}
          object={woodenSign.scene}
          onClick={() => {
            onClick();
            setCanMovePlayer(false);
            setActive(true);
          }}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        />
      </RigidBody>
      <pointLight
        ref={glowLightRef}
        position={[0, 1, 0.3]}
        color="#ffb86b"
        distance={4}
        decay={2}
        intensity={0}
      />

      {!active && (
        <Html occlude position={[0, 1.15, 0]} center>
          <div
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
              border: '1px solid rgba(180,220,255,0.08)',
              backdropFilter: 'blur(10px)',
              color: '#dce7f5',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              transform: hovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0px) scale(1)',
              opacity: hovered ? 1 : 0.82,
              transition: 'all 0.25s ease',
              boxShadow: hovered
                ? `
                0 0 18px rgba(180,220,255,0.08),
                0 6px 30px rgba(0,0,0,0.45)
              `
                : `
                0 4px 20px rgba(0,0,0,0.35)
              `,
              userSelect: 'none',
              pointerEvents: 'none',
              overflow: 'hidden',
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
                  background: hovered ? 'rgba(220,240,255,0.95)' : 'rgba(180,220,255,0.55)',
                  boxShadow: hovered
                    ? '0 0 10px rgba(200,230,255,0.8)'
                    : '0 0 6px rgba(180,220,255,0.25)',
                }}
              />

              <span
                style={{
                  color: '#dce7f5',
                }}
              >
                {title}
              </span>
            </div>
          </div>
        </Html>
      )}

      {active && (
        <Html position={[0, 2.3, 0]} center>
          <div
            style={{
              width: '320px',
              padding: '24px',
              borderRadius: '18px',
              background: `
                linear-gradient(
                  180deg,
                  rgba(18, 26, 40, 0.82),
                  rgba(8, 12, 20, 0.9)
                )
              `,

              border: '1px solid rgba(180, 220, 255, 0.08)',
              backdropFilter: 'blur(14px)',
              boxShadow: `
                0 0 40px rgba(120,180,255,0.04),
                0 10px 60px rgba(0,0,0,0.55)
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
                    transparent 40%
                  )
                `,
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'rgba(180,220,255,0.03)',
                filter: 'blur(30px)',
              }}
            />

            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'rgba(200,220,255,0.45)',
                marginBottom: '20px',
              }}
            >
              ❄ FROZEN WHISPERS
            </div>

            <div
              style={{
                fontSize: '30px',
                fontWeight: 600,
                marginBottom: '14px',
                color: '#eef5ff',
                lineHeight: 1.1,
                textShadow: '0 0 12px rgba(180,220,255,0.08)',
              }}
            >
              {title}
            </div>

            <div
              style={{
                width: '90px',
                height: '1px',
                background: 'linear-gradient(to right, rgba(200,230,255,0.6), transparent)',
                marginBottom: '18px',
              }}
            />

            <div
              style={{
                fontSize: '15px',
                lineHeight: 1.9,
                color: 'rgba(220,230,245,0.82)',
                fontStyle: 'italic',
              }}
            >
              "{message}"
            </div>

            <button
              onClick={() => {
                setCanMovePlayer(true);
                setActive(false);
              }}
              style={{
                marginTop: '24px',
                background: 'transparent',
                border: 'none',
                color: 'rgba(190,220,255,0.68)',
                cursor: 'pointer',
                fontSize: '13px',
                letterSpacing: '0.04em',
                padding: 0,
                transition: '0.2s ease',
                opacity: 0.8,
              }}
            >
              continue wandering →
            </button>
          </div>
        </Html>
      )}
    </group>
  );
};

export default WoodenSign;
