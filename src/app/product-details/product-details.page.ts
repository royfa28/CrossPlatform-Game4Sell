import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Products } from 'src/models/products';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { ShoppingCartService } from '../data/shopping-cart.service';


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
    private alertController: AlertController,
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
      if( user ) {
        this.shopCart.addToCart(this.ID, user.uid, this.detail);
        this.user = user;
        console.log(this.ID, user.uid);
      }else{
        this.presentAlert();
        this.user = null;
        console.log("Not logged");
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Not logged-in',
      message: 'You have to logged in to add things to cart.',
      buttons: ['OK']
    });

    await alert.present();
  }

  goToShopCart(){
    this.router.navigate(['shopping-cart']);
  }
}