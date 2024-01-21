import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, InfiniteScrollCustomEvent } from '@ionic/angular';
import { latLng, MapOptions, tileLayer, Map } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AudioService } from '../service/audio.service';
import { VibrationDetailsComponent } from "../component/vibration-details/vibration-details.component";
import { PlantService } from '../service/plant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LeafletModule, VibrationDetailsComponent],
})


export class HomePage implements OnInit {

  isFullScreenMap = false;

  mapOptions: MapOptions;
  click: any;

  selectedPlantName: string = '';

  vibrations: string[] = [];
  filteredVibrations: string[] = [];


  plants: string[] = []; // Variable pour stocker les plantes

  constructor(private alertController: AlertController, private audioService: AudioService, public plantService: PlantService) {
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
    this.vibrations = [...this.vibrations];
    //this.plantService.generatePlants();
    this.plants = this.plantService.generatePlants();
  }

  private generateVibrations() {
    const count = this.vibrations.length + 1;
    for (let i = 0; i < 50; i++) {
      this.vibrations.push(`Vibration ${count + i}`);
    }
  }

  /* filter */
  filterVibrations() {
    if (this.selectedPlantName) {
      //TODO
      // Filtrer les vibrations en fonction de la plante sélectionnée
      //this.filteredVibrations = this.vibrations.filter(vibration => plants === this.selectedPlantName);
    } else {
      // Si aucun filtre n'est sélectionné, affichez toutes les vibrations
      this.filteredVibrations = [...this.vibrations];
    }
    console.log('prout filtre');
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.generateVibrations();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 200);
  }

  /* fixed crocked map */
  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }

  /* full screen button */
  toggleFullScreen() {
    this.isFullScreenMap = !this.isFullScreenMap;
  }

  applyFilter() {
    // add more action when filter added
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
