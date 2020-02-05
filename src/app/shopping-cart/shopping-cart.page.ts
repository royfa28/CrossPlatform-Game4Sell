import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../data/shopping-cart.service';
import { BehaviorSubject } from 'rxjs';
import { ShopCart } from 'src/models/shop-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  public Cart: Array<ShopCart> = new Array();

  constructor(
    private shopCartData: ShoppingCartService
  ) { }

  ngOnInit() {
    this.getShopCart();
  }

  getShopCart(){
    this.shopCartData.shopCart.subscribe((data) => {
      console.log(data);
      // store products to display in products
      this.Cart = data;
    });
  }
}
