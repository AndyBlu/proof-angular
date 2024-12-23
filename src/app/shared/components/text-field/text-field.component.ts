import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { errorMessages } from '../../const/error-messages';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() labelText?: string;
  @Input() placeholder?: string;
  @Input() nameControl!: string;
  @Input() isDateField: boolean = false;

  value: string = '';
  isDisabled: boolean = false;
  errorMessage: string = '';

  control!: FormControl;

  constructor(private _controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.control = this.getFormControl();

    // Escuchar cambios en el estado del control para actualizar el mensaje de error
    this.control.statusChanges.subscribe(() => this.updateErrorState());
    this.control.valueChanges.subscribe(() => this.updateErrorState());
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(input.value);
  }

  handleBlur(): void {
    this.onTouched();
    this.control.markAsTouched();
    this.updateErrorState();
  }

  // Método para obtener el control asociado al campo
  private getFormControl(): FormControl {
    const formGroup = this._controlContainer.control as FormGroup;
    const control = formGroup.controls[this.nameControl];

    if (!control) {
      throw new Error(`FormControl para '${this.labelText}' no encontrado.`);
    }
    return control as FormControl;
  }

  private updateErrorState(): void {
    if (this.control.invalid && (this.control.dirty || this.control.touched)) {
      let msgError = '';
      for (const [k] of Object.entries(this.control?.errors ?? {})) {
        const key = k as keyof typeof errorMessages;

        // Asignar el mensaje base del error
        msgError = errorMessages[key] ? errorMessages[key] : 'Error';

        if (k === 'maxlength' || k === 'minlength') {
          if (!this.control.errors) continue;

          const errorDetail = this.control?.errors[key] as {
            requiredLength?: number;
          };
          if (errorDetail?.requiredLength) {
            msgError = `${msgError} ${errorDetail.requiredLength}`;
          }
        }
      }

      this.errorMessage = msgError;
    } else {
      this.errorMessage = '';
    }
  }

  // Métodos requeridos por ControlValueAccessor
  private onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};
}
