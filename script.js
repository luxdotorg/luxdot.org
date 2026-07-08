const root = document.documentElement;
const symbolCanvas = document.getElementById("symbolCanvas");
const staticCanvas = document.getElementById("staticCanvas");
const symbolCtx = symbolCanvas.getContext("2d");
const staticCtx = staticCanvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
let dpr = Math.min(window.devicePixelRatio || 1, 2);

let mouseX = width / 2;
let mouseY = height / 2;
let lastX = mouseX;
let lastY = mouseY;

let dotX = mouseX + 120;
let dotY = mouseY - 80;

let energy = 0;
let longMovement = 0;
let symbols = [];

const symbolCount = 230;
const symbolList = window.LUXDOT_SYMBOLS || ["LuxDot", "Signal", "Noise", "Light"];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);

  for (const canvas of [symbolCanvas, staticCanvas]) {
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  }

  symbolCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  staticCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  createSymbols();
}

function randomSymbol() {
  return symbolList[Math.floor(Math.random() * symbolList.length)];
}

function createSymbols() {
  symbols = [];

  for (let i = 0; i < symbolCount; i++) {
    const depth = 0.45 + Math.random() * 1.15;

    symbols.push({
      text: randomSymbol(),
      x: Math.random() * width,
      y: Math.random() * height,
      size: 7 + Math.random() * 13,
      depth,
      driftX: (Math.random() - 0.5) * 0.18,
      driftY: (Math.random() - 0.5) * 0.18,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.35 + Math.random() * 0.65,
      rotation: (Math.random() - 0.5) * 0.25
    });
  }
}

function drawSymbols(finalEnergy) {
  symbolCtx.clearRect(0, 0, width, height);

  const revealRadius = 190 + finalEnergy * 120;
  const time = performance.now() * 0.001;

  for (const symbol of symbols) {
    symbol.x += symbol.driftX * symbol.depth;
    symbol.y += symbol.driftY * symbol.depth;

    if (symbol.x < -120) symbol.x = width + 120;
    if (symbol.x > width + 120) symbol.x = -120;
    if (symbol.y < -80) symbol.y = height + 80;
    if (symbol.y > height + 80) symbol.y = -80;

    const parallaxX = (mouseX - width / 2) * 0.012 * symbol.depth;
    const parallaxY = (mouseY - height / 2) * 0.012 * symbol.depth;

    const x = symbol.x + parallaxX + Math.sin(time + symbol.phase) * 1.8;
    const y = symbol.y + parallaxY + Math.cos(time * 0.8 + symbol.phase) * 1.8;

    const dx = x - dotX;
    const dy = y - dotY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > revealRadius) continue;

    const strength = 1 - distance / revealRadius;
    const alpha = Math.min(1, strength * 1.35) * symbol.opacity;
    const glow = 10 + strength * 46;

    symbolCtx.save();
    symbolCtx.translate(x, y);
    symbolCtx.rotate(symbol.rotation + Math.sin(time + symbol.phase) * 0.03);
    symbolCtx.font = `${symbol.size}px Arial, Helvetica, sans-serif`;
    symbolCtx.textAlign = "center";
    symbolCtx.textBaseline = "middle";
    symbolCtx.fillStyle = `rgba(255,255,255,${alpha})`;
    symbolCtx.shadowColor = `rgba(255,255,255,${alpha})`;
    symbolCtx.shadowBlur = glow;
    symbolCtx.fillText(symbol.text, 0, 0);
    symbolCtx.restore();
  }
}

function drawStatic(finalEnergy) {
  staticCtx.clearRect(0, 0, width, height);

  if (finalEnergy < 0.01) return;

  const alpha = finalEnergy * 0.42;
  const blockSize = 3;
  const rows = Math.ceil(height / blockSize);
  const cols = Math.ceil(width / blockSize);

  staticCtx.globalAlpha = alpha;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (Math.random() > 0.86) {
        const v = 170 + Math.random() * 85;
        staticCtx.fillStyle = `rgb(${v},${v},${v})`;
        staticCtx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }

  staticCtx.globalAlpha = finalEnergy * 0.22;
  staticCtx.fillStyle = "white";

  for (let i = 0; i < 12; i++) {
    const y = Math.random() * height;
    const h = 1 + Math.random() * 3;
    staticCtx.fillRect(0, y, width, h);
  }

  staticCtx.globalAlpha = 1;
}

function moveDot(finalEnergy) {
  const orbitX = Math.cos(Date.now() * 0.0014) * 85;
  const orbitY = Math.sin(Date.now() * 0.0019) * 55;
  const chaosX = (Math.random() - 0.5) * finalEnergy * 180;
  const chaosY = (Math.random() - 0.5) * finalEnergy * 180;

  dotX += (mouseX + orbitX + chaosX - dotX) * 0.024;
  dotY += (mouseY + orbitY + chaosY - dotY) * 0.024;

  dotX = Math.max(12, Math.min(width - 12, dotX));
  dotY = Math.max(12, Math.min(height - 12, dotY));

  root.style.setProperty("--dot-x", `${dotX}px`);
  root.style.setProperty("--dot-y", `${dotY}px`);
}

function animate() {
  energy *= 0.945;
  longMovement *= 0.985;

  const finalEnergy = Math.min(1, energy + longMovement * 0.55);
  const shake = finalEnergy * 22;

  root.style.setProperty("--energy", finalEnergy);
  root.style.setProperty("--shake-x", `${(Math.random() - 0.5) * shake}px`);
  root.style.setProperty("--shake-y", `${(Math.random() - 0.5) * shake}px`);

  moveDot(finalEnergy);
  drawSymbols(finalEnergy);
  drawStatic(finalEnergy);

  if (window.luxdotAudio) {
    window.luxdotAudio.update(finalEnergy);
  }

  requestAnimationFrame(animate);
}

document.addEventListener("mousemove", (event) => {
  const dx = event.clientX - lastX;
  const dy = event.clientY - lastY;
  const speed = Math.sqrt(dx * dx + dy * dy);

  mouseX = event.clientX;
  mouseY = event.clientY;

  energy = Math.min(1, energy + speed / 330);
  longMovement = Math.min(1, longMovement + speed / 1000);

  const distX = dotX - mouseX;
  const distY = dotY - mouseY;
  const dist = Math.sqrt(distX * distX + distY * distY);

  if (dist < 150) {
    const angle = Math.atan2(distY, distX) + (Math.random() - 0.5) * 2.4;
    const power = 80 + Math.random() * 160;

    dotX += Math.cos(angle) * power;
    dotY += Math.sin(angle) * power;
  }

  lastX = event.clientX;
  lastY = event.clientY;
});

function awakenAudio() {
  if (window.luxdotAudio) {
    window.luxdotAudio.start();
  }
}

document.body.addEventListener("click", awakenAudio);
document.body.addEventListener("touchstart", awakenAudio);
window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();
