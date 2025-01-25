import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {ErrorNotificationService} from '../../services/error-notification.service';
import {CarouselComponent} from '../../composant/carousel/carousel.component';
import {NabBarComponent} from '../../composant/nab-bar/nab-bar.component';

@Component({
    selector: 'app-error-notification',
    imports: [
        NgIf,
        CarouselComponent,
        NabBarComponent
    ],
    templateUrl: './error-notification.component.html',
    styleUrl: './error-notification.component.css'
})
export class ErrorNotificationComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private errorNotificationService: ErrorNotificationService) {}

  ngOnInit(): void {
    this.errorNotificationService.getErrorMessage().subscribe(message => {
      this.errorMessage = message;
      if (message) {
        // Effacer le message après quelques secondes (par exemple, 5 secondes)
        setTimeout(() => this.errorMessage = null, 5000);
      }
    });
  }
}
