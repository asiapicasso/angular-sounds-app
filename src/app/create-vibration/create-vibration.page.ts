import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { Vibration } from '../models/vibrations';
import { Plant } from '../models/plants';
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
  plants: Plant[] = [];
  private plantIdFromParams: string = '';
  selectedPlantIds: string[] = [];
  selectedFile: File | undefined;

  vibration: Vibration = {
    _id: '',
    name: '',
    location: {
      lat: null as unknown as number,
      long: null as unknown as number,
    },
    plantsIds: [],
    ownerId: '', vibrationPath: ""
  };

  constructor(public plantService: PlantService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.plantIdFromParams = params['id'];
    });


    this.plantService.getPlants().subscribe((response) => {
      this.plants = response.plants;
    }, (error) => {
      console.error('Error fetching plants', error);
    });

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
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {

      this.selectedFile = <File>inputElement.files[0];

    }
  }


  async addVibration(name: string, location: { lat: number; long: number }) {
    try {
      // Mettez à jour les propriétés de l'objet Vibration avec les valeurs passées
      this.vibration.name = name;
      this.vibration.location = location;
      this.vibration.plantsIds = this.selectedPlantIds;

      console.log(JSON.stringify(this.vibration));
      const formData = new FormData();
      formData.append('vibration', JSON.stringify(this.vibration));
      formData.append('audio', this.selectedFile as Blob, this.selectedFile!.name as string);
      // Appelez votre service pour ajouter la vibration en utilisant this.vibration
      await from(this.plantService.addVibration(formData)).toPromise();

      // Réinitialisez les valeurs après avoir ajouté la vibration


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
