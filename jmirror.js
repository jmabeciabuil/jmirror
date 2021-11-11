let nVersion = 1.1;
let inputKey = 0;
let x = 100;
let y = 100;

let valLandscape = false;
let alpha = 0; // Orientation around Z axis
let beta = 0; // Orientation around X axis
let gamma = 0; // Orientation around Y axis

let facingUser = true;
let windowInnerWidth = 0;
let windowInnerHeight = 0;

let procNum = 0;
let lStored = false;
let iuESP ;
let lInicial=true;
let masMenos=0;
let masMenosTolerancia=0;

//////////////////////////
let CopyRight = "Abecia.";
let procName = "";
let frmRate ;
let camStr = "";

///////////////////////////////////////
let nFrames = 6;
let iWrite = 0;
let iRead = 1;

let buffer = [];
let xgridData = [];
let ygridData = [];
////////////////////////////////////////
let keyboard = false;
///////////////////////////////////////
//boolean lCapturaColorMouse=true;
let lRegistro=true;
let lMakeVideo=false;
let lPausa=false;
//let numNivelNext=0;
let numNivelFinal=99;
let nGrabaFoto=0;
//int passKey=0;
//VIDEO
/////////////////////////
let cameraName = "";
let sizeWidth ;
let sizeHeight;
let fpsNum = 30;

///////////////////////////////////////
let sOneCam = "Back/Front";
let sVideo = "Video:On/Off";
let sCamera = "Camera";
let sFrontal = "Up/Down";
let sLado = "Left/Right";
let sMirror = "Flipp/Normal";
let sReflejo = "Mirror:On/Off";
let sSincrono = "Synchro:On/Off";
let sTracking = "Tracking:On/Off";
let sTrackCV = "OpenCV:On/Off";
let sDisplayFingers = "Fingers:On/Off";
let sDobleDisplay = "Double:On/Off";
let sColor = "Color:On/Off";
let sAnaglipho = "3D/2D";
let sExit = "Save&Exit";
////////////////////////////////////////
let dimEsferas = 60;
let nSaltoX = 1; //25;
let nSaltoY = 1; //10;
let incrementoVideo = 100;
let nCoordX = 0;
let nCoordY = 0;
//////////////////////////
let fr = 60; //starting FPS
let filtroColor = 2;
let fTotalWidth = 0;
let fTotalHeight = 0;
let totalHeight ;
let totalWidth ;
let contrast = 0.4;
let deghost = 0.6;
let stereo = 0.0;
let rotation;
/////////////////////////////////////////////
//GRID
let nbOfHorizontalLines = 10;
let nbOfVerticalLines = 20;
/////////////////////////////////////////////
//FINGERS
let radioEsfera=20;

