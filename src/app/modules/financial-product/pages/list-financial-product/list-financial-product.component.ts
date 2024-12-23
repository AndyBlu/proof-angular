import { Component, OnInit } from '@angular/core';
import { FinancialProductService } from '../../services/financial-product.service';
import { ColumnTableI } from 'src/app/shared/components/table/table.component';
import { FinancialProductI } from '../../interfaces/financial-product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../../shared/services/modal.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { take } from 'rxjs';

@Component({
  /*  */ selector: 'app-list-financial-product',
  templateUrl: './list-financial-product.component.html',
  styleUrls: ['./list-financial-product.component.scss'],
})
export class ListFinancialProductComponent implements OnInit {
  columns: ColumnTableI[] = [
    {
      key: 'logo',
      title: 'Logo',
      type: 'img',
    },
    {
      key: 'name',
      title: 'Nombre del producto',
      type: 'text',
    },
    {
      key: 'description',
      title: 'Descripción del producto',
      type: 'text',
    },
    {
      key: 'date_release',
      title: 'Fecha de liberación',
      type: 'text',
    },
    {
      key: 'date_revision',
      title: 'Fecha de reestructuración',
      type: 'text',
    },
  ];

  listFinancialProduct: FinancialProductI[] = [];
  listFinancialProductAux: FinancialProductI[] = [];

  filterForm: FormGroup = this.createFilterForm();

  constructor(
    private _financialProductService: FinancialProductService,
    private _fb: FormBuilder,
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _modalService: ModalService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._financialProductService.listProducts().subscribe({
      next: (resp) => {
        if (!resp.data) return;

        this.listFinancialProduct = resp.data;
        this.listFinancialProductAux = resp.data;
      },
      error: (error) => {
        this._toastService.show(
          'Hubo un error al cargar los productos',
          'error'
        );
      },
    });
  }

  filterList() {
    const value: string = (
      this.filterForm.controls['filterText'].value as string
    ).toLowerCase();

    this.listFinancialProductAux = this.listFinancialProduct.filter(
      (fp) =>
        fp.name.toLowerCase().includes(value) ||
        fp.description.toLowerCase().includes(value)
    );
  }

  goToCreateProduct() {
    this._route.navigate(['create'], { relativeTo: this._activatedRoute });
  }

  goToEditProduct(financialProduct: FinancialProductI) {
    this._route.navigate(['update', financialProduct.id], {
      relativeTo: this._activatedRoute,
    });
  }

  deleteProductConfirm(financialProduct: FinancialProductI) {
    this._modalService.openModal({
      message: `¿Estas seguro de eliminar el producto ${financialProduct.name}`,
      cancelText: 'Cancelar',
      confirmText: 'Confirmar',
    });

    //Limpiamos las suscripciones anteriores
    this._modalService.confirmation$.pipe(take(1)).subscribe({
      next: (confirm) => {
        if (confirm) {
          this.deleteProduct(financialProduct.id);
        }
      },
    });
  }

  deleteProduct(id: string) {
    this._financialProductService.deleteProduct(id).subscribe({
      next: (res) => {
        this._toastService.show('Producto financiero eliminado', 'success');
        this.getAllProducts();
      },
      error: (err) => {
        this._toastService.show(
          'No se pudo eliminar el producto finaciero',
          'error'
        );
      },
    });
  }

  createFilterForm(): FormGroup {
    return this._fb.group({
      filterText: [''],
    });
  }
}
