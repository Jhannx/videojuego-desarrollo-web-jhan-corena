import { PuzzlePreguntas } from './PuzzlePreguntas.js';
import { Dificultad } from './Dificultad.js';

export class FabricaPuzzle extends PuzzlePreguntas {
  constructor(game, onSuccess) {
    super(game, onSuccess);
    this.dificultad = new Dificultad();
    this.mensajes = {
      exito: '¡RESPUESTA CORRECTA! BOBINA DE ALTO VOLTAJE DESACOPLADA',
      trampa: '¡CORTO CIRCUITO CRÍTICO! TERMINAL BLOQUEADA POR 5 SEGUNDOS',
      error: 'PARÁMETRO INCORRECTO. INTENTA DE NUEVO',
      personaje: 'Ingeniero (1957)',
      sinVidas: '¡Cuidado con la sobrecarga! Se reiniciaron los medidores. Tómate un segundo y analiza bien el circuito.'
    };
  }

  configurarAcertijo() {
    if (this.dificultad.esFacil()) {
      this.datos = {
        titulo: 'PANEL DE CONTROL: MAGNITUDES ELÉCTRICAS (FÁCIL)',
        contexto: 'En la consola de la fábrica debes seleccionar el parámetro que mide directamente el caudal de carga antes de abrir el interruptor principal.',
        pregunta: '¿Qué magnitud física representa el flujo o cantidad de electrones que circula por un conductor en una unidad de tiempo?',
        opciones: [
          { texto: 'A) Corriente eléctrica (Intensidad / Amperios)', tipo: 'correcta' },
          { texto: 'B) Voltaje (Tensión)', tipo: 'error' },
          { texto: 'C) Resistencia eléctrica', tipo: 'error' },
          { texto: 'D) Potencia eléctrica', tipo: 'trampa' }
        ]
      };
    } else if (this.dificultad.esDificil()) {
      this.datos = {
        titulo: 'EFECTO TÉRMICO: CONDUCTORES BAJO CALOR (DIFÍCIL)',
        contexto: 'La bobina trabaja junto al horno de fundición. Debes predecir el comportamiento del metal bajo calor extremo para no fundir el circuito.',
        pregunta: '¿Qué le sucede a la resistencia eléctrica de un conductor metálico típico (como el cobre) cuando su temperatura se eleva drásticamente?',
        opciones: [
          { texto: 'A) Aumenta', tipo: 'correcta' },
          { texto: 'B) Disminuye', tipo: 'error' },
          { texto: 'C) Se mantiene constante', tipo: 'error' },
          { texto: 'D) Cae a cero de golpe', tipo: 'trampa' }
        ]
      };
    } else {
      this.datos = {
        titulo: 'SELECTOR DE SEÑAL: SEMICONDUCTORES 1957 (MEDIO)',
        contexto: 'Una placa de contacto se quebró. Debes escoger de la caja de repuestos de 1957 el material que actúa como semiconductor.',
        pregunta: 'Para reparar el selector de señal necesitas un elemento semiconductor. ¿Cuál de los siguientes materiales cumple con esta propiedad?',
        opciones: [
          { texto: 'A) Cobre', tipo: 'error' },
          { texto: 'B) Germanio (o Silicio)', tipo: 'correcta' },
          { texto: 'C) Porcelana / Cerámica', tipo: 'error' },
          { texto: 'D) Vidrio', tipo: 'trampa' }
        ]
      };
    }
  }
}