/////////////////////////////////////////////////
let valuesTxt = null;
let txtGui = null;
let txtMsg = null;
////////////////////////////////
//let bubbleImageBola;
////////////////////////////////
function preload() {
  //valuesTxt = loadJSON("/procESP.json");
  //txtGui = loadJSON("Z:/webMirror/iuESP.json");
  lStored = getItem('lStored');
  bubbleImageBola = createImg("./down.png", "");
  bubbleImageBola.hide();
}
/////////////////////////////////////////////
function setup() {
  if (pixelDensity()==1) // || (!valLandscape)
  {
    createCanvas(window.innerWidth, window.innerHeight);
    //createCanvas(screen.availWidth, screen.availHeight);
    //createCanvas(windowWidth, windowHeight, WEBGL);
    pVideoJava = createCapture(VIDEO);
    //wVideo=screen.availWidth*65/100;
    wVideo=screen.availWidth*60/100;
    //wVideo=screen.availWidth*50/100;
    hVideo=wVideo*screen.availHeight/screen.availWidth;
    pVideoJava.size(wVideo, hVideo);
    pVideoJava.hide();
  } else
  {
    createMetaTag();
    createCanvas(window.innerWidth, window.innerHeight);
    //if (window.DeviceOrientationEvent) 
    {
      //window.addEventListener('deviceorientation', onOrientationChange);
    }   
    wVideo=width;
    hVideo=height;
    setupCamera();
  }
  initImages();  

  smooth();

  frameRate(60);
  frmRate=60;
  //frmRate=pixelDensity();

  //TRACKING
  pCMTR = createVector(0, 0);
  pCMTL = createVector(0, 0);
  pCMHR = createVector(0, 0);
  pCMHL = createVector(0, 0);
  //PUNTEROS
  pCM1 = createVector(0, 0);
  pCW1 = createVector(0, 0);
  pCM2 = createVector(0, 0);
  pCW2 = createVector(0, 0);

  pC1 = createVector(0, 0);
  pC2 = createVector(0, 0);
  pC3 = createVector(0, 0);
  pC4 = createVector(0, 0);
  pC5 = createVector(0, 0);
  pC6 = createVector(0, 0);
  pC7 = createVector(0, 0);
  pC8 = createVector(0, 0);
  pC9 = createVector(0, 0);
  pC10 = createVector(0, 0);

  ColorPulgarI=color(255, 255, 255);
  ColorIndiceI=color(255, 255, 255);
  ColorMedioI=color(255, 255, 255);
  ColorAnularI=color(255, 255, 255);
  ColorMenorI=color(255, 255, 255);
  ColorManoI=color(255, 255, 255);
  ColorBrazoI=color(255, 255, 255);

  ColorPulgarII=color(255, 255, 255);
  ColorIndiceII=color(255, 255, 255);
  ColorMedioII=color(255, 255, 255);
  ColorAnularII=color(255, 255, 255);
  ColorMenorII=color(255, 255, 255);
  ColorManoII=color(255, 255, 255);
  ColorBrazoII=color(255, 255, 255);
  ////////////////////////////////////
  TOLERANCETRACK = 10;//20
  masMenos=0;
  masMenosTolerancia=0;

  nSaltoX = 1;
  nSaltoY = 1;

  noStroke();
  fill(255, 204);

  if (lStored) 
  {
    loadParamJson();
  }

  FingersRightOn(true, true, true, true, true, true, true, true, true);
  FingersLeftOn(true, true, true, true, true, true, true, true, true);

  initBar();
  noStroke();
  textAlign(CENTER);
  textSize(12);
  fill(0, 102, 153);
}
//////////////////////////////////////////////////////
function draw()
{
  //lights();
  background(255);
  videoImage = CapturaVideo(videoImage);
  if (lVideo) {
    image(videoImage, (wsIni), (hsIni), (wVideo), (hVideo));
  }
  switch(procNum) {
  case 0:
    if (lColor) 
    {
      procName="Color";
      drawColor();
    } 
    break;
  case 1:
    procName="Ball Up";
    drawBallUp();
    break;
  case 2:
    procName="Ball Down";
    drawBallDown();
    break;
  case 3:

    break;
  case 4:

    break;
  case 5:

    break;
  case 6:

    break;
  case 7:

    break;
  case 8:

    break;

  case 9:

    break;
  case 99:

    break;
  }
  TrackingVideo(videoImage);
  drawUI();
}
///////////////////////
function drawUI()
{
  copyRight();
  masMenos=0;
  masMenosTolerancia=0;
}
/////////////////////////////////
function EjecutaNiveles()
{
  // txtMsg = valuesTxt.procNum;

  //procName=txtMsg.PROCEDIMIENTO;

  if (procName.equals("drawColor")) {
    drawColor();
  }
  /* else if (procName.equals("drawEva")) drawEva();
   else if (procName.equals("drawLR")) drawLR();
   else if (procName.equals("drawEmo")) drawEmo();
   else if (procName.equals("drawNeuro")) drawNeuro();
   else if (procName.equals("drawHandsOn")) drawHandsOn();
   else if (procName.equals("drawBallUp")) drawBallUp();
   else if (procName.equals("drawPiano")) drawPiano();
   else if (procName.equals("drawBallDown")) drawBallDown();
   else if (procName.equals("drawPista")) drawPista();
   else if (procName.equals("drawPinza")) drawPinza();
   else if (procName.equals("drawBallGum")) drawBallGum();
   else if (procName.equals("drawDiana")) drawDiana();
   else if (procName.equals("drawPingPong")) drawPingPong();
   else if (procName.equals("drawLibre")) drawLibre();
   else if (procName.equals("drawReconstruirLRMII")) drawReconstruirLRMII();
   else if (procName.equals("drawReconstruirLRMI")) drawReconstruirLRMI();
   //else if (procName.equals("drawPintar")) drawPintar();
   else if (procName.equals("drawDibujar")) drawDibujar();
   else if (procName.equals("drawDedosHull")) drawDedosHull();
   else if (procName.equals("drawManosHull")) drawManosHull();
   //else if (procName.equals("drawObjeto")) drawObjeto();
   //else if (procName.equals("drawHiro")) drawHiro();
   //else if (procName.equals("drawDanza")) drawDanza();
   else if (procName.equals("drawWall")) drawWall();
   else if (procName.equals("drawHandAvion")) drawHandAvion();
   else if (procName.equals("drawHandPS")) drawHandPS();
   else if (procName.equals("drawHandFE")) drawHandFE();
   else if (procName.equals("drawHandFEL")) drawHandFEL();
   else if (procName.equals("drawHandRC")) drawHandRC();
   else if (procName.equals("drawHandRCL")) drawHandRCL();
   else if (procName.equals("drawRespir")) drawRespir();
   //else if (procName.equals("drawBallDown")) drawBallDownRespi();
   //else if (procName.equals("drawGrafDolor")) drawGrafDolor();
   else if (procName.equals("drawSpheres")) drawSpheres();
   else if (procName.equals("drawGravity")) drawGravity();
   else if (procName.equals("drawMoveRect")) drawMoveRect();
   else if (procName.equals("drawButtons")) drawButtons();
   else if (procName.equals("drawShooters")) drawShooters();
   else if (procName.equals("drawTest")) drawTest();
   else if (procName.equals("drawFinal")) drawFinal();*/
  masMenos=0;
}

