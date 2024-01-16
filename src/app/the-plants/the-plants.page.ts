import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

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

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.generatePlants();
    this.checkAdminStatus();
  }

  navigateToPlantsVibrationsPage() {
    this.router.navigate(['/the-plants-vibrations']);
  }

  generatePlants() {
    const count = this.plants.length + 1;
    for (let i = 0; i < 50; i++) {
      this.plants.push(`Plant ${count + i}`);
    }
  }

  checkAdminStatus() {
    this.isAdmin = this.userService.isUserAdmin(); // Utilisez votre logique pour déterminer le statut admin
  }

  editPlant() {
    // Logique pour éditer la plante
  }

  deletePlant() {
    // Logique pour supprimer la plante
  }

}
