import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-the-plants-vibrations',
  templateUrl: './the-plants-vibrations.page.html',
  styleUrls: ['./the-plants-vibrations.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ThePlantsVibrationsPage {

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/the-plants']);
  }

}