////////////////////////////////////
function initImages()
{
  wsIni=(width-pVideoJava.width)/2;
  hsIni=(height-pVideoJava.height)/2;
  wVideo=pVideoJava.width;
  hVideo=pVideoJava.height;
  videoFrame = createImage(pVideoJava.width, pVideoJava.height);
  videoImage = createImage(pVideoJava.width, pVideoJava.height);
  prevFrame = createImage(pVideoJava.width, pVideoJava.height);
  display = createImage(pVideoJava.width, pVideoJava.height);

  nElip=int((wVideo/10));
  longlarg=nElip;
  lInit=true;
  for (let i = 0; i < nFrames; i++) 
  {
    buffer[i] = null;
  }
  initRectDown();
}
/////////////////////////////////////////
function initRectUp()
{
  let n = 1;
  let nUpDown=-hVideo+nElip*n+nElip/2;

  for (let x=0; x<10; x++) {
    for (let y=0; y<1; y++) {
      xgridData[x]=1;
      ygridData[x]=1;
    }
  }

  ygridData[12]=hsIni+nElip*3;
  ygridData[13]=hsIni+nElip*5-nElip/2;

  ygridData[10]=hsIni+nElip*n*3;
  ygridData[11]=hsIni+nElip*n*5-nElip/2;

  ygridData[9]=nUpDown+hsIni+hVideo+nElip;
  ygridData[8]=nUpDown+hsIni+hVideo;
  ygridData[7]=nUpDown+hsIni+hVideo-nElip/2;
  ygridData[6]=nUpDown+hsIni+hVideo;
  ygridData[5]=nUpDown+hsIni+hVideo+nElip*2+nElip/2;

  ygridData[4]=nUpDown+hsIni+hVideo+nElip;
  ygridData[3]=nUpDown+hsIni+hVideo;
  ygridData[2]=nUpDown+hsIni+hVideo-nElip/2;
  ygridData[1]=nUpDown+hsIni+hVideo;
  ygridData[0]=nUpDown+hsIni+hVideo+nElip*2+nElip/2;

  ////////////////////////////////////////////////////////////

  xgridData[12]=window.innerWidth/2-(3*nElip);
  xgridData[13]=window.innerWidth/2-(3*nElip);

  xgridData[10]=window.innerWidth/2+(2*nElip);
  xgridData[11]=window.innerWidth/2+(2*nElip);

  xgridData[9]=window.innerWidth/2-(5*nElip);
  xgridData[8]=window.innerWidth/2-(4*nElip);
  xgridData[7]=window.innerWidth/2-(3*nElip);
  xgridData[6]=window.innerWidth/2-(2*nElip);
  xgridData[5]=window.innerWidth/2-(1*nElip);

  xgridData[0]=window.innerWidth/2+(0*nElip);
  xgridData[1]=window.innerWidth/2+(1*nElip);
  xgridData[2]=window.innerWidth/2+(2*nElip);
  xgridData[3]=window.innerWidth/2+(3*nElip);
  xgridData[4]=window.innerWidth/2+(4*nElip);
}

