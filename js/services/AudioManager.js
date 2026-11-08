import { gameState } from '../state.js';

export class AudioManager {
  constructor() {
    this.bgmPlayer = document.getElementById('bgm-player');
    this.audioToggleBtn = document.getElementById('btn-audio-toggle');

    this.tracks = {
      tension: 'resources/audio/S1-Quadrant_Seven.mp3',
      suspense: 'resources/audio/S2-Beneath_The_Hull.mp3'
    };

    if (this.audioToggleBtn) {
      this.audioToggleBtn.addEventListener('click', () => this.toggleMute());
    }
  }

  playBGM(trackKey = 'tension') {
    const src = this.tracks[trackKey];
    if (!this.bgmPlayer || !src) return;

    if (!this.bgmPlayer.src.endsWith(src)) {
      this.bgmPlayer.src = src;
    }

    this.bgmPlayer.volume = gameState.isAudioMuted ? 0 : 0.5;
    this.bgmPlayer.play().catch(() => {});
  }

  pauseBGM() {
    if (this.bgmPlayer) {
      this.bgmPlayer.pause();
    }
  }

  toggleMute() {
    gameState.isAudioMuted = !gameState.isAudioMuted;

    if (this.bgmPlayer) {
      this.bgmPlayer.volume = gameState.isAudioMuted ? 0 : 0.5;
    }

    if (this.audioToggleBtn) {
      this.audioToggleBtn.textContent = gameState.isAudioMuted ? '🔇 MUTE' : '🔊 AUDIO';
      this.audioToggleBtn.classList.toggle('muted', gameState.isAudioMuted);
    }
  }
}

export const audioManager = new AudioManager();
