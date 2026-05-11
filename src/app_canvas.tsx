import Experience from './experience';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

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
      <ambientLight intensity={2} />
      <color args={['amber']} attach={'background'} />
      <Experience />
      <OrbitControls />
    </Canvas>
  );
};

export default AppCanvas;
