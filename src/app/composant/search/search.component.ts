import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {SharedService} from '../../services/shared.service';

@Component({
    selector: 'app-search',
    imports: [],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent{
  constructor(private sharedService: SharedService) {}

  onSearchChange(query: string): void {
    this.sharedService.emitSearchQuery(query);
  }
}
