const root = document.documentElement;
const matrixCanvas = document.getElementById("matrixCanvas");
const symbolCanvas = document.getElementById("symbolCanvas");
const staticCanvas = document.getElementById("staticCanvas");
const matrixCtx = matrixCanvas.getContext("2d");
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
let matrixColumns = [];
let matrixFrame = 0;

const symbolCount = 230;
const symbolList = window.LUXDOT_SYMBOLS || ["LuxDot", "Signal", "Noise", "Light"];
const matrixValues = window.LUXDOT_MATRIX_VALUES || [
  "0", "1", "01", "10", "101", "404", "777", "999", "666",
  "π", "3.14159", "φ", "1.61803", "e", "2.71828",
  "c", "299792458", "G", "6.67430e-11", "h", "6.62607015e-34",
  "ℏ", "1.054571817e-34", "kB", "1.380649e-23",
  "NA", "6.02214076e23", "R", "8.314462618", "α", "1/137",
  "ε0", "8.854e-12", "μ0", "4π×10⁻⁷", "Λ", "Ω", "Δ", "Σ"
];

const claritySymbols = new Set([
  "π", "φ", "E=mc²", "DNA", "Logos", "Signal", "Truth", "نور", "وعي", "Δ", "AI",
  "Clarity", "Precision", "Meaning", "Understanding", "LuxDotation", "Reduce noise", "Increase signal"
]);

function getLuxdotationPhase() {
  const cycle = 18;
  const t = (performance.now() * 0.001) % cycle;

  if (t < 4) {
    return { name: "noise", noise: 1, discovery: 0.25, clarity: 0, matrix: 1 };
  }

  if (t < 10) {
    const k = (t - 4) / 6;
    return { name: "discovery", noise: 1 - k * 0.65, discovery: 1, clarity: k * 0.35, matrix: 0.75 - k * 0.35 };
  }

  if (t < 14) {
    return { name: "clarity", noise: 0.12, discovery: 0.45, clarity: 1, matrix: 0.22 };
  }

  const k = (t - 14) / 4;
  return { name: "return", noise: 0.12 + k * 0.88, discovery: 0.65 - k * 0.4, clarity: 1 - k, matrix: 0.22 + k * 0.78 };
}

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);

  for (const canvas of [matrixCanvas, symbolCanvas, staticCanvas]) {
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  }

  matrixCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  symbolCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  staticCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  createSymbols();
  createMatrixRain();
}

function randomSymbol() {
  return symbolList[Math.floor(Math.random() * symbolList.length)];
}

function randomMatrixValue() {
  return matrixValues[Math.floor(Math.random() * matrixValues.length)];
}

function createMatrixRain() {
  matrixColumns = [];
  const columnWidth = 24;
  const count = Math.ceil(width / columnWidth);

  for (let i = 0; i < count; i++) {
    matrixColumns.push({
      x: i * columnWidth + Math.random() * 10,
      y: Math.random() * -height,
      speed: 0.6 + Math.random() * 2.3,
      length: 6 + Math.floor(Math.random() * 18),
      size: 10 + Math.random() * 7,
      gap: 18 + Math.random() * 10,
      glow: 0.35 + Math.random() * 0.65
    });
  }
}

