//////////////////////////////////////////
function drawColor()
{
  if (lInit)
  {    
    reinitProcedure();
    FingersRightOn(true, true, true, true, true, true, true, false, false);
    FingersLeftOn(true, true, true, true, true, true, true, false, false);
  }   
  if (masMenosTolerancia==1) 
  {
    TOLERANCETRACK++;
    if (TOLERANCETRACK>20) {TOLERANCETRACK=20;}
  } else if (masMenosTolerancia==-1) 
  {
    TOLERANCETRACK--;
    if (TOLERANCETRACK<5) {TOLERANCETRACK=5;}
  }
  
  if (masMenos==1) 
  {
    dimEsferas++;
    if (dimEsferas>99) {dimEsferas=99;}
  } else if (masMenos==-1) 
  {    
    dimEsferas--;
    if (dimEsferas<50) {dimEsferas=50;}
  }

  let textoStr1="Tracking: "+TOLERANCETRACK+" (5/20)-(arrow up/arrow down) ";
  let textoStr2="Sphere: "+dimEsferas+" (50/99)-(+/-) ";
  
  if (!lTracking) {textoStr1=""; textoStr2="";}
  
  incrementoMasMenos(textoStr1, textoStr2);
  DisplayColorRect();
}
//////////////////////////////////////////
function drawBallUp()
{
  if (lInit)
  {
    reinitProcedure();
   // bubbleImageBola = loadImage("down.png");
  }  
  EsferasAbajo();

  if (masMenos==1) 
  {
    masMenosSpeedBall++; 
    if (masMenosSpeedBall>2) {
      masMenosSpeedBall=2;
    }
  } else if (masMenos==-1) 
  {
    masMenosSpeedBall--; 
    if (masMenosSpeedBall<1) {
      masMenosSpeedBall=1;
    }
  }

  let textoStr1="Speed Ball: "+masMenosSpeedBall+" (1/2)-(+/-)";
  let textoStr2="";
  incrementoMasMenos(textoStr1, textoStr2);
}
////////////////////////////////////////////////////////////////
function drawBallDown()
{
  if (lInit)
  {
    reinitProcedure();
  }

  EsferasArriba();

  if (masMenos==1) 
  {
    masMenosSpeedBall++; 
    if (masMenosSpeedBall>100) {
      masMenosSpeedBall=100;
    }
  } else if (masMenos==-1) 
  {
    masMenosSpeedBall--; 
    if (masMenosSpeedBall<10) {
      masMenosSpeedBall=10;
    }
  }

  let textoStr1="Speed Ball: "+masMenosSpeedBall+" (1/2)-(+/-)";
  let textoStr2="";
  incrementoMasMenos(textoStr1, textoStr2);
}

////////////////////////////////////////////////////////////////////////
