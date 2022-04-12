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
    radiance: "radiance",
    screen: "screen",
    threshold: "threshold",
    darken: "darken",
    chroma: "chroma",
    hard_mix: "hard mix",
    lin_burn: "linear burn",
    col_burn: "color burn",
    pinlight: "pinlight",
    soft_light: "soft light",
    range: "range",
    vibrance: "vibrance",
    accents_A: "accents A",
    accents_B: "accents B",
    rays: "rays"
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

  function chooseUpper(options, decPair) {
    return options[Math.floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
  }

  function choosePerimeter(options, decPair) {
    return options[Math.floor(map(decPairs[decPair],0,255,0,options.length - 0.001))]
  }

  const styles = {
    tulip: {
      upper: ["tulip"],
      lower: ["rug", "perspective", "triangle with lines", "kelly layout", "basic newman", "three squares", "moholy", "square sail", "trident"],
      perimeter: ["perimeter_1", "perimeter_4"]
    },
    combine: {
      upper: ["fourPieceOverlay", "windowAndSail", "kelly_Bshape2", "crescentAndRectangles", "curveSilo", "sails", "swoop"],
      lower: ["rug_layout", "triangle_with_lines", "kellyLayout", "basicNewman", "threeSquares", "basicMoholy", "squaresSail", "trident"],
      perimeter: ["perimeter_basic", "perimeter_1", "perimeter_2", "perimeter_3", "perimeter_4"]
    },
    blackTul: {
      upper: ["tulipCutOut"],
      lower: ["rug_layout", "perspective_layout", "triangle_with_lines"],
      perimeter: ["perimeter_1", "perimeter_4"]
    }
  }

  function chooseResult() {
    const resultPercent = map(decPairs[7],0,255,0,1);
    let style = styles.combine;
    p = randomPalette(palettes)
    if (resultPercent < .03) {
      style = styles.blackTul;
      p = "blPal"
    }
    if (resultPercent > .03 && resultPercent < .09) {
      style = styles.tulip;
    }
    const lower = chooseLower(style.lower, 4);
    const perimeter = choosePerimeter(style.perimeter, 3);
    const upper = chooseUpper(style.upper, 6);
    scr = chooseScrew()
    return {lower, perimeter, upper, p};
  }

  const {lower, perimeter, upper} = chooseResult();

  function chooseTexture() {
    const textures = ["dots", "checkerboard", "halftone dots"]
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