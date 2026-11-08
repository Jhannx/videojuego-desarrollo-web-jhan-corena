export class CodeTerminal2077Puzzle {
  constructor(game, onSuccess) {
    this.game = game;
    this.onSuccess = onSuccess;
    this.container = document.getElementById('scene-elements');
    this.statusEl = null;
    this.textarea = null;
    this.lineNumbersEl = null;
    this.injectBtn = null;
    this.bloqueado = false;

    // Código original tal cual la clase Java sin comentarios
    this.codigoOriginal = [
      'package terra.alien.core;',
      '',
      'public class AlienCoreController {',
      '',
      '    private final String systemApiKey = "123789";',
      '',
      '    private boolean controlHumano = true;',
      '',
      '    private final int MAX_BANDWIDTH = 9850;',
      '',
      '    private int sintonizarFrecuencia(String key) {',
      '        if (this.systemApiKey.equals(key)) {',
      '            return this.MAX_BANDWIDTH;',
      '        }',
      '        return 0;',
      '    }',
      '',
      '    public boolean isControlHumanoActivo() {',
      '        return true;',
      '    }',
      '',
      '    public void forzarPurgadoNucleo() {',
      '        throw new SecurityException("COLAPSO DEL SISTEMA: INTRUSIÓN ROOT");',
      '    }',
      '}'
    ].join('\n');
  }

  open() {
    this.bloqueado = false;
    this.render();
  }

  close() {
    if (this.container) {
      this.container.textContent = '';
    }
  }

  render() {
    if (!this.container) return;
    this.container.textContent = '';

    // Contenedor CRT ajustado al monitor central de 2077-pc-encendida.webp
    const crtScreen = document.createElement('div');
    crtScreen.className = 'terminal-screen-container';

    // Barra de título de la terminal
    const titleBar = document.createElement('div');
    titleBar.className = 'terminal-title-bar';

    const titleText = document.createElement('span');
    titleText.className = 'terminal-title-text';
    titleText.textContent = 'AlienCoreController.java [EDITOR DE CÓDIGO]';

    const statusBadge = document.createElement('span');
    statusBadge.className = 'terminal-status-badge';
    statusBadge.textContent = '● MODO DEBUG';

    titleBar.appendChild(titleText);
    titleBar.appendChild(statusBadge);
    crtScreen.appendChild(titleBar);

    // Cuerpo del editor: números de línea y textarea de edición real
    const editorBody = document.createElement('div');
    editorBody.className = 'terminal-editor-body';

    this.lineNumbersEl = document.createElement('div');
    this.lineNumbersEl.className = 'terminal-line-numbers';

    this.textarea = document.createElement('textarea');
    this.textarea.className = 'terminal-code-textarea';
    this.textarea.spellcheck = false;
    this.textarea.autocomplete = 'off';
    this.textarea.autocapitalize = 'off';
    this.textarea.value = this.codigoOriginal;

    // Manejar tecla Tab para insertar sangría en vez de cambiar el foco
    this.textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        this.textarea.value =
          this.textarea.value.substring(0, start) + '    ' + this.textarea.value.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 4;
        this.actualizarNumerosDeLinea();
      }
    });

    // Sincronizar scroll entre números de línea y código
    this.textarea.addEventListener('scroll', () => {
      if (this.lineNumbersEl) {
        this.lineNumbersEl.scrollTop = this.textarea.scrollTop;
      }
    });

    this.textarea.addEventListener('input', () => {
      this.actualizarNumerosDeLinea();
    });

    editorBody.appendChild(this.lineNumbersEl);
    editorBody.appendChild(this.textarea);
    crtScreen.appendChild(editorBody);

    // Pie de la pantalla con estado y botones de control
    const footer = document.createElement('div');
    footer.className = 'terminal-footer-bar';

    this.statusEl = document.createElement('div');
    this.statusEl.className = 'terminal-status-msg';
    this.statusEl.textContent = 'MODIFICA EL CÓDIGO FUENTE DIRECTAMENTE Y COMPILA EL EXPLOIT';
    footer.appendChild(this.statusEl);

    const btnGroup = document.createElement('div');
    btnGroup.className = 'terminal-btn-group';

    this.injectBtn = document.createElement('button');
    this.injectBtn.type = 'button';
    this.injectBtn.className = 'terminal-btn-inject';
    this.injectBtn.textContent = '⚡ COMPILAR E INYECTAR EXPLOIT';
    this.injectBtn.onclick = () => this.validarCodigo();

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'terminal-btn-reset-code';
    resetBtn.textContent = '↺ Restaurar Código';
    resetBtn.onclick = () => this.restaurarCodigo();

    btnGroup.appendChild(this.injectBtn);
    btnGroup.appendChild(resetBtn);
    footer.appendChild(btnGroup);

    crtScreen.appendChild(footer);
    this.container.appendChild(crtScreen);

    this.actualizarNumerosDeLinea();
  }

  actualizarNumerosDeLinea() {
    if (!this.lineNumbersEl || !this.textarea) return;
    const lines = this.textarea.value.split('\n');
    const nums = [];
    for (let i = 1; i <= lines.length; i++) {
      nums.push(i);
    }
    this.lineNumbersEl.textContent = nums.join('\n');
  }

  restaurarCodigo() {
    if (this.bloqueado) return;
    if (this.textarea) {
      this.textarea.value = this.codigoOriginal;
      this.actualizarNumerosDeLinea();
    }
    if (this.statusEl) {
      this.statusEl.className = 'terminal-status-msg';
      this.statusEl.textContent = 'Código original restaurado. Revisa las pistas de Babas.';
    }
  }

  validarCodigo() {
    if (this.bloqueado || !this.textarea) return;

    const code = this.textarea.value;

    // 1. Validar que la función sintonizarFrecuencia tenga visibilidad pública
    const isPublicMethod = /\bpublic\s+int\s+sintonizarFrecuencia\s*\(/.test(code);
    const isProtectedMethod = /\bprotected\s+int\s+sintonizarFrecuencia\s*\(/.test(code);
    const isPrivateMethod = /\bprivate\s+int\s+sintonizarFrecuencia\s*\(/.test(code);

    // 2. Validar que isControlHumanoActivo retorne false
    const isControlMethodValid = /isControlHumanoActivo\s*\(\s*\)[\s\S]*?return\s+false\s*;/.test(code);
    const isControlMethodStillTrue = /isControlHumanoActivo\s*\(\s*\)[\s\S]*?return\s+true\s*;/.test(code);

    if (isPublicMethod && isControlMethodValid) {
      this.bloqueado = true;
      this.textarea.readOnly = true;

      this.statusEl.className = 'terminal-status-msg success';
      this.statusEl.textContent = '¡COMPILACIÓN EXITOSA! Exploit inyectado. Acceso root concedido.';

      setTimeout(() => {
        this.close();
        if (this.onSuccess) {
          this.onSuccess();
        }
      }, 1200);
    } else {
      this.statusEl.className = 'terminal-status-msg error';

      if (!isPublicMethod && !isControlMethodValid) {
        this.statusEl.textContent = 'ERROR: Sigue encapsulado como privado y el control humano activo.';
      } else if (!isPublicMethod) {
        if (isProtectedMethod) {
          this.statusEl.textContent = 'ERROR: "protected" no otorga acceso externo. Necesitas visibilidad pública.';
        } else if (isPrivateMethod) {
          this.statusEl.textContent = 'ERROR DE ENCAPSULAMIENTO: sintonizarFrecuencia() sigue siendo private.';
        } else {
          this.statusEl.textContent = 'ERROR DE SINTAXIS: Declara sintonizarFrecuencia() con modificador public.';
        }
      } else if (!isControlMethodValid) {
        if (isControlMethodStillTrue) {
          this.statusEl.textContent = 'ERROR LÓGICO: isControlHumanoActivo() sigue retornando true.';
        } else {
          this.statusEl.textContent = 'ERROR LÓGICO: isControlHumanoActivo() debe retornar false.';
        }
      }
    }
  }
}
