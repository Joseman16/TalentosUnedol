
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

/******************* ANIMACIÓN CARRUSEL *******************/

class MzaCarousel {
    constructor(root, opts = {}) {
        this.root = root;
        this.viewport = root.querySelector(".mzaCarousel-viewport");
        this.track = root.querySelector(".mzaCarousel-track");
        this.slides = Array.from(root.querySelectorAll(".mzaCarousel-slide"));
        this.prevBtn = root.querySelector(".mzaCarousel-prev");
        this.nextBtn = root.querySelector(".mzaCarousel-next");
        this.pagination = root.querySelector(".mzaCarousel-pagination");
        this.progressBar = root.querySelector(".mzaCarousel-progressBar");
        this.n = this.slides.length;
        
        this.state = {
            index: 0,
            pos: 0,
            width: 0,
            height: 0,
            gap: 28,
            dragging: false,
            pointerId: null,
            x0: 0,
            v: 0,
            t0: 0,
            animating: false,
            hovering: false,
            startTime: 0,
            pausedAt: 0
        };
        
        this.opts = Object.assign({
            gap: 28,
            peek: 0.15,
            rotateY: 34,
            zDepth: 150,
            scaleDrop: 0.09,
            blurMax: 2.0,
            activeLeftBias: 0.12,
            interval: 4500,
            transitionMs: 900,
            keyboard: true
        }, opts);
        
        this._init();
    }
    
    _init() {
        this._setupDots();
        this._bind();
        this._measure();
        this.goTo(0, false);
        this._startCycle();
        this._loop();
    }
    
    _setupDots() {
        this.pagination.innerHTML = "";
        this.dots = this.slides.map((_, i) => {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "mzaCarousel-dot";
            b.setAttribute("aria-label", `Go to slide ${i + 1}`);
            b.addEventListener("click", () => this.goTo(i));
            this.pagination.appendChild(b);
            return b;
        });
    }
    
    _bind() {
        this.prevBtn.addEventListener("click", () => this.prev());
        this.nextBtn.addEventListener("click", () => this.next());
        
        if (this.opts.keyboard) {
            this.root.addEventListener("keydown", (e) => {
                if (e.key === "ArrowLeft") this.prev();
                if (e.key === "ArrowRight") this.next();
            });
        }
        
        const pe = this.viewport;
        pe.addEventListener("pointerdown", (e) => this._onDragStart(e));
        pe.addEventListener("pointermove", (e) => this._onDragMove(e));
        pe.addEventListener("pointerup", (e) => this._onDragEnd(e));
        pe.addEventListener("pointercancel", (e) => this._onDragEnd(e));
        
        this.root.addEventListener("mouseenter", () => {
            this.state.hovering = true;
            this.state.pausedAt = performance.now();
        });
        
        this.root.addEventListener("mouseleave", () => {
            if (this.state.pausedAt) {
                this.state.startTime += performance.now() - this.state.pausedAt;
                this.state.pausedAt = 0;
            }
            this.state.hovering = false;
        });
        
        this.ro = new ResizeObserver(() => this._measure());
        this.ro.observe(this.viewport);
        
        this.viewport.addEventListener("pointermove", (e) => this._onTilt(e));
    }
    
    _measure() {
        const viewRect = this.viewport.getBoundingClientRect();
        this.state.width = viewRect.width;
        this.state.height = viewRect.height;
        this.slideW = Math.min(880, this.state.width * 0.7);
    }
    
    _onTilt(e) {
        const r = this.viewport.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width - 0.5;
        const my = (e.clientY - r.top) / r.height - 0.5;
        this.root.style.setProperty("--mzaTiltX", (my * -6).toFixed(3));
        this.root.style.setProperty("--mzaTiltY", (mx * 6).toFixed(3));
    }
    
    _onDragStart(e) {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.preventDefault();
        this.state.dragging = true;
        this.state.pointerId = e.pointerId;
        this.viewport.setPointerCapture(e.pointerId);
        this.state.x0 = e.clientX;
        this.state.t0 = performance.now();
        this.state.v = 0;
        this.state.pausedAt = performance.now();
    }
    
    _onDragMove(e) {
        if (!this.state.dragging || e.pointerId !== this.state.pointerId) return;
        const dx = e.clientX - this.state.x0;
        const dt = Math.max(16, performance.now() - this.state.t0);
        this.state.v = dx / dt;
        const slideSpan = this.slideW + this.state.gap;
        this.state.pos = this._mod(this.state.index - dx / slideSpan, this.n);
        this._render();
    }
    
