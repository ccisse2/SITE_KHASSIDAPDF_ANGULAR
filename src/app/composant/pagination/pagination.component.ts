import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  previousPage() {
    if (this.currentPage > 1){
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.totalPages, this.currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Ajouter la première page si elle n'est pas déjà incluse
    if (startPage > 1) {
      pages.unshift(1);
      if (startPage > 2) {
        // Ajouter une indication de pages manquantes "..."
        pages.splice(1, 0, -1); // -1 servira d'indicateur pour "..."
      }
    }

    // Ajouter la dernière page si elle n'est pas déjà incluse
    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        // Ajouter une indication de pages manquantes "..."
        pages.push(-1); // -1 servira d'indicateur pour "..."
      }
      pages.push(this.totalPages);
    }

    return pages;
  }


  selectPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

}
