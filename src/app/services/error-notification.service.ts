import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorNotificationService {
  private errorMessageSubject = new BehaviorSubject<string | null>(null);

  setErrorMessage(message: string): void {
    this.errorMessageSubject.next(message);
  }

  clearErrorMessage(): void {
    this.errorMessageSubject.next(null);
  }

  getErrorMessage(): Observable<string | null> {
    return this.errorMessageSubject.asObservable();
  }
}
