"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Float,
  Text,
  Sparkles,
  Stars
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// Animation phases
type AnimationPhase = 
  | "ready" 
  | "ball_approach" 
  | "swing" 
  | "impact" 
  | "follow_through" 
  | "six" 
  | "complete";

interface HelicopterShotSceneProps {
  isActive: boolean;
  onAnimationComplete?: () => void;
  onBallApproach?: () => void;
  onSwingStart?: () => void;
  onImpact?: () => void;
  onSix?: () => void;
}

// Black silhouette batter component
function BatterSilhouette({ phase }: { phase: AnimationPhase }) {
  const groupRef = useRef<THREE.Group>(null);
  const batRef = useRef<THREE.Group>(null);
  const [swingProgress, setSwingProgress] = useState(0);
  
  // Memoize geometries for performance
  const bodyGeometry = useMemo(() => new THREE.CylinderGeometry(0.25, 0.3, 0.9, 8), []);
  const headGeometry = useMemo(() => new THREE.SphereGeometry(0.18, 16, 16), []);
  const helmetGeometry = useMemo(() => new THREE.SphereGeometry(0.2, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), []);
  const armGeometry = useMemo(() => new THREE.CylinderGeometry(0.06, 0.07, 0.5, 8), []);
  const gloveGeometry = useMemo(() => new THREE.BoxGeometry(0.1, 0.12, 0.08), []);
  const legGeometry = useMemo(() => new THREE.CylinderGeometry(0.1, 0.08, 0.7, 8), []);
  const padGeometry = useMemo(() => new THREE.BoxGeometry(0.15, 0.35, 0.08), []);
  const batHandleGeometry = useMemo(() => new THREE.CylinderGeometry(0.03, 0.035, 0.25, 8), []);
  const batBladeGeometry = useMemo(() => new THREE.BoxGeometry(0.12, 0.7, 0.04), []);
  
  // Memoize materials for performance
  const blackMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0a0a0a", roughness: 0.9, metalness: 0.1 }), []);
  const helmetMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0a0a0a", roughness: 0.8, metalness: 0.2 }), []);
  const gloveMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0a0a0a", roughness: 0.8, metalness: 0.15 }), []);
  const padMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#0a0a0a", roughness: 0.85, metalness: 0.1 }), []);
  const batHandleMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.7, metalness: 0.1 }), []);
  const batBladeMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2a1a0a", roughness: 0.6, metalness: 0.05 }), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Subtle breathing motion in ready phase
    if (phase === "ready") {
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.02;
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.02;
    }

    // Swing animation
    if (phase === "swing" || phase === "impact" || phase === "follow_through") {
      setSwingProgress((prev) => {
        const next = prev + delta * 2.5;
        return Math.min(next, 1);
      });

      const progress = swingProgress;
      
      // Body rotation - lower body initiates first
      if (batRef.current) {
        // Hip rotation
        groupRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 0.8, progress);
        
        // Torso follows with slight delay
        groupRef.current.children[0].rotation.y = THREE.MathUtils.lerp(0, Math.PI * 0.6, progress * 0.9);
        
        // Bat helicopter motion
        if (phase === "follow_through") {
          batRef.current.rotation.z = THREE.MathUtils.lerp(0, Math.PI * 2.5, progress);
          batRef.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 0.3, progress);
        } else {
          batRef.current.rotation.z = THREE.MathUtils.lerp(0, Math.PI * 0.8, progress);
          batRef.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 0.15, progress);
        }
      }
    }

    // Return to finish pose
    if (phase === "six" || phase === "complete") {
      if (batRef.current) {
        batRef.current.rotation.z = THREE.MathUtils.lerp(batRef.current.rotation.z, Math.PI * 2.5, delta * 2);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, Math.PI * 0.8, delta * 2);
      }
    }
  });

  // Reset swing progress when phase changes
  useEffect(() => {
    if (phase === "swing") {
      setSwingProgress(0);
    }
  }, [phase]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Torso */}
      <mesh castShadow geometry={bodyGeometry} material={blackMaterial} />

      {/* Head with helmet */}
      <group position={[0, 0.6, 0]}>
        <mesh castShadow geometry={headGeometry} material={blackMaterial} />
        {/* Helmet dome */}
        <mesh position={[0, 0.05, 0]} castShadow geometry={helmetGeometry} material={helmetMaterial} />
      </group>

      {/* Left arm */}
      <group position={[-0.35, 0.3, 0]}>
        <mesh castShadow geometry={armGeometry} material={blackMaterial} />
        {/* Glove */}
        <mesh position={[0, -0.28, 0]} castShadow geometry={gloveGeometry} material={gloveMaterial} />
      </group>

      {/* Right arm with bat */}
      <group position={[0.35, 0.3, 0]}>
        <mesh castShadow geometry={armGeometry} material={blackMaterial} />
        {/* Glove */}
        <mesh position={[0, -0.28, 0]} castShadow geometry={gloveGeometry} material={gloveMaterial} />
        
        {/* Bat */}
        <group ref={batRef} position={[0, -0.5, 0.1]} rotation={[0, 0, -0.3]}>
          {/* Bat handle */}
          <mesh position={[0, 0.35, 0]} castShadow geometry={batHandleGeometry} material={batHandleMaterial} />
          {/* Bat blade */}
          <mesh position={[0, 0.1, 0]} castShadow geometry={batBladeGeometry} material={batBladeMaterial} />
        </group>
      </group>

      {/* Legs */}
      <group position={[-0.12, -0.55, 0]}>
        <mesh castShadow geometry={legGeometry} material={blackMaterial} />
        {/* Pad */}
        <mesh position={[0.05, -0.2, 0]} castShadow geometry={padGeometry} material={padMaterial} />
      </group>

      <group position={[0.12, -0.55, 0]}>
        <mesh castShadow geometry={legGeometry} material={blackMaterial} />
        {/* Pad */}
        <mesh position={[0.05, -0.2, 0]} castShadow geometry={padGeometry} material={padMaterial} />
      </group>
    </group>
  );
}

