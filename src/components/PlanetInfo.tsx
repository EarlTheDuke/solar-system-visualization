import { PlanetData } from '../data/planets';

interface PlanetInfoProps {
  planet: PlanetData | null;
  onClose: () => void;
}

export default function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  if (!planet) return null;

  return (
    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white p-6 rounded-lg max-w-sm z-20">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-yellow-400">{planet.name}</h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>
      </div>
      
      <p className="text-gray-300 mb-4">{planet.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Distance from Sun:</span>
          <span>{planet.distance} AU</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Orbital Period:</span>
          <span>{planet.orbitalPeriod.toLocaleString()} days</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Day Length:</span>
          <span>{Math.abs(planet.rotationPeriod).toFixed(1)} hours</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Size (vs Earth):</span>
          <span>{planet.radius.toFixed(2)}x</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-blue-400 mb-2">Interesting Facts:</h3>
        <ul className="space-y-1">
          {planet.facts.map((fact, index) => (
            <li key={index} className="text-sm text-gray-300">
              • {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
