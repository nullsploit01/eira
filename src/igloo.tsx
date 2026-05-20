import { playerAnimations } from './constants/animations';
import { useLevaControls } from './hooks/useLevaControls';
import { useExperienceStore } from './stores/experience_store';
import WoodenSign from './wooden_sign';
import { useGLTF, useHelper } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useEffect, useRef } from 'react';
import { Mesh, type PointLight, PointLightHelper } from 'three';

const Igloo = () => {
  const igloo = useGLTF('./models/igloo/igloo.glb');
  const lantern = useGLTF('./models/lantern/lantern.glb');
  const lightRef = useRef<PointLight>({} as PointLight);
  const setCurrentPlayerAnimation = useExperienceStore((state) => state.setPlayerAnimation);

  useEffect(() => {
    igloo.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    lantern.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
  }, []);

  const controls = useLevaControls('Igloo', {
    position: {
      value: [-5, -0.2, 13] as [number, number, number],
      step: 0.1,
    },
    rotation: {
      value: [0, 1.7, 0] as [number, number, number],
      step: 0.1,
    },
    scale: {
      value: 2.2,
      step: 0.1,
    },
    lightPosition: {
      value: [1.6, 1.8, 3.7] as [number, number, number],
      step: 0.1,
    },
    lightColor: '#ffd580',
    showLightHelper: false,
  });

  useHelper(controls.showLightHelper ? lightRef : null, PointLightHelper, 0.1, 'hotpink');
  const handleSignClick = () => {
    setCurrentPlayerAnimation(playerAnimations.sit1);
  };
  return (
    <>
      <group rotation={controls.rotation} position={controls.position}>
        <RigidBody type="fixed">
          <mesh scale={controls.scale}>
            <primitive object={igloo.scene} />
          </mesh>
        </RigidBody>
        <mesh rotation={[0, 3, 0]} position={[1.8, 0, 4]}>
          <primitive object={lantern.scene} />
        </mesh>

        <pointLight
          ref={lightRef}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          position={controls.lightPosition}
          intensity={8}
          distance={15}
          decay={2}
          color={controls.lightColor}
        />
        <WoodenSign
          onClick={handleSignClick}
          title="About Me"
          message="Just a guy who loves to code."
          scale={0.5}
          position={[-2.2, 0.5, 2.3]}
          rotation={[0, 0.6, 0]}
        />
      </group>
    </>
  );
};

export default Igloo;
