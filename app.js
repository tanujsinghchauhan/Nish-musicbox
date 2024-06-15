document.addEventListener("DOMContentLoaded", function() {
    var preloader = document.getElementById('preloader');
    // Simulate a delay for demonstration (remove in production)
    setTimeout(function() {
        preloader.style.display = 'none';
    }, 2000); // 2 seconds delay
});
document.getElementById('playPauseSVG').addEventListener('click', function() {
    this.classList.toggle('clicked');
});

//playing song
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let playPauseSVG = document.getElementById("playPauseSVG");
song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;

}
function playPause() {
    if (playPauseSVG.classList.contains("pauses")){
        song.pause();
        playPauseSVG.classList.remove("pauses");
        playPauseSVG.classList.add("plays");

    }
    else {
        song.play();
        playPauseSVG.classList.add("pauses");
        playPauseSVG.classList.remove("plays");

    }
}
 if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime ;

    },500);
 }
 progress.onchange = function(){
    song.play();
    song.currentTime = progress.value ;
    playPauseSVG.classList.add("pauses");
        playPauseSVG.classList.remove("plays");

 }

 
//uploading file
document.getElementById('uploadLink').addEventListener('click', function() {
    document.getElementById('thefile').click();
});


//changing song name on click 
const button = document.getElementsByClassName("musicselect");
const paragraph = document.getElementsByClassName("songname")[0];
//loop for all buttons
for (let btn of button ) {
btn.addEventListener('click', function(){
    const buttonText = this.textContent;
    paragraph.textContent = buttonText;
});
}

//displaying uploaded file name
const fileInput = document.getElementsByClassName("uploader")[0];
const para = document.getElementsByClassName("songname")[0];
fileInput.addEventListener('change', function(){
    if(this.files && this.files.length > 0) {
        const fileName = this.files[0].name ;
        paragraph.textContent = fileName;
    } else {
        paragraph.textContent = "Song name";
    }
});

//changing song on click
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.changeaudio');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const audio = this.querySelector('audio');
            const source = audio.querySelector('source').src;
            const mainAudio = document.getElementById('song');
            const mainAudioSource = mainAudio.querySelector('source');

            mainAudioSource.src = source;
            mainAudio.load();
            mainAudio.play();
        });
    });
});

//adding audio from outside source
const audioInput = document.querySelector('.uploader');
        const audioPlayer = document.querySelector('.audioPlayer');
        const audioSource = audioPlayer.querySelector('.audioSource');

        audioInput.addEventListener('change', function(event) {
            const files = event.target.files;
            if (files.length > 0) {
                const fileURL = URL.createObjectURL(files[0]);
                audioSource.src = fileURL;
                audioPlayer.load();
                audioPlayer.play();
            }
    });



//visualiser
// Audio visualizer code
const visualizer = document.getElementById('waveform-line');
const canvas = document.createElement('canvas');
const canvasCtx = canvas.getContext('2d');
visualizer.appendChild(canvas);

function resizeCanvas() {
    canvas.width = visualizer.clientWidth;
    canvas.height = visualizer.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

const source = audioCtx.createMediaElementSource(song); // Assuming 'song' is defined elsewhere in your app.js
source.connect(analyser);
analyser.connect(audioCtx.destination);

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(255, 255, 255)'; // Blue color

    canvasCtx.beginPath();

    const sliceWidth = canvas.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
}

song.onplay = () => {
    console.log('Audio is playing');
    if (audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => {
            console.log('Audio context resumed');
            draw();
        });
    } else {
        draw();
    }
};

document.body.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => {
            console.log('Audio context resumed on click');
        });
    }
});


