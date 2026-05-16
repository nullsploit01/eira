import { playerAnimations } from './constants/animations';
import { useLevaControls } from './hooks/useLevaControls';
import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useEffect, useRef, useState } from 'react';
import { Euler, Quaternion, Vector3 } from 'three';

const Player = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [playerAnimation, setPlayerAnimation] = useState<string>(playerAnimations.idle);

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

  const penguinControls = useLevaControls('Penguin', {
    rotation: {
      value: [0, 3.2, 0],
      step: 0.1,
    },

    animationName: {
      options: penguinAnimations.names,
      value: playerAnimation,
    },
  });

  useEffect(() => {
    const action = penguinAnimations.actions[playerAnimation];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [playerAnimation]);

  useFrame((_, delta) => {
    // const bodyPosition = body.current.translation();

    const keys = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 5 * delta;
    const torqueStrength = 0.2 * delta;
    if (keys['forward']) {
      impulse.z -= impulseStrength;
    }

    if (keys['backward']) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (keys['leftward']) {
      impulse.x -= impulseStrength;
      torque.z -= torqueStrength;
    }

    if (keys['rightward']) {
      impulse.x += impulseStrength;
      torque.z += torqueStrength;
    }

    body.current.applyImpulse(impulse, true);

    // ROTATION

    const velocity = body.current.linvel();

    const direction = new Vector3(velocity.x, 0, velocity.z);

    if (direction.length() > 0.01) {
      direction.normalize();

      const angle = Math.atan2(direction.x, direction.z);

      const targetQuaternion = new Quaternion().setFromEuler(new Euler(0, angle, 0));

      const currentRotation = body.current.rotation();

      const currentQuaternion = new Quaternion(
        currentRotation.x,
        currentRotation.y,
        currentRotation.z,
        currentRotation.w,
      );

      currentQuaternion.slerp(targetQuaternion, 0.1);

      body.current.setRotation(currentQuaternion, true);
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
        position={[0, 1, 0]}
        canSleep={false}
        enabledRotations={[false, false, false]}
        rotation={penguinControls.rotation as [number, number, number]}
      >
        <mesh castShadow scale={2}>
          <primitive object={penguin.scene} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Player;
