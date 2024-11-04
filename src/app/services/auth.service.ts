import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  private loggedIn = false; // Vous pouvez initialiser cela en fonction de la logique de votre application

  isAuthenticated(): boolean {
    // Par exemple, vérifier un token dans localStorage ou un état dans un store
    return this.isLoggedIn || !!localStorage.getItem('authToken');
  }

  login(credentials: { nom : string; motDePasse: string }): Observable<any> {
    console.log(`donner reçu: ${credentials.nom}`);
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.isLoggedIn = true;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
  }
}
