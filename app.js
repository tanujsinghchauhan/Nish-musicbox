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

