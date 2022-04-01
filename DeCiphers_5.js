const hashPairs = [];
for (let j = 0; j < 32; j++) {
  hashPairs.push(tokenData.hash.slice(2 + (j * 2), 4 + (j * 2)));
}
const decPairs = hashPairs.map(x => {
    return parseInt(x, 16);
  });
S=Uint32Array.from([0,1,s=t=2,3].map(i=>parseInt(tokenData.hash.substr(i*8+2,8),16)));R=_=>(t=S[3],S[3]=S[2],S[2]=S[1],S[1]=s=S[0],t^=t<<11,S[0]^=(t^t>>>8)^(s>>>19),S[0]/2**32);
function rnd(min, max) {
    const rand = R();
    if (typeof min === 'undefined') {
      return rand;
    } else if (typeof max === 'undefined') {
      if (min instanceof Array) {
        return min[Math.floor(rand * min.length)];
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
      aux: [55,178,177]
    },
    matisse_B: {
      base: [236,162,121],
      secondary: [38,120,186],
      primary: [219,68,106],
      accent: [41,181,114],
      dark: [48,48,47],
      light: [240,239,205],
      contrast: [250,191,183],
      aux: [64,183,158]
    },
    blueDom_A: {
      base: [59,74,124],
      secondary: [217,177,103],
      primary: [154,154,204],
      accent: [69,176,153],
      dark: [18,40,76],
      light: [243,231,210],
      contrast: [134,209,215],
      aux: [223,206,226]
    },
    blueDom_B: {
      base: [18,40,76],
      secondary: [110,131,147],
      primary: [164,219,225],
      accent: [241,97,34],
      dark: [20,30,55],
      light: [246,245,247],
      contrast: [59,74,124],
      aux: [132,206,242]
    },
    kelly_A: {
        base: [247,204,39],
        secondary: [16,141,199],
        primary: [36,181,111],
        accent: [241,89,48],
        dark: [23,35,66],
        light: [243,231,210],
        contrast: [237,105,152],
        aux: [134,204,225]
    },
    kelly_B: {
      base: [252,234,0],
      secondary: [69,84,165],
      primary: [237,28,36],
      accent: [74,183,73],
      dark: [4,3,3],
      light: [236,241,233],
      contrast: [247,204,39],
      aux: [79,169,160]
  },
    moholyNagy_A: {
        base: [242,237,208],
        secondary: [99,101,103],
        primary: [206,54,49],
        accent: [61,136,122],
        dark: [44,81,112],
        light: [241,237,211],
        contrast: [135,38,41],
        aux: [246,237,123]
    },
    moholyNagy_B: {
      base: [14,32,52],
      secondary: [203,203,203],
      primary: [44,81,112],
      accent: [224,199,74],
      dark: [135,38,41],
      light: [229,224,212],
      contrast: [206,54,49],
      aux: [97,188,191]
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
    },
    greys_B: {
        base: [112,111,105],
        secondary: [216,217,216],
        primary: [145,145,145],
        accent: [247,236,88],
        dark: [30,30,41],
        light: [250,243,165],
        contrast: [229,125,58],
        aux: [79,89,226],
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
    }
}
const gradient_1 = [201,233,234]
const gradient_2 = [226,227,226]
const gradient_3 = [246,245,247]
const randomPalette = function (palettes) {
  let keys = Object.keys(palettes);
  return palettes[keys[keys.length * rnd() << 0]];
};
const palette = randomPalette(palettes)
console.log(palette)
// SETUP & DRAW
function w(val) {if (val == null) return width;return width * val;}
function h(val) {if (val == null) return height;return height * val;}
//const u = w(0.001)
function setup() {
    const smallerDimension = windowWidth < windowHeight ? windowWidth : windowHeight;
    createCanvas(smallerDimension, smallerDimension);
}
function draw() {
  colorMode(RGB, 255, 255, 255, 255);
  //const combos = [overlay_setup_2,overlay_setup_5,overlay_setup_tulip]
  //combos[Math.floor(map(decPairs[0],0,255,0,combos.length - 0.001))]()
  chooseResult()
  noLoop()
}
// BG & TEXTURE FUNCTIONS
function bg_rect(pal) {
  noStroke()
  fill(pal[0],pal[1],pal[2], 255)
  translate(width/2,height/2)
  angleMode(DEGREES)
  let rotation_angles = [0, 90, 180, 270]
  let rotation_angle = rotation_angles[Math.floor(rnd() * rotation_angles.length)];;
  rotate(rotation_angle)
  rectMode(CENTER)
  rect(0,0,w(1),h(1))
}
function bg_rect_noRotation(pal) {
  noStroke()
  fill(pal[0],pal[1],pal[2], 255)
  translate(width/2,height/2)
  rectMode(CENTER)
  rect(0,0,w(1),h(1))
}
function texturedStroke_RGB(x1, y1, x2, y2, weight, r, g, b, alpha) {
  push()
  angleMode(RADIANS)
  colorMode(RGB, 255, 255, 255, 255);
  //var stroke_color = map(value, 0, max_vals, 0, 360)
  stroke(r, g, b, alpha)
  for (let i = 0; i < weight*w(0.005); i += w(0.001)){
    let theta = random(TWO_PI);
    let nx1 = x1 + 0.5*random(weight/2)*cos(theta);
    let ny1 = y1 + 0.5*random(weight/2)*sin(theta);
    let nx2 = x2 + 0.5*random(weight/2)*cos(theta);
    let ny2 = y2 + 0.5*random(weight/2)*sin(theta);
    strokeWeight(w(0.0005));
    line(nx1, ny1, nx2, ny2)
  }
  pop()
}
function bg_perspective() {
  colorMode(RGB, 255, 255, 255, 255)
  const x_left_1 = random(w(0.05), w(0.15))
  const y_top_1 = random(h(0.05), h(0.15))
  const x_right_1 = random(w(0.7),w(0.85))
  const y_bottom_1 = random(h(0.7),h(0.85))
  const shift = random(w(0.05),w(0.13))
  const x_left_2 = x_left_1 + shift/2
  const x_right_2 = x_right_1 - shift/2
  const y_top_2 = y_top_1 + shift/2
  const y_bottom_2 = h(1) - shift/2
  const xMid = random(w(0.4), w(0.6))
  const y_split = random(h(0.15), h(0.4))
  blendMode(SCREEN)
  for (let x = x_left_1; x < x_right_1; x += w(0.002) ) {
    let y1 = y_top_1
    let y2 = map(x, x_left_1, x_right_1, y_bottom_1 - shift, y_bottom_1)
    texturedStroke_RGB(x, y1, x, y2, w(0.01), 255, 238, 237, 25)
  }
  for (let x = x_left_1 + shift; x < x_right_1 + shift; x += w(0.002) ) {
    let y1 = y_top_1 + shift
    let y2 = map(x, x_left_1 + shift, x_right_1 + shift, y_bottom_1, y_bottom_1 + shift)
    texturedStroke_RGB(x, y1, x, y2, w(0.01), 245, 240, 240, 25)
  }
  blendMode(BLEND)
  color_select1 = palette.secondary
  for (let x = x_left_2; x < x_right_2; x += w(0.003) ) {
    let y1 = map(x, x_left_2, x_right_2, y_split, y_top_2)
    let y2 = map(x, x_left_2, x_right_2, y_split, h(0.6895))
    texturedStroke_RGB(x, y1, x + rnd(-w(0.001), w(0.001)), y2, w(0.01), color_select1[0], color_select1[1], color_select1[2], 35)
  }
  color_select2 = palette.primary
  for (let x = x_left_2; x < x_right_2; x += w(0.002) ) {
    let y1 = map(x, x_left_2, x_right_2, y_split, h(0.6895))
    if(x < xMid){
        y2 = map(x, x_left_2, xMid, h(0.54595), h(0.80135))
    }else{
        y2 = map(x, xMid, x_right_2, h(0.80135), h(0.6895))
    }
    texturedStroke_RGB(x, y1, x + rnd(-w(0.001), w(0.001)), y2, w(0.01), color_select2[0], color_select2[1], color_select2[2], 35)
  }
  color_select3 = palette.accent
  for (let x = x_left_2; x < xMid; x += w(0.003) ) {
    let y1 = map(x, x_left_2, xMid, h(0.54595), h(0.80135))
    let y2 = map(x, x_left_2, xMid, y_bottom_2, h(0.80135))
    texturedStroke_RGB(x, y1, x + rnd(-w(0.001), w(0.001)), y2, w(0.01), color_select3[0], color_select3[1], color_select3[2], 35)
  }
}
function bg_rug() {
  color_select1 = palette.primary
  color_select2 = palette.contrast
  color_select3 = palette.secondary
  colorMode(RGB, 255, 255, 255, 255);
  let x_left = w(0.1)
  let x_right = w(0.9)
  let x_left_m = rnd(w(0.3),w(0.5))
  let x_right_m = rnd(w(0.5),w(0.8))
  let y_top = h(0.1)
  let y_bottom = h(0.9)
  let y_l_split = rnd(w(0.3),w(0.7))
  //let y_m_split = rnd(w(0.3),w(0.7))
  let y_r_split = rnd(w(0.3),w(0.7))
  let y_diff = rnd(h(0.05),h(0.2))
  for(let x = x_left; x < x_right; x += w(0.0015)){
      if(x < x_left_m){
        let y_mid = map(x,x_left,x_left_m,y_l_split-y_diff,y_l_split+y_diff)
        texturedStroke_RGB(x, y_top, x, y_mid, w(0.007), color_select1[0], color_select1[1], color_select1[2], 15)
        texturedStroke_RGB(x, y_mid, x, y_bottom, w(0.007), color_select2[0], color_select2[1], color_select2[2], 15)
      }else if(x >= x_left_m && x <= x_right_m){
        let y_mid = map(x,x_left_m,x_right_m,y_l_split+y_diff,y_r_split-y_diff)
        texturedStroke_RGB(x, y_top, x, y_mid, w(0.007), color_select3[0], color_select3[1], color_select3[2], 15)
        texturedStroke_RGB(x, y_mid, x, y_bottom, w(0.007), color_select1[0], color_select1[1], color_select1[2], 15)
      }else{
        let y_mid = map(x,x_right_m,x_right,y_r_split-y_diff,y_r_split+y_diff)
        texturedStroke_RGB(x, y_top, x, y_mid, w(0.007), color_select2[0], color_select2[1], color_select2[2], 15)
        texturedStroke_RGB(x, y_mid, x, y_bottom, w(0.007), color_select3[0], color_select3[1], color_select3[2], 15)
      }

  }
}
function brush_line_bg_texture_GS() {
    var line_color = random(90)
    var x1 = random(w(0), w(1))
    var x2 = x1 + random(-w(0.24),w(0.25))
    var y1 = 0
    var y2 = height
    var weight = random(w(0.35), w(0.8)) //width of line
    var value = random(w(0.003), w(0.01)) //density
    angleMode(RADIANS)
    var darkness = map(value, 0, w(0.01), 1, 9)
    for (let i = 0; i < weight*darkness*35; i += w(0.001)){
      var theta = random(TWO_PI);
      var nx1 = x1 + random(weight/2)*cos(theta);
      var ny1 = y1 + random(weight/2)*sin(theta);
      var nx2 = x2 + random(weight/2)*cos(theta);
      var ny2 = y2 + random(weight/2)*sin(theta);
      noStroke();
      fill(line_color,200)
      var lval = random(w(0.01))
      ellipse(lerp(nx1, nx2, lval), lerp(ny1, ny2, lval), w(0.0005))
    }
}
function dots_texture() {
  let xoff = 0
  let inc = w(0.00001)
  let yoff = 0
  let y_inc = h(0.5)
  for(let x = w(0); x <= w(1); x += w(0.005)){
      for(let y = h(0); y <= h(1); y += h(0.005)){
          fill(15, 165*noise(yoff))
          ellipse(x + 48*noise(xoff), y + 48*noise(xoff), w(0.001))
          yoff += y_inc
      }
    xoff += inc
  }
}
function checkerboard() {
  push()
  translate(width/2, height/2)
  angleMode(DEGREES)
  var rotation_angles = [0, 90, 180, 270]
  var rotation_angle = rotation_angles[Math.floor(rnd() * rotation_angles.length)];;
  rotate(rotation_angle)
  colorMode(RGB, 255, 255, 255, 255);
  blendMode(BURN)
  var size = random(w(0.003), w(0.006))
  var num_cols = width/size/2
  var num_rows = num_cols
  var xoff = 0
  var inc = w(0.005)
  for (let i = 0; i < num_cols; i++){
    for (let j = 0; j < num_rows + Math.floor(sin(xoff)*3) + random(-10,5); j++){
      fill(25, map(j,0,num_rows,125,1))
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
  colorMode(RGB, 255, 255, 255, 255);
  light_stripe = pal_1
  let y_shift = random(h(0.005), h(0.035))
  let y_start = random(-h(0.6), (0.2))
  let inc = w(0.0001);
  xoff = 0 
  for (let x = -width/2; x < width/2; x += w(0.009)){
    let y1 = y_start + noise(xoff)*(width/60)
    let y2 = height/2
    texturedStroke_RGB(x, y1, x, y2, w(0.03), light_stripe[0], light_stripe[1], light_stripe[2], 6)
    xoff += inc
  }
  light_stripe2 = pal_2
  let y_spacing = random(h(0.005), h(0.013))
  let relative_weight = y_spacing*9.136
  for (let y = random(-height/2 + h(0.15), h(0.15)); y < height/2 - h(0.1); y += y_spacing){
    texturedStroke_RGB(-width/2-w(0.12), y, width/2+w(0.12), y + y_shift, relative_weight, light_stripe2[0], light_stripe2[1], light_stripe2[2], 8)
  }
  pop()
}
function painted_rectangle(pal) {
  push()
  translate(width/2,height/2)
  let xPos1 = random(-w(0.45), -w(0.35))
  let xPos2 = xPos1 + w(0.85)
  let yPos1 = -w(0.65)
  let yPos2 = yPos1 + h(1.1)
  let alpha = random(13, 28)
  let inc = w(.0001)
  let xoff = 0 
  let main_color_selector = pal
  let weight = random(w(0.023), w(0.038))
  for (let x = xPos1; x < xPos2; x += random(w(0.003), w(0.005))) {
    let y_top = yPos2 
    texturedStroke_RGB(x, yPos1, x, y_top, weight, main_color_selector[0], main_color_selector[1], main_color_selector[2], alpha)
    xoff =+ inc
  }
  pop()
}
function painted_rectangle_overlay(weight, passedPalette, alpha) {
  push()
  y_start = random(h(0.25), h(0.45))
  for (let y = y_start; y < height/2; y += h(0.002)){
    let x1 = -width/2 - w(0.1)
    let x2 = width/2 + w(0.1)
    texturedStroke_RGB(x1, y, x2, y, weight, passedPalette[0], passedPalette[1], passedPalette[2], alpha)
  }
  pop()
}
function painterly_line_HL(weight, passedPalette, alpha) {
  colorMode(RGB, 255, 255, 255, 255);
  let inc = w(0.0001);
  xoff = 0 
  push()
  translate(width/2,height/2)
  let xPos1 = -w(0.9)
  let xPos2_options = [w(0.15), w(0.35), w(0.6)]
  let xPos2 = xPos2_options[Math.floor(Math.random() * xPos2_options.length)]
  let line_thickness = random(h(0.02), h(0.04))
  let yPos1 = random(h(0.15), h(0.35)) - noise(xoff)
  let yPos2 = yPos1 + line_thickness
  for (let y = yPos1; y < yPos2; y += random(h(0.0005),h(0.003))) {
    let x1 = xPos1
    let x2 = xPos2
    texturedStroke_RGB(x1, y, x2, y, weight, passedPalette[0], passedPalette[1], passedPalette[2], alpha)
  }
  xoff += inc
  pop()
}
function halftone_dots() {
    let num_dots = 160
    let cell_size = height/num_dots
    let xoff = 0
    let yoff = 0
    let inc = w(0.000002)
    let default_size = 0.6*cell_size
    noStroke()
    fill(30,125)
    for (let i = 0; i < num_dots; i++){
        let x = i*cell_size + noise(xoff)
        for (let j = 0; j < num_dots; j++){
            let y = j*cell_size + noise(yoff)
            ellipse(x,y,default_size*noise(xoff*yoff))
            yoff += inc
        }
        xoff += inc
    }
}
function crescent(a,x,y,r,pal) {
  push()
  angleMode(RADIANS)
  let rt = radians(a);
  let sx1 = x + r * cos(rt);
  let sy1 = y + r * sin(rt);
  let sx2 = x + r * cos(rt + PI);
  let sy2 = y + r * sin(rt + PI);
  stroke(0);
  let step = w(0.003);
  let stroke_color = pal
  //stroke(stroke_color[0],stroke_color[1],stroke_color[2],125);
  //strokeWeight(1);
  //line(sx1, sy1, sx2, sy2);
  for (let i = r/2; i < r; i+=step) {
    push();
    translate(x, y);
    point(0, 0);
    rotate(rt);
    translate(0, -i);
    let l = sqrt(r * r - i * i);
    line(l, 0, -l, 0);
    texturedStroke_RGB(l, 0, -l, 0, w(0.008), stroke_color[0],stroke_color[1],stroke_color[2],85)
    //translate(0, 2*i);
    //line(l, 0, -l, 0);
    pop();
  }
  pop()
}
// PERIMETERS
function perimeter_basic() {
  let perim_color = palette.dark
  let xoff = 0
  let inc = w(0.0001)
  for(let x = w(0); x <= w(1); x += w(0.0015)){
    let y1 = 0
    let y2 = h(0.01)
    let y3 = h(0.99)
    let y4 = h(1)
    texturedStroke_RGB(x, y1, x, y2 + 2*noise(xoff), w(0.003), perim_color[0], perim_color[1], perim_color[2], 90)
    texturedStroke_RGB(x, y3 - 2*noise(xoff), x, y4, w(0.003), perim_color[0], perim_color[1], perim_color[2], 90)
    xoff += inc
  }
  for(let y = h(0); y <= h(1); y += h(0.0015)){
    let x1 = 0
    let x2 = w(0.01)
    let x3 = w(0.99)
    let x4 = w(1)
    texturedStroke_RGB(x1, y, x2 + 2*noise(xoff), y, w(0.003), perim_color[0], perim_color[1], perim_color[2], 90)
    texturedStroke_RGB(x3 - 2*noise(xoff), y, x4, y, w(0.003), perim_color[0], perim_color[1], perim_color[2], 90)
    xoff += inc
  }
}
function perimeter_1() {
push()
drawingContext.shadowOffsetX =  0;
drawingContext.shadowOffsetY = 0;
drawingContext.shadowBlur = 10;
drawingContext.shadowColor = 'black';
noStroke()
fill(palette.dark[0],palette.dark[1],palette.dark[2],165)
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
screw(w(0.04),h(0.04))
screw(w(0.96),h(0.96))
pop()
}
function perimeter_2() {
push()
drawingContext.shadowOffsetX =  0;
drawingContext.shadowOffsetY = 0;
drawingContext.shadowBlur = 10;
drawingContext.shadowColor = 'black';
noStroke()
fill(palette.accent[0],palette.accent[1],palette.accent[2],165)
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
// CHOOSER FUNCTIONS
function chooseTexture() {
  const textures = [dots_texture, checkerboard, halftone_dots]
  textures[Math.floor(map(decPairs[11],0,255,0,textures.length - 0.001))]()
}
function chooseKellyOverlay() {
  const kellyOverlays = [kelly_bigB_2, kellyDoubleTriangleOverlay]
  kellyOverlays[Math.floor(map(decPairs[10],0,255,0,kellyOverlays.length - 0.001))]()
}
function choosePerimeter() {
  const perimeters = [perimeter_basic, perimeter_1, perimeter_2]
  perimeters[Math.floor(map(decPairs[5],0,255,0,perimeters.length - 0.001))]()
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
  var inc = w(0.0015);
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
  var inc = w(0.0015);
  xoff = 0 
  var noise_coeff = w(0.0035)
  for (let x = -width/2; x < 0; x += w(0.001)){
    var y = map(x, -width/2, 0, y_limits[1], y_limits[0])
    texturedStroke_RGB(x, y - 7*noise(xoff+noise_coeff), x, y_limits[1], w(0.003), passed_palette[0], passed_palette[1], passed_palette[2], alpha)
    xoff += inc
  }
  for (let x = 0; x < width/2; x += w(0.001)){
    var y = map(x, 0, width/2, y_limits[0], y_limits[1])
    texturedStroke_RGB(x, y - 7*noise(xoff+noise_coeff), x, y_limits[1], w(0.003), passed_palette[0], passed_palette[1], passed_palette[2], alpha)
    xoff += inc
  }
}
function triangle_line_structure_2(weight, passed_palette, alpha) {
  push()
  var rotate_options = [0,180]
  rotation_value = rotate_options[Math.floor(rnd() * rotate_options.length)];;
  angleMode(DEGREES)
  rotate(rotation_value)
  var line_end_options = [w(0.48), w(0.8)]
  line_end = line_end_options[Math.floor(rnd() * line_end_options.length)];;
  lines_vert_for_line_structure(width/2, w(0.045), weight, passed_palette, alpha/3)
  lines_vert_for_line_structure(0, w(0.015), weight, passed_palette, alpha)
  lines_horiz_for_line_structure(h(0.48), w(0.015), weight, passed_palette, alpha)
  lines_horiz_for_line_structure(h(0.21), w(0.015), weight, passed_palette, alpha)
  pop()
}
function kelly_bigB_2() {
strokeCap(PROJECT);
strokeJoin(MITER);
beginShape();
vertex(w(1),h(0.0284));
vertex(w(1),h(1));
bezierVertex(w(1),h(1),w(0.539),h(1),w(0.508),h(0.666));
bezierVertex(w(0.508),h(0.666),w(0.511),h(0.981),w(0),h(1));
vertex(w(0),h(0));
bezierVertex(w(0),h(0),w(0.394),h(0.0252),w(0.492),h(0.397));
bezierVertex(w(0.492),h(0.397),w(0.502),h(0.0442),w(1),h(0.0284));
endShape(CLOSE);
}
function kelly_bigB(x_shift, pal, alpha) {
  push()
  translate(x_shift, 0)
  //strokeWeight(w(0.001))
  stroke(pal[0], pal[1], pal[2], alpha/3)
  fill(pal[0], pal[1], pal[2], alpha)
  //noStroke()
  //let x_rand = rnd(-w(0.06),w(0.06))
  //let y_rand = rnd(-h(0.06),h(0.06))
  let x_rand = 0
  let y_rand = 0
  strokeCap(ROUND);
  strokeJoin(MITER);
  beginShape();
  vertex(w(0.075)+x_rand,h(0.074)+y_rand);
  vertex(w(0.91)+x_rand,h(0.074)+y_rand);
  bezierVertex(w(0.91)+x_rand,h(0.074)+y_rand,w(0.91)+x_rand,h(0.46)+y_rand,w(0.62)+x_rand,h(0.486)+y_rand);
  bezierVertex(w(0.62)+x_rand,h(0.486)+y_rand,w(0.89)+x_rand,h(0.484)+y_rand,w(0.91)+x_rand,h(0.92)+y_rand);
  vertex(w(0.051)+x_rand,h(0.92)+y_rand);
  bezierVertex(w(0.051)+x_rand,h(0.92),w(0.0728)+x_rand,h(0.584),w(0.391)+x_rand,h(0.5));
  bezierVertex(w(0.391)+x_rand,h(0.5),w(0.089)+x_rand,h(0.492),w(0.075)+x_rand,h(0.074));
  beginContour()
  vertex(w(0.0643),h(0));
  bezierVertex(w(0.0643),h(0),w(0.388),h(0.395),w(0.1128),h(1));
  vertex(w(0.25),h(1));
  bezierVertex(w(0.25),h(1),w(0.46),h(0.438),w(0.157),h(0));
  endContour()
  beginContour()
  vertex(w(0.775),h(0));
  bezierVertex(w(0.775),h(0),w(0.452),h(0.387),w(0.6838),h(1));
  vertex(w(0.8185),h(1));
  bezierVertex(w(0.8185),h(1),w(0.554),h(0.574),w(0.881),h(0));
  endContour()
  endShape(CLOSE);
  screw(w(0.14),h(0.03))
  screw(w(0.81),h(0.03))
  screw(w(0.18),h(0.97))
  screw(w(0.74),h(0.97))
  pop()
}
function smallCurve() {
  beginShape();
  vertex(0,h(1));
  vertex(w(0.1028),h(1));
  bezierVertex(w(0.378),h(0.3953),w(0.0543),h(0),w(0.0543),h(0));
  vertex(w(0),h(0));
  endShape();
}
function kellyDoubleTriangleOverlay() {
  push()
  translate(width/2,height/2)
  var y_limits_1 = [-h(0.5) + h(0.12), h(0.5)]
  var y_limits_2 = [-h(0.5), h(0.5) - h(0.12)]
  var y_limits_random = [y_limits_1, y_limits_2]
  const y_limits = y_limits_random[Math.floor(rnd() * y_limits_random.length)];
  blendMode(OVERLAY)
  triangle_horizLines(palette.contrast, 45, y_limits)
  pop()
}
function screw(x,y) {
    push()
    blendMode(BLEND)
    colorMode(RGB, 255, 255, 255, 255);
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = 'black';
    fill(224, 224, 224, 255)
    noStroke()
    ellipse(x, y, w(0.015))
    fill(121, 121, 121, 255)
    ellipse(x, y, w(0.0075))
    push()
    fill(224, 224, 224, 255)
    drawingContext.shadowBlur = 0;
    translate(x,y)
    rectMode(CENTER)
    angleMode(DEGREES)
    rotate(random(360))
    rect(0,0,w(0.014),h(0.003))
    rect(0,0,w(0.003),h(0.014))
    pop()
    pop()
}
function moholyCircle(x_t,y_t,pal,r,start,stop,step) {
  push()
  r = w(0.3);
  //angle = 0;
  //step = 0.1; //in radians equivalent of 360/6 in degrees
  strokeWeight(2)
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
// OVERLAY ASSEMBLY FUNCTIONS
function window_overlay(x_left_outside, x_left_inside, x_right_outside, x_right_inside, y_top, y_inside, y_bottom, passedPalette, shadowBlur) {
  push()
  drawingContext.shadowOffsetX =  - w(0.008);
  drawingContext.shadowOffsetY = 0;
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
  //let color_c2 = gradient_3
  let b1 = color(color_c1[0], color_c1[1], color_c1[2], 25)
  let b2 = color(255,255,255,215)
  let gradient_mid = rnd(x_left_outside,x_right_outside)
  strokeCap(SQUARE)
  //blendMode(SCREEN)
  for (let x = x_left_outside; x <= x_right_outside; x += w(0.0007)){
    if (x <= gradient_mid){
      let inter = map(x, 0, gradient_mid, 1, 0)
      c = lerpColor(b1, b2, inter)
      strokeWeight(w(0.0013))
      stroke(c) // MAIN STROKE
      //line(x, h(1)-bar_height, x, h(0.998))
    }else{
      let inter2 = map(x, gradient_mid, w(1), 1, 0)
      c = lerpColor(b2, b1, inter2)
      stroke(c) // OVERLAY STROKE
      //line(x, h(1)-bar_height, x, h(0.998))
    }
    if (x < x_left_inside){
        line(x,y_top,x,y_bottom)
    }else if(x >= x_left_inside && x <= x_right_inside){
        line(x,y_top,x,y_inside)
        line(x,y_bottom - h(0.1),x,y_bottom)
    }else{
        line(x,y_top,x,y_bottom)
    }
  }
  // SCREWS
  fill(192, 169, 166, 230)
  noStroke()
  blendMode(BLEND)
  screw(x_left_outside + w(0.02), y_top + w(0.02))
  screw(x_right_outside - w(0.02), y_top + h(0.02))
  screw(x_left_outside + w(0.02), y_bottom - h(0.02))
  screw(x_right_outside - w(0.02), y_bottom - h(0.02))
  pop()
}
function rectangle_with_triangleCutout(left, right, bottom, top, passedPalette) {
  push()
  drawingContext.shadowOffsetX =  - w(0.008);
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = w(0.015);
  drawingContext.shadowColor = 'black';
  //blendMode(BURN)
  fill(passedPalette[0], passedPalette[1], passedPalette[2], 155)
  stroke(passedPalette[0], passedPalette[1], passedPalette[2], 85)
  strokeJoin(ROUND)
  strokeWeight(w(0.0015))
  let tri_mid = right - (right - left)/2

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
  endShape(CLOSE)
  let color_c1 = gradient_1
  //let color_c2 = gradient_3
  let b1 = color(color_c1[0], color_c1[1], color_c1[2], 15)
  let b2 = color(255,255,255,185)
  let gradient_mid = rnd(left,right)
  strokeCap(SQUARE)
  blendMode(SCREEN)
  for (let x = left; x <= right; x += w(0.0007)){
    if (x <= gradient_mid){
      let inter = map(x, 0, gradient_mid, 1, 0)
      c = lerpColor(b1, b2, inter)
      strokeWeight(w(0.0013))
      //stroke(c) // MAIN STROKE
      //line(x, h(1)-bar_height, x, h(0.998))
    }else{
      let inter2 = map(x, gradient_mid, 0, 1)
      c = lerpColor(b2, b1, inter2)
      //stroke(c) // OVERLAY STROKE
      //line(x, h(1)-bar_height, x, h(0.998))
    }
    stroke(c)
    if (x < left + w(0.05)){
        line(x,top,x,bottom)
    }else if(x > left + w(0.05) && x < tri_mid){
        line(x,top,x,map(x,left + w(0.05),tri_mid,bottom - h(0.05), top + h(0.05)))
        line(x,bottom - h(0.05),x,bottom)
    }else if(x > tri_mid && x < right - w(0.05)){
        line(x,top,x,map(x,tri_mid, right - w(0.05), top + h(0.05), bottom - h(0.05)))
        line(x,bottom - h(0.05),x,bottom)
    }else{
        line(x,top,x,bottom)
    }
  }
  pop()
  screw(left + w(0.02), top + h(0.02))
  screw(left + w(0.02), bottom - h(0.02))
  screw(right - w(0.02), bottom - h(0.02))
  screw(right - w(0.02), top + h(0.02))
}
function gradient_plate(x_left, x_break, y_top, gradient_width, gradient_height, gradient_height_2, pal1, pal2, pal3) {
  push()
  colorMode(RGB, 255, 255, 255, 255);
  var color_c1 = gradient_1
  var color_c2 = gradient_2
  var color_c3 = gradient_3
  var c1 = color(color_c1[0], color_c1[1], color_c1[2], 165)
  var c2 = color(color_c2[0], color_c2[1], color_c2[2], 165)
  var c3 = color(color_c3[0], color_c3[1], color_c3[2], 195)
  var xoff = 0
  var inc = w(0.00001)
  var y_gap = gradient_height_2 + random(h(0.1),h(0.25))
  var insert_height = random(h(0.15), h(0.35))
  for (let x = x_left + w(0.002); x <= x_left + gradient_width - w(0.002); x += w(0.0007)){
    let inter = map(x, x_left, x_left + gradient_width, 0, 1)
    let c = lerpColor(c1, c2, inter)
    var y_split_top = y_gap + map(x,x_left,x_break,insert_height,insert_height/2) + w(0.012)*noise(xoff)
    var y_split_bottom = y_split_top + map(x,x_left,x_break,h(0.1),h(0.05) + noise(xoff))
    push()
    blendMode(BURN)
    //SHADOWS
    for (var j = 0; j < 16; j += h(0.00025)){
      var y = (y_top + h(0.024) + h(0.036)*noise(xoff)) - h(0.00055)*j
      fill(20, map(j, 0, 16, 35, 0))
      noStroke()
      ellipse(x, y, w(0.001))
    }
    pop()
    strokeCap(ROUND)
    strokeWeight(w(0.0013))
    if (x < x_break - w(0.004)){
      //strokeWeight(w(0.0006))
      stroke(c) // MAIN STROKE
      line(x, y_top + h(0.024) + w(0.036)*noise(xoff), x, y_top + gradient_height - w(0.004))
      /*line(x, y_top + h(0.024) + w(0.036)*noise(xoff), x, y_split_top - w(0.002))
      stroke(c3)
      line(x,y_split_top+h(0.002),x,y_split_bottom - h(0.002))
      stroke(c)
      line(x,y_split_bottom+h(0.002),x,y_top + gradient_height - h(0.002))*/
    }else{
      //strokeWeight(w(0.0006))
      stroke(c) // MAIN STROKE
      line(x, y_top + h(0.024) + w(0.036)*noise(xoff), x, y_top + gradient_height_2 - w(0.004))
    }
    xoff += inc
  }
  screw(gradient_width - w(0.04), (gradient_height_2 - y_top)/2)
  pop()
}
function gradient_flat(x_left, y_top, gradient_width, gradient_height, pal1, pal2) {
  push()
  colorMode(RGB, 255, 255, 255, 255);
  var color_c1 = gradient_2
  var color_c2 = gradient_3
  var b1 = color(color_c1[0], color_c1[1], color_c1[2], 165)
  var b2 = color(color_c2[0], color_c2[1], color_c2[2], 165)
  var xoff = 0
  var inc = 0.1
  strokeCap(ROUND)
  for (let x = x_left + w(0.003); x <= x_left + gradient_width - w(0.003); x += w(0.0007)){
    for (var j = 0; j < 16; j += h(0.00025)){
        let y = (y_top + gradient_height + w(0.025)*noise(xoff)) + h(0.00055)*j
        fill(20, map(j, 5, 13, 15, 0))
        noStroke()
        ellipse(x, y, w(0.0013))}
    if (x <= x_left + w(0.185)){
      let inter = map(x, x_left, x_left + w(0.185), 1, 0)
      c = lerpColor(b1, b2, inter)
      strokeWeight(w(0.0013))
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
  screw(x_left + w(0.02), y_top + h(0.02), w(0.015))
  screw(x_left + gradient_width -w(0.02), y_top + h(0.02), w(0.015))
  pop()
}
function originalTulip(a) {
  noStroke()
    push()
    scale(0.85)
    translate(random(-w(0.25), w(0.1)), h(0.175))
    vertex(w(0.49661) + a,h(1));
    bezierVertex(w(0.49661) + a, h(1), w(0.49688) + a, h(0.93156), w(0.49819) + a, h(0.92564));
    bezierVertex(w(0.49819) + a, h(0.92564), w(0.49706) + a,h(0.90822), w(0.49557) + a, h(0.89574));
    bezierVertex(w(0.49557) + a, h(0.89574), w(0.48579) + a, h(0.81425), w(0.48423) + a, h(0.79959));
    bezierVertex(w(0.48267) + a, h(0.78493), w(0.46055) + a, h(0.675), w(0.417) + a, h(0.6276));
    bezierVertex(w(0.37345) + a, h(0.5802), w(0.33175) + a, h(0.57642), w(0.30866) + a, h(0.56568));
    bezierVertex(w(0.28557) + a, h(0.55494), w(0.24635) + a, h(0.5442), w(0.27668) + a, h(0.529));
    bezierVertex(w(0.30701) + a, h(0.5138), w(0.34239) + a, h(0.50246), w(0.39484) + a, h(0.53532));
    bezierVertex(w(0.44729) + a, h(0.56818), w(0.44855) + a, h(0.65916), w(0.46184) + a, h(0.692));
    bezierVertex(w(0.47513) + a, h(0.72488), w(0.48354) + a, h(0.747), w(0.49126) + a, h(0.79785));
    bezierVertex(w(0.49898) + a, h(0.84868), w(0.4977) + a, h(0.81233), w(0.4977) + a, h(0.79978));
    bezierVertex(w(0.4977) + a, h(0.78723), w(0.49253) + a, h(0.69524), w(0.49253) + a, h(0.674));
    bezierVertex(w(0.49253) + a, h(0.65276), w(0.49686) + a, h(0.51881), w(0.49486) + a, h(0.496));
    bezierVertex(w(0.49286) + a, h(0.47319), w(0.48286) + a, h(0.46721), w(0.46568) + a, h(0.46481));
    bezierVertex(w(0.4485) + a, h(0.46241), w(0.38852) + a, h(0.44642), w(0.37453) + a, h(0.41524));
    bezierVertex(w(0.36054) + a, h(0.38406), w(0.36294) + a, h(0.37446), w(0.37013) + a, h(0.36167));
    bezierVertex(w(0.37732) + a, h(0.34888), w(0.4217) + a, h(0.21618), w(0.4289) + a, h(0.1814));
    bezierVertex(w(0.4361) + a, h(0.14662), w(0.44635) + a, h(0.12948), w(0.45449) + a, h(0.13783));
    bezierVertex(w(0.46108) + a, h(0.14459), w(0.46437) + a, h(0.1501), w(0.47211) + a, h(0.1411));
    bezierVertex(w(0.47957) + a, h(0.13241), w(0.48652) + a, h(0.12296), w(0.50711) + a, h(0.11991));
    bezierVertex(w(0.53563) + a, h(0.11569), w(0.54683) + a, h(0.13263), w(0.56003) + a, h(0.1774));
    bezierVertex(w(0.57323) + a, h(0.22217), w(0.606) + a, h(0.30733),w(0.62319) + a, h(0.33372));
    bezierVertex(w(0.64035) + a, h(0.36011), w(0.64838) + a, h(0.40967), w(0.606) + a, h(0.42886));
    bezierVertex(w(0.56362) + a, h(0.44805), w(0.52445) + a, h(0.45086), w(0.512) + a, h(0.48763));
    bezierVertex(w(0.51555) + a, h(0.5244), w(0.5124) + a, h(0.62396), w(0.5136) + a, h(0.70191));
    bezierVertex(w(0.5148) + a, h(0.77986), w(0.51525) + a, h(0.74829), w(0.5156) + a, h(0.77191));
    bezierVertex(w(0.51639) + a, h(0.82477), w(0.52122) + a, h(0.78349), w(0.52402) + a, h(0.7687));
    bezierVertex(w(0.52682) + a, h(0.75391), w(0.53364) + a, h(0.64514), w(0.64718) + a, h(0.634));
    bezierVertex(w(0.79024) + a, h(0.62049), w(0.75096) + a, h(0.66255), w(0.71618) + a, h(0.66535));
    bezierVertex(w(0.6814) + a, h(0.66815), w(0.6821) + a, h(0.68935), w(0.6148) + a, h(0.66958));
    bezierVertex(w(0.55968) + a, h(0.6534), w(0.54044) + a, h(0.72595), w(0.53564) + a, h(0.74434));
    bezierVertex(w(0.53084) + a, h(0.76273), w(0.53516) + a, h(0.79894), w(0.52164) + a, h(0.82789));
    bezierVertex(w(0.50978) + a, h(0.85329), w(0.51579) + a, h(0.86797), w(0.51664) + a, h(0.89516));
    bezierVertex(w(0.51749) + a, h(0.92235), w(0.52579) + a, h(0.94096), w(0.52438) + a, h(0.95982));
    bezierVertex(w(0.52306) + a, h(0.97733), w(0.52069) + a, h(1), w(0.52069) + a, h(1));
    pop()
}
function meetingCircles(pal, shift_x, a, alpha) {
  push()
  //translate(random(-w(0.25), w(0.3)))
    strokeCap(PROJECT);
    strokeJoin(MITER);
    fill(pal[0], pal[1], pal[2], alpha)
    stroke(pal[0], pal[1], pal[2], alpha/2)
    strokeWeight(w(0.001))
    //blendMode(OVERLAY)
    //let shift_x = random(0, w(0.2))
    //var shift_y = random(h(0), h(0.43))
    let shift_y = 0
    beginShape();

    vertex(w(0.60115)+shift_x,h(0.44316)-shift_y);
    vertex(w(0)+shift_x,h(0.44316)-shift_y);
    vertex(w(0)+shift_x,h(0.57023)-shift_y);
    bezierVertex(w(0.04553)+shift_x,h(0.6971)-shift_y,w(0.13383)+shift_x,h(0.75023)-shift_y,w(0.229)+shift_x,h(0.76587)-shift_y);
    bezierVertex(w(0.04657)+shift_x,h(0.77214)-shift_y,w(0)+shift_x,h(0.82966)-shift_y,w(0)+shift_x,h(0.82966)-shift_y);
    vertex(w(0)+shift_x,h(1)-shift_y);
    vertex(w(0.60115)+shift_x,h(1)-shift_y);
    vertex(w(0.60115)+shift_x,h(0.80545)-shift_y);
    bezierVertex(w(0.502)+shift_x,h(0.785)-shift_y,w(0.41848)+shift_x,h(0.77366)-shift_y,w(0.34833)+shift_x,h(0.7686)-shift_y);
    bezierVertex(w(0.48275)+shift_x,h(0.7556)-shift_y,w(0.60115)+shift_x,h(0.69731)-shift_y,w(0.60115)+shift_x,h(0.69731)-shift_y);
    vertex(w(0.60115)+shift_x,h(0.44316)-shift_y);
    /*
    vertex(w(1),h(0))
    vertex(w(0.60115)+shift_x+w(0.004),h(0.44316)-shift_y);
    vertex(w(0.60115)+shift_x+w(0.004),h(0.69731)-shift_y)
    vertex(w(1)-w(0.005), h(0.55))
    vertex(w(0.60115)+shift_x+w(0.004),h(0.80545)-shift_y);
    vertex(w(0.60115)+shift_x+w(0.004),h(1)-shift_y);
    vertex(w(1),h(1))
    vertex(w(1),h(0))
    */
    beginContour()
    originalTulip(a)
    endContour()

    endShape()

    screw(w(0.03)+shift_x, h(0.975)-shift_y)
    screw(w(0.03)+shift_x, h(0.48)-shift_y)
    screw(w(0.56)+shift_x, h(0.975)-shift_y)
    screw(w(0.56)+shift_x, h(0.48)-shift_y)
    //screw(w(1) - w(0.08), h(0.1) + h(0.03))
    //screw(w(1) - w(0.08), h(0.9) - h(0.03))
  pop()
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
  bg_rect_noRotation(palette.base)
  translate(-width/2,-height/2)
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  chooseTexture()
  bg_perspective()
}
function triangle_with_lines() {
  bg_rect(palette.base)
  translate(-width/2,-height/2)
  push()
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  textured_bg_stripes(palette.secondary, palette.primary)
  chooseTexture()
  translate(width/2, height/2)
  //textured_bg_stripes(bg_lines_pal1,bg_lines_pal2)

  angleMode(DEGREES)
  var rotation_angles = [0, 90, 180, 270]
  var rotation_angle = rotation_angles[Math.floor(rnd() * rotation_angles.length)];;
  rotate(rotation_angle)

  var y_limits_1 = [-h(0.5) + h(0.12), h(0.5)]
  var y_limits_2 = [-h(0.5), h(0.5) - h(0.12)]
  var y_limits_random = [y_limits_1, y_limits_2]
  const y_limits = y_limits_random[Math.floor(rnd() * y_limits_random.length)];

  const alpha_under = 25
  const alpha_over = 50
  const alpha_lines = 80

  push()
  //translate(random(-w(0.25),w(0.25)),0)
  triangle_horizLines(palette.dark, alpha_under, y_limits)
  triangle_vertLines(palette.primary, alpha_over, y_limits)

  blendMode(OVERLAY)
  var line_functions_linked = [triangle_line_structure_2]
  line_functions_linked[Math.floor(rnd() * line_functions_linked.length)](w(0.006), palette.accent, alpha_lines);
  pop()
  pop()
}
function kellyLayout() {
  bg_rect(palette.base)
  translate(-width/2,-height/2)
  let x_left = rnd(w(0.1),w(0.2))
  let x_right = rnd(w(0.8),w(0.9))
  let y_top = rnd(h(0.05),h(0.15))
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
  for(let y = 0; y <= h(1); y++){
    texturedStroke_RGB(w(1)-(w(1)-x_right)/2, y, w(1), y, w(0.005), stripeColor[0], stripeColor[1], stripeColor[2], 95)
  }
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  chooseTexture()
  for (let x = x_left; x <= x_right; x += w(0.003)){
    texturedStroke_RGB(x, y_top, x, y_bottom, w(0.01), bigRectColor[0], bigRectColor[1], bigRectColor[2], 95) 
  }
  for(let x = x_left + w(0.1); x < x_right - w(0.1); x += w(0.002)){
    texturedStroke_RGB(x, 1.25*y_top_inside, x, h(1), w(0.005), innerRectColor[0], innerRectColor[1], innerRectColor[2], 255)
  }
  blendMode(HARD_LIGHT)
  let fillColor = palette.primary
  fill(fillColor[0],fillColor[1],fillColor[2],125)
  chooseKellyOverlay()
  blendMode(BLEND)
  for(let x = x_left_inside; x <= x_right_inside + w(0.02); x += w(0.001)){
    if(x < x_sliver){
        texturedStroke_RGB(x, y_top_inside - h(0.02), x, y_bottom_inside, w(0.003), insideShapeColor[0], insideShapeColor[1], insideShapeColor[2], 130) 
    }else if(x > x_sliver && x < x_left + w(0.1)){
        texturedStroke_RGB(x, y_top_inside - h(0.02), x, 3*y_top_inside, w(0.003), insideShapeColor[0], insideShapeColor[1], insideShapeColor[2], 130)
    }else if(x > x_left + w(0.1) && x < x_right - w(0.1)){
        texturedStroke_RGB(x, y_top_inside - h(0.02), x, 1.25*y_top_inside, w(0.003), insideShapeColor[0], insideShapeColor[1], insideShapeColor[2], 130)
    }else{
        texturedStroke_RGB(x, y_top_inside - h(0.02), x, 2*y_top_inside, w(0.003), insideShapeColor[0], insideShapeColor[1], insideShapeColor[2], 130)
    }
  }
  for(let x = 0; x <= x_right; x += w(0.002)){
    texturedStroke_RGB(x, y_bottom, x, y_bottom + (h(1)-y_bottom)/2, w(0.005), stripeColor[0], stripeColor[1], stripeColor[2], 95)
  }
  for(let x = rnd(w(0.005),w(0.1)); x < width/2; x++){
    texturedStroke_RGB(x, y_bottom + w(0.01), x, y_bottom + (h(1)-y_bottom)/2 - w(0.01), w(0.005), innerStripeColor[0], innerStripeColor[1], innerStripeColor[2], 95)
  }
  

}
function basicNewman() {
  bg_rect(palette.base)
  translate(-width/2,-height/2)
  brush_line_bg_texture_GS()
  brush_line_bg_texture_GS()
  chooseTexture()
  textured_bg_stripes(palette.secondary, palette.contrast)
  painted_rectangle(palette.primary)
  painterly_line_HL(w(0.005), palette.accent, 60)
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
  let rect_color = palette.primary
  noStroke()
  let circle_color = palette.contrast
  fill(circle_color[0],circle_color[1],circle_color[2],185)
  ellipse(rect_x,rect_y_inside,2*(rect_y_inside-rect_y))
  fill(rect_color[0],rect_color[1],rect_color[2],215)
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
  let angle_begin = rnd(0,360)
  let angle_diff = rnd(135,270)
  let angle_end = angle_begin + angle_diff
  let arc_x = rnd(w(0.25),w(0.5))
  let arc_y = arc_x
  let arc_size = map(arc_x,w(0.25),w(0.5),w(0.32),w(0.8))
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
  arc(arc_x, arc_y, 1.045*arc_size, 1.045*arc_size, angle_begin-second_angle_offset, angle_end-2*second_angle_offset);
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
  for(let x = x_0; x <= x_0 + rect_size_1; x += w(0.002)){
      let y1 = y_0
      let y2 = y_0 + rect_size_1
      texturedStroke_RGB(x, y1, x, y2, w(0.008), rect1_color[0],rect1_color[1],rect1_color[2],45)
  }
  //noStroke()
  let rect2_color = palette.secondary
  //fill(rect2_color[0],rect2_color[1],rect2_color[2],135)
  //rect(x_0+rect_size_1/4,y_0+rect_size_1/4,rect_size_2,rect_size_2)
  for(let y = y_0+rect_size_1/4; y <= y_0+rect_size_1/4 + rect_size_2; y += h(0.002)){
    let x1 = x_0+rect_size_1/4
    let x2 = x_0+rect_size_1/4 + rect_size_2
    texturedStroke_RGB(x1, y, x2, y, w(0.008), rect2_color[0],rect2_color[1],rect2_color[2],45)
}
  let rect3_color = palette.primary
  //fill(rect3_color[0],rect3_color[1],rect3_color[2],135)
  //rect(x_0+rect_size_1,y_0+rect_size_1,1.3*rect_size_2,1.3*rect_size_2)
  for(let x = x_0+rect_size_1; x <= x_0 + 1.3*rect_size_2; x += w(0.002)){
      let y1 = y_0+rect_size_1
      let y2 = y_0 + 1.3*rect_size_2
      texturedStroke_RGB(x, y1, x, y2, w(0.008), rect3_color[0],rect3_color[1],rect3_color[2],45)
  }
  let line1_color = palette.accent
  let line2_color = palette.light
  let x_split = rnd((w(0.3),w(0.6)))
  for(let x = x_0; x <= w(0.85); x+= w(0.003)){
    let y1 = y_0
    let y2 = y_0 + rect_size_1/6
      if(x < x_split){
      texturedStroke_RGB(x, y1, x, y2, w(0.012), line1_color[0],line1_color[1],line1_color[2],45)
    }else{
      texturedStroke_RGB(x, y1, x, y2, w(0.012), line2_color[0],line2_color[1],line2_color[2],45)
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
  for (let x = x_left_out; x <= x_right_out; x += w(.002)){
    let y1 = y_top_out
    let y2 = y_bottom_out
    texturedStroke_RGB(x, y1, x, y2, w(0.008), color_1[0],color_1[1],color_1[2],45)
  }
  for (let x = x_left_in; x <= x_right_in; x += w(.002)){
    let y1 = y_top_in
    let y2 = y_bottom_in
    texturedStroke_RGB(x, y1, x, y2, w(0.008), color_2[0],color_2[1],color_2[2],45)
  }
  let sail_x_left = x_left_out
  let sail_x_2 = 1.35*x_left_in 
  let sail_x_3 = sail_x_2 + w(0.035)
  let sail_x_4 = w(0.5)
  let sail_x_end = w(0.52)
  let sail_y_top = h(0)
  let sail_y_2 = y_top_out/2
  let sail_y_3 = h(0.5)
  let sail_y_4 = sail_y_3
  let sail_y_5 = y_bottom_out - h(0.07)
  let sail_y_end = y_bottom_out
  for (let x = sail_x_left; x <= sail_x_4; x += w(0.0015)){
    let y1 = map(x,sail_x_left,sail_x_4,sail_y_3,sail_y_2)
    if(x <= sail_x_2){
        y2 = map(x,sail_x_left,sail_x_2,sail_y_4,sail_y_end)
    }else if(x > sail_x_2 && x <= sail_x_3){
        y2 = sail_y_end
    }else{
        y2 = map(x,sail_x_3,sail_x_4,sail_y_end,sail_y_5)
    }
  texturedStroke_RGB(x, y1, x, y2, w(0.01), color_3[0],color_3[1],color_3[2],45)
  }
  for (let x = sail_x_4; x <= sail_x_end; x += w(0.0015)){
    let y1 = sail_y_top
    let y2 = sail_y_end
    texturedStroke_RGB(x, y1, x, y2, w(0.01), color_3[0],color_3[1],color_3[2],45)
  }
  for (let y = y_top_out; y < 1.1*y_bottom_out; y += w(0.002)){
      let x1 = 0.9*x_left_out
      if(y <= y_bottom_out){
          x2 = x_left_out
      }else{
          x2 = sail_x_4
      }
      texturedStroke_RGB(x1, y, x2, y, w(0.01), color_4[0],color_4[1],color_4[2],45)
  }
  for (let x = sail_x_4; x <= x_right_out; x += w(.002)){
      let y1 = y_bottom_out
      let y2 = 1.1*y_bottom_out
      texturedStroke_RGB(x, y1, x, y2, w(0.01), color_5[0],color_5[1],color_5[2],45)
  }
}
function trident() {
bg_rect(palette.base)
translate(-width/2,-height/2)
chooseTexture()
brush_line_bg_texture_GS()
brush_line_bg_texture_GS()
push()
let scaleDegree = rnd(0.63,1.04)
let trident_color = palette.primary
noStroke()
fill(trident_color[0],trident_color[1],trident_color[2],215)
drawingContext.shadowOffsetX =  0;
drawingContext.shadowOffsetY = 0;
drawingContext.shadowBlur = map(scaleDegree,0.5,1.1,w(0.0005),w(0.003));
drawingContext.shadowColor = 'black';
scale(scaleDegree)
beginShape();
vertex(w(0.9417),h(0));
vertex(w(.8912),h(0));
bezierVertex(w(.8912),h(0),w(0.8114),h(0.4973),w(0.5088),h(0.5603));
vertex(w(0.5222),h(0.0597));
vertex(w(0.4442),h(0.09418));
vertex(w(0.43393),h(0.56664));
bezierVertex(w(0.123),h(0.55332),w(0.0347),h(0),w(0.0347),h(0));
vertex(w(0),h(0));
vertex(w(0),h(0.11));
bezierVertex(w(0),h(0.11),w(0.06349),h(0.58058),w(0.43284),h(0.62284));
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
for (let x = shape_x1; x < shape_x2; x += w(0.002)){
    let y1 = h(0)
    let y2 = map(x, shape_x1, shape_x2, y_max, y_max - 0.03*y_max)
    texturedStroke_RGB(x, y1, x - map(y_max,h(0.3),h(0.7),0.06*x,0.032*x), y2, w(0.008), shape_color[0],shape_color[1],shape_color[2],45)
}
crescent(92, map(scaleDegree, 0.5, 1.1, w(0.35), w(0.5)), map(scaleDegree, 0.5, 1.1, h(0.35), h(0.5)), map(scaleDegree, 0.5, 1.1, h(0.28), h(0.5)), palette.aux)
}
// OVERLAY FUNCTIONS
function fourPieceOverlay() {
  var y_limits_1 = [-h(0.5) + h(0.12), h(0.5)]
  var y_limits_2 = [-h(0.5), h(0.5) - h(0.12)]
  var y_limits_random = [y_limits_1, y_limits_2]
  const y_limits = y_limits_random[Math.floor(rnd() * y_limits_random.length)];
  var x_l = w(0)
  var x_m = random(w(0.25),w(0.5))
  var x_l_m = (x_m - x_l)/2
  var x_r = w(1)
  var x_r_m = (x_r - (x_r - x_m))/2 // for future use to align
  var y_l = random(h(0.1),h(0.3))
  var y_r = random(h(0.6),h(0.85))
  var window_width = (x_m - x_l_m)/3
  rectangle_with_triangleCutout(x_m, x_r, y_r, h(0), palette.aux)
  window_overlay(x_l_m, x_l_m + window_width, x_m, x_m - window_width, y_l, y_l+window_width, h(1), palette.base, w(0.015))
  gradient_plate(x_l, x_l_m, h(0), x_m, h(1), y_l, palette.gradient, palette.gradient, palette.contrast)
  push()
  blendMode(BLEND)
  screw(x_l_m/2, h(1) - h(0.04))
  screw(x_l_m/2, y_l/2)
  pop()
  gradient_flat(x_m, y_r, x_r-x_m, (h(1)-y_r)/2, palette.gradient, palette.gradient)
  blendMode(SCREEN)
  window_overlay(x_l_m, x_l_m + window_width, x_m, x_m - window_width, y_l, y_l+window_width, h(1), palette.base, 0)
}
function tulipCutOut() {
  drawingContext.shadowOffsetX =  0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'black';
  //chooseTexture() 
  push()
  let shift_x = random(w(0.08), w(0.23))
  const a = random(-w(0.25), w(0.023))
  meetingCircles(palette.light, shift_x, a, 75)
  blendMode(SCREEN)
  meetingCircles(palette.light, shift_x, a, 165)
  pop()
}
function kelly_bShapeOverlay() {
  drawingContext.shadowOffsetX =  0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = 'black';
  //kelly_bigB(palette.light, 0.6)
  //blendMode(DIFFERENCE)
  //semiCircle()
  colorMode(RGB, 255, 255, 255, 255);
  //fill(palette.primary[0],palette.primary[1],palette.primary[2],125)
  //stroke(palette.primary[0],palette.primary[1],palette.primary[2],125)
  //blendMode(BLEND)
  strokeWeight(1)
  let x_shift = rnd(-w(0.05),w(0.09))
  kelly_bigB(x_shift, palette.primary, 125)
  //fill(355,100,100,0.5)
  //stroke(355,100,100,0.2)
  blendMode(SOFT_LIGHT)
  fill(palette.primary[0],palette.primary[1],palette.primary[2],165)
  stroke(palette.dark[0],palette.dark[1],palette.dark[2],65)
  smallCurve() 
  blendMode(SCREEN)
  kelly_bigB(x_shift, palette.light, 85)
}
function kelly_Bshape2() {
push()
drawingContext.shadowOffsetX =  0;
drawingContext.shadowOffsetY = 0;
drawingContext.shadowBlur = 10;
drawingContext.shadowColor = 'black';
let xoff = 0
let inc = w(0.06)
noStroke()
let overlay_color = palette.aux
fill(overlay_color[0],overlay_color[1],overlay_color[2], 115)
let a = rnd(-w(0.11),w(0.11))
strokeCap(PROJECT);
strokeJoin(MITER);
beginShape();
//vertex(w(0.353) + a,h(0.003));
//vertex(w(0.353)+ a,h(0.997));
for (var y = h(0.002); y < h(0.997); y += h(0.003)){
    var x = w(0.353) + a + w(0.024)*noise(xoff)
    vertex(x, y)
    xoff += inc
}
vertex(w(0.882)+ a,h(0.997));
bezierVertex(w(0.882)+ a,h(0.997),w(0.91)+ a,h(0.545),w(0.5)+ a,h(0.49));
bezierVertex(w(0.5)+ a,h(0.491),w(0.885)+ a,h(0.419),w(.914)+ a,h(0.003));
endShape(CLOSE);
beginShape()
vertex(w(0.13) + a,h(0.003))
for (var y = h(0.002); y < h(0.997); y += h(0.003)){
    var x = w(0.24) + a + w(0.024)*noise(xoff)
    vertex(x, y)
    xoff += inc
}
vertex(w(0.13) + a,h(0.997))
endShape(CLOSE)
pop()
screw(w(0.882) + a - w(0.1),h(0.997) - h(0.1))
screw(w(0.914) + a - w(0.1),h(0.003) + h(0.1))
screw(w(0.353) + a + w(0.1),h(0.997) - h(0.1))
screw(w(0.353) + a + w(0.1),h(0.003) + h(0.1))
screw(w(0.192) + a,h(0.997) - h(0.1))
screw(w(0.192) + a,h(0.003) + h(0.1))
}
function windowAndSail() {
  push()
  let window_x_left = rnd(w(0.05),w(0.15))
  let window_x_right = rnd(w(0.45),w(0.65))
  let window_width = (window_x_right - window_x_left)/4
  let window_top = rnd(h(0.1),h(0.25))
  let bar_height = rnd(h(0.05),h(0.15))
  let sail_width = window_x_right + w(0.06)
  window_overlay(window_x_left, window_x_left + window_width, window_x_right, window_x_right - window_width, window_top, window_top+window_width, h(1) - bar_height, palette.aux, w(0.015))
  noStroke()
  //rectMode(CORNER)
  //rect(w(0),h(0),w(0.5),h(0.5))
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = w(0.01);
  drawingContext.shadowColor = 'black';
  let sail_color = palette.primary
  fill(sail_color[0],sail_color[1],sail_color[2],120)
  beginShape()
  vertex(w(0.998),h(1)-bar_height-h(0.002))
  vertex(sail_width+sail_width/4,h(1)-bar_height-h(0.002))
  vertex(sail_width,h(0.77))
  vertex(w(0.98),h(0.1))
  vertex(w(0.98),h(0.002))
  vertex(w(0.998),h(0.002))
  endShape(CLOSE)
  let bar_color = palette.secondary
  fill(bar_color[0],bar_color[1],bar_color[2],85)
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
  let xoff = 0
  let inc = w(0.0001)
  let gradient_mid = rnd(w(0.2),w(0.8))
  strokeCap(SQUARE)
  for (let x = w(0.002); x <= w(0.998); x += w(0.0007)){
    if (x <= gradient_mid){
      let inter = map(x, 0, gradient_mid, 1, 0)
      c = lerpColor(b1, b2, inter)
      strokeWeight(w(0.0013))
      stroke(c) // MAIN STROKE
      line(x, h(1)-bar_height, x, h(0.998))
    }else{
      let inter2 = map(x, gradient_mid, w(1), 1, 0)
      let c2 = lerpColor(b2, b1, inter2)
      stroke(c2) // OVERLAY STROKE
      line(x, h(1)-bar_height, x, h(0.998))
    }
    xoff += inc
  }
  screw(w(0.037),h(1)-bar_height/2)
  screw(w(0.963),h(1)-bar_height/2)
  screw(w(0.963),(h(1)-bar_height)-bar_height/2)
  screw(w(0.963),h(0.1)+h(0.04)+bar_height/1.5)
  screw(sail_width + bar_height/1.5,h(0.76))
  pop()
}
// COMBO FUNCTIONS
function chooseLower() {
  const lowerLayers = [rug_layout,triangle_with_lines,kellyLayout,basicNewman,threeSquares,basicMoholy,squaresSail,trident]
  lowerLayers[Math.floor(map(decPairs[7],0,255,0,lowerLayers.length - 0.001))]()
}
function chooseLowerForTulip() {
  const lowerLayersTulip = [rug_layout,perspective_layout,triangle_with_lines,kellyLayout,basicNewman,threeSquares,basicMoholy,squaresSail,trident]
  lowerLayersTulip[Math.floor(map(decPairs[16],0,255,0,lowerLayersTulip.length - 0.001))]()
}
function chooseUpper() {
  const upperLayers = [fourPieceOverlay, windowAndSail, kelly_Bshape2]
  upperLayers[Math.floor(map(decPairs[18],0,255,0,upperLayers.length - 0.001))]()
}
// COMBINE FUNCTION PUTS TOGTHER LOWER LAYER, PERMITER, AND UPPER LAYER
function combine() {
  chooseLower()
  choosePerimeter()
  chooseUpper()
}
// TULIP FUNCTION FOR TULIP UPPER LAYER ONLY
function tulip() {
  push()
  chooseLowerForTulip()
  choosePerimeter()
  pop()
  tulipCutOut() 
}
function chooseResult() {
    const options = [combine, tulip]
    options[Math.floor(map(decPairs[20],0,255,0,options.length - 0.001))]()
  }