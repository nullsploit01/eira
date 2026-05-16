import { useLevaControls } from './hooks/useLevaControls';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const CameraController = () => {
  const { camera } = useThree();

  const controls = useLevaControls('Camera', {
    cameraPosition: [3.28, 2, 5.3] as [number, number, number],
  });

  useEffect(() => {
    camera.position.set(...controls.cameraPosition);
  }, [camera, controls.cameraPosition]);

  return null;
};

export default CameraController;