    _onDragEnd(e) {
        if (!this.state.dragging || (e && e.pointerId !== this.state.pointerId)) return;
        this.state.dragging = false;
        try {
            if (this.state.pointerId != null) this.viewport.releasePointerCapture(this.state.pointerId);
        } catch {}
        this.state.pointerId = null;
        if (this.state.pausedAt) {
            this.state.startTime += performance.now() - this.state.pausedAt;
            this.state.pausedAt = 0;
        }
        const v = this.state.v;
        const threshold = 0.18;
        let target = Math.round(this.state.pos - Math.sign(v) * (Math.abs(v) > threshold ? 0.5 : 0));
        this.goTo(this._mod(target, this.n));
    }
    
    _startCycle() {
        this.state.startTime = performance.now();
        this._renderProgress(0);
    }
    
    _loop() {
        const step = (t) => {
            if (!this.state.dragging && !this.state.hovering && !this.state.animating) {
                const elapsed = t - this.state.startTime;
                const p = Math.min(1, elapsed / this.opts.interval);
                this._renderProgress(p);
                if (elapsed >= this.opts.interval) this.next();
            }
            requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }
    
    _renderProgress(p) {
        this.progressBar.style.transform = `scaleX(${p})`;
    }
    
    prev() {
        this.goTo(this._mod(this.state.index - 1, this.n));
    }
    
    next() {
        this.goTo(this._mod(this.state.index + 1, this.n));
    }
    
    goTo(i, animate = true) {
        const start = this.state.pos || this.state.index;
        const end = this._nearest(start, i);
        const dur = animate ? this.opts.transitionMs : 0;
        const t0 = performance.now();
        const ease = (x) => 1 - Math.pow(1 - x, 4);
        this.state.animating = true;
        
        const step = (now) => {
            const t = Math.min(1, (now - t0) / dur);
            const p = dur ? ease(t) : 1;
            this.state.pos = start + (end - start) * p;
            this._render();
            if (t < 1) requestAnimationFrame(step);
            else this._afterSnap(i);
        };
        requestAnimationFrame(step);
    }
    
    _afterSnap(i) {
        this.state.index = this._mod(Math.round(this.state.pos), this.n);
        this.state.pos = this.state.index;
        this.state.animating = false;
        this._render(true);
        this._startCycle();
    }
    
    _nearest(from, target) {
        let d = target - Math.round(from);
        if (d > this.n / 2) d -= this.n;
        if (d < -this.n / 2) d += this.n;
        return Math.round(from) + d;
    }
    
    _mod(i, n) {
        return ((i % n) + n) % n;
    }
    
    _render(markActive = false) {
        const span = this.slideW + this.state.gap;
        const tiltX = parseFloat(this.root.style.getPropertyValue("--mzaTiltX") || 0);
        const tiltY = parseFloat(this.root.style.getPropertyValue("--mzaTiltY") || 0);
        
        for (let i = 0; i < this.n; i++) {
            let d = i - this.state.pos;
            if (d > this.n / 2) d -= this.n;
            if (d < -this.n / 2) d += this.n;
            
            const weight = Math.max(0, 1 - Math.abs(d) * 2);
            const biasActive = -this.slideW * this.opts.activeLeftBias * weight;
            const tx = d * span + biasActive;
            const depth = -Math.abs(d) * this.opts.zDepth;
            const rot = -d * this.opts.rotateY;
            const scale = 1 - Math.min(Math.abs(d) * this.opts.scaleDrop, 0.42);
            const blur = Math.min(Math.abs(d) * this.opts.blurMax, this.opts.blurMax);
            const z = Math.round(1000 - Math.abs(d) * 10);
            
            const s = this.slides[i];
            s.style.transform = `translate3d(${tx}px,-50%,${depth}px) rotateY(${rot}deg) scale(${scale})`;
            s.style.filter = `blur(${blur}px)`;
            s.style.zIndex = z;
            
            if (markActive) s.dataset.state = Math.round(this.state.index) === i ? "active" : "rest";
            
            const card = s.querySelector(".mzaCard");
            const parBase = Math.max(-1, Math.min(1, -d));
            const parX = parBase * 48 + tiltY * 2.0;
            const parY = tiltX * -1.5;
            const bgX = parBase * -64 + tiltY * -2.4;
            
            card.style.setProperty("--mzaParX", `${parX.toFixed(2)}px`);
            card.style.setProperty("--mzaParY", `${parY.toFixed(2)}px`);
            card.style.setProperty("--mzaParBgX", `${bgX.toFixed(2)}px`);
            card.style.setProperty("--mzaParBgY", `${(parY * 0.35).toFixed(2)}px`);
        }
        
        const active = this._mod(Math.round(this.state.pos), this.n);
        this.dots.forEach((d, i) => d.setAttribute("aria-selected", i === active ? "true" : "false"));
    }
}

// Inicializar el carrusel
const carousel = new MzaCarousel(document.getElementById("mzaCarousel"), {
    transitionMs: 900
});
