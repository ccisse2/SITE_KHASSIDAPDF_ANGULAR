import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {ApiServiceKhassida} from '../../services/api-service.khassida';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  searchTerm$ = new Subject<string>();

  constructor(private khassidaService: ApiServiceKhassida) {
  }

  ngOnInit(): void {
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((query: string) => {
      this.searchKhassidas(query);
    });
  }

  onSearchChange(query: string): void {
    this.searchTerm$.next(query);
  }

  searchKhassidas(query: string): void {
    this.khassidaService.searchKhassidas(query).subscribe(response => {
      this.khassidaList = response.data;
    });
  }

}
