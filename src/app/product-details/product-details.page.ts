import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DataService } from '../data/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Products } from 'src/models/products';
import { ProductDetailService } from '../data/product-detail.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  private productDoc: AngularFirestoreDocument<Products>;
  product: Observable<Products>;

  detail: any;

  constructor(
    private modal: ModalController, 
    private formBuilder: FormBuilder, 
    private data: DataService,
    private alert: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private prodDetail: ProductDetailService,
    private afs: AngularFirestore
  ) {
    
    //Get the product 
    // Only work once, disappear when refresh
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.detail = this.router.getCurrentNavigation().extras.state.user;
      }
    });

    // Can't make it work, give the wrong value

    // const path = `Products/${this.detail}`;
    // this.productDoc = afs.doc<Products>(path);
    // this.product = this.productDoc.valueChanges();
    // console.log(this.product);
    
   }

  ngOnInit() {
    // this.productDetail(this.detail);
    // console.log(this.detail);
  }

  productDetail(ID){
    this.prodDetail.productDetail(ID).subscribe(data =>{
      console.log(data);
    })
  }

  update(product: Products) {
    this.productDoc.update(product);
  }
}