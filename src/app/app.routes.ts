import { Routes } from '@angular/router';
import {CardKhassidaComponent} from './composant/card-khassida/card-khassida.component';
import {AdminComponent} from './composant/admin/admin.component';
import {authGuard} from './guard/auth.guard';
import {LoginComponent} from './composant/login/login.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {ServerErrorComponent} from './pages/server-error/server-error.component';

export const routes: Routes = [
  {path: '', component: CardKhassidaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'khassidas', component: CardKhassidaComponent},
  {path: 'traduction', component: CardKhassidaComponent},
  {path: 'quran', component: CardKhassidaComponent},
  {path: 'admin', component: AdminComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  // Route pour l'erreur 404
  { path: '404', component: NotFoundComponent },
  // Route pour l'erreur 500
  { path: '500', component: ServerErrorComponent },
  // Rediriger toutes les autres routes non définies vers la page 404
  { path: '**', redirectTo: '/404' }
];
