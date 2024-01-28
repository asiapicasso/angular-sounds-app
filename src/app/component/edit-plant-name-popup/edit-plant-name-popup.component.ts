import { Component, Input } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PlantService } from 'src/app/service/plant.service'; // Importez PlantService
import { Plant } from 'src/app/models/plants';

@Component({
  selector: 'app-edit-plant-name-popup',
  templateUrl: './edit-plant-name-popup.component.html',
  styleUrls: ['./edit-plant-name-popup.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class EditPlantNamePopupComponent {
  newPlantName: string = '';
  @Input() plantToUpdate!: Plant;

  constructor(
    private popoverController: PopoverController,
    private plantService: PlantService // Injectez PlantService ici
  ) { }

  savePlantName() {
    // Obtenez l'ID de la plante à partir de plantToUpdate
    const plantId = this.plantToUpdate._id;

    // Appelez la fonction updatePlant de PlantService
    this.plantService.updatePlant(plantId, this.newPlantName).subscribe({
      next: (response) => {
        console.log(response.message);
        // Fermez le popup après la modification.
        this.popoverController.dismiss({ newName: this.newPlantName });
      },
      error: (error) => {
        console.error('Error updating plant', error);
        // Gérez les erreurs de manière appropriée ici
      }
    });
  }

  closePopup() {
    // Fermez le popup sans effectuer de modification.
    this.popoverController.dismiss();
  }
}
