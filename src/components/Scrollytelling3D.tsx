import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Scrollytelling3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL support check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.04);

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
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Master 3D Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Core Faceted Chrome Polyhedron
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x14141c,
      metalness: 0.95,
      roughness: 0.12,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    masterGroup.add(coreMesh);

    // 2. Outer Wireframe Cage (Electric Cyan)
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.5, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    masterGroup.add(wireframeMesh);

    // 3. Gyroscopic Gimbal Rings (Brushed Titanium)
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.96,
      roughness: 0.08,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.015, 16, 100), ringMaterial);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.015, 16, 100), ringMaterial);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.012, 16, 100), ringMaterial);

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;

    masterGroup.add(ring1);
    masterGroup.add(ring2);
    masterGroup.add(ring3);

    // 4. Quantum Floating Particle Dust Swarm
    const particleCount = window.innerWidth < 768 ? 160 : 420;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.0 + Math.random() * 4.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    masterGroup.add(particleField);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x38bdf8, 3.8);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2.2);
    directionalLight2.position.set(-5, -4, 3);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0x00f0ff, 2.5, 10);
    masterGroup.add(pointLight);

    // Mouse Pointer Tracking Physics
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Scroll Tracking Variables
    let scrollProgress = 0;
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Resize Handler
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
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Mouse Inertial Lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // SCROLL-DRIVEN DYNAMIC 3D CHOREOGRAPHY:
      // We calculate target positions, rotations, and scales based on scrollProgress (0 to 1)
      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetScale = 1;

      if (scrollProgress < 0.22) {
        // Chapter 1: Hero Centered
        const t = scrollProgress / 0.22;
        targetX = THREE.MathUtils.lerp(0, 1.8, t);
        targetY = THREE.MathUtils.lerp(0, -0.2, t);
        targetZ = THREE.MathUtils.lerp(0, 0.4, t);
        targetScale = THREE.MathUtils.lerp(1, 0.9, t);
      } else if (scrollProgress < 0.45) {
        // Chapter 2: Philosophy & About (Right-shifted focal portal)
        const t = (scrollProgress - 0.22) / 0.23;
        targetX = THREE.MathUtils.lerp(1.8, -1.8, t);
        targetY = THREE.MathUtils.lerp(-0.2, 0.3, t);
        targetZ = THREE.MathUtils.lerp(0.4, -0.2, t);
        targetScale = THREE.MathUtils.lerp(0.9, 1.1, t);
      } else if (scrollProgress < 0.72) {
        // Chapter 3: Horizontal Projects (Hyperdrive Glide)
        const t = (scrollProgress - 0.45) / 0.27;
        targetX = THREE.MathUtils.lerp(-1.8, 1.9, t);
        targetY = THREE.MathUtils.lerp(0.3, -0.4, t);
        targetZ = THREE.MathUtils.lerp(-0.2, 0.6, t);
        targetScale = THREE.MathUtils.lerp(1.1, 0.85, t);
      } else if (scrollProgress < 0.88) {
        // Chapter 4: Skills Matrix (Exploded Constellation)
        const t = (scrollProgress - 0.72) / 0.16;
        targetX = THREE.MathUtils.lerp(1.9, 0, t);
        targetY = THREE.MathUtils.lerp(-0.4, 0.5, t);
        targetZ = THREE.MathUtils.lerp(0.6, -0.4, t);
        targetScale = THREE.MathUtils.lerp(0.85, 1.25, t);
      } else {
        // Chapter 5: Contact Outro (Radiant Apex Beacon)
        const t = (scrollProgress - 0.88) / 0.12;
        targetX = THREE.MathUtils.lerp(0, 0, t);
        targetY = THREE.MathUtils.lerp(0.5, 0.2, t);
        targetZ = THREE.MathUtils.lerp(-0.4, 0.8, t);
        targetScale = THREE.MathUtils.lerp(1.25, 1.1, t);
      }

      // Smooth position interpolation
      masterGroup.position.x += (targetX - masterGroup.position.x) * 0.06;
      masterGroup.position.y += (targetY - masterGroup.position.y) * 0.06;
      masterGroup.position.z += (targetZ - masterGroup.position.z) * 0.06;

      masterGroup.scale.setScalar(
        masterGroup.scale.x + (targetScale - masterGroup.scale.x) * 0.06
      );

      // Rotations driven by elapsed time + scroll velocity + mouse
      const scrollRotation = scrollProgress * Math.PI * 3;
      masterGroup.rotation.y = elapsedTime * 0.18 + scrollRotation + currentMouseX * 0.5;
      masterGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 + currentMouseY * -0.4;

      // Internal counter-rotations
      coreMesh.rotation.y = -elapsedTime * 0.35 + scrollProgress * Math.PI;
      coreMesh.rotation.z = elapsedTime * 0.2;

      wireframeMesh.rotation.y = elapsedTime * 0.25;
      wireframeMesh.rotation.x = -elapsedTime * 0.15;

      ring1.rotation.x = elapsedTime * 0.4 + scrollProgress * 2;
      ring2.rotation.y = elapsedTime * 0.35 - scrollProgress * 2;
      ring3.rotation.z = -elapsedTime * 0.3 + scrollProgress * 1.5;

      particleField.rotation.y = -elapsedTime * 0.08 - scrollProgress * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

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
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
