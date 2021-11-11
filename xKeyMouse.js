///////////////////////
let ColorPulgarI;
let ColorIndiceI;
let ColorMedioI;
let ColorAnularI;
let ColorMenorI;
let ColorManoI;
let ColorBrazoI;

let ColorPulgarII;
let ColorIndiceII;
let ColorMedioII;
let ColorAnularII;
let ColorMenorII;
let ColorManoII;
let ColorBrazoII;

////////////////////////////////////////
function keyPressed()
{
  if ( key == 27 )
  {
    exit();
  } else if (key == ' ' )
  {
    barManual(99);
  } else if (key == '+' )
  {
    masMenos=1;
    if (opcionCam==cameras.length) {
      opcionCam=cameras.length;
    } else {
      opcionCam=opcionCam+1;
    }
    newResolutionUp();
  } else if (key == '-' )
  {
    masMenos=-1;
    if (opcionCam==0) {
      opcionCam=0;
    } else {
      opcionCam=opcionCam-1;
    }
    newResolutionDown();
  } else if (key == 's' || key == 'S' )
  {
    saveParamJson();
    //loadParamJson();
  } else if (key == 'i' || key == 'I')
  {
  } else if (key == 'g' )
  {
    let sFile="Print"+millis()+".jpg";
    save("/images/"+sFile);
  } else if (key == '0')
  {
    barManual(0);
  } else if (key == '1')
  {
    barManual(1);
  } else if (key == '2')
  {
    barManual(2);
  } else if (key == '3')
  {
    barManual(3);
  } else if (key == '4')
  {
    barManual(4);
  } else if (key == '5')
  {
    barManual(5);
  } else if (key == '6')
  {
    barManual(6);
  } else if (key == '7')
  {
    barManual(7);
  } else if (key == '8')
  {
    barManual(8);
  } else if (key == '9')
  {
    barManual(9);
  } else if (keyCode==RIGHT_ARROW ||  key == '>' )
  {
    procNum++;
    lInit=true;
    if (procNum>numNivelFinal) {
      procNum=numNivelFinal;
    }
  } else if (keyCode==LEFT_ARROW ||  key == '<' )
  {
    procNum--;
    lInit=true;
    if (procNum<0) {
      procNum=0;
    }
  } else if (keyCode==UP_ARROW )
  {
    masMenosTolerancia=1;
  } else if (keyCode==DOWN_ARROW)
  {
    masMenosTolerancia=-1;
  } else if (key == 33) //page up 33
  {
  } else if (key == 34) //page down 34
  {
  } else if (key == 16 ) // up 16
  {
    masMenosTolerancia=1;
  } else if (key == 11 ) // down 11
  {
    masMenosTolerancia=-1;
  } else  if (keyCode == ENTER || keyCode == RETURN)
  {
    inputKey = prompt("What's your touch key?");
    barManual(int(inputKey));
  } else if (keyIsDown(BACKSPACE))
  {
    
  }
  else if ( keyCode == DELETE) 
  {
    //barManual(99);
    
  }
}
/////////////////////////////////////////////////////////////
function mousePressed()
{
  //mousePressedManual();
  if (lColor)
  {
    CapturaColorMouse();
  }
}
/////////////////////////////////////////
function locPixel()
{
  let loc = 0;
  loc = (mouseX-wsIni) + (mouseY-hsIni)*videoImage.width;
  return loc;
}
/////////////////////////////////////////
function CapturaColorMouse()
{
  let mouseX2=mouseX-wsIni;
  let mouseY2=mouseY-hsIni;
  //let mouseX2=mouseX-wsIni-width/2;
  //let mouseY2=mouseY-hsIni-height/2;
  if (mouseX<wsIni || mouseX>wsIni+wVideo || mouseY<hsIni || mouseY>hsIni+hVideo)
  {
  } else
  {
    //1 LU wsIni+nElip/2, hsIni+hVideo-50
    if (mouseX>=xgridData[0] && mouseX<=xgridData[0] + longlarg && mouseY>=ygridData[0] -  longlarg && mouseY<= ygridData[0] )
    {
      ColorPulgarI = videoImage.get(mouseX2, mouseY2);
      ColorPulgarII=ColorPulgarI;
    } else
      // 2 RU wsIni+nElip/2+nElip, hsIni+hVideo-50
      if (mouseX>=xgridData[1] && mouseX<=xgridData[1] + longlarg && mouseY>=ygridData[1] -  longlarg && mouseY<= ygridData[1] )
      {
        ColorIndiceI = videoImage.get(mouseX2, mouseY2);
        ColorIndiceII=ColorIndiceI;
      } else
        // 3 LD
        if (mouseX>=xgridData[2] && mouseX<=xgridData[2] + longlarg && mouseY>=ygridData[2] -  longlarg && mouseY<= ygridData[2] )
        {
          ColorMedioI = videoImage.get(mouseX2, mouseY2);
          ColorMedioII=ColorMedioI;
        } else
          // 4 RD
          if (mouseX>=xgridData[3] && mouseX<=xgridData[3] + longlarg && mouseY>=ygridData[3] -  longlarg && mouseY<= ygridData[3] )
          {
            ColorAnularI = videoImage.get(mouseX2, mouseY2);
            ColorAnularII=ColorAnularI;
          } else
            //5D
            if (mouseX>=xgridData[4] && mouseX<=xgridData[4] + longlarg && mouseY>=ygridData[4] -  longlarg && mouseY<= ygridData[4] )
            {
              ColorMenorI= videoImage.get(mouseX2, mouseY2);
              ColorMenorII=ColorMenorI;
            } else
              if (mouseX>=xgridData[10] && mouseX<=xgridData[10] + longlarg && mouseY>=ygridData[10] -  longlarg && mouseY<= ygridData[10] )
              {
                ColorManoI = videoImage.get(mouseX2, mouseY2);
                ColorManoII=ColorManoI;
                //lInitCV=true;
              } else
                //0 M wsIni+wVideo/2-wVideo/4, hsIni+hVideo/2+50
                if (mouseX>=xgridData[11] && mouseX<=xgridData[11] + longlarg && mouseY>=ygridData[11] -  longlarg && mouseY<= ygridData[11] )
                {
                  ColorBrazoI = videoImage.get(mouseX2, mouseY2);
                  ColorBrazoII=ColorBrazoI;
                } else
                  ////////////////////////////

                  //1 LU wsIni+nElip/2, hsIni+hVideo-50
                  if (mouseX>=xgridData[5] && mouseX<=xgridData[5] + longlarg && mouseY>=ygridData[5] -  longlarg && mouseY<= ygridData[5] )
                  {
                    ColorPulgarII = videoImage.get(mouseX2, mouseY2);
                    ColorPulgarI=ColorPulgarII;
                  } else
                    // 2 RU wsIni+nElip/2+nElip, hsIni+hVideo-50
                    if (mouseX>=xgridData[6] && mouseX<=xgridData[6] + longlarg && mouseY>=ygridData[6] -  longlarg && mouseY<= ygridData[6] )
                    {
                      ColorIndiceII = videoImage.get(mouseX2, mouseY2);
                      ColorIndiceI=ColorIndiceII;
                    } else
                      // 3 LD
                      if (mouseX>=xgridData[7] && mouseX<=xgridData[7] + longlarg && mouseY>=ygridData[7] -  longlarg && mouseY<= ygridData[7] )
                      {
                        ColorMedioII = videoImage.get(mouseX2, mouseY2);
                        ColorMedioI=ColorMedioII;
                      } else
                        // 4 RD
                        if (mouseX>=xgridData[8] && mouseX<=xgridData[8] + longlarg && mouseY>=ygridData[8] -  longlarg && mouseY<= ygridData[8] )
                        {
                          ColorAnularII = videoImage.get(mouseX2, mouseY2);
                          ColorAnularI=ColorAnularII;
                        } else
                          //5D
                          if (mouseX>=xgridData[9] && mouseX<=xgridData[9] + longlarg && mouseY>=ygridData[9] -  longlarg && mouseY<= ygridData[9] )
                          {
                            ColorMenorII = videoImage.get(mouseX2, mouseY2);
                            ColorMenorI=ColorMenorII;
                          } else
                            //0 M wsIni+wVideo/2-wVideo/4, hsIni+hVideo/2+50
                            if (mouseX>=xgridData[12] && mouseX<=xgridData[12] + longlarg && mouseY>=ygridData[12] -  longlarg && mouseY<= ygridData[12] )
                            {
                              ColorManoII = videoImage.get(mouseX2, mouseY2);
                              ColorManoI=ColorManoII;
                              //lInitCV=true;
                            } else
                              //0 C wsIni+wVideo/2-wVideo/4, hsIni+150
                              if (mouseX>=xgridData[13] && mouseX<=xgridData[13] + longlarg && mouseY>=ygridData[13] -  longlarg && mouseY<= ygridData[13] )
                              {
                                ColorBrazoII = videoImage.get(mouseX2, mouseY2);
                                ColorBrazoI=ColorBrazoII;
                              }
  }
}
///////////////////////////////////////////////
function toolsPunteros()
{
  let trackColorManual1=color(255);
  let trackColorManual2=color(255);
  let trackColorManual3=color(255);
  let trackColorManual4=color(255);
  let trackColorManual5=color(255);

  let trackColorManual6=color(255);
  let trackColorManual7=color(255);
  let trackColorManual8=color(255);
  let trackColorManual9=color(255);
  let trackColorManual10=color(255);

  let sf1 = "thumb";
  let sf2 = "index";
  let sf3 = "middle";
  let sf4 = "ring";
  let sf5 = "pinky";
  let sh = "Hand";
  let sw = "Wrist";

  if (checkboxFingersI1) {
    trackColorManual1=ColorPulgarI;
  }
  if (checkboxFingersI2) {
    trackColorManual2=ColorIndiceI;
  }
  if (checkboxFingersI3) {
    trackColorManual3=ColorMedioI;
  }
  if (checkboxFingersI4) {
    trackColorManual4=ColorAnularI;
  }
  if (checkboxFingersI5) {
    trackColorManual5=ColorMenorI;
  }

  if (checkboxFingersII1) {
    trackColorManual6=ColorPulgarII;
  }
  if (checkboxFingersII2) {
    trackColorManual7=ColorIndiceII;
  }
  if (checkboxFingersII3) {
    trackColorManual8=ColorMedioII;
  }
  if (checkboxFingersII4) {
    trackColorManual9=ColorAnularII;
  }
  if (checkboxFingersII5) {
    trackColorManual10=ColorMenorII;
  }


  if (modoDiestro)
  {
    displayColorMouseLight(trackColorManual1, sf1, wsIni+50, 100);
    displayColorMouseLight(trackColorManual2, sf2, wsIni+wVideo/2-wVideo/4+25, 100);
    displayColorMouseLight(trackColorManual3, sf3, wsIni+wVideo/2, 100);
    displayColorMouseLight(trackColorManual4, sf4, wsIni+wVideo/2+wVideo/4-25, 100);
    displayColorMouseLight(trackColorManual5, sf5, wsIni+wVideo-50, 100);
  } else
  {
    displayColorMouseLight(trackColorManual6, sf1, wsIni+50, 100);
    displayColorMouseLight(trackColorManual7, sf2, wsIni+wVideo/2-wVideo/4+25, 100);
    displayColorMouseLight(trackColorManual8, sf3, wsIni+wVideo/2, 100);
    displayColorMouseLight(trackColorManual9, sf4, wsIni+wVideo/2+wVideo/4-25, 100);
    displayColorMouseLight(trackColorManual10, sf5, wsIni+wVideo-50, 100);
  }
}
///////////////////////////////////////////////////////////
function DisplayColorRect()
{
  let sf1 = "1-thumb";
  let sf2 = "2-index";
  let sf3 = "3-middle";
  let sf4 = "4-ring";
  let sf5 = "5-pinky";
  let sh1 = "Hand";
  let sw1 = "Wrist";

  let sf6 = "1-thumb";
  let sf7 = "2-index";
  let sf8 = "3-middle";
  let sf9 = "4-ring";
  let sf10 = "5-pinky";
  let sh2 = "Hand";
  let sw2 = "Wrist";

  displayColorMouses(nElip, ColorPulgarI, sf1, xgridData[0] , ygridData[0] );
  displayColorMouses(nElip, ColorIndiceI, sf2, xgridData[1] , ygridData[1] );
  displayColorMouses(nElip, ColorMedioI, sf3, xgridData[2] , ygridData[2] );
  displayColorMouses(nElip, ColorAnularI, sf4, xgridData[3] , ygridData[3] );
  displayColorMouses(nElip, ColorMenorI, sf5, xgridData[4] , ygridData[4] );
  displayColorMouses(nElip, ColorManoI, sh1, xgridData[10] , ygridData[10] );
  displayColorMouses(nElip, ColorBrazoI, sw1, xgridData[11] , ygridData[11] );

  displayColorMouses(nElip, ColorPulgarII, sf6, xgridData[5] , ygridData[5] );
  displayColorMouses(nElip, ColorIndiceII, sf7, xgridData[6] , ygridData[6] );
  displayColorMouses(nElip, ColorMedioII, sf8, xgridData[7] , ygridData[7] );
  displayColorMouses(nElip, ColorAnularII, sf9, xgridData[8] , ygridData[8] );
  displayColorMouses(nElip, ColorMenorII, sf10, xgridData[9] , ygridData[9] );
  displayColorMouses(nElip, ColorManoII, sh2, xgridData[12] , ygridData[12] );
  displayColorMouses(nElip, ColorBrazoII, sw2, xgridData[13] , ygridData[13] );

}
/////////////////////////////////////////
function displayColorMouses( nElip, trackColor, dedoTxt, posW, posH)
{
  textAlign(CENTER);
  noFill();
  stroke(trackColor);
  rect(posW, posH-nElip, nElip, nElip);
  fill(trackColor);
  noStroke();
  rect(posW+nElip/4, posH-nElip/2-nElip/4, nElip/2, nElip/2);
  text(dedoTxt, posW+nElip/2, posH-nElip-10);
  fill(0);
  text(posW, posH-40);
  noFill();
}
//////////////////////////////////
