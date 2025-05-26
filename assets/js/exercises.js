class ExerciseManager {
    constructor(exercises = []) {
      this.exercises = exercises;
      this.audioElements = {};
      this.score = 0;

      this.init();
    }
  
    init() {
      if (this.exercises.length === 0) {
        console.warn("No hay ejercicios cargados.");
        return;
      }
      this.setupExercises();
      this.setupTooltips();
      this.setupAudioButtons();
      this.setupCheckButtons();
    }
  
    setupExercises() {
      this.exercises.forEach(ex => {
        if (ex.type === "complete") {
          const container = document.getElementById(`options${ex.id}`);
          if (!container) return;
          ex.options.forEach(opt => {
            const option = document.createElement('div');
            option.className = 'option';
            option.innerHTML = `<span data-translation="${opt.spanish}">${opt.quechua}</span>`;
            option.addEventListener('click', () => this.selectOption(option, ex.id));
            container.appendChild(option);
          });
        }
      });
    }
  
    selectOption(option, exId) {
      document.querySelectorAll(`#options${exId} .option`).forEach(opt => {
        opt.classList.remove('selected');
      });
      option.classList.add('selected');
    }
  
    setupCheckButtons() {
      document.querySelectorAll('.check-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const exId = parseInt(btn.getAttribute('data-exercise'));
          this.checkExercise(exId);
        });
      });
    }
  
    checkExercise(exId) {
      const ex = this.exercises.find(e => e.id === exId);
      if (!ex) return;
      const feedback = document.getElementById(`feedback${exId}`);
      
      let userAnswer = "";
      let isCorrect = false;
  
      if (ex.type === "complete") {
        const selectedOption = document.querySelector(`#options${exId} .option.selected`);
        if (selectedOption) {
          userAnswer = selectedOption.innerText.trim();
        }
      } else if (ex.type === "write") {
        const input = document.getElementById(`input${exId}`);
        if (input) {
          userAnswer = input.value.trim();
        }
      }
  
      if (userAnswer !== "") {
        isCorrect = userAnswer.toLowerCase() === ex.answer.toLowerCase();
      }
  
      if (isCorrect) {
        this.score++;
        feedback.textContent = "¡Correcto! 🎉";
        feedback.className = "feedback correct";
      } else {
        feedback.textContent = `Incorrecto. La respuesta correcta es: "${ex.answer}"`;
        feedback.className = "feedback incorrect";
      }
  
      feedback.style.display = "block";
      this.disableExercise(exId);
  
      if (exId === this.exercises.length) {
        const finalScore = document.getElementById('final-score');
        if (finalScore) {
          finalScore.textContent = `Has completado ${this.score} de ${this.exercises.length} ejercicios correctamente.`;
        }
      }
    }
  
    disableExercise(exId) {
      const ex = this.exercises.find(e => e.id === exId);
      if (!ex) return;
      if (ex.type === "complete") {
        document.querySelectorAll(`#options${exId} .option`).forEach(opt => {
          opt.style.pointerEvents = 'none';
        });
      } else if (ex.type === "write") {
        const input = document.getElementById(`input${exId}`);
        if (input) {
          input.readOnly = true;
        }
      }
    }
  
    setupTooltips() {
    const translationDisplay = document.getElementById('translationDisplay');
    
    document.querySelectorAll('[data-translation]').forEach(el => {
        el.addEventListener('click', (e) => {
            if (translationDisplay) {
                translationDisplay.textContent = el.dataset.translation;
                translationDisplay.style.display = 'block';
                
                setTimeout(() => {
                    translationDisplay.style.display = 'none';
                }, 2000);
            }
        });
    });
}
  
    setupAudioButtons() {
        // Configurar botones de audio normales y especiales
        const buttons = document.querySelectorAll('.audio-btn, .audio-button');
        if (!buttons.length) {
            console.warn("No se encontraron botones de audio");
            return;
        }

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita eventos duplicados
                
                const audioId = btn.getAttribute('data-audio');
                if (audioId) {
                    this.playAudio(audioId, btn);
                } else {
                    // Para compatibilidad con botones antiguos
                    const word = btn.closest('.vocab-card')?.querySelector('.quechua')?.textContent;
                    console.log(`Reproduciendo: ${word}`);
                }
            });
        });

        // Configurar imágenes interactivas con audio
        document.querySelectorAll('.interactive-image[data-audio]').forEach(img => {
            img.addEventListener('click', (e) => {
                const audioId = img.getAttribute('data-audio');
                this.playAudio(audioId);
            });
        });
    }

    playAudio(audioId, buttonElement = null) {
        // Pausar todos los audios primero
        document.querySelectorAll('audio').forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });

        // Obtener el elemento de audio (usando caché si está disponible)
        let audioElement = this.audioElements[audioId];
        if (!audioElement) {
            audioElement = document.getElementById(audioId);
            if (audioElement) {
                this.audioElements[audioId] = audioElement;
            }
        }

        if (audioElement) {
            // Intentar reproducir el audio
            audioElement.play().catch(error => {
                console.error("Error al reproducir audio:", error);
                
                // Mostrar feedback al usuario solo si es un botón
                if (buttonElement) {
                    buttonElement.textContent = "❌ Error";
                    setTimeout(() => {
                        buttonElement.textContent = "🔊";
                    }, 2000);
                }
            });

            // Animación del botón si existe
            if (buttonElement) {
                buttonElement.classList.add('playing');
                audioElement.onended = () => {
                    buttonElement.classList.remove('playing');
                };
            }
        } else {
            console.warn(`Elemento de audio no encontrado: ${audioId}`);
        }
    }
  }
  
  // Inicialización
  document.addEventListener('DOMContentLoaded', () => {
    const ejercicios = window.ejercicios || []; // Cargar ejercicios externos
    new ExerciseManager(ejercicios);
  });
  