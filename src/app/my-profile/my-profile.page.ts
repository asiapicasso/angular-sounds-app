import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { ApiCallService } from '../service/api-call.service';
import { MyVibrationsPage } from '../my-vibrations/my-vibrations.page';
import { User } from '../models/users';
import { Vibration } from '../models/vibrations';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MyVibrationsPage]
})
export class MyProfilePage implements OnInit {

  user!: User;
  vibrations: Vibration[] = [];

  isSortedAlphabetically = false;

  constructor(private apiCallService: ApiCallService, private userService: UserService, private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    this.getProfile();
  }


  getProfile() {
    this.apiCallService.getUser().subscribe((resp) => {

      this.user = resp.user;

      console.log(this.user);
    },
      (error) => {
        console.error('Error fetching user', error);
      });
    ;


  }

  getMyVibrations() {
    this.apiCallService.getMyVibrations().subscribe(
      (response) => {
        this.vibrations = response.vibrations;


      },
      (error) => {
        console.error('Error fetching vibrations', error);
      }
    );
  }

  editProfile() {

    const updatedUser = {
      _id: this.user._id, // Conservez l'ID d'origine
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      email: this.user.email,
      // Ajoutez d'autres champs modifiables ici au besoin


    };
    this.apiCallService.updateUser(updatedUser).subscribe(
      (response) => {
        // Gérer la réponse de la mise à jour du profil
        console.log('Profile updated successfully', response);
        this.user = response.user;
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );

  }

  navigateToMyVibrationsPage() {
    this.router.navigate(['/my-vibrations']);
  }

  /*   generateVibrations() {
      const count = this.vibrations.length + 1;
      for (let i = 0; i < 5; i++) {
        this.vibrations.push(`My Vibration ${count + i}`);
      }
    } */

  //sort button a to z
  toggleSort() {
    this.isSortedAlphabetically = !this.isSortedAlphabetically;
    console.log("prout sort");
  }

}
