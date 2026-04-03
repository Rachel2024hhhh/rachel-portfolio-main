import { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';

const MergedComponent = () => {
  const [mounted, setMounted] = useState(false);
  const path = '/models/tree.glb';
  const scale = 1;
  const position = [0, 0, 0];

  useEffect(() => {
    setMounted(true);
    useGLTF.preload(path);
  }, [path]);

  return mounted ? <Model path={path} scale={scale} position={position} /> : null;
};

const Model = ({ path, scale, position }) => {
  const { scene } = useGLTF(path);
  return scene ? <primitive object={scene} scale={scale} position={position} /> : null;
};

export default MergedComponent;