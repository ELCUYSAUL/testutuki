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
        // Obtener la ruta actual
        const currentPath = window.location.pathname;
        
        // Extraer partes importantes de la ruta:
        // 1. El idioma (quechua, aymara, etc.)
        // 2. El nivel (A1, A2, B1, etc.)
        const pathParts = currentPath.split('/');
        const phasesIndex = pathParts.findIndex(part => part.startsWith('phases-'));
        const language = phasesIndex !== -1 ? pathParts[phasesIndex].replace('phases-', '') : 'quechua';
        const level = phasesIndex !== -1 && pathParts.length > phasesIndex + 1 ? pathParts[phasesIndex + 1] : 'A1';
        
        // Construir la nueva ruta relativa
        // Subimos hasta la carpeta del nivel (eliminando /levels/...)
        const basePathParts = pathParts.slice(0, phasesIndex + 2);
        const newPath = [...basePathParts, 'phase.html'].join('/');
        
        // Redirección a phase.html
        window.location.href = newPath;
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.topic-card')) {
    new LessonController();
  }
});