class AudioSystem {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.isPlayingBGM = false;
    this.bgmTimeout = null;
  }
  
  resume() {
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  
  playTone(freq, type, duration, vol=0.1) {
    if (this.ctx.state === 'suspended') return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playCorrect() {
    this.resume();
    this.playTone(523.25, 'sine', 0.1, 0.2); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.15, 0.2), 100); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.2, 0.2), 250); // G5
  }

  playWrong() {
    this.resume();
    this.playTone(300, 'sawtooth', 0.2, 0.2);
    setTimeout(() => this.playTone(250, 'sawtooth', 0.3, 0.2), 150);
  }

  startBGM() {
    this.resume();
    if (this.isPlayingBGM) return;
    this.isPlayingBGM = true;
    
    // O Guarani (simplified theme)
    const melody = [
      {f: 329.63, d: 0.2}, // E4
      {f: 329.63, d: 0.2}, // E4
      {f: 349.23, d: 0.2}, // F4
      {f: 392.00, d: 0.4}, // G4
      {f: 523.25, d: 0.4}, // C5
      {f: 493.88, d: 0.2}, // B4
      {f: 440.00, d: 0.2}, // A4
      {f: 392.00, d: 0.4}, // G4
      {f: 0, d: 0.2},      // pause
      {f: 349.23, d: 0.2}, // F4
      {f: 349.23, d: 0.2}, // F4
      {f: 329.63, d: 0.2}, // E4
      {f: 293.66, d: 0.4}, // D4
      {f: 392.00, d: 0.4}, // G4
      {f: 349.23, d: 0.2}, // F4
      {f: 329.63, d: 0.2}, // E4
      {f: 293.66, d: 0.4}, // D4
      {f: 0, d: 0.4}       // pause
    ];
    
    let noteIndex = 0;
    const playNextNote = () => {
      if (!this.isPlayingBGM) return;
      const note = melody[noteIndex];
      if (note.f > 0) {
        this.playTone(note.f, 'triangle', note.d, 0.05);
      }
      noteIndex = (noteIndex + 1) % melody.length;
      this.bgmTimeout = setTimeout(playNextNote, note.d * 1000 + 50);
    };
    playNextNote();
  }
  
  stopBGM() {
    this.isPlayingBGM = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
    }
  }
}
