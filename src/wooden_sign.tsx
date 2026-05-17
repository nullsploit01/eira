import { Html, useCursor, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type WoodenSignProps = {
  title: string;
  message: string;

  position?: [number, number, number];

  rotation?: [number, number, number];

  scale?: number;
};

const WoodenSign = ({
  title,
  message,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.5,
}: WoodenSignProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const signRef = useRef<THREE.Object3D>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useCursor(hovered, 'pointer');

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
      <primitive
        ref={signRef}
        object={woodenSign.scene}
        onClick={() => setActive(!active)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      />

      <pointLight
        ref={glowLightRef}
        position={[0, 1, 0.3]}
        color="#ffb86b"
        distance={4}
        decay={2}
        intensity={0}
      />

      {!active && (
        <Html position={[0, 1.2, 0]} center distanceFactor={12}>
          <div
            style={{
              padding: '4px 10px',
              borderRadius: '999px',
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'white',
              fontSize: '11px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(6px)',
              opacity: hovered ? 1 : 0.75,
              transform: hovered ? 'translateY(-2px)' : 'translateY(0px)',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            📍 {title}
          </div>
        </Html>
      )}

      {active && (
        <Html position={[0, 1.8, 0]} center distanceFactor={5}>
          <div
            style={{
              minWidth: '200px',
              padding: '14px',
              borderRadius: '16px',
              background: 'rgba(20,20,20,0.72)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'white',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
              animation: 'fadeIn 0.25s ease',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                marginBottom: '10px',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '13px',
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              {message}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

export default WoodenSign;
