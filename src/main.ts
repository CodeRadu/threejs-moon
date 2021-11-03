import "./style.css";
import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new three.Scene();

const camera = new three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new three.WebGLRenderer({
  canvas: document.querySelector("#bg") as Element,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const ambientLight = new three.AmbientLight(0xffffff);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new three.SphereGeometry(0.25, 24, 24);
  const material = new three.MeshStandardMaterial({ color: 0xffffff });
  const star = new three.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill(0)
    .map(() => three.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(100).fill(0).forEach(addStar);

const spaceTexture = new three.TextureLoader().load("dist/assets/space.jpg");
scene.background = spaceTexture;

const moonTexture = new three.TextureLoader().load("dist/assets/moon.jpg");

const moon = new three.Mesh(
  new three.SphereGeometry(10, 32, 32),
  new three.MeshStandardMaterial({
    map: moonTexture,
  })
);

scene.add(moon);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
