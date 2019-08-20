import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    ) { }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }

  async presentOkPopup(message: any, header: any) {
    const popup = await this.alertController.create({
      message: message,
      buttons: ['Ok'],
      header: header
    });
    popup.present();
  }
}
