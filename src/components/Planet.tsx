import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Planet as PlanetData, getScaledRadius, getOrbitalSpeed, getRotationSpeed } from '../data/planets'

interface PlanetProps {
  planetData: PlanetData
}

export default function Planet({ planetData }: PlanetProps) {
  const meshRef = useRef<Mesh>(null!)
  const orbitRef = useRef<Mesh>(null!)
  
  useFrame((state) => {
    if (!meshRef.current || !orbitRef.current) return
    
    // Calculate orbital animation
    const time = Date.now() * 0.001 // Convert to seconds
    const orbitalSpeed = getOrbitalSpeed(planetData)
    const rotationSpeed = getRotationSpeed(planetData)
    
    // Circular orbit calculation (simplified from elliptical)
    const angle = time * orbitalSpeed
    const distance = planetData.distanceFromSun * 10 // Scale up for visibility
    
    // Update orbital position
    orbitRef.current.position.x = distance * Math.cos(angle)
    orbitRef.current.position.z = distance * Math.sin(angle)
    
    // Planet self-rotation
    meshRef.current.rotation.y += rotationSpeed
  })

  const radius = getScaledRadius(planetData)
  
  return (
    <group ref={orbitRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial 
          color={planetData.color}
          emissive={planetData.color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Render rings for planets that have them */}
      {planetData.hasRings && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.5, radius * 2.5, 32]} />
          <meshStandardMaterial 
            color="#888888" 
            transparent 
            opacity={0.6}
            side={2} // DoubleSide
          />
        </mesh>
      )}
      
      {/* Debug: Show orbit path (optional - can be removed) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planetData.distanceFromSun * 10 - 0.1, planetData.distanceFromSun * 10 + 0.1, 64]} />
        <meshBasicMaterial 
          color="#333333" 
          transparent 
          opacity={0.1}
          side={2}
        />
      </mesh>
    </group>
  )
}
