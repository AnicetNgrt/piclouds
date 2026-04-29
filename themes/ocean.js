window.THEMES = window.THEMES || {};
window.THEMES.ocean = {
  name: 'Ocean Depths',

  // Sky cycle tint stops: noon, dusk, night, dawn
  // noon  – bright aquamarine surface light
  // dusk  – deep teal as sunlight fades into the water column
  // night – abyssal midnight blue, almost no light
  // dawn  – seafoam green as bioluminescence meets first light
  tintStops: [
    { r: 32,  g: 210, b: 195 },  // 0.00 noon  – bright aquamarine
    { r: 0,   g: 80,  b: 110 },  // 0.25 dusk  – deep teal
    { r: 2,   g: 8,   b: 48  },  // 0.50 night – abyssal midnight blue
    { r: 70,  g: 195, b: 170 },  // 0.75 dawn  – seafoam
  ],

  // 10 bioluminescent / oceanic colours, one per Pi digit 0–9
  // Each entry is used to tint the cloud sprite for that digit.
  digitColors: [
    { r: 0,   g: 255, b: 220 },  // 0 – bioluminescent cyan
    { r: 255, g: 88,  b: 75  },  // 1 – coral red
    { r: 55,  g: 210, b: 155 },  // 2 – seafoam green
    { r: 28,  g: 58,  b: 185 },  // 3 – deep navy blue
    { r: 0,   g: 205, b: 215 },  // 4 – turquoise
    { r: 75,  g: 170, b: 75  },  // 5 – kelp green
    { r: 215, g: 240, b: 255 },  // 6 – pearl white
    { r: 255, g: 95,  b: 180 },  // 7 – anemone pink
    { r: 105, g: 28,  b: 185 },  // 8 – abyssal purple
    { r: 25,  g: 105, b: 255 },  // 9 – phosphorescent blue
  ],

  // CSS colour strings matching the entries above (used in DOM / Canvas contexts)
  digitCssColors: [
    'rgb(0, 255, 220)',    // 0 – bioluminescent cyan
    'rgb(255, 88, 75)',    // 1 – coral red
    'rgb(55, 210, 155)',   // 2 – seafoam green
    'rgb(28, 58, 185)',    // 3 – deep navy blue
    'rgb(0, 205, 215)',    // 4 – turquoise
    'rgb(75, 170, 75)',    // 5 – kelp green
    'rgb(215, 240, 255)',  // 6 – pearl white
    'rgb(255, 95, 180)',   // 7 – anemone pink
    'rgb(105, 28, 185)',   // 8 – abyssal purple
    'rgb(25, 105, 255)',   // 9 – phosphorescent blue
  ],

  // Lightning bolt colours – electric teal storm discharge
  lightningGlow: 0x00DDCC,  // electric teal outer glow
  lightningCore: 0xCCFFFF,  // white-cyan inner core

  // Screen flash colour prefix (alpha appended by the engine)
  flashColor: 'rgba(0, 200, 180, ',
};
