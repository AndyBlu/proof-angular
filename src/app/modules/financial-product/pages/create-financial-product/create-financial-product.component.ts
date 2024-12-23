import { Component } from '@angular/core';
import { FinancialProductService } from '../../services/financial-product.service';
import { FinancialProductI } from '../../interfaces/financial-product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-create-financial-product',
  templateUrl: './create-financial-product.component.html',
  styleUrls: ['./create-financial-product.component.scss'],
})
export class CreateFinancialProductComponent {
  financialProduct?: FinancialProductI;
  isLoadingSave = false;

  constructor(
    private _financialProductService: FinancialProductService,
    private _router: Router,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {}

  createProduct(financialProduct: FinancialProductI) {
    this.isLoadingSave = true;
    this._financialProductService.createProduct(financialProduct).subscribe({
      next: (resp) => {
        this._toastService.show(
          'El producto financiero se guardó correctamente',
          'success'
        );
        this.isLoadingSave = false;
        this.navigateToList();
      },
      error: (err) => {
        this.isLoadingSave = false;
        this._toastService.show(
          'Hubo un error al guardar el producto financiero',
          'error'
        );
      },
    });
  }

  navigateToList() {
    this._router.navigate(['/financial-product']);
  }
}
