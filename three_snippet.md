// src/components/Scene.jsx
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Basic setup for Three.js scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;


    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);

    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1, 100, 2);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);
    const helper = new THREE.DirectionalLightHelper(directionalLight, 2);
    scene.add(helper);

    // Studio lighting setup
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-10, 0, -10);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
    backLight.position.set(0, -10, -10);
    scene.add(backLight);

    // Loading textures for material
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/texture/wood_0065_color_1k.jpg');
    const normal = textureLoader.load('/texture/normal.png');

    // Object with textured material
    const geometry = new THREE.CylinderGeometry(2, 2, 3);
    const material = new THREE.MeshStandardMaterial({
      color: "red",
      map: texture,
      normalMap: normal,
    });
    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // lil-gui setup
    const gui = new GUI();

    // Material properties
    const materialFolder = gui.addFolder('Material Properties');
    materialFolder.addColor(material, 'color').name('Color').onChange(() => material.needsUpdate = true);
    materialFolder.add(material, 'roughness', 0, 1).name('Roughness');
    materialFolder.add(material, 'metalness', 0, 1).name('Metalness');
    materialFolder.open();

    // Light properties for mainLight
    const lightFolder = gui.addFolder('Main Light Properties');
    lightFolder.add(mainLight, 'intensity', 0, 2, 0.1).name('Intensity');
    lightFolder.addColor(mainLight, 'color').name('Color');
    lightFolder.add(mainLight.position, 'x', -10, 10, 0.1).name('X Position');
    lightFolder.add(mainLight.position, 'y', -10, 10, 0.1).name('Y Position');
    lightFolder.add(mainLight.position, 'z', -10, 10, 0.1).name('Z Position');
    lightFolder.add(mainLight, 'visible').name('Visible');
    lightFolder.open();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      gui.destroy();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Scene;
