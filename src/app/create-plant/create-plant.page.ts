import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiCallService } from '../service/api-call.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-create-plant',
  templateUrl: './create-plant.page.html',
  styleUrls: ['./create-plant.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreatePlantPage {

  plant = {
    name: '',
    ownerId: '' // Ajoutez l'ID du propriétaire si nécessaire
  };


  constructor(private apiCallService: ApiCallService, private toastController: ToastController) { }
  async addPlant() {
    try {
      const response = await this.apiCallService.addPlant(this.plant).toPromise();
      console.log(response);
      const toast = await this.toastController.create({
        message: 'Plant added successfully!',
        duration: 2000
      });
      toast.present();
    } catch (error) {
      console.error(error);
      const toast = await this.toastController.create({
        message: 'Error adding plant.',
        duration: 2000
      });
      toast.present();
    }
  }

}
