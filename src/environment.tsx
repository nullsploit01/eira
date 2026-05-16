import CameraController from './camera_controller';
import Ground from './ground';
import Snowman from './snowman';
import WelcomeLamp from './welcome_lamp';

const Environment = () => {
  return (
    <>
      <CameraController />
      <Ground />
      <WelcomeLamp />
      <Snowman />
    </>
  );
};

export default Environment;
