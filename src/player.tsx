import { playerAnimations } from './constants/animations';
import { useLevaControls } from './hooks/useLevaControls';
import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Player = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [playerAnimation, setPlayerAnimation] = useState<string>(playerAnimations.sleep);

  const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothCameraTarget] = useState(() => new THREE.Vector3());

  const targetRotation = useRef(0);
  const currentRotationY = useRef(0);
  const isTransitioning = useRef(false);
  const transitionProgress = useRef(0);
  const currentLookAt = useRef(new THREE.Vector3());
  useEffect(() => {
    const unsubscribe = subscribeKeys(
      (state) => state.forward || state.backward || state.leftward || state.rightward,
      (pressed) => {
        setPlayerAnimation(pressed ? playerAnimations.walk : playerAnimations.idle);
      },
    );

    return unsubscribe;
  }, [subscribeKeys]);

  //   const { rapier, world } = useRapier();
  const body = useRef<RapierRigidBody>({} as RapierRigidBody);

  const penguin = useGLTF('./models/penguin/scene.gltf');
  const penguinAnimations = useAnimations(penguin.animations, penguin.scene);

  const playerControls = useLevaControls('Player', {
    position: {
      value: [0, 1, 2.3],
      step: 0.1,
    },

    animationName: {
      options: penguinAnimations.names,
      value: playerAnimation,
    },

    cameraFollowsPlayer: false,
  });

  useEffect(() => {
    const action = penguinAnimations.actions[playerAnimation];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [playerAnimation]);

  useEffect(() => {
    penguin.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }, []);

  useEffect(() => {
    if (!playerControls.cameraFollowsPlayer) {
      return;
    }

    isTransitioning.current = true;
    transitionProgress.current = 0;

    const action = penguinAnimations.actions[playerAnimations.shake];
    if (!action) {
      return;
    }

    action.clampWhenFinished = true;
    action.reset().fadeIn(0.5);
    action.setLoop(THREE.LoopRepeat, 3);
    action.play();
  }, [playerControls.cameraFollowsPlayer]);

  useEffect(() => {
    const action = penguinAnimations.actions[playerControls.animationName];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [playerControls.animationName]);

  useFrame((state, delta) => {
    const bodyPosition = body.current.translation();
    const cameraPosition = new THREE.Vector3();
    const cameraOffset = new THREE.Vector3(0, 0.85, -4.25);
    const bodyRotation = body.current.rotation();
    const quaternion = new THREE.Quaternion(
      bodyRotation.x,
      bodyRotation.y,
      bodyRotation.z,
      bodyRotation.w,
    );

    cameraOffset.applyQuaternion(quaternion);
    cameraPosition.copy(bodyPosition).add(cameraOffset);

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);

    cameraTarget.y += 0.25;
    smoothCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothCameraTarget.lerp(cameraTarget, 5 * delta);

    if (playerControls.cameraFollowsPlayer) {
      if (isTransitioning.current) {
        const transitionSpeed = 2.5;

        const direction = new THREE.Vector3().subVectors(
          smoothCameraPosition,
          state.camera.position,
        );

        const distance = direction.length();

        if (distance > 0.1) {
          direction.normalize();

          state.camera.position.add(direction.multiplyScalar(transitionSpeed * delta));
        } else {
          state.camera.position.copy(smoothCameraPosition);
          currentLookAt.current.copy(smoothCameraTarget);
          isTransitioning.current = false;
        }

        currentLookAt.current.lerpVectors(currentLookAt.current, smoothCameraTarget, 2 * delta);

        state.camera.lookAt(currentLookAt.current);
      } else {
        state.camera.position.lerp(smoothCameraPosition, 5 * delta);
        state.camera.lookAt(smoothCameraTarget);
      }
    }

    const keys = getKeys();
    const impulseStrength = 5 * delta;

    const direction = new THREE.Vector3(
      Number(keys.leftward) - Number(keys.rightward),
      0,
      Number(keys.forward) - Number(keys.backward),
    );

    if (direction.lengthSq() > 0) {
      direction.normalize().multiplyScalar(impulseStrength);
    }

    if (direction.length() > 0) {
      // camera direction
      const cameraDirection = new THREE.Vector3();
      state.camera.getWorldDirection(cameraDirection);
      const cameraAngle = Math.atan2(cameraDirection.x, cameraDirection.z);
      direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraAngle);

      body.current.applyImpulse(
        {
          x: direction.x,
          y: 0,
          z: direction.z,
        },
        true,
      );

      // rotate player
      const angle = Math.atan2(direction.x, direction.z);
      targetRotation.current = angle;

      let angleDiff = targetRotation.current - currentRotationY.current;

      while (angleDiff > Math.PI) {
        angleDiff -= Math.PI * 2;
      }

      while (angleDiff < -Math.PI) {
        angleDiff += Math.PI * 2;
      }

      currentRotationY.current += angleDiff * 4 * delta;

      const quaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, currentRotationY.current, 0),
      );

      body.current.setRotation(quaternion, true);
    }
  });

  return (
    <>
      <RigidBody
        linearDamping={0.5}
        angularDamping={0.5}
        ref={body}
        restitution={0.2}
        friction={1}
        canSleep={true}
        position={playerControls.position as [number, number, number]}
        enabledRotations={[false, false, false]}
      >
        <mesh castShadow scale={2}>
          <primitive object={penguin.scene} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Player;
