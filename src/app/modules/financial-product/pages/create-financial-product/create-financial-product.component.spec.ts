import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFinancialProductComponent } from './create-financial-product.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { FinancialProductService } from '../../services/financial-product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FinancialProductI } from '../../interfaces/financial-product.interface';
import { of, throwError } from 'rxjs';
import { ApiResponseI } from 'src/app/shared/interfaces/api-response.interface';
import { Router } from '@angular/router';
import { ListFinancialProductComponent } from '../list-financial-product/list-financial-product.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormFinancialProductComponent } from '../../components/form-financial-product/form-financial-product.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreateFinancialProductComponent', () => {
  let component: CreateFinancialProductComponent;
  let fixture: ComponentFixture<CreateFinancialProductComponent>;
  let financialProductServiceMock: jest.Mocked<FinancialProductService>;
  let toastServiceMock: jest.Mocked<ToastService>;
  let router: Router;

  beforeEach(async () => {
    financialProductServiceMock = {
      createProduct: jest.fn(),
    } as unknown as jest.Mocked<FinancialProductService>;

    toastServiceMock = {
      show: jest.fn(),
    } as unknown as jest.Mocked<ToastService>;

    await TestBed.configureTestingModule({
      declarations: [
        CreateFinancialProductComponent,
        FormFinancialProductComponent,
      ],
      providers: [
        {
          provide: FinancialProductService,
          useValue: financialProductServiceMock,
        },
        { provide: ToastService, useValue: toastServiceMock },
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'financial-product',
            component: ListFinancialProductComponent,
          },
        ]),
        SharedModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFinancialProductComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Debería llamar a createProduct y mostrar un mensaje de éxito', (done) => {
    const mockApiResponse: ApiResponseI<FinancialProductI> = {
      data: {
        id: '1',
        name: 'Producto Test',
        description: 'Descripción Test',
        logo: 'logo.png',
        date_release: new Date('2023-01-01'),
        date_revision: new Date('2024-01-01'),
      },
      message: 'Producto creado con éxito',
    };

    financialProductServiceMock.createProduct.mockReturnValue(
      of(mockApiResponse)
    );
    jest.spyOn(component, 'navigateToList');

    if (!mockApiResponse.data) return;

    component.createProduct(mockApiResponse.data);

    setTimeout(() => {
      expect(component.isLoadingSave).toBeFalsy();
      expect(financialProductServiceMock.createProduct).toHaveBeenCalledWith(
        mockApiResponse.data
      );
      expect(toastServiceMock.show).toHaveBeenCalledWith(
        'El producto financiero se guardó correctamente',
        'success'
      );
      done();
    });
  });

  test('Debería manejar el error cuando createProduct falle', (done) => {
    const mockProduct = {
      id: '1',
      name: 'Producto Test',
      description: 'Descripción Test',
      logo: 'logo.png',
      date_release: new Date('2023-01-01'),
      date_revision: new Date('2024-01-01'),
    };

    financialProductServiceMock.createProduct.mockReturnValue(
      throwError(() => new Error('Error'))
    );

    component.createProduct(mockProduct);

    setTimeout(() => {
      expect(component.isLoadingSave).toBeFalsy();
      expect(financialProductServiceMock.createProduct).toHaveBeenCalledWith(
        mockProduct
      );
      expect(toastServiceMock.show).toHaveBeenCalledWith(
        'Hubo un error al guardar el producto financiero',
        'error'
      );
      done();
    });
  });
});
