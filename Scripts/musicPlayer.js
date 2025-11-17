// Reproductor de música
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const vinylDisc = document.getElementById('vinylDisc');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const currentTitle = document.getElementById('currentTitle');
const currentArtist = document.getElementById('currentArtist');
const artistImage = document.getElementById('artistImage');
const playlistContainer = document.getElementById('playlistContainer');

// Lista de canciones de ejemplo (usar URLs reales de música)
const playlist = [
  {
    title: "Lloraras.",
    artist: "Zamir Vera",
    duration: "3:41",
    image: "../Musica/artistas/Zamir Vera.jpeg",
    src: "../Musica/Zamir Vera - Mix.mp3"
  },
  {
    title: "Paloma Negra.",
    artist: "Emi Navarro",
    duration: "3:15",
    image: "../Musica/artistas/Emi Navarro.jpg",
    src: "../Musica/EmiNavarro - Mix.mp3"
  },
  {
    title: "Todos Me Miran y A Quien Le Importa",
    artist: "Dalia Zurita",
    duration: "4:27",
    image: "../Musica/artistas/Dalia Zurita.jpeg",
    src: "../Musica/Dalia Zurita.mp3"
  },
  {
    title: "Fatalidad",
    artist: "Anthony Desintonio",
    duration: "3:11",
    image: "../Musica/artistas/Anthony Desintonio.jpeg",
    src: "../Musica/Desintonio - Mix.mp3"
  },
  {
    title: "Chica Linda",
    artist: "Gabriela Navarro",
    duration: "2:57",
    image: "../Musica/artistas/Gaby Navarro.jpeg",
    src: "../Musica/Gaby Navarro - Mix.mp3"
  },
  {
    title: "No Me Se Rajar",
    artist: "Anahí Azpiazu",
    duration: "3:31",
    image: "../Musica/artistas/Anahí Azpiazu.jpeg",
    src: "../Musica/Anahi Azpiasu - Mix.mp3"
  }

];

let currentSongIndex = 0;
let isPlaying = false;

// Crear lista de reproducción
function renderPlaylist() {
  playlistContainer.innerHTML = '';
  playlist.forEach((song, index) => {
    const songItem = document.createElement('div');
    songItem.className = 'song-item';
    if (index === currentSongIndex) songItem.classList.add('active');
    songItem.innerHTML = `
      <div class="song-number">${(index + 1).toString().padStart(2, '0')}</div>
      <div class="song-details">
        <div class="song-item-title">${song.title}</div>
        <div class="song-item-artist">${song.artist}</div>
      </div>
      <div class="song-duration">${song.duration}</div>
    `;
    songItem.addEventListener('click', () => loadSong(index));
    playlistContainer.appendChild(songItem);
  });
}

function loadSong(index) {
  currentSongIndex = index;
  const song = playlist[index];
  currentTitle.textContent = song.title;
  currentArtist.textContent = song.artist;
  artistImage.src = song.image;
  if (song.src) {
    audioPlayer.src = song.src;
  }
  renderPlaylist();
  if (isPlaying) {
    audioPlayer.play();
  }
}

function togglePlay() {
  if (isPlaying) {
    audioPlayer.pause();
    vinylDisc.classList.remove('spinning');
    playBtn.textContent = '▶';
  } else {
    audioPlayer.play();
    vinylDisc.classList.add('spinning');
    playBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function previousSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  if (isPlaying) audioPlayer.play();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  if (isPlaying) audioPlayer.play();
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);

audioPlayer.addEventListener('timeupdate', () => {
  if (audioPlayer.duration) {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = progress + '%';
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
  }
});

audioPlayer.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('ended', () => {
  nextSong();
});

progressBar.addEventListener('click', (e) => {
  if (audioPlayer.duration) {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
  }
});

// Controles de teclado
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    togglePlay();
  } else if (e.code === 'ArrowLeft') {
    e.preventDefault();
    previousSong();
  } else if (e.code === 'ArrowRight') {
    e.preventDefault();
    nextSong();
  }
});

// Inicializar
renderPlaylist();
loadSong(0);




// Script para carrusel infinito de imágenes con loop continuo
document.addEventListener('DOMContentLoaded', function() {
    const strips = document.querySelectorAll('.image-strip');
    
    strips.forEach((strip, index) => {
        const images = strip.innerHTML;
        
        // Duplicar imágenes varias veces para llenar toda la pantalla y más
        strip.innerHTML = images + images + images + images;
        
        const allImages = strip.querySelectorAll('img');
        const imageWidth = 300; // Ancho de cada imagen
        const totalImages = allImages.length / 4; // Número original de imágenes
        const totalWidth = totalImages * imageWidth;
        
        // Velocidades diferentes y direcciones alternadas (más lentas)
        const speeds = [0.3, -0.25, 0.35, -0.28];
        const speed = speeds[index];
        
        // Inicializar posición según la dirección
        let position = speed > 0 ? -totalWidth : 0;
        
        function animate() {
            position += speed;
            
            // Cuando se mueve a la derecha (speed positivo)
            if (speed > 0) {
                if (position >= 0) {
                    position = -totalWidth;
                }
            }
            // Cuando se mueve a la izquierda (speed negativo)  
            else {
                if (position <= -totalWidth) {
                    position = 0;
                }
            }
            
            strip.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        }
        
        animate();
    });
});