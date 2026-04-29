window.THEMES = window.THEMES || {};
window.THEMES.arctic = {
  name: 'Arctic Aurora',

  // Sky tint cycle: phase 0=noon, 0.25=dusk, 0.5=midnight, 0.75=dawn
  tintStops: [
    { r: 200, g: 228, b: 255 },  // 0.00 noon  – icy pale blue
    { r: 110, g: 130, b: 155 },  // 0.25 dusk  – steel grey
    { r:   5, g:  22, b:  38 },  // 0.50 night – deep teal-black
    { r: 160, g: 200, b: 232 },  // 0.75 dawn  – silvery-blue
  ],

  // 10 cloud digit colours — icy blues, aurora greens, silver, violet, snow
  digitColors: [
    { r: 100, g: 230, b: 250 },  // 0  glacial cyan
    { r: 245, g: 250, b: 255 },  // 1  snow white
    { r:  80, g: 150, b: 220 },  // 2  arctic blue
    { r:  80, g: 220, b: 160 },  // 3  aurora mint
    { r:  50, g: 200, b: 100 },  // 4  aurora green
    { r: 150, g:  80, b: 230 },  // 5  aurora violet
    { r:  60, g: 110, b: 170 },  // 6  steel blue
    { r: 180, g: 205, b: 225 },  // 7  polar silver
    { r:   0, g: 190, b: 200 },  // 8  ice teal
    { r: 200, g: 170, b: 240 },  // 9  frost lavender
  ],

  digitCssColors: [
    '#64E6FA',  // 0  glacial cyan
    '#F5FAFF',  // 1  snow white
    '#5096DC',  // 2  arctic blue
    '#50DCA0',  // 3  aurora mint
    '#32C864',  // 4  aurora green
    '#9650E6',  // 5  aurora violet
    '#3C6EAA',  // 6  steel blue
    '#B4CDE1',  // 7  polar silver
    '#00BEC8',  // 8  ice teal
    '#C8AAF0',  // 9  frost lavender
  ],

  lightningGlow: 0xAADDFF,   // blue-white glow
  lightningCore: 0xFFFFFF,   // pure white core
  flashColor:   'rgba(180, 220, 255, ',  // cold blue-white screen flash
};
