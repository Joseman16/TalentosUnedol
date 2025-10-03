// Carrusel de Talentos Infinito
const track = document.getElementById('carruselTrack');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const dotsContainer = document.getElementById('carruselDots');

let currentIndex = 0;
let cardsPerView = 3;
const originalCards = Array.from(document.querySelectorAll('.talento-card'));
let totalCards = originalCards.length;
let isTransitioning = false;

// Clonar tarjetas para efecto infinito
function cloneCards() {
    // Limpiar clones existentes
    track.innerHTML = '';
    
    // Agregar clones al inicio
    for (let i = 0; i < cardsPerView; i++) {
        const clone = originalCards[originalCards.length - cardsPerView + i].cloneNode(true);
        clone.classList.add('clone');
        track.appendChild(clone);
    }
    
    // Agregar tarjetas originales
    originalCards.forEach(card => {
        track.appendChild(card);
    });
    
    // Agregar clones al final
    for (let i = 0; i < cardsPerView; i++) {
        const clone = originalCards[i].cloneNode(true);
        clone.classList.add('clone');
        track.appendChild(clone);
    }
    
    // Posicionar en el primer conjunto real
    currentIndex = cardsPerView;
    updateCarruselPosition(false);
}

// Calcular cuántas tarjetas mostrar según el ancho de pantalla
function updateCardsPerView() {
    const width = window.innerWidth;
    if (width <= 768) {
        cardsPerView = 1;
    } else if (width <= 1200) {
        cardsPerView = 2;
    } else {
        cardsPerView = 3;
    }
    cloneCards();
    createDots();
}

// Crear puntos indicadores
function createDots() {
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === (currentIndex - cardsPerView) % totalCards) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            if (!isTransitioning) {
                currentIndex = cardsPerView + i;
                updateCarruselPosition(true);
            }
        });
        dotsContainer.appendChild(dot);
    }
}

// Actualizar posición del carrusel
function updateCarruselPosition(animate = true) {
    const cards = track.querySelectorAll('.talento-card');
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth;
    const gap = 30;
    const offset = -(currentIndex * (cardWidth + gap));
    
    if (animate) {
        track.style.transition = 'transform 0.5s cubic-bezier(0.65, 0.05, 0.36, 1)';
    } else {
        track.style.transition = 'none';
    }
    
    track.style.transform = `translateX(${offset}px)`;
    
    // Actualizar dots
    updateDots();
}

// Actualizar puntos indicadores
function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    const realIndex = (currentIndex - cardsPerView) % totalCards;
    const adjustedIndex = realIndex < 0 ? totalCards + realIndex : realIndex;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === adjustedIndex);
    });
}

// Manejar loop infinito
function handleInfiniteLoop() {
    const allCards = track.querySelectorAll('.talento-card');
    const totalWithClones = allCards.length;
    
    // Si llegamos al final (clones finales)
    if (currentIndex >= totalWithClones - cardsPerView) {
        isTransitioning = true;
        setTimeout(() => {
            currentIndex = cardsPerView;
            updateCarruselPosition(false);
            isTransitioning = false;
        }, 500);
    }
    
    // Si llegamos al inicio (clones iniciales)
    if (currentIndex < cardsPerView) {
        isTransitioning = true;
        setTimeout(() => {
            currentIndex = totalWithClones - cardsPerView * 2;
            updateCarruselPosition(false);
            isTransitioning = false;
        }, 500);
    }
}

// Navegación siguiente
function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarruselPosition(true);
    setTimeout(() => {
        handleInfiniteLoop();
        isTransitioning = false;
    }, 500);
}

// Navegación anterior
function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarruselPosition(true);
    setTimeout(() => {
        handleInfiniteLoop();
        isTransitioning = false;
    }, 500);
}

// Navegación con botones
btnPrev.addEventListener('click', prevSlide);
btnNext.addEventListener('click', nextSlide);

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Soporte para gestos táctiles (swipe)
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe izquierda (siguiente)
            nextSlide();
        } else {
            // Swipe derecha (anterior)
            prevSlide();
        }
    }
}

// Auto-play (opcional)
let autoplayInterval;
let isAutoplayActive = true;

function startAutoplay() {
    if (isAutoplayActive) {
        autoplayInterval = setInterval(() => {
            nextSlide();
        }, 4000); // Cambia cada 4 segundos
    }
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

function toggleAutoplay() {
    stopAutoplay();
    setTimeout(() => {
        startAutoplay();
    }, 100);
}

// Pausar autoplay al interactuar
track.addEventListener('mouseenter', stopAutoplay);
track.addEventListener('mouseleave', () => {
    if (isAutoplayActive) startAutoplay();
});
btnPrev.addEventListener('click', toggleAutoplay);
btnNext.addEventListener('click', toggleAutoplay);

// Inicializar
window.addEventListener('load', () => {
    updateCardsPerView();
    startAutoplay(); // Descomentar si quieres autoplay
});

window.addEventListener('resize', () => {
    updateCardsPerView();
});