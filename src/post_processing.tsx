import { Bloom, EffectComposer, Noise, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

const PostProcessing = () => {
  return (
    <>
      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
        <Vignette eskil={false} offset={0.15} darkness={0.5} />
        <Noise opacity={0.01} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  );
};

export default PostProcessing;
