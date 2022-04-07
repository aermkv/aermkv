let bV;
const hashPairs = [];
for (let j = 0; j < 32; j++) {
  hashPairs.push(tokenData.hash.slice(2 + (j * 2), 4 + (j * 2)));
}
const decPairs = hashPairs.map(x => {
    return parseInt(x, 16);
  });

S=Uint32Array.from([0,1,s=t=2,3].map(i=>parseInt(tokenData.hash.substr(i*8+2,8),16)));R=_=>(t=S[3],S[3]=S[2],S[2]=S[1],S[1]=s=S[0],t^=t<<11,S[0]^=(t^t>>>8)^(s>>>19),S[0]/2**32);

const seed = parseInt(tokenData.hash.slice(2,16), 16);

function rnd(min, max) {
    const rand = R();
    if (typeof min === 'undefined') {
      return rand;
    } else if (typeof max === 'undefined') {
      if (min instanceof Array) {
        return min[floor(rand * min.length)];
      } else {
        return rand * min;
      }
    } else {
      if (min > max) {
        const tmp = min;
        min = max;
        max = tmp;
      }
      return rand * (max - min) + min;
    }
}

const palettes = {
    matisse_A: {
      base: [248,159,112],
      secondary: [38,120,186],
      primary: [219,68,106],
      accent: [41,181,114],
      dark: [48,48,47],
      light: [240,239,205],
      contrast: [250,191,183],
      aux: [55,178,177],
      perim: [69,176,228],
      o: [69,0,253],
      t: [2,7,18]
    },
    matisse_B: {
      base: [236,162,121],
      secondary: [38,120,186],
      primary: [219,68,106],
      accent: [41,181,114],
      dark: [48,48,47],
      light: [240,239,205],
      contrast: [250,191,183],
      aux: [64,183,158],
      perim: [61,229,163],
      o: [231,0,80],
      t: [163,163,225]
    },
    blueDom_A: {
      base: [59,74,124],
      secondary: [217,177,103],
      primary: [154,154,204],
      accent: [69,176,153],
      dark: [18,40,76],
      light: [243,231,210],
      contrast: [134,209,215],
      aux: [255,122,169],
      perim: [18,40,76],
      o: [249,83,97],
      t: [163,163,225]
    },
    blueDom_B: {
      base: [18,40,76],
      secondary: [110,131,147],
      primary: [164,219,225],
      accent: [241,97,34],
      dark: [20,30,55],
      light: [246,245,247],
      contrast: [59,74,124],
      aux: [132,206,242],
      perim: [233,29,37],
      o: [69,84,165],
      t: [163,163,225]
    },
    kelly_A: {
      base: [247,204,39],
      secondary: [16,141,199],
      primary: [36,181,111],
      accent: [241,89,48],
      dark: [23,35,66],
      light: [243,231,210],
      contrast: [237,105,152],
      aux: [134,204,225],
      perim: [53,74,159],
      o: [155,160,159],
      t: [2,7,18]
    },
    kelly_B: {
      base: [252,234,0],
      secondary: [69,84,165],
      primary: [237,28,36],
      accent: [74,183,73],
      dark: [4,3,3],
      light: [236,241,233],
      contrast: [247,204,39],
      aux: [79,169,160],
      perim: [237,51,147],
      o: [237,247,0],
      t: [2,7,18]
  },
    moholyNagy_A: {
        base: [242,237,208],
        secondary: [99,101,103],
        primary: [206,54,49],
        accent: [61,136,122],
        dark: [44,81,112],
        light: [241,237,211],
        contrast: [135,38,41],
        aux: [246,237,123],
        perim: [247,238,226],
        o: [255,92,148],
        t: [2,7,18]
    },
    moholyNagy_B: {
      base: [14,32,52],
      secondary: [203,203,203],
      primary: [44,81,112],
      accent: [224,199,74],
      dark: [135,38,41],
      light: [229,224,212],
      contrast: [224,31,38],
      aux: [97,188,191],
      perim: [220,191,243],
      o: [0,90,255],
      t: [163,163,225]
  },
    greys_A: {
        base: [142,146,146],
        secondary: [91,95,111],
        primary: [216,217,216],
        accent: [38,26,96],
        dark: [1,1,1],
        light: [245,225,208],
        contrast: [250,243,165],
        aux: [79,89,226],
        perim: [147,166,216],
        o: [7,0,23],
        t: [2,7,18]
    },
    greys_B: {
        base: [112,111,105],
        secondary: [216,217,216],
        primary: [145,145,145],
        accent: [247,236,88],
        dark: [30,30,41],
        light: [250,243,165],
        contrast: [32, 53, 117],
        aux: [79,89,226],
        perim: [1,1,1],
        o: [191,1,1],
        t: [163,163,225]
    },
    primaries_A: {
        base: [32,16,47],
        secondary: [233,149,110],
        primary: [219,58,62],
        accent: [191,211,235],
        dark: [43,43,96],
        light: [246,245,246],
        contrast: [75,159,209],
        aux: [246,234,77],
        perim: [247,94,0],
        o: [219,235,149],
        t: [163,163,225]
    },
    primaries_B: {
        base: [222,93,53],
        secondary: [37,54,102],
        primary: [247,228,82],
        accent: [90,175,146],
        dark: [100,31,73],
        light: [241,231,211],
        contrast: [246,245,246],
        aux: [217,49,137],
        perim: [30,160,213],
        o: [255,174,194],
        t: [2,7,18]
    },
    accents_A: {
        base: [246,245,246],
        secondary: [146,145,146],
        primary: [217,216,217],
        accent: [206,54,49],
        dark: [48,48,48],
        light: [240,238,209],
        contrast: [241,193,185],
        aux: [239,193,70],
        perim: [146,145,146],
        o: [255,145,145],
        t: [2,7,18]
    },
    accents_B: {
        base: [241,237,211],
        secondary: [114,131,145],
        primary: [201,79,66],
        accent: [249,208,99],
        dark: [15,17,42],
        light: [210,234,240],
        contrast: [241,237,211],
        aux: [187,215,163],
        perim: [216,217,216],
        o: [255,255,0],
        t: [2,7,18]
    }
}
const gradient_1 = [201,233,234]
const gradient_2 = [226,227,226]
const gradient_3 = [246,245,247]
const randomPalette = function (palettes) {
  let keys = Object.keys(palettes);
  const paletteName = keys[floor(map(decPairs[0],0,255,0,keys.length-0.001))];
  return palettes[paletteName];
};
let palette;
// SETUP & DRAW
function w(val) {if (val == null) return width;return width * val;}
function h(val) {if (val == null) return height;return height * val;}
//const u = w(0.001)
function setup() {
  bV = bezierVertex;
  noiseSeed(seed)
  palette = randomPalette(palettes)
  const smallerDimension = windowWidth < windowHeight ? windowWidth : windowHeight;
  createCanvas(smallerDimension, smallerDimension);
}
function draw() {
  chooseResult()
  noLoop()
}
// BG & TEXTURE FUNCTIONS
function bg_rect(pal) {
  noStroke()
  fill(pal[0],pal[1],pal[2], 255)
  translate(width/2,height/2)
  let rotation_angles = [0, HALF_PI, PI, TWO_PI]
  let rotation_angle = rotation_angles[floor(rnd() * rotation_angles.length)];;
  rotate(rotation_angle)
  rectMode(CENTER)
  rect(0,0,w(1),h(1))
}
function bg_rect_noR(pal) {
  noStroke()
  fill(pal[0],pal[1],pal[2], 255)
  translate(width/2,height/2)
  rectMode(CENTER)
  rect(0,0,w(1),h(1))
}
function texturedStroke_RGB(x1, y1, x2, y2, weight, r, g, b, alpha) {
  push()
  const relWeight = map(weight, 0, width, 1, 40);
  stroke(r, g, b, alpha)
  strokeWeight(w(0.002));
  for (let i = 0; i < relWeight; i++){
    let theta = rnd(TWO_PI);
    let nx1 = x1 + 0.5*rnd(weight/2)*cos(theta);
    let ny1 = y1 + 0.5*rnd(weight/2)*sin(theta);
    let nx2 = x2 + 0.5*rnd(weight/2)*cos(theta);
    let ny2 = y2 + 0.5*rnd(weight/2)*sin(theta);
    line(nx1, ny1, nx2, ny2)
  }
  pop()
}
function bg_perspective(pal1,pal2,pal3) {
  const x_left_1 = rnd(w(0.05), w(0.15))
  const y_top_1 = rnd(h(0.05), h(0.15))
  const x_right_1 = rnd(w(0.7),w(0.85))
  const y_bottom_1 = rnd(h(0.7),h(0.85))
  const shift = rnd(w(0.08),w(0.16))
  const x_left_2 = x_left_1 + shift/2
  const x_right_2 = x_right_1 - shift/2
  const y_top_2 = y_top_1 + shift/2
  const y_bottom_2 = h(1) - shift/2
  const xMid = rnd(w(0.4), w(0.6))
  const y_split = rnd(h(0.15), h(0.4))
  blendMode(SCREEN)
  let p_lines = 700
  for (let i = 0; i < p_lines; i++){
    let x = map(i, 0, p_lines, x_left_1, x_right_1)
    let y1 = y_top_1
    let y2 = map(x, x_left_1, x_right_1, y_bottom_1 - shift, y_bottom_1)
    texturedStroke_RGB(x, y1, x, y2, w(0.005), 255, 238, 237, 90)
  }
  for (let i = 0; i < p_lines; i++){
    let x = map(i, 0, p_lines, x_left_1 + shift, x_right_1 + shift)
    let y1 = y_top_1 + shift
    let y2 = map(x, x_left_1 + shift, x_right_1 + shift, y_bottom_1, y_bottom_1 + shift)
    texturedStroke_RGB(x, y1, x, y2, w(0.005), 245, 240, 240, 90)
  }
  blendMode(BLEND)
  for (let i = 0; i < p_lines*1.5; i++){
    let x = map(i, 0 , p_lines*1.5, x_left_2, x_right_2)
    let y1 = map(x, x_left_2, x_right_2, y_split, y_top_2)
    let y2 = map(x, x_left_2, x_right_2, y_split, h(0.6895))
    texturedStroke_RGB(x, y1, x + rnd(-w(0.001), w(0.001)), y2, w(0.005), pal1[0], pal1[1], pal1[2], 115)
  }
  for (let i = 0; i < p_lines*1.5; i++){
    let x = map(i, 0, p_lines*1.5, x_left_2, x_right_2)
    let y1 = map(x, x_left_2, x_right_2, y_split, h(0.6895))
    if(x < xMid){
        y2 = map(x, x_left_2, xMid, h(0.54595), h(0.80185))
    }else{
        y2 = map(x, xMid, x_right_2, h(0.80185), h(0.6895))
    }
    texturedStroke_RGB(x, y1, x + rnd(-w(0.001), w(0.001)), y2, w(0.005), pal2[0], pal2[1], pal2[2], 115)
  }
  for (let i = 0; i < p_lines; i++){
    let x = map(i, 0, p_lines, x_left_2, xMid)
    let y1 = map(x, x_left_2, xMid, h(0.54595), h(0.80135))
    let y2 = map(x, x_left_2, xMid, y_bottom_2, h(0.80135))
    texturedStroke_RGB(x, y1, x + rnd(-w(0.001), w(0.001)), y2, w(0.005), pal3[0], pal3[1], pal3[2], 115)
  }
}
function bg_rug() {
  color_select1 = palette.primary
  color_select2 = palette.contrast
  color_select3 = palette.secondary
  colorMode(RGB, 255, 255, 255, 255);
  let x_left = w(0.1)
  let x_right = w(0.9)
  let x_left_m = rnd(w(0.3),w(0.45))
  let x_right_m = rnd(w(0.55),w(0.8))
  let y_top = h(0.1)
  let y_bottom = h(0.9)
  let y_l_split = rnd(w(0.3),w(0.7))
  //let y_m_split = rnd(w(0.3),w(0.7))
  let y_r_split = rnd(w(0.3),w(0.7))
  let y_diff = rnd(h(0.05),h(0.2))
  let n_l = 1200
  for (let i = 0; i < n_l; i++){
    let x = map(i, 0, n_l, x_left, x_right)
    if(x < x_left_m){
      let y_mid = map(x,x_left,x_left_m,y_l_split-y_diff,y_l_split+y_diff)
      texturedStroke_RGB(x, y_top, x, y_mid, w(0.007), color_select1[0], color_select1[1], color_select1[2], 85)
      texturedStroke_RGB(x, y_mid, x, y_bottom, w(0.007), color_select2[0], color_select2[1], color_select2[2], 85)
    }else if(x >= x_left_m && x <= x_right_m){
      let y_mid = map(x,x_left_m,x_right_m,y_l_split+y_diff,y_r_split-y_diff)
      texturedStroke_RGB(x, y_top, x, y_mid, w(0.007), color_select3[0], color_select3[1], color_select3[2], 85)
      texturedStroke_RGB(x, y_mid, x, y_bottom, w(0.007), color_select1[0], color_select1[1], color_select1[2], 85)
    }else{
      let y_mid = map(x,x_right_m,x_right,y_r_split-y_diff,y_r_split+y_diff)
      texturedStroke_RGB(x, y_top, x, y_mid, w(0.007), color_select2[0], color_select2[1], color_select2[2], 85)
      texturedStroke_RGB(x, y_mid, x, y_bottom, w(0.007), color_select3[0], color_select3[1], color_select3[2], 85)
    }
  }
}
function brush_line_bg_texture_GS() {
    let line_color = rnd(0,90)
    let x1 = rnd(w(0), w(1))
    let x2 = x1 + rnd(-w(0.24),w(0.25))
    let y1 = 0
    let y2 = height
    let weight = w(0.3) //width of line
    const relWeight = map(weight, 0, width, 50, 200);
    for (let i = 0; i < relWeight; i ++){
      let theta = rnd(TWO_PI);
      let nx1 = x1 + rnd(weight/2)*cos(theta);
      let ny1 = y1 + rnd(weight/2)*sin(theta);
      let nx2 = x2 + rnd(weight/2)*cos(theta);
      let ny2 = y2 + rnd(weight/2)*sin(theta);
      noStroke();
      fill(line_color,200)
      let lval = rnd(0,w(0.01))
      ellipse(lerp(nx1, nx2, lval), lerp(ny1, ny2, lval), w(0.001))
    }
}
function dots_texture() {
  let p = palette.t
  let xoff = 0
  let inc = .01
  let yoff = 0
  let y_inc = .005
  let num_dot_cols = 200
  for (let i = 0; i <= num_dot_cols; i++){
    let x = map(i, 0, num_dot_cols, w(0), w(1))
    for (let j = 0; j <= num_dot_cols; j++){
      let y = map(j, 0, num_dot_cols, h(0), h(1))
        fill(p[0], p[1],  p[2], 165*noise(yoff))
        ellipse(x + w(.048)*noise(xoff), y + h(.048)*noise(xoff), w(0.001))
        yoff += y_inc
      }
    xoff += inc
  }
}
function checkerboard() {
  push()
  let p = palette.t
  translate(width/2, height/2)
  let rt = [0, HALF_PI, PI, TWO_PI]
  const rt_an = rt[floor(rnd() * rt.length)];;
  rotate(rt_an)
  //blendMode(BURN)
  let size = map(rt_an,0,HALF_PI + QUARTER_PI,w(.003),w(.0045))
  let num_cols = width/size/2
  let num_rows = num_cols
  let xoff = 0
  let inc = .01
  for (let i = 0; i < num_cols; i++){
    for (let j = 0; j < num_rows + floor(sin(xoff)*3) + rnd(-10,5); j++){
      fill(p[0], p[1],  p[2], map(j,0,num_rows,125,1))
      noStroke()
      if (j%2 == 0){
        rect(i*2*size+size - width/2,j*size - height/2,size,size)
      }else{
        rect(i*2*size - width/2,j*size - height/2,size,size)
      }
    }
    xoff += inc
  }
  pop()
}
function textured_bg_stripes(pal_1, pal_2) {
  push()
  translate(width/2,height/2)
  let y_shift = h(0.025)
  let y_start = -h(.27)
  let inc = .01;
  xoff = 0 
  const bg_nm_1 = 2400
  for (let i = 0; i < bg_nm_1; i++){
    x = map(i, 0, bg_nm_1, -width/2, width/2)
    y1 = y_start + noise(xoff)*(width/60)
    y2 = height/2
    texturedStroke_RGB(x, y1, x, y2, w(0.025), pal_1[0], pal_1[1], pal_1[2], 10)
    xoff += inc
  }
  const bg_nm_2 = 900
  for (let i = 0; i < bg_nm_2; i++){
    y = map(i, 0, bg_nm_2, -h(.15), h(.4))
    texturedStroke_RGB(-w(.5), y, w(.5), y + y_shift, w(.05), pal_2[0], pal_2[1], pal_2[2], 40)
  }
  pop()
}
function painted_rectangle(pal) {
  push()
  translate(width/2,height/2)
  let xPos1 = rnd(-w(0.4), -w(0.3))
  let xPos2 = rnd(w(0.35), w(0.45))
  let yPos1 = -w(.5)
  let yPos2 = rnd(h(.25),h(.4))
  //let alpha = rnd(13, 28)
  //let weight = rnd(w(0.023), w(0.038))
  let n_l = 1000
  for (let i = 0; i < n_l; i++){
    let x = map(i, 0, n_l, xPos1, xPos2)
    texturedStroke_RGB(x, yPos1, x, yPos2, w(.008), pal[0], pal[1], pal[2], 85)
  }
  pop()
}
function painted_rectangle_overlay(weight, passedPalette, alpha) {
  push()
  y_start = rnd(h(0.25), h(0.45))
  for (let y = y_start; y < height/2; y += h(0.002)){
    let x1 = -width/2 - w(0.1)
    let x2 = width/2 + w(0.1)
    texturedStroke_RGB(x1, y, x2, y, weight, passedPalette[0], passedPalette[1], passedPalette[2], alpha)
  }
  pop()
}
function plH(weight, passedPalette, alpha) {
  push()
  translate(width/2,height/2)
  let xPos1 = -w(.5)
  //let xPos2_options = [w(0.15), w(0.35), w(0.6)]
  let xPos2 = w(.5)
  let l_t = rnd(h(0.02), h(0.04))
  let yPos1 = rnd(h(0.1), h(0.2))
  let yPos2 = yPos1 + l_t
  let n_l = l_t*2
  for (let i =0; i < n_l; i++){
    let y = map(i, 0, n_l, yPos1, yPos2)
    let x1 = xPos1
    let x2 = xPos2
    texturedStroke_RGB(x1, y, x2, y, weight, passedPalette[0], passedPalette[1], passedPalette[2], alpha)
  }
  pop()
}
function plV(weight, pal, alpha) {
  push()
  translate(width/2,height/2)
  let xoff = 0
  let inc = .0015
  //let xPos2_options = [w(0.15), w(0.35), w(0.6)]
  //let xPos2 = w(.025)
  let l_t = rnd(h(0.02), h(0.04))
  let yPos1 = -h(.5)
  let yPos2 = h(.5)
  let n_l = 1500
  let l_w = rnd(w(.025),w(.065))
  for (let i = 0; i < n_l; i++){
    let y = map(i, 0, n_l, yPos1, yPos2)
    let x1 = 0-l_w*noise(xoff)
    let x2 = x1+l_w
    texturedStroke_RGB(x1, y, x2, y, weight, pal[0], pal[1], pal[2], alpha)
    xoff += inc
  }
  pop()
}
function halftone_dots() {
  let p = palette.t
  let num_dots = 160
  let cell_size = height/num_dots
  let xoff = 0
  let inc = 10/num_dots
  let default_size = 0.6*cell_size
  noStroke()
  fill(p[0], p[1], p[2],125)
  for (let i = 0; i < num_dots; i++){
    let yoff = 0
    for (let j = 0; j < num_dots; j++){
      let x = i*cell_size + w(.01 * noise(xoff, yoff));
      let y = j*cell_size + w(0.01 * noise(xoff + 1000, yoff + 1000))
      ellipse(x,y,default_size * noise(xoff + 2000, yoff + 2000))
      yoff += inc
    }
    xoff += inc
  }
}
function crescent(a,x,y,r,pal) {
  push()
  let rt = radians(a);
  stroke(0);
  let step = w(0.001);
  let stroke_color = pal

  for (let i = r/2; i < r; i+=step) {
    push();
    translate(x, y);
    rotate(rt);
    translate(0, -i);
    let l = sqrt(r * r - i * i);
    texturedStroke_RGB(l, 0, -l, 0, w(0.005), stroke_color[0],stroke_color[1],stroke_color[2],135)
    //translate(0, 2*i);
    //line(l, 0, -l, 0);
    pop();
  }

  pop()
}
function jpegArt(x,y,sx,sy) {
  beginContour()
  for (var i = 0; i < 16; i++) {
    vertex(x+sx*Math.cos(2 * PI * i / 16), y + sy * Math.sin(2 * PI * i / 16) + rnd(-w(.001), w(.001)))
  }
  endContour(CLOSE)
}
// PERIMETERS
function perimeter_general() {
  push()
  drawingContext.shadowOffsetX =  0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'black';
  noStroke()
  fill(palette.perim[0],palette.perim[1],palette.perim[2],165)
  beginShape()
  vertex(w(.002),h(.002))
  vertex(w(.002),h(.998))
  vertex(w(.998),h(.998))
  vertex(w(.998),h(.002))
  beginContour()
  vertex(w(.023),h(.023))
  vertex(w(.977),h(.023))
  vertex(w(.977),h(.977))
  vertex(w(.023),h(.977))
  endContour(CLOSE)
  endShape(CLOSE)
  pop()
  screw(w(.013),h(.013))
  screw(w(.013),h(.987))
  screw(w(.987),h(.987))
  screw(w(.987),h(.013))
}
function perimeter_1() {
  perimeter_general()
  push()
  drawingContext.shadowOffsetX =  0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'black';
  noStroke()
  fill(palette.t[0],palette.t[1],palette.t[2],165)
  strokeCap(PROJECT);
  strokeJoin(MITER);
  beginShape();
  vertex(w(0.028),h(0.028))
  vertex(w(0.972),h(0.028))
  vertex(w(0.972),h(0.972))
  vertex(w(0.028),h(0.972))
  beginContour()
  vertex(w(0.048),h(0.048))
  vertex(w(0.048),h(0.872))
  vertex(w(0.128),h(0.872))
  vertex(w(0.128),h(0.952))
  vertex(w(0.952),h(0.952))
  vertex(w(0.952),h(0.128))
  vertex(w(0.872),h(0.128))
  vertex(w(0.872),h(0.048))
  vertex(w(0.128),h(0.048))
  vertex(w(0.048),h(0.048))
  endContour()
  endShape(CLOSE);
  let s_p = [[w(.04),h(.04)],[w(.96),h(.96)],[w(.04),h(.96)],[w(.96),h(.04)]]
  s_p.forEach(i => screw(i[0],i[1]))
  pop()
}
function perimeter_2() {
  perimeter_general()
  push()
  drawingContext.shadowOffsetX =  0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'black';
  noStroke()
  fill(palette.aux[0],palette.aux[1],palette.aux[2],165)
  strokeCap(PROJECT);
  strokeJoin(MITER);
  beginShape();
  vertex(w(0.037),h(0.037))
  vertex(w(0.64),h(0.037))
  vertex(w(0.64),h(0.048))
  vertex(w(0.089),h(0.048))
  vertex(w(0.089),h(0.089))
  vertex(w(0.048),h(0.089))
  vertex(w(0.048),h(0.64))
  vertex(w(0.037),h(0.64))
  vertex(w(0.037),h(0.037))
  endShape(CLOSE);
  fill(palette.contrast[0],palette.contrast[1],palette.contrast[2],200)
  beginShape();
  vertex(w(0.089),h(0.089))
  vertex(w(0.106),h(0.089))
  vertex(w(0.106),h(0.106))
  vertex(w(0.089),h(0.106))
  endShape(CLOSE);
  //rect(w(0.089),h(0.089),(0.037),h(0.037))
  screw(w(0.062),h(0.062))
  pop()
}
function perimeter_3() {
  perimeter_general()
  push()
  rectMode(CORNER)
  drawingContext.shadowOffsetX =  0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'black';
  noStroke()
  fill(palette.primary[0],palette.primary[1],palette.primary[2],185)
  /*beginShape()
  vertex(w(.027),h(.027))
  vertex(w(.027),h(.973))
  vertex(w(.973),h(.973))
  vertex(w(.973),h(.027))
  beginContour()
  vertex(w(.15),h(.85))
  vertex(w(.15),h(.15))
  vertex(w(.85),h(.15))
  vertex(w(.85),h(.85))
  endContour()
  endShape(CLOSE)*/
  rect(w(.027),h(.85),w(.946),h(.123))
  fill(palette.aux[0],palette.aux[1],palette.aux[2],185)
  beginShape()
  vertex(w(.85),h(.848))
  vertex(w(.973),h(.848))
  vertex(w(.973),h(.027))
  vertex(w(.152),h(.027))
  vertex(w(.152),h(.15))
  vertex(w(.85),h(.15))
  endShape(CLOSE)
  drawingContext.shadowBlur = 0;
  var color_c1 = gradient_1
  var color_c2 = gradient_2
  var b1 = color(color_c1[0], color_c1[1], color_c1[2], 255)
  var b2 = color(color_c2[0], color_c2[1], color_c2[2], 255)
  let nlp = 1000
  let ymid = rnd(h(.3),h(.65))
  for (let i = 0; i < nlp; i++){
    let y = map(i, 0, nlp, h(.027),h(.846))
    let x1 = w(.027)
    let x2 = w(.146)
    if (y <= ymid){
      let inter = map(y, h(.027), ymid, 1, 0)
      c = lerpColor(b1, b2, inter)
      stroke(c) // MAIN STROKE
    }else{
      let inter2 = map(y, ymid, h(.844), 1, 0)
      let c2 = lerpColor(b2, b1, inter2)
      stroke(c2) // OVERLAY STROKE
    }
    strokeWeight(w(0.0015))
    line(x1, y, x2, y)
  }
  pop()
}
// CHOOSER FUNCTIONS
function chooseTexture() {
  const textures = [dots_texture, checkerboard, halftone_dots]
  textures[floor(map(decPairs[1],0,255,0,textures.length - 0.001))]()
}
function chooseKellyOverlay() {
  const kellyOverlays = [kelly_bigB_2, kellyTr]
  kellyOverlays[floor(map(decPairs[2],0,255,0,kellyOverlays.length - 0.001))]()
}

