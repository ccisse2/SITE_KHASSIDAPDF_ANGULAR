import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Khassida} from '../../models/khassida';
import {ApiServiceService} from '../../services/api-service.service';
import {catchError, of, tap} from 'rxjs';
import {NgForOf} from '@angular/common';
import {getXHRResponse} from 'rxjs/internal/ajax/getXHRResponse';
import {PaginationComponent} from '../pagination/pagination.component';

@Component({
  selector: 'app-card-khassida',
  standalone: true,
  imports: [
    NgForOf,
    PaginationComponent
  ],
  templateUrl: './card-khassida.component.html',
  styleUrl: './card-khassida.component.css'
})
export class CardKhassidaComponent implements OnInit {
  khassida: Khassida | undefined;
  khassidaList: Khassida[] = [];
  currentPage: number = 1;
  totalPages: number = 1;


  constructor(private router: Router,
              private khassidaService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.loadKhassidas(this.currentPage);
  }

  loadKhassidas(page: number): void{
    this.khassidaService.getKhassidasPage(page).pipe(
      tap((response: any) => {
        this.khassidaList = response.data;
        this.totalPages = response.totalPages;
        console.log(`Récupération réussie des Khassidas page ${this.totalPages}`, this.khassidaList);
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des Khassidas page ${page}:', error);
        return of([]); // renvoie un tableau vide en cas d'erreur
      })
    ).subscribe();
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadKhassidas(this.currentPage);
  }

  trackByKhassidaId(index: number, khassida: Khassida): number {
    return <number>khassida.id;
  }

}
