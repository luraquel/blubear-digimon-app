import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./digimon/digimon.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
];
