import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Planet as PlanetData, getScaledRadius, getOrbitalSpeed, getRotationSpeed } from '../data/planets'

interface SimplePlanetProps {
  planetData: PlanetData
}

export default function SimplePlanet({ planetData }: SimplePlanetProps) {
  const meshRef = useRef<Mesh>(null!)
  const groupRef = useRef<Mesh>(null!)
  
  useFrame(() => {
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
  })

  const radius = getScaledRadius(planetData)
  
  const handleClick = () => {
    console.log(`Clicked on ${planetData.name}!`, {
      planet: planetData.name,
      radius: `${planetData.radius} Earth radii`,
      distance: `${planetData.distanceFromSun} AU`,
      temperature: `${planetData.temperature}°C`,
      moons: planetData.moons.length
    })
  }
  
  return (
    <mesh ref={groupRef} onClick={handleClick}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshBasicMaterial color={planetData.color} />
      </mesh>
    </mesh>
  )
}
