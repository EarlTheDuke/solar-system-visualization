import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import SimpleScene from './components/SimpleScene'
import ErrorBoundary from './components/ErrorBoundary'

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-black text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-bold">🌌 Loading Solar System...</h2>
        <p className="text-sm opacity-70 mt-2">Preparing the cosmic experience</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <div className="w-full h-full">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 5, 20], fov: 75 }}
            gl={{ antialias: true, alpha: false }}
          >
            <SimpleScene />
            
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
        </Suspense>
        
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
    </ErrorBoundary>
  )
}

export default App
