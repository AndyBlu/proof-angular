import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateReleaseValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputValue = control.value;

    if (!inputValue || isNaN(Date.parse(inputValue))) {
      return { invalidDate: true };
    }
    const inputDate = new Date(inputValue).setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    if (inputDate < currentDate.setHours(0, 0, 0, 0)) {
      return { pastDate: true };
    }

    return null;
  };
}
