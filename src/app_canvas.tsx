import Experience from './experience';
import { useLevaControls } from './hooks/useLevaControls';
import KeyboardControlMapping from './keyboard_controls';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

const AppCanvas = () => {
  const generalControls = useLevaControls('General', {
    color: '#212122',
  });

  return (
    <KeyboardControlMapping>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-3, 2, 5],
        }}
      >
        <Physics debug>
          <ambientLight intensity={2} />
          <color args={[generalControls.color]} attach={'background'} />
          <Experience />
          <OrbitControls />
        </Physics>
      </Canvas>
    </KeyboardControlMapping>
  );
};

export default AppCanvas;
