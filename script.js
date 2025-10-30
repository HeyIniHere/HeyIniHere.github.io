const orb = document.getElementById('enter-orb');
const overlay = document.getElementById('fade-overlay');
const music = document.getElementById('bg-music');

// Play ambient music 
window.addEventListener('load', function() {
  setTimeout(() => {
    music.volume = 20;
    // music.play().catch(() => {
    //   console.log("Autoplay blocked until user interacts.");
    // });
  }, 1500);
});


orb.addEventListener('click', function() {
  if (music.paused) {
    music.volume = 0.8; 
    music.play().catch(err => console.log('Playback error:', err));
  }
  overlay.style.opacity = 1;
  setTimeout(() => {
    window.location.href = 'homepage.html'; 
  }, 1200);
});


