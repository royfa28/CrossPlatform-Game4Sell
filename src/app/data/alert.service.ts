import { Injectable, Injector } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private authStatus: Subscription;

  email: any;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
  ) {
    this.authStatus = afAuth.authState.subscribe((user) => {
      if (user) {
        // Get the user id
        this.email = user.email;
      }
    });
   }

  async maxAmount() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'You can only buy 5 of the same product.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async deletedToast() {
    const toast = await this.toastController.create({
      message: 'Products have been deleted',
      duration: 2000
    });
    toast.present();
  }

  async addedToCart(){
    const toast = await this.toastController.create({
      message: 'Products added to Cart',
      duration: 2000
    });
    toast.present();
  }

  async notLoggedin() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Not logged-in',
      message: 'You have to logged in to add things to cart.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async purchaseSuccess(){
    const toast = await this.toastController.create({
      message: 'Thank you for purchasing.',
      duration: 2000
    });
    toast.present();
  }

  async purchaseFailed(){
    const toast = await this.toastController.create({
      message: 'Purchase failed, please check your internet connection',
      duration: 2000
    });
    toast.present();
  }

  async enableFingerprint(){
    const alert = await this.alertController.create({
      header: 'Unable to proceed',
      message: 'Please enable fingerprint sensor to proceed.',
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

  async wrongPassword( message ){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async resetPass( message ){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async passResetSuccess(){
    const toast = await this.toastController.create({
      message: 'A password reset email has been sent!',
      duration: 2000
    });
    toast.present();
  }
}
