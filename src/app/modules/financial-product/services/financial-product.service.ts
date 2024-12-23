import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFinancialProductService } from './financial-product-service.interface';
import { Observable } from 'rxjs';
import { ApiResponseI } from 'src/app/shared/interfaces/api-response.interface';
import { FinancialProductI } from '../interfaces/financial-product.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FinancialProductService implements IFinancialProductService {
  constructor(private _httpClient: HttpClient) {}

  listProducts(): Observable<ApiResponseI<FinancialProductI[]>> {
    return this._httpClient.get<ApiResponseI<FinancialProductI[]>>(
      `${environment.api_url}/bp/products`
    );
  }

  getOneProduct(id: string): Observable<FinancialProductI> {
    return this._httpClient.get<FinancialProductI>(
      `${environment.api_url}/bp/products/${id}`
    );
  }

  createProduct(
    product: FinancialProductI
  ): Observable<ApiResponseI<FinancialProductI>> {
    return this._httpClient.post<ApiResponseI<FinancialProductI>>(
      `${environment.api_url}/bp/products`,
      product
    );
  }

  updateProduct(
    id: string,
    product: Partial<FinancialProductI>
  ): Observable<ApiResponseI<FinancialProductI>> {
    return this._httpClient.put<ApiResponseI<FinancialProductI>>(
      `${environment.api_url}/bp/products/${id}`,
      product
    );
  }

  deleteProduct(id: string): Observable<ApiResponseI<null>> {
    return this._httpClient.delete<ApiResponseI<null>>(
      `${environment.api_url}/bp/products/${id}`
    );
  }

  existenceVerification(id: string): Observable<boolean> {
    return this._httpClient.get<boolean>(
      `${environment.api_url}/bp/products/verification/${id}`
    );
  }
}
