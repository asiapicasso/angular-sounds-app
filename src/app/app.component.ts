import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, homeSharp, headsetOutline, headsetSharp, leafOutline, leafSharp, personOutline, personSharp, settingsOutline, settingsSharp } from 'ionicons/icons';
import { AuthService } from './security/auth.service';
import { IonicModule } from '@ionic/angular';
import { PlayerComponent } from './component/player/player.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, PlayerComponent],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'My vibrations', url: '/my-vibrations', icon: 'headset' },
    { title: 'The Plants', url: '/the-plants', icon: 'leaf' },
    { title: 'My profile', url: '/my-profile', icon: 'settings' },
    //{ title: 'Log Out', url: '/auth/logout', icon: 'person' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];


  constructor(private authService: AuthService) {
    addIcons({ homeOutline, headsetOutline, leafOutline, settingsOutline, settingsSharp, personOutline, personSharp, leafSharp, headsetSharp, homeSharp });
  }

  logOut() {
    //TODO deconnection
    this.authService.logOut().subscribe(() => {

/*      this.router.navigate(['/login']);
 */    });
    console.log("logging out");
  }

}
