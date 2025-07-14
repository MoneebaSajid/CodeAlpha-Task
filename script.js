const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const volumeSlider = document.getElementById("volume");

let isPlaying = false;

const songs = [
  {
    name: "song1",
    displayName: "Chill Vibes",
    artist: "LoFi Producer"
  },
  {
    name: "song2",
    displayName: "Dreamscape",
    artist: "Synth Master"
  },
  {
    name: "song3",
    displayName: "Retro Beat",
    artist: "DJ Sonic"
  }
];

let songIndex = 0;

// Load song
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
}
loadSong(songs[songIndex]);

// Play
function playSong() {
  isPlaying = true;
  playBtn.textContent = "⏸";
  audio.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.textContent = "▶️";
  audio.pause();
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Prev song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Update progress bar
function updateProgress() {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Time update
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
}

// Format time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Set progress bar on click
progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

// Volume control
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Autoplay next
audio.addEventListener("ended", nextSong);

// Progress bar update
audio.addEventListener("timeupdate", updateProgress);
