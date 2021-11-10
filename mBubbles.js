//BUBBLES/DIANA
let masMenosSpeedBall = 1;
let bubblesLocation = [];
let bubblesStep = [];
let bubbleSize = 100; 
let maxBolaCount = 15;
let diffThreshold = 20;
let numAmount = 20;
let bubbleImageBola;
let numBrightness = 60;
let numForHit = 8;
///////////////////////////////////////
function EsferasAbajo()
{
  fill(255, 255, 0);
  display=getMotionImage(videoImage, prevFrame, modoMirror);
  createBubblesAbajo();
  checkForMoverAbajo(display);
  showBubblesAbajo();
  moveBubblesAbajo();
}
////////////////////////////////////////
function EsferasArriba()
{
  fill(255, 255, 0);
  display=getMotionImage(videoImage, prevFrame, modoMirror);
  createBubblesArriba();
  checkForMoverArriba(display);
  showBubblesArriba();
  moveBubblesArriba();
}
/////////////////////////////////////
function createBubblesAbajo()
{
  if (bubblesLocation.length == maxBolaCount) {
    return;
  }  
  bubblesLocation.push(new JitLoc(random(wsIni-bubbleSize, wVideo+wsIni ), hsIni, bubbleSize, masMenosSpeedBall )); 
  bubblesStep.push(new JitStep(random(1, maxBolaCount), 1));
}
//////////////////////////////////////////
function createBubblesArriba()
{
  if (bubblesLocation.length == maxBolaCount) {
    return;
  }
  bubblesLocation.push(new JitLoc(random(wsIni-bubbleSize, wVideo+wsIni ), hVideo+hsIni, bubbleSize, masMenosSpeedBall )); 
  bubblesStep.push(new JitStep(random(1, maxBolaCount), 1));
}
//////////////////////////////////////////////////

function checkForMoverAbajo(mImage)
{
  for (let i=0; i<bubblesLocation.length; i++)
  {
    let bLoc = createVector(0, 0);
    let bStp = createVector(0, 0);
    bLoc = bubblesLocation[i];
    bStp = bubblesStep[i];
    let amount = checkForHit(mImage, bubblesLocation[i], bubbleSize);
    if (amount >= numAmount)
    {
      if (bLoc.y > hsIni) 
      {
        bubblesLocation[i].y = bLoc.y - bStp.x * masMenosSpeedBall * 8;
      }
    }
  }
}
////////////////////////////////////////////////////
function checkForMoverArriba(mImage)
{
  for (let i=0; i<bubblesLocation.length; i++)
  {
    let bLoc = createVector(0, 0);
    let bStp = createVector(0, 0);
    bLoc = bubblesLocation[i];
    bStp = bubblesStep[i];
    let amount = checkForHit(mImage, bubblesLocation[i], bubbleSize);
    if (amount >= numAmount)
    {
      if (bLoc.y < hVideo+hsIni)
      {
        bubblesLocation[i].y = bLoc.y + bStp.x * masMenosSpeedBall * 8;
      }
    }
  }
}

