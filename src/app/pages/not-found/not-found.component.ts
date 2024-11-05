import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {CarouselComponent} from '../../composant/carousel/carousel.component';
import {NabBarComponent} from '../../composant/nab-bar/nab-bar.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterLink,
    CarouselComponent,
    NabBarComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
