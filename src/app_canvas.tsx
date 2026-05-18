import Experience from './experience';
import { useLevaControls } from './hooks/useLevaControls';
import KeyboardControlMapping from './keyboard_controls';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Perf } from 'r3f-perf';

const AppCanvas = () => {
  const generalControls = useLevaControls('General', {
    color: '#212122',
    debugPhysics: false,
    ambientLight: true,
    ambientLightColor: '#88aaff',
    ambientLightIntensity: 0.22,
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
        <Perf position="top-left" />
        <Physics debug={generalControls.debugPhysics}>
          {generalControls.ambientLight && (
            <ambientLight intensity={generalControls.ambientLightIntensity} />
          )}
          <color args={[generalControls.color]} attach={'background'} />
          <Experience />
          <OrbitControls />
        </Physics>
      </Canvas>
    </KeyboardControlMapping>
  );
};

export default AppCanvas;
