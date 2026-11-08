export const gameState = {
  lives: 3,
  difficulty: 'medio',
  isInputBlocked: false,
  isAudioMuted: false,

  // Ranuras del inventario inferior: bobina, biochip, usb y cañón
  hotbarSlots: [null, null, null, null],

  // Solo guardamos lo que las escenas consultan para no repetir un acertijo ya resuelto
  progress: {
    portalConstruido: false,
    fabrica1957Completada: false,
    lab1998Completado: false
  },

  setDifficulty(level) {
    this.difficulty = level;
  },

  setLives(count) {
    this.lives = Math.max(0, Math.min(3, count));
    const counterEl = document.getElementById('lives-counter');
    if (counterEl) {
      counterEl.textContent = this.lives;
    }
  },

  loseLife() {
    this.setLives(this.lives - 1);
    return this.lives > 0;
  },

  addItemToSlot(slotIndex, item) {
    if (slotIndex < 0 || slotIndex >= this.hotbarSlots.length) return;

    this.hotbarSlots[slotIndex] = item;
    const slotEl = document.querySelector(`.hotbar-slot[data-slot="${slotIndex}"]`);
    if (!slotEl) return;

    slotEl.textContent = '';

    if (item) {
      slotEl.classList.add('filled');
      slotEl.title = `${item.name} - ${item.desc || ''}`;

      const img = document.createElement('img');
      img.src = item.icon;
      img.alt = item.name;
      slotEl.appendChild(img);
    } else {
      slotEl.classList.remove('filled');
    }
  }
};
