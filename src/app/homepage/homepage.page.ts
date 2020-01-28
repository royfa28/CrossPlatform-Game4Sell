import { Component, OnInit } from '@angular/core';
import { Products } from '../../models/products'
import { DataService } from '../data.service';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ProductDetailsPage } from '../product-details/product-details.page';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  public products: Array<Products> = new Array();
  public productsData: Array<Products> = new Array();

  constructor(
    private data: DataService,
    private modal: ModalController,
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    this.data.products.subscribe((data) => {
      console.log(data);
      // store original data in productsData
      this.productsData = data;

      // store products to display in products
      this.products = data;
    });
  }
  getPhotoURL(imageSource){

    firebase.storage().ref().child('Product thumbnail/'+imageSource+'.jpg')
    .getDownloadURL().then((url) =>{
      console.log(url);
    });
  }

  getProductDetail( productID ) {
    this.router.navigateByUrl('/product-details/'+productID);
  }
}
