import Experience from './experience';
import { useLevaControls } from './hooks/useLevaControls';
import KeyboardControlMapping from './keyboard_controls';
import Loader from './loader';
import PostProcessing from './post_processing';
import { OrbitControls, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Leva } from 'leva';
import { Perf } from 'r3f-perf';

const AppCanvas = () => {
  const { active } = useProgress();

  const hasDebug = window.location.hash.includes('#debug');
  const generalControls = useLevaControls('General', {
    color: '#212122',
    debugPhysics: false,
    ambientLight: true,
    ambientLightColor: '#88aaff',
    ambientLightIntensity: 0.22,
    directionalLight: true,
    directionalLightIntensity: 0.15,
    directionalLightColor: '#749ceb',
  });

  return (
    <KeyboardControlMapping>
      <Canvas
        shadows
        camera={{
          fov: 55,
          near: 0.1,
          far: 45,
        }}
      >
        <PostProcessing />
        {hasDebug && <Perf position="top-left" />}
        <Physics debug={generalControls.debugPhysics}>
          {generalControls.ambientLight && (
            <ambientLight
              shadow-normalBias={0.02}
              intensity={generalControls.ambientLightIntensity}
            />
          )}
          {generalControls.directionalLight && (
            <directionalLight
              shadow-normalBias={0.02}
              intensity={generalControls.directionalLightIntensity}
              color={generalControls.directionalLightColor}
            />
          )}
          <color args={[generalControls.color]} attach={'background'} />
          {active ? <Loader /> : <Experience />}
          <OrbitControls enableZoom={hasDebug} enablePan={hasDebug} enableRotate={hasDebug} />
        </Physics>
      </Canvas>
      <Leva flat hidden={!hasDebug} />
    </KeyboardControlMapping>
  );
};

export default AppCanvas;
