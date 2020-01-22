import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellProductPage } from './sell-product.page';

const routes: Routes = [
  {
    path: '',
    component: SellProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellProductPageRoutingModule {}
