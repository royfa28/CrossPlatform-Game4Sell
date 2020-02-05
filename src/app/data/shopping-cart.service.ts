import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ShopCart } from 'src/models/shop-cart';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

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

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth
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
    const shopCartPath = `Users/${userID}/shoppingCart/${productID}`;
    this.shopCartDocument = this.afs.doc<ShopCart>(shopCartPath);

    // Setting up the data itself, so it doesn't take all the field inside product
    var productData = {
      Name: product.Name,
      photoUrl: product.photoUrl,
      Price: product.Price,
      Quantity: 1
    }
    this.shopCartDocument.set(productData);
   }

  getShopCart( uid ){
    const shopCartPath = `Users/${uid}/shoppingCart`;
    this.shopCartCollection = this.afs.collection<ShopCart>(shopCartPath);

    return this.shopCartCollection.snapshotChanges()
    .pipe( map(actions => actions.map(a => {
      const data = a.payload.doc.data() as ShopCart;

      // Round about way to make total price, is there better way?
      const totalPrice = (data.Price * data.Quantity) ;
      this.total = totalPrice;
      const id = a.payload.doc.id;
      return { id, ...data, totalPrice };
    })))
   }

   minus( productID ){
    const productPath = `Users/${this.uid}/shoppingCart/${productID}`;
    var Quantity;
    var db = firebase.firestore();

    db.collection('Users').doc(this.uid).collection('shoppingCart').doc(productID).get().then((snapshot) =>{
      this.product = snapshot.data();
      Quantity = this.product.Quantity;
      console.log(this.product.Quantity);

      if(Quantity <= 1){
        db.collection('Users').doc(this.uid).collection('shoppingCart').doc(productID).delete();
      }else{
        var quantity ={
          Quantity: this.product.Quantity - 1
        }
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
      console.log(this.product.Quantity);

      if(Quantity >= 5){
        console.log("Can only buy 5 of the same product");
      }else{
        var quantity ={
          Quantity: this.product.Quantity + 1
        }
        db.collection('Users').doc(this.uid).collection('shoppingCart').doc(productID).update(quantity);
        this.getShopCart(this.uid);
      }
    });
   }
}
