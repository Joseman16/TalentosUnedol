// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const btnVerMas = document.querySelector('.btn-ver-mas');
    const stage = document.querySelector('.stage');
    const logoContainer = document.querySelector('.logo-container');
    
    // Manejar el clic en el botón "Ver más"
    btnVerMas.addEventListener('click', function() {
        // Agregar clase para abrir el telón (opcional, si quieres efectos adicionales)
        stage.classList.add('open');
        
        // Ocultar el logo y el botón con una transición suave
        logoContainer.style.transition = 'opacity 0.8s ease';
        logoContainer.style.opacity = '0';
        
        // Después de la animación, puedes redirigir o mostrar contenido nuevo
        setTimeout(() => {
            // Aquí puedes agregar lo que quieres que pase después
            // Por ejemplo, redirigir a otra página:
            // window.location.href = '#galeria';
            
            // O mostrar una nueva sección:
            console.log('Telón abierto - Video visible en todo momento');
            
            // Si quieres que el logo vuelva a aparecer después:
            // logoContainer.style.opacity = '1';
        }, 800);
    });
    
    // Asegurar que el video se reproduce (algunos navegadores requieren interacción)
    const video = document.getElementById('background-video');
    
    if (video) {
        // Intentar reproducir el video
        video.play().catch(error => {
            console.log('Reproducción automática bloqueada. Se reproducirá al interactuar.');
        });
        
        // Reproducir el video cuando el usuario haga clic en cualquier parte
        document.body.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            }
        }, { once: true });
    }
});