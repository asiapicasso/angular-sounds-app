import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/home',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'layout',
    loadComponent: () => import('./layout/layout.page').then( m => m.LayoutPage)
  },
  {
    path: 'create-vibration',
    loadComponent: () => import('./layout/create-vibration/create-vibration.page').then( m => m.CreateVibrationPage)
  },
];
