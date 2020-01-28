import { Component, OnInit } from '@angular/core';
import { Products } from '../../models/products'
import { DataService } from '../data.service';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  public products: Array<Products> = new Array();

  constructor(
    private data: DataService,
    private modal: ModalController
  ) { 
  }

  ngOnInit() {
    this.getProducts();
    this.getPhotoURL("Anthem");
  }

  async getProducts() {
    this.data.products.subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
  getPhotoURL(imageSource){

    firebase.storage().ref().child('Product thumbnail/'+imageSource+'.jpg')
    .getDownloadURL().then((url) =>{
      console.log(url);
    });
  }
}