//////////////////////////////////////
function initRectDown()
{

  let n = 1;
  let nUpDown=-hVideo+nElip*n+nElip/2;

  for (let x=0; x<10; x++) {
    for (let y=0; y<1; y++) {
      xgridData[x]=1;
      ygridData[x]=1;
    }
  }

  ygridData[13]=hsIni+nElip*3-nElip/2;
  ygridData[12]=hsIni+nElip*5-nElip;

  ygridData[11]=hsIni+nElip*n*3-nElip/2;
  ygridData[10]=hsIni+nElip*n*5-nElip;

  ygridData[9]=nUpDown+hsIni+hVideo+nElip*3+nElip/2;
  ygridData[8]=nUpDown+hsIni+hVideo+nElip*4;
  ygridData[7]=nUpDown+hsIni+hVideo+nElip*4;
  ygridData[6]=nUpDown+hsIni+hVideo+nElip*3+nElip/2;
  ygridData[5]=nUpDown+hsIni+hVideo+nElip*1+nElip/2;

  ygridData[4]=nUpDown+hsIni+hVideo+nElip*3+nElip/2;
  ygridData[3]=nUpDown+hsIni+hVideo+nElip*4;
  ygridData[2]=nUpDown+hsIni+hVideo+nElip*4;
  ygridData[1]=nUpDown+hsIni+hVideo+nElip*3+nElip/2;
  ygridData[0]=nUpDown+hsIni+hVideo+nElip*1+nElip/2;

  ////////////////////////////////////////////////////////////

  xgridData[12]=window.innerWidth/2-(3*nElip);
  xgridData[13]=window.innerWidth/2-(3*nElip);

  xgridData[10]=window.innerWidth/2+(2*nElip);
  xgridData[11]=window.innerWidth/2+(2*nElip);

  xgridData[5]=window.innerWidth/2-(5*nElip);
  xgridData[6]=window.innerWidth/2-(4*nElip);
  xgridData[7]=window.innerWidth/2-(3*nElip);
  xgridData[8]=window.innerWidth/2-(2*nElip);
  xgridData[9]=window.innerWidth/2-(1*nElip);

  xgridData[4]=window.innerWidth/2+(0*nElip);
  xgridData[3]=window.innerWidth/2+(1*nElip);
  xgridData[2]=window.innerWidth/2+(2*nElip);
  xgridData[1]=window.innerWidth/2+(3*nElip);
  xgridData[0]=window.innerWidth/2+(4*nElip);
}
////////////////////////////////
function copyRight()
{
  textAlign(RIGHT);
  fill(0);
  stroke(0);
  text("(R) Mirrors - (C) "+CopyRight, window.innerWidth-50, window.innerHeight-40);
  textAlign(LEFT);
  text("V - "+nVersion+" / FPS: " + frmRate +" - (P) "+procName, 50, window.innerHeight-40);
  textAlign(CENTER);
  text(camStr, window.innerWidth/2, hsIni+hVideo+25);
  noFill();
  optionsMenu();
}
//////////////////////////////
function optionsMenu()
{
  let n=25;
  textAlign(LEFT);
  fill(0);
  stroke(0);
  text("0: "+sVideo, n, n+n*2*0);
  text("1: "+sFrontal, n, n+n*1);
  text("2: "+sLado, n, n+n*2);
  text("3: "+sMirror, n, n+n*3);
  text("4: "+sReflejo, n, n+n*4);
  text("5: "+sSincrono, n, n+n*5);
  text("6: "+sTracking, n, n+n*6);
  text("7: "+sDisplayFingers, n, n+n*7);
  text("8: "+sDobleDisplay, n, n+n*8);
  text("9: "+sColor, n, n+n*9);
  //text("espace: "+sAnaglipho, n, n+n*10);
  noFill();
}
////////////////////////////////
function reinitProcedure()
{
  lInit=false;
}
//////////////////////////////
function barManual(n)
{
  switch(n) {
  case 0:
    lVideo=!lVideo;
    if (lVideo)
    {
      sVideo = "Video-Off";
    } else
    {
      sVideo = "Video-On";
    }
    break;
  case 1:
    modoFrontal=!modoFrontal;
    if (modoFrontal)
    {
      sFrontal="Pos-Up";
    } else
    {
      sFrontal="Pos-Down";
    }
    break;
  case 2:
    modoDiestro=!modoDiestro;
    if (modoDiestro)
    {
      sLado="Hand-Left";
    } else
    {
      sLado="Hand-Right";
    }
    break;
  case 3:
    modoMirror=!modoMirror;
    if (modoMirror)
    {
      sMirror = "Flipp-Off";
    } else
    {
      sMirror = "Flipp-On";
    }
    break;
  case 4:
    modoReflejo=!modoReflejo;
    if (modoReflejo)
    {
      sReflejo="Mirror-Off";
    } else
    {
      sReflejo="Mirror-On";
    }
    break;
  case 5:
    modoSyncrono=!modoSyncrono;
    if (modoSyncrono)
    {
      sSincrono="Synchro-Off";
    } else
    {
      sSincrono="Synchro-On";
    }
    break;
  case 6:
    lTracking=!lTracking;
    if (lTracking)
    {
      sTracking = "Track-Off";
    } else
    {
      sTracking = "Track-On";
    }
    break;
  case 7:
    lDisplayFingers=!lDisplayFingers;
    if (lDisplayFingers)
    {
      sDisplayFingers = "Fingers-Off";
    } else
    {
      sDisplayFingers = "Fingers-On";
    }
    break;
  case 8:
    lDisplayDouble=!lDisplayDouble;
    if (lDisplayDouble)
    {
      sDobleDisplay = "Single-Hand";
    } else
    {
      sDobleDisplay = "Double-Hand";
    }
    break;
  case 9:
    lColor=!lColor;
    if (lColor)
    {
      sColor = "Color-Off";
    } else
    {
      sColor = "Color-On";
    }
    break;
  }
}
/////////////////////////////////////////
function initBar()
{
  if (lVideo)
  {
    sVideo = "Video-Off";
  } else
  {
    sVideo = "Video-On";
  }

  if (modoFrontal)
  {
    sFrontal="Pos-Up";
  } else
  {
    sFrontal="Pos-Down";
  }

  if (modoDiestro)
  {
    sLado="Hand-Left";
  } else
  {
    sLado="Hand-Right";
  }

  if (modoMirror)
  {
    sMirror = "Flipp-Off";
  } else
  {
    sMirror = "Flipp-On";
  }

  if (modoReflejo)
  {
    sReflejo="Mirror-Off";
  } else
  {
    sReflejo="Mirror-On";
  }

  if (modoSyncrono)
  {
    sSincrono="Synchro-Off";
  } else
  {
    sSincrono="Synchro-On";
  }

  if (lTracking)
  {
    sTracking = "Track-Off";
  } else
  {
    sTracking = "Track-On";
  }

  if (lDisplayFingers)
  {
    sDisplayFingers = "Fingers-Off";
  } else
  {
    sDisplayFingers = "Fingers-On";
  }

  if (lDisplayDouble)
  {
    sDobleDisplay = "Single-Hand";
  } else
  {
    sDobleDisplay = "Double-Hand";
  }

  if (lColor)
  {
    sColor = "Color-Off";
  } else
  {
    sColor = "Color-On";
  }
}
/////////////////////////////////////////
function loadParamJson()
{  
  /*
  lStored = localStorage.getItem('lStored');
   bubbleImageBola = localStorage.getItem('bubbleImageBola');
   procName = localStorage.getItem('procName');
   lTracking = localStorage.getItem('lTracking');
   ColorPulgarI = localStorage.getItem('ColorPulgarI');
   ColorIndiceI = localStorage.getItem('ColorIndiceI');
   ColorMedioI = localStorage.getItem('ColorMedioI');
   ColorAnularI = localStorage.getItem('ColorAnularI');
   ColorMenorI = localStorage.getItem('ColorMenorI');
   ColorManoI = localStorage.getItem('ColorManoI');
   ColorBrazoI = localStorage.getItem('ColorBrazoI');
   ColorPulgarII = localStorage.getItem('ColorPulgarII');
   ColorIndiceII = localStorage.getItem('ColorIndiceII');
   ColorMedioII = localStorage.getItem('ColorMedioII');
   ColorAnularII = localStorage.getItem('ColorAnularII');
   ColorMenorII = localStorage.getItem('ColorMenorII');
   ColorManoII = localStorage.getItem('ColorManoII');
   ColorBrazoII = localStorage.getItem('ColorBrazoII');
   */

  lStored = getItem('lStored');
  //bubbleImageBola = getItem('bubbleImageBola');
  procName = getItem('procName');
  procNum = getItem('procNum');
  lTracking = getItem('lTracking');
  ColorPulgarI = getItem('ColorPulgarI');
  ColorIndiceI = getItem('ColorIndiceI');
  ColorMedioI = getItem('ColorMedioI');
  ColorAnularI = getItem('ColorAnularI');
  ColorMenorI = getItem('ColorMenorI');
  ColorManoI = getItem('ColorManoI');
  ColorBrazoI = getItem('ColorBrazoI');
  ColorPulgarII = getItem('ColorPulgarII');
  ColorIndiceII = getItem('ColorIndiceII');
  ColorMedioII = getItem('ColorMedioII');
  ColorAnularII = getItem('ColorAnularII');
  ColorMenorII = getItem('ColorMenorII');
  ColorManoII = getItem('ColorManoII');
  ColorBrazoII = getItem('ColorBrazoII');
}
///////////////////////////////

