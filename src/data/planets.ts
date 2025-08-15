export interface PlanetData {
  name: string;
  radius: number; // Relative to Earth (Earth = 1)
  distance: number; // AU from Sun (Earth = 1 AU)
  orbitalPeriod: number; // Earth days
  rotationPeriod: number; // Earth hours
  color: string;
  description: string;
  facts: string[];
}

export const planetsData: PlanetData[] = [
  {
    name: "Mercury",
    radius: 0.383,
    distance: 0.39,
    orbitalPeriod: 88,
    rotationPeriod: 1407.6,
    color: "#8C7853",
    description: "The smallest planet and closest to the Sun",
    facts: [
      "Surface temperatures range from -290°F to 800°F",
      "One day on Mercury lasts 176 Earth days",
      "Has no atmosphere to retain heat"
    ]
  },
  {
    name: "Venus",
    radius: 0.949,
    distance: 0.72,
    orbitalPeriod: 225,
    rotationPeriod: -5832.5, // Retrograde rotation
    color: "#FFC649",
    description: "The hottest planet with a toxic atmosphere",
    facts: [
      "Surface temperature is about 900°F (462°C)",
      "Rotates backwards compared to most planets",
      "Thick atmosphere creates extreme greenhouse effect"
    ]
  },
  {
    name: "Earth",
    radius: 1.0,
    distance: 1.0,
    orbitalPeriod: 365.25,
    rotationPeriod: 24,
    color: "#6B93D6",
    description: "Our home planet, the only known planet with life",
    facts: [
      "71% of surface is covered by water",
      "Has one natural satellite - the Moon",
      "Protective magnetic field shields from solar radiation"
    ]
  },
  {
    name: "Mars",
    radius: 0.532,
    distance: 1.52,
    orbitalPeriod: 687,
    rotationPeriod: 24.6,
    color: "#CD5C5C",
    description: "The Red Planet with polar ice caps",
    facts: [
      "Has the largest volcano in the solar system - Olympus Mons",
      "Day length is very similar to Earth",
      "Has two small moons: Phobos and Deimos"
    ]
  },
  {
    name: "Jupiter",
    radius: 11.21,
    distance: 5.2,
    orbitalPeriod: 4333,
    rotationPeriod: 9.9,
    color: "#D8CA9D",
    description: "The largest planet, a gas giant with many moons",
    facts: [
      "Great Red Spot is a storm larger than Earth",
      "Has over 80 known moons",
      "Could fit all other planets inside it"
    ]
  },
  {
    name: "Saturn",
    radius: 9.45,
    distance: 9.5,
    orbitalPeriod: 10759,
    rotationPeriod: 10.7,
    color: "#FAD5A5",
    description: "Famous for its spectacular ring system",
    facts: [
      "Less dense than water - it would float!",
      "Has over 80 known moons, including Titan",
      "Rings are made mostly of ice particles"
    ]
  },
  {
    name: "Uranus",
    radius: 4.01,
    distance: 19.2,
    orbitalPeriod: 30687,
    rotationPeriod: -17.2, // Retrograde rotation
    color: "#4FD0E7",
    description: "An ice giant tilted on its side",
    facts: [
      "Rotates on its side at 98° tilt",
      "Has faint rings discovered in 1977",
      "Coldest planetary atmosphere in solar system"
    ]
  },
  {
    name: "Neptune",
    radius: 3.88,
    distance: 30.1,
    orbitalPeriod: 60190,
    rotationPeriod: 16.1,
    color: "#4169E1",
    description: "The windiest planet with supersonic storms",
    facts: [
      "Winds can reach up to 1,200 mph",
      "Takes 165 Earth years to orbit the Sun",
      "Has 14 known moons, largest is Triton"
    ]
  }
];

export const sunData = {
  name: "Sun",
  radius: 109.2, // Relative to Earth
  description: "The star at the center of our solar system",
  facts: [
    "Contains 99.86% of the solar system's mass",
    "Surface temperature is about 5,778 K (5,505°C)",
    "Core temperature reaches 15 million°C"
  ]
};
