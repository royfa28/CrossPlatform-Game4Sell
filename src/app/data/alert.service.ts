import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

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
}
