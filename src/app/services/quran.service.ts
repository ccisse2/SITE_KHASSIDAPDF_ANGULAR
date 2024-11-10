import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Khassida} from '../models/khassida';

@Injectable({
  providedIn: 'root'
})
export class QuranService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getKhassidas(): Observable<Khassida[]> {
    return this.http.get<Khassida[]>(`${this.apiUrl}/quran/list_quran`).pipe(
      catchError(this.handleError)
    );
  }

  getKhassidasPage(page: number = 1) {
    return this.http.get(`${this.apiUrl}/quran/quran_paginer?page=${page}`);
  }


  addKhassida(khassida: Khassida): Observable<Khassida> {
    return this.http.post<Khassida>(`${this.apiUrl}/quran/ajout_quran`, khassida).pipe(
      catchError(this.handleError)
    );
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/quran/ajout_quran`, formData).pipe(
      catchError(this.handleError)
    );
  }

  updateKhassida(khassida: Khassida): Observable<Khassida> {
    return this.http.put<Khassida>(`${this.apiUrl}/quran/modif_quran/${khassida.id}`, khassida).pipe(
      catchError(this.handleError)
    );
  }

  deleteKhassida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/quran/suppr_quran/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  searchKhassidas(query : string){
    return this.http.get<{ data: Khassida[] }>(`${this.apiUrl}/quran/search`, { params: { q: query } }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
