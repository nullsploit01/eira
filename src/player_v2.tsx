import { playerAnimations } from './constants/animations';
import { useLevaControls } from './hooks/useLevaControls';
import { useExperienceStore } from './stores/experience_store';
import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei';
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import Ecctrl from 'ecctrl';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Player = () => {
  const hasStarted = useExperienceStore((state) => state.hasStarted);
  const currentPlayerAnimation = useExperienceStore((state) => state.playerAnimation);
  const setCurrentPlayerAnimation = useExperienceStore((state) => state.setPlayerAnimation);
  const canMovePlayer = useExperienceStore((state) => state.canMovePlayer);

  const [subscribeKeys] = useKeyboardControls();
  const body = useRef<RapierRigidBody>({} as RapierRigidBody);
  const isTransitioning = useRef(false);

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
        if (!hasStarted) {
          return;
        }

        if (!canMovePlayer) {
          setCurrentPlayerAnimation(playerAnimations.idle);
          return;
        }

        setCurrentPlayerAnimation(pressed ? playerAnimations.walk : playerAnimations.idle);
      },
    );

    return unsubscribe;
  }, [subscribeKeys, canMovePlayer, hasStarted]);

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
      <Ecctrl
        animated
        position={[0, 0, 0]}
        mode="FixedCamera"
        disableControl={!hasStarted || !canMovePlayer}
        disableFollowCam={!hasStarted}
        camCollision={false}
        camTargetPos={{ x: 0, y: 0.6, z: 0 }}
        camFollowMult={hasStarted && canMovePlayer ? 5 : 0}
        camLerpMult={hasStarted && canMovePlayer ? 5 : 0}
        turnSpeed={6}
        capsuleHalfHeight={0.1}
        capsuleRadius={0.3}
        airDragMultiplier={5}
        maxVelLimit={2.5}
        wakeUpDelay={0}
        jumpVel={0}
        dragDampingC={0.2}
        accDeltaTime={8}
        floatHeight={0}
        autoBalance={false}
      >
        <mesh castShadow scale={2}>
          <primitive object={penguin.scene} />
        </mesh>

        <CuboidCollider args={[0.2, 0.5, 0.3]} />
      </Ecctrl>
    </RigidBody>
  );
};

export default Player;
