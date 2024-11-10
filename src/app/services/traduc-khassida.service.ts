import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TraductionKhassida} from '../models/TraductionKhassida';
import {Khassida} from '../models/khassida';



@Injectable({
  providedIn: 'root'
})
export class TraducKhassidaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getKhassidas(): Observable<TraductionKhassida[]> {
    return this.http.get<TraductionKhassida[]>(`${this.apiUrl}/traduction/list_traduction_khassida`).pipe(
      catchError(this.handleError)
    );
  }

  getKhassidasPage(page: number = 1) {
    return this.http.get(`${this.apiUrl}/traduction/traduction_khassida_paginer?page=${page}`).pipe(
      catchError(this.handleError)
    );
  }


  addKhassida(khassida: TraductionKhassida): Observable<TraductionKhassida> {
    return this.http.post<TraductionKhassida>(`${this.apiUrl}/traduction/ajout_khassida_traduit`, khassida).pipe(
      catchError(this.handleError)
    );
  }
  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-file`, formData).pipe(
      catchError(this.handleError)
    );
  }

  searchKhassidas(query : string){
    return this.http.get<{ data: Khassida[] }>(`${this.apiUrl}/search`, { params: { q: query } }).pipe(
      catchError(this.handleError)
    );
  }

  updateKhassida(khassida: TraductionKhassida): Observable<TraductionKhassida> {
    return this.http.put<TraductionKhassida>(`${this.apiUrl}/modif_khassida_traduit/${khassida.id}`, khassida).pipe(
      catchError(this.handleError)
    );
  }

  deleteKhassida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/suppr_khassida_traduit/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Log the error for debugging
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
