import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Mesh } from 'three'
import { solarSystemData, getScaledRadius } from '../data/planets'
import SimplePlanet from './SimplePlanet'

function SimpleSun() {
  const sunRef = useRef<Mesh>(null!)
  
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005
    }
  })

  const sunData = solarSystemData.find(p => p.name === 'Sun')!
  const radius = getScaledRadius(sunData)
  
  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial color="#FDB813" />
    </mesh>
  )
}

function OrbitingPlanets() {
  const planets = solarSystemData.filter(planet => planet.name !== 'Sun')
  
  return (
    <>
      {planets.map((planetData) => (
        <SimplePlanet key={planetData.name} planetData={planetData} />
      ))}
    </>
  )
}

export default function SimpleScene() {
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
      
      {/* Basic lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#FDB813" />
      
      {/* The Sun */}
      <SimpleSun />
      
      {/* Orbiting Planets */}
      <OrbitingPlanets />
    </>
  )
}
