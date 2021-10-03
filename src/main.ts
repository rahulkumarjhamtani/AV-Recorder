import './style.css'

var audiostream: MediaStream = new MediaStream();

async function getAudioStream() {
  return await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
}

var audiostream = await getAudioStream();

// get audio element by id audiorunner
var audio: HTMLAudioElement = document.getElementById('audiorunner') as HTMLAudioElement


// get button start by id start
var start: HTMLButtonElement = document.getElementById('start') as HTMLButtonElement
// get button stop by id stop 
var stop: HTMLButtonElement = document.getElementById('stop') as HTMLButtonElement
// get button to download by id download
var download: HTMLButtonElement = document.getElementById('download') as HTMLButtonElement



var recorder = new MediaRecorder(audiostream)



async function recordAudio() {
  recorder.start();
  console.log('recording...')
}

async function stopAudio() {
  recorder.stop();
  console.log('stop recording...')
  var blob : any;
  recorder.ondataavailable = (e) => {
    blob = e.data;
    audio.src = URL.createObjectURL(e.data);
    audio.play();
  }


  download.addEventListener("click", function () {
    if (blob == null) {
      return;
    }

    var url = URL.createObjectURL(blob);

    var a :  HTMLAnchorElement = document.createElement("a") as HTMLAnchorElement;
    document.body.appendChild(a);
    // a.style = "display: none";
    a.href = url;
    a.download = "sample.wav";
    a.click();
    window.URL.revokeObjectURL(url);
  });

}

start.onclick = async () => {
      await recordAudio();
    }

stop.onclick = async () => {
      var url = await stopAudio();
      // var audio = new Audio(url);
      // audio.play();
    }












