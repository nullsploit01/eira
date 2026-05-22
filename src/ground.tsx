import { playerAnimations } from './constants/animations';
import { useIsMobile } from './hooks/useIsMobile';
import { useExperienceStore } from './stores/experience_store';
import { useTexture } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { useGame } from 'ecctrl';
import { useRef } from 'react';
import { DoubleSide, RepeatWrapping } from 'three';

const Ground = () => {
  const isMobile = useIsMobile();
  const texture = useTexture({
    map: '/textures/snow/snow_02_diff_1k.png',
    normalMap: '/textures/snow/snow_02_nor_gl_1k.png',
    roughnessMap: '/textures/snow/snow_02_arm_1k.png',
  });

  texture.map.rotation = Math.PI * 0.15;
  texture.map.center.set(0.5, 0.5);
  texture.map.wrapS = RepeatWrapping;
  texture.map.wrapT = RepeatWrapping;

  const date = useRef(0);
  const setMoveToPoint = useGame((state) => state.setMoveToPoint);
  const setCurrentPlayerAnimation = useExperienceStore((state) => state.setPlayerAnimation);
  const canMovePlayer = useExperienceStore((state) => state.canMovePlayer);
  return (
    <RigidBody type="fixed">
      <mesh
        onPointerDown={() => {
          date.current = Date.now();
        }}
        onPointerUp={({ point }) => {
          const wasClick = Date.now() - date.current < 200;
          if (!wasClick || !isMobile || !canMovePlayer) {
            return;
          }

          setMoveToPoint({
            x: point.x,
            y: 0,
            z: point.z,
          } as never);
          setCurrentPlayerAnimation(playerAnimations.walk);
        }}
        receiveShadow
        rotation={[-Math.PI * 0.5, 0, 0]}
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial {...texture} side={DoubleSide} />
      </mesh>

      <CuboidCollider args={[20, 0.1, 20]} />
    </RigidBody>
  );
};

export default Ground;
