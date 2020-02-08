import { Component, OnInit } from '@angular/core';
import { PurchaseHistoryService } from '../data/purchase-history.service';
import { ShopCart } from 'src/models/shop-cart';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';
import { PurchaseHistory } from 'src/models/purchase-history';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  public History: Array<PurchaseHistory> = new Array();
  public total: number;
  private authStatus: Subscription;

  uid: any;

  constructor(
    private purchase: PurchaseHistoryService,
    private afAuth: AngularFireAuth,
  ) {

   }

  ngOnInit() {
    this.getHistory();
  }

  getHistory(){
    this.purchase.historyList.subscribe( (data) => {
      this.History = data;
      console.log(data);
    })
  }
}
