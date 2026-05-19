import Ghost from './ghost';

const DynamicProps = () => {
  return (
    <>
      <Ghost position={[-2, 1, 5]} scale={0.2} />
      <Ghost position={[10, 1, 13]} scale={0.2} />
      <Ghost position={[-4.5, 1, 16]} scale={0.2} />
      <Ghost position={[-11, 1, -15]} scale={0.2} />
      <Ghost position={[-2, 1, -8]} scale={0.2} />
    </>
  );
};

export default DynamicProps;
