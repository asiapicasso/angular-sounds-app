import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { EditPlantNamePopupComponent } from '../component/edit-plant-name-popup/edit-plant-name-popup.component';
import { Plant } from '../models/plants';
import { PlantService } from '../service/plant.service';
import { ApiCallService } from '../service/api-call.service';


@Component({
  selector: 'app-the-plants',
  templateUrl: './the-plants.page.html',
  styleUrls: ['./the-plants.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ThePlantsPage implements OnInit {

  plants: Plant[] = [];

  isAdmin: boolean = false;
  isSortedAlphabetically = false;

  constructor(private router: Router, private apiService: ApiCallService, public plantService: PlantService, private popoverController: PopoverController) { }

  ngOnInit() {
    /* this.plants = this.plantService.generatePlants(); //TODO recuperer les plantes */

    this.plantService.getPlants().subscribe((response) => {
      this.plants = response.plants;
    }, (error) => {
      console.error('Error fetching plants', error);
    });
    this.checkAdminStatus();
  }

  navigateToPlantsVibrationsPage() {
    this.router.navigate(['/the-plants-vibrations']);
  }


  navigateToCreateVibrationPage(plant: Plant) {
    // Utilisez le Router pour naviguer vers la page de création de vibration en passant la plante
    this.router.navigate(['/create-vibration', plant._id]);
  }
  async checkAdminStatus() {
    //TODO récuperer le role du user
    try {
      const isAdminResponse = await this.apiService.getIsAdmin().toPromise();
      this.isAdmin = isAdminResponse!.status;
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération du statut d'administrateur :", error);
    }
  }

  toggleSort() {
    this.isSortedAlphabetically = !this.isSortedAlphabetically;
  }



  async deletePlant(plantId: string) {
    try {
      // Supprimez la plante en utilisant le service PlantService
      await this.plantService.deletePlant(plantId).subscribe((response) => {
        console.log(response.message);

        // Mettez à jour la liste de plantes après la suppression
        this.plantService.getPlants().subscribe((plantsResponse) => {
          this.plants = plantsResponse.plants;
        });
      }, (error) => {
        console.error('Error deleting plant', error);
      });
    } catch (error) {
      console.error('Error deleting plant', error);
    }
  }


  navigateToCreatePlantsPage() {
    this.router.navigate(['/create-plant']);
  }

  async openEditPlantNamePopup(plantToUpdate: Plant) {
    const popover = await this.popoverController.create({
      component: EditPlantNamePopupComponent,
      componentProps: {
        plantToUpdate: plantToUpdate
      },
      cssClass: 'edit-plant-name-popup',
    });

    /*  popover.onDidDismiss().then(data => {
       if (data && data.data && data.data.newName) {
         // Le nouveau nom de la plante a été enregistré.
         const newPlantName = data.data.newName;
 
         // Mettez à jour le nom de la plante dans le service PlantService.
         this.plantService.updatePlant(plantToUpdate._id, newPlantName).subscribe((response) => {
           console.log(response.message);
 
           // Mettez à jour la liste de plantes après la modification.
           this.plantService.getPlants().subscribe((plantsResponse) => {
             this.plants = plantsResponse.plants;
           });
         }, (error) => {
           console.error('Error updating plant', error);
         });
       }
     }); */

    return await popover.present();
  }


}
