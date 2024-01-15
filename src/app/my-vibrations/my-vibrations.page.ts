import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VibrationDetailsComponent } from '../component/vibration-details/vibration-details.component';

@Component({
  selector: 'app-my-vibrations',
  templateUrl: './my-vibrations.page.html',
  styleUrls: ['./my-vibrations.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [VibrationDetailsComponent,], //add the component to the providers array
})
export class MyVibrationsPage implements OnInit {

  constructor(private vibrationDetailsComponent: VibrationDetailsComponent) { }

  //use method from the component

  vibrations: string[] = [];

  ngOnInit() {
    this.generateVibrations();
  }

  generateVibrations() {
    const count = this.vibrations.length + 1;
    for (let i = 0; i < 50; i++) {
      this.vibrations.push(`Vibration ${count + i}`);
    }
  }

  callEditVibration(vibration: string) {
    this.vibrationDetailsComponent.editVibration(vibration);
  }

  callDeleteVibration(vibration: string) {
    this.vibrationDetailsComponent.deleteVibration(vibration);
  }



}
