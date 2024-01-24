import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VibrationService } from '../service/vibration.service';
import { PlantService } from '../service/plant.service';
//import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-create-vibration',
  templateUrl: './create-vibration.page.html',
  styleUrls: ['./create-vibration.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateVibrationPage implements OnInit {

  selectedPlantName: string = '';
  plants: string[] = [];

  vibration = {
    name: '',
    location: {
      lat: null as unknown as number,
      long: null as unknown as number,
    },
    plantId: '',
  };

  constructor(private vibrationService: VibrationService, public plantService: PlantService) { }

  ngOnInit() {
    this.plants = this.plantService.generatePlants(); //TODO recuperer les plantes

    // Get current location using standard Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Automatically fill the latitude and longitude fields
        this.vibration.location.lat = position.coords.latitude;
        this.vibration.location.long = position.coords.longitude;
      },
      (error) => {
        console.error('Error getting location', error);
      }
    );
  }

  async addVibration() {
    try {
      // Call your function with field data
      this.addVibrationWithLocation();
      console.log("addVibration");
    } catch (error) {
      console.error('Error adding vibration', error);
    }
  }

  async addVibrationWithLocation() {
    // Envoyez les données au service pour ajouter la vibration
    // Vous pouvez utiliser this.vibration pour envoyer les données au service
    try {
      // Appel à votre service pour ajouter la vibration ici
      // Par exemple : await this.vibrationService.addVibration(this.vibration);
    } catch (error) {
      console.error('Error adding vibration', error);
    }
  }

}
