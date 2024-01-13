import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  audio: HTMLAudioElement = new Audio();
  isPlaying = false;

  playAudio(url: string) {
    this.audio.src = url;
    this.audio.load();
    this.audio.play();
    this.isPlaying = true;
  }

  pauseAudio() {
    this.audio.pause();
    this.isPlaying = false;
  }
}
