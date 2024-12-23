import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FinancialProductI } from '../../interfaces/financial-product.interface';
import { FormGroup } from '@angular/forms';
import { FinancialProductFormService } from '../../services/financial-product-form.service';

@Component({
  selector: 'app-form-financial-product',
  templateUrl: './form-financial-product.component.html',
  styleUrls: ['./form-financial-product.component.scss'],
})
export class FormFinancialProductComponent implements OnInit, OnChanges {
  @Input() financialProduct?: FinancialProductI;
  financialProductFormGroup!: FormGroup;
  @Input() isLoadingSave: boolean = false;

  @Output() saveEmit: EventEmitter<FinancialProductI> =
    new EventEmitter<FinancialProductI>();

  constructor(
    private _financialProductFormService: FinancialProductFormService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.financialProductFormGroup.controls[
      'date_release'
    ].valueChanges.subscribe({
      next: (value) => {
        const dateRelease = Date.parse(value);

        if (isNaN(dateRelease)) return;

        const dateRevision = new Date(dateRelease);
        dateRevision.setFullYear(dateRevision.getFullYear() + 1);

        this.financialProductFormGroup.controls['date_revision'].setValue(
          dateRevision.toISOString().split('T')[0]
        );
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  resetForm() {
    if (!this.financialProduct) {
      this.financialProductFormGroup.reset();
      return;
    }

    this.financialProductFormGroup.reset();
    this.financialProductFormGroup.controls['id'].setValue(
      this.financialProduct.id
    );
  }

  onSave() {
    if (this.financialProductFormGroup.invalid) return;

    this.saveEmit.emit(this.financialProductFormGroup.getRawValue());
  }

  private initializeForm() {
    this.financialProductFormGroup =
      this._financialProductFormService.createForm(this.financialProduct);
  }
}
