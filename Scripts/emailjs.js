// Inicializar EmailJS
emailjs.init('K7dHLGjt9yhCPr4UU');

// Obtener elementos del DOM
const btn = document.getElementById('button');
const form = document.getElementById('form');
const modalOverlay = document.getElementById('modalOverlay');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Función para abrir el modal
function openModal() {
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Bloquear scroll
}

// Función para cerrar el modal
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; // Restaurar scroll
}

// Cerrar modal al hacer clic en el botón
modalCloseBtn.addEventListener('click', closeModal);

// Cerrar modal al hacer clic fuera del contenido
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// Manejar el envío del formulario
form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Cambiar estado del botón
  btn.value = 'Enviando...';
  btn.disabled = true;

  // Configuración de EmailJS
  const serviceID = 'default_service';
  const templateID = 'template_4wg7d3a';

  // Enviar formulario
  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      // Éxito
      btn.value = 'Enviar Mensaje';
      btn.disabled = false;
      form.reset();
      
      // Mostrar modal
      openModal();
    }, (err) => {
      // Error
      btn.value = 'Enviar Mensaje';
      btn.disabled = false;
      alert('Error al enviar: ' + JSON.stringify(err));
    });
});