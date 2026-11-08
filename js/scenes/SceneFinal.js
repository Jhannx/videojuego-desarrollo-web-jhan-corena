import { gameState } from '../state.js';

export class SceneFinal {
  constructor(game) {
    this.game = game;
    this.canonCreado = false;
    this.babasEl = null;
  }

  enter() {
    this.canonCreado = false;
    this.game.setBackground('resources/img/envs/lab-portal-apagado.PNG');
    this.game.setHudTitle('ACTO FINAL: LABORATORIO SUBTERRÁNEO (2027)');

    this.game.showPlayer(true);
    this.createElements();

    this.game.audio.playBGM('suspense');

    // Babas recibe al protagonista; al presionar [E] se ensambla el cañón
    this.game.showDialog(
      'Babas',
      'Perfecto, hemos terminado el viaje, es hora de crear el cañón.',
      () => {
        this.crearCanon();
      }
    );
  }

  createElements() {
    const container = this.game.sceneElements;
    if (!container) return;
    container.textContent = '';

    const babas = document.createElement('img');
    babas.src = 'resources/img/babas.png';
    babas.className = 'companion-sprite';
    babas.style.left = '330px';
    babas.style.bottom = '70px';
    babas.title = 'Babas';

    babas.onclick = () => {
      if (!this.canonCreado) {
        this.crearCanon();
      }
    };

    this.babasEl = babas;
    container.appendChild(babas);
  }

  crearCanon() {
    if (this.canonCreado) return;
    this.canonCreado = true;

    if (this.game.dialogOpen) {
      this.game.hideDialog();
    }

    this.game.playCinematic('resources/video/creacion-arma-cañon.mp4', () => {
      // Agregar el Cañón Bio-EMP a la cuarta ranura del inventario (slot 3)
      gameState.addItemToSlot(3, {
        id: 'canon',
        name: 'Cañón Bio-EMP (2027)',
        icon: 'resources/img/cañon.jfif',
        desc: 'Cañón Bio-EMP definitivo ensamblado con las tres piezas temporales.'
      });

      this.game.audio.playBGM('suspense');
      this.activarPortalEncendido();
      this.iniciarDespedida();
    });
  }

  activarPortalEncendido() {
    const container = this.game.sceneElements;
    if (!container) return;

    // Activar el vórtice luminoso dentro del anillo del portal
    const vortex = document.createElement('div');
    vortex.className = 'portal-vortex';
    container.insertBefore(vortex, container.firstChild);
  }

  iniciarDespedida() {
    this.game.showDialog(
      'Protagonista',
      '¡Muchas gracias, Babas!',
      () => {
        this.game.showDialog(
          'Babas',
          'Tenía que ayudarte, era lo justo. Ahora, necesito regresar a mi planeta, me llevaré el cañón para poner todo a la normalidad. ¡Seguiremos en contacto!',
          () => {
            this.iniciarSecuenciaFinal();
          }
        );
      }
    );
  }

  iniciarSecuenciaFinal() {
    if (this.babasEl) {
      this.babasEl.classList.add('hidden');
    }

    this.game.playCinematic('resources/video/destruccion - ganar juego.mp4', () => {
      this.game.playCinematic('resources/video/babas-final.mp4', () => {
        this.mostrarPantallaVictoria();
      });
    });
  }

  mostrarPantallaVictoria() {
    gameState.isInputBlocked = true;

    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;

    const overlay = document.createElement('div');
    overlay.className = 'victory-overlay';

    const card = document.createElement('div');
    card.className = 'victory-card';

    const title = document.createElement('h1');
    title.className = 'victory-title';
    title.textContent = 'FELICIDADES, HAS COMPLETADO EL VIDEOJUEGO';

    const sub = document.createElement('p');
    sub.className = 'victory-sub';
    sub.textContent = 'La amenaza alienígena ha sido neutralizada y la Tierra está a salvo.';

    const restartBtn = document.createElement('button');
    restartBtn.type = 'button';
    restartBtn.className = 'retro-btn start-btn';
    restartBtn.style.alignSelf = 'center';
    restartBtn.textContent = 'VOLVER AL INICIO';
    restartBtn.onclick = () => {
      window.location.reload();
    };

    card.appendChild(title);
    card.appendChild(sub);
    card.appendChild(restartBtn);
    overlay.appendChild(card);
    gameContainer.appendChild(overlay);
  }

  interact() {
    if (!this.canonCreado) {
      this.crearCanon();
    }
  }

  exit() {
    if (this.game.sceneElements) {
      this.game.sceneElements.textContent = '';
    }
  }
}

