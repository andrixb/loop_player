import { Player } from './player';
import './style.css';


const App = () => {
    const playBtn = document.getElementById('play-btn');
    const songSelector = document.getElementById('song-selector');
    const loopSelector = document.getElementsByClassName('loop-selector-btn');

    let player = {};

    const init = () => {
        player = Player();
        initListeners();
    }

    const initListeners = () => {
        playBtn.onclick = (event) => {
            const isPlaying = player.play();

            if (!isPlaying) {
                event.target.style.backgroundImage = 'linear-gradient(rgba(210, 169, 230, 0.84), rgba(108, 88, 135, 0.84) 50%)';
            }

            if (event.target) event.target.style.backgroundImage = 'linear-gradient(#B384C9, #391F5B 50%)';
        }
        
        songSelector.onchange = (event) => { if (event.target) player.loadNewSong(event.target.value); }

        for (let i = 0; i < loopSelector.length; i++) {
            loopSelector[i].onclick = (event) => {
                if (event.target) {
                    const state = player.selectCurrentLoop(event.target.value);
                    state ?
                        event.target.style.backgroundImage = 'linear-gradient(rgba(210, 169, 230, 0.84), rgba(108, 88, 135, 0.84) 50%)' :
                        event.target.style.backgroundImage = 'linear-gradient(#B384C9, #391F5B 50%)';
                }
            }
        }
    }

    init();
}

document.addEventListener('DOMContentLoaded', () => App(), false);

