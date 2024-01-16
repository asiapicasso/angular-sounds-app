import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: any; // Assurez-vous que le type de votre utilisateur est correct

  constructor() {
    // Vous pouvez initialiser le service avec le statut de l'utilisateur au besoin
    // Par exemple, en récupérant les informations d'utilisateur depuis le stockage local ou en les chargeant depuis le backend.
    // Dans cet exemple, je suppose que currentUser contient les informations de l'utilisateur, y compris le statut administrateur.
    this.currentUser = {
      // ... Autres informations d'utilisateur ...
      isAdmin: true, // Mettez la valeur réelle du statut administrateur de l'utilisateur
    };
  }

  isUserAdmin(): boolean {
    // Vous pouvez personnaliser cette logique en fonction de votre structure d'utilisateur
    return this.currentUser && this.currentUser.isAdmin;
  }
}
