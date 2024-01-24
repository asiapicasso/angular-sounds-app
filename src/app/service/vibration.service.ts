import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiCallService } from '../service/api-call.service';

@Injectable({
  providedIn: 'root',
})
export class VibrationService {

  constructor(private http: HttpClient, private apiCall: ApiCallService) { }

  // Méthode pour ajouter une vibration
  addVibration(vibrationData: any): Observable<any> {
    const url = `${this.apiCall.addVibrations}`; // Remplacez "vibrations" par l'endpoint approprié de votre API

    // Envoyez une requête HTTP POST avec les données de la vibration
    return this.http.post(url, vibrationData);
  }
}
