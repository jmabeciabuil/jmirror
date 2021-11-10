//TRACKING
let pCMTR ;
let pCMTL ;
let pCMHR ;
let pCMHL ;
//PUNTEROS
let pCM1 ;
let pCW1 ;
let pCM2 ;
let pCW2 ;

let pC1 ;
let pC2 ;
let pC3 ;
let pC4 ;
let pC5 ;
let pC6 ;
let pC7 ;
let pC8 ;
let pC9 ;
let pC10 ;
/////////////////////////////////////////////////////////
let checkboxFingersI1=true;
let checkboxFingersI2=true;
let checkboxFingersI3=true;
let checkboxFingersI4=true;
let checkboxFingersI5=true;
let checkboxFingersI6=true;
let checkboxFingersI7=true;
let checkboxFingersI8=true;
let checkboxFingersI9=true;

let checkboxFingersII1=true;
let checkboxFingersII2=true;
let checkboxFingersII3=true;
let checkboxFingersII4=true;
let checkboxFingersII5=true;
let checkboxFingersII6=true;
let checkboxFingersII7=true;
let checkboxFingersII8=true;
let checkboxFingersII9=true;
///////////////////////////////////////////
let TOLERANCETRACK = 10 ;//20
let nScale=40;
//////////////////////////////////////////////////
function drawTrackRight(pVideo) { 
  noStroke();
  pC1 = findColor(pVideo, ColorPulgarI, TOLERANCETRACK);
  pC2 = findColor(pVideo, ColorIndiceI, TOLERANCETRACK);
  pC3 = findColor(pVideo, ColorMedioI, TOLERANCETRACK);
  pC4 = findColor(pVideo, ColorAnularI, TOLERANCETRACK);
  pC5 = findColor(pVideo, ColorMenorI, TOLERANCETRACK);
  pCM1 = findColor(pVideo, ColorManoI, TOLERANCETRACK);
  pCW1 = findColor(pVideo, ColorBrazoI, TOLERANCETRACK);
  
  if (pC1 !== undefined && checkboxFingersI1) {
    fill(ColorPulgarI);
    circle(pC1.x+wsIni, pC1.y+hsIni, dimEsferas);
  }
  if (pC2 !== undefined && checkboxFingersI2) {
    fill(ColorIndiceI);
    circle(pC2.x+wsIni, pC2.y+hsIni, dimEsferas);
  }
  if (pC3 !== undefined && checkboxFingersI3) {
    fill(ColorMedioI);
    circle(pC3.x+wsIni, pC3.y+hsIni, dimEsferas);
  }
  if (pC4 !== undefined && checkboxFingersI4) {
    fill(ColorAnularI);
    circle(pC4.x+wsIni, pC4.y+hsIni, dimEsferas);
  }
  if (pC5 !== undefined && checkboxFingersI5) {
    fill(ColorMenorI);
    circle(pC5.x+wsIni, pC5.y+hsIni, dimEsferas);
  }
  if (pCM1 !== undefined && checkboxFingersI6) {
    fill(ColorManoI);
    circle(pCM1.x+wsIni, pCM1.y+hsIni, dimEsferas);
  }
  if (pCW1 !== undefined && checkboxFingersI7) {
    fill(ColorBrazoI);
    circle(pCW1.x+wsIni, pCW1.y+hsIni, dimEsferas);
  }
}

