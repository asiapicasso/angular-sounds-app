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

  checkAdminStatus() {
    this.isAdmin = this.userService.isUserAdmin(); // Utilisez votre logique pour déterminer le statut admin
  }

  toggleSort() {
    this.isSortedAlphabetically = !this.isSortedAlphabetically;
    console.log("prout sort");
  }

}
