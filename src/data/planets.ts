// Solar System Data with accurate NASA-sourced values
// Distances are scaled logarithmically for better visualization
// Sizes are relative to Earth (Earth = 1.0)

export interface Moon {
  name: string;
  radius: number; // Relative to Earth's moon
  distance: number; // Distance from planet (scaled)
  orbitalPeriod: number; // Days
}

export interface Planet {
  name: string;
  radius: number; // Relative scale (Earth = 1.0)
  distanceFromSun: number; // AU scaled down by factor of 10 for visibility
  orbitalPeriod: number; // Earth days
  rotationPeriod: number; // Hours
  textureUrl: string;
  hasRings: boolean;
  moons: Moon[];
  color: string; // Fallback color if texture fails to load
  mass: number; // Relative to Earth
  temperature: number; // Average surface temperature in Celsius
  description: string; // Brief description for info panels
}

// Major moons data
const earthMoon: Moon = {
  name: "Luna",
  radius: 1.0,
  distance: 3.0,
  orbitalPeriod: 27.3
};

const marsMoons: Moon[] = [
  { name: "Phobos", radius: 0.06, distance: 1.5, orbitalPeriod: 0.32 },
  { name: "Deimos", radius: 0.03, distance: 2.5, orbitalPeriod: 1.26 }
];

const jupiterMoons: Moon[] = [
  { name: "Io", radius: 1.04, distance: 8.0, orbitalPeriod: 1.77 },
  { name: "Europa", radius: 0.90, distance: 12.0, orbitalPeriod: 3.55 },
  { name: "Ganymede", radius: 1.51, distance: 18.0, orbitalPeriod: 7.15 },
  { name: "Callisto", radius: 1.38, distance: 28.0, orbitalPeriod: 16.69 }
];

const saturnMoons: Moon[] = [
  { name: "Mimas", radius: 0.11, distance: 4.0, orbitalPeriod: 0.94 },
  { name: "Titan", radius: 1.48, distance: 25.0, orbitalPeriod: 15.95 },
  { name: "Enceladus", radius: 0.14, distance: 5.0, orbitalPeriod: 1.37 }
];

const uranusMoons: Moon[] = [
  { name: "Miranda", radius: 0.14, distance: 3.0, orbitalPeriod: 1.41 },
  { name: "Ariel", radius: 0.33, distance: 4.5, orbitalPeriod: 2.52 },
  { name: "Umbriel", radius: 0.34, distance: 6.0, orbitalPeriod: 4.14 },
  { name: "Titania", radius: 0.45, distance: 10.0, orbitalPeriod: 8.71 },
  { name: "Oberon", radius: 0.44, distance: 13.0, orbitalPeriod: 13.46 }
];

const neptuneMoons: Moon[] = [
  { name: "Triton", radius: 0.78, distance: 8.0, orbitalPeriod: 5.88 }
];

