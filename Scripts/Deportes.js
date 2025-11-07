
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


// 🎮 CONFIGURACIÓN DE JUGADORES - 22 jugadores
const players = [
    // Fila 1 (Dorsales 1-7)
    { dorsal: 1, name: "Juan Pérez", position: "Portero", photo: "https://via.placeholder.com/300x400/4CAF50/ffffff?text=Jugador+1" },
    { dorsal: 2, name: "Carlos López", position: "Defensa", photo: "https://via.placeholder.com/300x400/2196F3/ffffff?text=Jugador+2" },
    { dorsal: 3, name: "Miguel Sánchez", position: "Defensa", photo: "https://via.placeholder.com/300x400/2196F3/ffffff?text=Jugador+3" },
    { dorsal: 4, name: "David Martínez", position: "Defensa", photo: "https://via.placeholder.com/300x400/2196F3/ffffff?text=Jugador+4" },
    { dorsal: 5, name: "Roberto García", position: "Defensa", photo: "https://via.placeholder.com/300x400/2196F3/ffffff?text=Jugador+5" },
    { dorsal: 6, name: "Antonio Ruiz", position: "Centrocampista", photo: "https://via.placeholder.com/300x400/FF9800/ffffff?text=Jugador+6" },
    { dorsal: 7, name: "Luis Fernández", position: "Delantero", photo: "https://via.placeholder.com/300x400/F44336/ffffff?text=Jugador+7" },
    
    // Fila 2 (Dorsales 8-14)
    { dorsal: 8, name: "José Torres", position: "Centrocampista", photo: "https://via.placeholder.com/300x400/FF9800/ffffff?text=Jugador+8" },
    { dorsal: 9, name: "Manuel Díaz", position: "Delantero", photo: "https://via.placeholder.com/300x400/F44336/ffffff?text=Jugador+9" },
    { dorsal: 10, name: "Francisco Moreno", position: "Centrocampista", photo: "https://via.placeholder.com/300x400/FF9800/ffffff?text=Jugador+10" },
    { dorsal: 11, name: "Javier Álvarez", position: "Delantero", photo: "https://via.placeholder.com/300x400/F44336/ffffff?text=Jugador+11" },
    { dorsal: 12, name: "Pedro Romero", position: "Portero", photo: "https://via.placeholder.com/300x400/4CAF50/ffffff?text=Jugador+12" },
    { dorsal: 13, name: "Sergio Jiménez", position: "Defensa", photo: "https://via.placeholder.com/300x400/2196F3/ffffff?text=Jugador+13" },
    { dorsal: 14, name: "Rafael Muñoz", position: "Centrocampista", photo: "https://via.placeholder.com/300x400/FF9800/ffffff?text=Jugador+14" },
    
    // Fila 3 (Dorsales 15-21)
    { dorsal: 15, name: "Daniel Castro", position: "Defensa", photo: "https://via.placeholder.com/300x400/2196F3/ffffff?text=Jugador+15" },
    { dorsal: 16, name: "Pablo Ortiz", position: "Centrocampista", photo: "https://via.placeholder.com/300x400/FF9800/ffffff?text=Jugador+16" },
    { dorsal: 17, name: "Andrés Navarro", position: "Centrocampista", photo: "https://via.placeholder.com/300x400/FF9800/ffffff?text=Jugador+17" },
    { dorsal: 18, name: "Marcos Delgado", position: "Defensa", photo: "https://via.placeholder.com/300x400/2196F3/ffffff?text=Jugador+18" },
    { dorsal: 19, name: "Alberto Vega", position: "Delantero", photo: "https://via.placeholder.com/300x400/F44336/ffffff?text=Jugador+19" },
    { dorsal: 20, name: "Hugo Ramos", position: "Centrocampista", photo: "https://via.placeholder.com/300x400/FF9800/ffffff?text=Jugador+20" },
    { dorsal: 21, name: "Óscar Gil", position: "Delantero", photo: "https://via.placeholder.com/300x400/F44336/ffffff?text=Jugador+21" },
    
    // Fila 4 (Dorsal 22)
    { dorsal: 22, name: "Fernando Ortega", position: "Delantero", photo: "https://via.placeholder.com/300x400/F44336/ffffff?text=Jugador+22" }
];

// 🎨 Función para crear una carta
function createCard(player) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    
    const flip = document.createElement('div');
    flip.className = 'card-flip';
    
    // Front face
    const front = document.createElement('div');
    front.className = 'card-face card-front';
    front.innerHTML = `
        <div class="dorsal-number">${player.dorsal}</div>
        <div class="jersey-icon">👕</div>
    `;
    
    // Back face
    const back = document.createElement('div');
    back.className = 'card-face card-back';
    back.innerHTML = `
        <img src="${player.photo}" alt="${player.name}" class="player-photo">
        <div class="player-info">
            <div class="player-name">${player.name}</div>
            <div class="player-position">${player.position}</div>
        </div>
    `;
    
    flip.appendChild(front);
    flip.appendChild(back);
    wrapper.appendChild(flip);
    
    // Event listener SIMPLE y DIRECTO
    wrapper.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('flipped');
    }, false);
    
    return wrapper;
}

// 🚀 Inicializar las cartas
function initCards() {
    const container = document.getElementById('cardsContainer');
    if (!container) {
        console.error('❌ No se encontró el contenedor #cardsContainer');
        return;
    }
    
    // Limpiar
    container.innerHTML = '';
    
    // Crear fragment para mejor performance
    const fragment = document.createDocumentFragment();
    
    players.forEach(player => {
        const card = createCard(player);
        fragment.appendChild(card);
    });
    
    container.appendChild(fragment);
    
    console.log(`✅ ${players.length} cartas creadas exitosamente`);
}

// 🎮 FUNCIONES ÚTILES PARA LA CONSOLA

window.flipAll = function() {
    const cards = document.querySelectorAll('.card-wrapper');
    cards.forEach(card => card.classList.add('flipped'));
    console.log(`✅ ${cards.length} cartas volteadas`);
};

window.flipAllBack = function() {
    const cards = document.querySelectorAll('.card-wrapper');
    cards.forEach(card => card.classList.remove('flipped'));
    console.log(`✅ ${cards.length} cartas volteadas de vuelta`);
};

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

window.changePlayerName = function(dorsal, newName) {
    const player = players.find(p => p.dorsal === dorsal);
    if (player) {
        player.name = newName;
        initCards();
        console.log(`✅ Nombre del jugador ${dorsal} actualizado a "${newName}"`);
    } else {
        console.log(`❌ Jugador con dorsal ${dorsal} no encontrado`);
    }
};

window.changePlayerPosition = function(dorsal, newPosition) {
    const player = players.find(p => p.dorsal === dorsal);
    if (player) {
        player.position = newPosition;
        initCards();
        console.log(`✅ Posición del jugador ${dorsal} actualizada a "${newPosition}"`);
    } else {
        console.log(`❌ Jugador con dorsal ${dorsal} no encontrado`);
    }
};

window.showAllPlayers = function() {
    console.table(players);
};

// Inicializar INMEDIATAMENTE
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCards);
} else {
    // Si el DOM ya está listo, ejecutar inmediatamente
    initCards();
}

console.log(`
🎮 COMANDOS DISPONIBLES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
flipAll()                      - Voltea todas las cartas
flipAllBack()                  - Voltea todas de vuelta
changePlayerPhoto(dorsal, url) - Cambia foto
changePlayerName(dorsal, name) - Cambia nombre
changePlayerPosition(dorsal, pos) - Cambia posición
showAllPlayers()               - Muestra tabla
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);