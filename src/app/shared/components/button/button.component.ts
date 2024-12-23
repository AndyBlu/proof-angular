import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() title!: string;
  @Input() typeBtn: 'button' | 'reset' | 'submit' | 'menu' = 'button';
  @Input() disabled?: boolean = false;

  @Input() color: 'primary' | 'secondary' = 'primary';

  @Output() onClickBtn: EventEmitter<any> = new EventEmitter<any>();

  emitOnclickBtn() {
    this.onClickBtn.emit();
  }
}
