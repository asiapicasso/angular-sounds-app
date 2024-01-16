import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MyProfilePage implements OnInit {

  user: any;
  vibrations: string[] = [];

  constructor(private userService: UserService, private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    this.user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    };
    this.generateVibrations();

  }

  editProfile() {
    // Redirect to the profile update page
    this.navCtrl.navigateForward('/profile/update'); //route d'exemple
  }

  navigateToMyVibrationsPage() {
    this.router.navigate(['/my-vibrations']);
  }

  generateVibrations() {
    const count = this.vibrations.length + 1;
    for (let i = 0; i < 5; i++) {
      this.vibrations.push(`My Vibration ${count + i}`);
    }
  }

}
