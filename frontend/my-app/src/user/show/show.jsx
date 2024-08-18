/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState, Suspense, startTransition, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas, render, useFrame } from '@react-three/fiber';
import { useGLTF } from "@react-three/drei";
import { OrbitControls, PerspectiveCamera, Stage,Clone } from '@react-three/drei';
import io from "socket.io-client"

const show = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background: black;
`;

const socket = io(`http://${process.env.REACT_APP_IP_ADDRESS}:5000`)

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  const { group } = useRef();
  const [isRotating, setIsRotating] = useState(false);
  const [data, setData] = useState('');
  const [streamActive, setStreamActive] = useState(true); 

  useEffect(() => {
    const fetchStream = () => {
      socket.emit('join', {room: 'room1'});
      socket.on('response', (data)=> {
        setData(data)
      })

      socket.emit('run-script');
    }
    /* const fetchStream = async () => {
      const response = await fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:5000/run-script`);
      console.log(response.body)
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let receivedText = '';
      
      while (streamActive) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setData(chunk)
      }
    }; */
    fetchStream();
    return () => {
      setStreamActive(false);
      fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:5000/end-script`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('ネットワーク応答が正常ではありません');
        }
        return res.json();
      })
    };
  }, [streamActive]);

  useEffect(() => {
    if (data === "swipe") {
      setIsRotating(true);
    }else{
      setIsRotating(false);
    }// 状態が更新されたときにログを出力
  }, [data]);

  useFrame(() => {
    if (isRotating && scene) {
      scene.rotation.y += 0.01; // Y軸を中心に回転
    }
  });

  return (
    <group ref={group}>
      <Clone object={scene} scale={1.2} position={[-1,0,0]} rotation={[Math.PI/2 ,0,Math.PI/2]}/>
      <Clone object={scene} scale={1.2} position={[1,0,0]} rotation={[Math.PI/2 ,0,Math.PI/2]}/>
      <Clone object={scene} scale={1.2} position={[0,-1,0]} />
      <Clone object={scene} scale={1.2} position={[0,1,0]} rotation={[0,Math.PI,0]}/>
      {/* <primitive object={scene} scale={[1.2, 1.2, 1.2]} /> */}
    </group>);
};

const CanvasBox = ({ modelUrl, rotation }) => {
  return (
    <div css={show}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 9.5]} />
        <Stage adjustCamera={true}>
          <Model url={modelUrl} />
        </Stage>
        <ambientLight args={[0xffffff]} intensity={0.5} color="white" />
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <OrbitControls makeDefault enableZoom={true} />
      </Canvas>
    </div>
  );
};

export const Show = () => {
  const [rotation, setRotation] = useState([0, 7 * Math.PI / 4, 0]);
  const location = useLocation();
  const [url, setUrl] = useState('');
  const modelFailName = location.state ? location.state.state : '';
  useEffect(() => {
    setUrl(`http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_BACKEND_PORT}/api/getModel/index.php?file=${modelFailName}`);
  }, []);


  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newRotation = windowWidth <= 1024 ? [0, 265 * Math.PI / 180, 0] : [0, 265 * Math.PI / 180, 0];
      startTransition(() => setRotation(newRotation));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!modelFailName) {
    return <div>モデルのURLが指定されていません。</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CanvasBox modelUrl={url} rotation={rotation} />
    </Suspense>
  );
};
