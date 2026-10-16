import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SpatialCanvasProps {
  onVelocityChange?: (velocity: number) => void;
}

export const SpatialCanvas: React.FC<SpatialCanvasProps> = ({ onVelocityChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // 2. High-Speed Warp Starfield (1500 Star Streak Particles)
    const starCount = 1500;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starVel = new Float32Array(starCount);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 80;
      starPos[i + 1] = (Math.random() - 0.5) * 80;
      starPos[i + 2] = -Math.random() * 120;
      starVel[i / 3] = 0.2 + Math.random() * 0.8;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 3. Cybernetic Sector Holographic Artifacts along the Z flight path:
    // Sector 1: Origin Core (z = 0)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, 0);

    const coreMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.6, 1),
      new THREE.MeshStandardMaterial({
        color: 0x181824,
        metalness: 0.95,
        roughness: 0.1,
        flatShading: true,
      })
    );
    coreGroup.add(coreMesh);

    const wireMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.0, 1),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      })
    );
    coreGroup.add(wireMesh);

    const gimbalRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.8, 0.02, 16, 100),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 })
    );
    gimbalRing.rotation.x = Math.PI / 3;
    coreGroup.add(gimbalRing);
    scene.add(coreGroup);

    // Sector 2: Holographic Portal Gateway (z = -20)
    const gatewayGroup = new THREE.Group();
    gatewayGroup.position.set(3, -1, -20);
    for (let r = 0; r < 4; r++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(3.2 + r * 0.8, 0.015, 16, 80),
        new THREE.MeshBasicMaterial({
          color: r % 2 === 0 ? 0x38bdf8 : 0x0284c7,
          transparent: true,
          opacity: 0.5 - r * 0.1,
          wireframe: true,
        })
      );
      ring.rotation.z = (r * Math.PI) / 4;
      gatewayGroup.add(ring);
    }
    scene.add(gatewayGroup);

    // Sector 3: Project Warp Hypercubes (z = -42)
    const projectCluster = new THREE.Group();
    projectCluster.position.set(-2.5, 1, -42);
    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      })
    );
    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshStandardMaterial({
        color: 0x0e1726,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.7,
      })
    );
    projectCluster.add(cube1);
    projectCluster.add(cube2);
    scene.add(projectCluster);

    // Sector 4: Neural Skill Orb Reactor (z = -65)
    const neuralOrb = new THREE.Group();
    neuralOrb.position.set(0, -0.5, -65);
    const sphereCore = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      })
    );
    neuralOrb.add(sphereCore);

    // Orbiting Skill Satellite nodes
    const skillNodes: THREE.Mesh[] = [];
    for (let s = 0; s < 11; s++) {
      const angle = (s / 11) * Math.PI * 2;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x38bdf8, emissiveIntensity: 0.8 })
      );
      node.position.set(Math.cos(angle) * 3.8, Math.sin(angle * 2) * 1.5, Math.sin(angle) * 3.8);
      neuralOrb.add(node);
      skillNodes.push(node);
    }
    scene.add(neuralOrb);

    // Sector 5: Singularity Beacon (z = -88)
    const beaconGroup = new THREE.Group();
    beaconGroup.position.set(0, 0, -88);
    const beaconLight = new THREE.PointLight(0x38bdf8, 4, 30);
    beaconGroup.add(beaconLight);

    const coronaMesh = new THREE.Mesh(
      new THREE.RingGeometry(1, 4, 32),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      })
    );
    beaconGroup.add(coronaMesh);
    scene.add(beaconGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 4.0);
    dirLight1.position.set(6, 6, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    // Mouse Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll & Velocity Tracking
    let scrollProgress = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      if (onVelocityChange) onVelocityChange(scrollVelocity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Inertial mouse smoothing
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Decay velocity
      scrollVelocity *= 0.92;

      // SPATIAL 3D CAMERA FLIGHT PATH:
      // As scrollProgress goes from 0 to 1, the camera flies through space:
      // z starts at 5 and dives to -82!
      const targetCamZ = 5 - scrollProgress * 87;
      const targetCamX = Math.sin(scrollProgress * Math.PI * 2) * 1.5 + currentMouseX * 0.8;
      const targetCamY = Math.cos(scrollProgress * Math.PI * 2) * 0.8 + currentMouseY * 0.6;

      camera.position.z += (targetCamZ - camera.position.z) * 0.08;
      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;

      // Camera Look-ahead
      camera.lookAt(targetCamX * 0.5, targetCamY * 0.5, camera.position.z - 15);

      // WARP STARFIELD DYNAMICS:
      // Stars stretch and speed past camera
      const positions = starGeo.attributes.position.array as Float32Array;
      const speedMultiplier = 0.5 + scrollVelocity * 0.15;

      for (let i = 0; i < starCount * 3; i += 3) {
        positions[i + 2] += starVel[i / 3] * speedMultiplier;
        if (positions[i + 2] > camera.position.z + 5) {
          positions[i + 2] = camera.position.z - 95;
          positions[i] = (Math.random() - 0.5) * 80;
          positions[i + 1] = (Math.random() - 0.5) * 80;
        }
      }
      starGeo.attributes.position.needsUpdate = true;
      starMat.size = 0.05 + Math.min(scrollVelocity * 0.015, 0.2);

      // Rotate 3D Artifacts
      coreMesh.rotation.y = elapsedTime * 0.25;
      wireMesh.rotation.y = -elapsedTime * 0.2;
      gimbalRing.rotation.z = elapsedTime * 0.3;

      gatewayGroup.rotation.z = elapsedTime * 0.15;

      cube1.rotation.x = elapsedTime * 0.3;
      cube1.rotation.y = elapsedTime * 0.2;
      cube2.rotation.x = -elapsedTime * 0.25;

      sphereCore.rotation.y = elapsedTime * 0.3;
      skillNodes.forEach((node, idx) => {
        const offset = (idx / 11) * Math.PI * 2 + elapsedTime * 0.6;
        node.position.x = Math.cos(offset) * 3.8;
        node.position.z = Math.sin(offset) * 3.8;
        node.position.y = Math.sin(offset * 2) * 1.2;
      });

      coronaMesh.rotation.z = -elapsedTime * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      starGeo.dispose();
      starMat.dispose();
      coreMesh.geometry.dispose();
      wireMesh.geometry.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
