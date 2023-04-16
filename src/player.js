export const Player = () => {
    let isPlaying = false;
    let playlist = [];

    const tracks = [];

    const BASE_ASSETS = "public";
    const SONG_BASE_LABEL = "SynthPop";
    const BUFFER_SIZE = .44;

    let currentSong = SONG_BASE_LABEL;

    const play = () => {
        if (isPlaying && tracks) {
            if (isPlaying === false) {
                if (tracks.length === 0) {
                    isPlaying = false;
                    alert('Cannot Play: tracks list is empty. Select some tracks first');
                }

                for (let i = 0; i < tracks.length; i++) {
                    const audio = new Audio(`${BASE_ASSETS}/${currentSong}` + tracks[i]);
                    audio.loop = true;
                    audio.play();
                    playlist.push(audio);

                    // audio.addEventListener('timeupdate', function(){
                    //     var buffer = .44
                    //     if(this.currentTime > this.duration - buffer){
                    //         this.currentTime = 0
                    //         this.play()
                    //     }
                    // });
                }

                isPlaying = true;
                return true;
            } else {
                pause();
                return false;
            }
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

    console.log('hewrerer')

    return {
        play, pause, selectCurrentLoop, loadNewSong
    }

};
