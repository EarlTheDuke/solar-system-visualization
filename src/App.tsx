import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Sun from './components/Sun'
import Planet from './components/Planet'
import PlanetInfo from './components/PlanetInfo'
import { planetsData, PlanetData } from './data/planets'

function Scene({ onPlanetClick }: { onPlanetClick: (planet: PlanetData) => void }) {
  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Stars background */}
      <Stars 
        radius={500} 
        depth={100} 
        count={8000} 
        factor={6} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {/* Orbit controls for camera movement */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={0.8}
        panSpeed={0.8}
        rotateSpeed={0.6}
        minDistance={5}
        maxDistance={200}
      />
      
      {/* The Sun */}
      <Sun />
      
      {/* All Planets */}
      {planetsData.map((planetData) => (
        <Planet 
          key={planetData.name}
          data={planetData}
          onClick={() => onPlanetClick(planetData)}
        />
      ))}
    </>
  )
}

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [timeSpeed, setTimeSpeed] = useState(1);

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 20, 30], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene onPlanetClick={setSelectedPlanet} />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white z-10">
        <h1 className="text-3xl font-bold mb-2 text-yellow-400">Solar System Explorer</h1>
        <p className="text-sm opacity-80 mb-4">Click on planets to learn more • Use mouse to navigate</p>
        
        {/* Time Speed Control */}
        <div className="bg-black/50 backdrop-blur-sm p-3 rounded-lg">
          <label className="block text-sm font-medium mb-2">Time Speed: {timeSpeed}x</label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={timeSpeed}
            onChange={(e) => setTimeSpeed(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      
      {/* Planet Information Panel */}
      <PlanetInfo 
        planet={selectedPlanet}
        onClose={() => setSelectedPlanet(null)}
      />
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white text-xs opacity-60 z-10">
        <p>🖱️ Drag to orbit • 🔍 Scroll to zoom • 🖱️ Right-click to pan</p>
      </div>
    </div>
  )
}

export default App
