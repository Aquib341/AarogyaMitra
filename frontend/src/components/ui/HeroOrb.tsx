import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";

function Orb() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    // Subtle rotation
    meshRef.current.rotation.y = time * 0.1;
    // Mouse interaction (parallax)
    const { x, y } = state.pointer;
    meshRef.current.rotation.x = -y * 0.2;
    meshRef.current.rotation.z = x * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1, 100, 100]} scale={2} ref={meshRef}> {/* Reduced scale slightly for better fit */}
        <MeshDistortMaterial
          color="#CCFBF1" // Soft Teal
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.1}
          transmission={0.8} // Glass-like
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroOrb() {
  return (
    <div className="absolute inset-0 -z-0 h-full w-full opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} color="#06B6D4" />
        <Orb />
      </Canvas>
    </div>
  );
}
