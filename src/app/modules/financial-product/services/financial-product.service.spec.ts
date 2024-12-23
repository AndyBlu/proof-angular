import { TestBed } from '@angular/core/testing';
import { FinancialProductService } from './financial-product.service';

import { environment } from '../../../../environments/__mocks__/environment';
import { ApiResponseI } from 'src/app/shared/interfaces/api-response.interface';
import { FinancialProductI } from '../interfaces/financial-product.interface';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('FinancialProductService', () => {
  let service: FinancialProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialProductService],
    });
    service = TestBed.inject(FinancialProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('Debería obtener la lista de productos financieros', () => {
    const mockResponse: ApiResponseI<FinancialProductI[]> = {
      data: [
        {
          id: '1',
          name: 'Visa Card',
          description: 'Credtest card',
          logo: 'visa.png',
          date_release: new Date(),
          date_revision: new Date(),
        },
        {
          id: '2',
          name: 'MasterCard',
          description: 'Debtest card',
          logo: 'mastercard.png',
          date_release: new Date(),
          date_revision: new Date(),
        },
      ],
    };

    service.listProducts().subscribe((response) => {
      expect(response.data?.length).toBe(2);
      expect(response.data?.[0].name).toBe('Visa Card');
    });

    // Simulamos el servicio
    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  test('Debería buscar un producto financiero por ID', () => {
    const mockProduct: FinancialProductI = {
      id: '1',
      name: 'Visa Card',
      description: 'Credtest card',
      logo: 'visa.png',
      date_release: new Date(),
      date_revision: new Date(),
    };

    service.getOneProduct('1').subscribe((product) => {
      expect(product.name).toBe('Visa Card');
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  test('Debería crear un nuevo producto financiero', () => {
    const newProduct: FinancialProductI = {
      id: '3',
      name: 'Amex',
      description: 'American Express card',
      logo: 'amex.png',
      date_release: new Date(),
      date_revision: new Date(),
    };

    const mockResponse: ApiResponseI<FinancialProductI> = {
      message: 'Product created successfully',
      data: newProduct,
    };

    service.createProduct(newProduct).subscribe((response) => {
      expect(response.data?.name).toBe('Amex');
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  test('Debería actualizar un producto existente', () => {
    const updatedProduct: Partial<FinancialProductI> = {
      name: 'Updated Visa Card',
    };

    const mockResponse: ApiResponseI<FinancialProductI> = {
      message: 'Product updated successfully',
      data: {
        id: '1',
        name: 'Updated Visa Card',
        description: 'Credtest card',
        logo: 'visa.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
    };

    service.updateProduct('1', updatedProduct).subscribe((response) => {
      expect(response.data?.name).toBe('Updated Visa Card');
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  test('Debería eliminar un producto financiero', () => {
    const mockResponse: ApiResponseI<null> = {
      message: 'Product deleted successfully',
    };

    service.deleteProduct('1').subscribe((response) => {
      expect(response.message).toBe('Product deleted successfully');
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  test('Deberia verificar la existencia de un produto', () => {
    service.existenceVerification('1').subscribe((exists) => {
      expect(exists).toBe(true);
    });

    const req = httpMock.expectOne(() => true);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });
});