function drawMatrixRain(finalEnergy, luxPhase) {
  matrixFrame++;

  matrixCtx.fillStyle = `rgba(0, 0, 0, ${0.18 - finalEnergy * 0.05})`;
  matrixCtx.fillRect(0, 0, width, height);

  for (const column of matrixColumns) {
    column.y += column.speed * (0.45 + finalEnergy * 2.2 + luxPhase.matrix * 1.4);

    if (column.y - column.length * column.gap > height + 80) {
      column.y = -Math.random() * height * 0.7;
      column.speed = 0.6 + Math.random() * 2.3;
      column.length = 6 + Math.floor(Math.random() * 18);
      column.size = 10 + Math.random() * 7;
    }

    for (let i = 0; i < column.length; i++) {
      const y = column.y - i * column.gap;
      if (y < -30 || y > height + 30) continue;

      const alpha = Math.max(0, 1 - i / column.length) * (0.08 + finalEnergy * 0.48 + luxPhase.matrix * 0.44) * column.glow;
      const value = randomMatrixValue();

      matrixCtx.save();
      matrixCtx.font = `${column.size}px monospace`;
      matrixCtx.textAlign = "center";
      matrixCtx.textBaseline = "middle";

      if (i === 0) {
        matrixCtx.fillStyle = `rgba(210,255,210,${Math.min(1, alpha + 0.45)})`;
        matrixCtx.shadowColor = "rgba(120,255,120,0.95)";
        matrixCtx.shadowBlur = 18;
      } else {
        matrixCtx.fillStyle = `rgba(0,255,95,${alpha})`;
        matrixCtx.shadowColor = "rgba(0,255,95,0.75)";
        matrixCtx.shadowBlur = 8;
      }

      matrixCtx.fillText(value, column.x, y);
      matrixCtx.restore();
    }
  }
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

function drawSymbols(finalEnergy, luxPhase) {
  symbolCtx.clearRect(0, 0, width, height);

  const revealRadius = 150 + luxPhase.discovery * 190 + finalEnergy * 100;
  const clarityRadius = Math.max(width, height) * 0.55;
  const time = performance.now() * 0.001;

  for (const symbol of symbols) {
    symbol.x += symbol.driftX * symbol.depth * (0.4 + luxPhase.noise * 1.5);
    symbol.y += symbol.driftY * symbol.depth * (0.4 + luxPhase.noise * 1.5);

    if (symbol.x < -120) symbol.x = width + 120;
    if (symbol.x > width + 120) symbol.x = -120;
    if (symbol.y < -80) symbol.y = height + 80;
    if (symbol.y > height + 80) symbol.y = -80;

    const parallaxX = (mouseX - width / 2) * 0.012 * symbol.depth;
    const parallaxY = (mouseY - height / 2) * 0.012 * symbol.depth;

    const x = symbol.x + parallaxX + Math.sin(time + symbol.phase) * (1.2 + luxPhase.noise * 2.8);
    const y = symbol.y + parallaxY + Math.cos(time * 0.8 + symbol.phase) * (1.2 + luxPhase.noise * 2.8);

    const dx = x - dotX;
    const dy = y - dotY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const isClaritySymbol = claritySymbols.has(symbol.text);
    let strength = 0;

    if (distance < revealRadius) {
      strength = Math.max(strength, 1 - distance / revealRadius);
    }

    if (luxPhase.clarity > 0.05 && isClaritySymbol) {
      const cx = x - width / 2;
      const cy = y - height / 2;
      const centerDistance = Math.sqrt(cx * cx + cy * cy);
      const centerStrength = Math.max(0, 1 - centerDistance / clarityRadius);
      strength = Math.max(strength, centerStrength * luxPhase.clarity * 1.15);
    }

    if (luxPhase.name === "clarity" && !isClaritySymbol) {
      strength *= 0.12;
    }

    if (strength <= 0.01) continue;

    const alpha = Math.min(1, strength * 1.35) * symbol.opacity * (0.42 + luxPhase.discovery * 0.38 + luxPhase.clarity * 0.45);
    const glow = 8 + strength * 52 + luxPhase.clarity * 16;
    const blurShake = luxPhase.noise * finalEnergy * 2.5;

    symbolCtx.save();
    symbolCtx.translate(x + (Math.random() - 0.5) * blurShake, y + (Math.random() - 0.5) * blurShake);
    symbolCtx.rotate(symbol.rotation + Math.sin(time + symbol.phase) * 0.03);
    symbolCtx.font = `${symbol.size * (isClaritySymbol ? 1.12 : 1)}px Arial, Helvetica, sans-serif`;
    symbolCtx.textAlign = "center";
    symbolCtx.textBaseline = "middle";
    symbolCtx.fillStyle = `rgba(255,255,255,${alpha})`;
    symbolCtx.shadowColor = `rgba(255,255,255,${alpha})`;
    symbolCtx.shadowBlur = glow;
    symbolCtx.fillText(symbol.text, 0, 0);
    symbolCtx.restore();
  }
}

function drawStatic(finalEnergy, luxPhase) {
  staticCtx.clearRect(0, 0, width, height);

  if (finalEnergy < 0.01) return;

  const alpha = (finalEnergy * 0.28 + luxPhase.noise * 0.22);
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

  staticCtx.globalAlpha = finalEnergy * 0.14 + luxPhase.noise * 0.10;
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

  const luxPhase = getLuxdotationPhase();
  const finalEnergy = Math.min(1, energy + longMovement * 0.55 + luxPhase.noise * 0.12);
  const shake = finalEnergy * 22 * (0.55 + luxPhase.noise * 0.75);

  root.style.setProperty("--energy", finalEnergy);
  root.style.setProperty("--shake-x", `${(Math.random() - 0.5) * shake}px`);
  root.style.setProperty("--shake-y", `${(Math.random() - 0.5) * shake}px`);

  moveDot(finalEnergy);
  drawMatrixRain(finalEnergy, luxPhase);
  drawSymbols(finalEnergy, luxPhase);
  drawStatic(finalEnergy, luxPhase);

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

let clickTimes = [];
let breathCooldown = false;
let whisperCooldown = false;

function awakenAudio() {
  if (window.luxdotAudio) {
    window.luxdotAudio.start();
  }
}

function registerClickPattern() {
  awakenAudio();

  const now = Date.now();
  clickTimes = clickTimes.filter((time) => now - time < 650);
  clickTimes.push(now);

  if (clickTimes.length >= 3 && !whisperCooldown) {
    whisperCooldown = true;
    clickTimes = [];
    window.luxdotAudio?.playWhisperWord();
    setTimeout(() => { whisperCooldown = false; }, 2400);
    return;
  }

  if (clickTimes.length === 2 && !breathCooldown) {
    breathCooldown = true;
    window.luxdotAudio?.playBreath();
    setTimeout(() => { breathCooldown = false; }, 900);
  }
}

document.body.addEventListener("click", registerClickPattern);
document.body.addEventListener("touchstart", awakenAudio);
window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();
