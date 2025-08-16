import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'
import { Planet as PlanetData, Moon, getScaledRadius, getOrbitalSpeed, getRotationSpeed } from '../data/planets'

interface PlanetProps {
  planetData: PlanetData
}

function PlanetMoon({ moon, planetRadius }: { moon: Moon; planetRadius: number }) {
  const moonRef = useRef<Mesh>(null!)
  const moonOrbitRef = useRef<Group>(null!)
  
  useFrame((state) => {
    if (!moonRef.current || !moonOrbitRef.current) return
    
    const time = Date.now() * 0.001
    const moonSpeed = 0.01 / Math.sqrt(moon.orbitalPeriod / 30) // Scaled moon orbital speed
    const angle = time * moonSpeed
    const distance = moon.distance + planetRadius
    
    // Moon orbital position
    moonOrbitRef.current.position.x = distance * Math.cos(angle)
    moonOrbitRef.current.position.z = distance * Math.sin(angle)
    
    // Moon self-rotation
    moonRef.current.rotation.y += 0.01
  })

  const moonRadius = moon.radius * 0.2 // Scale down moon relative to Earth's moon
  
  return (
    <group ref={moonOrbitRef}>
      <mesh ref={moonRef}>
        <sphereGeometry args={[moonRadius, 8, 8]} />
        <meshStandardMaterial 
          color="#999999" 
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}

export default function Planet({ planetData }: PlanetProps) {
  const meshRef = useRef<Mesh>(null!)
  const groupRef = useRef<Group>(null!)
  const [clicked, setClicked] = useState(false)
  
  // Memoize expensive calculations
  const radius = useMemo(() => getScaledRadius(planetData), [planetData])
  const rotationSpeed = useMemo(() => getRotationSpeed(planetData), [planetData])
  
  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return
    
    // Calculate orbital position
    const time = Date.now() * 0.001
    const orbitalSpeed = getOrbitalSpeed(planetData)
    const angle = time * orbitalSpeed
    const distance = planetData.distanceFromSun * 10
    
    // Update orbital position
    groupRef.current.position.x = distance * Math.cos(angle)
    groupRef.current.position.z = distance * Math.sin(angle)
    
    // Planet self-rotation based on rotation period
    meshRef.current.rotation.y += rotationSpeed
    
    // Subtle floating animation when clicked
    if (clicked) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  const handleClick = (event: any) => {
    event.stopPropagation()
    console.log(`Clicked on ${planetData.name}!`, {
      planet: planetData.name,
      radius: `${planetData.radius} Earth radii`,
      distance: `${planetData.distanceFromSun} AU`,
      temperature: `${planetData.temperature}°C`,
      moons: planetData.moons.length
    })
    setClicked(!clicked)
  }
  
  return (
    <group ref={groupRef} onClick={handleClick}>
      {/* Main Planet */}
      <mesh 
        ref={meshRef}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial 
          color={planetData.color}
          roughness={0.8}
          metalness={0.2}
          emissive={clicked ? planetData.color : '#000000'}
          emissiveIntensity={clicked ? 0.2 : 0.05}
        />
      </mesh>
      
      {/* Planet Rings */}
      {planetData.hasRings && (
        <group>
          {/* Main ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.4, radius * 2.2, 64]} />
            <meshStandardMaterial 
              color="#C4A484" 
              transparent 
              opacity={0.7}
              side={2} // DoubleSide
              roughness={0.8}
            />
          </mesh>
          
          {/* Secondary ring for more detail */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 2.3, radius * 2.8, 64]} />
            <meshStandardMaterial 
              color="#A0906C" 
              transparent 
              opacity={0.4}
              side={2}
              roughness={0.9}
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
      
      {/* Subtle orbit path indicator */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <ringGeometry args={[planetData.distanceFromSun * 10 - 0.05, planetData.distanceFromSun * 10 + 0.05, 64]} />
        <meshBasicMaterial 
          color={planetData.color} 
          transparent 
          opacity={clicked ? 0.3 : 0.08}
          side={2}
        />
      </mesh>
      
      {/* Planet label (appears when clicked) */}
      {clicked && (
        <mesh position={[0, radius + 1, 0]}>
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial 
            color="#000000" 
            transparent 
            opacity={0.7}
          />
        </mesh>
      )}
    </group>
  )
}
