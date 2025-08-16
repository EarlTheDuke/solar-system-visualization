import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Color } from 'three'
import { getScaledRadius } from '../data/planets'

interface AmazingSunProps {
  sunData: any
}

export default function AmazingSun({ sunData }: AmazingSunProps) {
  const sunRef = useRef<Mesh>(null!)
  const glowRef = useRef<Mesh>(null!)
  const coronaRef = useRef<Mesh>(null!)
  
  useFrame((state) => {
    if (!sunRef.current) return
    
    // Sun rotation
    sunRef.current.rotation.y += 0.005
    
    // Pulsing glow effect
    if (glowRef.current) {
      const glowIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.2
      glowRef.current.material.opacity = glowIntensity
      glowRef.current.scale.setScalar(1.0 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05)
    }
    
    // Corona effect
    if (coronaRef.current) {
      coronaRef.current.rotation.y -= 0.002
      const coronaIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 1.2) * 0.1
      coronaRef.current.material.opacity = coronaIntensity
    }
  })

  const radius = getScaledRadius(sunData)
  const sunColor = new Color('#FDB813')
  
  return (
    <group position={[0, 0, 0]}>
      {/* Main Sun */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial 
          color={sunColor}
          emissive={sunColor}
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Inner Glow */}
      <mesh ref={glowRef} scale={1.1}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial 
          color="#FFD700" 
          transparent 
          opacity={0.6}
        />
      </mesh>
      
      {/* Outer Glow */}
      <mesh scale={1.3}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial 
          color="#FFA500" 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      {/* Corona */}
      <mesh ref={coronaRef} scale={1.6}>
        <sphereGeometry args={[radius, 12, 12]} />
        <meshBasicMaterial 
          color="#FF6B35" 
          transparent 
          opacity={0.2}
        />
      </mesh>
      
      {/* Solar flares effect */}
      <mesh scale={2.0}>
        <sphereGeometry args={[radius, 8, 8]} />
        <meshBasicMaterial 
          color="#FF4500" 
          transparent 
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}
