import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Master Group for Inertial Tilt
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Core Sculptural Polyhedron (Chrome / Silver with Electric Cyan Sheen)
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x181822,
      metalness: 0.92,
      roughness: 0.15,
      flatShading: true,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    masterGroup.add(coreMesh);

    // 2. Wireframe Cage Lattice (Silver & Cyan Highlights)
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    masterGroup.add(wireframeMesh);

    // 3. Orbital Precision Rings (Gyroscopic Gimbal)
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.015, 16, 100), ringMaterial);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.015, 16, 100), ringMaterial);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.012, 16, 100), ringMaterial);

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;

    masterGroup.add(ring1);
    masterGroup.add(ring2);
    masterGroup.add(ring3);

    // 4. Quantum Floating Particle Swarm
    const particleCount = window.innerWidth < 768 ? 120 : 320;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.2 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
      scales[i / 3] = Math.random() * 0.04 + 0.01;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    masterGroup.add(particleField);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x38bdf8, 3.5);
    directionalLight1.position.set(4, 5, 4);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight2.position.set(-4, -3, 3);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0x00f0ff, 2.5, 8);
    pointLight.position.set(0, 0, 0);
    masterGroup.add(pointLight);

    // Interactive Pointer Physics
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isVisible = true;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      targetX = (clientX / window.innerWidth) * 2 - 1;
      targetY = -(clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Pause rendering when scrolled out of view for max performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Clock and Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Inertial Pointer Lerp
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      masterGroup.rotation.y = elapsedTime * 0.15 + currentX * 0.6;
      masterGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 - currentY * 0.4;

      // Internal Counter Rotations
      coreMesh.rotation.y = -elapsedTime * 0.25;
      coreMesh.rotation.z = elapsedTime * 0.15;

      wireframeMesh.rotation.y = elapsedTime * 0.2;
      wireframeMesh.rotation.x = -elapsedTime * 0.1;

      ring1.rotation.x = elapsedTime * 0.3;
      ring2.rotation.y = elapsedTime * 0.25;
      ring3.rotation.z = -elapsedTime * 0.2;

      particleField.rotation.y = -elapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Resource Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries and Materials
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{ minHeight: '100%' }}
      aria-hidden="true"
    />
  );
};
