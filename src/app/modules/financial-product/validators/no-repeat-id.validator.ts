import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';
import { FinancialProductService } from '../services/financial-product.service';
import { catchError, map, Observable, of } from 'rxjs';

export function noRepeatID(financialService: FinancialProductService) {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const value = control.value;

    // Si no hay valor, no se realiza la petición
    if (!value) {
      return of(null);
    }

    return financialService.existenceVerification(value).pipe(
      map((exists: boolean) => {
        return exists ? { idAlreadyExists: true } : null;
      }),
      catchError(() => {
        return of(null);
      })
    );
  };
}
