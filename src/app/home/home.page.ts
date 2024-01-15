import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, InfiniteScrollCustomEvent } from '@ionic/angular';
import { latLng, MapOptions, tileLayer } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AudioService } from '../audio.service';
import { VibrationDetailsComponent } from "../component/vibration-details/vibration-details.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LeafletModule, VibrationDetailsComponent],
  //providers: [VibrationDetailsComponent],
})


export class HomePage implements OnInit {

  isFullScreenMap = false;

  mapOptions: MapOptions;
  click: any;

  /*  @ViewChild(VibrationDetailsComponent)
   vibrationDetailsComponent!: VibrationDetailsComponent;
  */

  vibrations: string[] = []; //Explicitly declare the type

  constructor(private alertController: AlertController, private audioService: AudioService) {
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.generateVibrations();
  }


  /* infinity scroll */
  /* 1.generate vibrations */
  /* 2.use infinityscroll event */
  /* public generateVibrations() {
    const count = this.vibrations.length + 1;
    for (let i = 0; i < 50; i++) {
      this.vibrations.push(`Vibration ${count + i}`);
    }
  } */

  private generateVibrations() {
    const count = this.vibrations.length + 1;
    for (let i = 0; i < 50; i++) {
      this.vibrations.push(`Vibration ${count + i}`);
    }
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.generateVibrations();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 200);
  }

  /* full screen button */
  toggleFullScreen() {
    this.isFullScreenMap = !this.isFullScreenMap;
  }

  /* service audio */
  toggleAudio() {
    if (this.audioService.isPlaying) {
      this.audioService.pauseAudio();
    } else {
      this.audioService.playAudio('your-audio-file.mp3');
    }
  }

}
