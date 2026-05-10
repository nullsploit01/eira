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
        position: [2.5, 4, 6],
      }}
    >
      <ambientLight intensity={2} />
      <color args={['black']} attach={'background'} />
      <Experience />
      <OrbitControls />
    </Canvas>
  );
};

export default AppCanvas;
