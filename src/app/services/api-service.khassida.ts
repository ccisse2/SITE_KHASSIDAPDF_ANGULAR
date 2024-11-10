import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Khassida} from '../models/khassida';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceKhassida {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getKhassidas(): Observable<Khassida[]> {
    return this.http.get<Khassida[]>(`${this.apiUrl}/khassida/list_khassida`).pipe(
     catchError(this.handleError)
    );
  }

  getKhassidasPage(page: number = 1) {
    return this.http.get(`${this.apiUrl}/khassida/list?page=${page}`).pipe(
      catchError(this.handleError)
    );
  }


  addKhassida(khassida: Khassida): Observable<Khassida> {
    return this.http.post<Khassida>(`${this.apiUrl}/khassida/ajout_khassida`, khassida).pipe(
      catchError(this.handleError)
    );
  }

  updateKhassida(khassida: Khassida): Observable<Khassida> {
    return this.http.put<Khassida>(`${this.apiUrl}/khassida/modif_khassida/${khassida.id}`, khassida).pipe(
      catchError(this.handleError)
    );
  }

  deleteKhassida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/khassida/suppr_khassida/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/khassida/ajout_khassida`, formData).pipe(
      catchError(this.handleError)
    );
  }
  searchKhassidas(query : string){
    return this.http.get<{ data: Khassida[] }>(`${this.apiUrl}/khassida/search`, { params: { q: query } }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
