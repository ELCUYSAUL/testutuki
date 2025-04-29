class ExerciseManager {
    constructor(exercises = []) {
      this.exercises = exercises;
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
      const tooltip = document.getElementById('tooltip');
      document.querySelectorAll('[data-translation]').forEach(el => {
        el.addEventListener('click', (e) => {
          tooltip.textContent = el.dataset.translation;
          tooltip.style.left = `${e.pageX}px`;
          tooltip.style.top = `${e.pageY}px`;
          tooltip.style.opacity = '1';
          
          setTimeout(() => {
            tooltip.style.opacity = '0';
          }, 2000);
        });
      });
    }
  
    setupAudioButtons() {
      document.querySelectorAll('.audio-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const word = btn.closest('.vocab-card').querySelector('.quechua').textContent;
          console.log(`Reproduciendo: ${word}`);
        });
      });
    }
  }
  
  // Inicialización
  document.addEventListener('DOMContentLoaded', () => {
    const ejercicios = window.ejercicios || []; // Cargar ejercicios externos
    new ExerciseManager(ejercicios);
  });
  