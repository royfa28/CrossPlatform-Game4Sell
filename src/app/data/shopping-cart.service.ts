import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private afStorage: AngularFireStorage
  ) {

   }

   addToCart(productID){

   }
}