function saveParamJson()
{
  lStored=true;
  /*
  localStorage.setItem('lStored', lStored);
   localStorage.setItem('procName', procName);
   localStorage.setItem('lTracking', lTracking);
   localStorage.setItem('ColorPulgarI', ColorPulgarI);
   localStorage.setItem('ColorIndiceI', ColorIndiceI);
   localStorage.setItem('ColorMedioI', ColorMedioI);
   localStorage.setItem('ColorAnularI', ColorAnularI);
   localStorage.setItem('ColorMenorI', ColorMenorI);
   localStorage.setItem('ColorManoI', ColorManoI);
   localStorage.setItem('ColorBrazoI', ColorBrazoI);
   localStorage.setItem('ColorPulgarII', ColorPulgarII);
   localStorage.setItem('ColorIndiceII', ColorIndiceII);
   localStorage.setItem('ColorMedioII', ColorMedioII);
   localStorage.setItem('ColorAnularII', ColorAnularII);
   localStorage.setItem('ColorMenorII', ColorMenorII);
   localStorage.setItem('ColorManoII', ColorManoII);
   localStorage.setItem('ColorBrazoII', ColorBrazoII);
   */

  //storeItem('bubbleImageBola', bubbleImageBola);
  storeItem('lStored', lStored);
  storeItem('procName', procName);
  storeItem('procNum', procNum);
  storeItem('lTracking', lTracking);
  storeItem('ColorPulgarI', ColorPulgarI);
  storeItem('ColorIndiceI', ColorIndiceI);
  storeItem('ColorMedioI', ColorMedioI);
  storeItem('ColorAnularI', ColorAnularI);
  storeItem('ColorMenorI', ColorMenorI);
  storeItem('ColorManoI', ColorManoI);
  storeItem('ColorBrazoI', ColorBrazoI);
  storeItem('ColorPulgarII', ColorPulgarII);
  storeItem('ColorIndiceII', ColorIndiceII);
  storeItem('ColorMedioII', ColorMedioII);
  storeItem('ColorAnularII', ColorAnularII);
  storeItem('ColorMenorII', ColorMenorII);
  storeItem('ColorManoII', ColorManoII);
  storeItem('ColorBrazoII', ColorBrazoII);
}

