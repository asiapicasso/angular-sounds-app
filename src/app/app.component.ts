import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, homeSharp, headsetOutline, headsetSharp, leafOutline, leafSharp, personOutline, personSharp, settingsOutline, settingsSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'home' },
    { title: 'My vibrations', url: '/folder/my-vibrations', icon: 'headset' },
    { title: 'My followed plants', url: '/folder/my-followed-plants', icon: 'leaf' },
    { title: 'My profile', url: '/folder/my-profile', icon: 'settings' },
    { title: 'Connection', url: '/folder/auth', icon: 'person' },
  ];
/*   public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
 */  constructor() {
    addIcons({ homeOutline, headsetOutline, leafOutline, settingsOutline, settingsSharp, personOutline, personSharp, leafSharp, headsetSharp, homeSharp });
  }
}