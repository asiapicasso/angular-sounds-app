import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-vibration-details',
  templateUrl: './vibration-details.component.html',
  styleUrls: ['./vibration-details.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class VibrationDetailsComponent {

  /* onIonInfinite($event: IonInfiniteScrollCustomEvent<void>) {
//     throw new Error('Method not implemented.');
  } */
  toggleAudio() {
/*     throw new Error('Method not implemented.');
 */  }

  @Input() vibration: string = 'vibration';

  vibrations: string[] = []; //Explicitly declare the type

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
  public editVibration(vibration: string) {
    // Logic for editing the vibration
    console.log('Editing vibration:', vibration);
    console.log('prout prout');
  }

  /* Implement your delete methods */ /* a mettre a jour avec le back */
  public deleteVibration(vibration: string) {
    // Logic for deleting the vibration
    console.log('Deleting vibration:', vibration);
  }
}
