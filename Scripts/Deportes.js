
// ANIMACIÓN 3D DE LA GALERÍA DE DEPORTES
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-container img');
    
    images.forEach((image, index) => {
        const spreadFactor = 3.5;
        const maxLeft = (window.innerWidth * 0.5 / 16) * spreadFactor;
        const left = -Math.random() * maxLeft + 'rem';
        const maxRight = (window.innerWidth * 0.5 / 16) * spreadFactor;
        const right = -Math.random() * maxRight + 'rem';
        const verticalOffset = (Math.random() - 0.5) * 4;
        
        image.style.setProperty('--left', left);
        image.style.setProperty('--right', right);
        image.style.setProperty('--vertical-offset', `${verticalOffset}rem`);
    });

    const galleryContainer = document.querySelector('.gallery-container');
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animateGallery() {
        currentX += (mouseX - currentX) * 0.02;
        currentY += (mouseY - currentY) * 0.02;

        galleryContainer.style.transform = `
            rotateY(${currentX * 2}deg) 
            rotateX(${-currentY * 2}deg)
        `;

        requestAnimationFrame(animateGallery);
    }

    animateGallery();

    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.filter = 'brightness(1.2) contrast(1.1)';
            this.style.boxShadow = '0 0 50px rgba(186, 166, 52, 0.9), 0 0 80px rgba(186, 166, 52, 0.5)';
            this.style.zIndex = '100';
        });

        image.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.filter = 'brightness(1) contrast(1)';
            this.style.boxShadow = '0 0 20px rgba(186, 166, 52, 0.3)';
            this.style.zIndex = '1';
        });
    });

    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '0';
    particlesContainer.style.overflow = 'hidden';
    document.querySelector('.gallery-section').appendChild(particlesContainer);

    class Particle {
        constructor() {
            this.element = document.createElement('div');
            this.reset();
            this.element.style.position = 'absolute';
            this.element.style.width = '2px';
            this.element.style.height = '2px';
            this.element.style.borderRadius = '50%';
            this.element.style.pointerEvents = 'none';
            this.element.style.willChange = 'transform, opacity';
            particlesContainer.appendChild(this.element);
        }

        reset() {
            this.x = Math.random() * window.innerWidth;
            this.y = window.innerHeight + Math.random() * 100;
            this.speed = Math.random() * 0.5 + 0.3;
            this.opacity = Math.random() * 0.4 + 0.2;
            this.size = Math.random() * 2 + 1;
            this.color = `rgba(186, 166, 52, ${this.opacity})`;
        }

        update() {
            this.y -= this.speed;
            
            if (this.y < -10) {
                this.reset();
            }

            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
            this.element.style.width = this.size + 'px';
            this.element.style.height = this.size + 'px';
            this.element.style.background = this.color;
            this.element.style.opacity = this.opacity;
        }
    }

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        particles.forEach(p => p.update());
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    document.querySelector('.gallery-section').addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.border = '2px solid rgba(186, 166, 52, 0.6)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '5';
        ripple.style.willChange = 'width, height, opacity';
        document.querySelector('.gallery-section').appendChild(ripple);

        let size = 0;
        const maxSize = 400;
        const speed = 8;

        function expandRipple() {
            size += speed;
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.opacity = 1 - (size / maxSize);

            if (size < maxSize) {
                requestAnimationFrame(expandRipple);
            } else {
                ripple.remove();
            }
        }

        expandRipple();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            images.forEach(img => img.style.animationPlayState = 'paused');
        } else {
            images.forEach(img => img.style.animationPlayState = 'running');
        }
    });
});

// ANIMACIÓN DEL CANVAS DE BURBUJAS EN EL HEADER
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const bubbles = [];
for (let i = 0; i < 15; i++) {
    bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
    });
}

function animateBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    bubbles.forEach(bubble => {
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;
        
        if (bubble.x < 0 || bubble.x > canvas.width) bubble.dx *= -1;
        if (bubble.y < 0 || bubble.y > canvas.height) bubble.dy *= -1;
        
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(186, 166, 52, 0.3)';
        ctx.fill();
    });
    
    requestAnimationFrame(animateBubbles);
}

animateBubbles();


