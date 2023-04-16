const App = (loadedDOMEvent) => {
    const BASE_ASSETS = "public";
    const SONG_BASE_LABEL = "SynthPop";
    const BUFFER_SIZE = .44;

    const tracks = [];

    const playBtn = document.getElementById("play-btn");
    const songSelector = document.getElementById("song-selector");
    const loopSelector = document.getElementsByClassName("loop-selector-btn");

    let playlist = [];
    let playing = false;
    let currentSong = `${BASE_ASSETS}/${SONG_BASE_LABEL}`;

    const initListeners = () => {
        playBtn.onclick = (event) => play(event.target);
        songSelector.onchange = (event) => loadNewSong(event.target);

        for (let i = 0; i < loopSelector.length; i++) {
            loopSelector[i].onclick = (event) => selectCurrentLoop(event.target);
        }
    }

    function selectCurrentLoop(element) {
        console.log(element)
        if (tracks.includes(element.value)) {
            const index = tracks.indexOf(element.value);
            tracks.splice(index, 1);
            element.style.backgroundImage = "linear-gradient(rgba(210, 169, 230, 0.84), rgba(108, 88, 135, 0.84) 50%)";
        } else {
            tracks.push(element.value);
            element.style.backgroundImage = "linear-gradient(#B384C9, #391F5B 50%)";
        }
    }

    function loadNewSong(element) {
        currentSong = element.value;
        pause();
    }

    function play(element) {
        if (playing === false) {
            if (tracks.length === 0) { 
                playing = false;
                alert('Cannot Play: tracks list is empty. Select some tracks first'); 
            }

            for (let i = 0; i < tracks.length; i++) {
                const audio = new Audio(currentSong + tracks[i]);
                audio.loop = true;
                audio.play(); 
                playlist.push(audio);
            }
            element.style.backgroundImage = "linear-gradient(#B384C9, #391F5B 50%)";
            playing = true;
        } else {
            pause();
        }
    }

    function pause() {
        playBtn.style.backgroundImage = "linear-gradient(rgba(210, 169, 230, 0.84), rgba(108, 88, 135, 0.84) 50%)";
        playing = false;
        for (let i = 0; i < playlist.length; i++) {
            playlist[i].pause();
        }
        playlist = [];
    }

    initListeners();
};

document.addEventListener('DOMContentLoaded', (e) => App(e), false);
