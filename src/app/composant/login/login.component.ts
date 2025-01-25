import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {CarouselComponent} from '../carousel/carousel.component';
import {NabBarComponent} from '../nab-bar/nab-bar.component';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        NgIf,
        CarouselComponent,
        NabBarComponent
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      nom: ['', [Validators.required]],
      motDePasse: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/admin']).then(r => {
          });
        },
        error: (err) => {
          this.loginError = 'Invalid credentials. Please try again.';
        }
      });
    }else {
      this.loginError = 'Please fill out all fields.';
    }
  }

  logout():void{
    this.authService.logout();
    this.router.navigate(['/login']).then(r => {
    });
  }
}
