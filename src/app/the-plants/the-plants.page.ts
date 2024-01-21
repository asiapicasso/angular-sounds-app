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
    this.plants = this.plantService.generatePlants(); //TODO recuperer les plantes
    this.checkAdminStatus();
  }

  navigateToPlantsVibrationsPage() {
    this.router.navigate(['/the-plants-vibrations']);
  }

  checkAdminStatus() {
    //TODO récuperer le role du user
    this.isAdmin = this.userService.isUserAdmin(); 
  }

  toggleSort() {
    this.isSortedAlphabetically = !this.isSortedAlphabetically;
    console.log("prout sort");
  }

}
