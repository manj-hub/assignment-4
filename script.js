// --- PURE FUNCTIONS ---

// 1️⃣ Convert HEX to HSL
const hexToHsl = (hex) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
};

// 2️⃣ Calculate Harmonies
const calculateHarmonies = (baseHsl) => {
  const [h, s, l] = baseHsl;
  const complementary = [(h + 180) % 360, s, l];
  const triadic1 = [(h + 120) % 360, s, l];
  const triadic2 = [(h + 240) % 360, s, l];

  return { complementary, triadic1, triadic2 };
};

// 3️⃣ Convert HSL array to CSS string
const hslToCss = ([h, s, l]) => `hsl(${h}, ${s}%, ${l}%)`;

// --- STATE SYNCHRONIZATION FUNCTION ---

const updateColors = () => {
  const colorInput = document.getElementById('colorInput');
  const baseHex = colorInput.value;

  const baseHsl = hexToHsl(baseHex);
  const harmonies = calculateHarmonies(baseHsl);

  // Update displays
  document.getElementById('baseColor').style.backgroundColor = baseHex;
  document.getElementById('baseHex').textContent = baseHex;

  const compCss = hslToCss(harmonies.complementary);
  const triad1Css = hslToCss(harmonies.triadic1);
  const triad2Css = hslToCss(harmonies.triadic2);

  document.getElementById('complementary').style.backgroundColor = compCss;
  document.getElementById('compHex').textContent = compCss;

  document.getElementById('triadic1').style.backgroundColor = triad1Css;
  document.getElementById('triad1Hex').textContent = triad1Css;

  document.getElementById('triadic2').style.backgroundColor = triad2Css;
  document.getElementById('triad2Hex').textContent = triad2Css;
};

// --- EVENT LISTENER ---
document.getElementById('colorInput').addEventListener('input', updateColors);

// Initialize once
updateColors();
