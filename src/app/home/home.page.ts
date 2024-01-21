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
  //providers: [VibrationDetailsComponent],
})


export class HomePage implements OnInit {

  isFullScreenMap = false;

  mapOptions: MapOptions;
  click: any;

  /*  @ViewChild(VibrationDetailsComponent)
   vibrationDetailsComponent!: VibrationDetailsComponent;
  */

  selectedPlantName: string = '';

  vibrations: string[] = []; //Explicitly declare the type
  filteredVibrations: string[] = [];

  selectedPlant: any;
  sortedVibrations = []; // Copie du tableau de vibrations pour le tri
  sortingEnabled = false;

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

  /* filter */
  filterVibrations() {
    if (this.selectedPlantName) {
      // Filtrer les vibrations en fonction de la plante sélectionnée
      //this.filteredVibrations = this.vibrations.filter(vibration => vibration.plants_id.name === this.selectedPlantName);
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

  /* filter button */
  toggleSorting() {
    this.sortingEnabled = !this.sortingEnabled;
    /* if (this.sortingEnabled) {
      // Tri par plante (à implémenter selon votre logique)
      this.sortedVibrations.sort((a, b) => {
        // Compare les plantes associées à chaque vibration
        // et renvoie un résultat en fonction de l'ordre souhaité
        // Remplacez cela par votre propre logique de tri
        return a.plant.name.localeCompare(b.plant.name);
      });
    } else {
      // Désactiver le tri et réinitialiser l'ordre d'origine
      this.sortedVibrations = [...this.vibrations];
    } */
    console.log("prout filter");
  }

  applyFilter() {
    // Vous pouvez ajouter ici d'autres actions à effectuer lorsque le filtre est appliqué
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
