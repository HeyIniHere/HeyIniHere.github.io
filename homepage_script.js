document.addEventListener("DOMContentLoaded", () => {
  const cloud = document.getElementById("cloud1");
  const music = document.getElementById("bg-music")

cloud.addEventListener("click", function () {
if (music.paused) {
    music.volume = 0.8;
    cloud.querySelector("p").textContent = "Pause Music";
    music.play().catch(err => console.log('Playback error:', err));
} else {
    music.pause(); // Optional: toggles play/pause
    cloud.querySelector("p").textContent = "Play Music";
} });
});

const cloudContainer = document.getElementById("clouds");
const numClouds = 30; 

for (let i = 0; i < numClouds; i++) {
  const cloud = document.createElement("div");
  cloud.classList.add("cloud");

  // Random position and size
  const size = Math.random() * 120 + 80; // 80–200px
  cloud.style.width = `${size}px`;
  cloud.style.height = `${size * 0.6}px`;
  cloud.style.top = `${Math.random() * 80}%`;
  cloud.style.left = `${Math.random() * 90}%`;
  cloud.style.opacity = 0.4 + Math.random() * 0.3;

  // Random animation timing so they don’t sync
  cloud.style.animationDuration = `${8 + Math.random() * 6}s`;
  cloud.style.animationDelay = `${Math.random() * 5}s`;

  cloudContainer.appendChild(cloud);
}

let xp = 0;            // starting XP
const xpFill = document.getElementById('xp-fill');
const xpCount = document.getElementById('xp-count');
const maxXP = 100;      // XP for level up

function gainXP(amount) {
  xp += amount;
  if (xp > maxXP) xp = maxXP;
  const percent = (xp / maxXP) * 100;
  xpFill.style.width = percent + '%';
  xpCount.textContent = `XP: ${xp}`;
}

// Example usage: gain 10 XP every 3 seconds
setInterval(() => gainXP(10), 3000);
