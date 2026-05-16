import { useFrame } from '@react-three/fiber';
import type { RefObject } from 'react';
import { Group } from 'three';

export const useSnowmanLookAtCamera = (ref: RefObject<Group | null>) => {
  useFrame((state, delta) => {
    if (!ref.current) {
      return;
    }

    const snowmanPosition = ref.current.position;

    const cameraPosition = state.camera.position;

    const angle = Math.atan2(
      cameraPosition.x - snowmanPosition.x,
      cameraPosition.z - snowmanPosition.z,
    );

    ref.current.rotation.y += (angle - ref.current.rotation.y) * 2 * delta * Math.PI;
  });
};
