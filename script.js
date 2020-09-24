var audio = document.querySelector('audio');
var prevBtn = document.getElementById('btn--prev');
var playBtn = document.getElementById('btn--play');
var nextBtn = document.getElementById('btn--next');
var volumeBtn = document.getElementById('btn--volume');
var volumeControl = document.getElementById('volume-control');
var musicImage = document.querySelector('.music__image');
var musicTitle = document.querySelector('.music__title');
var musicArtist = document.querySelector('.music__artist');
var durationTotal = document.querySelector('.duration__total');
var durationNow = document.querySelector('.duration__now');
var progressContainer = document.querySelector('.progress-container');
var progressBar = document.querySelector('.progress');
var isPlaying = false;
var musicIndex = 0;
var Music = /** @class */ (function () {
    function Music() {
        this.musicData = [];
    }
    // add song details(name, artist...)
    Music.prototype.addSongDetailsDetails = function (audioData) {
        this.musicData.push(audioData);
    };
    // Play
    Music.prototype.playMusic = function () {
        isPlaying = true;
        playBtn.classList.replace('fa-play', 'fa-pause');
        musicImage.classList.add('music__image--rotate');
        audio.play();
    };
    //Pause
    Music.prototype.pauseMusic = function () {
        isPlaying = false;
        playBtn.classList.replace('fa-pause', 'fa-play');
        musicImage.classList.remove('music__image--rotate');
        audio.pause();
    };
    // Previous Music
    Music.prototype.playPrevMusic = function () {
        musicIndex = musicIndex === 0 ? 4 : musicIndex - 1;
        console.log(musicIndex);
        loadMusic(playList.musicData[musicIndex]);
        playList.playMusic();
    };
    // Next Music
    Music.prototype.playNextMusic = function () {
        musicIndex = musicIndex === 4 ? 0 : musicIndex + 1;
        loadMusic(playList.musicData[musicIndex]);
        playList.playMusic();
    };
    return Music;
}());
var playList = new Music();
playList.addSongDetailsDetails({ name: '3 Strikes - Terror Jr',
    displayName: '3 strikes',
    artist: 'Terror Jr', audioFile: 'mp3' });
playList.addSongDetailsDetails({ name: 'Don Diablo - Children Of A Miracle',
    displayName: 'Children of a miracle',
    artist: 'Don Diablo', audioFile: 'mp3' });
playList.addSongDetailsDetails({ name: 'Unknown Brain - Dancing In The Moon',
    displayName: 'Dancing in the moon',
    artist: 'Unknown brain', audioFile: 'mp3' });
var setVolume = function (value) {
    audio.volume = value;
};
//Update DOM
var loadMusic = function (music) {
    musicImage.src = "img/" + music.displayName + ".jpg";
    musicTitle.textContent = music.displayName;
    musicArtist.textContent = music.artist;
    audio.src = "music/" + music.name + ".mp3";
};
// get duration
var setDuration = function () {
    var musicDuration = audio.duration;
    var minute = Math.floor(musicDuration / 60);
    var second = ('0' + Math.floor(musicDuration % 60)).slice(-2);
    durationTotal.textContent = minute + ":" + second;
};
//update progress bar
var updateProgress = function () {
    var musicCurrentTime = audio.currentTime;
    var minute = Math.floor(musicCurrentTime / 60);
    var second = ('0' + Math.floor(musicCurrentTime % 60)).slice(-2);
    durationNow.textContent = minute + ":" + second;
    progressBar.style.width = Math.floor((audio.currentTime * 100) / audio.duration) + "%";
};
function setProgressBar(event) {
    var width = this.clientWidth;
    var clickX = event.offsetX;
    var duration = audio.duration;
    audio.currentTime = (clickX * duration) / width;
}
playBtn.addEventListener('click', function () {
    isPlaying ? playList.pauseMusic() : playList.playMusic();
});
prevBtn.addEventListener('click', function () {
    playList.playPrevMusic();
});
nextBtn.addEventListener('click', function () {
    playList.playNextMusic();
});
audio.onloadedmetadata = function () {
    setDuration();
};
audio.addEventListener('timeupdate', function () {
    updateProgress();
});
audio.addEventListener('ended', function () {
    playList.playNextMusic();
});
progressContainer.addEventListener('click', setProgressBar);
// onload
loadMusic(playList.musicData[musicIndex]);
