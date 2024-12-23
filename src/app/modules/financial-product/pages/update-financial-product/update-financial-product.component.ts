import { Component, OnInit } from '@angular/core';
import { FinancialProductService } from '../../services/financial-product.service';
import { FinancialProductI } from '../../interfaces/financial-product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-update-financial-product',
  templateUrl: './update-financial-product.component.html',
  styleUrls: ['./update-financial-product.component.scss'],
})
export class UpdateFinancialProductComponent implements OnInit {
  financialProduct?: FinancialProductI;
  idProduct!: string;
  isLoadingSave = false;

  constructor(
    private _financialProductService: FinancialProductService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.idProduct = this._activatedRoute.snapshot.paramMap.get('id') as string;
    this.getFinancialProductByID();
  }

  getFinancialProductByID() {
    if (!this.idProduct) return;

    this._financialProductService.getOneProduct(this.idProduct).subscribe({
      next: (financialProduct) => {
        this.financialProduct = financialProduct;
      },
      error: (error) => {
        this._toastService.show(
          'No se encontró el producto Financiero',
          'info'
        );

        this.navigateToList();
      },
    });
  }

  updateProduct(financialProduct: FinancialProductI) {
    this.isLoadingSave = true;
    this._financialProductService
      .updateProduct(this.idProduct, financialProduct)
      .subscribe({
        next: (resp) => {
          this.isLoadingSave = false;
          this._toastService.show(
            'Se actualizó correctamente el producto',
            'success'
          );
          this.navigateToList();
        },
        error: (err) => {
          this.isLoadingSave = false;
          this._toastService.show('Ocurrió un error al actualizar', 'error');
        },
      });
  }

  navigateToList() {
    this._router.navigate(['/financial-product']);
  }
}
