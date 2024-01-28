import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { Plant } from 'src/app/models/plants';
import { User } from 'src/app/models/users';
import { Vibration } from 'src/app/models/vibrations';
import { ApiCallService } from 'src/app/service/api-call.service';

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

  @Input() vibration!: Vibration;

  vibrations: string[] = []; //Explicitly declare the type

  constructor(private alertController: AlertController, private apiCallService: ApiCallService) { }

  /* listen vibration popup */
  async openPopup(vibration: Vibration) {
    //const isOwner = vibration.owner === 'currentLoggedInUser'; //check if the current user is the owner of the item
    let allLinkedPlant: Map<string, Plant> = new Map();


    let owner = await this.apiCallService.getAUser(vibration.ownerId)!.toPromise();

    for (const p of vibration.plantsIds) {
      if (!allLinkedPlant.has(p)) {
        let plant = await this.apiCallService.getPlant(p).toPromise();
        allLinkedPlant.set(p, plant!);
      }
    }




    let message = 'Plantes liées à cette vibration :\n';
    allLinkedPlant.forEach((plant, plantId) => {
      message += `${plant.name},\n`; // Vous pouvez personnaliser le format du message ici
    });


    const alert = await this.alertController.create({
      header: vibration.name,
      subHeader: owner!.user.firstname,
      message: message, // Utilisez le message construit
      backdropDismiss: true,
      buttons: [{
        text: 'OK',
        handler: () => {
          console.debug('OK clicked');
        }
      }],
    });

    await alert.present();
  }


}
