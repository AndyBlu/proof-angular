import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'financial-product' },
  {
    path: 'financial-product',
    loadChildren: () =>
      import('./modules/financial-product/financial-product.module').then(
        (m) => m.FinancialProductModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
