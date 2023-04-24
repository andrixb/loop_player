
const Player = () => {
    let isPlaying = false;
    let playlist = [];

    const tracks = [];

    const SONG_BASE_LABEL = "SynthPop";

    let currentSong = SONG_BASE_LABEL;

    const playerV1 = () => {
        for (let i = 0; i < tracks.length; i++) {
            const audio = new Audio(`${currentSong}` + tracks[i]);
            audio.loop = true;

            playlist.push(audio);

            audio.onended = () => {
                audio.currentTime = 0;
                audio.play();
            }

            audio.play();

            audio.ontimeupdate = (event) => {
                const BUFFER_SIZE = 0.98;

                if ((audio.currentTime / audio.duration) > BUFFER_SIZE) {
                    audio.currentTime = 0;
                    audio.play();
                }
            };
        }
    }

    const playerV2 = () => {
        for (let i = 0; i < tracks.length; i++) {
            const loopPlayer = new Gapless5({ loop: true });
            loopPlayer.addTrack(`./public/${currentSong}` + tracks[i]);
            loopPlayer.play();

            playlist.push(loopPlayer);
        }
    }

    const play = () => {
        if (isPlaying === false && tracks.length === 0) {
            alert('Cannot Play: tracks list is empty. Select some tracks first');
        }
        if (isPlaying === false) {
            // Change here the player version
            playerV2();

            isPlaying = true;
        } else {
            pause();
        }
    }

    const pause = () => {
        isPlaying = false;

        if (playlist) {
            for (let i = 0; i < playlist.length; i++) {
                playlist[i].pause();
            }
            playlist = [];
            }
    }
    
    const selectCurrentLoop = (value) => {
        if (tracks && tracks.includes(value)) {
            const index = tracks.indexOf(value);
            tracks.splice(index, 1);
            return false;
        } else {
            tracks.push(value);
            return true;
        }
    }

    const loadNewSong = (value) => {
        if (currentSong) {
            currentSong = value;
            pause();
        }
    }

    return {
       play, pause, selectCurrentLoop, loadNewSong, isPlaying
    }

};


const App = () => {
    const playBtn = document.getElementById('play-btn');
    const songSelector = document.getElementById('song-selector');
    const loopSelector = document.getElementsByClassName('loop-selector-btn');

    const player = Player();

    const onClickPlay = (event) => {
        if (player) {
            player.play();


            if (event.target && player.isPlaying) {
                event.target.classList.add('button-selected');
            }

            if (event.target && !player.isPlaying) {
                event.target.classList.remove('button-selected');
            }
        }
    }

    const onChangeSongSelector = (event) => {
        if (event.target && player) player.loadNewSong(event.target.value);
    }

    const onClickLoopSelector = (event) => {
        if (!player) {
            return;
        }

        if (event.target) {
            const state = player.selectCurrentLoop(event.target.value);

            if (state) {
                event.target.classList.add('button-selected');
            } else {
                event.target.classList.remove('button-selected');
            }
        }
    }

    const initListeners = () => {
        playBtn.onclick = onClickPlay;
        songSelector.onchange = onChangeSongSelector;

        for (let i = 0; i < loopSelector.length; i++) {
            loopSelector[i].onclick = onClickLoopSelector;
        }
    }

    initListeners();
}

document.addEventListener('DOMContentLoaded', () => App(), false);

