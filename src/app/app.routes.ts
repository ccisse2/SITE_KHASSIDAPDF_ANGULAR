import { Routes } from '@angular/router';
import {CardKhassidaComponent} from './composant/card-khassida/card-khassida.component';

export const routes: Routes = [
  {path: '', component: CardKhassidaComponent},
  {path: 'khassidas', component: CardKhassidaComponent},
  {path: 'traduction', component: CardKhassidaComponent},
  {path: 'quran', component: CardKhassidaComponent},
];
