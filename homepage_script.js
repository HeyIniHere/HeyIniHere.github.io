// Handle cloud1 click to toggle music
document.addEventListener("DOMContentLoaded", function() {
  const cloud = document.getElementById("cloud1");
  const music = document.getElementById("bg-music");

  cloud.addEventListener("click", function() {
    if (music.paused) {
      music.volume = 0.8;
      cloud.querySelector("p").textContent = "Pause Music";
      music.play().catch(function(err) {
        console.log('Playback error:', err);
      });
    } else {
      music.pause();
      cloud.querySelector("p").textContent = "Play Music";
    }
  });
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

// Lantern XP and fact system
document.addEventListener("DOMContentLoaded", function() {
  const cloud2 = document.getElementById("cloud2");
  const lanternsContainer = document.getElementById('lanterns-container');
  const xpFill = document.getElementById('xp-fill');
  const xpCount = document.getElementById('xp-count');

  let xp = 0;
  let lanternInterval;
  let factIndex = 0;

  const facts = [
    "I love web dev and web design (Check out my Figma 🎨)",
    "I am Nigerian and I speak Ibibio",
    "I play the lever harp 🎵",
    "I have a degree in computer science and mechanical engineering💡",
    "I enjoy about African literature 📚",
    "My preferred programming language is Python 🐍",
    "I have experience with CAD and 3D modeling withs Solidworks ️🛠",
    "I've worked in both finance and tech 💼💻",
    "I care deeply about DEI and community outreach 🤝",
    "I love film photography 📸"
  ];

  // Instruction text
  const instructionText = document.createElement('div');
  instructionText.id = 'instruction-text';
  instructionText.textContent = "Click on the lanterns to gain XP and learn facts about me!";
  document.body.appendChild(instructionText);

  function updateXP() {
    const maxXP = 100;
    if (xp >= maxXP) {
      xp = 0;
      xpFill.style.width = '0%';
      xpCount.textContent = `XP: ${xp}`;
      if (lanternInterval) {
        clearInterval(lanternInterval);
        lanternInterval = null;
      }
      alert("Congratulations! You've reached 100 XP and learned all about me!");
      return;
    }
    const widthPercent = (xp / maxXP) * 100;
    xpFill.style.width = widthPercent + '%';
    xpCount.textContent = `XP: ${xp}`;
  }

  function showFactAboveLantern(lantern) {
    if (factIndex >= facts.length) factIndex = 0;

    const factBox = document.createElement('div');
    factBox.classList.add('fact-box');
    factBox.textContent = facts[factIndex];
    factIndex++;

    const rect = lantern.getBoundingClientRect();
    factBox.style.left = `${rect.left + rect.width / 2}px`;
    factBox.style.top = `${rect.top - 50}px`;

    document.body.appendChild(factBox);

    setTimeout(function() {
      factBox.classList.add('fade-out');
      setTimeout(function() { factBox.remove(); }, 1000);
    }, 2500);
  }

  function spawnLantern() {
    const lantern = document.createElement('div');
    lantern.classList.add('lantern');

    const homeSection = document.getElementById('home');
    const homeRect = homeSection.getBoundingClientRect();
    lantern.style.left = Math.random() * (homeRect.width - 60) + 'px';
    lantern.style.top = Math.random() * (homeRect.height - 80) + 'px';

    lantern.addEventListener('click', function() {
      lantern.classList.add('lantern-float');
      xp += 10;
      updateXP();
      showFactAboveLantern(lantern);
      setTimeout(function() { lantern.remove(); }, 2000);
    });

    lanternsContainer.appendChild(lantern);
  }

  cloud2.addEventListener('click', function() {
    instructionText.classList.add('visible');
    setTimeout(function() { instructionText.classList.remove('visible'); }, 2000);

    for (let i = 0; i < 3; i++) spawnLantern();
    if (!lanternInterval) {
      lanternInterval = setInterval(spawnLantern, 2000);
    }
  });
});
