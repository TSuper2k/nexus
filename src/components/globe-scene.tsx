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

    // Glow/atmosphere effect - cyan
    const atmosphereGeometry = new THREE.SphereGeometry(globe.getGlobeRadius() * 1.08, 75, 75);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x2ec7fa,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphereMesh);

    // Glow/atmosphere effect - purple
    const atmosphereGeometry2 = new THREE.SphereGeometry(globe.getGlobeRadius() * 1.12, 75, 75);
    const atmosphereMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.13,
      side: THREE.BackSide,
    });
    const atmosphereMesh2 = new THREE.Mesh(atmosphereGeometry2, atmosphereMaterial2);
    scene.add(atmosphereMesh2);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 2.1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.7);
    dirLight.position.set(-800, 2000, 400);
    scene.add(dirLight);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;

    // Loading effect: set isLoading to false after a short delay as a workaround
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const animate = () => {
      controls.update();
      atmosphereMesh.rotation.y += 0.0007;
      atmosphereMesh2.rotation.y += 0.0005;
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
      atmosphereGeometry2.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] rounded-full overflow-visible bg-transparent flex items-center justify-center">
      {/* Shadow dưới globe */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-gradient-to-t from-black/40 to-transparent rounded-full blur-2xl z-0" />
      <div
        ref={containerRef}
        className="w-full h-full rounded-full border-2 border-cyan-400/30 shadow-[0_0_60px_10px_rgba(139,92,246,0.15)] transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_80px_20px_rgba(34,211,238,0.25)] bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent"
        style={{ boxShadow: "0 0 80px 10px rgba(34,211,238,0.10), 0 0 120px 20px rgba(139,92,246,0.10)" }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      )}
    </div>
  );
};

export default GlobeScene;
