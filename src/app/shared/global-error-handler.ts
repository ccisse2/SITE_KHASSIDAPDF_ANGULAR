import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {

    const router = this.injector.get(Router);
    router.navigate(['/500']).then(r => {

    }); // Redirection vers la page 500
  }
}
