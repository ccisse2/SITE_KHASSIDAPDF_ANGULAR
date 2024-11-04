import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SearchComponent} from '../search/search.component';

@Component({
  selector: 'app-nab-bar',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent
  ],
  templateUrl: './nab-bar.component.html',
  styleUrl: './nab-bar.component.css'
})
export class NabBarComponent {

}
