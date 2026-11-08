import { PuzzlePreguntas } from './PuzzlePreguntas.js';
import { Dificultad } from './Dificultad.js';

export class BiochipPuzzle extends PuzzlePreguntas {
  constructor(game, onSuccess) {
    super(game, onSuccess);
    this.dificultad = new Dificultad();
    this.mensajes = {
      exito: '¡CORRECTO! CÁMARA CRIOGÉNICA DESBLOQUEADA',
      trampa: '¡ERROR CRÍTICO! FALLO EN MATRIZ - SISTEMA BLOQUEADO POR 5 SEGUNDOS',
      error: 'RESPUESTA INCORRECTA',
      personaje: 'Dra. Lewis',
      sinVidas: 'La muestra casi se desestabiliza. Tómalo con calma y repasa el principio científico.'
    };
  }

  configurarAcertijo() {
    if (this.dificultad.esFacil()) {
      this.datos = {
        titulo: 'CULTIVO ORGÁNICO: PROCESO VITAL (FÁCIL)',
        contexto: 'En la terminal de 1998, la científica te pide verificar el ciclo metabólico del nutriente vegetal en el que está suspendido el chip.',
        pregunta: '¿Cómo se llama el proceso biológico mediante el cual las plantas convierten la luz solar, el agua y el dióxido de carbono en glucosa para sobrevivir, liberando oxígeno?',
        opciones: [
          { texto: 'A) Fotosíntesis', tipo: 'correcta' },
          { texto: 'B) Respiración celular', tipo: 'error' },
          { texto: 'C) Fermentación', tipo: 'error' },
          { texto: 'D) Mitosis', tipo: 'trampa' }
        ]
      };
    } else if (this.dificultad.esDificil()) {
      this.datos = {
        titulo: 'FÍSICA CUÁNTICA: COEXISTENCIA DE ESTADOS (DIFÍCIL)',
        contexto: 'Para sincronizar la interfaz del Bio-Chip con la arquitectura de computación cuántica, debes validar el principio fundamental de partículas no medidas.',
        pregunta: '¿Cómo se denomina el principio de la física cuántica según el cual una partícula o sistema puede existir en dos o más estados simultáneamente hasta el momento exacto en que es medido u observado?',
        opciones: [
          { texto: 'A) Superposición cuántica', tipo: 'correcta' },
          { texto: 'B) Entrelazamiento cuántico', tipo: 'error' },
          { texto: 'C) Efecto túnel', tipo: 'error' },
          { texto: 'D) Decaimiento radiactivo', tipo: 'trampa' }
        ]
      };
    } else {
      this.datos = {
        titulo: 'MATRIZ MOLECULAR: ENLACE QUÍMICO (MEDIO)',
        contexto: 'Para evitar que la matriz molecular del Bio-Chip se degrade en el solvente, debes verificar el tipo de enlace que mantiene unidos los átomos de carbono.',
        pregunta: 'En la estructura molecular del compuesto orgánico, los átomos se mantienen fuertemente unidos al compartir pares de electrones. ¿Cómo se denomina este tipo de enlace químico?',
        opciones: [
          { texto: 'A) Enlace covalente', tipo: 'correcta' },
          { texto: 'B) Enlace iónico', tipo: 'error' },
          { texto: 'C) Enlace metálico', tipo: 'error' },
          { texto: 'D) Puente de hidrógeno', tipo: 'trampa' }
        ]
      };
    }
  }
}
