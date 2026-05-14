import Experience from './experience';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

const AppCanvas = () => {
  return (
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
        <color args={['#212122']} attach={'background'} />
        <Experience />
        <OrbitControls />
      </Physics>
    </Canvas>
  );
};

export default AppCanvas;
