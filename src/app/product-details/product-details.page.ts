import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DataService } from '../data/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Products } from 'src/models/products';
import { ProductDetailService } from '../data/product-detail.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  private productDoc: AngularFirestoreDocument<Products>;
  product: Observable<Products>;
  private details: Array<Products> = new Array();

  detail: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore
  ) {
    
    //Get the product 
    // Only work once, disappear when refresh
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.detail = this.router.getCurrentNavigation().extras.state.user;
      }
    });

    this.productDetail(this.detail.id);
    console.log(this.detail.id + "  Test");
  }

  productDetail(productID){
    var db = firebase.firestore();
    db.collection('Products').doc(productID).get().then((snapshot) =>{
      this.detail = snapshot.data();
      console.log(this.detail);
      return (this.detail);
      })
  }
  
  update(product: Products) {
    this.productDoc.update(product);
  }
}