import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { latLng, MapOptions, tileLayer } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LeafletModule],
})


export class HomePage implements OnInit {

  isFullScreen = false;

  mapOptions: MapOptions;
  click: any;

  items: string[] = []; //Explicitly declare the type

  constructor(private alertController: AlertController) {
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.generateItems();
  }

  /* infinity scroll */
  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  /* full screen button */
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }

  /* listen item popup */
  async openPopup(item: string) {
    const alert = await this.alertController.create({
      header: item,
      subHeader: `Popup Subheader`, //Added by: ${item.user.username}
      message: 'This is a custom popup message.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