// Cricket ball with trail
function CricketBall({ phase }: { phase: AnimationPhase }) {
  const ballRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Group>(null);
  const [ballPosition, setBallPosition] = useState<[number, number, number]>([2, 1.2, -2]);
  const [trailPositions, setTrailPositions] = useState<THREE.Vector3[]>([]);
  
  // Memoize ball geometry and material
  const ballGeometry = useMemo(() => new THREE.SphereGeometry(0.05, 16, 16), []);
  const ballMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#c41e3a", roughness: 0.4, metalness: 0.3 }), []);
  const trailGeometry = useMemo(() => new THREE.SphereGeometry(0.04, 8, 8), []);
  const trailMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#c41e3a", transparent: true, opacity: 0.3, emissive: "#c41e3a", emissiveIntensity: 0.5 }), []);

  useFrame((state, delta) => {
    if (!ballRef.current) return;

    const time = state.clock.getElapsedTime();

    if (phase === "ball_approach") {
      // Ball approaches batter
      const progress = (time % 2) / 2;
      setBallPosition([
        THREE.MathUtils.lerp(2, 0.5, progress),
        THREE.MathUtils.lerp(1.2, 1.0, progress),
        THREE.MathUtils.lerp(-2, 0.5, progress)
      ]);
      
      // Add trail
      if (trailPositions.length < 10) {
        setTrailPositions(prev => [...prev, new THREE.Vector3(...ballPosition)]);
      }
    } else if (phase === "swing" || phase === "impact") {
      setBallPosition([0.5, 1.0, 0.5]);
    } else if (phase === "follow_through" || phase === "six") {
      // Ball launches upward
      const launchProgress = phase === "six" ? Math.min((time % 3) / 3, 1) : 0;
      setBallPosition([
        THREE.MathUtils.lerp(0.5, 1.5, launchProgress),
        THREE.MathUtils.lerp(1.0, 4, launchProgress),
        THREE.MathUtils.lerp(0.5, -1, launchProgress)
      ]);
      
      // Trail during launch
      if (launchProgress > 0 && trailPositions.length < 15) {
        setTrailPositions(prev => [...prev, new THREE.Vector3(...ballPosition)]);
      }
    } else if (phase === "ready") {
      setBallPosition([2, 1.2, -2]);
      setTrailPositions([]);
    }

    ballRef.current.position.set(...ballPosition);
  });

  // Reset ball position
  useEffect(() => {
    if (phase === "ready") {
      setBallPosition([2, 1.2, -2]);
      setTrailPositions([]);
    }
  }, [phase]);

  return (
    <group>
      {/* Ball trail */}
      {trailPositions.map((pos, i) => (
        <mesh key={i} position={pos} scale={0.5 - i * 0.03} geometry={trailGeometry}>
          <meshStandardMaterial 
            color="#c41e3a" 
            transparent 
            opacity={0.3 - i * 0.02} 
            emissive="#c41e3a" 
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      
      {/* Main ball */}
      <mesh ref={ballRef} castShadow geometry={ballGeometry} material={ballMaterial} />
    </group>
  );
}

// Cinematic camera controller
function CameraController({ phase }: { phase: AnimationPhase }) {
  const { camera } = useThree();
  const [targetPosition, setTargetPosition] = useState([4, 2, 4]);
  const [targetLookAt, setTargetLookAt] = useState([0, 0.5, 0]);

  useFrame((state, delta) => {
    // Smooth camera movement
    camera.position.lerp(new THREE.Vector3(...targetPosition), delta * 2);
    
    const lookAt = new THREE.Vector3(...targetLookAt);
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    camera.lookAt(lookAt);
  });

  useEffect(() => {
    switch (phase) {
      case "ready":
        setTargetPosition([4, 2, 4]);
        setTargetLookAt([0, 0.5, 0]);
        break;
      case "ball_approach":
        setTargetPosition([3, 1.5, 3]);
        setTargetLookAt([1, 1, -1]);
        break;
      case "swing":
        setTargetPosition([2.5, 1.8, 2.5]);
        setTargetLookAt([0, 0.8, 0]);
        break;
      case "impact":
        setTargetPosition([2, 1.5, 2]);
        setTargetLookAt([0.5, 1, 0.5]);
        break;
      case "follow_through":
        setTargetPosition([3, 2.5, 3]);
        setTargetLookAt([0, 1, 0]);
        break;
      case "six":
        setTargetPosition([2, 3, 4]);
        setTargetLookAt([1, 2, -0.5]);
        break;
      case "complete":
        setTargetPosition([4, 2, 4]);
        setTargetLookAt([0, 0.5, 0]);
        break;
    }
  }, [phase]);

  return null;
}

// Stadium environment
function StadiumEnvironment() {
  // Memoize geometries and materials for performance
  const groundGeometry = useMemo(() => new THREE.PlaneGeometry(20, 20), []);
  const pitchGeometry = useMemo(() => new THREE.PlaneGeometry(2, 20), []);
  const groundMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.9 }), []);
  const pitchMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2a2a2a", roughness: 0.85 }), []);
  
  // Detect mobile for reduced particle count
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <group>
      {/* Ground/pitch */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow geometry={groundGeometry} material={groundMaterial} />
      
      {/* Pitch strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow geometry={pitchGeometry} material={pitchMaterial} />

      {/* Contact shadows */}
      <ContactShadows 
        position={[0, -0.09, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2} 
        far={5} 
      />

      {/* Ambient particles - reduced count on mobile */}
      <Sparkles 
        count={isMobile ? 15 : 30} 
        scale={[8, 4, 8]} 
        size={0.05} 
        speed={0.5} 
        color="#FDB913"
        opacity={0.3}
      />

      {/* Stars/floodlights in distance - reduced on mobile */}
      <Stars radius={50} depth={50} count={isMobile ? 50 : 100} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

// Cinematic lighting setup
function CinematicLighting() {
  return (
    <group>
      {/* Main stadium backlight (rim light) */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Front fill light */}
      <directionalLight
        position={[5, 2, 5]}
        intensity={0.3}
        color="#4a5568"
      />
      
      {/* Top floodlight */}
      <spotLight
        position={[0, 8, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={1.5}
        color="#FDB913"
        castShadow
      />
      
      {/* Ambient light */}
      <ambientLight intensity={0.2} color="#1a202c" />
      
      {/* Subtle rim light from side */}
      <pointLight
        position={[-3, 2, 0]}
        intensity={0.8}
        color="#FDB913"
        distance={10}
      />
    </group>
  );
}

// SIX text overlay
function SixOverlay({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.2, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div className="text-center">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-7xl sm:text-9xl font-black text-csk-yellow tracking-wider drop-shadow-2xl"
              style={{
                textShadow: "0 0 60px rgba(253, 185, 19, 0.8), 0 0 120px rgba(253, 185, 19, 0.4)"
              }}
            >
              SIX
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl font-mono text-white mt-4 tracking-widest uppercase"
            >
              Helicopter Shot
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Main scene component
function Scene({ phase, onPhaseChange }: { phase: AnimationPhase; onPhaseChange: (p: AnimationPhase) => void }) {
  useEffect(() => {
    // Animation sequence timing
    const timers: NodeJS.Timeout[] = [];
    
    if (phase === "ready") {
      timers.push(setTimeout(() => onPhaseChange("ball_approach"), 1500));
    } else if (phase === "ball_approach") {
      timers.push(setTimeout(() => onPhaseChange("swing"), 1500));
    } else if (phase === "swing") {
      timers.push(setTimeout(() => onPhaseChange("impact"), 800));
    } else if (phase === "impact") {
      timers.push(setTimeout(() => onPhaseChange("follow_through"), 400));
    } else if (phase === "follow_through") {
      timers.push(setTimeout(() => onPhaseChange("six"), 1200));
    } else if (phase === "six") {
      timers.push(setTimeout(() => onPhaseChange("complete"), 2000));
    }

    return () => timers.forEach(t => clearTimeout(t));
  }, [phase, onPhaseChange]);

  return (
    <>
      <CameraController phase={phase} />
      <CinematicLighting />
      <StadiumEnvironment />
      <BatterSilhouette phase={phase} />
      <CricketBall phase={phase} />
      
      {/* Impact flash */}
      {phase === "impact" && (
        <pointLight position={[0.5, 1, 0.5]} intensity={5} color="#ffffff" distance={3} />
      )}
    </>
  );
}

// Main component
export const HelicopterShotScene: React.FC<HelicopterShotSceneProps> = ({
  isActive,
  onAnimationComplete,
  onBallApproach,
  onSwingStart,
  onImpact,
  onSix,
}) => {
  const [phase, setPhase] = useState<AnimationPhase>("ready");
  const [showSix, setShowSix] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handlePhaseChange = useCallback((newPhase: AnimationPhase) => {
    setPhase(newPhase);
    
    // Trigger callbacks
    if (newPhase === "ball_approach" && onBallApproach) onBallApproach();
    if (newPhase === "swing" && onSwingStart) onSwingStart();
    if (newPhase === "impact" && onImpact) onImpact();
    if (newPhase === "six") {
      setShowSix(true);
      if (onSix) onSix();
    }
    if (newPhase === "complete" && onAnimationComplete) {
      setTimeout(() => {
        setShowSix(false);
        onAnimationComplete();
      }, 500);
    }
  }, [onBallApproach, onSwingStart, onImpact, onSix, onAnimationComplete]);

  // Reset when inactive
  useEffect(() => {
    if (!isActive) {
      setPhase("ready");
      setShowSix(false);
    }
  }, [isActive]);

  // Detect mobile for responsive camera
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!isActive) return null;

  if (prefersReducedMotion) {
    // Static pose for reduced motion
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="text-6xl mb-4">🏏</div>
          <h2 className="text-2xl font-bold text-csk-yellow">THE HELICOPTER SHOT</h2>
          <p className="text-slate-400 mt-2">Dhoni's signature finishing masterpiece</p>
        </div>
      </div>
    );
  }

  // Responsive camera settings
  const cameraPosition = isMobile ? [5, 2.5, 5] : [4, 2, 4];
  const cameraFov = isMobile ? 55 : 50;

  return (
    <div className="w-full h-full relative">
      <SixOverlay show={showSix} />
      <Canvas
        camera={{ position: cameraPosition as [number, number, number], fov: cameraFov }}
        shadows
        gl={{ 
          antialias: !isMobile, // Disable antialiasing on mobile for performance
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower DPR on mobile
      >
        <Scene phase={phase} onPhaseChange={handlePhaseChange} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};
