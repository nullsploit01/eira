import { lazy, Suspense } from 'react';

const Environment = lazy(() => import('./environment'));
const PlayerV2 = lazy(() => import('./player_v2'));

const Experience = () => {
  return (
    <Suspense fallback={null}>
      <PlayerV2 />
      <Environment />
    </Suspense>
  );
};

export default Experience;
