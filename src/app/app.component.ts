import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CarouselComponent} from './composant/carousel/carousel.component';
import {NabBarComponent} from './composant/nab-bar/nab-bar.component';
import {CardKhassidaComponent} from './composant/card-khassida/card-khassida.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CarouselComponent, NabBarComponent, CardKhassidaComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'KHASSIDA';
}
