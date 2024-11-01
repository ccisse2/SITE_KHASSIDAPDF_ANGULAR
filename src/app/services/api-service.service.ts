import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Khassida} from '../models/khassida';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getKhassidas(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list_khassida?page=${page}&size=${size}`);
  }

  addKhassida(khassida: Khassida): Observable<Khassida> {
    return this.http.post<Khassida>(`${this.apiUrl}/ajout_khassida`, khassida).pipe(
      catchError(this.handleError)
    );
  }

  updateKhassida(khassida: Khassida): Observable<Khassida> {
    return this.http.put<Khassida>(`${this.apiUrl}/modif_khassida/${khassida.id}`, khassida).pipe(
      catchError(this.handleError)
    );
  }

  deleteKhassida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/suppr_khassida/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    // Log the error for debugging
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
