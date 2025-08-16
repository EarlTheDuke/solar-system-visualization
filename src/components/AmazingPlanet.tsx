import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group, Color } from 'three'
import { Planet as PlanetData, Moon, getScaledRadius, getOrbitalSpeed, getRotationSpeed } from '../data/planets'

interface AmazingPlanetProps {
  planetData: PlanetData
}

function PlanetMoon({ moon, planetRadius }: { moon: Moon; planetRadius: number }) {
  const moonRef = useRef<Mesh>(null!)
  const moonOrbitRef = useRef<Group>(null!)
  
  useFrame(() => {
    if (!moonRef.current || !moonOrbitRef.current) return
    
    const time = Date.now() * 0.001
    const moonSpeed = 0.02 / Math.sqrt(moon.orbitalPeriod / 30)
    const angle = time * moonSpeed
    const distance = moon.distance + planetRadius
    
    // Moon orbital position
    moonOrbitRef.current.position.x = distance * Math.cos(angle)
    moonOrbitRef.current.position.z = distance * Math.sin(angle)
    
    // Moon self-rotation
    moonRef.current.rotation.y += 0.01
  })

  const moonRadius = moon.radius * 0.3
  
  return (
    <group ref={moonOrbitRef}>
      <mesh ref={moonRef}>
        <sphereGeometry args={[moonRadius, 12, 12]} />
        <meshLambertMaterial color="#CCCCCC" />
      </mesh>
      
      {/* Moon glow */}
      <mesh scale={1.2}>
        <sphereGeometry args={[moonRadius, 8, 8]} />
        <meshBasicMaterial 
          color="#FFFFFF" 
          transparent 
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

export default function AmazingPlanet({ planetData }: AmazingPlanetProps) {
  const meshRef = useRef<Mesh>(null!)
  const groupRef = useRef<Group>(null!)
  const glowRef = useRef<Mesh>(null!)
  const [clicked, setClicked] = useState(false)
  
  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return
    
    // Calculate orbital position
    const time = Date.now() * 0.001
    const orbitalSpeed = getOrbitalSpeed(planetData)
    const rotationSpeed = getRotationSpeed(planetData)
    const angle = time * orbitalSpeed
    const distance = planetData.distanceFromSun * 10
    
    // Update orbital position
    groupRef.current.position.x = distance * Math.cos(angle)
    groupRef.current.position.z = distance * Math.sin(angle)
    
    // Planet self-rotation
    meshRef.current.rotation.y += rotationSpeed
    
    // Subtle floating animation when clicked
    if (clicked) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
    
    // Glow pulsing effect
    if (glowRef.current) {
      const glowIntensity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      glowRef.current.material.opacity = clicked ? glowIntensity * 2 : glowIntensity
    }
  })

  const radius = getScaledRadius(planetData)
  const planetColor = new Color(planetData.color)
  
  const handleClick = (event: any) => {
    event.stopPropagation()
    console.log(`🪐 Clicked on ${planetData.name}!`, {
      planet: planetData.name,
      radius: `${planetData.radius} Earth radii`,
      distance: `${planetData.distanceFromSun} AU`,
      temperature: `${planetData.temperature}°C`,
      moons: planetData.moons.length,
      description: planetData.description
    })
    setClicked(!clicked)
  }
  
  return (
    <group ref={groupRef} onClick={handleClick}>
      {/* Main Planet */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshLambertMaterial 
          color={planetColor}
          emissive={planetColor}
          emissiveIntensity={clicked ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Planet Atmosphere Glow */}
      <mesh ref={glowRef} scale={1.1}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial 
          color={planetColor}
          transparent 
          opacity={0.15}
        />
      </mesh>
      
      {/* Enhanced Ring Systems */}
      {planetData.hasRings && (
        <group>
          {/* Main ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.5, radius * 2.5, 64]} />
            <meshLambertMaterial 
              color="#D4B896" 
              transparent 
              opacity={0.8}
              side={2}
            />
          </mesh>
          
          {/* Secondary ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 2.6, radius * 3.2, 64]} />
            <meshLambertMaterial 
              color="#B8A082" 
              transparent 
              opacity={0.6}
              side={2}
            />
          </mesh>
          
          {/* Outer ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 3.3, radius * 3.8, 64]} />
            <meshLambertMaterial 
              color="#A0906C" 
              transparent 
              opacity={0.4}
              side={2}
            />
          </mesh>
        </group>
      )}
      
      {/* Planet Moons */}
      {planetData.moons.map((moon) => (
        <PlanetMoon 
          key={moon.name} 
          moon={moon} 
          planetRadius={radius}
        />
      ))}
      
      {/* Enhanced orbit trail */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <ringGeometry args={[planetData.distanceFromSun * 10 - 0.02, planetData.distanceFromSun * 10 + 0.02, 128]} />
        <meshBasicMaterial 
          color={planetColor} 
          transparent 
          opacity={clicked ? 0.4 : 0.1}
          side={2}
        />
      </mesh>
      
      {/* Selection indicator */}
      {clicked && (
        <>
          {/* Orbital highlight */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <ringGeometry args={[radius * 4, radius * 4.5, 32]} />
            <meshBasicMaterial 
              color="#FFFFFF" 
              transparent 
              opacity={0.6}
              side={2}
            />
          </mesh>
          
          {/* Planet name label */}
          <mesh position={[0, radius + 2, 0]}>
            <planeGeometry args={[planetData.name.length * 0.5, 1]} />
            <meshBasicMaterial 
              color="#000000" 
              transparent 
              opacity={0.8}
            />
          </mesh>
        </>
      )}
    </group>
  )
}
