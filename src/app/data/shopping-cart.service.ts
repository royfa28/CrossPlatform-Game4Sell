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

  uid: string;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private afStorage: AngularFireStorage
  ) 
  {
    this.authStatus = afauth.authState.subscribe((user) => {
    if (user) {
      // get the user id
      this.uid = user.uid;
      console.log(user.uid);
      this.getShopCart(this.uid).subscribe((data) =>{
        this.shopCart.next(data);
      });
    }
  });

  }

  addToCart(productID, userID, product){
    const shopCartPath = `Users/${userID}/shoppingCart/${productID}`;
    this.shopCartDocument = this.afs.doc<ShopCart>(shopCartPath);

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
    console.log(this.uid, "User ID");
    return this.shopCartCollection.snapshotChanges()
    .pipe( map(actions => actions.map(a => {
      const data = a.payload.doc.data() as ShopCart;
      const id = a.payload.doc.id;
      return { id, ...data };
    })))
   }
}
