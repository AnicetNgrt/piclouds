window.THEMES = window.THEMES || {};
window.THEMES.desert = {
  name: 'Desert Sunset',
  // sky cycle: [noon, dusk, night, dawn]
  tintStops: [
    { r: 255, g: 220, b: 140 },  // noon  – warm golden
    { r: 220, g:  80, b:  20 },  // dusk  – deep burnt orange
    { r:  40, g:  15, b:  55 },  // night – purple-black
    { r: 255, g: 140, b:  60 },  // dawn  – amber
  ],
  // per-digit cloud tints (component objects; packed ints derived at applyTheme time)
  digitColors: [
    { r: 210, g: 180, b: 140 },  // 0 – sandy tan
    { r: 240, g: 200, b:  80 },  // 1 – golden yellow
    { r: 220, g: 120, b:  40 },  // 2 – amber
    { r: 200, g:  80, b:  30 },  // 3 – burnt orange
    { r: 180, g:  60, b:  20 },  // 4 – rust
    { r: 160, g:  40, b:  60 },  // 5 – maroon
    { r: 140, g:  80, b: 160 },  // 6 – desert violet
    { r: 200, g: 150, b: 190 },  // 7 – dusty rose
    { r: 255, g: 210, b: 100 },  // 8 – pale gold
    { r: 230, g: 170, b:  60 },  // 9 – ochre
  ],
  // CSS versions of the same (for ticker, HUD text, histogram labels)
  digitCssColors: [
    '#D2B48C', // 0 – sandy tan
    '#F0C850', // 1 – golden yellow
    '#DC7828', // 2 – amber
    '#C8501E', // 3 – burnt orange
    '#B43C14', // 4 – rust
    '#A0283C', // 5 – maroon
    '#8C50A0', // 6 – desert violet
    '#C896BE', // 7 – dusty rose
    '#FFD264', // 8 – pale gold
    '#E6AA3C', // 9 – ochre
  ],
  // Lightning colours (Phaser packed ints)
  lightningGlow: 0xFFCC44,   // warm amber glow
  lightningCore: 0xFFEEAA,   // pale gold core
  // Flash colour on digit-0 storm — CSS rgba prefix, alpha appended at runtime
  flashColor: 'rgba(255, 180, 60, ',
};
