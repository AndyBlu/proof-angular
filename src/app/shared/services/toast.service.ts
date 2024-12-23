import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessageI {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new Subject<ToastMessageI>();
  toast$ = this.toastSubject.asObservable();

  show(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    duration = 3000
  ): void {
    this.toastSubject.next({ message, type, duration });
  }
}
