import { Routes } from '@angular/router';
import { DigimonPanelPage } from './digimon-panel/digimon-panel.page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'digimon',
  },
  {
    path: 'digimon',
    component: DigimonPanelPage,
  },
];
