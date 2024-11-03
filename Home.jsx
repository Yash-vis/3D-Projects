// Home.jsx
import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import Scene from './Scene';
import Navbar from './Navbar';
import '../app.css';

const Home = () => {
  useEffect(() => {
    const breakText = () => {
      const h1 = document.querySelector(".thaught h1"); 
      const splittedText = h1.textContent.split("");
      const halfValue = Math.ceil(splittedText.length / 2);
      let clutter = "";

      splittedText.forEach((e, id) => {
        if (id < halfValue) {
          clutter += `<span class="a">${e}</span>`;
        } else {
          clutter += `<span class="b">${e}</span>`;
        }
      });

      h1.innerHTML = clutter; 
    };
    breakText();
    gsap.to(".heading", {
      y: 30,
      duration: 2,
      boxShadow: "0px 0px 20px 10px rgba(0, 255, 255, 1)",
      scale: 0.7,
      color: "gold",
    });

    
    gsap.from(".thaught .a", {
      opacity: 0,
      y: -50, 
      duration: 1,
      delay: 1, 
      stagger: 0.2, 
      ease: "power2.out",
    });

    gsap.from(".thaught .b", {
      opacity: 0,
      y: 50, 
      duration: 1,
      delay: 1.2, 
      stagger: 0.2,
      ease: "power2.out",
    });

  }, []); 

  return (
    <div>
      <Navbar />
      <div className="heading"><h1>Log In</h1></div>
      <div className="thaught"><h1>Earth</h1></div>
      <Canvas>
        <ambientLight />
        <OrbitControls enableZoom={false} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default Home;
