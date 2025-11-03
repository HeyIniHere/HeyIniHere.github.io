// const orb = document.getElementById('enter-orb');
// const overlay = document.getElementById('fade-overlay');
// const music = document.getElementById('bg-music');

// Play ambient music 
window.addEventListener('load', function() {
  setTimeout(() => {
    music.volume = 0.8;
    music.play().catch(() => {
      console.log("Autoplay blocked until user interacts.");
    });
  }, 1500);
});


// orb.addEventListener('click', function() {
//   if (music.paused) {
//     music.volume = 0.8; 
//     music.play().catch(err => console.log('Playback error:', err));
//   }
//   overlay.style.opacity = 1;
//   setTimeout(() => {
//     window.location.href = 'homepage.html'; 
//   }, 1200);
// });



  const orb = document.getElementById("enter-orb");
  const overlay = document.getElementById("fade-overlay");
  const music = document.getElementById("bg-music");

  orb.addEventListener("click", () => {
    music.play();
    overlay.classList.add("fade-out"); // Optional fade effect
    setTimeout(() => {
      window.location.href = "homepage.html"; // Redirect to homepage
    }, 1500); // Matches fade duration
  });

  // Bird Animation
const birdsContainer = document.getElementById('birds-container');
const numberOfBirds = 10; // number of birds

for (let i = 0; i < numberOfBirds; i++) {
  const bird = document.createElement('div');
  bird.classList.add('bird');

  // Random vertical position
  const y = Math.random() * window.innerHeight * 0.6 + 'px';
  bird.style.setProperty('--y', y);

  // Random tilt rotation
  const rotate = (Math.random() * 20 - 10) + 'deg';
  bird.style.setProperty('--rotate', rotate);

  // Random fly duration
  const duration = (6 + Math.random() * 6) + 's';
  bird.style.animationDuration = `${duration}, 0.6s`; // first = fly, second = flap

  // Random delay
  const delay = Math.random() * 5 + 's';
  bird.style.animationDelay = `${delay}, ${delay}`; // sync fly + flap

  birdsContainer.appendChild(bird);
}






