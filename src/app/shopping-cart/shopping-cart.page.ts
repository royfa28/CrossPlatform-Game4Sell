import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../data/shopping-cart.service';
import { ShopCart } from 'src/models/shop-cart';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import { PurchaseHistoryService } from '../data/purchase-history.service';
import { element } from 'protractor';
import { AlertService } from '../data/alert.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  public Cart: Array<ShopCart> = new Array();
  public total: number = 0;
  fingerprintOptions: FingerprintOptions;
  
  constructor(
    private shopCartData: ShoppingCartService,
    private fingerprint: FingerprintAIO,
    private purchase: PurchaseHistoryService,
    private alertService: AlertService
  ) {
    this.fingerprintOptions = {
      title: 'Log in with fingerprint',
      description: 'Please put your finger into the fingerprint scanner',
      disableBackup: true
    }
   }

  ngOnInit() {
    this.getShopCart();
  }

  ionViewWillEnter() {
    
  }

  // Get the data of the shopping cart
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

  showFingerprintDialog(){

    // this.purchase.addPurchase();
    this.fingerprint.show(this.fingerprintOptions)
    .then(result => {
      if( result == "biometric_success"){
        this.purchase.addPurchase();
        console.log("Add to database");
      }else{
        console.log("cancel");
      }
      console.log(result);
    })
    .catch(err =>{
      this.alertService.enableFingerprint();
      console.log("Result", err);
    });
  }

}
