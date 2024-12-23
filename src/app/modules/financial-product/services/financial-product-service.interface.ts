import { Observable } from 'rxjs';
import { FinancialProductI } from '../interfaces/financial-product.interface';
import { ApiResponseI } from 'src/app/shared/interfaces/api-response.interface';

export interface IFinancialProductService {
  listProducts(): Observable<ApiResponseI<FinancialProductI[]>>;

  getOneProduct(id: string): Observable<FinancialProductI>;

  createProduct(
    product: FinancialProductI
  ): Observable<ApiResponseI<FinancialProductI>>;
  updateProduct(
    id: string,
    product: FinancialProductI
  ): Observable<ApiResponseI<FinancialProductI>>;
  deleteProduct(id: string): Observable<ApiResponseI<null>>;

  existenceVerification(id: string): Observable<boolean>;
}
