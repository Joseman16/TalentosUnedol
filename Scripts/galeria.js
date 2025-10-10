const gallery3d = document.getElementById('gallery3d');
const progressDots = document.querySelectorAll('.progress-dot');
const sceneContainer = document.querySelector('.scene-container');
const layerButtons = document.querySelectorAll('.layer-btn');
const layer1 = document.querySelector('.layer-1');
const layer2 = document.querySelector('.layer-2');
const layer3 = document.querySelector('.layer-3');

let scrollProgress = 0;
let mouseX = 0;
let mouseY = 0;
let currentMouseX = 0;
let currentMouseY = 0;

// Posiciones originales de las capas (Capa 1 al frente)
const originalPositions = {
    layer1: 300,
    layer2: 0,
    layer3: -300
};

let currentPositions = { ...originalPositions };

// Control de capas con botones
layerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const layerNum = btn.dataset.layer;
        
        // Remover active de todos los botones
        layerButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Configurar posiciones para traer la capa seleccionada al frente
        if (layerNum === '1') {
            currentPositions = {
                layer1: 300,
                layer2: 0,
                layer3: -300
            };
        } else if (layerNum === '2') {
            currentPositions = {
                layer1: -200,
                layer2: 300,
                layer3: 0
            };
        } else if (layerNum === '3') {
            currentPositions = {
                layer1: -300,
                layer2: 0,
                layer3: 300
            };
        }

        updateLayerPositions();
    });
});

// Función para actualizar posiciones de capas
function updateLayerPositions() {
    layer1.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    layer2.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    layer3.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

    layer1.style.transform = `translateZ(${currentPositions.layer1}px)`;
    layer2.style.transform = `translateZ(${currentPositions.layer2}px)`;
    layer3.style.transform = `translateZ(${currentPositions.layer3}px)`;
}

// Resetear capas a posición original (Capa 1 al frente)
function resetLayers() {
    currentPositions = { ...originalPositions };
    updateLayerPositions();
    
    // Marcar el botón de capa 1 como activo (posición inicial)
    layerButtons.forEach(b => b.classList.remove('active'));
    layerButtons[0].classList.add('active');
}

// Efecto parallax con scroll
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const maxScroll = sceneContainer.offsetHeight - window.innerHeight;
    scrollProgress = Math.min(scrollTop / maxScroll, 1);

    // Rotar toda la galería basado en el scroll
    const rotateX = scrollProgress * 45 - 22.5;
    const rotateY = scrollProgress * 30 - 15;
    
    gallery3d.style.transform = `
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        translateZ(${scrollProgress * -300}px)
    `;

    // Actualizar indicador de progreso
    progressDots.forEach((dot, index) => {
        if (scrollProgress > index / 3) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
});

// Efecto 3D con movimiento del mouse
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Animación suave del mouse
function animate() {
    currentMouseX += (mouseX - currentMouseX) * 0.05;
    currentMouseY += (mouseY - currentMouseY) * 0.05;

    const rotateY = currentMouseX * 25;
    const rotateX = -currentMouseY * 25;

    gallery3d.style.transform = `
        rotateX(${rotateX + (scrollProgress * 45 - 22.5)}deg) 
        rotateY(${rotateY + (scrollProgress * 30 - 15)}deg)
        translateZ(${scrollProgress * -300}px)
    `;

    requestAnimationFrame(animate);
}

animate();

// Efecto de entrada inicial
window.addEventListener('load', () => {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateZ(-200px) scale(0.8)';
        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateZ(0) scale(1)';
        }, index * 100);
    });
});