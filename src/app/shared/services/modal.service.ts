import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface ModalConfirmI {
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new Subject<ModalConfirmI | null>();
  private confirmationSubject = new Subject<boolean>();

  modal$ = this.modalSubject.asObservable();
  confirmation$ = this.confirmationSubject.asObservable();

  openModal(data: ModalConfirmI): void {
    this.modalSubject.next(data);
  }

  closeModal(): void {
    this.modalSubject.next(null);
  }

  confirm(): void {
    this.confirmationSubject.next(true);
    this.closeModal();
  }

  cancel(): void {
    this.confirmationSubject.next(false);
    this.closeModal();
  }
}
