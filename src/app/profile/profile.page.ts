import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { User } from 'src/models/user';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private uid: string;
  private authStatus: Subscription;

  public userProfile: Array<User> = new Array();
  user: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private data: DataService
  ) {


   }

  ngOnInit() {
    this.authStatus = this.afAuth.authState.subscribe((user) => {
      if (user) {
        // get the user id
        this.uid = user.uid;
        console.log(this.uid);

        this.getProfile();
      }
    });
  }
  
  getProfile(){
    var db = firebase.firestore();

    db.collection('Users').doc(this.uid).get().then( (doc) => {
      this.user = doc.data();
      console.log("User profile", this.user);
      return (this.user);
    });
    
  }
}
