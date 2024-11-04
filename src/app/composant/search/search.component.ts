import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {SharedService} from '../../services/shared.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent{
  constructor(private sharedService: SharedService) {}

  onSearchChange(query: string): void {
    console.log('la méthode onSearchChange de SearchComponent est appellé')
    this.sharedService.emitSearchQuery(query);
  }
}
