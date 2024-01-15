import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { latLng, MapOptions, tileLayer } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AudioService } from '../audio.service';
import { VibrationDetailsComponent } from "../component/vibration-details/vibration-details.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LeafletModule, VibrationDetailsComponent]
})


export class HomePage implements OnInit {

  isFullScreenMap = false;

  mapOptions: MapOptions;
  click: any;

  vibraitons: string[] = []; //Explicitly declare the type

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
    this.generateVibraitons();
  }

  /* infinity scroll */
  private generateVibraitons() {
    const count = this.vibraitons.length + 1;
    for (let i = 0; i < 50; i++) {
      this.vibraitons.push(`Vibration ${count + i}`);
    }
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.generateVibraitons();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
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
