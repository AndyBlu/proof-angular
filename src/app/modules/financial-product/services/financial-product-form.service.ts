import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinancialProductI } from '../interfaces/financial-product.interface';
import { VALIDATORS } from '../const/validator-rules';
import { noRepeatID } from '../validators/no-repeat-id.validator';
import { FinancialProductService } from './financial-product.service';

@Injectable({
  providedIn: 'root',
})
export class FinancialProductFormService {
  constructor(
    private _fb: FormBuilder,
    private _financialProductService: FinancialProductService
  ) {}

  createForm(financialProduct?: FinancialProductI): FormGroup {
    return this._fb.group({
      id: [
        {
          value: financialProduct?.id || '',
          disabled: !!financialProduct,
        },
        VALIDATORS.id,
        noRepeatID(this._financialProductService), //Validador asincrono
      ],
      name: [financialProduct?.name || '', VALIDATORS.name],
      description: [
        financialProduct?.description || '',
        VALIDATORS.description,
      ],
      logo: [financialProduct?.logo || '', VALIDATORS.logo],
      date_release: [
        financialProduct?.date_release || '',
        VALIDATORS.dateRelease,
      ],
      date_revision: [
        {
          value: financialProduct?.date_revision || '',
          disabled: true,
        },
        VALIDATORS.dateRevision,
      ],
    });
  }
}
