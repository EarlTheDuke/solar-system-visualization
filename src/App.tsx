import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

function Scene() {
  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.1} />
      
      {/* Point light representing the sun */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
      
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
      
      {/* Orbit controls for camera movement */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
      />
      
      {/* Temporary sphere to test the scene */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.3} />
      </mesh>
    </>
  )
}

function App() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white z-10">
        <h1 className="text-2xl font-bold mb-2">Solar System Visualization</h1>
        <p className="text-sm opacity-80">Use mouse to orbit, zoom, and pan</p>
      </div>
    </div>
  )
}

export default App
