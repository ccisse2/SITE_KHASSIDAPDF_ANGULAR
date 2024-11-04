import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Rediriger l'utilisateur non authentifié vers une page de connexion ou une autre page appropriée
    return false;
  }
};
