import CameraController from './camera_controller';
import CampFire from './camp_fire';
import Ground from './ground';
import Igloo from './igloo';
import Snowman from './snowman';
import Tree from './tree';
import WelcomeLamp from './welcome_lamp';

const Environment = () => {
  return (
    <>
      <CameraController />
      <Ground />
      <Igloo />
      <CampFire />
      <WelcomeLamp />
      <Snowman />
      <Tree scale={0.01} position={[6, 0, 2]} />
    </>
  );
};

export default Environment;
