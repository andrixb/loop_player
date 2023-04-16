import { Gapless5 } from'@regosen/gapless-5';

export const Player = () => {
    let isPlaying = false;
    let playlist = [];

    const tracks = [];

    const SONG_BASE_LABEL = "SynthPop";
    const BUFFER_SIZE = .90;

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
                if ((audio.currentTime / audio.duration) > BUFFER_SIZE) {
                    audio.currentTime = 0;
                    audio.play();
                }
            };
        }
    }

    const playerV2 = () => {
        const loopPlayer = new Gapless5({ loop: true });
        for (let i = 0; i < tracks.length; i++) { 
            loopPlayer.addTrack(`${currentSong}` + tracks[i]);
        }
        loopPlayer.play();

        playlist.push(loopPlayer);
    }

    const play = () => {
        if (isPlaying === false && tracks.length === 0) {
            alert('Cannot Play: tracks list is empty. Select some tracks first');
        }
        if (isPlaying === false) {
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
        if (tracks) {
            if (tracks.includes(value)) {
                const index = tracks.indexOf(value);
                tracks.splice(index, 1);
                return true;
            } else {
                tracks.push(value);
                return false;
            }
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
