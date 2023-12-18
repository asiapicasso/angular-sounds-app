import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-vibration',
  templateUrl: './create-vibration.page.html',
  styleUrls: ['./create-vibration.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateVibrationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
