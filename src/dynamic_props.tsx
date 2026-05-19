import Ghost from './ghost';
import { Sparkles } from '@react-three/drei';

const DynamicProps = () => {
  return (
    <>
      <Ghost position={[-2, 1, 5]} scale={0.2} />
      <Ghost position={[10, 1, 13]} scale={0.2} />
      <Ghost position={[-4.5, 1, 16]} scale={0.2} />
      <Ghost position={[-11, 1, -15]} scale={0.2} />
      <Ghost position={[-2, 1, -8]} scale={0.2} />

      <Sparkles
        position={[0, 2, 0]}
        count={200}
        scale={[40, 10, 40]}
        size={2}
        speed={0.2}
        opacity={0.5}
        color="#ffffff"
      />
    </>
  );
};

export default DynamicProps;
