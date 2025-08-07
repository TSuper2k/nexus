import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Globe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const GlobeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 320;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Globe với ảnh chất lượng cao
    const globe = new Globe()
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png');

    scene.add(globe);

    // Glow/atmosphere effect
    const atmosphereGeometry = new THREE.SphereGeometry(globe.getGlobeRadius() * 1.08, 75, 75);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x2ec7fa,
      transparent: true,
      opacity: 0.28,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(-800, 2000, 400);
    scene.add(dirLight);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Loading effect: set isLoading to false after a short delay as a workaround
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const animate = () => {
      controls.update();
      atmosphereMesh.rotation.y += 0.0007;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      atmosphereGeometry.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] rounded-lg overflow-hidden bg-transparent">
      <div ref={containerRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      )}
    </div>
  );
};

export default GlobeScene;
