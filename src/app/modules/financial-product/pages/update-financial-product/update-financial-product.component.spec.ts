import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFinancialProductComponent } from './update-financial-product.component';
import { FinancialProductService } from '../../services/financial-product.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFinancialProductComponent } from '../../components/form-financial-product/form-financial-product.component';

describe('UpdateFinancialProductComponent', () => {
  let component: UpdateFinancialProductComponent;
  let fixture: ComponentFixture<UpdateFinancialProductComponent>;
  let compiled: HTMLElement;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('mock-id'), // Simula la obtención del ID del producto.
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UpdateFinancialProductComponent,
        FormFinancialProductComponent,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [FinancialProductService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFinancialProductComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
