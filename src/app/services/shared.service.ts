import { Injectable } from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private searchQuerySource = new Subject<string>();

  constructor() { }

  // Déborde de 300 ms avant d'émettre chaque requête
  searchQuery$ = this.searchQuerySource.asObservable().pipe(
    debounceTime(1200), // Ajustez le délai de débordement en fonction de vos besoins
    distinctUntilChanged() // éviter les appels répétés si la recherche n'a pas changé
  );

  emitSearchQuery(query: string): void {
    this.searchQuerySource.next(query);
  }
}
