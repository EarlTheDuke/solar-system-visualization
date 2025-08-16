import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import AmazingScene from './components/AmazingScene'
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
            <AmazingScene />
            
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
        
        {/* Enhanced UI Overlay */}
        <div className="absolute top-4 left-4 text-white z-10 bg-gradient-to-br from-purple-900 via-blue-900 to-black bg-opacity-80 backdrop-blur-sm p-6 rounded-xl border border-purple-500 border-opacity-30 shadow-2xl">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            🌌 Amazing Solar System
          </h1>
          <div className="text-sm space-y-2">
            <p className="flex items-center gap-2">
              <span className="text-yellow-400">🖱️</span> 
              <span className="text-blue-200">Mouse: Orbit around the cosmos</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">🔍</span> 
              <span className="text-blue-200">Scroll: Zoom through space</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-purple-400">🎯</span> 
              <span className="text-blue-200">Click planets: Explore worlds</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-orange-400">⭐</span> 
              <span className="text-blue-200">Real-time orbital mechanics</span>
            </p>
          </div>
          <div className="mt-3 text-xs text-purple-300 opacity-75">
            Experience the wonder of our solar system
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
