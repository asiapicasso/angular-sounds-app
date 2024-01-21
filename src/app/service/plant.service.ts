import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  plants: [] = [];

  constructor() { }

  getPlants(): string[] {
    return this.plants;
  }

  addPlant(plant: string) {
    //addedPlant.push(plant);
  }

  editPlant() {
    // Logique pour éditer la plante
  }

  deletePlant() {
    // Logique pour supprimer la plante
  }

  /* TODO ne pas generer des plants mais récupérer celle de la DB */
  generatePlants(): string[] {
    const count = this.plants.length + 1;
    const generatedPlants: string[] = [];
    for (let i = 0; i < 15; i++) {
      generatedPlants.push(`Plant ${count + i}`);
    }
    return generatedPlants;
  }


}