// 🎮 CONFIGURACIÓN DE JUGADORES
// Aquí defines tus 21 jugadores con dorsal, nombre, posición y foto
const players = [
    // Fila 1 (Dorsales 1-7)
    { dorsal: 1, name: "Juan Pérez", position: "Portero", photo: "../img/imgDeporte/SeleccionF/j1.jpeg" },
    { dorsal: 2, name: "Carlos López", position: "Defensa", photo: "../img/imgDeporte/SeleccionF/j2.jpeg" },
    { dorsal: 3, name: "Miguel Sánchez", position: "Defensa", photo: "../img/imgDeporte/SeleccionF/j3.jpeg" },
    { dorsal: 4, name: "David Martínez", position: "Defensa", photo: "../img/imgDeporte/SeleccionF/j4.jpeg" },
    { dorsal: 5, name: "Roberto García", position: "Defensa", photo: "../img/imgDeporte/SeleccionF/j5.jpeg" },
    { dorsal: 6, name: "Antonio Ruiz", position: "Centrocampista", photo: "../img/imgDeporte/SeleccionF/j6.jpeg" },
    { dorsal: 7, name: "Luis Fernández", position: "Delantero", photo: "../img/imgDeporte/SeleccionF/j7.jpeg" },
    
    // Fila 2 (Dorsales 8-14)
    { dorsal: 8, name: "José Torres", position: "Centrocampista", photo: "../img/imgDeporte/SeleccionF/j8.jpeg" },
    { dorsal: 9, name: "Manuel Díaz", position: "Delantero", photo: "../img/imgDeporte/SeleccionF/j9.jpeg" },
    { dorsal: 10, name: "Francisco Moreno", position: "Centrocampista", photo: "../img/imgDeporte/SeleccionF/j10.jpeg" },
    { dorsal: 11, name: "Javier Álvarez", position: "Delantero", photo: "../img/imgDeporte/SeleccionF/j11.jpeg" },
    { dorsal: 12, name: "Pedro Romero", position: "Portero", photo: "../img/imgDeporte/SeleccionF/j12.jpeg" },
    { dorsal: 13, name: "Sergio Jiménez", position: "Defensa", photo: "../img/imgDeporte/SeleccionF/j13.jpeg" },
    { dorsal: 14, name: "Rafael Muñoz", position: "Centrocampista", photo: "../img/imgDeporte/SeleccionF/j14.jpeg" },
    
    // Fila 3 (Dorsales 15-21)
    { dorsal: 15, name: "Daniel Castro", position: "Defensa", photo: "../img/imgDeporte/SeleccionF/j15.jpeg" },
    { dorsal: 16, name: "Pablo Ortiz", position: "Centrocampista", photo: "../img/imgDeporte/SeleccionF/j16.jpeg" },
    { dorsal: 17, name: "Andrés Navarro", position: "Centrocampista", photo: "../img/imgDeporte/SeleccionF/j17.jpeg" },
    { dorsal: 18, name: "Marcos Delgado", position: "Defensa", photo: "../img/imgDeporte/SeleccionF/j18.jpeg" },
    { dorsal: 19, name: "Alberto Vega", position: "Delantero", photo: "../img/imgDeporte/SeleccionF/j19.jpeg" },
    { dorsal: 20, name: "Hugo Ramos", position: "Centrocampista", photo: "../img/imgDeporte/SeleccionF/j20.jpeg" },
    { dorsal: 21, name: "Óscar Gil", position: "Delantero", photo: "../img/imgDeporte/SeleccionF/dt.jpg" }
];

// 🎨 Función para crear una carta
function createCard(player) {
    return `
        <div class="card-wrapper" onclick="this.classList.toggle('flipped')">
            <div class="card-flip">
                <!-- Front: Dorsal -->
                <div class="card-face card-front">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjY2At-krBPlY6tZY_pJjhLdP84SxRPeT3bXz6inmLuDWNgMt_c18NSSHIKtaHj-un_088EYJNl84nQoOAr_SISSYN1U8D_P3R75DRh4Hq-ucJP3DQX-CAwHqJFEQPNuVbuqJKe3GH74C4/s1600/27935292_10212115175129067_1206392255_n.png" 
                         alt="Logo UNEDOL" 
                         class="college-logo">
                    <div class="dorsal-number">${player.dorsal}</div>
                    <div class="jersey-icon">⚽</div>
                </div>
                
                <!-- Back: Player Info -->
                <div class="card-face card-back">
                    <img src="${player.photo}" alt="${player.name}" class="player-photo">
                    <div class="player-info">
                        <div class="player-name">${player.name}</div>
                        <div class="player-position">${player.position}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 🚀 Inicializar las cartas
function initCards() {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = players.map(player => createCard(player)).join('');
}

// Inicializar al cargar la página
initCards();

// 🎮 FUNCIONES ÚTILES PARA LA CONSOLA

// Voltear todas las cartas
window.flipAll = function() {
    document.querySelectorAll('.card-wrapper').forEach(card => {
        card.classList.add('flipped');
    });
};

// Voltear todas de vuelta
window.flipAllBack = function() {
    document.querySelectorAll('.card-wrapper').forEach(card => {
        card.classList.remove('flipped');
    });
};

// Cambiar foto de un jugador
window.changePlayerPhoto = function(dorsal, newPhotoUrl) {
    const player = players.find(p => p.dorsal === dorsal);
    if (player) {
        player.photo = newPhotoUrl;
        initCards();
        console.log(`✅ Foto del jugador ${dorsal} actualizada`);
    } else {
        console.log(`❌ Jugador con dorsal ${dorsal} no encontrado`);
    }
};

console.log('⚽ Sistema de cartas iniciado');
console.log('📋 Funciones disponibles:');
console.log('   flipAll() - Voltea todas las cartas');
console.log('   flipAllBack() - Devuelve todas las cartas');
console.log('   changePlayerPhoto(dorsal, url) - Cambia la foto de un jugador');
console.log('');
console.log('🎨 Para cambiar fotos, edita el array "players" en el código');


class AccordionSlider {
    constructor() {
        this.slides = document.querySelectorAll(".slide");
        this.prevBtn = document.querySelector(".nav-prev");
        this.nextBtn = document.querySelector(".nav-next");
        this.currentIndex = -1;
        this.init();
    }
    
    init() {
        this.slides.forEach((slide, index) => {
            slide.addEventListener("click", () => this.setActiveSlide(index));
        });
        
        this.prevBtn.addEventListener("click", () => this.previousSlide());
        this.nextBtn.addEventListener("click", () => this.nextSlide());
        
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.previousSlide();
            if (e.key === "ArrowRight") this.nextSlide();
        });
    }
    
    setActiveSlide(index) {
        if (this.currentIndex === index) {
            this.slides.forEach((slide) => slide.classList.remove("active"));
            this.currentIndex = -1;
        } else {
            this.slides.forEach((slide) => slide.classList.remove("active"));
            this.slides[index].classList.add("active");
            this.currentIndex = index;
        }
    }
    
    nextSlide() {
        const nextIndex = this.currentIndex === -1 ? 0 : (this.currentIndex + 1) % this.slides.length;
        this.setActiveSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = this.currentIndex === -1 ? this.slides.length - 1 : (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.setActiveSlide(prevIndex);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new AccordionSlider();
});