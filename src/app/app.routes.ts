import { Routes } from '@angular/router';
import {CardKhassidaComponent} from './composant/card-khassida/card-khassida.component';
import {AdminComponent} from './composant/admin/admin.component';

export const routes: Routes = [
  {path: '', component: CardKhassidaComponent},
  {path: 'khassidas', component: CardKhassidaComponent},
  {path: 'traduction', component: CardKhassidaComponent},
  {path: 'quran', component: CardKhassidaComponent},
  {path: 'admin', component: AdminComponent}
];
