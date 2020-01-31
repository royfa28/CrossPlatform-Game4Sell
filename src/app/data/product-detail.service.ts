import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Products } from 'src/models/products';
import { BehaviorSubject, Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  private productCollection: AngularFirestoreDocument<Products>;
  public product = new BehaviorSubject<Products[]>([]);
  public detail = new Array<Products[]>();

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private afStorage: AngularFireStorage,
  ) {

   }

  productDetail(productID){
    var rootRef = firebase.firestore();
    var codesRef = rootRef.collection('Products').doc(productID);
    codesRef.get().then(function(document) {
      var data = document.data();
      console.log(Object.keys(data));
      return (data);
    })

    // return this.afs.collection('Products').doc(productID).snapshotChanges();
  }
}
