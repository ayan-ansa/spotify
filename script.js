const playBtn = document.getElementById("playBtn");
const progressBar = document.querySelector(".progressBar");
const songList = document.querySelector(".songList");
const songGif = document.querySelector(".songGif img");
const songSec = document.getElementById("sec");
const songMin = document.getElementById("min");
const backBtn = document.querySelector(".fa-backward-step");
const nextBtn = document.querySelector(".fa-forward-step");
const title = document.querySelector(".title");

let isPlay = true;
let songIdx = 1;
let prevClickBtn;
const audio = new Audio("songs/1.mp3");
const songs = [
  { name: "Warriyo - Mortals [NCS Release]" },
  { name: "Sub Urban - Cradles [NCS Release]" },
  { name: "Lost Sky - Fearless Pt. II (feat. Chris Linton)" },
  { name: "Aix Cee - Feel Like [NCS Release]" },
  { name: "Egzod, Maestro Chives, Neoni" },
  { name: "Janji & Johnning - Nostalgia [NCS Release]" },
  { name: "Ghostnaps - grow apart [NCS Release]" },
];
songs.forEach((song, i) => {
  const songItem = document.createElement("div");
  songItem.classList.add("item");
  const coverImage = document.createElement("img");
  coverImage.src = `images/${i + 1}.jpg`;
  coverImage.alt = "image";
  const songName = document.createElement("span");
  songName.innerText = song.name;
  const songPlay = document.createElement("div");
  songPlay.classList.add("songPlay");
  songPlay.innerHTML = `03:3${i} <i class="fa-solid fa-circle-play" id="${
    i + 1
  }"></i>`;
  songItem.appendChild(coverImage);
  songItem.appendChild(songName);
  songItem.appendChild(songPlay);
  songList.append(songItem);
});

const calculateDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return { minutes, seconds: remainingSeconds };
};

audio.addEventListener("timeupdate", (e) => {
  const progress = parseInt((audio.currentTime / audio.duration) * 100);
  const Seconds = parseInt(audio.currentTime);
  const time = calculateDuration(Seconds);
  const sec = time.seconds < 10 ? "0" + time.seconds : time.seconds;
  const min = time.minutes < 10 ? "0" + time.minutes : time.minutes;
  songSec.innerText = sec;
  songMin.innerText = min;
  progressBar.value = progress;
  if (progressBar.value == 100) {
    progressBar.value = 0;
    songGif.style.opacity = 0;
    playBtn.classList.remove("fa-circle-pause");
    playBtn.classList.add("fa-circle-play");
    songMin.innerText = "00";
    songSec.innerText = "00";
  }
});
const changeIcon = (element) => {
  if (element.classList.contains("fa-circle-pause") && isPlay) {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  } else {
    element.classList.remove("fa-circle-play");
    element.classList.add("fa-circle-pause");
  }
  isPlay = true;
};

const handlePlay = (element) => {
  if (element.classList.contains("fa-circle-play")) {
    audio.play();
    changeIcon(element);
    songGif.style.opacity = 1;
  } else {
    audio.pause();
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
    songGif.style.opacity = 0;
  }
};

progressBar.addEventListener("change", () => {
  audio.currentTime = (progressBar.value * audio.duration) / 100;
});

const songPlayBtn = Array.from(document.getElementsByClassName("songPlay"));

const pauseSong = () => {
  songPlayBtn.forEach((btn) => {
    const prev = document.getElementById(songIdx);
    const play = btn.querySelector("i");
    if (prev.id != play.id) {
      play.classList.remove("fa-circle-pause");
      play.classList.add("fa-circle-play");
    }
  });
};

songPlayBtn.forEach((btn) => {
  const play = btn.querySelector("i");
  play.addEventListener("click", (e) => {
    songIdx = e.target.id;
    audio.src = `songs/${songIdx}.mp3`;
    title.innerText = songs[songIdx - 1].name;
    pauseSong();
    changeIcon(playBtn);
    handlePlay(e.target);
  });
});

backBtn.addEventListener("click", () => {
  if (songIdx <= 1) {
    songIdx = 7;
  } else {
    songIdx--;
  }
  pauseSong();
  const songPause = document.getElementById(songIdx);
  handlePlay(songPause);
  audio.src = `songs/${songIdx}.mp3`;
  title.innerText = songs[songIdx - 1].name;
  isPlay = false;
  changeIcon(playBtn);
  audio.play();
});

nextBtn.addEventListener("click", () => {
  if (songIdx >= 7) {
    songIdx = 1;
  } else {
    songIdx++;
  }
  pauseSong();
  const songPause = document.getElementById(songIdx);
  handlePlay(songPause);
  audio.src = `songs/${songIdx}.mp3`;
  title.innerText = songs[songIdx - 1].name;
  isPlay = false;
  changeIcon(playBtn);
  audio.play();
});

playBtn.addEventListener("click", (e) => {
  const songPause = document.getElementById(songIdx);
  handlePlay(songPause);
  handlePlay(e.target);
});
