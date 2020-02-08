import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ShopCart } from 'src/models/shop-cart';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shopCartCollection: AngularFirestoreCollection<ShopCart>;
  private shopCartDocument: AngularFirestoreDocument<ShopCart>;
  public shopCart = new BehaviorSubject<ShopCart[]>([]);
  private authStatus: Subscription;

  public total: number = 0;

  uid: string;
  product: any;
  productID: string;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private alertService: AlertService,
    private platform: Platform,
    private router: Router
  ) 
  {
    this.authStatus = afauth.authState.subscribe((user) => {
    if (user) {
      // Get the user id
      this.uid = user.uid;
      this.getShopCart(this.uid).subscribe((data) =>{
        this.shopCart.next(data);
      });
    }
    });
  }

  // Function with productID, userID, and product Array inside
  addToCart(productID, userID, product){
    const addProduct = `Users/${userID}/shoppingCart/${productID}`;
    this.shopCartDocument = this.afs.doc<ShopCart>(addProduct);

    var db = firebase.firestore();

    // Setting up the data itself, so it doesn't take all the field inside product
    var productData = {
      Name: product.Name,
      photoUrl: product.photoUrl,
      Price: product.Price,
      Quantity: 1
    }

    db.collection('Users').doc(this.uid).collection('shoppingCart').doc(productID).get().then(( doc ) => {

      // Check if the product has already been added to shopping cart
      if(doc.exists){
        console.log("Product exist");
      }else{
        this.shopCartDocument.set(productData);
        this.alertService.addedToCart();
      }
    })
  }

  getShopCart( uid ){
    const shopCartPath = `Users/${uid}/shoppingCart`;
    this.shopCartCollection = this.afs.collection<ShopCart>(shopCartPath);

    return this.shopCartCollection.snapshotChanges()
    .pipe( map(actions => actions.map(a => {
      const data = a.payload.doc.data() as ShopCart;
      // Round about way to make total price, is there better way?
      const totalPrice = (data.Price * data.Quantity);
      this.getTotalPrice(totalPrice);
      const id = a.payload.doc.id;
      return { id, ...data, totalPrice };
    })))
  }

  // To get total price of product
  getTotalPrice( totalPrice ){
    this.total = totalPrice + this.total;
    console.log("Total Price",this.total);
  }

  removeCart(){
    const shopCartPath = `Users/${this.uid}/shoppingCart`;
    this.shopCartCollection = this.afs.collection<ShopCart>(shopCartPath);
    var db = firebase.firestore();

    db.collection('Users').doc(this.uid).collection('shoppingCart').get().then((snapshot) =>{
      snapshot.forEach( (doc) =>{
        db.collection('Users').doc(this.uid).collection('shoppingCart').doc(doc.id).delete().then(() =>{
          console.log(doc.id, "Document delete");
        }).catch((error) =>{
          console.log(error);
        })
      })
    });
    this.router.navigate(['homepage']);
  }

  minus( productID ){
    var Quantity;
    var db = firebase.firestore();

    db.collection('Users').doc(this.uid).collection('shoppingCart').doc(productID).get().then((snapshot) =>{
      this.product = snapshot.data();
      Quantity = this.product.Quantity;

      if(Quantity <= 1){
        this.alertService.deletedToast();
        db.collection('Users').doc(this.uid).collection('shoppingCart').doc(productID).delete();
      }else{
        var quantity ={
          Quantity: this.product.Quantity - 1
        }
        this.total = 0;
        db.collection('Users').doc(this.uid).collection('shoppingCart').doc(productID).update(quantity);
        this.getShopCart(this.uid);
      }
    });
  }

  plus( productID ){
    const productPath = `Users/${this.uid}/shoppingCart/${productID}`;
    var Quantity;
    var db = firebase.firestore();

    db.collection('Users').doc(this.uid).collection('shoppingCart').doc(productID).get().then((snapshot) =>{
      this.product = snapshot.data();
      Quantity = this.product.Quantity;

      if(Quantity >= 5){
        this.alertService.maxAmount();
      }else{
        var quantity ={
          Quantity: this.product.Quantity + 1
        }
        this.total = 0;
        db.collection('Users').doc(this.uid).collection('shoppingCart').doc(productID).update(quantity);
        this.getShopCart(this.uid);
      }
    });
  }

  remove( productID ){
    var db = firebase.firestore();
    db.collection('Users').doc(this.uid).collection('shoppingCart').doc(productID).delete();
    this.total = 0;
    this.getShopCart(this.uid);
  }
}
