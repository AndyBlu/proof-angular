import { TestBed } from '@angular/core/testing';
import { FinancialProductFormService } from './financial-product-form.service';
import { FinancialProductService } from './financial-product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FinancialProductI } from '../interfaces/financial-product.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('FinancialProductFormService', () => {
  let service: FinancialProductFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        FinancialProductFormService,
        FinancialProductService,
        FormBuilder,
      ],
    });
    service = TestBed.inject(FinancialProductFormService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createForm', () => {
    test('Deberia crear un formGroup con valores por defecto', () => {
      const form = service.createForm();

      expect(form).toBeTruthy();
      expect(form.get('id')?.value).toBe('');
      expect(form.get('name')?.value).toBe('');
      expect(form.get('description')?.value).toBe('');
      expect(form.get('logo')?.value).toBe('');
      expect(form.get('date_release')?.value).toBe('');
      expect(form.get('date_revision')?.value).toBe('');
      expect(form.get('id')?.disabled).toBe(false);
      expect(form.get('date_revision')?.disabled).toBe(true);
    });

    test('Debería crear un FormGroup con los valores del producto financiero', () => {
      const mockProduct: FinancialProductI = {
        id: '123',
        name: 'Test Product',
        description: 'Test Description',
        logo: 'test-logo.png',
        date_release: new Date('2023-01-01'),
        date_revision: new Date('2023-12-31'),
      };

      const form = service.createForm(mockProduct);

      expect(form.get('id')?.value).toBe('123');
      expect(form.get('name')?.value).toBe('Test Product');
      expect(form.get('description')?.value).toBe('Test Description');
      expect(form.get('logo')?.value).toBe('test-logo.png');
      expect(form.get('date_release')?.value).toEqual(new Date('2023-01-01'));
      expect(form.get('date_revision')?.value).toEqual(new Date('2023-12-31'));
      expect(form.get('id')?.disabled).toBe(true);
      expect(form.get('date_revision')?.disabled).toBe(true);
    });

    test('Debería aplicar los Validators a los controles', () => {
      const form = service.createForm();

      expect(form.get('id')?.validator).toBeTruthy();
      expect(form.get('name')?.validator).toBeTruthy();
      expect(form.get('description')?.validator).toBeTruthy();
      expect(form.get('logo')?.validator).toBeTruthy();
      expect(form.get('date_release')?.validator).toBeTruthy();
      expect(form.get('date_revision')?.validator).toBeTruthy();
    });
  });
});
