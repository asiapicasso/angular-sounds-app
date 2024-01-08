import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-my-vibrations',
  templateUrl: './my-vibrations.page.html',
  styleUrls: ['./my-vibrations.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MyVibrationsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
