import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { PlantService } from '../service/plant.service';

@Component({
  selector: 'app-the-plants',
  templateUrl: './the-plants.page.html',
  styleUrls: ['./the-plants.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ThePlantsPage implements OnInit {

  plants: string[] = [];

  isAdmin: boolean = false;
  isSortedAlphabetically = false;

  constructor(private router: Router, private userService: UserService, public plantService: PlantService) { }

  ngOnInit() {
    this.plants = this.plantService.generatePlants();
    this.checkAdminStatus();
  }

  navigateToPlantsVibrationsPage() {
    this.router.navigate(['/the-plants-vibrations']);
  }

  /* generatePlants() {
    const count = this.plants.length + 1;
    for (let i = 0; i < 50; i++) {
      this.plants.push(`Plant ${count + i}`);
    }
  } */

  checkAdminStatus() {
    this.isAdmin = this.userService.isUserAdmin(); // Utilisez votre logique pour déterminer le statut admin
  }

  /* editPlant() {
    // Logique pour éditer la plante
  }

  deletePlant() {
    // Logique pour supprimer la plante
  } */

  //sort a to z
  /* get sortedPlants() {
      if (this.isSortedAlphabetically) {
       return this.plants.slice().sort((a, b) => a.name.localeCompare(b.name));
     } else {
       return this.plants;
     }
   } */

  toggleSort() {
    this.isSortedAlphabetically = !this.isSortedAlphabetically;
    console.log("prout sort");
  }

}
