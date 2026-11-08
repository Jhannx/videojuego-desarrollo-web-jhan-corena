import { gameState } from './state.js';
import { audioManager } from './services/AudioManager.js';
import { SceneCelda } from './scenes/SceneCelda.js';
import { SceneLaboratorio } from './scenes/SceneLaboratorio.js';
import { SceneFabrica1957 } from './scenes/SceneFabrica1957.js';
import { SceneLab1998 } from './scenes/SceneLab1998.js';
import { Scene2077 } from './scenes/Scene2077.js';
import { SceneFinal } from './scenes/SceneFinal.js';

class Game {
  constructor() {
    this.bgElement = document.getElementById('scene-background');
    this.sceneElements = document.getElementById('scene-elements');
    this.playerEl = document.getElementById('jugador');
    this.hudTitle = document.getElementById('hud-scene-title');
    this.dialogBox = document.getElementById('dialog-box');
    this.dialogSpeaker = document.getElementById('dialog-speaker');
    this.dialogText = document.getElementById('dialog-text');
    this.dialogBtnNext = document.getElementById('dialog-btn-next');

    this.scenes = {};
    this.currentScene = null;
    this.dialogOpen = false;
    this.onDialogClose = null;

    this.audio = audioManager;

    this.initUI();
  }

  initScenes() {
    this.scenes.celda = new SceneCelda(this);
    this.scenes.laboratorio = new SceneLaboratorio(this);
    this.scenes.fabrica1957 = new SceneFabrica1957(this);
    this.scenes.lab1998 = new SceneLab1998(this);
    this.scenes.scene2077 = new Scene2077(this);
    this.scenes.final = new SceneFinal(this);
  }

  initUI() {
    gameState.setLives(gameState.lives);

    // Selector de dificultad en pantalla de inicio
    const diffButtons = document.querySelectorAll('.diff-btn');
    diffButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        diffButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        gameState.setDifficulty(btn.dataset.diff);
      });
    });

    // Botón iniciar juego: oculta el menú, reproduce la cinemática de invasión y carga la celda
    const startBtn = document.getElementById('btn-start-game');
    const titleScreen = document.getElementById('title-screen');

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        if (titleScreen) titleScreen.classList.add('hidden');
        this.initScenes();

        this.playCinematic('resources/video/Invasion.mp4', () => {
          this.changeScene('celda');
        });
      });
    }

    if (this.dialogBtnNext) {
      this.dialogBtnNext.addEventListener('click', () => this.hideDialog());
    }

    // Tecla E para avanzar diálogo o interactuar
    window.addEventListener('keydown', (e) => {
      if (e.key === 'e' || e.key === 'E') {
        if (gameState.isInputBlocked && !this.dialogOpen) return;

        if (this.dialogOpen) {
          this.hideDialog();
        } else if (this.currentScene && this.currentScene.interact) {
          this.currentScene.interact();
        }
      }
    });
  }

  changeScene(name) {
    if (this.currentScene && this.currentScene.exit) {
      this.currentScene.exit();
    }

    const next = this.scenes[name];
    if (!next) return;

    this.currentScene = next;
    next.enter();
  }

  setBackground(imagePath) {
    if (this.bgElement) {
      this.bgElement.style.backgroundImage = `url('${imagePath}')`;
    }
  }

  setHudTitle(title) {
    if (this.hudTitle) {
      this.hudTitle.textContent = title;
    }
  }

  showPlayer(visible) {
    if (this.playerEl) {
      this.playerEl.classList.toggle('hidden', !visible);
    }
  }

  showDialog(speaker, text, onClose = null) {
    if (!this.dialogBox || !this.dialogText) return;

    if (this.dialogSpeaker) {
      this.dialogSpeaker.textContent = speaker ? `${speaker}:` : '';
    }
    this.dialogText.textContent = text;
    this.dialogBox.classList.remove('hidden');
    this.dialogOpen = true;
    this.onDialogClose = onClose;
  }

  hideDialog() {
    if (this.dialogBox) {
      this.dialogBox.classList.add('hidden');
    }
    this.dialogOpen = false;

    if (this.onDialogClose) {
      const callback = this.onDialogClose;
      this.onDialogClose = null;
      callback();
    }
  }

  playCinematic(videoSrc, onEnded) {
    const overlay = document.getElementById('cinematic-overlay');
    const player = document.getElementById('cinematic-player');
    const skipBtn = document.getElementById('skip-cinematic-btn');

    if (!overlay || !player) {
      if (onEnded) onEnded();
      return;
    }

    this.audio.pauseBGM();
    overlay.classList.remove('hidden');
    gameState.isInputBlocked = true;

    player.src = videoSrc;
    player.currentTime = 0;

    const finish = () => {
      player.pause();
      player.onended = null;
      if (skipBtn) skipBtn.onclick = null;
      overlay.classList.add('hidden');
      gameState.isInputBlocked = false;
      window.removeEventListener('keydown', onSkipKey);
      if (onEnded) onEnded();
    };

    const onSkipKey = (e) => {
      if (e.repeat) return;
      if (e.code === 'Space' || e.key === 'Escape') finish();
    };

    player.onended = finish;
    if (skipBtn) skipBtn.onclick = finish;
    window.addEventListener('keydown', onSkipKey);

    player.play().catch(() => {});
  }

  start() {
    this.setBackground('resources/img/envs/Celda.jfif');
    this.setHudTitle('INVASIÓN ALIENÍGENA');
  }
}

export const game = new Game();

window.addEventListener('DOMContentLoaded', () => {
  game.start();
});
