import { PuzzlePreguntas } from './PuzzlePreguntas.js';
import { Dificultad } from './Dificultad.js';

export class PortalConstruction extends PuzzlePreguntas {
  constructor(game, onSuccess) {
    super(game, onSuccess);
    this.dificultad = new Dificultad();
    this.mensajes = {
      exito: '¡CÁLCULO CORRECTO! SEGMENTO DEL PORTAL ENSAMBLADO',
      trampa: '¡ERROR CRÍTICO! SOBRECARGA ACTIVADA - TERMINAL BLOQUEADA POR 5 SEGUNDOS',
      error: 'VALOR INCORRECTO. REVISA EL CÁLCULO',
      personaje: 'Babas',
      sinVidas: '¡Cuidado! Una sobrecarga mayor activaría los sensores alienígenas. Tómalo con calma y revisa la fórmula.'
    };
  }

  configurarAcertijo() {
    if (this.dificultad.esFacil()) {
      this.datos = {
        titulo: 'ANCLAJE TEMPORAL: FRECUENCIA BASE (FÁCIL)',
        contexto: 'Calibrar el pulso electromagnético para sintonizar la distorsión del espacio-tiempo.',
        formula: 'Fórmula: f = 1 / T',
        pregunta: 'El condensador de taquiones registra un tiempo de oscilación T = 0.05 s. ¿Cuál es la frecuencia de resonancia f en Hertz requerida para estabilizar el primer anclaje?',
        opciones: [
          { texto: 'A) 20 Hz', tipo: 'correcta' },
          { texto: 'B) 0.05 Hz', tipo: 'trampa' },
          { texto: 'C) 50 Hz', tipo: 'error' },
          { texto: 'D) 5 Hz', tipo: 'error' }
        ]
      };
    } else if (this.dificultad.esDificil()) {
      this.datos = {
        titulo: 'ALERTA TÉRMICA: RESISTENCIA EQUIVALENTE (DIFÍCIL)',
        contexto: 'Calibre la resistencia equivalente (Req) del subsistema de disipación.',
        formula: 'Circuito: Dos ramas en paralelo de 60 Ω acopladas en serie a una de 20 Ω.',
        pregunta: '¿Cuál es el valor de Req en Ohmios que debe registrar el sensor central para evitar la sobrecarga térmica?',
        opciones: [
          { texto: 'A) 50 Ω', tipo: 'correcta' },
          { texto: 'B) 140 Ω', tipo: 'trampa' },
          { texto: 'C) 30 Ω', tipo: 'error' },
          { texto: 'D) 80 Ω', tipo: 'error' }
        ]
      };
    } else {
      this.datos = {
        titulo: 'ALIMENTACIÓN DEL ELECTROIMÁN: LEY DE OHM (MEDIO)',
        contexto: 'Suministrar la carga exacta a las bobinas del marco para evitar fundir los transformadores de cobre.',
        formula: 'Fórmula: V = I · R',
        pregunta: 'Las bobinas operan bajo una corriente continua I = 5 A y una resistencia de línea R = 24 Ω. Determina el voltaje exacto V que debe enviar el generador.',
        opciones: [
          { texto: 'A) 120 V', tipo: 'correcta' },
          { texto: 'B) 4.8 V', tipo: 'trampa' },
          { texto: 'C) 29 V', tipo: 'error' },
          { texto: 'D) 100 V', tipo: 'error' }
        ]
      };
    }
  }
}
