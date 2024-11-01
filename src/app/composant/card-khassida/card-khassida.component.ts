import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Khassida} from '../../models/khassida';
import {ApiServiceService} from '../../services/api-service.service';
import {catchError, of, tap} from 'rxjs';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-card-khassida',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './card-khassida.component.html',
  styleUrl: './card-khassida.component.css'
})
export class CardKhassidaComponent implements OnInit {
  khassida: Khassida | undefined;
  khassidaList: Khassida[] = [];


  constructor(private router: Router,
              private khassidaService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.khassidaService.getKhassidas().pipe(
      tap((response: any) => {
        this.khassidaList = response.data;
        console.log(`Récupération réussie des Khassidas`, this.khassidaList);
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des Khassidas:', error);
        return of([]); // renvoie un tableau vide en cas d'erreur
      })
    ).subscribe();
  }

  trackByKhassidaId(index: number, khassida: Khassida): number {
    return <number>khassida.id;
  }

}
