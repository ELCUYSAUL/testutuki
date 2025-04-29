class LessonController {
    constructor() {
      this.topics = document.querySelectorAll('.topic-card');
      this.currentTopic = 0;
      this.init();
    }
  
    init() {
      this.setupNavigation();
      this.setupLessonButtons();
      this.showTopic(0);
    }
  
    setupNavigation() {
      document.getElementById('next-btn').addEventListener('click', () => this.next());
      document.getElementById('prev-btn').addEventListener('click', () => this.prev());
    }
  
    setupLessonButtons() {
      const nextLessonBtn = document.querySelector('.next-lesson-btn');
      if (nextLessonBtn) {
        nextLessonBtn.addEventListener('click', () => this.nextLesson());
      }
    }
  
    next() {
      if (this.currentTopic < this.topics.length - 1) {
        this.currentTopic++;
        this.showTopic(this.currentTopic);
        
        // Mostrar pantalla final si es el último tema
        if (this.currentTopic === this.topics.length - 1) {
          this.showFinalScreen();
        }
      }
    }
  
    prev() {
      if (this.currentTopic > 0) {
        this.currentTopic--;
        this.showTopic(this.currentTopic);
      }
    }
  
    showTopic(index) {
      this.topics.forEach(topic => {
        topic.classList.remove('active');
        topic.style.display = 'none';
      });
      
      this.topics[index].classList.add('active');
      this.topics[index].style.display = 'block';
      
      this.updateNavigation(index);
      this.updateProgress(index);
    }
  
    updateNavigation(index) {
      const prevBtn = document.getElementById('prev-btn');
      const nextBtn = document.getElementById('next-btn');
      
      prevBtn.disabled = index === 0;
      
      const isLastTopic = index === this.topics.length - 1;
      nextBtn.style.display = isLastTopic ? 'none' : 'block';
      nextBtn.textContent = index === this.topics.length - 2 ? "Finalizar" : "Siguiente →";
    }
  
    showFinalScreen() {
      const finalScreen = document.getElementById('final-screen');
      if (finalScreen) {
        finalScreen.style.display = 'block';
      }
    }
  
    updateProgress(index) {
      const progress = ((index + 1) / this.topics.length) * 100;
      document.getElementById('progress-bar').style.width = `${progress}%`;
    }
  
    nextLesson() {
      console.log("Redirigiendo a siguiente lección...");
      // window.location.href = "2-intermedio.html"; // Descomenta esta línea
      alert("¡Próxima lección cargada!"); // Solo para prueba
    }
  }
  
  // Inicialización
  document.addEventListener('DOMContentLoaded', () => new LessonController());