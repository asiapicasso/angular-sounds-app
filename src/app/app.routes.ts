import { Routes } from '@angular/router';
import { onlyAuthenticated } from "./security/only-authenticated.guard";


export const routes: Routes = [
  {
    path: '',
    canActivateChild: [onlyAuthenticated], //going to check for every child route | turn on secu and login 
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'my-vibrations',
        loadComponent: () => import('./my-vibrations/my-vibrations.page').then(m => m.MyVibrationsPage)
      },
      {
        path: 'my-profile',
        loadComponent: () => import('./my-profile/my-profile.page').then(m => m.MyProfilePage)
      },
      {
        path: 'auth',
        loadComponent: () => import('./auth/auth.page').then(m => m.AuthPage)
      },
      {
        path: 'the-plants',
        loadComponent: () => import('./the-plants/the-plants.page').then(m => m.ThePlantsPage)
      },
      {
        path: 'the-plants-vibrations',
        loadComponent: () => import('./the-plants-vibrations/the-plants-vibrations.page').then(m => m.ThePlantsVibrationsPage)
      },
      /*       {
              path: 'create-vibration',
              loadComponent: () => import('./create-vibration/create-vibration.page').then(m => m.CreateVibrationPage)
            }, */
      {
        path: 'create-vibration',
        loadComponent: () => import('./create-vibration/create-vibration.page').then(m => m.CreateVibrationPage)
      },
      {
        path: 'create-plant',
        loadComponent: () => import('./create-plant/create-plant.page').then(m => m.CreatePlantPage)
      },


    ]
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/signup/signup.page').then(m => m.SignupPage)
  },



];