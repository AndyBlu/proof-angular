import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { IconComponent } from './components/icon/icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { ButtonComponent } from './components/button/button.component';
import { ToastComponent } from './components/toast/toast.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    TableComponent,
    IconComponent,
    TextFieldComponent,
    ButtonComponent,
    ToastComponent,
    ConfirmModalComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    TableComponent,
    IconComponent,
    TextFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    ToastComponent,
    ConfirmModalComponent,
  ],
})
export class SharedModule {}
