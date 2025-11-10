(function() {
    'use strict';

    let currentIndex = 0;
    let cards = [];
    let dots = [];
    let totalCards = 0;

    /**
     * Inicializar elementos del DOM
     */
    function initElements() {
        cards = document.querySelectorAll('.card');
        dots = document.querySelectorAll('.dot');
        totalCards = cards.length;

        if (totalCards === 0) {
            console.warn('⚠️ No se encontraron tarjetas en el carrusel');
            return false;
        }

        console.log(`✨ Carrusel iniciado con ${totalCards} tarjetas`);
        return true;
    }

    /**
     * Actualizar información de la obra actual
     */
    function updateArtInfo() {
        const currentCard = cards[currentIndex];
        const title = currentCard.getAttribute('data-title');
        const subtitle = currentCard.getAttribute('data-subtitle');
        
        const titleElement = document.getElementById('art-title');
        const subtitleElement = document.getElementById('art-subtitle');
        
        if (titleElement && title) {
            titleElement.textContent = title;
        }
        
        if (subtitleElement && subtitle) {
            subtitleElement.textContent = subtitle;
        }
    }

    /**
     * Actualizar posiciones de las tarjetas
     */
    function updateCarousel() {
        cards.forEach((card, index) => {
            // Remover todas las clases de posición
            card.classList.remove('center', 'up-1', 'up-2', 'down-1', 'down-2', 'hidden');

            // Calcular posición relativa
            const diff = index - currentIndex;

            // Asignar clase según la posición
            if (diff === 0) {
                card.classList.add('center');
            } else if (diff === -1 || diff === totalCards - 1) {
                card.classList.add('up-1');
            } else if (diff === -2 || diff === totalCards - 2) {
                card.classList.add('up-2');
            } else if (diff === 1 || diff === -(totalCards - 1)) {
                card.classList.add('down-1');
            } else if (diff === 2 || diff === -(totalCards - 2)) {
                card.classList.add('down-2');
            } else {
                card.classList.add('hidden');
            }
        });

        // Actualizar dots e información
        updateDots();
        updateArtInfo();
    }

    /**
     * Actualizar indicadores (dots)
     */
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /**
     * Navegar hacia arriba
     */
    function navigateUp() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    /**
     * Navegar hacia abajo
     */
    function navigateDown() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    /**
     * Ir a un índice específico
     */
    function goToIndex(index) {
        currentIndex = index;
        updateCarousel();
    }

    /**
     * Configurar eventos
     */
    function setupEvents() {
        // Botones de navegación
        const upButtons = document.querySelectorAll('.nav-arrow.up');
        const downButtons = document.querySelectorAll('.nav-arrow.down');

        upButtons.forEach(btn => {
            btn.addEventListener('click', navigateUp);
        });

        downButtons.forEach(btn => {
            btn.addEventListener('click', navigateDown);
        });

        // Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToIndex(index));
        });

        // Click en tarjetas
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (index !== currentIndex) {
                    goToIndex(index);
                }
            });
        });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                navigateUp();
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                navigateDown();
            }
        });

        // Navegación con scroll (opcional)
        let scrollTimeout;
        const carouselContainer = document.querySelector('.carousel-container');
        
        if (carouselContainer) {
            carouselContainer.addEventListener('wheel', (e) => {
                e.preventDefault();
                
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    if (e.deltaY > 0) {
                        navigateDown();
                    } else {
                        navigateUp();
                    }
                }, 50);
            }, { passive: false });
        }

        // Touch/swipe support
        let touchStartY = 0;
        let touchEndY = 0;

        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            carouselContainer.addEventListener('touchend', (e) => {
                touchEndY = e.changedTouches[0].clientY;
                handleSwipe();
            }, { passive: true });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    navigateDown();
                } else {
                    navigateUp();
                }
            }
        }
    }

    /**
     * Inicialización principal
     */
    function init() {
        if (!initElements()) return;

        // Configurar carrusel inicial
        updateCarousel();

        // Configurar eventos
        setupEvents();

        console.log('🎨 Carrusel de Artes y Expresión listo');
        console.log('💡 Usa las flechas, teclado o scroll para navegar');
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// Este archivo JS es opcional, solo necesario si necesitas
// funcionalidad adicional o compatibilidad con navegadores antiguos

// Si necesitas pausar la rotación al hacer hover:
/*
const gallery = document.getElementById('gallery');
const images = gallery.querySelectorAll('img');

images.forEach(img => {
  img.addEventListener('mouseenter', () => {
    gallery.style.animationPlayState = 'paused';
  });
  
  img.addEventListener('mouseleave', () => {
    gallery.style.animationPlayState = 'running';
  });
});
*/