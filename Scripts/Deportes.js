// ANIMACIÓN 3D DE LA GALERÍA DE DEPORTES - VERSIÓN MEJORADA Y SUAVE
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-container img');
    
    // Configuración inicial de posiciones aleatorias con MUCHA mayor separación
    images.forEach((image, index) => {
        // Factor de separación mucho mayor
        const spreadFactor = 3.5;
        const maxLeft = (window.innerWidth * 0.5 / 16) * spreadFactor;
        const left = -Math.random() * maxLeft + 'rem';
        const maxRight = (window.innerWidth * 0.5 / 16) * spreadFactor;
        const right = -Math.random() * maxRight + 'rem';

        // Añadir separación vertical también
        const verticalOffset = (Math.random() - 0.5) * 4;
        
        image.style.setProperty('--left', left);
        image.style.setProperty('--right', right);
        image.style.setProperty('--vertical-offset', `${verticalOffset}rem`);
        
        // Añadir transición suave para evitar parpadeos
        image.style.transition = 'filter 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease';

        // Crear el efecto de estela de luz
        const trail = document.createElement('div');
        trail.className = 'image-trail';
        trail.style.position = 'absolute';
        trail.style.width = '20rem';
        trail.style.height = '100%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '-1';
        
        image.parentElement.insertBefore(trail, image);
        
        // Actualizar la estela constantemente
        setInterval(() => {
            const rect = image.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(image);
            const transform = computedStyle.getPropertyValue('transform');
            
            trail.style.left = image.style.left || '0';
            trail.style.right = image.style.right || '0';
            trail.style.top = '0';
            trail.style.transform = transform;
            trail.style.opacity = computedStyle.getPropertyValue('opacity');
            
            // Crear partículas de luz que quedan atrás
            if (Math.random() > 0.7) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.left = rect.left + rect.width / 2 + 'px';
                particle.style.top = rect.top + rect.height / 2 + 'px';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.borderRadius = '50%';
                particle.style.background = 'rgba(186, 166, 52, 0.8)';
                particle.style.boxShadow = '0 0 10px rgba(186, 166, 52, 0.8)';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '0';
                document.querySelector('.gallery-section').appendChild(particle);
                
                let opacity = 0.8;
                const fadeOut = setInterval(() => {
                    opacity -= 0.05;
                    particle.style.opacity = opacity;
                    if (opacity <= 0) {
                        clearInterval(fadeOut);
                        particle.remove();
                    }
                }, 50);
            }
        }, 100);
    });

    // Efecto de rotación MUY SUAVE al mover el mouse
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
        // Interpolación más lenta y suave (0.02 en lugar de 0.05)
        currentX += (mouseX - currentX) * 0.02;
        currentY += (mouseY - currentY) * 0.02;

        // Rotación más sutil (2deg en lugar de 5deg)
        galleryContainer.style.transform = `
            rotateY(${currentX * 2}deg) 
            rotateX(${-currentY * 2}deg)
        `;

        requestAnimationFrame(animateGallery);
    }

    animateGallery();

    // Efecto de brillo SUAVE al pasar el mouse sobre las imágenes
    images.forEach(image => {
        image.addEventListener('mouseenter', function() {
            // Pausa la animación para mejor control
            this.style.animationPlayState = 'paused';
            this.style.filter = 'brightness(1.2) contrast(1.1)';
            this.style.boxShadow = '0 0 50px rgba(186, 166, 52, 0.9), 0 0 80px rgba(186, 166, 52, 0.5)';
            this.style.zIndex = '100';
        });

        image.addEventListener('mouseleave', function() {
            // Reanuda la animación
            this.style.animationPlayState = 'running';
            this.style.filter = 'brightness(1) contrast(1)';
            this.style.boxShadow = '0 0 20px rgba(186, 166, 52, 0.3)';
            this.style.zIndex = '1';
        });
    });

    // Efecto de partículas suaves y estables
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
            this.speed = Math.random() * 0.5 + 0.3; // Velocidad más lenta
            this.opacity = Math.random() * 0.4 + 0.2;
            this.size = Math.random() * 2 + 1;
            
            // Color dorado consistente sin cambios
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
    // Menos partículas para mejor rendimiento (50 en lugar de 100)
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        particles.forEach(p => p.update());
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Efecto de ondas suaves al hacer clic
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
        const speed = 8; // Velocidad moderada

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

    // Optimización: pausar animaciones cuando la pestaña no está visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            images.forEach(img => img.style.animationPlayState = 'paused');
        } else {
            images.forEach(img => img.style.animationPlayState = 'running');
        }
    });
});