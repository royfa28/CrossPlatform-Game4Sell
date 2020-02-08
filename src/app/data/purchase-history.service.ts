import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';
import { ShopCart } from 'src/models/shop-cart';
import { map } from 'rxjs/operators';
import { PurchaseHistory } from 'src/models/purchase-history';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {

  uid: string;
  public total: number = 0;
  purchaseList: string ="";

  private authStatus: Subscription;
  public Cart: Array<ShopCart> = new Array();
  public historyList = new BehaviorSubject<PurchaseHistory[]>([]);
  date: string = new Date().toUTCString();

  private historyCollection: AngularFirestoreCollection<PurchaseHistory>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private shopCartData: ShoppingCartService
    
  ) {
    this.authStatus = afAuth.authState.subscribe((user) => {
      if (user) {
        // Get the user id
        this.uid = user.uid;
        this.getHistory().subscribe( (data) =>{
          this.historyList.next(data);
        })
      }
    });
   }

  addPurchase(){
    var db = firebase.firestore();
    
    this.shopCartData.shopCart.subscribe( (data) => {
      this.Cart = data;
      console.log("Cart", this.Cart);
    });

    this.Cart.forEach(element => {
      this.getAll(element.Name, element.Quantity);
      this.getTotalPrice(element.Price);
    });
    
    var products = {
      details: this.purchaseList,
      totalPrice: this.total
    }

    db.collection('Users').doc(this.uid).collection('Orders').doc(this.date).set(products)
      .then(( doc ) => {
  
      }).catch(( error ) => {
        console.log(error);
    });

    this.shopCartData.removeCart();
  }

  getHistory(){
    const historyPath = `Users/${this.uid}/Orders`;
    this.historyCollection = this.afs.collection<PurchaseHistory>(historyPath);

    return this.historyCollection.snapshotChanges()
    .pipe( map( actions => actions.map (a => {
      const data = a.payload.doc.data() as PurchaseHistory;
      const id = a.payload.doc.id;
      return { id, ...data };
    })))
  }

  getAll( name, quantity ){
    this.purchaseList = name + " x " + quantity + ", " + this.purchaseList;
    return this.purchaseList;
  }

  getTotalPrice( totalPrice ){
    this.total = totalPrice + this.total;
    return this.total;
  }
}
