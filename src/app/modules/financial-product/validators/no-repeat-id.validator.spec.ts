import { AbstractControl } from '@angular/forms';
import { noRepeatID } from './no-repeat-id.validator';
import { FinancialProductService } from '../services/financial-product.service';
import { of, throwError } from 'rxjs';
describe('noRepeatID Validator', () => {
  let financialServiceMock: jest.Mocked<FinancialProductService>;

  beforeEach(() => {
    financialServiceMock = {
      existenceVerification: jest.fn(),
    } as unknown as jest.Mocked<FinancialProductService>;
  });

  test('Debería devolver nulo si el valor de control está vacío.', async () => {
    const validator = noRepeatID(financialServiceMock);
    const mockControl = { value: '' } as AbstractControl;
    const result = validator(mockControl);

    if (result instanceof Promise) {
      const resolved = await result;
      expect(resolved).toBeNull();
    } else {
      result.subscribe((validationResult) => {
        expect(validationResult).toBeNull();
      });
    }
  });

  test('debería devolver { idAlreadyExists: true } si el servicio devuelve verdadero', (done) => {
    financialServiceMock.existenceVerification.mockReturnValue(of(true));

    const validator = noRepeatID(financialServiceMock);
    const mockControl = { value: 'test-id' } as AbstractControl;
    const result = validator(mockControl);

    if (result instanceof Promise) {
      result.then((validationResult) => {
        expect(validationResult).toEqual({ idAlreadyExists: true });
        done();
      });
    } else {
      result.subscribe((validationResult) => {
        expect(validationResult).toEqual({ idAlreadyExists: true });
        done();
      });
    }
  });

  test('Debería devolver nulo si el servicio devuelve falso', (done) => {
    financialServiceMock.existenceVerification.mockReturnValue(of(false));

    const validator = noRepeatID(financialServiceMock);
    const mockControl = { value: 'test-id' } as AbstractControl;
    const result = validator(mockControl);

    if (result instanceof Promise) {
      result.then((validationResult) => {
        expect(validationResult).toBeNull();
        done();
      });
    } else {
      result.subscribe((validationResult) => {
        expect(validationResult).toBeNull();
        done();
      });
    }
  });

  test('Debería devolver nulo si el servicio genera un error.', (done) => {
    financialServiceMock.existenceVerification.mockReturnValue(
      throwError(() => new Error('Service error'))
    );

    const validator = noRepeatID(financialServiceMock);
    const mockControl = { value: 'test-id' } as AbstractControl;

    const result = validator(mockControl);
    if (result instanceof Promise) {
      result.then((validationResult) => {
        expect(validationResult).toBeNull();
        done();
      });
    } else {
      result.subscribe((validationResult) => {
        expect(validationResult).toBeNull();
        done();
      });
    }
  });
});
