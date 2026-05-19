import { Clone, useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

type FenceProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

const Fence = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 0.5 }: FenceProps) => {
  const model = useGLTF('./models/fence/fence.glb');
  return (
    <>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        position={position}
        rotation={rotation}
        scale={scale}
      >
        <Clone object={model.scene} />
      </RigidBody>
    </>
  );
};

export default Fence;
