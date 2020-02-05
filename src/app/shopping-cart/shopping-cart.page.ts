import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../data/shopping-cart.service';
import { BehaviorSubject } from 'rxjs';
import { ShopCart } from 'src/models/shop-cart';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  public Cart: Array<ShopCart> = new Array();
  public total: number;
  constructor(
    private shopCartData: ShoppingCartService
  ) {
    // this.total = shopCartData.total;
    
   }

  ngOnInit() {
    this.getShopCart();
  }

  getShopCart(){
    this.shopCartData.shopCart.subscribe((data) => {
      // store products to display in products
      this.Cart = data;
      this.total = this.shopCartData.total;
      console.log(data, "Price" , this.total);
    });
  }

  minus( productID ){
    this.shopCartData.minus( productID );
  }

  plus( productID ){
    this.shopCartData.plus( productID );
  }
}
