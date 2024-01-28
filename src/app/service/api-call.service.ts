import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../security/auth.service';
import { Observable } from 'rxjs';
import { Plant, PlantResponse } from '../models/plants';
import { Vibration, VibrationResponse } from '../models/vibrations';
import { User, UserResponse } from '../models/users';
import { AdminCheckResponse } from '../models/adminCheck';


@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  vibration: any = [];
  plant: any = [];

  constructor(private http: HttpClient) { }


  addVibrations() {
    return this.http.post(`${API_URL}/vibrations/create`, this.vibration);
  }

  addPlant(plantData: any) {
    return this.http.post(`${API_URL}/plants/create`, plantData, { withCredentials: true });
  }

  getAllPlant() {
    return this.http.get<PlantResponse>(`${API_URL}/plants/all`, { withCredentials: true });
  }


  deletePlant(id: string) {
    return this.http.get<PlantResponse>(`${API_URL}/plants/delete/${id}`, { withCredentials: true });

  }

  updatePlant(id: string, newName: string) {
    const body = { newName: newName }; // Créez un objet contenant le nouveau nom.

    return this.http.put<PlantResponse>(`${API_URL}/plants/update/${id}`, body, { withCredentials: true });

  }


  addVibration(vibrationData: FormData) /*: Observable<any> */ {
    return this.http.post(`${API_URL}/vibrations/create`, vibrationData, { withCredentials: true });
  }


  getMyVibrations() {
    return this.http.get<VibrationResponse>(`${API_URL}/vibrations/my`, { withCredentials: true });
  }

  getAllVibrations() {
    return this.http.get<VibrationResponse>(`${API_URL}/vibrations/all`, { withCredentials: true });
  }

  getAudio(vibid: string): Observable<any> {
    return this.http.get(`${API_URL}/vibrations/audio/${vibid}`, { responseType: 'blob' });
  }

  getPlant(plantId: string) {
    return this.http.get<Plant>(`${API_URL}/plants/${plantId}`, { withCredentials: true });
  }


  getUser() {
    return this.http.get<UserResponse>(`${API_URL}/users/myprofile`, { withCredentials: true });
  }

  updateUser(updatedUser: Partial<User>): Observable<UserResponse> {
    // Utilisez HttpClient pour envoyer une requête PUT ou POST au serveur pour mettre à jour l'utilisateur
    return this.http.put<UserResponse>(`${API_URL}/users/update`, updatedUser, { withCredentials: true });
  }


  deleteVibration(vibrationId: string) {
    return this.http.delete(`${API_URL}/vibrations/${vibrationId}`);
  }

  updateVibration(updatedVibration: Partial<Vibration>): Observable<VibrationResponse> {
    // Utilisez HttpClient pour envoyer une requête PUT ou POST au serveur pour mettre à jour l'utilisateur
    return this.http.put<VibrationResponse>(`${API_URL}/vibrations/update/${updatedVibration._id}`, updatedVibration, { withCredentials: true });
  }

  getAUser(uid: string) {
    return this.http.get<UserResponse>(`${API_URL}/users/profile/${uid}`, { withCredentials: true });
  }

  getIsAdmin() {
    return this.http.get<AdminCheckResponse>(`${API_URL}/auth/isAdmin`, { withCredentials: true });

  }
}
