import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Products } from 'src/models/products';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { ShoppingCartService } from '../data/shopping-cart.service';
import { AlertService } from '../data/alert.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  private productDoc: AngularFirestoreDocument<Products>;
  product: Observable<Products>;

  detail: any;
  ID: String;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afAuth: AngularFireAuth,
    private alertService: AlertService,
    private shopCart: ShoppingCartService
  ) {
    
    //Get the product 
    // Only work once, disappear when refresh
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.detail = this.router.getCurrentNavigation().extras.state.user;
      }
    });

    this.productDetail(this.detail.id);
    console.log(this.detail.id + "  Test");
  }

  productDetail(productID){
    var db = firebase.firestore();
    db.collection('Products').doc(productID).get().then((snapshot) =>{
      this.detail = snapshot.data();
      this.ID = snapshot.id;
      console.log(this.detail);
      return (this.detail);
      })
  }

  update(product: Products) {
    this.productDoc.update(product);
  }

  user:any;
  addToCart(){
    this.afAuth.authState.subscribe(( user ) => {

      // Check if user is logged in, only registered user can add products to cart
      if( user ) {
        this.user = user;
        this.shopCart.addToCart(this.ID, user.uid, this.detail);
      }else{
        this.alertService.notLoggedin();
        this.user = null;
      }
    });
  }

  goToShopCart(){
    this.router.navigate(['shopping-cart']);
  }
}