function drawTrackLeft(pVideo) { 
  noStroke();
  pC6 = findColor(pVideo, ColorPulgarII, TOLERANCETRACK);
  pC7 = findColor(pVideo, ColorIndiceII, TOLERANCETRACK);
  pC8 = findColor(pVideo, ColorMedioII, TOLERANCETRACK);
  pC9 = findColor(pVideo, ColorAnularII, TOLERANCETRACK);
  pC10 = findColor(pVideo, ColorMenorII, TOLERANCETRACK);
  pCM2 = findColor(pVideo, ColorManoII, TOLERANCETRACK);
  pCW2 = findColor(pVideo, ColorBrazoII, TOLERANCETRACK);
  
  if (pC6 !== undefined && checkboxFingersII1) {
    fill(ColorPulgarII);
    circle(pC6.x+wsIni, pC6.y+hsIni, dimEsferas);
  }
  if (pC7 !== undefined && checkboxFingersII2) {
    fill(ColorIndiceII);
    circle(pC7.x+wsIni, pC7.y+hsIni, dimEsferas);
  }
  if (pC8 !== undefined && checkboxFingersII3) {
    fill(ColorMedioII);
    circle(pC8.x+wsIni, pC8.y+hsIni, dimEsferas);
  }
  if (pC9 !== undefined && checkboxFingersII4) {
    fill(ColorAnularII);
    circle(pC9.x+wsIni, pC9.y+hsIni, dimEsferas);
  }
  if (pC10 !== undefined && checkboxFingersII5) {
    fill(ColorMenorII);
    circle(pC10.x+wsIni, pC10.y+hsIni, dimEsferas);
  }
  if (pCM2 !== undefined && checkboxFingersII6) {
    fill(ColorManoII);
    circle(pCM2.x+wsIni, pCM2.y+hsIni, dimEsferas);
  }
  if (pCW2 !== undefined && checkboxFingersII7) {
    fill(ColorBrazoII);
    circle(pCW2.x+wsIni, pCW2.y+hsIni, dimEsferas);
  }
}

function findColor(input, c, TOLERANCETRACK) {
  if (input.width === 0 || input.height === 0) {
    return undefined;
  }

  // grab rgb from color to match
  let matchR = c[0];
  let matchG = c[1];
  let matchB = c[2];

  //input.loadPixels();
  for (let y=0; y<input.height; y+=nSaltoY) {
    for (let x=0; x<input.width; x+=nSaltoX) {
 
      // current pixel color
      let index = (y * input.width + x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index+1];
      let b = input.pixels[index+2];

      if (r >= matchR-TOLERANCETRACK && r <= matchR+TOLERANCETRACK &&
          g >= matchG-TOLERANCETRACK && g <= matchG+TOLERANCETRACK &&
          b >= matchB-TOLERANCETRACK && b <= matchB+TOLERANCETRACK) {

          // send back the x/y location immediately
          // (faster, since we stop the loop)
          return createVector(x, y);
      }
    }
  }
  // if no match was found, return 'undefined'
  return undefined;
}

function drawTrackDobleR(pVideo) { 
  noStroke();
  pC1 = findColorDobleR(pVideo, ColorPulgarI, TOLERANCETRACK);
  pC2 = findColorDobleR(pVideo, ColorIndiceI, TOLERANCETRACK);
  pC3 = findColorDobleR(pVideo, ColorMedioI, TOLERANCETRACK);
  pC4 = findColorDobleR(pVideo, ColorAnularI, TOLERANCETRACK);
  pC5 = findColorDobleR(pVideo, ColorMenorI, TOLERANCETRACK);
  pCM1 = findColorDobleR(pVideo, ColorManoI, TOLERANCETRACK);
  pCW1 = findColorDobleR(pVideo, ColorBrazoI, TOLERANCETRACK);

  if (pC1 !== undefined && checkboxFingersI1) {
    fill(ColorPulgarI);
    circle(pC1.x+wsIni, pC1.y+hsIni, dimEsferas);
  }
  if (pC2 !== undefined && checkboxFingersI2) {
    fill(ColorIndiceI);
    circle(pC2.x+wsIni, pC2.y+hsIni, dimEsferas);
  }
  if (pC3 !== undefined && checkboxFingersI3) {
    fill(ColorMedioI);
    circle(pC3.x+wsIni, pC3.y+hsIni, dimEsferas);
  }
  if (pC4 !== undefined && checkboxFingersI4) {
    fill(ColorAnularI);
    circle(pC4.x+wsIni, pC4.y+hsIni, dimEsferas);
  }
  if (pC5 !== undefined && checkboxFingersI5) {
    fill(ColorMenorI);
    circle(pC5.x+wsIni, pC5.y+hsIni, dimEsferas);
  }
  if (pCM1 !== undefined && checkboxFingersI6) {
    fill(ColorManoI);
    circle(pCM1.x+wsIni, pCM1.y+hsIni, dimEsferas);
  }
  if (pCW1 !== undefined && checkboxFingersI7) {
    fill(ColorBrazoI);
    circle(pCW1.x+wsIni, pCW1.y+hsIni, dimEsferas);
  }
}

