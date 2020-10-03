export const RGBtoHSV = (r, g, b) => {
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let d = max - min;
  let h;
  let s = (max === 0 ? 0 : d / max);
  let v = max / 255;

  switch (max) {
    case min:
      h = 0;
      break;
    case r: 
      h = (g - b) + d * (g < b ? 6: 0);
      h /= 6 * d;
      break;
    case g: 
      h = (b - r) + d * 2;
      h /= 6 * d;
      break;
    case b: 
      h = (r - g) + d * 4;
      h /= 6 * d;
      break;
  }

  return {
    h: h,
    s: s,
    v: v
  };
};

export const HSVtoRGB = (h, s, v) => {
  let r;
  let g;
  let b;
  let i;
  let f;
  let p;
  let q;
  let t;
      
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(100, s));
  v = Math.max(0, Math.min(100, v));
      
  s /= 100;
  v /= 100;
      
  if(s == 0) {
    r = v;
    g = v;
    b = v;
    return [
      Math.round(r * 255), 
      Math.round(g * 255), 
      Math.round(b * 255)
    ];
  }
      
  h /= 60; 
  i = Math.floor(h);
  f = h - i;
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));
      
  switch(i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    default: // case 5:
      r = v;
      g = p;
      b = q;
  }
      
  return [
    Math.round(r * 255), 
    Math.round(g * 255), 
    Math.round(b * 255)
  ];
};

export const colorCSS = (color, alpha) => {
  if (alpha) {
    return `hsla(${color.h}, ${color.s * 100}%, ${color.l * 100}%, ${alpha})`
  }
  return `hsl(${color.h}, ${color.s * 100}%, ${color.l * 100}%)`;
}

export const colorThemes = [
  {
    name: 'Base',
    background: '#EEEEEE',
    primary: '#37a6f0',
    secondary: '#9dd5fa',
    dark: false,
  },
  {
    name: 'Valentines',
    background: '#BDA18C',
    primary: '#F04D48',
    secondary: '#F3746D',
    dark: true,
  },
  {
    name: 'Neon',
    background: '#5A24B4',
    primary: '#FE00EA',
    secondary: '#AA00FF',
    dark: true,
  },
  {
    name: 'Cherry',
    background: '#52373B',
    primary: '#D63D41',
    secondary: '#C82B2E',
    dark: true,
  },
  {
    name: 'Velvet',
    background: '#98506D',
    primary: '#FF994C',
    secondary: '#D0605E',
    dark: true,
  },
  {
    name: 'Orchard',
    background: '#A9B40B',
    primary: '#F38C01',
    secondary: '#FFB700',
    dark: true,
  },
  {
    name: 'Lollypop',
    background: '#428AE0',
    primary: '#FFA285',
    secondary: '#FE6779',
    dark: true,
  },
  {
    name: 'Retro',
    background: '#282726',
    primary: '#A37C27',
    secondary: '#563838',
    dark: true,
  },
  {
    name: 'Coffee',
    background: '#F1E0D6',
    primary: '#583E2F',
    secondary: '#BF9990',
    dark: true,
  },
  {
    name: 'Blues',
    background: '#73A2C0',
    primary: '#1E65A7',
    secondary: '#192E5B',
    dark: true,
  },
  {
    name: 'Moody',
    background: '#132227',
    primary: '#525B56',
    secondary: '#040C0E',
    dark: true,
  },
  {
    name: 'Sophisticated',
    background: '#A4978E',
    primary: '#525B56',
    secondary: '#BF9064',
    dark: true,
  },
  {
    name: 'Sunset',
    background: '#A3586D',
    primary: '#F46A4E',
    secondary: '#5C4A72',
    dark: true,
  },
  {
    name: 'Gothic',
    background: '#6C6B73',
    primary: '#9199BE',
    secondary: '#54678F',
    dark: true,
  },
  {
    name: 'Natural',
    background: '#DBD8C5',
    primary: '#9199BE',
    secondary: '#B5C1B5',
    dark: true,
  },
  {
    name: 'Serene',
    background: '#E7F5DE',
    primary: '#98BFAA',
    secondary: '#C8D5CB',
    dark: true,
  },
  {
    name: 'Jack-O-Lantern',
    background: '#07010F',
    primary: '#D65301',
    secondary: '#F08B33',
    dark: true,
  },
  {
    name: 'Icy',
    background: '#B9E4F4',
    primary: '#54C0EF',
    secondary: '#51A2D9',
    dark: true,
  },
];