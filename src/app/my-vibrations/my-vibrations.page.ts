import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, PopoverController } from '@ionic/angular';
import { VibrationDetailsComponent } from '../component/vibration-details/vibration-details.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiCallService } from '../service/api-call.service';
import { EditVibrationPopupComponent } from '../component/edit-vibration-popup/edit-vibration-popup.component';
import { Plant } from '../models/plants';
import { Vibration } from '../models/vibrations';
import { PlantService } from '../service/plant.service';

@Component({
  selector: 'app-my-vibrations',
  templateUrl: './my-vibrations.page.html',
  styleUrls: ['./my-vibrations.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [VibrationDetailsComponent,], //add the component to the providers array
})
export class MyVibrationsPage implements OnInit {

  vibrations: Vibration[] = [];
  router: Router = new Router;

  audioUrls: Map<string, string> = new Map();
  allLinkedPlant: Map<string, Plant> = new Map();

  constructor(private apiCallService: ApiCallService, public http: HttpClient, private popoverController: PopoverController, private vibrationDetailsComponent: VibrationDetailsComponent, public plantService: PlantService,) { }

  //use method from the component

  ngOnInit() {
    this.getVibrations();

  }

  navigateToCreateVibrationPage() {
    // Utilisez le Router pour naviguer vers la page de création de vibration en passant la plante
    this.router.navigate(['/create-vibration']);
  }

  getVibrations() {
    this.apiCallService.getMyVibrations().subscribe(
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





  callDeleteVibration(vibration: Vibration) {
    if (confirm('Are you sure you want to delete this vibration?')) {
      this.apiCallService.deleteVibration(vibration._id).subscribe(
        (response) => {
          // Supprimez la vibration de la liste une fois qu'elle est supprimée avec succès
          const index = this.vibrations.indexOf(vibration);
          if (index !== -1) {
            this.vibrations.splice(index, 1);
          }
          console.log('Vibration deleted successfully');
        },
        (error) => {
          console.error('Error deleting vibration', error);
        }
      );
    }
  }

  navigateToCreateVibrationsPage() {
    this.router.navigate(['/create-vibration']);
  }


  async openEditMyVibration(vibrationToUpdate: Vibration) {
    const popover = await this.popoverController.create({
      component: EditVibrationPopupComponent,
      componentProps: {
        vibrationToUpdate: vibrationToUpdate
      },
      cssClass: 'edit-vibration-popup.component',
    });

    popover.onDidDismiss().then(data => {
      if (data && data.data && data.data.formData) {
        // Les données ont été mises à jour dans le composant EditVibrationPopupComponent.
        const updatedData = data.data.formData;

        console.log(updatedData);

        // Appelez le service pour mettre à jour la vibration
        this.apiCallService.updateVibration(updatedData).subscribe(
          (response) => {
            console.log('Vibration updated successfully', response);
            // Vous pouvez ajouter ici une logique pour fermer le popup ou effectuer d'autres actions nécessaires après la mise à jour.
          },
          (error) => {
            console.error('Error updating vibration', error);
            // Vous pouvez gérer les erreurs ici et informer l'utilisateur en conséquence.
          }
        );
      }
    });

    return await popover.present();
  }

}
