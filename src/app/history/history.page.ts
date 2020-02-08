import { Component, OnInit } from '@angular/core';
import { PurchaseHistoryService } from '../data/purchase-history.service';
import { ShopCart } from 'src/models/shop-cart';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { PurchaseHistory } from 'src/models/purchase-history';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AlertController } from '@ionic/angular';

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
    private emailComposer: EmailComposer,
    private alertController: AlertController
  ) {
   }

  ngOnInit() {
    this.getHistory();
  }

  getHistory(){
    this.purchase.historyList.subscribe( (data) => {
      this.History = data;
      console.log(data);
    });
  }

  supportEmail( historyID ){
    let email = {
      to: '6828@ait.nsw.edu.au',
      cc: [],
      bcc: [],
      attachments: [],
      subject: 'Purchase problem',
      body: 'Hi, I want to report a problem for order ID' + historyID,
      isHtml: true,
      app: 'gmail'
    }
    
    // Send a text message using default options
    this.emailComposer.open(email);
  }

  async emailAlert( historyID ) {
    const alert = await this.alertController.create({
      header: 'Report',
      message: 'Have a <strong>problem</strong> with past purchase?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            alert.dismiss();
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.supportEmail(historyID);
          }
        }
      ]
    });

    await alert.present();
  }
}
