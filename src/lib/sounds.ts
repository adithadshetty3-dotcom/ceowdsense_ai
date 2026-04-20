// Web Audio API based simple siren for SOS
let audioContext: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;

export const startSiren = () => {
  if (typeof window === 'undefined') return;
  
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  if (oscillator) return; // Already running

  oscillator = audioContext.createOscillator();
  gainNode = audioContext.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

  // Modulation for siren effect
  const modulator = audioContext.createOscillator();
  const modulationGain = audioContext.createGain();

  modulator.type = 'triangle';
  modulator.frequency.value = 2; // 2Hz frequency
  modulationGain.gain.value = 100; // Frequency shift range

  modulator.connect(modulationGain);
  modulationGain.connect(oscillator.frequency);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);

  modulator.start();
  oscillator.start();
};

export const stopSiren = () => {
  if (gainNode && audioContext) {
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
    setTimeout(() => {
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
      }
      if (gainNode) {
        gainNode.disconnect();
        gainNode = null;
      }
    }, 500);
  }
};
