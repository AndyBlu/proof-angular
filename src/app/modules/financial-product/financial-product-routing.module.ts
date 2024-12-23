import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateFinancialProductComponent } from './pages/update-financial-product/update-financial-product.component';
import { CreateFinancialProductComponent } from './pages/create-financial-product/create-financial-product.component';
import { ListFinancialProductComponent } from './pages/list-financial-product/list-financial-product.component';

const routes: Routes = [
  { path: '', component: ListFinancialProductComponent },
  { path: 'create', component: CreateFinancialProductComponent },
  { path: 'update/:id', component: UpdateFinancialProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialProductRoutingModule {}