// ASSEMBLY FUNCTIONS
function lines_vert_for_line_structure(x, line_width, weight, passed_palette, alpha) {
  push()
  colorMode(RGB, 255, 255, 255, 255);
  for (let i = 0; i < height; i += w(0.002)){
    var y = i - height/2
    var x1 = x - line_width/2
    var x2 = x + line_width/2
    texturedStroke_RGB(x1, y, x2, y, weight, passed_palette[0], passed_palette[1], passed_palette[2], alpha)
  }
  pop()
}
function lines_horiz_for_line_structure(y, line_width, weight, passed_palette, alpha) {
  push()
  colorMode(RGB, 255, 255, 255, 255);
  for (let i = 0; i < height; i += h(0.002)){
    var x = i - height/2
    var y1 = y - line_width/2
    var y2 = y + line_width/2
    texturedStroke_RGB(x, y1, x, y2, weight, passed_palette[0], passed_palette[1], passed_palette[2], alpha)
  }
  pop()
}
function triangle_horizLines(passed_palette, alpha, y_limits) {
  var inc = .01;
  xoff = 0 
  var noise_coeff = w(0.0015)
  for (let y = y_limits[0]; y < y_limits[1] + w(0.003); y += w(0.002)){
    var x_left = map(y, y_limits[0], y_limits[1] - w(0.002), 0, -width/2) + noise(xoff)*noise_coeff - w(0.002)
    var x_right = map(y, y_limits[0], y_limits[1] + w(0.002), 0, width/2) + noise(xoff)*noise_coeff + w(0.002)
    texturedStroke_RGB(x_left, y, x_right, y, w(0.003), passed_palette[0], passed_palette[1], passed_palette[2], alpha)
    xoff += inc
  }
}
function triangle_vertLines(passed_palette, alpha, y_limits) {
  var inc = .01;
  xoff = 0 
  var noise_coeff = w(0.0035)
  for (let x = -width/2; x < 0; x += w(0.001)){
    var y = map(x, -width/2, 0, y_limits[1], y_limits[0])
    texturedStroke_RGB(x, y - w(.007)*noise(xoff+noise_coeff), x, y_limits[1], w(0.003), passed_palette[0], passed_palette[1], passed_palette[2], alpha)
    xoff += inc
  }
  for (let x = 0; x < width/2; x += w(0.001)){
    var y = map(x, 0, width/2, y_limits[0], y_limits[1])
    texturedStroke_RGB(x, y - w(.007)*noise(xoff+noise_coeff), x, y_limits[1], w(0.003), passed_palette[0], passed_palette[1], passed_palette[2], alpha)
    xoff += inc
  }
}
function triangle_line_structure_2(weight, passed_palette, alpha) {
  push()
  let rotate_options = [0,180]
  rotation_value = rotate_options[floor(rnd() * rotate_options.length)];;
  angleMode(DEGREES)
  rotate(rotation_value)
  lines_vert_for_line_structure(width/2, w(0.085), weight, passed_palette, alpha/2)
  lines_vert_for_line_structure(0, w(0.015), weight, passed_palette, alpha)
  lines_horiz_for_line_structure(h(0.43), w(0.015), weight, passed_palette, alpha)
  lines_horiz_for_line_structure(h(0.21), w(0.015), weight, passed_palette, alpha)
  pop()
}
function kelly_bigB_2() {
  strokeCap(PROJECT);
  strokeJoin(MITER);
  beginShape();
  vertex(w(1),h(0.0284));
  vertex(w(1),h(1));
  bV(w(1),h(1),w(0.539),h(1),w(0.508),h(0.666));
  bV(w(0.508),h(0.666),w(0.511),h(0.981),w(0),h(1));
  vertex(w(0),h(0));
  bV(w(0),h(0),w(0.394),h(0.0252),w(0.492),h(0.397));
  bV(w(0.492),h(0.397),w(0.502),h(0.0442),w(1),h(0.0284));
  endShape(CLOSE);
}
function kellyTr() {
  push()
  translate(width/2,height/2)
  var y_limits_1 = [-h(0.5) + h(0.12), h(0.5)]
  var y_limits_2 = [-h(0.5), h(0.5) - h(0.12)]
  var y_limits_random = [y_limits_1, y_limits_2]
  const y_limits = y_limits_random[floor(rnd() * y_limits_random.length)];
  blendMode(OVERLAY)
  triangle_horizLines(palette.contrast, 45, y_limits)
  pop()
}
function screw(x,y) {
  push()
  blendMode(BLEND)
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = w(0.01);
  drawingContext.shadowColor = 'black';
  noStroke()
  fill(215, 215, 215, 255)
  ellipse(x, y, w(0.01))
  fill(185, 185, 185, 255)
  ellipse(x, y, w(0.008))
  //ellipse(x, y, w(0.005))
  push()
  fill(95, 95, 95, 255)
  drawingContext.shadowBlur = w(.003);
  drawingContext.shadowColor = 'white';
  translate(x,y)
  rectMode(CENTER)
  angleMode(DEGREES)
  rotate(rnd(0,360))
  rect(0,0,w(0.008),h(0.0015))
  rect(0,0,w(0.0015),h(0.008))
  pop()
  pop()
}
function moholyCircle(x_t,y_t,pal,r,start,stop,step) {
  push()
  r = w(0.3);
  //angle = 0;
  //step = 0.1; //in radians equivalent of 360/6 in degrees
  strokeWeight(w(0.002))
  stroke(235)
  angleMode(DEGREES)
  translate(x_t,y_t)
  for (angle = start; angle < stop; angle += step){
    var x = r * sin(angle);
    var y = r * cos(angle);
    var x2 = 0.98*r * sin(angle);
    var y2 = 0.98*r * cos(angle);
    //draw ellipse at every x,y point
    //line(x,y,x2,y2)
    texturedStroke_RGB(x, y, x2, y2, w(0.003), pal[0], pal[1], pal[2], 35)
  }
  pop()
}
function triCut(pal,alpha) {
  fill(pal[0],pal[1],pal[2],alpha)
  stroke(pal[0],pal[1],pal[2],alpha/2)
  strokeWeight(w(.002))
  beginShape()
  vertex(w(.12),h(.12))
  vertex(w(.38),h(.12))
  vertex(w(.38),h(.88))
  vertex(w(.12),h(.88))
  beginContour()
  vertex(w(.08),h(.24))
  vertex(w(.25),h(.76))
  vertex(w(.42),h(.24))
  endContour()
  endShape(CLOSE)
}
function triRect(pal,alpha) {
  fill(pal[0],pal[1],pal[2],alpha)
  stroke(pal[0],pal[1],pal[2],alpha/2)
  strokeWeight(w(.002))
  beginShape()
  vertex(w(.003),h(.003))
  vertex(w(.003),h(.997))
  vertex(w(.497),h(.997))
  vertex(w(.497),h(.003))
  beginContour()
  vertex(w(.12),h(.12))
  vertex(w(.38),h(.12))
  vertex(w(.38),h(.24))
  vertex(w(.42),h(.24))
  vertex(w(.38),h(.36235))
  vertex(w(.38),h(.88))
  vertex(w(.12),h(.88))
  vertex(w(.12),h(.36235))
  vertex(w(.08),h(.24))
  vertex(w(.12),h(.24))
  endContour()
  endShape(CLOSE)
}
function bShape(pal,a,alpha) {
  fill(pal[0],pal[1],pal[2], alpha)
  let xoff = 0
  let inc = .09
  strokeCap(PROJECT);
  strokeJoin(MITER);
  beginShape();
  //vertex(w(0.353) + a,h(0.003));
  //vertex(w(0.353)+ a,h(0.997));
  for (var y = h(0.003); y < h(0.997); y += h(0.003)){
      var x = w(0.353) + a + w(0.024)*noise(xoff)
      vertex(x, y)
      xoff += inc
  }
  vertex(w(0.882)+ a,h(0.997));
  bV(w(0.882)+ a,h(0.997),w(0.91)+ a,h(0.545),w(0.5)+ a,h(0.49));
  bV(w(0.5)+ a,h(0.491),w(0.885)+ a,h(0.419),w(.914)+ a,h(0.003));
  endShape(CLOSE);
  beginShape()
  vertex(w(0.13) + a,h(0.003))
  for (var y = h(0.003); y < h(0.997); y += h(0.003)){
      var x = w(0.24) + a + w(0.024)*noise(xoff)
      vertex(x, y)
      xoff += inc
  }
  vertex(w(0.13) + a,h(0.997))
  endShape(CLOSE)
}
// OVERLAY ASSEMBLY FUNCTIONS
function window_overlay(x_left_outside, x_left_inside, x_right_outside, x_right_inside, y_top, y_inside, y_bottom, passedPalette, shadowBlur, sX, sY) {
  push()
  drawingContext.shadowOffsetX = sX;
  drawingContext.shadowOffsetY = sY;
  drawingContext.shadowBlur = shadowBlur;
  drawingContext.shadowColor = 'black';
  //blendMode(BURN)
  fill(passedPalette[0], passedPalette[1], passedPalette[2], 125)
  stroke(passedPalette[0], passedPalette[1], passedPalette[2], 65)
  strokeJoin(ROUND)
  strokeWeight(w(0.0015))
  beginShape()
  vertex(x_left_outside, y_top)
  vertex(x_right_outside - 1, y_top)
  vertex(x_right_outside - 1, y_bottom - h(0.003))
  vertex(x_left_outside, y_bottom - h(0.003))
  beginContour()
  vertex(x_left_inside, y_bottom - h(0.1))
  vertex(x_right_inside, y_bottom - h(0.1))
  vertex(x_right_inside, y_inside)
  vertex(x_left_inside, y_inside)
  endContour()
  endShape(CLOSE)
  let color_c1 = gradient_2
  let b1 = color(color_c1[0], color_c1[1], color_c1[2], 25)
  let b2 = color(255,255,255,215)
  let gradient_mid = rnd(x_left_outside,x_right_outside)
  strokeCap(SQUARE)
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowBlur = 0;
  let n_l = 600
  for (let i = 0; i < n_l; i++){
    let x = map(i, 0, n_l, x_left_outside, x_right_outside)
    strokeWeight((x_right_outside-x_left_outside)/n_l-w(.0005))
    if (x <= gradient_mid){
      let inter = map(x, 0, gradient_mid, 1, 0)
      c = lerpColor(b1, b2, inter)
      stroke(c) // MAIN STROKE
      //line(x, h(1)-bar_height, x, h(0.998))
    }else{
      let inter2 = map(x, gradient_mid, w(1), 1, 0)
      c = lerpColor(b2, b1, inter2)
      stroke(c) // OVERLAY STROKE
      //line(x, h(1)-bar_height, x, h(0.998))
    }
    if (x < x_left_inside){
        line(x,y_top,x,y_bottom - h(0.003))
    }else if(x >= x_left_inside && x <= x_right_inside){
        line(x,y_top,x,y_inside)
        line(x,y_bottom - h(0.1),x,y_bottom - h(0.003))
    }else{
        line(x,y_top,x,y_bottom - h(0.003))
    }
  }
  let s_p = [[x_left_outside + w(.02), y_top + h(.02)],[x_right_outside - w(.02), y_top + h(.02)],[x_left_outside + w(.02), y_bottom - h(.02)],[x_right_outside - w(.02), y_bottom - h(.02)]]
  s_p.forEach(i => screw(i[0],i[1]))
  pop()
}
function rectangle_with_triangleCutout(left, right, bottom, top, pal) {
  push()
  drawingContext.shadowOffsetX =  - w(0.008);
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = w(0.015);
  drawingContext.shadowColor = 'black';
  fill(pal[0], pal[1], pal[2], 155)
  stroke(pal[0], pal[1], pal[2], 85)
  strokeJoin(ROUND)
  strokeWeight(w(0.0015))
  let tri_mid = right - (right - left)/2
  let jw = right - (right-tri_mid)/2
  let jy = bottom/2
  let jpegs = [[jw,jy*(.08),w(.003),h(.005)],[jw*(1.02),jy*(.1),w(.004),h(.007)],[jw*(.98),jy*(.13),w(.003),h(.005)],[jw*(.95),jy*(.16),w(.002),h(.004)],[jw*(1.03),jy*(.18),w(.003),h(.007)],[jw*(1.06),jy*(.109),w(.001),h(.003)],[jw*(1.09),jy*(.21),w(.002),h(.005)],[jw*(1.11),jy*(.23),w(.003),h(.004)],[jw*(1.08),jy*(.26),w(.003),h(.006)],[jw*(1.12),jy*(.06),w(.005),h(.008)],[jw*(1.08),jy*(.075),w(.003),h(.004)],[jw*(1.1),jy*(.085),w(.005),h(.006)],[jw*(1.1),jy*(.125),w(.003),h(.005)],[jw*(1.16),jy*(.29),w(.004),h(.006)],[jw*(0.94),jy*(.06),w(.004),h(.006)]]//,[jw*(.93),jy*(.16),w(.003),h(.003)],[w(.95),h(.15),w(.001),h(.001)],[w(.86),h(.18),w(.002),h(.005)],[w(.95),h(.21),w(.001),h(.003)],[w(.92),h(.25),w(.003),h(.005)],[w(.9),h(.27),w(.002),h(.003)]
  beginShape()
  vertex(left + w(0.003), bottom - h(0.003))
  vertex(right - w(0.003), bottom - h(0.003))
  vertex(right - w(0.003), top + h(0.003))
  vertex(left + w(0.003), top + h(0.003))
  beginContour()
  vertex(tri_mid, top + h(0.05))
  vertex(right - w(0.05), bottom - h(0.05))
  vertex(left + w(0.05), bottom - h(0.05))
  endContour()
  jpegs.forEach(i => jpegArt(i[0],i[1],i[2],i[3]))
  //jpegArt(w(.85),h(.08),w(.003),h(.005))
  endShape(CLOSE)
  let color_c1 = gradient_1
  //let color_c2 = gradient_3
  let b1 = color(color_c1[0], color_c1[1], color_c1[2], 0)
  let b2 = color(255,255,255,65)
  let gradient_mid = rnd(left+w(.06),tri_mid-w(.03))
  console.log(gradient_mid)
  strokeCap(ROUND)
  blendMode(SCREEN)
  drawingContext.shadowOffsetX =  0;
  drawingContext.shadowBlur = 0;
  let tr_num_lines = 1000
  for (let i = 0; i < tr_num_lines; i++){
    let x = map(i, 0, tr_num_lines, left + w(0.003), right - w(0.003))
    if (x <= gradient_mid){
      let inter = map(x, left + w(0.003), gradient_mid, 1, 0)
      c = lerpColor(b2, b1, inter)
    }else{
      let inter2 = map(x, gradient_mid, right - w(0.003), 1, 0)
      c = lerpColor(b1, b2, inter2)
    }
    stroke(c)
    strokeWeight((right - w(0.003) - left + w(0.003))/tr_num_lines-w(.001))
    if (x < left + w(0.05)){
        line(x,top + h(0.003),x,bottom - h(0.003))
    }else if(x > left + w(0.05) && x <= tri_mid){
        line(x,top + h(0.003),x,map(x,left + w(0.05),tri_mid,bottom - h(0.05), top + h(0.05)))
        line(x,bottom - h(0.05),x,bottom - h(0.003))
    }else if(x > tri_mid && x < right - w(0.05)){
        line(x,top + h(0.003),x,map(x,tri_mid, right - w(0.05), top + h(0.05), bottom - h(0.05)))
        line(x,bottom - h(0.05),x,bottom - h(0.003))
    }else{
        line(x,top + h(0.003),x,bottom - h(0.003))
    }
  }
  pop()
}
function gradient_plate(x_left, x_break, y_top, gradient_width, gradient_height, gradient_height_2, pal1, pal2, pal3) {
  push()
  var color_c1 = gradient_1
  var color_c2 = gradient_2
  var color_c3 = gradient_3
  var c1 = color(color_c1[0], color_c1[1], color_c1[2], 165)
  var c2 = color(color_c2[0], color_c2[1], color_c2[2], 165)
  var c3 = color(color_c3[0], color_c3[1], color_c3[2], 195)
  var xoff = 0
  var inc = .01
  for (let x = x_left + w(0.003); x <= x_left + gradient_width - w(0.002); x += w(0.0007)){
    let inter = map(x, x_left, x_left + gradient_width, 0, 1)
    let c = lerpColor(c2, c3, inter)
    push()
    for (var j = 0; j < 25; j++){
      var y = (y_top + h(0.024) + h(0.036)*noise(xoff)) - h(0.00055)*j
      fill(20, map(j, 5, 23, 45, 0))
      noStroke()
      ellipse(x, y, w(0.001))
    }
    pop()
    strokeCap(ROUND)
    strokeWeight(w(0.0011))
    if (x < x_break - w(0.004)){
      stroke(c)
      line(x, y_top + h(0.024) + w(0.036)*noise(xoff), x, y_top + gradient_height - w(0.004))
    }else{
      stroke(c)
      line(x, y_top + h(0.024) + w(0.036)*noise(xoff), x, y_top + gradient_height_2 - w(0.004))
    }
    xoff += inc
  }
  pop()
}
function gradient_flat(x_left, y_top, gradient_width, gradient_height, pal1, pal2) {
  push()
  var color_c1 = gradient_2
  var color_c2 = gradient_3
  var b1 = color(color_c1[0], color_c1[1], color_c1[2], 185)
  var b2 = color(color_c2[0], color_c2[1], color_c2[2], 90)
  var xoff = 0
  var inc = 0.03
  strokeCap(ROUND)
  for (let x = x_left + w(0.003); x <= x_left + gradient_width - w(0.003); x += w(0.0007)){
    for (var j = 0; j < 25; j++){
        let y = (y_top + gradient_height + w(0.025)*noise(xoff)) + h(0.00055)*j
        fill(20, map(j, 5, 23, 45, 0))
        noStroke()
        ellipse(x, y, w(0.0013))}
    if (x <= x_left + w(0.185)){
      let inter = map(x, x_left, x_left + w(0.185), 1, 0)
      c = lerpColor(b1, b2, inter)
      strokeWeight(w(0.0018))
      stroke(c) // MAIN STROKE
      line(x, y_top + w(0.002), x, y_top + gradient_height + w(0.025)*noise(xoff))
    }else{
      let inter2 = map(x, x_left + w(0.185), x_left + gradient_width, 1, 0)
      let c2 = lerpColor(b2, b1, inter2)
      stroke(c2) // OVERLAY STROKE
      line(x, y_top + w(0.002), x, y_top + gradient_height + w(0.025)*noise(xoff))
    }
    xoff += inc
  }
  pop()
}
function tul(a) {
  noStroke()
    push()
    scale(0.85)
    translate(rnd(-w(0.25), w(0.1)), h(0.175))
    vertex(w(0.49661) + a, h(.998));
    bV(w(0.49661) + a, h(.998), w(0.49688) + a, h(0.93156), w(0.49819) + a, h(0.92564));
    bV(w(0.49819) + a, h(0.92564), w(0.49706) + a,h(0.90822), w(0.49557) + a, h(0.89574));
    bV(w(0.49557) + a, h(0.89574), w(0.48579) + a, h(0.81425), w(0.48423) + a, h(0.79959));
    bV(w(0.48267) + a, h(0.78493), w(0.46055) + a, h(0.675), w(0.417) + a, h(0.6276));
    bV(w(0.37345) + a, h(0.5802), w(0.33175) + a, h(0.57642), w(0.30866) + a, h(0.56568));
    bV(w(0.28557) + a, h(0.55494), w(0.24635) + a, h(0.5442), w(0.27668) + a, h(0.529));
    bV(w(0.30701) + a, h(0.5138), w(0.34239) + a, h(0.50246), w(0.39484) + a, h(0.53532));
    bV(w(0.44729) + a, h(0.56818), w(0.44855) + a, h(0.65916), w(0.46184) + a, h(0.692));
    bV(w(0.47513) + a, h(0.72488), w(0.48354) + a, h(0.747), w(0.49126) + a, h(0.79785));
    bV(w(0.49898) + a, h(0.84868), w(0.4977) + a, h(0.81233), w(0.4977) + a, h(0.79978));
    bV(w(0.4977) + a, h(0.78723), w(0.49253) + a, h(0.69524), w(0.49253) + a, h(0.674));
    bV(w(0.49253) + a, h(0.65276), w(0.49686) + a, h(0.51881), w(0.49486) + a, h(0.496));
    bV(w(0.49286) + a, h(0.47319), w(0.48286) + a, h(0.46721), w(0.46568) + a, h(0.46481));
    bV(w(0.4485) + a, h(0.46241), w(0.38852) + a, h(0.44642), w(0.37453) + a, h(0.41524));
    bV(w(0.36054) + a, h(0.38406), w(0.36294) + a, h(0.37446), w(0.37013) + a, h(0.36167));
    bV(w(0.37732) + a, h(0.34888), w(0.4217) + a, h(0.21618), w(0.4289) + a, h(0.1814));
    bV(w(0.4361) + a, h(0.14662), w(0.44635) + a, h(0.12948), w(0.45449) + a, h(0.13783));
    bV(w(0.46108) + a, h(0.14459), w(0.46437) + a, h(0.1501), w(0.47211) + a, h(0.1411));
    bV(w(0.47957) + a, h(0.13241), w(0.48652) + a, h(0.12296), w(0.50711) + a, h(0.11991));
    bV(w(0.53563) + a, h(0.11569), w(0.54683) + a, h(0.13263), w(0.56003) + a, h(0.1774));
    bV(w(0.57323) + a, h(0.22217), w(0.606) + a, h(0.30733),w(0.62319) + a, h(0.33372));
    bV(w(0.64035) + a, h(0.36011), w(0.64838) + a, h(0.40967), w(0.606) + a, h(0.42886));
    bV(w(0.56362) + a, h(0.44805), w(0.52445) + a, h(0.45086), w(0.512) + a, h(0.48763));
    bV(w(0.51555) + a, h(0.5244), w(0.5124) + a, h(0.62396), w(0.5136) + a, h(0.70191));
    bV(w(0.5148) + a, h(0.77986), w(0.51525) + a, h(0.74829), w(0.5156) + a, h(0.77191));
    bV(w(0.51639) + a, h(0.82477), w(0.52122) + a, h(0.78349), w(0.52402) + a, h(0.7687));
    bV(w(0.52682) + a, h(0.75391), w(0.53364) + a, h(0.64514), w(0.64718) + a, h(0.634));
    bV(w(0.79024) + a, h(0.62049), w(0.75096) + a, h(0.66255), w(0.71618) + a, h(0.66535));
    bV(w(0.6814) + a, h(0.66815), w(0.6821) + a, h(0.68935), w(0.6148) + a, h(0.66958));
    bV(w(0.55968) + a, h(0.6534), w(0.54044) + a, h(0.72595), w(0.53564) + a, h(0.74434));
    bV(w(0.53084) + a, h(0.76273), w(0.53516) + a, h(0.79894), w(0.52164) + a, h(0.82789));
    bV(w(0.50978) + a, h(0.85329), w(0.51579) + a, h(0.86797), w(0.51664) + a, h(0.89516));
    bV(w(0.51749) + a, h(0.92235), w(0.52579) + a, h(0.94096), w(0.52438) + a, h(0.95982));
    bV(w(0.52306) + a, h(0.97733), w(0.52069) + a, h(.998), w(0.52069) + a, h(.998));
    pop()
}
function meetingCircles(pal, sx, a, alpha) {
  push()
  strokeCap(PROJECT);
  strokeJoin(MITER);
  fill(pal[0], pal[1], pal[2], alpha)
  stroke(pal[0], pal[1], pal[2], alpha/2)
  strokeWeight(w(0.001))
  let sy = h(.002)
  beginShape();

  vertex(w(0.60115)+sx,h(0.44316)-sy);
  vertex(w(0)+sx,h(0.44316)-sy);
  vertex(w(0)+sx,h(0.57023)-sy);
  bV(w(0.04553)+sx,h(0.6971)-sy,w(0.13383)+sx,h(0.75023)-sy,w(0.229)+sx,h(0.76587)-sy);
  bV(w(0.04657)+sx,h(0.77214)-sy,w(0)+sx,h(0.82966)-sy,w(0)+sx,h(0.82966)-sy);
  vertex(w(0)+sx,h(1)-sy);
  vertex(w(0.60115)+sx,h(1)-sy);
  vertex(w(0.60115)+sx,h(0.80545)-sy);
  bV(w(0.502)+sx,h(0.785)-sy,w(0.41848)+sx,h(0.77366)-sy,w(0.34833)+sx,h(0.7686)-sy);
  bV(w(0.48275)+sx,h(0.7556)-sy,w(0.60115)+sx,h(0.69731)-sy,w(0.60115)+sx,h(0.69731)-sy);
  vertex(w(0.60115)+sx,h(0.44316)-sy);
  beginContour()
  tul(a)
  endContour()
  endShape()

  screw(w(0.012)+sx, h(0.988)-sy)
  screw(w(0.012)+sx, h(0.457)-sy)
  screw(w(0.59)+sx, h(0.988)-sy)
  screw(w(0.59)+sx, h(0.457)-sy)
  pop()
}
function crescentCutOut() {
  beginShape();
  vertex(0,0);
  vertex(0,h(1));
  vertex(w(0.55),h(1));
  vertex(w(0.55),h(0));
  beginContour();
  vertex(w(0.056),h(0.9333));
  vertex(w(0.056),h(0.08363));
  bV(w(0.43),h(0.08363),w(0.53),h(0.33644),w(0.53),h(0.50846));
  bV(w(0.53),h(0.68048),w(0.43),h(0.9333),w(0.056),h(0.9333));
  endContour()
  endShape();
  let s_p = [[w(.02),h(.02)],[w(.02),h(.98)],[w(.53),h(.02)],[w(.53),h(.98)]]
  s_p.forEach(i => screw(i[0],i[1]))
}
function twoRectangles() {
  beginShape()
  vertex(w(.75),h(0.4))
  vertex(w(1),h(0.4))
  vertex(w(1),h(1))
  vertex(w(0.75),h(1))
  endShape(CLOSE)
  beginShape()
  vertex(w(.65),h(0.2))
  vertex(w(.65),h(.85))
  vertex(w(.85),h(.85))
  vertex(w(.85),h(.2))
  endShape(CLOSE)
  let s_p = [[w(.77),h(.42)],[w(.77),h(.83)],[w(.83),h(.83)],[w(.83),h(.42)],[w(.98),h(.98)],[w(.77),h(.98)],[w(.98),h(.42)],[w(.67),h(.22)],[w(.67),h(.83)],[w(.83),h(.22)]]
  s_p.forEach(i => screw(i[0],i[1]))
}
function bigCurve(pal1,pal2,alpha) {
  noStroke()
  fill(pal1[0],pal1[1],pal1[2],alpha)
  beginShape();
  vertex(w(0.002),h(0.002));
  vertex(w(0.91979),h(0.002));
  vertex(w(0.91979),h(0.18465));
  bV(w(0.78571),h(0.18465),w(0.09933),h(0.215),w(0.09783),h(0.54487));
  vertex(w(0.09783),h(0.54487));
  vertex(w(0.09783),h(0.998));
  vertex(w(0.002),h(0.998));
  beginContour()
  vertex(w(0.62975),h(0.07873));
  bV(w(0.561),h(0.07873),w(0.50543),h(0.10962),w(0.50543),h(0.14658));
  vertex(w(0.50543),h(0.80547));
  bV(w(0.50543),h(0.84147),w(0.56133),h(0.87332),w(0.63),h(0.87332));
  bV(w(0.69883),h(0.87332),w(0.7544),h(0.84243),w(0.7544),h(0.80547));
  vertex(w(0.7544),h(0.14658));
  bV(w(0.7544),h(0.1106),w(0.6985),h(0.07873),w(0.62975),h(0.07873));
  endContour(CLOSE)
  endShape(CLOSE);
  fill(pal2[0],pal2[1],pal2[2],alpha)
  beginShape()
  vertex(w(0.924),h(0.002))
  vertex(w(0.998),h(0.002))
  vertex(w(0.998),h(0.998))
  vertex(w(0.1),h(0.998))
  vertex(w(0.1),h(0.968))
  vertex(w(0.924),h(0.968))
  endShape(CLOSE)
  screw(w(0.048), h(0.048))
  screw(w(0.048), h(0.952))
}
function sailShape() {
  noStroke()
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = w(0.01);
  drawingContext.shadowColor = 'black';
  let sail_color = palette.aux
  const sail_width = w(0.5)
  let sail_bottom_split = sail_width+sail_width/3
  let sail_bottom_split_2 = sail_width+sail_width/2
  fill(sail_color[0],sail_color[1],sail_color[2],120)
  beginShape()
  vertex(w(0.998),h(.998))
  vertex(w(0.97),h(.998))
  vertex(w(0.97),h(.8))
  vertex(sail_bottom_split_2,h(.998))
  vertex(sail_bottom_split,h(.998))
  vertex(sail_width,h(0.8))
  vertex(sail_width,h(0.6))
  vertex(w(0.97),h(0.1))
  vertex(w(0.97),h(0.002))
  vertex(w(0.998),h(0.002))
  endShape(CLOSE)
  drawingContext.shadowBlur = 0;
  let color_c1_sail = gradient_3;
  let b1_sail = color(color_c1_sail[0], color_c1_sail[1], color_c1_sail[2], 10);
  let b2_sail = color(255,255,255,125);
  const gradient_mid_sail = rnd(sail_width,w(0.998))
  let sail_num_lines = 400

  for (let i = 0; i < sail_num_lines; i++){
    let x = map(i, 0, sail_num_lines, sail_width, w(0.998))
    if (x <= gradient_mid_sail){
        let inter = map(x, sail_width, gradient_mid_sail, 1, 0)
        c = lerpColor(b1_sail, b2_sail, inter)
      }else{
        let inter2 = map(x, gradient_mid_sail, w(0.998), 1, 0)
        c = lerpColor(b2_sail, b1_sail, inter2)
      }
    if (x < w(0.97)){
        y1 = map(x,sail_width,w(0.97),h(0.6),h(0.1))
        if(x < sail_bottom_split){
          y2 = map(x,sail_width,sail_bottom_split,h(0.8),h(.998))
        }else if(x > sail_bottom_split && x < sail_bottom_split_2){
          y2 = h(.998)
        }else{
          y2 = map(x,sail_bottom_split_2,w(0.97),h(0.998),h(.8))
        }
    }else{
        y1 = h(0.002)
        y2 = h(.998)
    }
    stroke(c)
    strokeWeight((w(0.998) - sail_width)/sail_num_lines)
    line(x,y1,x,y2)
  }
}
function bigSwoop(pal, pal2) {
  noStroke()
  fill(pal[0],pal[1],pal[2], 155)
  push()
  rectMode(CORNER)
  let jw = w(.56)
  let jy = h(.35)
  let jpegs = [[1.2*jw,1.3*jy,w(.003),h(.005)],[1.3*jw,1.5*jy,w(.006),h(.01)],[1.25*jw,1.25*jy,w(.004),h(.009)],[1.22*jw,1.6*jy,w(.003),h(.004)],[1.24*jw,1.65*jy,w(.002),h(.003)]]
  beginShape()
  //rect(w(0.56),h(0.35),w(.23),h(.648))
  vertex(w(0.56),h(0.35))
  vertex(w(0.56),h(0.998))
  vertex(w(0.79),h(0.998))
  vertex(w(0.79),h(0.35))
  jpegs.forEach(i => jpegArt(i[0],i[1],i[2],i[3]))
  endShape(CLOSE)
  pop()
  fill(pal2[0],pal2[1],pal2[2], 155)
  beginShape();
  vertex(w(.003),h(0.7312));
  bV(w(0),h(0.7312),w(0.2082),h(1.11),w(0.6666),h(0.96078));
  bV(w(1.09107),h(0.7812),w(1.02),h(0.3871),w(0.937),h(0.2264));
  bV(w(0.8808),h(0.1246),w(0.80214),h(0.06281),w(0.80214),h(0.0628));
  vertex(w(0.80214),h(.003));
  vertex(w(0.76475),h(.003));
  vertex(w(0.76475),h(0.85641));
  bV(w(0.76475),h(0.85641),w(0.359),h(1.15432),w(0.04483),h(0.7312));
  beginContour();
  vertex(w(0.83194),h(0.13688));
  bV(w(1.014),h(0.33565),w(1),h(0.64225), w(0.80342),h(0.825));
  vertex(w(0.80342),h(0.825));
  bV(w(0.81321),h(0.11752),w(0.80342),h(0.10848), w(0.82278),h(0.12688));
  endContour();
  endShape();
  /*beginShape();
  vertex(w(0.59238),h(0.12477));
  bV(w(0.42761),h(0.12477),w(0.294),h(0.25835),w(0.294),h(0.42313));
  bV(w(0.294),h(0.58791),w(0.42761),h(0.72149),w(0.59238),h(0.72149));
  endShape();*/
  angleMode(DEGREES)
  let as = rnd(w(0.43),w(0.72))
  fill(pal[0],pal[1],pal[2], 155)
  arc(w(0.65),h(0.45),1.1*as,0.81*as,150,210,OPEN)
  fill(pal2[0],pal2[1],pal2[2], 155)
  arc(w(0.65),h(0.45),as,as,90,270,OPEN)
  let s_p = [[w(.784),h(.013)],[w(.784),h(.87)],[w(.04),h(.755)],[w(0.65) - 0.05*as,h(0.45) + 0.45*as],[w(0.65) - 0.05*as,h(0.45) - 0.45*as],[w(0.65) - 0.465*as,h(0.42)],[w(0.65) - 0.465*as,h(0.48)],[w(.78),h(.987)],[w(.987),h(.5)]]
  s_p.forEach(i => screw(i[0],i[1]))
}
function silo_tr() {
  beginShape();
  vertex(w(.38283),h(.12481));
  bV(w(.38283),h(.12481),w(.40083),h(.07661),w(.49983),h(.07414));
  bV(w(.59411),h(.07414),w(.61701),h(.12481),w(.61701),h(.12481));
  endShape();

  beginShape();
  vertex(w(.37963),h(.54133));
  vertex(w(.37963),h(.77688));
  bV(w(.37963),h(.77688),w(.37476),h(.8343),w(.50016),h(.84249));
  bV(w(.61846),h(.84249),w(.62037),h(.77688),w(.62037),h(.77688));
  vertex(w(.62037),h(.54176));
  vertex(w(.50016),h(.81344));
  endShape();

  beginShape();
  vertex(w(.38283),h(.12481));
  bV(w(.38283),h(.12481),w(.37963),h(.1309),w(.37963),h(.1452));
  vertex(w(.37963),h(.54133));
  vertex(w(.19514),h(.12481));
  endShape();

  beginShape();
  vertex(w(.61717),h(.12481));
  bV(w(.61717),h(.12481),w(.62037),h(.1309),w(.62037),h(.1452));
  vertex(w(.62037),h(.54133));
  vertex(w(.80486),h(.12481));
  endShape();
}
function siloShapes(pal1,pal2,pal3,alpha) {
  fill(pal1[0],pal1[1],pal1[2],alpha)
  stroke(pal1[0],pal1[1],pal1[2],alpha/2)
  //strokeWeight(w(.002))
  noStroke()

  silo_tr()

  fill(pal2[0],pal2[1],pal2[2],alpha)
  //stroke(pal2[0],pal2[1],pal2[2],alpha/2)

  beginShape();
  vertex(w(.003),h(.003));
  vertex(w(.003),h(.997));
  vertex(w(.09794),h(.997));
  vertex(w(.09794),h(.54432));
  bV(w(.09794),h(.54432),w(.09856),h(.411),w(0.27536),h(.30592));
  vertex(w(.19514),h(.12481));
  vertex(w(.38283),h(.12481));
  bV(w(.3953),h(.09605),w(.44289),h(.07414),w(.49983),h(.07414));
  bV(w(.55659),h(.07414),w(.60427),h(.09659),w(.61701),h(.12481));
  vertex(w(.80486),h(.12481));
  vertex(w(.77866),h(.184));
  vertex(w(.78666),h(.18363));
  vertex(w(.91974),h(.18363));
  vertex(w(.91974),h(.003));
  endShape(CLOSE);

  fill(pal3[0],pal3[1],pal3[2],alpha/2)
  //stroke(pal3[0],pal3[1],pal3[2],alpha/2)

  beginShape();
  vertex(w(.50015),h(.81344));
  vertex(w(.37963),h(.54133));
  vertex(w(.37963),h(.13655));
  vertex(w(.38283),h(.12481));
  vertex(w(.61717),h(.12481));
  vertex(w(.62037),h(.13358));
  vertex(w(.62037),h(.54133));
  vertex(w(.50015),h(.81344));
  endShape();

  drawingContext.shadowOffsetX = -w(.01);
  drawingContext.shadowOffsetY = w(.01);
  drawingContext.shadowBlur = w(.023);
  fill(pal1[0],pal1[1],pal1[2],alpha/2)
  noStroke()
  silo_tr()

  let s_p = [[w(.018),h(.018)],[w(.018),h(.982)],[w(.904),h(.018)],[w(.904),h(.169)],[w(.45),h(.105)],[w(.55),h(.105)],[w(.4),h(.785)],[w(.6),h(.785)],[w(.25),h(.15)],[w(.75),h(.15)]]
  s_p.forEach(i => screw(i[0],i[1]))
  
}
// LOWER LAYER FUNCTIONS
function rug_layout() {
  bg_rect(palette.base)
  translate(-width/2,-height/2)
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  chooseTexture()
  bg_rug()
}
function perspective_layout() {
  bg_rect_noR(palette.base)
  translate(-width/2,-height/2)
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  chooseTexture()
  bg_perspective(palette.secondary,palette.primary,palette.accent)
}
function triangle_with_lines() {
  bg_rect(palette.base)
  translate(-width/2,-height/2)
  push()
  textured_bg_stripes(palette.secondary, palette.dark)
  chooseTexture()
  translate(width/2, height/2)
  let rt_2 = [0, HALF_PI, PI, TWO_PI]
  const rt_an_2 = rt_2[floor(rnd() * rt_2.length)];;
  rotate(rt_an_2)

  var y_limits_1 = [-h(0.5) + h(0.12), h(0.5)]
  var y_limits_2 = [-h(0.5), h(0.5) - h(0.12)]
  var y_limits_random = [y_limits_1, y_limits_2]
  const y_limits = y_limits_random[floor(rnd() * y_limits_random.length)];

  const alpha_under = 80
  const alpha_over = 115
  const alpha_lines = 125
  push()
  //translate(rnd(-w(0.25),w(0.25)),0)
  triangle_horizLines(palette.dark, alpha_under, y_limits)
  triangle_vertLines(palette.primary, alpha_over, y_limits)
  //blendMode(OVERLAY)
  var line_functions_linked = [triangle_line_structure_2]
  line_functions_linked[floor(rnd() * line_functions_linked.length)](w(0.006), palette.accent, alpha_lines);
  pop()
  pop()
}
function kellyLayout() {
  bg_rect(palette.base)
  translate(-width/2,-height/2)
  let x_left = w(0.15)
  let x_right = rnd(w(0.8),w(0.9))
  let y_top = h(0.1)
  let y_bottom = h(0.9)
  let bigRectColor = palette.secondary
  let insideShapeColor = palette.light
  let innerRectColor = palette.primary
  let stripeColor = palette.contrast
  let innerStripeColor = palette.light
  let x_left_inside = x_left + w(0.03);
  let x_right_inside = x_right - w(0.05);
  let y_top_inside = y_top + h(0.1);
  let y_bottom_inside = y_bottom - h(0.03);
  let x_sliver = x_left_inside + rnd(w(0.005),w(0.016));
  //let x_break = (x_left_inside+x_right_inside)/2
  chooseTexture()
  let nl1 = 1600
  for (let i = 0; i < nl1; i++){
    let x = map(i,0,nl1,x_left,x_right)
    texturedStroke_RGB(x, y_top, x, y_bottom, w(0.01), bigRectColor[0], bigRectColor[1], bigRectColor[2], 125) 
  }
  let nl2 = 500
  for (let i = 0; i < nl2; i++){
    let x = map(i, 0, nl2, x_left + w(0.1), x_right - w(0.1))
    texturedStroke_RGB(x, 1.25*y_top_inside, x, h(1), w(0.001), innerRectColor[0], innerRectColor[1], innerRectColor[2], 255)
  }
  blendMode(HARD_LIGHT)
  let fillColor = palette.primary
  fill(fillColor[0],fillColor[1],fillColor[2],125)
  chooseKellyOverlay()
  blendMode(BLEND)
  let nl3 = 1500
  for (let i = 0; i < nl3; i++){
    let x = map(i, 0, nl3, x_left_inside, x_right_inside)
    if(x < x_left + w(0.1)){
        texturedStroke_RGB(x, y_top_inside - h(0.02), x, 3*y_top_inside, w(0.01), insideShapeColor[0], insideShapeColor[1], insideShapeColor[2], 130)
    }else if(x > x_left + w(0.1) && x < x_right - w(0.1)){
        texturedStroke_RGB(x, y_top_inside - h(0.02), x, 1.25*y_top_inside, w(0.01), insideShapeColor[0], insideShapeColor[1], insideShapeColor[2], 130)
    }else{
        texturedStroke_RGB(x, y_top_inside - h(0.02), x, 2*y_top_inside, w(0.01), insideShapeColor[0], insideShapeColor[1], insideShapeColor[2], 130)
    }
  }
  let nl4 = 1000
  for (let i = 0; i <= nl4; i++){
    let x = map(i, 0, nl4, 0, x_right)
    texturedStroke_RGB(x, y_bottom, x, y_bottom + (h(1)-y_bottom)/2, w(0.006), stripeColor[0], stripeColor[1], stripeColor[2], 125)
  }
  let nl5 = 500
  for (let i = 0; i < nl5; i++){
    let x = map(i, 0, nl5, w(.15), width/2)
    texturedStroke_RGB(x, y_bottom + w(0.01), x, y_bottom + (h(1)-y_bottom)/2 - w(0.01), w(0.005), innerStripeColor[0], innerStripeColor[1], innerStripeColor[2], 95)
  }
  

}
function basicNewman() {
  bg_rect(palette.base)
  translate(-width/2,-height/2)
  chooseTexture()
  textured_bg_stripes(palette.secondary, palette.contrast)
  painted_rectangle(palette.primary)
  plH(w(0.005), palette.aux, 60)
  //plV(w(0.01), palette.light, 90)
}
function newManC() {
  bg_rect(palette.base)
  translate(-width/2,-height/2)
  chooseTexture()
  textured_bg_stripes(palette.secondary, palette.contrast)
  painted_rectangle(palette.primary)
  //circ(w(1),h(.5),w(.6),HALF_PI,PI+HALF_PI,palette.aux,125)
  c4()
  plH(w(0.005), palette.aux, 60)
  //plV(w(0.01), palette.light, 90)
}
function basicMoholy() {
  push()
  bg_rect(palette.base)
  translate(-width/2,-height/2)
  chooseTexture()
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  let rect_x = rnd(w(0.25),w(0.5))
  let rect_y = rnd(h(0.2),h(0.4))
  let rect_y_inside = rect_y + h(0.1)
  let rect_y_inside_low = rect_y + h(0.35)
  let rect_width = rect_x + (width - rect_x)/4
  let rect_height = rect_y + h(0.5)
  let rect_color = palette.secondary
  noStroke()
  let circle_color = palette.contrast
  fill(circle_color[0],circle_color[1],circle_color[2],255)
  ellipse(rect_x,rect_y_inside,2*(rect_y_inside-rect_y))
  fill(rect_color[0],rect_color[1],rect_color[2],135)
  //rect(rect_x,rect_y,rect_width,rect_height)
  beginShape()
  vertex(rect_x,rect_y)
  vertex(rect_width,rect_y)
  vertex(rect_width,rect_height)
  vertex(rect_x,rect_height)
  beginContour()
  vertex(rect_x-0.05*rect_width, rect_y_inside)
  vertex(rect_x-0.05*rect_width, rect_y_inside_low)
  vertex(rect_x+0.05*rect_width, rect_y_inside_low)
  vertex(rect_x+0.05*rect_width, rect_y_inside)
  endContour()
  endShape(CLOSE)
  angleMode(DEGREES)
  let angle_begin = rnd(360,720)
  let angle_diff = rnd(135,270)
  let angle_end = angle_begin + angle_diff
  let arc_x = rnd(w(0.3),w(0.5))
  let arc_y = arc_x
  let arc_size = map(arc_x,w(0.3),w(0.5),w(0.37),w(0.76))
  let second_angle_offset = angle_begin/3
  let wedge_angle_offset = rnd(50,135)
  noFill()
  let arc_color = palette.light
  let arc_color_2 = palette.accent
  let arc_color_3 = palette.secondary
  strokeCap(PROJECT)
  noStroke()
  fill(arc_color_3[0], arc_color_3[1], arc_color_3[2], 190)
  //arc(arc_x, arc_y, 1.12*arc_size, 1.12*arc_size, angle_begin-0.5*second_angle_offset, angle_begin+wedge_angle_offset, OPEN);
  crescent(angle_begin,arc_x,arc_y,0.57*arc_size,palette.secondary)
  noFill()
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = map(arc_size,w(0.32),w(0.8),w(0.001),w(0.004))
  drawingContext.shadowColor = 'grey';
  strokeWeight(arc_x/20)
  stroke(arc_color_2[0], arc_color_2[1], arc_color_2[2], 235)
  arc(arc_x, arc_y, 1.047*arc_size, 1.047*arc_size, angle_begin-second_angle_offset, angle_end-2*second_angle_offset);
  drawingContext.shadowBlur = map(arc_size,w(0.32),w(0.8),w(0.0095),w(0.0025))
  strokeWeight(arc_x/40)
  stroke(arc_color[0], arc_color[1], arc_color[2], 235)
  arc(arc_x, arc_y, arc_size, arc_size, angle_begin, angle_end);
  //moholyCircle(arc_x,arc_y,palette.light,arc_size/3,angle_begin,angle_end,0.01)
  pop()
}
function threeSquares() {
  push()
  bg_rect(palette.base)
  translate(-width/2,-height/2)
  chooseTexture()
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  let x_0 = w(0.02)
  let y_0 = h(0.02)
  let rect_size_1 = rnd(w(0.27),w(0.43))
  let rect_size_2 = 1.5*rect_size_1
  let rect1_color = palette.contrast
  rectMode(CORNER)
  //fill(rect1_color[0],rect1_color[1],rect1_color[2],135)
  //rect(x_0,y_0,rect_size_1,rect_size_1)
  let num_lines_small = 300
  for (let i = 0; i < num_lines_small; i++){
    let x = map(i ,0, num_lines_small, x_0, x_0 + rect_size_1)
    let y1 = y_0
    let y2 = y_0 + rect_size_1
    texturedStroke_RGB(x, y1, x, y2, w(.004), rect1_color[0],rect1_color[1],rect1_color[2],225)
  }
  //noStroke()
  let rect2_color = palette.secondary
  //fill(rect2_color[0],rect2_color[1],rect2_color[2],135)
  //rect(x_0+rect_size_1/4,y_0+rect_size_1/4,rect_size_2,rect_size_2)
  let num_lines_mid = 500
  for (let i = 0; i < num_lines_mid; i++){
    let y = map(i ,0, num_lines_mid, y_0+rect_size_1/4,y_0+rect_size_1/4 + rect_size_2)
    let x1 = x_0+rect_size_1/4
    let x2 = x_0+rect_size_1/4 + rect_size_2
    texturedStroke_RGB(x1, y, x2, y, w(.005), rect2_color[0],rect2_color[1],rect2_color[2],125)
}
  let rect3_color = palette.primary
  //fill(rect3_color[0],rect3_color[1],rect3_color[2],135)
  //rect(x_0+rect_size_1,y_0+rect_size_1,1.3*rect_size_2,1.3*rect_size_2)
  let num_lines_big = 280
  for (let i = 0; i < num_lines_big; i++){
    let x = map(i ,0, num_lines_big, x_0+rect_size_1, x_0 + 1.3*rect_size_2)
    let y1 = y_0+rect_size_1
    let y2 = y_0 + 1.3*rect_size_2
    texturedStroke_RGB(x, y1, x, y2, w(.005), rect3_color[0],rect3_color[1],rect3_color[2],150)
  }
  let line1_color = palette.accent
  let line2_color = palette.light
  let x_split = rnd((w(0.4),w(0.75)))
  let num_lines_bar = 600
  for (let i = 0; i < num_lines_bar; i++){
    let x = map(i, 0, num_lines_bar, x_0, w(0.85))
    let y1 = y_0
    let y2 = y_0 + rect_size_1/6
      if(x < x_split){
      texturedStroke_RGB(x, y1, x, y2, w(0.005), line1_color[0],line1_color[1],line1_color[2],150)
    }else{
      texturedStroke_RGB(x, y1, x, y2, w(.005), line2_color[0],line2_color[1],line2_color[2],125)
    }
  }
  pop()
}
function squaresSail() {
  push()
  bg_rect(palette.base)
  translate(-width/2,-height/2)
  chooseTexture()
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  let x_left_out = rnd(w(0.1),w(0.2))
  let x_right_out = w(1) - x_left_out
  let y_top_out = rnd(h(0.06),h(0.18))
  let y_bottom_out = h(1) - 1.5*y_top_out
  let x_left_in = x_left_out + rnd(w(0.05),w(0.1))
  let x_right_in = x_right_out - rnd(w(0.05),w(0.1))
  let y_top_in = y_top_out + rnd(w(0.05),w(0.1))
  let y_bottom_in = y_bottom_out - rnd(w(0.05),w(0.1))
  let color_1 = palette.secondary
  let color_2 = palette.primary
  let color_3 = palette.light
  let color_4 = palette.accent
  let color_5 = palette.dark
  let num_lines_1 = 650
  for (let i = 0; i < num_lines_1; i++){
    let x = map(i, 0, num_lines_1, x_left_out, x_right_out)
    let y1 = y_top_out
    let y2 = y_bottom_out
    texturedStroke_RGB(x, y1, x, y2, w(.005), color_1[0],color_1[1],color_1[2],125)
  }
  let num_lines_2 = 600
  for (let i = 0; i < num_lines_2; i++){
    let x = map(i, 0, num_lines_2, x_left_in, x_right_in)
    let y1 = y_top_in
    let y2 = y_bottom_in
    texturedStroke_RGB(x, y1, x, y2, w(.005), color_2[0],color_2[1],color_2[2],125)
  }
  let sail_x_left = x_left_out
  let sail_x_2 = 1.35*x_left_in 
  let sail_x_3 = sail_x_2 + w(0.035)
  let sail_x_4 = w(0.5)
  let sail_x_end = w(0.52)
  let sail_y_top = h(0)
  let sail_y_2 = y_top_out/2
  let sail_y_3 = h(0.5)
  let sail_y_4 = sail_y_3 + h(0.1)
  let sail_y_5 = sail_y_4
  let sail_y_end = y_bottom_out
  let num_lines_sail = 450
  for (let i = 0; i < num_lines_sail; i++){
    let x = map(i, 0, num_lines_sail, sail_x_left, sail_x_end)
    if(x < sail_x_4){
      y1 = map(x,sail_x_left,sail_x_4,sail_y_3,sail_y_2)
    }else{
      y1 = sail_y_top
    }
    if(x <= sail_x_2){
      y2 = map(x,sail_x_left,sail_x_2,sail_y_4,sail_y_end)
    }else if(x > sail_x_2 && x <= sail_x_3){
      y2 = sail_y_end
    }else if(x > sail_x_3 && x < sail_x_4){
      y2 = map(x,sail_x_3,sail_x_4,sail_y_end,sail_y_5)
    }else{
      y2 = sail_y_end
    }
    texturedStroke_RGB(x, y1, x, y2, w(.005), color_3[0],color_3[1],color_3[2],135)
  }
  let num_lines_4 = 800
  for (let i = 0; i < num_lines_4; i++){
    let y = map(i, 0, num_lines_4, y_top_out, 1.1*y_bottom_out)
    let x1 = 0.9*x_left_out
    if(y <= y_bottom_out){
      x2 = x_left_out
    }else{
      x2 = sail_x_4
    }
    texturedStroke_RGB(x1, y, x2, y, w(.003), color_4[0],color_4[1],color_4[2],125)
  }
  let num_lines_5 = 400
  for (let i = 0; i < num_lines_5; i++){
    let x = map(i, 0, num_lines_5, sail_x_4, x_right_out)
    let y1 = y_bottom_out
    let y2 = 1.1*y_bottom_out
    texturedStroke_RGB(x, y1, x, y2, w(.005), color_5[0],color_5[1],color_5[2],125)
  }
  pop()
}
function trident() {
bg_rect(palette.base)
translate(-width/2,-height/2)
chooseTexture()
push()
let scaleDegree = rnd(0.8,1.04)
let trident_color = palette.primary
noStroke()
fill(trident_color[0],trident_color[1],trident_color[2],185)
drawingContext.shadowOffsetX =  0;
drawingContext.shadowOffsetY = 0;
drawingContext.shadowBlur = map(scaleDegree,0.5,1.1,w(0.0005),w(0.003));
drawingContext.shadowColor = 'black';
scale(scaleDegree)
beginShape();
vertex(w(0.9417),h(0));
vertex(w(.8912),h(0));
bV(w(.8912),h(0),w(0.8114),h(0.4973),w(0.5088),h(0.5603));
vertex(w(0.5222),h(0.0597));
vertex(w(0.4442),h(0.09418));
vertex(w(0.43393),h(0.56664));
bV(w(0.123),h(0.55332),w(0.0347),h(0),w(0.0347),h(0));
vertex(w(0),h(0));
vertex(w(0),h(0.11));
bV(w(0),h(0.11),w(0.06349),h(0.58058),w(0.43284),h(0.62284));
vertex(w(0.426),h(0.9509));
vertex(w(0.5),h(0.8951));
vertex(w(0.5073),h(0.62257));
bezierVertex(w(0.82914),h(0.57986),w(0.94169),h(0),w(0.94169),h(0));
endShape();
pop()
let shape_color = palette.accent
let shape_x1 = rnd(w(0.06),w(0.23))
let shape_x2 = shape_x1 + w(scaleDegree)/5
let y_max = map(scaleDegree, 0.5, 1.1, h(0.35), h(0.9))
let nlines = 150
for (let i = 0; i < nlines; i++){
  let x = map(i, 0, nlines, shape_x1, shape_x2)
  let y1 = h(0)
  let y2 = map(x, shape_x1, shape_x2, y_max, y_max - 0.03*y_max)
  texturedStroke_RGB(x, y1, x - map(y_max,h(0.3),h(0.7),0.06*x,0.032*x), y2, w(0.008), shape_color[0],shape_color[1],shape_color[2], 125)
}
crescent(115, map(scaleDegree, 0.5, 1.1, w(0.35), w(0.5)), map(scaleDegree, 0.5, 1.1, h(0.35), h(0.5)), map(scaleDegree, 0.5, 1.1, h(0.28), h(0.5)), palette.aux)
}
// OVERLAY FUNCTIONS
function fourPieceOverlay() {
  push()
  const y_limits_1 = [-h(0.5) + h(0.12), h(0.5)]
  const y_limits_2 = [-h(0.5), h(0.5) - h(0.12)]
  const y_limits_random = [y_limits_1, y_limits_2]
  //const y_limits = y_limits_random[floor(rnd() * y_limits_random.length)];
  const x_l = w(0)
  const x_m = rnd(w(0.25),w(0.5))
  const x_l_m = (x_m - x_l)/2
  const x_r = w(1)
  //const x_r_m = (x_r - (x_r - x_m))/2 // for future use to align
  const y_l = rnd(h(0.1),h(0.3))
  const y_r = rnd(h(0.6),h(0.85))
  const window_width = (x_m - x_l_m)/3
  window_overlay(x_l_m, x_l_m + window_width, x_m, x_m - window_width, y_l, y_l+window_width, h(1), palette.base, w(0.015), -w(.008), 0)
  rectangle_with_triangleCutout(x_m, x_r, y_r, h(0), palette.aux)
  gradient_plate(x_l, x_l_m, h(0), x_m, h(1), y_l, palette.gradient, palette.gradient, palette.contrast)
  push()
  pop()
  gradient_flat(x_m, y_r, x_r-x_m, (h(1)-y_r)/2, palette.gradient, palette.gradient)
  window_overlay(x_l_m, x_l_m + window_width, x_m, x_m - window_width, y_l, y_l+window_width, h(1), palette.light, w(0.025), -w(.01), 0) //maybe delete?
  pop()
  let s_p = [[x_l_m/2, h(1) - h(0.04)],[x_l_m/2, y_l/1.5],[x_m-x_l_m/2, y_l/1.5],[x_m +w(.02),y_r+h(.02)],[x_r -w(.02),y_r+h(.02)],[x_m+w(.02),h(.02)],[x_m+w(.02),y_r-h(.02)],[x_r-w(.02),h(.02)],[x_r-w(.02),y_r-h(.02)]]
  s_p.forEach(i => screw(i[0],i[1]))
}
function tulipCutOut() {
  drawingContext.shadowOffsetX =  0;
  drawingContext.shadowOffsetY = -w(0.003);
  drawingContext.shadowBlur = w(0.016);
  drawingContext.shadowColor = 'black';
  push()
  let shift_x = rnd(w(0.1), w(0.23))
  const a = rnd(-w(.15), w(.023))
  meetingCircles(palette.light, shift_x, a, 75)
  blendMode(SCREEN)
  meetingCircles(palette.light, shift_x, a, 165)
  pop()
}
function kelly_Bshape2() {
  push()
  drawingContext.shadowOffsetX =  0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = w(.015);
  drawingContext.shadowColor = 'black';
  noStroke()
  let a = rnd(-w(.08),w(.08))
  bShape(palette.aux,a,125)
  blendMode(SCREEN)
  bShape(palette.aux,a,85)
  pop()
  let s_p = [[w(0.882) + a - w(0.03),h(.985)],[w(0.914) + a - w(0.03),h(.015)],[w(0.353) + a + w(0.03),h(.985)],[w(0.353) + a + w(0.03),h(0.015)],[w(0.192) + a,h(.985)],[w(0.192) + a,h(.015)]]
  s_p.forEach(i => screw(i[0],i[1]))
}
function windowAndSail() {
  push()
  const window_x_left = w(0.003)
  const window_x_right = rnd(w(0.35),w(0.65))
  console.log(window_x_right)
  const window_width = (window_x_right - window_x_left)/7
  const window_top = rnd(h(0.1),h(0.25))
  const bar_height = rnd(h(0.05),h(0.15))
  const sail_width = window_x_right + w(0.005)
  window_overlay(window_x_left, window_x_left + window_width, window_x_right, window_x_right - window_width, window_top, window_top+window_width, h(1) - bar_height, palette.aux, w(0.015))
  noStroke()
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = w(0.01);
  drawingContext.shadowColor = 'black';
  let sail_color = palette.accent
  let sail_bottom_split = sail_width+sail_width/4
  fill(sail_color[0],sail_color[1],sail_color[2],120)
  strokeWeight(w(.002))
  stroke(sail_color[0],sail_color[1],sail_color[2],60)
  beginShape()
  vertex(w(0.998),h(1)-bar_height-h(0.003))
  vertex(sail_bottom_split,h(1)-bar_height-h(0.003))
  vertex(sail_width,h(0.75))
  vertex(sail_width,h(0.6))
  vertex(w(0.97),h(0.1))
  vertex(w(0.97),h(0.002))
  vertex(w(0.998),h(0.002))
  endShape(CLOSE)
  drawingContext.shadowBlur = 0;
  let color_c1_sail = gradient_3;
  let b1_sail = color(color_c1_sail[0], color_c1_sail[1], color_c1_sail[2], 10);
  let b2_sail = color(255,255,255,185);
  const gradient_mid_sail = rnd(sail_width,w(0.998))
  let n_l = 650
  strokeWeight((w(0.998)-sail_width)/n_l - w(.0005))
  for (let i = 1; i < n_l; i++){
    let x = map(i, 0, n_l, sail_width, w(0.998))
    if (x <= gradient_mid_sail){
        let inter = map(x, sail_width, gradient_mid_sail, 1, 0)
        c = lerpColor(b1_sail, b2_sail, inter)
      }else{
        let inter2 = map(x, gradient_mid_sail, w(0.998), 1, 0)
        c = lerpColor(b2_sail, b1_sail, inter2)
      }
    if (x < w(0.97)){
        y1 = map(x,sail_width,w(0.97),h(0.6),h(0.1))
        if(x < sail_bottom_split){
            y2 = map(x,sail_width,sail_bottom_split,h(0.75),h(1)-bar_height-h(0.003))
        }else{
            y2 = h(1)-bar_height-h(0.003)
        }
    }else{
        y1 = h(0.002)
        y2 = h(1)-bar_height-h(0.003)
    }
    stroke(c)
    line(x,y1,x,y2)
  }
  let bar_color = palette.secondary
  fill(bar_color[0],bar_color[1],bar_color[2],85)
  drawingContext.shadowBlur = w(0.01);
  beginShape()
  vertex(w(0.002),h(1)-bar_height)
  vertex(w(0.998),h(1)-bar_height)
  vertex(w(0.998),h(0.998))
  vertex(w(0.002),h(0.998))
  endShape(CLOSE)
  colorMode(RGB, 255, 255, 255, 255);
  let color_c1 = gradient_1
  //let color_c2 = gradient_3
  let b1 = color(color_c1[0], color_c1[1], color_c1[2], 35)
  let b2 = color(255,255,255,165)
  let gradient_mid = rnd(w(0.2),w(0.8))
  strokeCap(SQUARE)
  drawingContext.shadowBlur = 0;
  let bar_nl = 1000
  for (let i = 0; i < bar_nl; i++){
    let x = map(i, 0, bar_nl, w(0.002), w(0.998))
    if (x <= gradient_mid){
      let inter = map(x, 0, gradient_mid, 1, 0)
      c = lerpColor(b1, b2, inter)
      strokeWeight((w(0.0013)))
      stroke(c) // MAIN STROKE
      line(x, h(1)-bar_height, x, h(0.998))
    }else{
      let inter2 = map(x, gradient_mid, w(1), 1, 0)
      let c2 = lerpColor(b2, b1, inter2)
      stroke(c2) // OVERLAY STROKE
      line(x, h(1)-bar_height, x, h(0.998))
    }
  }
  let s_p = [[w(.015),h(1)-bar_height/2],[w(.985),h(1)-bar_height/2],[w(.985),h(1)-bar_height-h(.0152)],[w(0.985),h(0.015)],[sail_width + w(.015),h(0.61)],[sail_width + w(.015),h(0.74)]]
  s_p.forEach(i => screw(i[0],i[1]))
  pop()
}
function sails() {
  push()
  sailShape()
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = w(0.01);
  drawingContext.shadowColor = 'black';
  triRect(palette.contrast, 115)
  triCut(palette.accent,165)
  drawingContext.shadowOffsetX = -w(.01);
  drawingContext.shadowOffsetY = w(.01);
  drawingContext.shadowBlur = w(.025);

  triCut(palette.accent,95)
  let s_p = [[w(.015),h(.015)],[w(.985),h(.015)],[w(.985),h(.985)],[w(0.015),h(0.985)],[w(0.485),h(0.985)],[w(0.485),h(0.015)],[w(0.71),h(0.985)],[w(0.52),h(0.62)],[w(0.52),h(0.78)],[w(.135),h(.135)],[w(.365),h(.135)],[w(.135),h(.865)],[w(.365),h(.865)],[w(.105),h(.255)],[w(.395),h(.255)]]
  s_p.forEach(i => screw(i[0],i[1]))
  pop()
}
function crescentAndRectangles() {
  push()
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = w(0.01);
  drawingContext.shadowColor = 'black';
  let crescentColor = palette.o
  noStroke()
  fill(crescentColor[0],crescentColor[1],crescentColor[2],190)
  crescentCutOut()
  let rectanglesColor = palette.accent
  fill(rectanglesColor[0],rectanglesColor[1],rectanglesColor[2],185)
  twoRectangles()
  blendMode(SCREEN)
  fill(crescentColor[0],crescentColor[1],crescentColor[2],35)
  crescentCutOut()
  pop()
}
function curveSilo() {
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = w(0.01);
  drawingContext.shadowColor = 'black';
  siloShapes(palette.aux, palette.o, palette.contrast, 165)
}
function swoop() {
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = w(0.01);
  drawingContext.shadowColor = 'black';
  bigSwoop(palette.o, palette.contrast) 
}
// COMBO FUNCTIONS
function chooseLower(options, decPair) {
  return options[floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
}

function chooseUpper(options, decPair) {
  return options[floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
}

function choosePerimeter(options, decPair) {
  return options[floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
}

const styles = {
  tulip: {
    id: "tulip",
    upper: [tulipCutOut],
    lower: [rug_layout,perspective_layout,triangle_with_lines,kellyLayout,basicNewman,threeSquares,basicMoholy,squaresSail,trident],
    perimeter: [perimeter_general, perimeter_1, perimeter_2, perimeter_3]
  },
  combine: {
    id: "combine",
    upper: [fourPieceOverlay, windowAndSail, kelly_Bshape2, crescentAndRectangles, curveSilo, sails, swoop],
    lower: [rug_layout,triangle_with_lines,kellyLayout,basicNewman,threeSquares,basicMoholy,squaresSail,trident],
    perimeter: [perimeter_general, perimeter_1, perimeter_2, perimeter_3]
  }
}

function chooseResult() {
    const resultPercent = map(decPairs[7],0,255,0,1);
    let style = styles.combine;
    if (resultPercent < .05) {
        style = styles.tulip;
    }
    const lower = chooseLower(style.lower, 4);
    const perimeter = choosePerimeter(style.perimeter, 3);
    const upper = chooseUpper(style.upper, 6);

    if(styles.tulip.id === style.id) {
      push();
    }
    lower();
    perimeter();
    if(styles.tulip.id === style.id) {
      pop();
    }
    if(perimeter === perimeter_3){
      scale(0.7)
      translate(w(0.215),h(0.215))
    }else{
      scale(0.95)
      translate(w(0.026),h(0.026))
    }
    upper();
  }