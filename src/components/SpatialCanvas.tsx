import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SpatialCanvas: React.FC = () => {
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
    scene.fog = new THREE.FogExp2(0x060609, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 150);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Master Object Group (Positioned gracefully in 3D space with safe margins)
    const masterGroup = new THREE.Group();
    // Default position: slightly offset to the right and back so typography has 100% legibility
    masterGroup.position.set(window.innerWidth > 1024 ? 2.5 : 0, 0, -1);
    scene.add(masterGroup);

    // Core Sculpture: Luxury Faceted Obsidian/Chrome Monolith
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x11131a,
      metalness: 0.95,
      roughness: 0.12,
      reflectivity: 0.9,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    // Delicate Luminous Wireframe Lattice (Subtle cyan, low opacity for elegance)
    const wireGeo = new THREE.IcosahedronGeometry(1.68, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    masterGroup.add(wireMesh);

    // Sleek Orbiting Titanium Rings (Thin, delicate, non-intrusive)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.01, 16, 120), ringMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.008, 16, 120), ringMat);

    ring1.rotation.x = Math.PI / 3.5;
    ring2.rotation.y = Math.PI / 4;

    masterGroup.add(ring1);
    masterGroup.add(ring2);

    // 3. Fluid Celestial Particle Wave / Nebula Field (1800 Soft Floating Stardust Particles)
    const particleCount = window.innerWidth < 768 ? 800 : 1800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 35 - 5;

      particlePositions[i] = x;
      particlePositions[i + 1] = y;
      particlePositions[i + 2] = z;

      originalPositions[i] = x;
      originalPositions[i + 1] = y;
      originalPositions[i + 2] = z;

      particleScales[i / 3] = Math.random() * 0.04 + 0.015;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 4. Subtle Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 2.0);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 2.0, 12);
    pointLight.position.set(0, 0, 0);
    masterGroup.add(pointLight);

    // Pointer Interaction Physics
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Scroll Tracking
    let scrollProgress = 0;
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Window Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (w <= 1024) {
        masterGroup.position.x = 0;
        masterGroup.scale.setScalar(0.75);
      } else {
        masterGroup.position.x = 2.5;
        masterGroup.scale.setScalar(1.0);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // SCROLL-DRIVEN SPATIAL STAGES:
      // Responsive base scaling for mobile and tablet devices
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const baseScale = isMobile ? 0.55 : (isTablet ? 0.75 : 1.0);

      // Smoothly glides across the screen without ever blocking typography
      let targetX = window.innerWidth > 1024 ? 2.5 : 0;
      let targetY = isMobile ? 0.7 : 0;
      let targetZ = isMobile ? -3.0 : -1;
      let targetScale = baseScale;

      if (scrollProgress < 0.25) {
        // Hero: Balanced on right side for desktop, atmospheric backdrop for mobile
        targetX = window.innerWidth > 1024 ? 2.4 : 0;
        targetY = isMobile ? 0.8 : currentMouseY * 0.4;
        targetZ = isMobile ? -3.2 : -1 + scrollProgress * 2;
        targetScale = baseScale;
      } else if (scrollProgress < 0.55) {
        // About / Philosophy: Sweeps toward center-left softly
        const t = (scrollProgress - 0.25) / 0.3;
        targetX = THREE.MathUtils.lerp(window.innerWidth > 1024 ? 2.4 : 0, window.innerWidth > 1024 ? -2.8 : 0, t);
        targetY = THREE.MathUtils.lerp(isMobile ? 0.8 : 0, isMobile ? 0.5 : 0.4, t);
        targetZ = THREE.MathUtils.lerp(isMobile ? -3.2 : 1, isMobile ? -3.0 : 0, t);
        targetScale = baseScale * THREE.MathUtils.lerp(1.0, 1.15, t);
      } else if (scrollProgress < 0.8) {
        // Projects: Shifts to far right framing the project slides
        const t = (scrollProgress - 0.55) / 0.25;
        targetX = THREE.MathUtils.lerp(window.innerWidth > 1024 ? -2.8 : 0, window.innerWidth > 1024 ? 3.0 : 0, t);
        targetY = THREE.MathUtils.lerp(isMobile ? 0.5 : 0.4, isMobile ? 0.2 : -0.3, t);
        targetZ = THREE.MathUtils.lerp(isMobile ? -3.0 : 0, isMobile ? -3.5 : -0.5, t);
        targetScale = baseScale * THREE.MathUtils.lerp(1.15, 0.9, t);
      } else {
        // Contact: Centers into radiant focal beacon
        const t = (scrollProgress - 0.8) / 0.2;
        targetX = THREE.MathUtils.lerp(window.innerWidth > 1024 ? 3.0 : 0, 0, t);
        targetY = THREE.MathUtils.lerp(isMobile ? 0.2 : -0.3, isMobile ? 0.7 : 0.6, t);
        targetZ = THREE.MathUtils.lerp(isMobile ? -3.5 : -0.5, isMobile ? -2.5 : 1.0, t);
        targetScale = baseScale * THREE.MathUtils.lerp(0.9, 1.25, t);
      }

      masterGroup.position.x += (targetX - masterGroup.position.x) * 0.05;
      masterGroup.position.y += (targetY - masterGroup.position.y) * 0.05;
      masterGroup.position.z += (targetZ - masterGroup.position.z) * 0.05;
      masterGroup.scale.setScalar(
        masterGroup.scale.x + (targetScale - masterGroup.scale.x) * 0.05
      );

      // Smooth rotations
      masterGroup.rotation.y = elapsedTime * 0.15 + scrollProgress * Math.PI * 2 + currentMouseX * 0.4;
      masterGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 + currentMouseY * -0.3;

      coreMesh.rotation.y = -elapsedTime * 0.2;
      wireMesh.rotation.y = elapsedTime * 0.18;
      ring1.rotation.x = elapsedTime * 0.25 + scrollProgress;
      ring2.rotation.y = elapsedTime * 0.2 - scrollProgress;

      // Undulating Celestial Particle Wave Physics
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        const ox = originalPositions[i];
        const oz = originalPositions[i + 2];
        positions[i + 1] = originalPositions[i + 1] + Math.sin(elapsedTime * 0.6 + ox * 0.3) * 0.4 + Math.cos(elapsedTime * 0.5 + oz * 0.2) * 0.3;
      }
      particleGeo.attributes.position.needsUpdate = true;
      particleSystem.rotation.y = -elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
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
