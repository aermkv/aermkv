function calculateFeatures(tokenData) {
  const hashPairs = [];
  for (let j = 0; j < 32; j++) {
    hashPairs.push(tokenData.hash.slice(2 + (j * 2), 4 + (j * 2)));
  }
  const decPairs = hashPairs.map(x => {
    return parseInt(x, 16);
  });

  const map = function(n, start1, stop1, start2, stop2, withinBounds) {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
      return newval;
    }
    if (start2 < stop2) {
      return constrain(newval, start2, stop2);
    } else {
      return constrain(newval, stop2, start2);
    }
  };

  function constrain(n, low, high) {
    return Math.max(Math.min(n, high), low);
  };

  const palettes = {
    radiance: "Radiance",
    screen: "Screen",
    threshold: "Threshold",
    darken: "Darken",
    chroma: "Chroma",
    hard_mix: "Hard Mix",
    lin_burn: "Linear Burn",
    nautical: "Nautical",
    pinlight: "Pinlight",
    soft_light: "Soft Light",
    range: "Range",
    vibrance: "Vibrance",
    accents_A: "Highlight",
    accents_B: "Color Burn",
    rays: "Rays",
    render: "Render"
}

  const randomPalette = function (palettes) {
    let keys = Object.keys(palettes);
    const paletteName = keys[Math.floor(map(decPairs[0],0,255,0,keys.length-0.001))];
    return palettes[paletteName];
  };
  palette = randomPalette(palettes);

  // COMBO FUNCTIONS
  const screwCols = {
    silver: "silver",
    gold: "gold",
    black: "black"
  }
  
  function chooseScrew() {
    const screwPercent = map(decPairs[9],0,255,0,1);
    let scrC = screwCols.silver;
    if (screwPercent < .1) {
      scrC = screwCols.gold;
    }
    if (screwPercent > .15 && screwPercent < .4) {
      scrC = screwCols.black;
    }
    return scrC;
  }

  function chooseLower(options, decPair) {
    return options[Math.floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
  }

  function chooseLower_Combine() {
    const cL_Combine_percent = map(decPairs[4],0,255,0,1);
      if (cL_Combine_percent < .17) {
        lo = "Color Field"
      }else if (cL_Combine_percent < .32){
        lo = "Bauhaus"
      }else if (cL_Combine_percent < .47){
        lo = "Contour"
      }else if (cL_Combine_percent < .6){
        lo = "Trident"
      }else if (cL_Combine_percent < .72){
        lo = "Channels"
      }else if (cL_Combine_percent < .82){
        lo = "Newman's Triangle"
      }else if (cL_Combine_percent < .9){
        lo = "Rays"
      }else if (cL_Combine_percent < .95){
        lo = "Levels"
      }else{
        lo = "Skew"
      }
      return lo
  }
  function chooseUpper(options, decPair) {
    return options[Math.floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
  }

  function chooseUpper_Combine() {
    const cU_Combine_percent = map(decPairs[11],0,255,0,1);
      if (cU_Combine_percent < .2) {
        up = "Glyphs"
      }else if (cU_Combine_percent < .4){
        up = "Lens Flare"
      }else if (cU_Combine_percent < .6){
        up = "Sails"
      }else if (cU_Combine_percent < .75){
        up = "Curves"
      }else if (cU_Combine_percent < .86){
        up = "Panorama"
      }else if (cU_Combine_percent < .94){
        up = "Arrowhead"
      }else if (cU_Combine_percent < .98){
        up = "Bisect"
      }else{
        up = "Celestials"
      }
      return up
  }

  function choosePerimeter(options, decPair) {
    return options[Math.floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
  }

  const styles = {
    tulip: {
      upper: ["tulip"],
      lower: ["Skew", "perspective", "Newman's Triangle", "Contour", "Color Field", "Levels", "Bauhaus", "Channels", "Trident", "Rays"],
      perimeter: ["perimeter_1", "perimeter_4"]
    },
    combine: {
      upper: ["fourPieceOverlay", "windowAndSail", "kelly_Bshape2", "crescentAndRectangles", "curveSilo", "sails", "swoop", "celest"],
      lower: ["Skew", "Newman's Triangle", "Contour", "Color Field", "Levels", "Bauhaus", "Channels", "Rays", "Trident"],
      perimeter: ["perimeter_basic", "perimeter_1", "perimeter_2", "perimeter_3", "perimeter_4"]
    },
    blackTul: {
      upper: ["tulipCutOut"],
      lower: ["Skew", "perspective_layout", "Newman's Triangle"],
      perimeter: ["perimeter_1", "perimeter_4"]
    }
  }

  function chooseResult() {
    const resultPercent = map(decPairs[7],0,255,0,1);
    let style = styles.combine;
    let lower = chooseLower_Combine();
    let upper = chooseUpper_Combine()
    p = randomPalette(palettes)
    if (resultPercent < .03) {
      p = "blPal"
      style = styles.blackTul;
      lower = chooseLower(style.lower, 4);
      upper = chooseUpper(style.upper, 6);
    }
    if (resultPercent > .03 && resultPercent < .09) {
      style = styles.tulip;
      lower = chooseLower(style.lower, 4);
      upper = chooseUpper(style.upper, 6);
    }
    const perimeter = choosePerimeter(style.perimeter, 3);
    //const upper = chooseUpper(style.upper, 6);
    scr = chooseScrew()

    return {lower, perimeter, upper, p};
  }

  const {lower, perimeter, upper} = chooseResult();

  function chooseTexture() {
    const textures = ["dots", "checkerboard", "halftone dots", "paper"]
    return textures[Math.floor(map(decPairs[1],0,255,0,textures.length - 0.001))]
  }

  function chooseTransparency() {
    const transparencies = ["low", "high"]
    return transparencies[Math.floor(map(decPairs[7],0,255,0,transparencies.length - 0.001))]
  }

  return {
    "palette": p,
    "textures": chooseTexture(),
    "transparency": chooseTransparency(),
    "lower": lower,
    "perimeter": perimeter,
    "upper": upper,
    "screw color": scr
   }
}

console.log(calculateFeatures(tokenData));