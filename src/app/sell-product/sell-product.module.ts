import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SellProductPageRoutingModule } from './sell-product-routing.module';

import { SellProductPage } from './sell-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellProductPageRoutingModule
  ],
  declarations: [SellProductPage]
})
export class SellProductPageModule {}
