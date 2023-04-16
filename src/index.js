import { Player } from './player';
import './style.css';


const App = () => {
    const playBtn = document.getElementById('play-btn');
    const songSelector = document.getElementById('song-selector');
    const loopSelector = document.getElementsByClassName('loop-selector-btn');

    const player = Player();

    const onClickPlay = (event) => {
        if (!player) {
            return;
        }

        player.play();

        if (event.target) {
            event.target.style.backgroundImage = 'linear-gradient(#B384C9, #391F5B 50%)';

            if (!player.isPlaying) {
                event.target.style.backgroundImage =
                    'linear-gradient(rgba(210, 169, 230, 0.84), rgba(108, 88, 135, 0.84) 50%)';
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
            if (!state) {
                event.target.style.backgroundImage = 'linear-gradient(rgba(210, 169, 230, 0.84), rgba(108, 88, 135, 0.84) 50%)';
            }
            event.target.style.backgroundImage = 'linear-gradient(#B384C9, #391F5B 50%)';
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