function drawTrackDobleL(pVideo) { 
  noStroke();
  pC6 = findColorDobleL(pVideo, ColorPulgarII, TOLERANCETRACK);
  pC7 = findColorDobleL(pVideo, ColorIndiceII, TOLERANCETRACK);
  pC8 = findColorDobleL(pVideo, ColorMedioII, TOLERANCETRACK);
  pC9 = findColorDobleL(pVideo, ColorAnularII, TOLERANCETRACK);
  pC10 = findColorDobleL(pVideo, ColorMenorII, TOLERANCETRACK);
  pCM2 = findColorDobleL(pVideo, ColorManoII, TOLERANCETRACK);
  pCW2 = findColorDobleL(pVideo, ColorBrazoII, TOLERANCETRACK);
  
  if (pC6 !== undefined && checkboxFingersII1) {
    fill(ColorPulgarII);
    circle(pC6.x+wsIni, pC6.y+hsIni, dimEsferas);
  } 
  if (pC7 !== undefined && checkboxFingersII2) {
    fill(ColorIndiceII);
    circle(pC7.x+wsIni, pC7.y+hsIni, dimEsferas);
  } 
  if (pC8 !== undefined && checkboxFingersII3) {
    fill(ColorMedioII);
    circle(pC8.x+wsIni, pC8.y+hsIni, dimEsferas);
  } 
  if (pC9 !== undefined && checkboxFingersII4) {
    fill(ColorAnularII);
    circle(pC9.x+wsIni, pC9.y+hsIni, dimEsferas);
  } 
  if (pC10 !== undefined && checkboxFingersII5) {
    fill(ColorMenorII);
    circle(pC10.x+wsIni, pC10.y+hsIni, dimEsferas);
  } 
  if (pCM2 !== undefined && checkboxFingersII6) {
    fill(ColorManoII);
    circle(pCM2.x+wsIni, pCM2.y+hsIni, dimEsferas);
  } 
  if (pCW2 !== undefined && checkboxFingersII7) {
    fill(ColorBrazoII);
    circle(pCW2.x+wsIni, pCW2.y+hsIni, dimEsferas);
  } 
}
/////////////////////////////////////
function findColorDobleL(input, c, TOLERANCETRACK) {
  if (input.width === 0 || input.height === 0) {
    return undefined;
  }

  // grab rgb from color to match
  let matchR = c[0];
  let matchG = c[1];
  let matchB = c[2];

  //input.loadPixels();
  for (let y=0; y<input.height; y+=nSaltoY) {
    for (let x=0; x<input.width/2; x+=nSaltoX) {
 
      // current pixel color
      let index = (y * input.width + x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index+1];
      let b = input.pixels[index+2];

      if (r >= matchR-TOLERANCETRACK && r <= matchR+TOLERANCETRACK &&
          g >= matchG-TOLERANCETRACK && g <= matchG+TOLERANCETRACK &&
          b >= matchB-TOLERANCETRACK && b <= matchB+TOLERANCETRACK) {

          // send back the x/y location immediately
          // (faster, since we stop the loop)
          return createVector(x, y);
      }
    }
  }
  // if no match was found, return 'undefined'
  return undefined;
}

function findColorDobleR(input, c, TOLERANCETRACK) {
  if (input.width === 0 || input.height === 0) {
    return undefined;
  }

  // grab rgb from color to match
  let matchR = c[0];
  let matchG = c[1];
  let matchB = c[2];

  //input.loadPixels();
  for (let y=0; y<input.height; y+=nSaltoY) {
    for (let x=input.width/2; x<input.width; x+=nSaltoX) {
 
      // current pixel color
      let index = (y * input.width + x) * 4;
      let r = input.pixels[index];
      let g = input.pixels[index+1];
      let b = input.pixels[index+2];

      if (r >= matchR-TOLERANCETRACK && r <= matchR+TOLERANCETRACK &&
          g >= matchG-TOLERANCETRACK && g <= matchG+TOLERANCETRACK &&
          b >= matchB-TOLERANCETRACK && b <= matchB+TOLERANCETRACK) {
          return createVector(x, y);
      }
    }
  }
  // if no match was found, return 'undefined'
  return undefined;
}
