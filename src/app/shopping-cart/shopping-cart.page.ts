import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../data/shopping-cart.service';
import { ShopCart } from 'src/models/shop-cart';

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

  remove( productID ){
    this.shopCartData.remove( productID );
  }
}
