import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  vibration: any = [];
  plant: any = [];

  constructor(private http: HttpClient) { }

  /* TODO all root URL

  getAllSounds() {
    return this.http.get(`https://sons-de-ta-ville.onrender.com/sounds`);
  }

  getSoundById(soundId) {
    return this.http.get(
      `https://sons-de-ta-ville.onrender.com/sounds/${soundId}`
    );
  }

  getSoundDataById(soundId) {
    return this.http.get(
      `https://sons-de-ta-ville.onrender.com/sounds/data/${soundId}`,
      { responseType: 'text' }
    );
  }

  getFilteredSounds(params) {
    const options = { params: params };
    return this.http.get(
      `https://sons-de-ta-ville.onrender.com/sounds`,
      options
    );
  } 
  */

  getMyVibrations() {
    return this.http.get(`https://https://express-api-56k1.onrender.com/vibrations/my`);
  }

  addVibrations() {
    return this.http.post(`https://https://express-api-56k1.onrender.com/vibrations/create`, this.vibration);
  }

}
