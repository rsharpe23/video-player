import VideoPlayer from './video-player';

class YouTube extends VideoPlayer {
  html() {
    return `<iframe src="https://www.youtube.com/embed/${this.target}?controls=0&autoplay=1"
              frameborder="0" 
              allow="autoplay">
            </iframe>`;
  }
}

export default YouTube;