/////////////////////////////////////////////////////
function showBubblesAbajo()
{
  noStroke();
  for (let i=0; i<bubblesLocation.length; i++)
  {
    let bLoc = createVector(0, 0);
    bLoc = bubblesLocation[i];
    //tint(bLoc.y, 128); 
    //ellipse(bLoc.x, bLoc.y, bubbleSize, bubbleSize);
    image(bubbleImageBola, bLoc.x, bLoc.y, bubbleSize, bubbleSize);
    //noTint();
  }
}
///////////////////////////////////////////////////
function showBubblesArriba()
{
  noStroke();
  for (let i=0; i<bubblesLocation.length; i++)
  {
    let bLoc = createVector(0, 0);
    bLoc = bubblesLocation[i];
    //tint(bLoc.y, 128); 
    //ellipse(bLoc.x, bLoc.y, bubbleSize, bubbleSize);
    image(bubbleImageBola, bLoc.x, bLoc.y, bubbleSize, bubbleSize);
    //noTint();
  }
}
////////////////////////////////////////////////////
function moveBubblesAbajo()
{
  for (let i=0; i<bubblesLocation.length; i++)
  {
    let bLoc = createVector(0, 0);
    let bStp = createVector(0, 0);
    bLoc = bubblesLocation[i];
    bStp = bubblesStep[i];
    bubblesLocation[i].y = bLoc.y + bStp.x * masMenosSpeedBall * 2;
    if (bLoc.y > hVideo+hsIni-bubbleSize/2) 
    {
      bubblesLocation.splice(i, 1);
      bubblesStep.splice(i, 1);
    }
  }
}
///////////////////////////////////////////////////
function moveBubblesArriba()
{
  for (let i=0; i<bubblesLocation.length; i++)
  {
    let bLoc = createVector(0, 0);
    let bStp = createVector(0, 0);
    bLoc = bubblesLocation[i];
    bStp = bubblesStep[i];
    bubblesLocation[i].y = bLoc.y - bStp.x * masMenosSpeedBall * 2;
    if (bLoc.y < hsIni+bubbleSize/2) 
    {
      bubblesLocation.splice(i, 1);
      bubblesStep.splice(i, 1);
    }
  }
}
/////////////////////////////////////////////////////////
function getMotionImage(currFrame, prevFrame, mirror)
{
  display.loadPixels();
  //currFrame.loadPixels();
  prevFrame.loadPixels();
  for (let x=0; x<currFrame.width; x ++)//bubbleSize/2
  {
    for (let y=0; y<currFrame.height; y ++ )
    {
      let loc = (x + y * currFrame.width) * 4; 

      let r1 = currFrame.pixels[loc];
      let g1 = currFrame.pixels[loc + 1];
      let b1 = currFrame.pixels[loc + 2];

      let r2 = prevFrame.pixels[loc];
      let g2 = prevFrame.pixels[loc + 1];
      let b2 = prevFrame.pixels[loc + 2];


      //Compare the foreground and background color
      let diff = dist(r1, g1, b1, r2, g2, b2);     

      if (diff > diffThreshold) {       
        display.pixels[loc] = 255;
        display.pixels[loc + 1] = 255;
        display.pixels[loc + 2] = 255;
        display.pixels[loc + 3] = 255;
      } else {
        // If not, display green
        display.pixels[loc] = 0;
        display.pixels[loc + 1] = 0;
        display.pixels[loc + 2] = 0; 
        display.pixels[loc + 3] = 255;
      }
    }
  }
  for (let i = 0; i < currFrame.pixels.length; i++) {
    prevFrame.pixels[i] = currFrame.pixels[i];
  }
  prevFrame.updatePixels();
  display.updatePixels();
  //image(display, wsIni, hsIni);
  return display;
}
/////////////////////////////////////////////////
// clase Jitter
class JitLoc {
  constructor(x, y, diameter, speed) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.speed = speed;
  }
}
//////////////////////////////////////////////////////////////////////
class JitStep {
  constructor(x, speed) {
    this.x = x;
    this.speed = speed;
  }
}
//////////////////////////////////////////////
function checkForHit(mImage, location, size)
{
  let count = 0;
  for (let x=location.x; x<location.x+size/2; x+=numForHit)
  {
    for (let y=location.y; y<location.y+size/2; y+=numForHit)
    {
      if (x < mImage.width+wsIni && x > wsIni && y < mImage.height+hsIni && y > hsIni)
      {
        if (brightness(mImage.get(x-wsIni, y-hsIni)) > numBrightness) 
        {
          //if (ColorPulgarI !== undefined )
          {
            //if (findColor(x, y, ColorManoI)) 
            { 
              count ++;
            }
          }
        }
      }
    }
  }
  frmRate = count;
  return count;
}
/////////////////////////////////////////////////////
function findColor(x, y, c) {
  // grab rgb from color to match
  let retorna = false;
  
  let matchR = c[0];
  let matchG = c[1];
  let matchB = c[2];
  
  let index = (y * videoImage.width + x) * 4;

  let r = videoImage.pixels[index];
  let g = videoImage.pixels[index+1];
  let b = videoImage.pixels[index+2];

  if (r >= matchR-TOLERANCETRACK && r <= matchR+TOLERANCETRACK &&
    g >= matchG-TOLERANCETRACK && g <= matchG+TOLERANCETRACK &&
    b >= matchB-TOLERANCETRACK && b <= matchB+TOLERANCETRACK) {
    retorna = true;
  } else {
    retorna = false;
  }
  return retorna;
}
