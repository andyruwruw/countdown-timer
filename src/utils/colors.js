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

export const colors = [
  {
    h: 0, s: .07, l: .95,
  },
  {
    h: 0, s: 1, l: .38,
  },
  {
    h: 0, s: 1, l: .29,
  },
  {
    h: 0, s: 1, l: .23,
  },
  {
    h: 0, s: 0, l: .78,
  },
  {
    h: 2, s: 1, l: .80,
  },
  {
    h: 7, s: .88, l: .61,
  },
  {
    h: 7, s: .94, l: .37,
  },
  {
    h: 12, s: .81, l: .48,
  },
  {
    h: 23, s: 1, l: .44,
  },
  {
    h: 26, s: .89, l: .83,
  },
  {
    h: 32, s: 1, l: .49,
  },
  {
    h: 38, s: .48, l: .72,
  },
  {
    h: 39, s: 1, l: .43,
  },
  {
    h: 41, s: 1, l: .50,
  },
  {
    h: 45, s: 1, l: .50,
  },
  {
    h: 48, s: .69, l: .84,
  },
  {
    h: 48, s: .95, l: .50,
  },
  {
    h: 51, s: 1, l: .92,
  },
  {
    h: 53, s: 1, l: .27,
  },
  {
    h: 62, s: .23, l: .72,
  },
  {
    h: 71, s: .95, l: .92,
  },
  {
    h: 80, s: .59, l: .58,
  },
  {
    h: 140, s: .48, l: .76,
  },
  {
    h: 153, s: .23, l: .60,
  },
  {
    h: 154, s: .10, l: .14,
  },
  {
    h: 156, s: .42, l: .56,
  },
  {
    h: 178, s: 1, l: .34,
  },
  {
    h: 186, s: .75, l: .38,
  },
  {
    h: 191, s: 1, l: .29,
  },
  {
    h: 192, s: .93, l: .05,
  },
  {
    h: 192, s: 1, l: .14,
  },
  {
    h: 198, s: .71, l: .84,
  },
  {
    h: 207, s: .57, l: .23,
  },
  {
    h: 274, s: .39, l: .26,
  },
  {
    h: 340, s: .64, l: .33,
  },
  {
    h: 344, s: .53, l: .51,
  },
  {
    h: 344, s: .50, l: .45,
  },
  {
    h: 346, s: 1, l: .11,
  },
  {
    h: 349, s: 1, l: .63,
  },
];

export const colorThemes = [
  {
    name: 'Valentines',
    background: '#BDA18C',
    primary: '#F04D48',
    secondary: '#F3746D',
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
  },
  {
    name: 'Velvet',
    background: '#98506D',
    primary: '#FF994C',
    secondary: '#D0605E',
  },
  {
    name: 'Orchard',
    background: '#A9B40B',
    primary: '#F38C01',
    secondary: '#FFB700',
  },
  {
    name: 'Lollypop',
    background: '#428AE0',
    primary: '#FFA285',
    secondary: '#FE6779',
  },
  {
    name: 'Retro',
    background: '#282726',
    primary: '#A37C27',
    secondary: '#563838',
  },
  {
    name: 'Coffee',
    background: '#F1E0D6',
    primary: '#583E2F',
    secondary: '#BF9990',
  },
  {
    name: 'Blues',
    background: '#73A2C0',
    primary: '#1E65A7',
    secondary: '#192E5B',
  },
  {
    name: 'Moody',
    background: '#132227',
    primary: '#525B56',
    secondary: '#040C0E',
  },
  {
    name: 'Sophisticated',
    background: '#A4978E',
    primary: '#525B56',
    secondary: '#BF9064',
  },
  {
    name: 'Sunset',
    background: '#A3586D',
    primary: '#F46A4E',
    secondary: '#5C4A72',
  },
  {
    name: 'Gothic',
    background: '#6C6B73',
    primary: '#9199BE',
    secondary: '#54678F',
  },
  {
    name: 'Natural',
    background: '#DBD8C5',
    primary: '#9199BE',
    secondary: '#B5C1B5',
  },
  {
    name: 'Serene',
    background: '#E7F5DE',
    primary: '#98BFAA',
    secondary: '#C8D5CB',
  },
  {
    name: 'Jack-O-Lantern',
    background: '#07010F',
    primary: '#D65301',
    secondary: '#F08B33',
  },
  {
    name: 'Icy',
    background: '#B9E4F4',
    primary: '#54C0EF',
    secondary: '#51A2D9',
  },
];