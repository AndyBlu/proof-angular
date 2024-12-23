import { Component } from '@angular/core';
import { ToastMessageI, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toasts: ToastMessageI[] = [];

  constructor(private _toastService: ToastService) {}

  ngOnInit(): void {
    this._toastService.toast$.subscribe((toast: ToastMessageI) => {
      this.toasts.push(toast);

      setTimeout(() => {
        this.toasts.shift();
      }, toast.duration || 3000);
    });
  }
}
