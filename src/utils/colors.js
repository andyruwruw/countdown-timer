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
}