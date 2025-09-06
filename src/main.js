import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// Get container
const container = document.getElementById('three-container');

// Create Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Add a rotating torus
const geometry = new THREE.TorusGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x3f7cac, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(-3.6, -1.2, 0);
torus.scale.set(1.5, 1.5, 1.5);
scene.add(torus);

//Add A read Cube
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xbf4624, wireframe: true });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(5.9, 1.2, 0);
scene.add(cube);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Animation loop
function animate() { 
    requestAnimationFrame(animate);
    torus.rotation.x += 0.001;
    torus.rotation.y += 0.0015;
    torus.rotation.z += 0.0019;

    rotateCube();
    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function rotateCube(){
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.001;
    cube.rotation.z += 0.001;
}