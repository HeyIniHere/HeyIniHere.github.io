// Play ambient music
window.addEventListener('load', function() {
  setTimeout(function() {
    music.volume = 1.0;
    music.play().catch(function() {
      console.log("Autoplay blocked until user interacts.");
    });
  }, 1500);
});

const orb = document.getElementById("enter-orb");
const overlay = document.getElementById("fade-overlay");
const music = document.getElementById("bg-music");

// Handle orb click to play music and redirect
orb.addEventListener("click", function() {
  music.play();
  overlay.classList.add("fade-out");
  setTimeout(function() {
    window.location.href = "homepage.html";
  }, 1500);
});

// Handle contact icon clicks
document.addEventListener("DOMContentLoaded", function() {
  const contactIcons = document.querySelectorAll(".contact-icon");

  contactIcons.forEach(function(icon) {
    icon.addEventListener("click", function() {
      const link = icon.dataset.link;
      if (link.startsWith("mailto:")) {
        window.location.href = link;
      } else {
        window.open(link, "_blank");
      }
    });
  });
});

// Bird Animation
const birdsContainer = document.getElementById('birds-container');
const numberOfBirds = 10;

for (let i = 0; i < numberOfBirds; i++) {
  const bird = document.createElement('div');
  bird.classList.add('bird');

  const y = Math.random() * window.innerHeight * 0.6 + 'px';
  bird.style.setProperty('--y', y);

  const rotate = (Math.random() * 20 - 10) + 'deg';
  bird.style.setProperty('--rotate', rotate);

  const duration = (6 + Math.random() * 6) + 's';
  bird.style.animationDuration = `${duration}, 0.6s`;

  const delay = Math.random() * 5 + 's';
  bird.style.animationDelay = `${delay}, ${delay}`;

  birdsContainer.appendChild(bird);
}
