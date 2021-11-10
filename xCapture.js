////////////////////
let pVideoJava;
let videoFrame;
let videoImage;
let prevFrame;
let wVideo=752;
let hVideo=601;
//let wVideo=640;
//let hVideo=480;
let wsIni = 0;
let hsIni = 0;
let nElip = 0;
let longlarg = 0;
let lInit = false;
/////////////////////////
let modoFrontal = true;
let modoReflejo = true;
let modoMirror = true;
let modoDiestro = false;
let modoSyncrono = true;
//TRACKING

let lTracking = true;

//DISPLAY
let lDisplayFingers = true;
let lDisplayDouble = true;
let lColor = true;
let lVideo = true;
let lOnCam = true;

let nFrames = 6;
let iWrite = 0;
let iRead = 1;

let buffer = [];
let xgridData = [];
let ygridData = [];

///////////////////////////////////////
function CapturaVideo(pVideo)
{
  pVideoJava.loadPixels();
  pVideo.loadPixels();
  if (modoReflejo)
  {
    if (modoDiestro)
    {
      if (modoFrontal)
      {
        //modo frontal derecho reflejo sincrono y asincrono
        if (modoSyncrono) {
          camStr="Mirror-Front-Right-Sincro";
          pVideo = ReflexFrontRigthNoTrack(pVideo);
        } else
        {
          camStr="Mirror-Front-Right-Asincro";
          pVideo = AsyncReflexFrontRigthNoTrack(pVideo);
        }
      } else
      {
        //modo superior derecho reflejo sincrono y asincrono
        if (modoSyncrono) {
          camStr="Mirror-Back-Right-Sincro";
          pVideo = ReflexBackRigthNoTrack(pVideo);
        } else
        {
          camStr="Mirror-Back-Right-Asincro";
          pVideo = AsyncReflexBackRigthNoTrack(pVideo);
        }
      }
    } else
    {
      if (modoFrontal)
      {
        //modo frontal izquierdo reflejo sincrono y asincrono
        if (modoSyncrono) {
          camStr="Mirror-Front-Lefth-Sincro";
          pVideo = ReflexFrontLeftNoTrack(pVideo);
        } else
        {
          camStr="Mirror-Front-Lefth-Asincro";
          pVideo = AsyncReflexFrontLeftNoTrack(pVideo);
        }
      } else
      {
        //modo superior izquierdo reflejo sincrono y asincrono
        if (modoSyncrono) {
          camStr="Mirror-Back-Lefth-Sincro";
          pVideo = ReflexBackLeftNoTrack(pVideo);
        } else
        {
          camStr="Mirror-Back-Lefth-Asincro";
          pVideo = AsyncReflexBackLeftNoTrack(pVideo);
        }
      }
    }
  } else
  {
    if (modoMirror)
    {
      if (modoFrontal)
      {
        //modo frontal mirror
        camStr="Normal-Front-Flip";
        pVideo = FrontMirrorNoTrack(pVideo);
      } else
      {
        //modo superior mirror
        camStr="Normal-Back-Flip";
        pVideo = BackMirrorNoTrack(pVideo);
      }
    } else
    {
      if (modoFrontal)
      {
        //modo frontal normal
        camStr="Normal-Front-No Flip";
        pVideo = FrontNormalNoTrack(pVideo);
      } else
      {
        //modo superior normal
        camStr="Normal-Back-No Flip";
        pVideo = BackNormalNoTrack(pVideo);
      }
    }
  }
  pVideo.updatePixels();
  return pVideo;
}
//////////////////////////////////////////////////////////
function TrackingVideo(pVideo)
{
  if (lTracking)
  {
    if (modoReflejo)
    {
      drawTrackDobleL(pVideo);
      drawTrackDobleR(pVideo);
    } else
    {
      if (modoDiestro)
      {
        drawTrackRight(pVideo);
      } else
      {
        drawTrackLeft(pVideo);
      }
    }
  }
}
//////////////////////////////
function ReflexFrontRigthNoTrack(pVideo)
{
  for (let x = 0; x < wVideo / 2; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4] = pVideoJava.pixels[(y * wVideo + x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[(y * wVideo + x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[(y * wVideo + x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[(y * wVideo + x)*4+3];
    }
  }
  for (let x = wVideo / 2; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4] =  pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] =  pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] =  pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] =  pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4+3];
    }
  }
  return pVideo;
}
////////////////////////////////
function ReflexBackRigthNoTrack(pVideo)
{
  for (let x = 0; x < wVideo/2; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo +  x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo +  x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo +  x)*4+3];
    }
  }
  for (let x = wVideo/2; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4] =  pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] =  pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] =  pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] =  pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+3];
    }
  }
  return pVideo;
}
////////////////////////////////
function ReflexBackLeftNoTrack(pVideo)
{
  for (let x = 0; x < wVideo / 2; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4]   = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+3];
    }
  }
  for (let x = wVideo / 2; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4]   = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + x)*4+3];
    }
  }
  return pVideo;
}
////////////////////////////////
function AsyncReflexFrontRigthNoTrack(pVideo)
{
  for (let x = 0; x < wVideo / 2; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4] = pVideoJava.pixels[(x + y * wVideo)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[(x + y * wVideo)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[(x + y * wVideo)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[(x + y * wVideo)*4+3];
    }
  }
  videoFrame = ImageAsincrona();
  videoFrame.loadPixels();
  for (let x = wVideo / 2; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4] =  videoFrame.pixels[(y * wVideo + wVideo - 1 - x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] =  videoFrame.pixels[(y * wVideo + wVideo - 1 - x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] =  videoFrame.pixels[(y * wVideo + wVideo - 1 - x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] =  videoFrame.pixels[(y * wVideo + wVideo - 1 - x)*4+3];
    }
  }
  return pVideo;
}
////////////////////////////////
function AsyncReflexBackRigthNoTrack(pVideo)
{
  for (let x = wVideo / 2; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4]   = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+3];
    }
  }
  videoFrame = ImageAsincrona();
  videoFrame.loadPixels();
  for (let x = 0; x < wVideo/2; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(y * wVideo + x)*4] = videoFrame.pixels[((hVideo - 1 - y) * wVideo + x)*4];
      pVideo.pixels[(y * wVideo + x)*4+1] = videoFrame.pixels[((hVideo - 1 - y) * wVideo + x)*4+1];
      pVideo.pixels[(y * wVideo + x)*4+2] = videoFrame.pixels[((hVideo - 1 - y) * wVideo + x)*4+2];
      pVideo.pixels[(y * wVideo + x)*4+3] = videoFrame.pixels[((hVideo - 1 - y) * wVideo + x)*4+3];
    }
  }
  return pVideo;
}
////////////////////////////////
function ReflexFrontLeftNoTrack(pVideo)
{
  for (let x = 0; x < wVideo / 2; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4]   = pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4+3];
    }
  }
  for (let x = wVideo / 2; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4] = pVideoJava.pixels[(x + y * wVideo)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[(x + y * wVideo)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[(x + y * wVideo)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[(x + y * wVideo)*4+3];
    }
  }
  return pVideo;
}
////////////////////////////////
function AsyncReflexFrontLeftNoTrack(pVideo)
{
  for (let x = 0; x < wVideo / 2; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4]   = videoFrame.pixels[(y * wVideo + wVideo - 1 - x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = videoFrame.pixels[(y * wVideo + wVideo - 1 - x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = videoFrame.pixels[(y * wVideo + wVideo - 1 - x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = videoFrame.pixels[(y * wVideo + wVideo - 1 - x)*4+3];
    }
  }
  videoFrame = ImageAsincrona();
  videoFrame.loadPixels();
  for (let x =  wVideo/2; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4] = pVideoJava.pixels[(x + y * wVideo)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[(x + y * wVideo)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[(x + y * wVideo)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[(x + y * wVideo)*4+3];
    }
  }
  return pVideo;
}

////////////////////////////////
function AsyncReflexBackLeftNoTrack(pVideo)
{
  for (let x = 0; x < wVideo / 2; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4]   = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+3];
    }
  }
  videoFrame = ImageAsincrona();
  videoFrame.loadPixels();
  for (let x = wVideo / 2; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(y * wVideo + x)*4] = videoFrame.pixels[((hVideo - 1 - y) * wVideo + x)*4];
      pVideo.pixels[(y * wVideo + x)*4+1] = videoFrame.pixels[((hVideo - 1 - y) * wVideo + x)*4+1];
      pVideo.pixels[(y * wVideo + x)*4+2] = videoFrame.pixels[((hVideo - 1 - y) * wVideo + x)*4+2];
      pVideo.pixels[(y * wVideo + x)*4+3] = videoFrame.pixels[((hVideo - 1 - y) * wVideo + x)*4+3];
    }
  }
  return pVideo;
}
////////////////////////////////
function FrontMirrorNoTrack(pVideo)
{
  for (let x = 0; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4]   = pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[(y * wVideo + wVideo - 1 - x)*4+3];
    }
  }
  return pVideo;
}
////////////////////////////////
function FrontNormalNoTrack(pVideo)
{
  for (let x = 0; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4] = pVideoJava.pixels[(x + y * wVideo)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[(x + y * wVideo)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[(x + y * wVideo)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[(x + y * wVideo)*4+3];
    }
  }
  return pVideo;
}
////////////////////////////////
function BackMirrorNoTrack(pVideo)
{
  for (let x = 0; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4]   = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[((hVideo - 1 - y) * wVideo + wVideo - 1 - x)*4+3];
    }
  }
  return pVideo;
}
////////////////////////////////
function BackNormalNoTrack(pVideo)
{
  for (let x = 0; x < wVideo; x++)
  {
    for (let y = 0; y < hVideo; y++)
    {
      pVideo.pixels[(x + y * wVideo)*4] = pVideoJava.pixels[(x + (hVideo - 1 - y) * wVideo)*4];
      pVideo.pixels[(x + y * wVideo)*4+1] = pVideoJava.pixels[(x + (hVideo - 1 - y) * wVideo)*4+1];
      pVideo.pixels[(x + y * wVideo)*4+2] = pVideoJava.pixels[(x + (hVideo - 1 - y) * wVideo)*4+2];
      pVideo.pixels[(x + y * wVideo)*4+3] = pVideoJava.pixels[(x + (hVideo - 1 - y) * wVideo)*4+3];
    }
  }
  return pVideo;
}
/////////////////////////////////////////////////
function ImageAsincrona()
{
  let tmp = 0;
  buffer[iWrite] = pVideoJava.get();
  if (buffer[iRead] != null)
  {
    tmp = iRead;
    //tmp = buffer[iRead];
  }
  iWrite++;
  iRead++;
  if (iRead >= nFrames-1)
  {
    iRead = 0;
  }
  if (iWrite >= nFrames-1)
  {
    iWrite = 0;
  }
  return buffer[tmp];
}
///////////////////////////////////////
