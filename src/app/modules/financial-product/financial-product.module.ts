import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialProductRoutingModule } from './financial-product-routing.module';
import { UpdateFinancialProductComponent } from './pages/update-financial-product/update-financial-product.component';
import { CreateFinancialProductComponent } from './pages/create-financial-product/create-financial-product.component';
import { ListFinancialProductComponent } from './pages/list-financial-product/list-financial-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormFinancialProductComponent } from './components/form-financial-product/form-financial-product.component';

@NgModule({
  declarations: [
    UpdateFinancialProductComponent,
    CreateFinancialProductComponent,
    ListFinancialProductComponent,
    FormFinancialProductComponent,
  ],
  imports: [CommonModule, FinancialProductRoutingModule, SharedModule],
})
export class FinancialProductModule {}
