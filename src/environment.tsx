import CameraController from './camera_controller';
import CampFire from './camp_fire';
import Ground from './ground';
import Igloo from './igloo';
import Snowman from './snowman';
import StaticProps from './static_props';
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
      <StaticProps />
    </>
  );
};

export default Environment;
