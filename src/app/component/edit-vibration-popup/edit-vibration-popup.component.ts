import { Component, Input, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/service/api-call.service';
import { IonicModule, PopoverController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Vibration } from 'src/app/models/vibrations';

@Component({
  selector: 'app-edit-vibration-popup',
  templateUrl: './edit-vibration-popup.component.html',
  styleUrls: ['./edit-vibration-popup.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class EditVibrationPopupComponent {
  @Input() vibrationToUpdate!: Vibration;

  constructor(private popoverController: PopoverController,
    private apiCallService: ApiCallService) { }



  updateVibration() {
    // Appelez le service pour mettre à jour la vibration
    this.apiCallService.updateVibration(this.vibrationToUpdate).subscribe(
      (response) => {
        console.log('Vibration updated successfully', response);
        // Vous pouvez ajouter ici une logique pour fermer le popup ou effectuer d'autres actions nécessaires après la mise à jour.
        this.popoverController.dismiss();


      },
      (error) => {
        console.error('Error updating vibration', error);
        // Vous pouvez gérer les erreurs ici et informer l'utilisateur en conséquence.
      }
    );
  }

  closePopup() {
    // Fermez le popup sans effectuer de modification.
    this.popoverController.dismiss();
  }

}
