import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sunRef.current) {
      // Slow rotation
      sunRef.current.rotation.y += 0.005;
    }
    
    if (glowRef.current) {
      // Subtle glow animation
      const time = state.clock.getElapsedTime();
      glowRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    }
  });

  return (
    <group>
      {/* Main sun body */}
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={0.4}
          roughness={1}
          metalness={0}
        />
      </mesh>
      
      {/* Outer glow effect */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#FDB813"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#FFE135"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Point light for illumination */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={3} 
        color="#FDB813" 
        distance={100}
        decay={2}
      />
      
      {/* Additional warm light */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={1} 
        color="#FFE135" 
        distance={50}
        decay={1}
      />
    </group>
  );
}
