import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from '@angular/common';
import {BehaviorSubject, interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
  images = [
    'assets/images/S_Mountakha.webp',
    'assets/images/S_Mountakha_2.webp',
    'assets/images/S_Mountakha_4.webp',
    'assets/images/S_Mountakha_6.webp',

  ];
  currentImage$ = new BehaviorSubject<string>('');
  private subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = interval(30000).subscribe(() => this.changeImage());
    this.changeImage();
  }

  changeImage(): void {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.currentImage$.next(this.images[randomIndex]);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
