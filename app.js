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

