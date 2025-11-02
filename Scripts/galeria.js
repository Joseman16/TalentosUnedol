// ============================================
// GALERÍA 3D - SISTEMA DE PARALLAX CON 5 CAPAS
// ============================================

(function() {
    'use strict';

    // Variables globales para la galería
    const gallery3d = document.getElementById('gallery3d');
    const progressDots = document.querySelectorAll('.progress-dot');
    const sceneContainer = document.querySelector('.scene-container');
    const layerButtons = document.querySelectorAll('.layer-btn');
    const resetBtn = document.getElementById('resetBtn');
    const layer1 = document.querySelector('.layer-1');
    const layer2 = document.querySelector('.layer-2');
    const layer3 = document.querySelector('.layer-3');
    const layer4 = document.querySelector('.layer-4');
    const layer5 = document.querySelector('.layer-5');

    // Verificar que los elementos existen
    if (!gallery3d || !sceneContainer) {
        console.warn('Elementos de galería no encontrados');
        return;
    }

    let scrollProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let rafId = null;

    // Posiciones originales de las 5 capas - MÁS PEQUEÑAS
    const originalPositions = {
        layer1: 320,
        layer2: 160,
        layer3: 0,
        layer4: -160,
        layer5: -320
    };

    let currentPositions = { ...originalPositions };

    // ============================================
    // CONTROL DE CAPAS CON BOTONES
    // ============================================

    layerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const layerNum = this.dataset.layer;
            
            // Remover clase active de todos los botones
            layerButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Configurar nuevas posiciones según la capa seleccionada
            switch(layerNum) {
                case '1':
                    currentPositions = { layer1: 320, layer2: 160, layer3: 0, layer4: -160, layer5: -320 };
                    break;
                case '2':
                    currentPositions = { layer1: 160, layer2: 320, layer3: 160, layer4: 0, layer5: -160 };
                    break;
                case '3':
                    currentPositions = { layer1: 0, layer2: 160, layer3: 320, layer4: 160, layer5: 0 };
                    break;
                case '4':
                    currentPositions = { layer1: -160, layer2: 0, layer3: 160, layer4: 320, layer5: 160 };
                    break;
                case '5':
                    currentPositions = { layer1: -320, layer2: -160, layer3: 0, layer4: 160, layer5: 320 };
                    break;
            }

            updateLayerPositions();
        });
    });

    // ============================================
    // ACTUALIZAR POSICIONES DE CAPAS
    // ============================================

    function updateLayerPositions() {
        if (!layer1 || !layer2 || !layer3 || !layer4 || !layer5) return;

        layer1.style.transform = `translateZ(${currentPositions.layer1}px)`;
        layer2.style.transform = `translateZ(${currentPositions.layer2}px)`;
        layer3.style.transform = `translateZ(${currentPositions.layer3}px)`;
        layer4.style.transform = `translateZ(${currentPositions.layer4}px)`;
        layer5.style.transform = `translateZ(${currentPositions.layer5}px)`;
    }

    // ============================================
    // RESETEAR CAPAS A POSICIÓN ORIGINAL
    // ============================================

    function resetLayers() {
        currentPositions = { ...originalPositions };
        updateLayerPositions();
        
        layerButtons.forEach(b => b.classList.remove('active'));
        if (layerButtons[0]) layerButtons[0].classList.add('active');
    }

    // Evento del botón resetear
    if (resetBtn) {
        resetBtn.addEventListener('click', resetLayers);
    }

    // ============================================
    // EFECTO PARALLAX CON SCROLL (OPTIMIZADO)
    // ============================================

    let ticking = false;

    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset;
                const maxScroll = sceneContainer.offsetHeight - window.innerHeight;
                scrollProgress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

                // Actualizar indicador de progreso (ahora con 5 puntos)
                progressDots.forEach((dot, index) => {
                    if (scrollProgress > index / 5) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ============================================
    // EFECTO 3D CON MOVIMIENTO DEL MOUSE
    // ============================================

    function handleMouseMove(e) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ============================================
    // ANIMACIÓN SUAVE (REQUESTANIMATIONFRAME)
    // ============================================

    function animate() {
        // Interpolación suave del movimiento del mouse
        currentMouseX += (mouseX - currentMouseX) * 0.05;
        currentMouseY += (mouseY - currentMouseY) * 0.05;

        // Calcular rotaciones basadas en mouse y scroll
        const rotateY = currentMouseX * 25;
        const rotateX = -currentMouseY * 25;
        const scrollRotateX = scrollProgress * 45 - 22.5;
        const scrollRotateY = scrollProgress * 30 - 15;

        // Aplicar transformación 3D
        gallery3d.style.transform = `
            rotateX(${rotateX + scrollRotateX}deg) 
            rotateY(${rotateY + scrollRotateY}deg)
            translateZ(${scrollProgress * -300}px)
        `;

        rafId = requestAnimationFrame(animate);
    }

    // Iniciar animación
    animate();

    // ============================================
    // LIMPIEZA AL SALIR DE LA PÁGINA
    // ============================================

    window.addEventListener('beforeunload', function() {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
    });

    // ============================================
    // LOG DE INICIALIZACIÓN
    // ============================================

    console.log('✅ Galería 3D con 5 capas inicializada correctamente');

})();