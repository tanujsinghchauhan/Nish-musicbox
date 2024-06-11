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
