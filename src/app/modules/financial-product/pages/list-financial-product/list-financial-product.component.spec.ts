import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinancialProductComponent } from './list-financial-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { FinancialProductService } from '../../services/financial-product.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { of, throwError } from 'rxjs';

describe('ListFinancialProductComponent', () => {
  let component: ListFinancialProductComponent;
  let fixture: ComponentFixture<ListFinancialProductComponent>;
  let financialProductServiceMock: jest.Mocked<FinancialProductService>;
  let toastServiceMock: jest.Mocked<ToastService>;

  beforeEach(async () => {
    financialProductServiceMock = {
      listProducts: jest.fn().mockReturnValue(of({ data: [] })), // Mock de listProducts
      deleteProduct: jest.fn(), // Mock de deleteProduct
    } as unknown as jest.Mocked<FinancialProductService>;

    toastServiceMock = {
      show: jest.fn(),
    } as unknown as jest.Mocked<ToastService>;

    await TestBed.configureTestingModule({
      declarations: [ListFinancialProductComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [
        {
          provide: FinancialProductService,
          useValue: financialProductServiceMock,
        },
        { provide: ToastService, useValue: toastServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListFinancialProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Debería filtrar la lista de productos financieros', () => {
    component.listFinancialProduct = [
      {
        id: '1',
        name: 'Producto 1',
        description: 'Descripción 1',
        logo: '',
        date_release: new Date('2024-01-01'),
        date_revision: new Date('2025-01-01'),
      },
      {
        id: '2',
        name: 'Producto 2',
        description: 'Otra descripción',
        logo: '',
        date_release: new Date('2024-01-01'),
        date_revision: new Date('2025-01-01'),
      },
    ];
    component.filterForm.controls['filterText'].setValue('Otra');

    component.filterList();

    expect(component.listFinancialProductAux).toEqual([
      {
        id: '2',
        name: 'Producto 2',
        description: 'Otra descripción',
        logo: '',
        date_release: new Date('2024-01-01'),
        date_revision: new Date('2025-01-01'),
      },
    ]);
  });

  test('debería eliminar un producto financiero si se confirma en el modal', () => {
    const mockProductId = '1';
    financialProductServiceMock.deleteProduct.mockReturnValue(of({})); // Usar el método mockReturnValue correctamente

    component.deleteProduct(mockProductId);

    expect(financialProductServiceMock.deleteProduct).toHaveBeenCalledWith(
      mockProductId
    );
    expect(toastServiceMock.show).toHaveBeenCalledWith(
      'Producto financiero eliminado',
      'success'
    );
  });

  test('debería manejar un error al eliminar un producto financiero', () => {
    const mockProductId = '1';
    financialProductServiceMock.deleteProduct.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    component.deleteProduct(mockProductId);

    expect(financialProductServiceMock.deleteProduct).toHaveBeenCalledWith(
      mockProductId
    );
    expect(toastServiceMock.show).toHaveBeenCalledWith(
      'No se pudo eliminar el producto finaciero',
      'error'
    );
  });
});
