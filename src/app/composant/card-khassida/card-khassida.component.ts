import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Khassida} from '../../models/khassida';
import {ApiServiceKhassida} from '../../services/api-service.khassida';
import {catchError, of, tap} from 'rxjs';
import {NgForOf} from '@angular/common';
import {PaginationComponent} from '../pagination/pagination.component';
import {TraducKhassidaService} from '../../services/traduc-khassida.service';
import {CarouselComponent} from '../carousel/carousel.component';
import {NabBarComponent} from '../nab-bar/nab-bar.component';
import {QuranService} from '../../services/quran.service';

@Component({
  selector: 'app-card-khassida',
  standalone: true,
  imports: [
    NgForOf,
    PaginationComponent,
    CarouselComponent,
    NabBarComponent
  ],
  templateUrl: './card-khassida.component.html',
  styleUrl: './card-khassida.component.css'
})
export class CardKhassidaComponent implements OnInit {
  khassida: Khassida | undefined;
  khassidaList: Khassida[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  activePageType: 'khassida' | 'traduction' | 'quran' = 'khassida';


  constructor(private route: ActivatedRoute,
              private router : Router,
              private traductionService: TraducKhassidaService,
              private khassidaService: ApiServiceKhassida,
              private quranService: QuranService
  ) {}

  /**
 * Initializes the component by subscribing to the URL changes and loading Khassidas.
 *
 * @returns {void}
 */
ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.some(segment => segment.path.includes('traduction'))) {
        this.activePageType = 'traduction';
      } else if (urlSegments.some(segment => segment.path.includes('quran'))) {
        this.activePageType = 'quran';
      } else {
        this.activePageType = 'khassida';
      }
      this.loadContent(this.currentPage);
    });
}

  loadContent(page: number): void{
    let service;
    if (this.activePageType === 'traduction') {
      service = this.traductionService;
    } else if (this.activePageType === 'quran') {
      service = this.quranService;
    } else {
      service = this.khassidaService;
    }
    service.getKhassidasPage(page).pipe(
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
    this.loadContent(this.currentPage);
  }

  trackByKhassidaId(index: number, khassida: Khassida): number {
    return <number>khassida.id;
  }

}
