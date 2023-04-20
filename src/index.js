import { Player } from './player';
import './style.css';


const App = () => {
    const playBtn = document.getElementById('play-btn');
    const songSelector = document.getElementById('song-selector');
    const loopSelector = document.getElementsByClassName('loop-selector-btn');

    const player = Player();

    const onClickPlay = (event) => {
        if (player) {
            player.play();
        }

        if (event.target) {
            event.target.classList.toggle('button-selected',  player.isPlaying);
        }

        if (event.target && !player.isPlaying) {
            event.target.classList.remove('button-selected');
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

