const audio = <HTMLMediaElement>document.querySelector('audio');
const prevBtn = <HTMLElement>document.getElementById('btn--prev');
const playBtn = <HTMLElement>document.getElementById('btn--play');
const nextBtn = <HTMLElement>document.getElementById('btn--next');
const volumeBtn = <HTMLElement>document.getElementById('btn--volume');
const volumeControl = <HTMLElement>document.getElementById('volume-control');
const musicImage = <HTMLImageElement>document.querySelector('.music__image');
const musicTitle = <HTMLElement>document.querySelector('.music__title');
const musicArtist = <HTMLElement>document.querySelector('.music__artist');
const durationTotal = <HTMLElement>document.querySelector('.duration__total');
const durationNow = <HTMLElement>document.querySelector('.duration__now');
const progressContainer = <HTMLElement>document.querySelector('.progress-container');
const progressBar = <HTMLElement>document.querySelector('.progress');

let isPlaying = false;
let musicIndex = 0;

type musicFormat = "wav" | "mp3"
interface musicConfig{
    name:string;
    displayName: string;
    artist: string;
    audioFile: musicFormat
}

class Music{
    musicData :Array<musicConfig>
    constructor(){
        this.musicData = []
    }
    // add song details(name, artist...)
    addSongDetailsDetails(audioData: musicConfig): void{
        this.musicData.push(audioData)
    }
    // Play
    playMusic(): any{
        isPlaying = true;
        playBtn.classList.replace('fa-play', 'fa-pause');
        musicImage.classList.add('music__image--rotate');
        audio.play();
      }

     //Pause
    pauseMusic(): any {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    musicImage.classList.remove('music__image--rotate');
    audio.pause();
  } 
    // Previous Music
    playPrevMusic():any {
    musicIndex = musicIndex === 0 ? 4 : musicIndex - 1;
    console.log(musicIndex);
    loadMusic(playList.musicData[musicIndex]);
    playList.playMusic();
  }
  
  // Next Music
    playNextMusic():any {
    musicIndex = musicIndex === 4 ? 0 : musicIndex + 1;
    loadMusic(playList.musicData[musicIndex]);
    playList.playMusic();
  }
  
}

let playList = new Music()

playList.addSongDetailsDetails({name: '3 Strikes - Terror Jr',
displayName: '3 strikes',
artist: 'Terror Jr',audioFile: 'mp3'});

playList.addSongDetailsDetails({name: 'Don Diablo - Children Of A Miracle',
displayName: 'Children of a miracle',
artist: 'Don Diablo',audioFile: 'mp3'});

playList.addSongDetailsDetails({name: 'Unknown Brain - Dancing In The Moon',
displayName: 'Dancing in the moon',
artist: 'Unknown brain',audioFile: 'mp3'});



const setVolume = (value) =>{
  audio.volume = value;
}

//Update DOM
const loadMusic = (music) => {
  musicImage.src = `img/${music.displayName}.jpg`;
  musicTitle.textContent = music.displayName;
  musicArtist.textContent = music.artist;
  audio.src = `music/${music.name}.mp3`;
}
// get duration
const setDuration = ()=> {
  const musicDuration = audio.duration;
  const minute = Math.floor(musicDuration / 60);
  const second = ('0' + Math.floor(musicDuration % 60)).slice(-2);
  durationTotal.textContent = `${minute}:${second}`;
}
//update progress bar
const updateProgress = ()=> {
  const musicCurrentTime = audio.currentTime;
  const minute = Math.floor(musicCurrentTime / 60);
  const second = ('0' + Math.floor(musicCurrentTime % 60)).slice(-2);
  durationNow.textContent = `${minute}:${second}`;
  progressBar.style.width = `${Math.floor((audio.currentTime * 100) / audio.duration)}%`;
}

function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = audio;
  audio.currentTime = (clickX * duration) / width;
}


playBtn.addEventListener('click', () => {
  isPlaying ? playList.pauseMusic() : playList.playMusic();
});

prevBtn.addEventListener('click', () => {
  playList.playPrevMusic();
});

nextBtn.addEventListener('click', () => {
  playList.playNextMusic();
});

audio.onloadedmetadata = function () {
  setDuration();
};

audio.addEventListener('timeupdate', () => {
  updateProgress();
});

audio.addEventListener('ended', () => {
  playList.playNextMusic();
});
progressContainer.addEventListener('click', setProgressBar);


// onload
loadMusic(playList.musicData[musicIndex]);
