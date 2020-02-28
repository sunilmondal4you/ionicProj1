import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
import { ToastController } from '@ionic/angular';

import { FirebaseX } from "@ionic-native/firebase-x/ngx";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  togglePoint = false;
  myVariable: string = 'The force is with me!';
  myToken:any;
  
  constructor(private firebaseX: FirebaseX,public toastController: ToastController) { }

  async presentToast(contData) {
    const toast = await this.toastController.create({
      message: contData,
      duration: 2000
    });
    toast.present();
  }
    
  updateMyValue() {
    this.presentToast("1")

    this.togglePoint = !this.togglePoint;
    if(this.togglePoint) this.myVariable = 'Now the force is even stronger!';
    else this.myVariable = 'The force is with me!';

    this.presentToast("2")

    
    // this.firebaseX.getToken()
    //   .then(token => this.presentToast(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
    //   .catch(error => this.presentToast('Error getting token', error));

    this.firebaseX.onMessageReceived()
      .subscribe(
        (data) => this.presentToast(`User opened a notification ${data}`),
        (error) => { this.presentToast(error)});

    this.firebaseX.onTokenRefresh()
      .subscribe(
        (token: string) => this.presentToast(`Got a new token ${token}`),
        (error) => this.presentToast(error));

    
  }
}
