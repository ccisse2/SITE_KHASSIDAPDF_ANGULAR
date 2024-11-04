import { Routes } from '@angular/router';
import {CardKhassidaComponent} from './composant/card-khassida/card-khassida.component';
import {AdminComponent} from './composant/admin/admin.component';
import {authGuard} from './guard/auth.guard';
import {LoginComponent} from './composant/login/login.component';

export const routes: Routes = [
  {path: '', component: CardKhassidaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'khassidas', component: CardKhassidaComponent},
  {path: 'traduction', component: CardKhassidaComponent},
  {path: 'quran', component: CardKhassidaComponent},
  {path: 'admin', component: AdminComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent}
];
