import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './components/Scene'

function App() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 5, 20], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        shadows
      >
        <Scene />
        
        {/* Orbit controls for camera movement */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
          minDistance={5}
          maxDistance={100}
        />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white z-10 bg-black bg-opacity-50 p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Solar System Visualization</h1>
        <div className="text-sm opacity-80 space-y-1">
          <p>🖱️ Mouse: Orbit around the solar system</p>
          <p>🔍 Scroll: Zoom in/out</p>
          <p>🖱️ Right-click: Pan the view</p>
          <p>⭐ Watching planets orbit in real-time</p>
        </div>
      </div>
    </div>
  )
}

export default App
