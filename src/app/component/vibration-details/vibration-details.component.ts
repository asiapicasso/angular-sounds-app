import { Component, Input, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-vibration-details',
  templateUrl: './vibration-details.component.html',
  styleUrls: ['./vibration-details.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class VibrationDetailsComponent {
  @Input() vibration: string = 'vibration';

  constructor(private alertController: AlertController) { }

  /* listen vibration popup */
  async openPopup(vibration: string) {
    //const isOwner = vibration.owner === 'currentLoggedInUser'; //check if the current user is the owner of the item

    const alert = await this.alertController.create({
      header: vibration, //nom de la vibration ${vibration.name}
      subHeader: `Popup Subheader`, //${vibration.plant_id.name} nom de la famille de plante
      message: 'This is a custom popup message.', //Created by: ${vibration.user.username} nom de l'utilisateur
      backdropDismiss: true,
      buttons: [{
        text: 'OK', handler: () => {
          console.debug('OK clicked');
        }
      },
      // Add Update button if the user is the owner
      /* {
        text: 'Modifier',
        handler: () => {
          if (isOwner) {
            this.editVibration(vibration);
          }
        },
        visible: isOwner // Show the button only if the user is the owner
      }, */
      // Add Delete button if the user is the owner
      /* {
        text: 'Supprimer',
        handler: () => {
          if (isOwner) {
            this.deleteVibration(vibration);
          }
        },
        visible: isOwner // Show the button only if the user is the owner
      } */],

    });

    await alert.present();
  }

  /* Implement your edit methods */ /* a mettre a jour avec le back */
  editVibration(vibration: string) {
    // Logic for editing the vibration
    console.log('Editing vibration:', vibration);
  }

  /* Implement your delete methods */ /* a mettre a jour avec le back */
  deleteVibration(vibration: string) {
    // Logic for deleting the vibration
    console.log('Deleting vibration:', vibration);
  }
}
