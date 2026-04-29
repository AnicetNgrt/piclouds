window.THEMES = window.THEMES || {};
window.THEMES.volcanic = {
  name: 'Volcanic Inferno',

  // Sky tint cycle: phase 0=noon, 0.25=dusk, 0.5=midnight, 0.75=dawn
  tintStops: [
    { r: 210, g: 195, b: 120 },  // 0.00 noon  – ashy yellow-grey
    { r: 190, g:  60, b:  15 },  // 0.25 dusk  – deep red-orange
    { r:  18, g:   8, b:   8 },  // 0.50 night – pitch black charcoal
    { r: 160, g:  18, b:  10 },  // 0.75 dawn  – blood red
  ],

  // 10 cloud digit colours — lava, magma, ember, ash, crimson, gold, smoke, cinder, sulfur, incandescent
  digitColors: [
    { r: 255, g:  80, b:   0 },  // 0  lava orange
    { r: 200, g:  10, b:  10 },  // 1  magma red
    { r: 255, g: 190, b:  20 },  // 2  ember yellow
    { r: 140, g: 130, b: 115 },  // 3  ash grey
    { r: 160, g:   0, b:  30 },  // 4  deep crimson
    { r: 215, g: 155, b:   0 },  // 5  molten gold
    { r: 110, g:  50, b:  90 },  // 6  smoke purple
    { r:  80, g:  15, b:   5 },  // 7  cinder black-red
    { r: 220, g: 230, b:  10 },  // 8  sulfur yellow
    { r: 255, g: 245, b: 210 },  // 9  incandescent white
  ],

  digitCssColors: [
    '#FF5000',  // 0  lava orange
    '#C80A0A',  // 1  magma red
    '#FFBE14',  // 2  ember yellow
    '#8C8273',  // 3  ash grey
    '#A0001E',  // 4  deep crimson
    '#D79B00',  // 5  molten gold
    '#6E325A',  // 6  smoke purple
    '#500F05',  // 7  cinder black-red
    '#DCE60A',  // 8  sulfur yellow
    '#FFF5D2',  // 9  incandescent white
  ],

  lightningGlow: 0xFF4400,   // fiery orange-red glow
  lightningCore: 0xFF9955,   // bright orange-white core
  flashColor:   'rgba(255, 100, 20, ',  // warm ember screen flash
};
