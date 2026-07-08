class LuxdotAudioEngine {
  constructor() {
    this.started = false;
    this.context = null;
    this.masterGain = null;
    this.heartbeatGain = null;
    this.staticGain = null;
    this.staticFilterA = null;
    this.staticFilterB = null;
    this.staticSource = null;
    this.heartbeatTimer = null;
    this.currentHeartbeatInterval = 950;
  }

  start() {
    if (this.started) return;

    this.context = new AudioContext();

    this.masterGain = this.context.createGain();
    this.masterGain.gain.value = 0.55;
    this.masterGain.connect(this.context.destination);

    this.setupStaticNoise();
    this.setupHeartbeat();

    this.started = true;
    this.scheduleHeartbeat();
  }

  setupStaticNoise() {
    const bufferSize = this.context.sampleRate * 2;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    this.staticSource = this.context.createBufferSource();
    this.staticSource.buffer = buffer;
    this.staticSource.loop = true;

    this.staticFilterA = this.context.createBiquadFilter();
    this.staticFilterA.type = "highpass";
    this.staticFilterA.frequency.value = 650;

    this.staticFilterB = this.context.createBiquadFilter();
    this.staticFilterB.type = "bandpass";
    this.staticFilterB.frequency.value = 2600;
    this.staticFilterB.Q.value = 1.1;

    this.staticGain = this.context.createGain();
    this.staticGain.gain.value = 0;

    this.staticSource.connect(this.staticFilterA);
    this.staticFilterA.connect(this.staticFilterB);
    this.staticFilterB.connect(this.staticGain);
    this.staticGain.connect(this.masterGain);

    this.staticSource.start();
  }

  setupHeartbeat() {
    this.heartbeatGain = this.context.createGain();
    this.heartbeatGain.gain.value = 0.35;
    this.heartbeatGain.connect(this.masterGain);
  }

  playHeartbeat() {
    if (!this.started) return;

    const now = this.context.currentTime;
    this.playThump(now, 78, 0.98, 0.25);
    this.playThump(now + 0.16, 58, 0.72, 0.23);
  }

  playThump(time, frequency, strength, duration) {
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, time);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.48, time + duration);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(170, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(strength, time + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.heartbeatGain);

    osc.start(time);
    osc.stop(time + duration + 0.02);
  }

  scheduleHeartbeat() {
    if (!this.started) return;

    this.playHeartbeat();
    this.heartbeatTimer = setTimeout(() => this.scheduleHeartbeat(), this.currentHeartbeatInterval);
  }

  update(energy) {
    if (!this.started) return;

    const e = Math.max(0, Math.min(1, energy));

    this.currentHeartbeatInterval = 1080 - e * 650;

    const heartbeatVolume = 0.34 + e * 0.36;
    const staticVolume = e * 0.34;
    const masterVolume = 0.58;

    this.heartbeatGain.gain.value += (heartbeatVolume - this.heartbeatGain.gain.value) * 0.05;
    this.staticGain.gain.value += (staticVolume - this.staticGain.gain.value) * 0.06;
    this.masterGain.gain.value += (masterVolume - this.masterGain.gain.value) * 0.04;

    this.staticFilterA.frequency.value = 520 + e * 1500;
    this.staticFilterB.frequency.value = 1600 + Math.random() * 4600;
    this.staticFilterB.Q.value = 0.55 + e * 2.6;
  }
}

window.luxdotAudio = new LuxdotAudioEngine();
