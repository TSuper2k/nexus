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
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Các điểm vệ tinh (tọa độ ngẫu nhiên trên quỹ đạo cao hơn mặt đất)
    const satellites = [
      { lat: 10, lng: 30, altitude: 0.25 },
      { lat: -20, lng: 120, altitude: 0.28 },
      { lat: 45, lng: -60, altitude: 0.22 },
      { lat: 60, lng: 90, altitude: 0.3 },
      { lat: -35, lng: -100, altitude: 0.26 },
    ];

    // Các thành phố lớn (dùng lại các điểm connections)
    const cities = [
      { lat: 40.7128, lng: -74.006 }, // New York
      { lat: 51.5074, lng: -0.1278 }, // London
      { lat: 35.6895, lng: 139.6917 }, // Tokyo
      { lat: -33.8688, lng: 151.2093 }, // Sydney
      { lat: 48.8566, lng: 2.3522 }, // Paris
      { lat: -33.9249, lng: 18.4241 }, // Cape Town
    ];

    // Đường nối giữa các vệ tinh với nhau
    const satelliteConnections = [];
    for (let i = 0; i < satellites.length; i++) {
      for (let j = i + 1; j < satellites.length; j++) {
        satelliteConnections.push({
          startLat: satellites[i].lat,
          startLng: satellites[i].lng,
          endLat: satellites[j].lat,
          endLng: satellites[j].lng,
          altitude: satellites[i].altitude,
        });
      }
    }

    // Đường nối giữa vệ tinh và các thành phố lớn
    const satelliteToCityConnections: {
      startLat: number;
      startLng: number;
      endLat: number;
      endLng: number;
      altitude: number;
    }[] = [];
    satellites.forEach((sat) => {
      cities.forEach((city) => {
        satelliteToCityConnections.push({
          startLat: sat.lat,
          startLng: sat.lng,
          endLat: city.lat,
          endLng: city.lng,
          altitude: sat.altitude,
        });
      });
    });

    // Đường nối giữa các lục địa/cities như cũ
    const connections = [
      {
        startLat: 40.7128,
        startLng: -74.006,
        endLat: 51.5074,
        endLng: -0.1278,
      }, // New York -> London
      {
        startLat: 51.5074,
        startLng: -0.1278,
        endLat: 35.6895,
        endLng: 139.6917,
      }, // London -> Tokyo
      {
        startLat: 35.6895,
        startLng: 139.6917,
        endLat: -33.8688,
        endLng: 151.2093,
      }, // Tokyo -> Sydney
      {
        startLat: -33.8688,
        startLng: 151.2093,
        endLat: 48.8566,
        endLng: 2.3522,
      }, // Sydney -> Paris
      {
        startLat: 48.8566,
        startLng: 2.3522,
        endLat: -33.9249,
        endLng: 18.4241,
      }, // Paris -> Cape Town
      {
        startLat: -33.9249,
        startLng: 18.4241,
        endLat: 40.7128,
        endLng: -74.006,
      }, // Cape Town -> New York
      // Thêm các đường nối mới
      {
        startLat: 55.7558,
        startLng: 37.6173,
        endLat: 39.9042,
        endLng: 116.4074,
      }, // Moscow -> Beijing
      {
        startLat: 39.9042,
        startLng: 116.4074,
        endLat: -23.5505,
        endLng: -46.6333,
      }, // Beijing -> Sao Paulo
      {
        startLat: -23.5505,
        startLng: -46.6333,
        endLat: 34.0522,
        endLng: -118.2437,
      }, // Sao Paulo -> Los Angeles
      {
        startLat: 34.0522,
        startLng: -118.2437,
        endLat: 55.7558,
        endLng: 37.6173,
      }, // Los Angeles -> Moscow
      { startLat: 28.6139, startLng: 77.209, endLat: 1.3521, endLng: 103.8198 }, // New Delhi -> Singapore
      {
        startLat: 1.3521,
        startLng: 103.8198,
        endLat: 40.7128,
        endLng: -74.006,
      }, // Singapore -> New York
    ];

    // Kết hợp tất cả các đường nối
    const allArcs = [
      ...connections,
      ...satelliteConnections,
      ...satelliteToCityConnections,
    ];

    // Tạo hiệu ứng dot matrix phủ lên globe
    const points = [];
    for (let lat = -90; lat <= 90; lat += 2) {
      for (let lng = -180; lng <= 180; lng += 2) {
        points.push({
          lat,
          lng,
          color: "#10b981",
          altitude: 0.001 + Math.random() * 0.01,
        });
      }
    }

    // Globe với dot matrix, các đường nối và các điểm vệ tinh
    const globe = new Globe()
      .globeImageUrl(
        "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl(
        "https://unpkg.com/three-globe/example/img/earth-topology.png"
      )
      .arcsData(allArcs)
      .arcStartLat("startLat")
      .arcStartLng("startLng")
      .arcEndLat("endLat")
      .arcEndLng("endLng")
      .arcAltitude("altitude")
      .arcColor((d: { altitude?: number }) =>
        d.altitude ? "#fbbf24" : "#00eaff"
      )
      .arcDashLength(0.5)
      .arcDashGap(0.2)
      .arcDashInitialGap(() => Math.random())
      .arcDashAnimateTime(2000)
      .pointsData(points)
      .pointColor("color")
      .pointAltitude("altitude")
      .pointRadius(0.15);

    scene.add(globe);

    // Glow/atmosphere effect - cyan
    const atmosphereGeometry = new THREE.SphereGeometry(
      globe.getGlobeRadius() * 1.08,
      75,
      75
    );
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x2ec7fa,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
    });
    const atmosphereMesh = new THREE.Mesh(
      atmosphereGeometry,
      atmosphereMaterial
    );
    scene.add(atmosphereMesh);

    // Glow/atmosphere effect - purple
    const atmosphereGeometry2 = new THREE.SphereGeometry(
      globe.getGlobeRadius() * 1.12,
      75,
      75
    );
    const atmosphereMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.13,
      side: THREE.BackSide,
    });
    const atmosphereMesh2 = new THREE.Mesh(
      atmosphereGeometry2,
      atmosphereMaterial2
    );
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
    <div className="relative w-full aspect-square min-h-[400px] sm:min-h-[600px] md:min-h-[900px] rounded-full overflow-visible bg-transparent flex items-center justify-center">
      {/* Shadow dưới globe */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-gradient-to-t from-black/30 to-transparent rounded-full blur-2xl z-0" />
      <div
        ref={containerRef}
        className="w-full h-full aspect-square max-w-full max-h-full bg-transparent"
        style={{ boxShadow: "none" }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-400"></div>
        </div>
      )}
    </div>
  );
};

export default GlobeScene;