// Solar System Data Array
export const solarSystemData: Planet[] = [
  {
    name: "Sun",
    radius: 109, // Actual ratio to Earth, but we'll scale this down in rendering
    distanceFromSun: 0,
    orbitalPeriod: 0,
    rotationPeriod: 609.12, // 25.4 Earth days at equator
    textureUrl: "/textures/sun.jpg",
    hasRings: false,
    moons: [],
    color: "#FDB813",
    mass: 333000,
    temperature: 5778,
    description: "The Sun is the star at the center of our solar system, containing 99.86% of the system's mass."
  },
  {
    name: "Mercury",
    radius: 0.383,
    distanceFromSun: 0.39, // Scaled down from 0.39 AU
    orbitalPeriod: 88,
    rotationPeriod: 1407.6, // 58.6 Earth days
    textureUrl: "/textures/mercury.jpg",
    hasRings: false,
    moons: [],
    color: "#8C7853",
    mass: 0.055,
    temperature: 167,
    description: "Mercury is the smallest planet and closest to the Sun, with extreme temperature variations."
  },
  {
    name: "Venus",
    radius: 0.949,
    distanceFromSun: 0.72,
    orbitalPeriod: 225,
    rotationPeriod: -5832.5, // Negative because it rotates backwards
    textureUrl: "/textures/venus.jpg",
    hasRings: false,
    moons: [],
    color: "#FFC649",
    mass: 0.815,
    temperature: 464,
    description: "Venus is the hottest planet with a thick, toxic atmosphere and surface pressure 90 times that of Earth."
  },
  {
    name: "Earth",
    radius: 1.0, // Reference planet
    distanceFromSun: 1.0,
    orbitalPeriod: 365.25,
    rotationPeriod: 24,
    textureUrl: "/textures/earth.jpg",
    hasRings: false,
    moons: [earthMoon],
    color: "#6B93D6",
    mass: 1.0,
    temperature: 15,
    description: "Earth is the only known planet with life, featuring liquid water, a protective atmosphere, and diverse ecosystems."
  },
  {
    name: "Mars",
    radius: 0.532,
    distanceFromSun: 1.52,
    orbitalPeriod: 687,
    rotationPeriod: 24.6,
    textureUrl: "/textures/mars.jpg",
    hasRings: false,
    moons: marsMoons,
    color: "#CD5C5C",
    mass: 0.107,
    temperature: -65,
    description: "Mars, the Red Planet, has the largest volcano and canyon in the solar system and evidence of ancient water."
  },
  {
    name: "Jupiter",
    radius: 11.21,
    distanceFromSun: 3.2, // Logarithmically scaled from 5.2 AU
    orbitalPeriod: 4333, // ~12 years
    rotationPeriod: 9.9,
    textureUrl: "/textures/jupiter.jpg",
    hasRings: true,
    moons: jupiterMoons,
    color: "#D8CA9D",
    mass: 317.8,
    temperature: -110,
    description: "Jupiter is the largest planet, a gas giant with a Great Red Spot storm and over 80 moons."
  },
  {
    name: "Saturn",
    radius: 9.45,
    distanceFromSun: 4.8, // Logarithmically scaled from 9.5 AU
    orbitalPeriod: 10759, // ~29.5 years
    rotationPeriod: 10.7,
    textureUrl: "/textures/saturn.jpg",
    hasRings: true,
    moons: saturnMoons,
    color: "#FAD5A5",
    mass: 95.2,
    temperature: -140,
    description: "Saturn is famous for its spectacular ring system and is less dense than water."
  },
  {
    name: "Uranus",
    radius: 4.01,
    distanceFromSun: 7.2, // Logarithmically scaled from 19.2 AU
    orbitalPeriod: 30687, // ~84 years
    rotationPeriod: -17.2, // Negative because it rotates on its side backwards
    textureUrl: "/textures/uranus.jpg",
    hasRings: true,
    moons: uranusMoons,
    color: "#4FD0E7",
    mass: 14.5,
    temperature: -195,
    description: "Uranus is an ice giant that rotates on its side, likely due to an ancient collision."
  },
  {
    name: "Neptune",
    radius: 3.88,
    distanceFromSun: 9.0, // Logarithmically scaled from 30.1 AU
    orbitalPeriod: 60190, // ~165 years
    rotationPeriod: 16.1,
    textureUrl: "/textures/neptune.jpg",
    hasRings: true,
    moons: neptuneMoons,
    color: "#4B70DD",
    mass: 17.1,
    temperature: -200,
    description: "Neptune is the windiest planet with speeds up to 2,100 km/h and was discovered through mathematical predictions."
  }
];

// Helper functions for calculations
export const getScaledRadius = (planet: Planet): number => {
  // Scale down large planets for better visualization
  if (planet.name === "Sun") return 2.0; // Much smaller than actual ratio
  if (planet.radius > 5) return Math.log(planet.radius) + 2; // Logarithmic scaling for gas giants
  return planet.radius;
};

export const getOrbitalSpeed = (planet: Planet): number => {
  // Convert orbital period to speed for animation
  // Faster periods = faster animation speed
  return planet.orbitalPeriod > 0 ? 0.01 / Math.sqrt(planet.orbitalPeriod / 365) : 0;
};

export const getRotationSpeed = (planet: Planet): number => {
  // Convert rotation period to speed for planet spinning
  return planet.rotationPeriod !== 0 ? 0.01 / (Math.abs(planet.rotationPeriod) / 24) : 0;
};
