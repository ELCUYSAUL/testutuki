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
      const nextBtn = document.getElementById('next-btn');
      const prevBtn = document.getElementById('prev-btn');
      
      if (nextBtn) nextBtn.addEventListener('click', () => this.next());
      if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
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
      } else {
        this.nextLesson();
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
      
      if (!prevBtn || !nextBtn) return;
      
      prevBtn.disabled = index === 0;
      nextBtn.textContent = index === this.topics.length - 1 ? "Finalizar" : "Siguiente →";
    }

    showFinalScreen() {
      const finalScreen = document.getElementById('final-screen');
      if (finalScreen) {
        finalScreen.style.display = 'block';
      }
    }

    updateProgress(index) {
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        const progress = ((index + 1) / this.topics.length) * 100;
        progressBar.style.width = `${progress}%`;
      }
    }
  
    nextLesson() {
      // Obtener la ruta base del proyecto
      const basePath = window.location.href.includes('phases/A1/levels') 
        ? '../../../' 
        : window.location.href.includes('phases/A1') 
          ? '../../' 
          : './';
      
      // Redirección a phase.html
      window.location.href = `${basePath}phases/A1/phase.html`;
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.topic-card')) {
    new LessonController();
  }
});