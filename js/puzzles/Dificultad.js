import { gameState } from '../state.js';

export class Dificultad {
  get nivel() {
    return gameState.difficulty;
  }

  esFacil() {
    return gameState.difficulty === 'facil';
  }

  esMedio() {
    return gameState.difficulty === 'medio';
  }

  esDificil() {
    return gameState.difficulty === 'dificil';
  }
}
