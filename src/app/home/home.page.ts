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
  myVariable: string = 'Home page loaded!';
  myToken:any;
  newToken:any;
  
  constructor(private firebaseX: FirebaseX,public toastController: ToastController) { }

  async presentToast(contData) {
    const toast = await this.toastController.create({
      message: contData,
      duration: 2000
    });
    toast.present();
  }
    
  getToken() {
    this.togglePoint = !this.togglePoint;
    if(this.togglePoint) this.myVariable = 'Home page loaded again!';
    else this.myVariable = 'Home page loaded!';

    this.firebaseX.getToken()
      .then(
        (token) => {
          this.presentToast(`User opened a notification ${token }`)
          this.myToken = token;
        }
      )
      .catch(error => this.presentToast(error))
  }

  refreshToken() {
    this.firebaseX.onTokenRefresh()
      .subscribe(
        (token: string) => {
          this.presentToast(`Got a new token ${token}`);
          this.newToken = `New Token : ${token}`;
        },
        (error) => this.presentToast(error));    
  }

  logEventFire() {
    this.firebaseX.logEvent("select_content", {content_type: "page_view", item_id: "home"});   
  }
  setScreenNameUserId() {
    this.firebaseX.setScreenName("Home");  
    this.firebaseX.setUserId("007");
    this.firebaseX.setUserProperty("name", "Aniani");  
  }
  setCrashlyticsUserId() {
    this.firebaseX.setUserId("007");
  }

  startTrace() {
    this.firebaseX.startTrace("test trace");
  }

  stopTrace() {
    this.firebaseX.stopTrace("test trace");
  }
}
