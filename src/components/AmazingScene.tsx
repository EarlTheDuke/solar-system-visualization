import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import { PointLight } from 'three'
import { solarSystemData } from '../data/planets'
import AmazingPlanet from './AmazingPlanet'
import AmazingSun from './AmazingSun'

function AmazingLighting() {
  const sunLightRef = useRef<PointLight>(null!)
  
  useFrame((state) => {
    if (sunLightRef.current) {
      // Dynamic sun lighting
      const intensity = 2.5 + Math.sin(state.clock.elapsedTime) * 0.3
      sunLightRef.current.intensity = intensity
    }
  })
  
  return (
    <>
      {/* Enhanced ambient lighting */}
      <ambientLight intensity={0.2} color="#1a1a2e" />
      
      {/* Dynamic sun light */}
      <pointLight 
        ref={sunLightRef}
        position={[0, 0, 0]} 
        intensity={2.5} 
        color="#FDB813"
        distance={200}
        decay={2}
      />
      
      {/* Rim lighting for depth */}
      <directionalLight 
        position={[50, 50, 50]} 
        intensity={0.5} 
        color="#4169E1"
      />
      
      {/* Fill light */}
      <directionalLight 
        position={[-50, -50, -50]} 
        intensity={0.3} 
        color="#8A2BE2"
      />
    </>
  )
}

function EnhancedBackground() {
  return (
    <>
      {/* Multiple star layers for depth */}
      <Stars 
        radius={400} 
        depth={80} 
        count={8000} 
        factor={6} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      <Stars 
        radius={200} 
        depth={40} 
        count={3000} 
        factor={3} 
        saturation={0.2} 
        fade 
        speed={0.8}
      />
      
      {/* Distant sparkles for nebula effect */}
      <Sparkles 
        count={100}
        scale={[300, 300, 300]}
        size={2}
        speed={0.3}
        opacity={0.6}
        color="#4169E1"
      />
      
      <Sparkles 
        count={50}
        scale={[500, 500, 500]}
        size={3}
        speed={0.2}
        opacity={0.4}
        color="#8A2BE2"
      />
    </>
  )
}

function OrbitingPlanets() {
  const planets = solarSystemData.filter(planet => planet.name !== 'Sun')
  
  return (
    <>
      {planets.map((planetData) => (
        <AmazingPlanet key={planetData.name} planetData={planetData} />
      ))}
    </>
  )
}

export default function AmazingScene() {
  const sunData = solarSystemData.find(p => p.name === 'Sun')!
  
  return (
    <>
      {/* Enhanced Background */}
      <EnhancedBackground />
      
      {/* Advanced Lighting System */}
      <AmazingLighting />
      
      {/* The Amazing Sun */}
      <AmazingSun sunData={sunData} />
      
      {/* Orbiting Planets */}
      <OrbitingPlanets />
      
      {/* Fog for atmosphere */}
      <fog attach="fog" args={['#0a0a0a', 50, 300]} />
    </>
  )
}
