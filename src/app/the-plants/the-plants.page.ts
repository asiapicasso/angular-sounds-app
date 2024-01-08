import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-the-plants',
  templateUrl: './the-plants.page.html',
  styleUrls: ['./the-plants.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ThePlantsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
