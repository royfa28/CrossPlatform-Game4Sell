import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ShopCart } from 'src/models/shop-cart';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';

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
    private afauth: AngularFireAuth,
    private alertController: AlertController,
    private toastController: ToastController
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
    const checkCart = `Users/${userID}/shoppingCart`;
    this.shopCartDocument = this.afs.doc<ShopCart>(addProduct);
    this.shopCartCollection = this.afs.collection<ShopCart>(checkCart);

    var db = firebase.firestore();

    // Setting up the data itself, so it doesn't take all the field inside product
    var productData = {
      Name: product.Name,
      photoUrl: product.photoUrl,
      Price: product.Price,
      Quantity: 1
    }
    
    this.shopCartDocument.set(productData);
    this.addedToCart();

/*
    this.shopCartCollection.snapshotChanges()
    .pipe( map(actions => actions.map(a => {
      var id = a.payload.doc.id;
      if(id == productID){
        this.plus(productID);
        console.log("Add more");
      }else{
        this.shopCartDocument.set(productData);
        this.addedToCart();
      }
    })))
*/
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

  minus( productID ){
    var Quantity;
    var db = firebase.firestore();

    db.collection('Users').doc(this.uid).collection('shoppingCart').doc(productID).get().then((snapshot) =>{
      this.product = snapshot.data();
      Quantity = this.product.Quantity;

      if(Quantity <= 1){
        this.deletedToast();
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
        this.maxAmount();
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

  async maxAmount() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'You can only buy 5 of the same product.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async deletedToast() {
    const toast = await this.toastController.create({
      message: 'Products have been deleted',
      duration: 2000
    });
    toast.present();
  }

  async addedToCart(){
    const toast = await this.toastController.create({
      message: 'Products added to Cart',
      duration: 2000
    });
    toast.present();
  }
}
