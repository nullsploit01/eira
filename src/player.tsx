import { playerAnimations } from './constants/animations';
import { useLevaControls } from './hooks/useLevaControls';
import { useExperienceStore } from './stores/experience_store';
import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei';
import { type RootState, useFrame } from '@react-three/fiber';
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Player = () => {
  const hasStarted = useExperienceStore((state) => state.hasStarted);
  const currentPlayerAnimation = useExperienceStore((state) => state.playerAnimation);
  const setCurrentPlayerAnimation = useExperienceStore((state) => state.setPlayerAnimation);

  const [subscribeKeys, getKeys] = useKeyboardControls();
  const body = useRef<RapierRigidBody>({} as RapierRigidBody);
  const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
  const [smoothCameraTarget] = useState(() => new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3());
  const isTransitioning = useRef(false);
  const targetRotation = useRef(0);
  const currentRotationY = useRef(0);

  const penguin = useGLTF('./models/penguin/scene.gltf');
  const penguinAnimations = useAnimations(penguin.animations, penguin.scene);
  const playerControls = useLevaControls('Player', {
    position: {
      value: [0, 1, 2.3],
      step: 0.1,
    },

    animationName: {
      options: penguinAnimations.names,
      value: currentPlayerAnimation,
    },

    cameraFollowsPlayer: false,
  });

  useEffect(() => {
    const unsubscribe = subscribeKeys(
      (state) => state.forward || state.backward || state.leftward || state.rightward,
      (pressed) => {
        setCurrentPlayerAnimation(pressed ? playerAnimations.walk : playerAnimations.idle);
      },
    );

    return unsubscribe;
  }, [subscribeKeys]);

  useEffect(() => {
    penguin.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }, []);

  useEffect(() => {
    const action = penguinAnimations.actions[currentPlayerAnimation];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [currentPlayerAnimation]);

  useEffect(() => {
    const action = penguinAnimations.actions[playerControls.animationName];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [playerControls.animationName]);

  useEffect(() => {
    if (!playerControls.cameraFollowsPlayer && !hasStarted) {
      return;
    }

    isTransitioning.current = true;
    const action = penguinAnimations.actions[playerAnimations.shake];
    if (!action) {
      return;
    }

    action.clampWhenFinished = true;
    action.reset().fadeIn(0.5);
    action.setLoop(THREE.LoopRepeat, 3);
    action.play();
  }, [playerControls.cameraFollowsPlayer, hasStarted]);

  const updateCamera = (state: RootState, delta: number) => {
    const bodyPosition = body.current.translation();
    const bodyRotation = body.current.rotation();
    const bodyQuaternion = new THREE.Quaternion(
      bodyRotation.x,
      bodyRotation.y,
      bodyRotation.z,
      bodyRotation.w,
    );

    const cameraOffset = new THREE.Vector3(0, 0.85, -4.25);
    cameraOffset.applyQuaternion(bodyQuaternion);

    const targetCameraPosition = new THREE.Vector3().copy(bodyPosition).add(cameraOffset);
    const targetCameraLookAt = new THREE.Vector3().copy(bodyPosition);

    targetCameraLookAt.y += 0.25;
    smoothCameraPosition.lerp(targetCameraPosition, 5 * delta);
    smoothCameraTarget.lerp(targetCameraLookAt, 5 * delta);

    if (!playerControls.cameraFollowsPlayer && !hasStarted) {
      return;
    }

    if (isTransitioning.current) {
      const transitionSpeed = 2.5;

      const cameraDirection = new THREE.Vector3().subVectors(
        smoothCameraPosition,
        state.camera.position,
      );

      const distance = cameraDirection.length();
      if (distance > 0.1) {
        cameraDirection.normalize();
        state.camera.position.add(cameraDirection.multiplyScalar(transitionSpeed * delta));
      } else {
        state.camera.position.copy(smoothCameraPosition);
        currentLookAt.current.copy(smoothCameraTarget);
        isTransitioning.current = false;
      }

      currentLookAt.current.lerpVectors(currentLookAt.current, smoothCameraTarget, 2 * delta);
      state.camera.lookAt(currentLookAt.current);
      return;
    }

    state.camera.position.lerp(smoothCameraPosition, 5 * delta);

    state.camera.lookAt(smoothCameraTarget);
  };

  const updateMovement = (state: RootState, delta: number) => {
    if (isTransitioning.current) {
      return;
    }

    const keys = getKeys();

    const impulseStrength = 3 * delta;
    const inputDirection = new THREE.Vector3(
      Number(keys.leftward) - Number(keys.rightward),
      0,
      Number(keys.forward) - Number(keys.backward),
    );

    if (inputDirection.lengthSq() > 0) {
      inputDirection.normalize().multiplyScalar(impulseStrength);
    }

    if (inputDirection.length() <= 0) {
      return;
    }

    const cameraDirection = new THREE.Vector3();
    state.camera.getWorldDirection(cameraDirection);
    const cameraAngle = Math.atan2(cameraDirection.x, cameraDirection.z);

    inputDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraAngle);
    body.current.applyImpulse(
      {
        x: inputDirection.x,
        y: 0,
        z: inputDirection.z,
      },
      true,
    );

    const targetAngle = Math.atan2(inputDirection.x, inputDirection.z);
    targetRotation.current = targetAngle;
    let angleDiff = targetRotation.current - currentRotationY.current;

    while (angleDiff > Math.PI) {
      angleDiff -= Math.PI * 2;
    }

    while (angleDiff < -Math.PI) {
      angleDiff += Math.PI * 2;
    }

    currentRotationY.current += angleDiff * 4 * delta;
    const targetQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, currentRotationY.current, 0),
    );

    body.current.setRotation(targetQuaternion, true);
    setCurrentPlayerAnimation(playerAnimations.walk);
  };

  useFrame((state, delta) => {
    updateCamera(state, delta);
    updateMovement(state, delta);
  });

  return (
    <RigidBody
      ref={body}
      linearDamping={0.5}
      angularDamping={0.5}
      restitution={0.2}
      friction={1}
      canSleep
      colliders={false}
      position={playerControls.position as [number, number, number]}
      enabledRotations={[false, false, false]}
    >
      <mesh castShadow scale={2}>
        <primitive object={penguin.scene} />
      </mesh>

      <CuboidCollider args={[0.2, 0.5, 0.3]} />
    </RigidBody>
  );
};

export default Player;
