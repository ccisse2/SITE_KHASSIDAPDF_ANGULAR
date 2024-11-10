import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {CarouselComponent} from '../../composant/carousel/carousel.component';
import {NabBarComponent} from '../../composant/nab-bar/nab-bar.component';
import {FooterComponent} from "../../composant/footer/footer.component";

@Component({
  selector: 'app-server-error',
  standalone: true,
    imports: [
        RouterLink,
        CarouselComponent,
        NabBarComponent,
        FooterComponent
    ],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {

}
