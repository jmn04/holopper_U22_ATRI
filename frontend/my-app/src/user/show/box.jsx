import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const Box = (props) => {
  // useRefフックを使ってmeshの参照を保持
  const mesh = useRef();

  // useFrameフックを使って毎フレームごとにmeshの回転を更新
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh} // 参照をmeshに渡す
      scale={1.5}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};
