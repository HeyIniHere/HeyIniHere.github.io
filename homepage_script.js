import * as THREE from 'https://cdn.skypack.dev/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

// const cloud = document.getElementById("cloud1");
// const music = document.getElementById("bg-music");

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
const numClouds = 10; // how many clouds you want

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





//Create scene
const scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(0x223322, 0.03);
let moon;
const loader = new GLTFLoader();
loader.load('moon.glb', function (gltf) {
    moon = gltf.scene;
    scene.add(moon);
    },
    function(xhr) {},
    function(error) {
        console.error('An error happened loading the moon model:', error);
    }
);

//Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 40);
camera.position.z = 13;

//Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.pointerEvents = 'none';
// renderer.shadowMap.enabled = true;
// document.body.appendChild(renderer.domElement);
document.getElementById('container3D').appendChild(renderer.domElement);


// === Lighting ===
const ambientLight = new THREE.AmbientLight(0x88aa88, 1.3);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
sunLight.position.set(10, 20, 10);
sunLight.castShadow = true;
scene.add(sunLight);

// === Ground ===
const groundTexture = new THREE.TextureLoader().load('assets/grass-texture.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(8, 8);

const groundMat = new THREE.MeshStandardMaterial({ map: groundTexture });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), groundMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// === Tree Generator ===
function createTree(x, z) {
  const trunkHeight = 1 + Math.random() * 0.5;
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.15, trunkHeight, 8),
    new THREE.MeshStandardMaterial({ color: 0x6b4226 })
  );
  trunk.position.set(x, trunkHeight / 2, z);
  trunk.castShadow = true;

  const foliage = new THREE.Mesh(
    new THREE.SphereGeometry(0.6 + Math.random() * 0.3, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x2b5d34 })
  );
  foliage.position.set(x, trunkHeight + 0.5, z);
  foliage.castShadow = true;

  scene.add(trunk, foliage);
}

// Populate trees along path edges
for (let i = -80; i < 80; i += 6) {
  const leftX = -3 - Math.random();
  const rightX = 3 + Math.random();
  createTree(leftX, i);
  createTree(rightX, i);
}

// === Portfolio Signs (placeholder objects for now) ===
const sections = [
  { name: 'Projects', color: 0xd4a373, positionZ: -10 },
  { name: 'Resume', color: 0xb5838d, positionZ: -20 },
  { name: 'Interests', color: 0x6b705c, positionZ: -30 },
];

sections.forEach((s) => {
  const sign = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 0.1),
    new THREE.MeshStandardMaterial({ color: s.color })
  );
  sign.position.set(0, 1.5, s.positionZ);
  sign.name = s.name;
  scene.add(sign);
});

// === Walk Animation ===
let moveForward = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'w') moveForward = true;
});
document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'w') moveForward = false;
});

function animate() {
  requestAnimationFrame(animate);

  if (moveForward) camera.position.z -= 0.1;

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});