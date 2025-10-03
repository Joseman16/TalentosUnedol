const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');
const header = document.querySelector('.header');

// Ajustar tamaño del canvas
function resizeCanvas() {
    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Clase Burbuja
class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.4 + 0.3;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.05 + 0.02;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const colors = [
            'rgba(186, 166, 52, ',   // Dorado principal
            'rgba(212, 184, 80, ',   // Dorado claro
            'rgba(245, 244, 240, ',  // Crema
            'rgba(138, 120, 40, ',   // Dorado oscuro
            'rgba(255, 223, 126, ',  // Dorado brillante
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        // Movimiento ascendente
        this.y -= this.speedY;
        
        // Movimiento lateral ondulante
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.5 + this.speedX;

        // Reducir tamaño gradualmente (efecto de disolución)
        if (this.y < canvas.height * 0.3) {
            this.size *= 0.99;
            this.opacity *= 0.98;
        }

        // Reiniciar burbuja cuando sale de la pantalla o es muy pequeña
        if (this.y < -20 || this.size < 0.5 || this.opacity < 0.1) {
            this.y = canvas.height + Math.random() * 50;
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 8 + 4;
            this.opacity = Math.random() * 0.4 + 0.3;
            this.color = this.getRandomColor();
        }

        // Mantener dentro de los límites horizontales
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
    }

    draw() {
        ctx.save();

        // Burbuja principal
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Gradiente radial para efecto 3D
        const gradient = ctx.createRadialGradient(
            this.x - this.size * 0.3,
            this.y - this.size * 0.3,
            0,
            this.x,
            this.y,
            this.size
        );
        gradient.addColorStop(0, this.color + (this.opacity * 0.8) + ')');
        gradient.addColorStop(0.5, this.color + (this.opacity * 0.4) + ')');
        gradient.addColorStop(1, this.color + (this.opacity * 0.1) + ')');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Borde brillante
        ctx.strokeStyle = this.color + (this.opacity * 0.6) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Reflejo de luz (punto brillante)
        ctx.beginPath();
        ctx.arc(
            this.x - this.size * 0.35,
            this.y - this.size * 0.35,
            this.size * 0.25,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (this.opacity * 0.8) + ')';
        ctx.fill();

        // Segundo reflejo más pequeño
        ctx.beginPath();
        ctx.arc(
            this.x + this.size * 0.25,
            this.y + this.size * 0.25,
            this.size * 0.15,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (this.opacity * 0.4) + ')';
        ctx.fill();

        ctx.restore();
    }
}

// Crear burbujas
const bubbles = [];
const numberOfBubbles = 25;

for (let i = 0; i < numberOfBubbles; i++) {
    // Distribuir las burbujas en diferentes alturas iniciales
    const bubble = new Bubble();
    bubble.y = canvas.height + Math.random() * canvas.height;
    bubbles.push(bubble);
}

// Animación
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
    });

    requestAnimationFrame(animate);
}

animate();