import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Products } from 'src/models/products';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userDetail: AngularFirestoreDocument<User>;
  private productCollection: AngularFirestoreCollection<Products>;
  public products = new BehaviorSubject<Products[]>([]);
  public userProfile = new BehaviorSubject<User[]>([]);

  private uid: string;
  private authStatus: Subscription;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private afStorage: AngularFireStorage
    ) {
    // get the user auth status
    this.authStatus = afauth.authState.subscribe((user) => {
      if (user) {
        // get the user id
        this.uid = user.uid;
        console.log(user.uid);

        // create path
        const userPath = `Users/${this.uid}`

        // set the collection
        this.userDetail = afs.doc<User>(userPath);
      }
    });
    //Create path
    const productPath = `Products`

    //Get products list
    this.productCollection = afs.collection<Products>(productPath);

    this.getProducts().subscribe((data) =>{
      this.products.next(data);
    })
  }

  addUser (data: User){
    this.userDetail.set(data);
  }

  addProduct (data: Products){

  }

  getProducts(){
    return this.productCollection.snapshotChanges()
    .pipe( map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Products;
      const id = a.payload.doc.id;
      return { id, ...data };
    })))
  }
}
