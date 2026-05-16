import CameraController from './camera_controller';
import Ground from './ground';
import Igloo from './igloo';
import Snowman from './snowman';
import WelcomeLamp from './welcome_lamp';

const Environment = () => {
  return (
    <>
      <CameraController />
      <Ground />
      <Igloo />
      <WelcomeLamp />
      <Snowman />
    </>
  );
};

export default Environment;
