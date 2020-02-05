import { Component, OnInit } from '@angular/core';
import { Products } from '../../models/products'
import { DataService } from '../data/data.service';
import { ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ProductDetailService } from '../data/product-detail.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  public products: Array<Products> = new Array();
  public productsData: Array<Products> = new Array();

  constructor(
    private data: DataService,
    private modal: ModalController,
    private router: Router,
    private productDetailData: ProductDetailService
  ) { 
  }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    this.data.products.subscribe((data) => {
      console.log(data);
      // store original data in productsData
      this.productsData = data;

      // store products to display in products
      this.products = data;
    });
  }

  getProductDetail( productID ) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: productID
      }
    };
    console.log(navigationExtras);
    this.router.navigate(['product-details', productID.id], navigationExtras);
  }

  goToShopCart(){
    this.router.navigate(['shopping-cart']);
  }
}
