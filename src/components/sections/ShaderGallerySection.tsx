'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useLanguage } from '@/context/LanguageContext';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uMap;
  uniform vec3 uCameraPosition;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec4 tex = texture2D(uMap, vUv);
    vec3 viewDir = normalize(uCameraPosition - vWorldPosition);
    float facing = max(dot(-normalize(vWorldNormal), viewDir), 0.0);
    float falloff = smoothstep(-0.2, 0.5, facing) * 0.45 + 0.42;
    vec3 color = mix(vec3(1.0), tex.rgb * falloff, 0.975) * 1.25;
    gl_FragColor = vec4(color, tex.a);
  }
`;

const GALLERY_IMAGES = [
  '/images/infinite-gallery/1.webp',
  '/images/infinite-gallery/2.webp',
  '/images/infinite-gallery/3.webp',
  '/images/infinite-gallery/4.webp',
  '/images/infinite-gallery/5.webp',
  '/images/infinite-gallery/6.webp',
  '/images/infinite-gallery/7.webp',
  '/images/infinite-gallery/8.webp',
  '/images/infinite-gallery/9.webp',
  '/images/infinite-gallery/10.webp',
  '/images/infinite-gallery/11.webp',
  '/images/infinite-gallery/12.webp',
  '/images/infinite-gallery/13.webp',
  '/images/infinite-gallery/14.webp',
  '/images/infinite-gallery/15.webp',
  '/images/infinite-gallery/16.webp',
  '/images/infinite-gallery/17.webp',
  '/images/infinite-gallery/18.webp',
  '/images/infinite-gallery/19.webp',
  '/images/infinite-gallery/20.webp',
  '/images/infinite-gallery/21.webp',
  '/images/infinite-gallery/22.webp',
  '/images/infinite-gallery/23.webp',
  '/images/infinite-gallery/24.webp',
];

const CONFIG = {
  totalImages: GALLERY_IMAGES.length,
  tilesPerRevolution: 15,
  revolutions: 5,
  startRadius: 5,
  endRadius: 3.5,
  tileHeightRatio: 1.1,
  tileSegments: 24,
  spiralGap: 0.35,
  tileOverlap: 0.005,
  cameraZ: 12,
  cameraSmoothing: 0.075,
  baseRotationSpeed: 0.001,
  scrollRotationMultiplier: 0.0035,
  rotationDecay: 0.9,
  cameraYMultiplier: 0.2,
  parallaxStrength: 0.1,
};

export default function ShaderGallerySection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mount = mountRef.current;
    if (!mount) return;

    let isMobile = window.innerWidth < 1000;
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 15 : CONFIG.cameraZ;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'auto';
    mount.appendChild(renderer.domElement);

    // Textures loading from /images/infinite-gallery
    const textureLoader = new THREE.TextureLoader();
    const textures = GALLERY_IMAGES.map((src) =>
      textureLoader.load(src, (tex) => {
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.generateMipmaps = true;
        if (renderer.capabilities) {
          tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        }
      })
    );

    const cameraPositionUniform = {
      value: new THREE.Vector3(0, 0, camera.position.z),
    };

    // Calculate tile edge coordinates
    const totalTiles = Math.floor(CONFIG.tilesPerRevolution * CONFIG.revolutions);
    const angleStep = (Math.PI * 2) / CONFIG.tilesPerRevolution;
    const tileEdgesY = [0];

    for (let i = 0; i < totalTiles; i++) {
      const progress = i / totalTiles;
      const radius =
        CONFIG.startRadius + (CONFIG.endRadius - CONFIG.startRadius) * progress;
      const arcWidth = (2 * Math.PI * radius) / CONFIG.tilesPerRevolution;
      const tileHeight = arcWidth * CONFIG.tileHeightRatio;
      tileEdgesY.push(
        tileEdgesY[i] - (tileHeight + CONFIG.spiralGap) / CONFIG.tilesPerRevolution
      );
    }

    const spiral = new THREE.Group();
    scene.add(spiral);

    for (let i = 0; i < totalTiles; i++) {
      const progress = i / totalTiles;
      const radius =
        CONFIG.startRadius + (CONFIG.endRadius - CONFIG.startRadius) * progress;
      const arcWidth = (2 * Math.PI * radius) / CONFIG.tilesPerRevolution;
      const tileHeight = arcWidth * CONFIG.tileHeightRatio;
      const tileAngle = arcWidth / radius + CONFIG.tileOverlap;

      const centerY = (tileEdgesY[i] + tileEdgesY[i + 1]) / 2;
      const slope = tileEdgesY[i + 1] - tileEdgesY[i];

      const positions: number[] = [];
      const uvCoords: number[] = [];
      const indices: number[] = [];
      const segments = CONFIG.tileSegments;

      for (let row = 0; row <= 1; row++) {
        for (let col = 0; col <= segments; col++) {
          const angle = (col / segments - 0.5) * tileAngle;
          positions.push(
            Math.sin(angle) * radius,
            (row - 0.5) * tileHeight + (col / segments - 0.5) * slope,
            Math.cos(angle) * radius
          );
          uvCoords.push(col / segments, row);
        }
      }

      for (let col = 0; col < segments; col++) {
        const current = col;
        const below = current + segments + 1;
        indices.push(current, below, current + 1, below, below + 1, current + 1);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvCoords, 2));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uMap: { value: textures[i % textures.length] },
          uCameraPosition: cameraPositionUniform,
        },
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = centerY;

      const tile = new THREE.Group();
      tile.rotation.y = i * angleStep;
      tile.add(mesh);
      spiral.add(tile);
    }

    const spiralHeight = Math.abs(tileEdgesY[totalTiles]);

    // Interactive state
    let spinVelocity = 0;
    let lastScrollY = window.pageYOffset;
    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let isDragging = false;
    let dragStartX = 0;

    const onScroll = () => {
      const currentScrollY = window.pageYOffset;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      spinVelocity += delta * 0.0005;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onWheel = (e: WheelEvent) => {
      spinVelocity += e.deltaY * 0.00008;
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      dragStartX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - dragStartX;
      dragStartX = clientX;
      spinVelocity += deltaX * 0.002;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      isMobile = newWidth < 1000;
      camera.aspect = newWidth / newHeight;
      camera.position.z = isMobile ? 15 : CONFIG.cameraZ;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);

    const domElement = renderer.domElement;
    domElement.addEventListener('wheel', onWheel, { passive: true });
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Cull rendering when outside viewport
      if (rect.bottom < -100 || rect.top > windowHeight + 100) {
        return;
      }

      // Compute scroll progression across the 180vh container
      const totalScrollable = sectionRef.current.offsetHeight - windowHeight;
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / (totalScrollable || 1)));

      camera.position.y +=
        (-(progress * spiralHeight * CONFIG.cameraYMultiplier) - camera.position.y) *
        CONFIG.cameraSmoothing;

      if (!isMobile) {
        smoothX += (mouseX - smoothX) * 0.02;
        smoothY += (mouseY - smoothY) * 0.02;
        spiral.rotation.x = smoothY * CONFIG.parallaxStrength;
        spiral.rotation.z = -smoothX * CONFIG.parallaxStrength * 0.3;
      }

      cameraPositionUniform.value.copy(camera.position);

      spiral.rotation.y += CONFIG.baseRotationSpeed + spinVelocity;
      spinVelocity *= CONFIG.rotationDecay;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      textures.forEach((tex) => tex.dispose());

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((m) => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });

      renderer.dispose();
      if (domElement.parentElement) {
        domElement.parentElement.removeChild(domElement);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[180vh] md:h-[220vh] bg-[#141413] text-[#d2d2d2] overflow-visible border-y border-white/5"
      aria-label="3D Procedural Spiral Image Gallery"
    >
      <div
        ref={mountRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Background Editorial Typography matching shader-gallary */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-16 pointer-events-none select-none z-0">
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#CF4500]">
            <span>{t('• 3D PROCEDURAL SPIRAL ARCHIVE')}</span>
            <span className="hidden sm:inline text-white/50">
              {t('24 HIGH-PRECISION PREVIEWS')}
            </span>
          </div>

          <h2 className="text-[clamp(2.75rem,7.5vw,10.5rem)] font-bold uppercase tracking-[-0.04em] leading-[0.85] text-[#d2d2d2]/25 text-justify break-words font-display">
            {t(
              'Somewhere between structure and disorder new forms quietly start to emerge'
            )}
          </h2>

          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-white/40">
            <span>{t('SCROLL / DRAG TO ROTATE')}</span>
            <span>{t('100% ON-DEVICE GPU')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
