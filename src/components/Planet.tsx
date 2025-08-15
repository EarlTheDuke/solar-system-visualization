import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PlanetData } from '../data/planets';

interface PlanetProps {
  data: PlanetData;
  onClick?: () => void;
}

export default function Planet({ data, onClick }: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbitRef.current) {
      // Orbital motion - faster for closer planets
      const orbitalSpeed = 0.01 / Math.sqrt(data.distance);
      orbitRef.current.rotation.y += orbitalSpeed;
    }
    
    if (planetRef.current) {
      // Planet rotation
      const rotationSpeed = data.rotationPeriod > 0 ? 0.01 / (data.rotationPeriod / 24) : -0.01 / (Math.abs(data.rotationPeriod) / 24);
      planetRef.current.rotation.y += rotationSpeed;
    }
  });

  // Scale planet size for visibility (logarithmic scaling)
  const scaledRadius = Math.max(0.1, Math.log(data.radius + 1) * 0.5);
  // Scale distance for visibility
  const scaledDistance = data.distance * 8 + 5;

  return (
    <group ref={orbitRef}>
      {/* Orbit path visualization */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[scaledDistance - 0.02, scaledDistance + 0.02, 64]} />
        <meshBasicMaterial 
          color="#444444" 
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Planet */}
      <mesh 
        ref={planetRef}
        position={[scaledDistance, 0, 0]}
        onClick={onClick}
      >
        <sphereGeometry args={[scaledRadius, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Planet name label */}
      <group position={[scaledDistance, scaledRadius + 0.5, 0]}>
        <mesh>
          <planeGeometry args={[2, 0.3]} />
          <meshBasicMaterial 
            color="#000000" 
            transparent 
            opacity={0.7}
          />
        </mesh>
      </group>
    </group>
  );
}