/////////////////////////////////////////////
function FingersRightOn(chF1, chF2, chF3, chF4, chF5, chF6, chF7, chF8, chF9)
{
  checkboxFingersI1=chF1;
  checkboxFingersI2=chF2;
  checkboxFingersI3=chF3;
  checkboxFingersI4=chF4;
  checkboxFingersI5=chF5;
  checkboxFingersI6=chF6;
  checkboxFingersI7=chF7;
  checkboxFingersI8=chF8;
  checkboxFingersI9=chF9;
}
function FingersLeftOn(chF1, chF2, chF3, chF4, chF5, chF6, chF7, chF8, chF9)
{
  checkboxFingersII1=chF1;
  checkboxFingersII2=chF2;
  checkboxFingersII3=chF3;
  checkboxFingersII4=chF4;
  checkboxFingersII5=chF5;
  checkboxFingersII6=chF6;
  checkboxFingersII7=chF7;
  checkboxFingersII8=chF8;
  checkboxFingersII9=chF9;
}
////////////////////////////////////////////
function incrementoMasMenos(textoString1, textoString2)
{
  fill(0);
  stroke(0);
  textAlign(CENTER);
  text(textoString1+ "  -  "+textoString2, window.innerWidth/2, hsIni+hVideo+50);
  noFill();
}
//////////////////////////////
function touchStarted() {
  inputKey = prompt("Enter a key: ");
  drawTeclado(inputKey);
}

