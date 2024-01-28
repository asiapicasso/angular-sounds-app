import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, InfiniteScrollCustomEvent } from '@ionic/angular';
import { latLng, MapOptions, tileLayer, marker, Marker, Map as MAPP } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { VibrationDetailsComponent } from "../component/vibration-details/vibration-details.component";
import { mapMarkerIcon } from '../component/map-marker/map-marker.component';
import { ApiCallService } from '../service/api-call.service';
import { PlantService } from '../service/plant.service';
import { Plant } from '../models/plants';
import { Vibration } from '../models/vibrations';

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

  vibrations: Vibration[] = [];

  audioUrls: Map<string, string> = new Map<string, string>();
  allLinkedPlant: Map<string, Plant> = new Map<string, Plant>();



  plants: Plant[] = []; // Variable pour stocker les plantes

  mapMarkers: Marker[] = [];

  constructor(private apiCallService: ApiCallService, public plantService: PlantService) {
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

    /* 
      //marker demo
    this.mapMarkers = [
      marker([46.778186, 6.641524], { icon: mapMarkerIcon }),
      marker([46.780796, 6.647395], { icon: mapMarkerIcon }),
      marker([46.784992, 6.652267], { icon: mapMarkerIcon })
    ]; */
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {

    this.getAllVibrations();

  }



  private generateMarker() {

    for (const v of this.vibrations) {
      console.log(v);
      const randomMarker = marker([v.location.lat, v.location.long], { icon: mapMarkerIcon });
      this.mapMarkers.push(randomMarker);

    }
  }

  getAllVibrations() {
    this.apiCallService.getAllVibrations().subscribe(
      (response) => {
        this.vibrations = response.vibrations;
        // TODO for each vibration fetch plant from vibrations.plantsIds array if not present in allLinkedPlant

        this.vibrations.forEach(vib => {


          vib.plantsIds.forEach(plantId => {
            if (!this.allLinkedPlant.has(plantId)) {
              this.getPlantName(plantId);
            }
          });

          this.getAudioBlob(vib._id);

          this.generateMarker();

        });
      },
      (error) => {
        console.error('Error fetching vibrations', error);
      }
    );
  }

  getAudioBlob(vibId: string) {
    this.apiCallService.getAudio(vibId).subscribe(
      (audioBlob) => {
        const audioUrl = URL.createObjectURL(audioBlob);
        this.audioUrls.set(vibId, audioUrl);
      },
      (error) => {
        console.error('Error fetching audio for vibration', error);
      }
    );
  }

  getPlantName(plantId: string) {
    // TODO call only if not exist in map

    this.apiCallService.getPlant(plantId).subscribe((plant) => {


      return this.allLinkedPlant.set(plant._id, plant);
    },
      (error) => {
        console.error('Error fetching audio for vibration', error);
      });

  }




  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 200);
  }

  /* fixed crocked map */
  onMapReady(map: MAPP) {
    setTimeout(() => map.invalidateSize(), 0);
  }

  /* full screen button */
  toggleFullScreen() {
    this.isFullScreenMap = !this.isFullScreenMap;
    //this.onMapReady;
    // TODO faire que la map se regenere apres que la map soit mise en fullScreen
  }

  applyFilter() {
    // add more action when filter added
  }



}
