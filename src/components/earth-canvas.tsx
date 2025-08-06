
import { useEffect, useRef, useState } from "react";


import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function EarthCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<any>();
  const frameId = useRef<number>();

  useEffect(() => {
    let width = mountRef.current?.clientWidth || 400;
    let height = width;
    if (mountRef.current) {
      height = mountRef.current.clientHeight || width;
    }


    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    mountRef.current?.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Abstract Earth geometry & materials
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    // Gradient-like effect: use MeshPhongMaterial with two-tone color and shininess
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2ec7fa, // cyan blue
      shininess: 60,
      specular: 0xffffff,
      emissive: 0x0a2540,
      emissiveIntensity: 0.18,
      transparent: false,
    });
    const earthMesh = new THREE.Mesh(geometry, earthMaterial);
    scene.add(earthMesh);

    // Glow/atmosphere effect (bigger sphere, low opacity)
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x2ec7fa,
      transparent: true,
      opacity: 0.13,
      side: THREE.BackSide,
      shininess: 100,
      emissive: 0x2ec7fa,
      emissiveIntensity: 0.5,
    });
    const atmosphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1.08, 64, 64), atmosphereMaterial);
    scene.add(atmosphereMesh);

    // Optionally: add some abstract lines or dots orbiting (decorative)
    const dots: THREE.Mesh[] = [];
    for (let i = 0; i < 18; i++) {
      const dotGeo = new THREE.SphereGeometry(0.02, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.7, transparent: true });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = 1.18 + Math.random() * 0.08;
      dot.position.set(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.cos(theta),
        r * Math.sin(theta) * Math.sin(phi)
      );
      scene.add(dot);
      dots.push(dot);
    }

    setIsLoading(false);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = false;
    controlsRef.current = controls;

    // Responsive resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let t = 0;
    const animate = () => {
      t += 0.003;
      earthMesh.rotation.y += 0.0012;
      atmosphereMesh.rotation.y += 0.0007;
      // Animate dots orbiting
      dots.forEach((dot, i) => {
        const speed = 0.001 + 0.0005 * i;
        dot.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), speed);
      });
      if (controlsRef.current) controlsRef.current.update();
      renderer.render(scene, camera);
      frameId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        mountRef.current?.removeChild(rendererRef.current.domElement);
      }
      if (frameId.current) cancelAnimationFrame(frameId.current);
      geometry.dispose();
      atmosphereMesh.geometry.dispose();
      dots.forEach(dot => dot.geometry.dispose());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="relative flex justify-center items-center w-full" style={{ aspectRatio: 1 }}>
      <div
        ref={mountRef}
        className="w-full max-w-[500px] h-auto aspect-square bg-transparent rounded-full shadow-lg"
        style={{ minHeight: 300 }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-accent"></div>
        </div>
      )}
    </div>
  );
}
