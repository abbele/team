'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TractorScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(6, 4, 8);
    camera.lookAt(0, 0.5, 0);

    // Accent color
    const ACCENT = 0x00ff88;
    const DARK = 0x0a0f14;
    const METAL = 0x1a2530;
    const WIRE = 0x00ff88;

    // ── Tractor ─────────────────────────────────────────────────────────────

    const tractorGroup = new THREE.Group();

    // Chassis
    const chassisMat = new THREE.MeshStandardMaterial({
      color: METAL,
      metalness: 0.9,
      roughness: 0.3,
      emissive: 0x001a0d,
    });

    const chassisGeo = new THREE.BoxGeometry(3.2, 0.6, 1.4);
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.set(0, 0.8, 0);
    chassis.castShadow = true;
    tractorGroup.add(chassis);

    // Chassis wireframe overlay
    const chassisWire = new THREE.Mesh(
      chassisGeo,
      new THREE.MeshBasicMaterial({ color: WIRE, wireframe: true, transparent: true, opacity: 0.08 })
    );
    chassisWire.position.copy(chassis.position);
    tractorGroup.add(chassisWire);

    // Engine hood
    const hoodGeo = new THREE.BoxGeometry(1.4, 0.55, 1.2);
    const hood = new THREE.Mesh(hoodGeo, chassisMat);
    hood.position.set(0.95, 1.375, 0);
    hood.castShadow = true;
    tractorGroup.add(hood);

    // Engine hood wireframe
    const hoodWire = new THREE.Mesh(
      hoodGeo,
      new THREE.MeshBasicMaterial({ color: WIRE, wireframe: true, transparent: true, opacity: 0.12 })
    );
    hoodWire.position.copy(hood.position);
    tractorGroup.add(hoodWire);

    // Cabin
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x0d1a14,
      metalness: 0.7,
      roughness: 0.4,
      transparent: true,
      opacity: 0.92,
    });
    const cabinGeo = new THREE.BoxGeometry(1.3, 1.1, 1.15);
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(-0.65, 1.75, 0);
    cabin.castShadow = true;
    tractorGroup.add(cabin);

    // Cabin glass glow effect
    const glassMat = new THREE.MeshStandardMaterial({
      color: ACCENT,
      emissive: ACCENT,
      emissiveIntensity: 0.15,
      transparent: true,
      opacity: 0.18,
      metalness: 0.1,
      roughness: 0,
    });
    const glassGeo = new THREE.BoxGeometry(1.28, 1.08, 1.13);
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.copy(cabin.position);
    tractorGroup.add(glass);

    // Cabin wireframe
    const cabinWire = new THREE.Mesh(
      cabinGeo,
      new THREE.MeshBasicMaterial({ color: WIRE, wireframe: true, transparent: true, opacity: 0.2 })
    );
    cabinWire.position.copy(cabin.position);
    tractorGroup.add(cabinWire);

    // Exhaust pipe
    const exhaustGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.7, 8);
    const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.95, roughness: 0.2 });
    const exhaust = new THREE.Mesh(exhaustGeo, exhaustMat);
    exhaust.position.set(1.5, 1.95, 0.3);
    tractorGroup.add(exhaust);

    // Exhaust glow ring
    const glowRingGeo = new THREE.TorusGeometry(0.1, 0.015, 8, 16);
    const glowRingMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.6 });
    const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
    glowRing.position.set(1.5, 2.37, 0.3);
    glowRing.rotation.x = Math.PI / 2;
    tractorGroup.add(glowRing);

    // ── Wheels ───────────────────────────────────────────────────────────────

    function makeWheel(radius: number, thickness: number, x: number, z: number) {
      const group = new THREE.Group();

      // Tire
      const tireMat = new THREE.MeshStandardMaterial({
        color: 0x080808,
        metalness: 0.1,
        roughness: 0.9,
      });
      const tireGeo = new THREE.TorusGeometry(radius, thickness, 16, 32);
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.castShadow = true;
      group.add(tire);

      // Rim
      const rimMat = new THREE.MeshStandardMaterial({
        color: METAL,
        metalness: 0.95,
        roughness: 0.2,
        emissive: 0x001a0d,
        emissiveIntensity: 0.3,
      });
      const rimGeo = new THREE.CylinderGeometry(radius * 0.55, radius * 0.55, thickness * 1.8, 16);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.x = Math.PI / 2;
      group.add(rim);

      // Spokes
      for (let i = 0; i < 5; i++) {
        const spokeGeo = new THREE.BoxGeometry(radius * 1.05, thickness * 0.9, 0.04);
        const spoke = new THREE.Mesh(spokeGeo, rimMat);
        spoke.rotation.z = (i / 5) * Math.PI;
        group.add(spoke);
      }

      // Accent ring
      const accentRingGeo = new THREE.TorusGeometry(radius * 0.58, 0.02, 8, 24);
      const accentRingMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.7 });
      const accentRing = new THREE.Mesh(accentRingGeo, accentRingMat);
      group.add(accentRing);

      group.rotation.x = Math.PI / 2;
      group.position.set(x, 0, z);
      return group;
    }

    // Rear big wheels
    const rearWheelR = makeWheel(0.85, 0.28, -0.85, 0.88);
    const rearWheelL = makeWheel(0.85, 0.28, -0.85, -0.88);
    tractorGroup.add(rearWheelR, rearWheelL);

    // Front small wheels
    const frontWheelR = makeWheel(0.5, 0.18, 1.05, 0.62);
    const frontWheelL = makeWheel(0.5, 0.18, 1.05, -0.62);
    tractorGroup.add(frontWheelR, frontWheelL);

    // Axle accents
    const axleMat = new THREE.MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 0.4 });
    const axleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.9, 8);

    const rearAxle = new THREE.Mesh(axleGeo, axleMat);
    rearAxle.position.set(-0.85, 0, 0);
    rearAxle.rotation.x = Math.PI / 2;
    tractorGroup.add(rearAxle);

    const frontAxle = new THREE.Mesh(axleGeo, axleMat);
    frontAxle.position.set(1.05, 0, 0);
    frontAxle.rotation.x = Math.PI / 2;
    frontAxle.scale.z = 0.7;
    tractorGroup.add(frontAxle);

    scene.add(tractorGroup);
    tractorGroup.position.y = 0.85;

    // ── Ground grid ──────────────────────────────────────────────────────────

    const gridHelper = new THREE.GridHelper(20, 24, ACCENT, 0x0d2018);
    (gridHelper.material as THREE.Material & { transparent: boolean; opacity: number }).transparent = true;
    (gridHelper.material as THREE.Material & { transparent: boolean; opacity: number }).opacity = 0.25;
    scene.add(gridHelper);

    // Ground plane (shadow receiver)
    const groundGeo = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.MeshStandardMaterial({ color: DARK, transparent: true, opacity: 0 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // ── Particles ────────────────────────────────────────────────────────────

    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = Math.random() * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: ACCENT,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    scene.add(new THREE.Points(particleGeo, particleMat));

    // ── Lights ───────────────────────────────────────────────────────────────

    const ambient = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const accentLight = new THREE.PointLight(ACCENT, 3, 8);
    accentLight.position.set(-2, 2.5, 2);
    scene.add(accentLight);

    const rimLight = new THREE.DirectionalLight(0x003322, 1.5);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    // ── Mouse interaction ────────────────────────────────────────────────────

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / height - 0.5) * 2;
    };
    mount.addEventListener('mousemove', handleMouseMove);

    // ── Resize ───────────────────────────────────────────────────────────────

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ── Animation loop ───────────────────────────────────────────────────────

    let frame = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame += 0.012;

      // Slow Y-rotation + subtle mouse parallax
      tractorGroup.rotation.y = frame * 0.4 + mouseX * 0.25;
      tractorGroup.position.y = 0.85 + Math.sin(frame * 0.6) * 0.08;

      // Wheel spin
      const wheelSpin = frame * 1.8;
      ;[rearWheelR, rearWheelL, frontWheelR, frontWheelL].forEach((w) => {
        w.rotation.y = -wheelSpin;
      });

      // Exhaust glow pulse
      glowRingMat.opacity = 0.4 + Math.sin(frame * 3) * 0.3;

      // Accent light pulse
      accentLight.intensity = 2.5 + Math.sin(frame * 1.2) * 0.8;

      // Particles drift
      const pos = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] -= 0.005;
        if (pos[i * 3 + 1] < 0) pos[i * 3 + 1] = 6;
      }
      particleGeo.attributes.position.needsUpdate = true;

      camera.position.x = 6 + mouseX * 0.5;
      camera.position.y = 4 + mouseY * 0.3;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
