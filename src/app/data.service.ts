import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Products } from 'src/models/products';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userDetail: AngularFirestoreDocument<User>;
  private productDetail: AngularFirestoreDocument<Products>;
  // private userDetail: AngularFirestoreCollection<User>;
  public userDetail$ = new BehaviorSubject<User[]>([]);
  private uid: string;
  private authStatus: Subscription;

  constructor(private afs: AngularFirestore, private afauth: AngularFireAuth) {
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
  }

  addUser (data: User){
    this.userDetail.set(data);
  }

  addProduct (data: Products){

  }
}
