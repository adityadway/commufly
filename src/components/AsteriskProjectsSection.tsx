import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import video16by9 from '../assets/scroll/16by9.mp4';
import video9by16 from '../assets/scroll/9by16.mp4';

const AsteriskProjectsSection: React.FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // States for responsive video and active sections
  const [activeSection, setActiveSection] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [parentHeight, setParentHeight] = useState('700vh');
  const [videoSrc, setVideoSrc] = useState(window.innerWidth <= 768 ? video9by16 : video16by9);

  // Mobile autoplay refs
  const mobileVideoPlayedRef = useRef(false);
  const isMobileRef = useRef(window.innerWidth <= 768);
  const isScrollLockedRef = useRef(false);

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const proceduralGroupRef = useRef<THREE.Group | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  // Animation state refs to avoid re-renders on every scroll/frame
  const stateRef = useRef({
    targetX: 0.0,
    targetY: 8.0,
    targetScrollRotationX: 0,
    scrollRotationX: 0,
    targetScrollRotationY: 0,
    scrollRotationY: 0,
    targetScrollRotationZ: 0,
    scrollRotationZ: 0,
    targetVideoTime: 0,
    currentVideoTime: 0,
    baseGroupX: 0.0,
    baseGroupY: 8.0,
    mouseX: 0,
    mouseY: 0,
    mouseRotationX: 0,
    mouseRotationY: 0,
    mouseOffsetX: 0,
    mouseOffsetY: 0,
  });

  // Check window size on mount/resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      isMobileRef.current = mobile;
      setVideoSrc(mobile ? video9by16 : video16by9);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Force load the video whenever the source changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.load();

      const initVideo = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            video.pause();
          }).catch(error => {
            console.log("User interaction video play prevented:", error);
          });
        }
        // Clean up listeners immediately
        window.removeEventListener('touchstart', initVideo);
        window.removeEventListener('scroll', initVideo);
        window.removeEventListener('click', initVideo);
      };

      window.addEventListener('touchstart', initVideo, { passive: true });
      window.addEventListener('scroll', initVideo, { passive: true });
      window.addEventListener('click', initVideo);

      return () => {
        window.removeEventListener('touchstart', initVideo);
        window.removeEventListener('scroll', initVideo);
        window.removeEventListener('click', initVideo);
      };
    }
  }, [videoSrc]);

  // Listen to video ended event to unlock scroll on mobile
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (isMobileRef.current) {
        isScrollLockedRef.current = false;
      }
    };

    const preventScroll = (e: TouchEvent) => {
      if (isScrollLockedRef.current) {
        e.preventDefault();
      }
    };

    video.addEventListener('ended', handleEnded);
    window.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      video.removeEventListener('ended', handleEnded);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [videoSrc]);

  // Update Section 5 Height dynamically based on video duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const calculateHeights = () => {
      const vh = window.innerHeight;
      const duration = video.duration || 5; // Fallback to 5 seconds
      const pixelsPerSecond = window.innerWidth <= 768 ? 400 : 1500;
      const scrubHeight = duration * pixelsPerSecond;
      // 4 sections of 100vh (0 to 3) + Phase A (100vh slide-up) + Phase B (100vh zoom) + scrubHeight
      const total = 6 * vh + scrubHeight;
      setParentHeight(`${total}px`);

      // Guarantee pause after metadata loads
      video.pause();

      // Update max scale variable in CSS
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const gap = viewportWidth <= 900 ? 8 : 15;
      const padding = viewportWidth <= 900 ? 8 : 0;

      const gridWidth = viewportWidth - 2 * padding;
      const gridHeight = viewportHeight - 2 * padding;

      const colWidth = (gridWidth - 3 * gap) / 4;
      const itemWidth = colWidth * 2 + gap;

      const rowHeight = (gridHeight - 2 * gap) / 3;
      const itemHeight = rowHeight;

      const scaleX = viewportWidth / itemWidth;
      const scaleY = viewportHeight / itemHeight;
      const maxScale = Math.max(scaleX, scaleY);

      document.documentElement.style.setProperty('--max-scale', maxScale.toString());
    };

    if (video.readyState >= 1) {
      calculateHeights();
    } else {
      video.addEventListener('loadedmetadata', calculateHeights);
    }

    window.addEventListener('resize', calculateHeights);

    return () => {
      video.removeEventListener('loadedmetadata', calculateHeights);
      window.removeEventListener('resize', calculateHeights);
    };
  }, [videoSrc]);

  // Mouse move parallax listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      stateRef.current.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#030406', 0.02);
    sceneRef.current = scene;

    // Sizing with fallbacks
    const widthVal = container.clientWidth || window.innerWidth;
    const heightVal = container.clientHeight || window.innerHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, widthVal / heightVal, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(widthVal, heightVal);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.45);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight('#ffffff', 1.8);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    const whiteLight1 = new THREE.PointLight('#ffffff', 4, 12);
    whiteLight1.position.set(-4, 2, -3);
    scene.add(whiteLight1);

    const whiteLight2 = new THREE.PointLight('#ffffff', 3, 12);
    whiteLight2.position.set(4, -3, 3);
    scene.add(whiteLight2);

    // Model Group
    const modelGroup = new THREE.Group();
    modelGroup.position.y = 8.0;
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Build Asterisk
    const proceduralMeshGroup = new THREE.Group();
    const width = 0.33;
    const thickness = 0.19;
    const length = 1.47;
    const angles = [0, Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4];
    const meshes: THREE.Mesh[] = [];

    angles.forEach((angle) => {
      const geometry = new THREE.BoxGeometry(width, length, thickness);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffffff'),
        roughness: 0.6,
        metalness: 0.0
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.z = angle;
      mesh.castShadow = true;
      mesh.receiveShadow = false;

      proceduralMeshGroup.add(mesh);
      meshes.push(mesh);
    });

    modelGroup.add(proceduralMeshGroup);
    proceduralGroupRef.current = proceduralMeshGroup;
    meshesRef.current = meshes;

    // Resize handler for Three.js
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !canvasContainerRef.current) return;
      const w = canvasContainerRef.current.clientWidth || window.innerWidth;
      const h = canvasContainerRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const animState = stateRef.current;

      // Smooth interpolations
      animState.baseGroupX = THREE.MathUtils.lerp(animState.baseGroupX, animState.targetX, 0.07);
      animState.baseGroupY = THREE.MathUtils.lerp(animState.baseGroupY, animState.targetY, 0.07);

      const targetRotX = -animState.mouseY * 0.15;
      const targetRotY = animState.mouseX * 0.15;
      animState.mouseRotationX = THREE.MathUtils.lerp(animState.mouseRotationX, targetRotX, 0.05);
      animState.mouseRotationY = THREE.MathUtils.lerp(animState.mouseRotationY, targetRotY, 0.05);

      const targetOffsetX = animState.mouseX * 0.15;
      const targetOffsetY = animState.mouseY * 0.15;
      animState.mouseOffsetX = THREE.MathUtils.lerp(animState.mouseOffsetX, targetOffsetX, 0.05);
      animState.mouseOffsetY = THREE.MathUtils.lerp(animState.mouseOffsetY, targetOffsetY, 0.05);

      if (modelGroupRef.current) {
        modelGroupRef.current.position.x = animState.baseGroupX + animState.mouseOffsetX;
        modelGroupRef.current.position.y = animState.baseGroupY + animState.mouseOffsetY;

        animState.scrollRotationX = THREE.MathUtils.lerp(animState.scrollRotationX, animState.targetScrollRotationX, 0.07);
        animState.scrollRotationY = THREE.MathUtils.lerp(animState.scrollRotationY, animState.targetScrollRotationY, 0.07);
        animState.scrollRotationZ = THREE.MathUtils.lerp(animState.scrollRotationZ, animState.targetScrollRotationZ, 0.07);

        modelGroupRef.current.rotation.x = animState.scrollRotationX + animState.mouseRotationX;
        modelGroupRef.current.rotation.y = animState.scrollRotationY + animState.mouseRotationY;
        modelGroupRef.current.rotation.z = animState.scrollRotationZ;
      }

      if (proceduralGroupRef.current) {
        proceduralGroupRef.current.rotation.y += 0.003;
      }

      // Video Scrubbing (Desktop only)
      const video = videoRef.current;
      if (video && video.readyState >= 1 && !isNaN(video.duration)) {
        if (!isMobileRef.current) {
          if (!video.paused) {
            video.pause();
          }
          animState.currentVideoTime = THREE.MathUtils.lerp(animState.currentVideoTime, animState.targetVideoTime, 0.08);
          if (Math.abs(video.currentTime - animState.currentVideoTime) > 0.01) {
            video.currentTime = animState.currentVideoTime;
          }
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Dispose geometries & materials
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose());
        } else {
          mesh.material.dispose();
        }
      });
    };
  }, []);

  // Window scroll event listener to link to animation progress
  useEffect(() => {
    const handleScroll = () => {
      const parent = parentRef.current;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const clientHeight = window.innerHeight;

      // Calculate how far down the section has scrolled relative to the top of the parent
      // When top of parent is at top of viewport, scrollLocal = 0.
      const scrollLocal = -rect.top;

      if (scrollLocal < -clientHeight || scrollLocal > rect.height + clientHeight) {
        return; // Far away, do nothing
      }
      const sectionScrollProgress = scrollLocal / clientHeight;

      // 1. Asterisk entrance animation (runs as the section enters the viewport, from -clientHeight to 0)
      const entryProgress = Math.min(Math.max((scrollLocal + clientHeight) / clientHeight, 0), 1.0);

      const animState = stateRef.current;
      animState.targetY = THREE.MathUtils.lerp(8.0, 0.0, entryProgress);

      // Set targetX (flying disk exit to left)
      let posX = 0.0;
      if (sectionScrollProgress > 2.0) {
        const exitFactor = Math.min(sectionScrollProgress - 2.0, 1.0);
        posX = exitFactor * -12.0;
      }
      animState.targetX = posX;

      // 2. Set scroll rotation targets per section
      let targetRotX = 0;
      let targetRotY = 0;
      let targetRotZ = 0;

      if (sectionScrollProgress <= 1.0) {
        // Section 0 -> 1: Y rotation (left-right)
        targetRotY = Math.max(0, sectionScrollProgress) * 2 * Math.PI;
      } else if (sectionScrollProgress <= 2.0) {
        // Section 1 -> 2: Z rotation
        targetRotY = 2 * Math.PI;
        targetRotZ = (sectionScrollProgress - 1.0) * 2 * Math.PI;
      } else {
        // Section 2 onwards
        targetRotY = 2 * Math.PI;
        targetRotZ = 2 * Math.PI + (sectionScrollProgress - 2.0) * 2 * Math.PI;
      }

      animState.targetScrollRotationX = targetRotX;
      animState.targetScrollRotationY = targetRotY;
      animState.targetScrollRotationZ = targetRotZ;

      // 3. Gallery entrance and Zoom progress calculations
      const galleryEntranceStart = 4 * clientHeight;
      const zoomStart = 5 * clientHeight;
      
      // Gallery entrance progress (slide up) from 4vh to 5vh
      if (scrollLocal >= galleryEntranceStart) {
        const entranceProgress = Math.min((scrollLocal - galleryEntranceStart) / clientHeight, 1.0);
        document.documentElement.style.setProperty('--gallery-entrance', entranceProgress.toString());
      } else {
        document.documentElement.style.setProperty('--gallery-entrance', '0');
      }

      // Zoom progress from 5vh to 6vh
      if (scrollLocal >= zoomStart) {
        const zoomProgress = Math.min((scrollLocal - zoomStart) / clientHeight, 1.0);
        document.documentElement.style.setProperty('--zoom-progress', zoomProgress.toString());
      } else {
        document.documentElement.style.setProperty('--zoom-progress', '0');
      }

      // 4. Update active section for slides background crossfade
      let currentSection = 0;
      if (scrollLocal >= galleryEntranceStart) {
        currentSection = 4;
      } else {
        currentSection = Math.min(4, Math.max(0, Math.floor(scrollLocal / clientHeight)));
      }
      setActiveSection(currentSection);

      // Slide background changes evenly up to the gallery entrance (every 1.0 * clientHeight)
      const slideIndex = Math.min(3, Math.max(0, Math.floor(scrollLocal / (clientHeight * 1.0))));
      setBgIndex(slideIndex);

      // 5. Update scroll-linked video time (Desktop) or handle mobile lock-scroll autoplay
      const video = videoRef.current;
      if (video) {
        const videoScrubStart = 6 * clientHeight; // Start scrubbing after 100vh slide-up + 100vh zoom
        
        if (isMobileRef.current) {
          // Mobile logic: Autoplay video and block scrolling
          if (scrollLocal >= videoScrubStart && !mobileVideoPlayedRef.current) {
            // Block scrolling via ref and touchmove event prevention
            isScrollLockedRef.current = true;
            
            // Play video from start
            video.currentTime = 0;
            video.play().catch(err => console.log("Mobile autoplay failed:", err));
            
            mobileVideoPlayedRef.current = true;
          } else if (scrollLocal < videoScrubStart) {
            // Reset mobile video state if scrolled back up
            if (mobileVideoPlayedRef.current) {
              mobileVideoPlayedRef.current = false;
              video.pause();
              video.currentTime = 0;
              isScrollLockedRef.current = false;
            }
          }
        } else {
          // Desktop logic: scrub-linked time
          if (video.readyState >= 1 && !isNaN(video.duration)) {
            const videoScrubEnd = rect.height;
            let videoFraction = 0;
            if (scrollLocal > videoScrubStart) {
              const scrubRange = videoScrubEnd - videoScrubStart;
              videoFraction = Math.min(Math.max((scrollLocal - videoScrubStart) / scrubRange, 0), 1.0);
            }
            animState.targetVideoTime = videoFraction * video.duration;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [parentHeight]);

  // Helper for background active class
  const getSlideClass = (idx: number) => {
    return bgIndex === idx ? 'bg-slide active' : 'bg-slide';
  };

  return (
    <div 
      ref={parentRef} 
      className="projects-scroll-wrapper" 
      style={{ height: parentHeight, position: 'relative', width: '100%' }}
    >
      <div ref={containerRef} className="projects-sticky-container">
        {/* Grain Overlay */}
        <div id="grain-overlay" className="grain"></div>

        {/* Fixed Background Slideshow */}
        <div id="bg-slideshow">
          <div className={getSlideClass(0)} style={{ backgroundImage: "url('/proto/protto3.png')" }}></div>
          <div className={getSlideClass(1)} style={{ backgroundImage: "url('/proto/protto10.png')" }}></div>
          <div className={getSlideClass(2)} style={{ backgroundImage: "url('/proto/protto17.png')" }}></div>
          <div className={getSlideClass(3)} style={{ backgroundImage: "url('/proto/protto20.png')" }}></div>
          <div className="bg-overlay"></div>
        </div>

        {/* Fixed 3D Viewport */}
        <div id="canvas-container" ref={canvasContainerRef}></div>

        {/* Symmetrical Grid Gallery - Always rendered but toggled by CSS properties to preserve video element */}
        <div 
          id="gallery-container"
          style={{
            visibility: activeSection >= 4 ? 'visible' : 'hidden',
            pointerEvents: activeSection >= 4 ? 'auto' : 'none',
          }}
        >
          <div className="gallery-item item-1">
            <img src="/proto/protto1.png" alt="Structural Node Layout" />
          </div>
          <div className="gallery-item item-2">
            <img src="/proto/protto5.png" alt="Cybernetic Telemetry" />
          </div>
          <div className="gallery-item item-3">
            <img src="/proto/protto8.png" alt="Network Grid Node" />
          </div>
          <div className="gallery-item item-4">
            <video 
              id="scroll-video"
              ref={videoRef}
              src={videoSrc}
              autoPlay
              muted 
              playsInline 
              preload="auto" 
              controls={false}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div className="gallery-item item-5">
            <img src="/proto/protto11.png" alt="Matrix Diagnostics" />
          </div>
          <div className="gallery-item item-6">
            <img src="/proto/protto14.png" alt="Structural Beam Connections" />
          </div>
          <div className="gallery-item item-7">
            <img src="/proto/protto18.png" alt="QNN Architecture Map" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsteriskProjectsSection;
