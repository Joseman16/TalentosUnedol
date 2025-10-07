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
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: "5:55",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhgQNe1b-bir69_OkNdrRhtC7KBDsm0Oc0Q&s",
    src: "../Musica/Queen – Bohemian Rhapsody (Official Video Remastered).mp3" // Agregar URL de audio
  },
  {
    title: "I'm Still Standing",
    artist: "Elton John",
    duration: "3:02",
    image: "https://www.eltonjohn.com/cms/wp-content/uploads/2023/10/1504913569greatest-1.jpg",
    src: "../Musica/Elton John - I'm Still Standing.mp3"
  },
  {
    title: "Oh que será?",
    artist: "Willie Colón",
    duration: "6:08",
    image: "https://fania.com/wp-content/uploads/2020/02/FANIA__2654_-_WILLIE_COLON-1200.jpg",
    src: "../Musica/Willie Colón - Oh que será？.mp3"
  },
  {
    title: " De la vida como una película y su tragedia, comedia y ficción.",
    artist: "Canserbero",
    duration: "8:00",
    image: "https://albaciudad.org/wp-content/uploads/2024/01/Canserbero.jpg",
    src: "../Musica/Canserbero - De la vida como una película y su tragedia, comedia y ficción..mp3"
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