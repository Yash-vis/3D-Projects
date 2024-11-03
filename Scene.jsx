import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei'; 
import { useFrame } from '@react-three/fiber'; 

export default function Model(props) {
  const { nodes, materials } = useGLTF('/scene.gltf');
  const ref = useRef(); 
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003; 
    }
  });

  return (
    <group ref={ref} position={[0, 1.65, 0]} {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} scale={1.128} />
    </group>
  );
}

useGLTF.preload('/scene.gltf');
