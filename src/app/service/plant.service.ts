import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiCallService } from '../service/api-call.service';
import { VibrationResponse } from '../models/vibrations';
import { Plant, PlantResponse } from '../models/plants';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  plants: Plant[] = [];

  constructor(private http: HttpClient, private apiCall: ApiCallService) { }

  /*   getPlants(): string[] {
      return this.plants;
    }
   */
  addPlant(plant: string) {
    //addedPlant.push(plant);
  }

  editPlant() {
    // Logique pour éditer la plante
  }

  // Supprime une plante par ID
  deletePlant(id: string): Observable<PlantResponse> {
    return this.apiCall.deletePlant(id);
  }

  getPlants(): Observable<PlantResponse> {
    return this.apiCall.getAllPlant();
  }


  updatePlant(id: string, newName: string): Observable<PlantResponse> {
    return this.apiCall.updatePlant(id, newName);
  }


  addVibration(vibrationData: FormData): Observable<any> {

    console.log(vibrationData);

    return this.apiCall.addVibration(vibrationData);
  }


  getMyVibrations(): Observable<VibrationResponse> {
    return this.apiCall.getMyVibrations();
  }

}







