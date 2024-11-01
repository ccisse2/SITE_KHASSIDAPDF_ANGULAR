import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Khassida} from '../../models/khassida';
import {ApiServiceService} from '../../services/api-service.service';
import {catchError, of, tap} from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-card-khassida',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './card-khassida.component.html',
  styleUrl: './card-khassida.component.css'
})
export class CardKhassidaComponent implements OnInit {
  khassida: Khassida | undefined;
  khassidaList: Khassida[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  pageSize: number = 10;


  constructor(private router: Router,
              private khassidaService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.loadKhassidas(this.currentPage);
  }

  trackByKhassidaId(index: number, khassida: Khassida): number {
    return <number>khassida.id;
  }

  loadKhassidas(page: number) {
    this.khassidaService.getKhassidas(page, this.pageSize).subscribe(response => {
      this.khassidaList = response.data;
      this.totalItems = response.totalItems;
      this.totalPages = response.totalPages;
      this.currentPage = response.currentPage;
    });
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.loadKhassidas(page);
    }
  }
}