function setupCamera() {
  if (pVideoJava) {
    pVideoJava.remove();
  } 
  pVideoJava = createCapture( {
  video: 
    {
    facingMode: 
      facingUser ? 'user' : 'environment'
    } 
  , audio: 
    false
  }
  );
  pVideoJava.size(width, height);
  pVideoJava.hide();
}

function touchMoved() {
  // prevent the display from moving around when you touch it
  return false;
}

function createMetaTag() {
  let meta = createElement('meta');
  meta.attribute('name', 'viewport');
  meta.attribute('content', 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height');

  let head = select('head');
  meta.parent(head);
}
////////////////////////////////////////////
function onOrientationChange(e) {
  alpha = e.alpha;
  beta = e.beta;
  gamma = e.gamma;

  println(alpha + " " + beta + " " + gamma);
}
///////////////////////////////////////////////////
function deviceTurned()
{
  if (turnAxis == 'X')
  {
    valLandscape = true;
  } else 
  {
    valLandscape = false;
  }
}
/////////////////////////////////////////////////////
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initImages();
}
/////////////////////////////////////////////////////
function drawTeclado(keyTecla)
{
  //barManual(int(keyTecla));
  if (keyTecla == '0')
  {
    barManual(0);
  } else if (keyTecla == '1')
  {
    barManual(1);
  } else if (keyTecla == '2')
  {
    barManual(2);
  } else if (keyTecla == '3')
  {
    barManual(3);
  } else if (keyTecla == '4')
  {
    barManual(4);
  } else if (keyTecla == '5')
  {
    barManual(5);
  } else if (keyTecla == '6')
  {
    barManual(6);
  } else if (keyTecla == '7')
  {
    barManual(7);
  } else if (keyTecla == '8')
  {
    barManual(8);
  } else if (keyTecla == '9')
  {
    barManual(9);
  } else if (keyTecla == '>' )
  {
    procNum++;
    lInit=true;
    if (procNum>numNivelFinal) {
      procNum=numNivelFinal;
    }
  } else if (keyTecla == '<' )
  {
    procNum--;
    lInit=true;
    if (procNum<0) {
      procNum=0;
    }
  } else if (key == 'F' || key == 'B' )
  {
    facingUser = !facingUser;
    setupCamera();
    //initImages();
  }
}
////////////////////////////////////
var text;
function promptTexto()
{
  var person = prompt("Please enter your name", "Harry Potter");

  if (person != null) {
    document.getElementById("demo").innerHTML =
      "Hello " + person + "! How are you today?";
  }
}
