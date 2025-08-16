import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Mesh } from 'three'
import { solarSystemData, getScaledRadius, getOrbitalSpeed } from '../data/planets'
import Planet from './Planet'

function Sun() {
  const sunRef = useRef<Mesh>(null!)
  
  useFrame((state) => {
    // Rotate the sun slowly
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005
    }
  })

  const sunData = solarSystemData.find(p => p.name === 'Sun')!
  
  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[getScaledRadius(sunData), 32, 32]} />
      <meshBasicMaterial 
        color="#FDB813" 
        emissive="#FDB813" 
        emissiveIntensity={0.6}
        toneMapped={false}
      />
      {/* Sun glow effect */}
      <mesh scale={1.2}>
        <sphereGeometry args={[getScaledRadius(sunData), 16, 16]} />
        <meshBasicMaterial 
          color="#FDB813" 
          transparent 
          opacity={0.1}
          emissive="#FDB813"
          emissiveIntensity={0.3}
        />
      </mesh>
    </mesh>
  )
}

function OrbitingPlanets() {
  const planets = solarSystemData.filter(planet => planet.name !== 'Sun')
  
  return (
    <>
      {planets.map((planetData) => (
        <Planet 
          key={planetData.name} 
          planetData={planetData} 
        />
      ))}
    </>
  )
}

export default function Scene() {
  return (
    <>
      {/* Stars background */}
      <Stars 
        radius={300} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.1} color="#ffffff" />
      
      {/* Directional light from the sun */}
      <directionalLight 
        position={[0, 0, 0]} 
        intensity={2} 
        color="#FDB813"
        castShadow
      />
      
      {/* Point light at sun position for better illumination */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={3} 
        color="#FDB813" 
        distance={100}
        decay={2}
      />
      
      {/* The Sun */}
      <Sun />
      
      {/* Orbiting Planets */}
      <OrbitingPlanets />
    </>
  )
}
