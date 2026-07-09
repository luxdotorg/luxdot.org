class LuxdotAudioEngine {
  constructor() {
    this.started = false;
    this.context = null;
    this.masterGain = null;
    this.heartbeatGain = null;
    this.staticGain = null;
    this.effectGain = null;
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
    this.masterGain.gain.value = 0.62;
    this.masterGain.connect(this.context.destination);

    this.effectGain = this.context.createGain();
    this.effectGain.gain.value = 0.74;
    this.effectGain.connect(this.masterGain);

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
    this.staticGain.gain.value = 0.015;

    this.staticSource.connect(this.staticFilterA);
    this.staticFilterA.connect(this.staticFilterB);
    this.staticFilterB.connect(this.staticGain);
    this.staticGain.connect(this.masterGain);

    this.staticSource.start();
  }

  setupHeartbeat() {
    this.heartbeatGain = this.context.createGain();
    this.heartbeatGain.gain.value = 0.48;
    this.heartbeatGain.connect(this.masterGain);
  }

  playHeartbeat() {
    if (!this.started) return;

    const now = this.context.currentTime;
    this.playThump(now, 82, 1.12, 0.27);
    this.playThump(now + 0.16, 58, 0.82, 0.24);
  }

  playThump(time, frequency, strength, duration) {
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, time);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.46, time + duration);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(185, time);

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

  makeNoiseBuffer(seconds = 1) {
    const bufferSize = Math.floor(this.context.sampleRate * seconds);
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    return buffer;
  }

  playBreath() {
    if (!this.started) return;

    const now = this.context.currentTime;
    this.playBreathPart(now, 0.95, 900, 0.34);
    this.playBreathPart(now + 1.02, 1.35, 540, 0.43);
  }

  playBreathPart(time, duration, filterFrequency, volume) {
    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();

    source.buffer = this.makeNoiseBuffer(duration + 0.1);
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(filterFrequency, time);
    filter.Q.value = 0.55;

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + duration * 0.22);
    gain.gain.linearRampToValueAtTime(volume * 0.75, time + duration * 0.68);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.effectGain);

    source.start(time);
    source.stop(time + duration + 0.05);
  }


  playWhisperWord() {
    if (!this.started) return;

    const whisperWords = [
      { text: "Logos", lang: "en-US" },
      { text: "LuxDot", lang: "en-US" },
      { text: "Luxdotation", lang: "en-US" },
      { text: "Signal", lang: "en-US" },
      { text: "Clarity", lang: "en-US" },
      { text: "Precision", lang: "en-US" },
      { text: "Meaning", lang: "en-US" },
      { text: "Understanding", lang: "en-US" },
      { text: "Noise", lang: "en-US" },
      { text: "Light", lang: "en-US" },
      { text: "Point", lang: "en-US" },
      { text: "Truth", lang: "en-US" },
      { text: "Awareness", lang: "en-US" },
      { text: "Mind", lang: "en-US" },
      { text: "Observer", lang: "en-US" },
      { text: "Ketamine", lang: "en-US" },

      { text: "λόγος", lang: "el-GR" },
      { text: "ἀλήθεια", lang: "el-GR" },
      { text: "γνῶθι σεαυτόν", lang: "el-GR" },

      { text: "نور", lang: "ar" },
      { text: "وعي", lang: "ar" },
      { text: "معنى", lang: "ar" },
      { text: "نقطة", lang: "ar" },
      { text: "إشارة", lang: "ar" },
      { text: "صفاء", lang: "ar" },
      { text: "دقة", lang: "ar" },
      { text: "بصيرة", lang: "ar" },

      { text: "אור", lang: "he-IL" },
      { text: "דעת", lang: "he-IL" },
      { text: "חכמה", lang: "he-IL" },
      { text: "אמת", lang: "he-IL" },
      { text: "נקודה", lang: "he-IL" },

      { text: "Veritas", lang: "la" },
      { text: "Lux", lang: "la" },
      { text: "Ratio", lang: "la" },
      { text: "Scientia", lang: "la" }
    ];

    const selected = whisperWords[Math.floor(Math.random() * whisperWords.length)];
    const now = this.context.currentTime;

    // Longer air layer for a slower, deeper whisper than the old Logos whisper.
    this.playWhisperAir(now, 1.75, 0.42);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const voice = new SpeechSynthesisUtterance(selected.text);
      voice.lang = selected.lang;
      voice.volume = 0.44;
      voice.rate = 0.38;
      voice.pitch = 0.18;

      setTimeout(() => window.speechSynthesis.speak(voice), 140);
    } else {
      this.playLogosToneFallback(now + 0.12);
    }
  }

  playWhisperLogos() {
    // Kept for compatibility with older script.js versions.
    this.playWhisperWord();
  }

  playWhisperAir(time, duration, volume) {
    const source = this.context.createBufferSource();
    const highpass = this.context.createBiquadFilter();
    const bandpass = this.context.createBiquadFilter();
    const gain = this.context.createGain();

    source.buffer = this.makeNoiseBuffer(duration + 0.2);

    highpass.type = "highpass";
    highpass.frequency.setValueAtTime(1200, time);

    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(3100, time);
    bandpass.Q.value = 0.8;

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.18);
    gain.gain.linearRampToValueAtTime(volume * 0.72, time + duration * 0.65);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    source.connect(highpass);
    highpass.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(this.effectGain);

    source.start(time);
    source.stop(time + duration + 0.05);
  }

  playLogosToneFallback(time) {
    this.playCryTone(time, 180, 0.42, 0.18);
    this.playCryTone(time + 0.34, 140, 0.58, 0.15);
  }

  playMutedChildCry() {
    if (!this.started) return;

    const now = this.context.currentTime;

    this.playCryTone(now, 420, 0.65, 0.42);
    this.playCryTone(now + 0.42, 510, 0.55, 0.36);
    this.playCryTone(now + 0.83, 370, 0.78, 0.34);

    const noise = this.context.createBufferSource();
    const noiseFilter = this.context.createBiquadFilter();
    const noiseGain = this.context.createGain();

    noise.buffer = this.makeNoiseBuffer(1.4);
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 760;
    noiseFilter.Q.value = 1.1;

    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.linearRampToValueAtTime(0.16, now + 0.18);
    noiseGain.gain.linearRampToValueAtTime(0.12, now + 1.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.effectGain);

    noise.start(now);
    noise.stop(now + 1.45);
  }

  playCryTone(time, frequency, duration, strength) {
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    const tremolo = this.context.createOscillator();
    const tremoloGain = this.context.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(frequency, time);
    osc.frequency.linearRampToValueAtTime(frequency * 1.28, time + duration * 0.35);
    osc.frequency.linearRampToValueAtTime(frequency * 0.72, time + duration);

    tremolo.type = "sine";
    tremolo.frequency.setValueAtTime(6.5, time);
    tremoloGain.gain.setValueAtTime(22, time);
    tremolo.connect(tremoloGain);
    tremoloGain.connect(osc.frequency);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(strength, time + 0.08);
    gain.gain.linearRampToValueAtTime(strength * 0.55, time + duration * 0.62);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.effectGain);

    osc.start(time);
    tremolo.start(time);
    osc.stop(time + duration + 0.03);
    tremolo.stop(time + duration + 0.03);
  }

  update(energy) {
    if (!this.started) return;

    const e = Math.max(0, Math.min(1, energy));

    this.currentHeartbeatInterval = 1080 - e * 650;

    const heartbeatVolume = 0.48 + e * 0.42;
    const staticVolume = 0.02 + e * 0.44;
    const masterVolume = 0.62;

    this.heartbeatGain.gain.value += (heartbeatVolume - this.heartbeatGain.gain.value) * 0.05;
    this.staticGain.gain.value += (staticVolume - this.staticGain.gain.value) * 0.06;
    this.masterGain.gain.value += (masterVolume - this.masterGain.gain.value) * 0.04;

    this.staticFilterA.frequency.value = 520 + e * 1500;
    this.staticFilterB.frequency.value = 1600 + Math.random() * 4600;
    this.staticFilterB.Q.value = 0.55 + e * 2.6;
  }
}

window.luxdotAudio = new LuxdotAudioEngine();
