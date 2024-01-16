import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-the-plants',
  templateUrl: './the-plants.page.html',
  styleUrls: ['./the-plants.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ThePlantsPage implements OnInit {

  plants: string[] = [];


  constructor(private router: Router) { }

  ngOnInit() {
    this.generatePlants();
  }

  generatePlants() {
    const count = this.plants.length + 1;
    for (let i = 0; i < 50; i++) {
      this.plants.push(`Plant ${count + i}`);
    }
  }

  navigateToPlantsVibrationsPage() {
    this.router.navigate(['/the-plants-vibrations']);
  }

}
