import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SearchComponent} from '../search/search.component';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-nab-bar',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent,
    NgIf
  ],
  templateUrl: './nab-bar.component.html',
  styleUrl: './nab-bar.component.css'
})
export class NabBarComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
