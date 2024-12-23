import { Component } from '@angular/core';
import { ModalConfirmI, ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  modalData: ModalConfirmI | null = null;

  constructor(private _modalService: ModalService) {}

  ngOnInit(): void {
    this._modalService.modal$.subscribe((data) => {
      this.modalData = data;
    });
  }

  onConfirm(): void {
    this._modalService.confirm();
  }

  onCancel(): void {
    this._modalService.cancel();
  }
}
