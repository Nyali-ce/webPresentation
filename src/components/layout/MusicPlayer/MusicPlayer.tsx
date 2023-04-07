import './MusicPlayer.scss'

function MusicPlayer() {
    window.addEventListener('load', () => {
        const musicButton = document.querySelector('.musicButton') as HTMLButtonElement;
        const audio = document.querySelector('.music') as HTMLAudioElement;

        const music = document.getElementById('music') as HTMLImageElement;
        const musicSlash = document.getElementById('music-slash') as HTMLImageElement;

        audio.volume = 0.3;

        musicButton.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                music.style.display = 'block';
                musicSlash.style.display = 'none';
            } else {
                audio.pause();
                music.style.display = 'none';
                musicSlash.style.display = 'block';
            }
        });
    });

    return (
    <div className='musicContainer'>
        <audio className='music' src="audio/background.mp3" loop></audio>
        <button className='musicButton'>
            <img id='music-slash' className='filter-white' src="img/svg/music-slash.svg" alt="" />
            <img id='music' className='filter-white' src='img/svg/music.svg' alt='' style={{display: 'none'}} />
        </button>
    </div>
  )
}

export default MusicPlayer