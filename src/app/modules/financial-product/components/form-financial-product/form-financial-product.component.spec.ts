import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFinancialProductComponent } from './form-financial-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../shared/shared.module';
import { FinancialProductFormService } from '../../services/financial-product-form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FinancialProductI } from '../../interfaces/financial-product.interface';

describe('FormFinancialProductComponent', () => {
  let component: FormFinancialProductComponent;
  let fixture: ComponentFixture<FormFinancialProductComponent>;
  let financialProductFormServiceMock: jest.Mocked<FinancialProductFormService>;

  beforeEach(async () => {
    financialProductFormServiceMock = {
      createForm: jest.fn(),
    } as unknown as jest.Mocked<FinancialProductFormService>;

    const mockFormGroup = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      logo: new FormControl(''),
      date_release: new FormControl(''),
      date_revision: new FormControl(''),
    });

    financialProductFormServiceMock.createForm.mockReturnValue(mockFormGroup);

    await TestBed.configureTestingModule({
      declarations: [FormFinancialProductComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [
        {
          provide: FinancialProductFormService,
          useValue: financialProductFormServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFinancialProductComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('Debe actualizar date_revision cuando date_release cambie (date_release debe ser exactamente 1 año mayor)', () => {
    const dateReleaseControl =
      component.financialProductFormGroup.controls['date_release'];
    const dateRevisionControl =
      component.financialProductFormGroup.controls['date_revision'];

    dateReleaseControl.setValue('2022-01-01');
    fixture.detectChanges();

    expect(dateRevisionControl.value).toBe('2023-01-01');
  });

  test('Debería emitir saveEmit cuando se llama a onSave', () => {
    jest.spyOn(component.saveEmit, 'emit');

    component.financialProductFormGroup.setValue({
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'Test Logo',
      date_release: '2022-01-01',
      date_revision: '2023-01-01',
    });

    component.onSave();

    expect(component.saveEmit.emit).toHaveBeenCalledWith({
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'Test Logo',
      date_release: '2022-01-01',
      date_revision: '2023-01-01',
    });
  });

  test('Debería resetear el formulario al llamarse resetForm sin producto financiero', () => {
    component.financialProductFormGroup.setValue({
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'Test Logo',
      date_release: '2022-01-01',
      date_revision: '2023-01-01',
    });

    component.financialProduct = undefined;
    component.resetForm();

    expect(component.financialProductFormGroup.value).toEqual({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
      date_revision: null,
    });
  });

  test('Debería resetear el formulario al llamarse resetForm con producto financiero', () => {
    const mockProduct: FinancialProductI = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'Test Logo',
      date_release: new Date('2022-01-01'),
      date_revision: new Date('2023-01-01'),
    };
    component.financialProduct = mockProduct;

    component.resetForm();

    expect(component.financialProductFormGroup.value).toEqual({
      id: '1',
      name: null,
      description: null,
      logo: null,
      date_release: null,
      date_revision: null,
    });
  });

  test('Debería llamar a createForm del servicio al inicializar el formulario', () => {
    expect(financialProductFormServiceMock.createForm).toHaveBeenCalledWith(
      undefined
    );
  });

  test('Debería actualizar el formulario correctamente con cuando el ciclo de vida del componente comience', () => {
    const mockProduct: FinancialProductI = {
      id: '1',
      name: 'Updated Product',
      description: 'Updated Description',
      logo: 'Updated Logo',
      date_release: new Date('2023-01-01'),
      date_revision: new Date('2024-01-01'),
    };

    component.financialProduct = mockProduct;

    component.ngOnInit();
    fixture.detectChanges();

    expect(financialProductFormServiceMock.createForm).toHaveBeenCalledWith(
      mockProduct
    );
  });
});
